import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GraphQLSchema } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { createApiRateLimit, createAuthRateLimit } from '../../../lib/security/rate-limit-db';
import { csrfProtection } from '../../../lib/security/csrf-protection';
import jwt from 'jsonwebtoken';
import { withI18n } from '../../../lib/i18n/context';

// Import pre-built schema
import { getPreBuiltSchema } from '../../../lib/server/graphql/generated-schema';

// Global Prisma Client for connection pooling and performance optimization
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Vercel Functions + Supabase最適化設定
    transactionOptions: {
      maxWait: 3000, // 3秒（Vercel Functions最適化）
      timeout: 25000, // 25秒（Vercel Function制限内）
      isolationLevel: 'ReadCommitted', // 読み取り専用トランザクション最適化
    },
    // エラーフォーマット最適化
    errorFormat: 'minimal',
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// 接続プールとリトライ最適化
let isConnected = false;
let connectionPromise: Promise<void> | null = null;

async function ensureConnection() {
  if (isConnected) return;

  if (!connectionPromise) {
    connectionPromise = prisma
      .$connect()
      .then(() => {
        isConnected = true;
        console.log('✅ Prisma connected successfully');
      })
      .catch((error) => {
        console.error('❌ Prisma connection failed:', error);
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
}

// 優雅な切断処理
async function gracefulDisconnect() {
  if (isConnected) {
    await prisma.$disconnect();
    isConnected = false;
    console.log('🔌 Prisma disconnected');
  }
}

// Vercel Functions終了時の処理
if (typeof process !== 'undefined') {
  process.on('beforeExit', gracefulDisconnect);
  process.on('SIGINT', gracefulDisconnect);
  process.on('SIGTERM', gracefulDisconnect);
}

// 接続確立（エラーは無視してリクエスト時に再試行）
ensureConnection().catch(() => {
  console.log('⚠️  Initial connection failed, will retry on request');
});

// Use pre-built schema for better performance
let schema: GraphQLSchema | null = null;

function getSchema() {
  if (!schema) {
    schema = getPreBuiltSchema();
  }
  return schema;
}

// Create Apollo Server with enhanced security
async function createServer() {
  const graphqlSchema = getSchema();

  return new ApolloServer({
    schema: graphqlSchema,
    introspection: process.env.NODE_ENV !== 'production',
    validationRules: [
      depthLimit(10), // Limit query depth
    ],
    formatError: (err) => {
      console.error('GraphQL Error:', err);

      const isProduction = process.env.NODE_ENV === 'production';

      if (isProduction) {
        // 本番環境では詳細なエラー情報を隠蔽
        const userFriendlyErrors = [
          '認証',
          '権限',
          'メールアドレス',
          'パスワード',
          'ユーザー',
          '登録',
          'ログイン',
          'セットリスト',
          '楽曲',
          '不正',
          '無効',
        ];

        const isUserError = userFriendlyErrors.some((keyword) => err.message.includes(keyword));

        if (isUserError) {
          return { message: err.message };
        }

        // システムエラーは汎用メッセージ
        return {
          message: 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。',
        };
      }

      // 開発環境では詳細情報を含める
      return {
        message: err.message,
        locations: err.locations,
        path: err.path,
      };
    },
  });
}

// Lazy initialization approach for Vercel Functions
async function getServerInstance() {
  return createServer();
}

// JWT Token interface
interface JWTPayload {
  userId: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

// Context helper for secure token extraction with connection assurance
async function createSecureContext(req: NextRequest) {
  // データベース接続を確実に確立
  await ensureConnection();

  // Cookiesオブジェクトを作成（認証ミドルウェア用）
  const cookies: { [key: string]: string } = {};
  req.cookies.getAll().forEach((cookie) => {
    cookies[cookie.name] = cookie.value;
  });

  // Headersオブジェクトを作成（セキュリティログ用）
  const headers: { [key: string]: string } = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // JWTトークンを取得して認証情報を設定
  let user: { userId: string; email: string; username: string } | undefined;

  const token = cookies['auth_token'];

  // デバッグログ
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Auth Debug:');
    console.log('  Available cookies:', Object.keys(cookies));
    console.log('  auth_token exists:', !!token);
    console.log('  auth_token length:', token?.length || 0);
  }

  if (token) {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (jwtSecret) {
        const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
        user = {
          userId: decoded.userId,
          email: decoded.email,
          username: decoded.username,
        };

        if (process.env.NODE_ENV === 'development') {
          console.log('  ✅ JWT validation successful:', user.email);
        }
      }
    } catch (error) {
      // Token validation failed - user remains undefined
      if (process.env.NODE_ENV === 'development') {
        console.log('  ❌ JWT validation failed:', error);
      }
    }
  }

  const context = {
    req: {
      cookies,
      headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
    prisma,
    user,
  };

  // i18n機能を追加
  return withI18n(context);
}

export async function GET(request: NextRequest) {
  // Apply database-based rate limiting
  const apiRateLimit = createApiRateLimit(prisma);
  const rateLimitResponse = await apiRateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const server = await getServerInstance();
  const handler = startServerAndCreateNextHandler(server, {
    context: async (req: NextRequest) => createSecureContext(req),
  });
  return handler(request);
}

export async function POST(request: NextRequest) {
  // Parallel processing for maximum performance optimization
  const bodyPromise = request.clone().text();
  const apiRateLimitPromise = createApiRateLimit(prisma)(request);

  // Start server creation early to reduce cold start time
  const serverPromise = getServerInstance();

  const [body, apiRateLimitResponse, server] = await Promise.all([
    bodyPromise,
    apiRateLimitPromise,
    serverPromise,
  ]);

  // Check API rate limit first
  if (apiRateLimitResponse) {
    return apiRateLimitResponse;
  }

  // Check if this is an authentication request for enhanced rate limiting
  const isAuthRequest = /(?:login|register)/.test(body);

  // Parallel processing for auth rate limit and CSRF protection
  const authPromises = [];

  if (isAuthRequest) {
    authPromises.push(createAuthRateLimit(prisma)(request));
  }

  authPromises.push(csrfProtection(request, prisma));

  const authResults = await Promise.all(authPromises);

  // Check for any auth/CSRF failures
  for (const result of authResults) {
    if (result) {
      return result;
    }
  }

  const handler = startServerAndCreateNextHandler(server, {
    context: async (req: NextRequest) => createSecureContext(req),
  });
  return handler(request);
}
