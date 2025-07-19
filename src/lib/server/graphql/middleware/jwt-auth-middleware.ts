import { MiddlewareFn } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { verifyAndValidateJWT } from '@/types/jwt';
import {
  logSecurityEventDB,
  SecurityEventType,
  SecurityEventSeverity,
} from '../../../security/security-logger-db';
import { I18nContext } from '../../../i18n/context';

interface Context {
  req: {
    cookies: {
      [key: string]: string;
    };
    headers: {
      [key: string]: string;
    };
  };
  prisma: PrismaClient;
  userId?: string;
  i18n?: I18nContext;
}

// IP address extraction helper
function getClientIP(context: Context): string | undefined {
  const headers = context.req?.headers;
  if (!headers) return undefined;
  return headers['x-forwarded-for']?.split(',')[0] || headers['x-real-ip'] || 'unknown';
}

export const AuthMiddleware: MiddlewareFn<Context> = async ({ context }, next) => {
  // 安全性チェック：cookiesオブジェクトの存在確認
  if (!context.req || !context.req.cookies) {
    console.error('AuthMiddleware: req.cookies is undefined');

    // セキュリティログ記録
    await logSecurityEventDB(context.prisma, {
      type: SecurityEventType.UNAUTHORIZED_ACCESS,
      severity: SecurityEventSeverity.MEDIUM,
      ipAddress: getClientIP(context),
      userAgent: context.req?.headers?.['user-agent'],
      details: {
        reason: 'missing_request_context',
        operation: 'protected_mutation',
      },
    });

    throw new Error(context.i18n?.messages.auth.loginRequired || 'ログインが必要です');
  }

  // HttpOnly Cookieから認証トークンを取得
  const token = context.req.cookies.auth_token;

  if (!token) {
    // セキュリティログ記録
    await logSecurityEventDB(context.prisma, {
      type: SecurityEventType.UNAUTHORIZED_ACCESS,
      severity: SecurityEventSeverity.MEDIUM,
      ipAddress: getClientIP(context),
      userAgent: context.req?.headers?.['user-agent'],
      details: {
        reason: 'missing_auth_token',
        operation: 'protected_mutation',
      },
    });

    throw new Error(context.i18n?.messages.auth.loginRequired || 'ログインが必要です');
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error(context.i18n?.messages.errors.serverError || 'サーバーエラーが発生しました');
    }
    const payload = verifyAndValidateJWT(token, jwtSecret);
    context.userId = payload.userId;
  } catch (error) {
    console.error('AuthMiddleware: JWT verification failed:', error);

    // セキュリティログ記録
    await logSecurityEventDB(context.prisma, {
      type: SecurityEventType.UNAUTHORIZED_ACCESS,
      severity: SecurityEventSeverity.HIGH,
      ipAddress: getClientIP(context),
      userAgent: context.req?.headers?.['user-agent'],
      details: {
        reason: 'invalid_token',
        operation: 'protected_mutation',
        error: error instanceof Error ? error.message : 'unknown_error',
      },
    });

    throw new Error(
      context.i18n?.messages.auth.authenticationExpired ||
        '認証の有効期限が切れています。再度ログインしてください',
    );
  }

  return next();
};
