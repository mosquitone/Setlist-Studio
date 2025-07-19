// メール認証関連のレート制限システム

import { PrismaClient } from '@prisma/client';
import { DatabaseRateLimit } from './rate-limit-db';
import { logRateLimitExceededDB } from './security-logger-db';

interface EmailRateLimitOptions {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

interface EmailRateLimitResult {
  success: boolean;
  count: number;
  remaining: number;
  resetTime: Date;
  message?: string;
}

export class EmailRateLimit {
  private prisma: PrismaClient;
  private rateLimiter: DatabaseRateLimit;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.rateLimiter = new DatabaseRateLimit(prisma);
  }

  /**
   * メール送信のレート制限チェック
   */
  async checkEmailSendLimit(
    email: string,
    type: 'verification' | 'password_reset' | 'email_change',
    ipAddress?: string,
    userAgent?: string,
  ): Promise<EmailRateLimitResult> {
    const options = this.getEmailRateLimitOptions(type);
    const key = `email_${type}_${email}`;

    const result = await this.rateLimiter.checkRateLimit(key, options);

    if (!result.success) {
      // レート制限違反をログに記録
      await logRateLimitExceededDB(this.prisma, ipAddress, `email_${type}`, userAgent);

      return {
        success: false,
        count: result.count,
        remaining: result.remaining,
        resetTime: result.resetTime,
        message:
          options.message ||
          'メール送信回数が上限に達しました。しばらく時間をおいてから再試行してください。',
      };
    }

    return {
      success: true,
      count: result.count,
      remaining: result.remaining,
      resetTime: result.resetTime,
    };
  }

  /**
   * IPアドレスベースのメール送信制限チェック
   */
  async checkIPEmailLimit(
    ipAddress: string,
    type: 'verification' | 'password_reset' | 'email_change',
    userAgent?: string,
  ): Promise<EmailRateLimitResult> {
    const options = this.getIPEmailRateLimitOptions(type);
    const key = `ip_email_${type}_${ipAddress}`;

    const result = await this.rateLimiter.checkRateLimit(key, options);

    if (!result.success) {
      // レート制限違反をログに記録
      await logRateLimitExceededDB(this.prisma, ipAddress, `ip_email_${type}`, userAgent);

      return {
        success: false,
        count: result.count,
        remaining: result.remaining,
        resetTime: result.resetTime,
        message:
          'このIPアドレスからのメール送信回数が上限に達しました。しばらく時間をおいてから再試行してください。',
      };
    }

    return {
      success: true,
      count: result.count,
      remaining: result.remaining,
      resetTime: result.resetTime,
    };
  }

  /**
   * パスワードリセットの特別制限（より厳格）
   */
  async checkPasswordResetLimit(
    email: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<EmailRateLimitResult> {
    // メールアドレスベースの制限
    const emailResult = await this.checkEmailSendLimit(
      email,
      'password_reset',
      ipAddress,
      userAgent,
    );
    if (!emailResult.success) {
      return emailResult;
    }

    // IPアドレスベースの制限
    if (ipAddress) {
      const ipResult = await this.checkIPEmailLimit(ipAddress, 'password_reset', userAgent);
      if (!ipResult.success) {
        return ipResult;
      }
    }

    return emailResult;
  }

  /**
   * メール認証の制限チェック
   */
  async checkVerificationEmailLimit(
    email: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<EmailRateLimitResult> {
    // メールアドレスベースの制限
    const emailResult = await this.checkEmailSendLimit(email, 'verification', ipAddress, userAgent);
    if (!emailResult.success) {
      return emailResult;
    }

    // IPアドレスベースの制限
    if (ipAddress) {
      const ipResult = await this.checkIPEmailLimit(ipAddress, 'verification', userAgent);
      if (!ipResult.success) {
        return ipResult;
      }
    }

    return emailResult;
  }

  /**
   * メールアドレス変更の制限チェック
   */
  async checkEmailChangeLimit(
    email: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<EmailRateLimitResult> {
    // メールアドレスベースの制限
    const emailResult = await this.checkEmailSendLimit(email, 'email_change', ipAddress, userAgent);
    if (!emailResult.success) {
      return emailResult;
    }

    // IPアドレスベースの制限
    if (ipAddress) {
      const ipResult = await this.checkIPEmailLimit(ipAddress, 'email_change', userAgent);
      if (!ipResult.success) {
        return ipResult;
      }
    }

    return emailResult;
  }

  /**
   * メール種別ごとのレート制限オプション
   */
  private getEmailRateLimitOptions(
    type: 'verification' | 'password_reset' | 'email_change',
  ): EmailRateLimitOptions {
    const isDevelopment = process.env.NODE_ENV === 'development';

    switch (type) {
      case 'password_reset':
        return {
          windowMs: isDevelopment ? 5 * 60 * 1000 : 60 * 60 * 1000, // 開発: 5分, 本番: 1時間
          maxRequests: isDevelopment ? 100 : 3, // 開発: 100回, 本番: 3回
          message:
            'パスワードリセットメールの送信回数が上限に達しました。1時間後に再試行してください。',
        };
      case 'verification':
        return {
          windowMs: isDevelopment ? 2 * 60 * 1000 : 15 * 60 * 1000, // 開発: 2分, 本番: 15分
          maxRequests: isDevelopment ? 50 : 5, // 開発: 50回, 本番: 5回
          message: 'メール認証メールの送信回数が上限に達しました。15分後に再試行してください。',
        };
      case 'email_change':
        return {
          windowMs: isDevelopment ? 10 * 60 * 1000 : 60 * 60 * 1000, // 開発: 10分, 本番: 1時間
          maxRequests: isDevelopment ? 20 : 2, // 開発: 20回, 本番: 2回
          message:
            'メールアドレス変更メールの送信回数が上限に達しました。1時間後に再試行してください。',
        };
      default:
        return {
          windowMs: 15 * 60 * 1000, // 15分
          maxRequests: 5, // 5回
          message: 'メール送信回数が上限に達しました。しばらく時間をおいてから再試行してください。',
        };
    }
  }

  /**
   * IPアドレスベースのレート制限オプション（より厳格）
   */
  private getIPEmailRateLimitOptions(
    type: 'verification' | 'password_reset' | 'email_change',
  ): EmailRateLimitOptions {
    const isDevelopment = process.env.NODE_ENV === 'development';

    switch (type) {
      case 'password_reset':
        return {
          windowMs: isDevelopment ? 10 * 60 * 1000 : 60 * 60 * 1000, // 開発: 10分, 本番: 1時間
          maxRequests: isDevelopment ? 200 : 10, // 開発: 200回, 本番: 10回
          message: 'このIPアドレスからのパスワードリセットメール送信回数が上限に達しました。',
        };
      case 'verification':
        return {
          windowMs: isDevelopment ? 5 * 60 * 1000 : 15 * 60 * 1000, // 開発: 5分, 本番: 15分
          maxRequests: isDevelopment ? 100 : 20, // 開発: 100回, 本番: 20回
          message: 'このIPアドレスからのメール認証メール送信回数が上限に達しました。',
        };
      case 'email_change':
        return {
          windowMs: isDevelopment ? 15 * 60 * 1000 : 60 * 60 * 1000, // 開発: 15分, 本番: 1時間
          maxRequests: isDevelopment ? 50 : 5, // 開発: 50回, 本番: 5回
          message: 'このIPアドレスからのメールアドレス変更メール送信回数が上限に達しました。',
        };
      default:
        return {
          windowMs: 15 * 60 * 1000, // 15分
          maxRequests: 20, // 20回
          message: 'このIPアドレスからのメール送信回数が上限に達しました。',
        };
    }
  }
}

// ヘルパー関数
export function createEmailRateLimit(prisma: PrismaClient): EmailRateLimit {
  return new EmailRateLimit(prisma);
}
