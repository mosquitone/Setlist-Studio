import { AuthChecker } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

interface Context {
  prisma: PrismaClient;
  user?: {
    userId: string;
    email: string;
    username: string;
  };
  req?: {
    headers: {
      authorization?: string;
      'user-agent'?: string;
      'x-forwarded-for'?: string;
      'x-real-ip'?: string;
    };
  };
}

interface JWTPayload {
  userId: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

/**
 * GraphQL認証チェッカー
 */
export const authChecker: AuthChecker<Context> = async ({ context }) => {
  const { req } = context;

  if (!req?.headers?.authorization) {
    return false;
  }

  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return false;
    }

    const decoded = jwt.verify(token, jwtSecret) as JWTPayload;

    // ユーザーの存在確認
    const user = await context.prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return false;
    }

    // コンテキストにユーザー情報を追加
    context.user = {
      userId: decoded.userId,
      email: decoded.email,
      username: decoded.username,
    };

    return true;
  } catch (error) {
    console.error('Auth middleware error:', error);
    return false;
  }
};

/**
 * 認証ユーザー取得ヘルパー
 */
export function getAuthenticatedUser(context: Context) {
  if (!context.user) {
    throw new Error('認証が必要です');
  }
  return context.user;
}
