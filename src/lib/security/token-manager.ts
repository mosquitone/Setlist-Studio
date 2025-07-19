// トークン管理とセキュリティ機能

import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export interface TokenValidationResult {
  valid: boolean;
  userId?: string;
  email?: string;
  type?: string;
  error?: string;
}

export interface TokenCleanupResult {
  emailVerificationTokens: number;
  passwordResetTokens: number;
  emailChangeTokens: number;
  total: number;
}

export class TokenManager {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * セキュアなトークンを生成
   */
  public generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * JWTトークンを検証
   */
  public verifyJWTToken(token: string): TokenValidationResult {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return {
          valid: false,
          error: 'JWT_SECRET not configured',
        };
      }

      const payload = jwt.verify(token, secret) as any;
      return {
        valid: true,
        userId: payload.userId,
        email: payload.email,
        type: 'jwt',
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid token',
      };
    }
  }

  /**
   * メール認証トークンを検証
   */
  public async verifyEmailVerificationToken(token: string): Promise<TokenValidationResult> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          emailVerificationToken: token,
          emailVerificationExpires: {
            gt: new Date(),
          },
        },
      });

      if (!user) {
        return {
          valid: false,
          error: 'Invalid or expired verification token',
        };
      }

      return {
        valid: true,
        userId: user.id,
        email: user.email,
        type: 'email_verification',
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Token validation failed',
      };
    }
  }

  /**
   * パスワードリセットトークンを検証
   */
  public async verifyPasswordResetToken(token: string): Promise<TokenValidationResult> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          passwordResetToken: token,
          passwordResetExpires: {
            gt: new Date(),
          },
        },
      });

      if (!user) {
        return {
          valid: false,
          error: 'Invalid or expired password reset token',
        };
      }

      return {
        valid: true,
        userId: user.id,
        email: user.email,
        type: 'password_reset',
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Token validation failed',
      };
    }
  }

  /**
   * メールアドレス変更トークンを検証
   */
  public async verifyEmailChangeToken(token: string): Promise<TokenValidationResult> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          emailChangeToken: token,
          emailChangeExpires: {
            gt: new Date(),
          },
        },
      });

      if (!user) {
        return {
          valid: false,
          error: 'Invalid or expired email change token',
        };
      }

      return {
        valid: true,
        userId: user.id,
        email: user.email,
        type: 'email_change',
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Token validation failed',
      };
    }
  }

  /**
   * 期限切れトークンのクリーンアップ
   */
  public async cleanupExpiredTokens(): Promise<TokenCleanupResult> {
    const now = new Date();

    try {
      const [emailVerificationResult, passwordResetResult, emailChangeResult] = await Promise.all([
        // メール認証トークンのクリーンアップ
        this.prisma.user.updateMany({
          where: {
            emailVerificationExpires: {
              lt: now,
            },
            emailVerificationToken: {
              not: null,
            },
          },
          data: {
            emailVerificationToken: null,
            emailVerificationExpires: null,
          },
        }),

        // パスワードリセットトークンのクリーンアップ
        this.prisma.user.updateMany({
          where: {
            passwordResetExpires: {
              lt: now,
            },
            passwordResetToken: {
              not: null,
            },
          },
          data: {
            passwordResetToken: null,
            passwordResetExpires: null,
          },
        }),

        // メールアドレス変更トークンのクリーンアップ
        this.prisma.user.updateMany({
          where: {
            emailChangeExpires: {
              lt: now,
            },
            emailChangeToken: {
              not: null,
            },
          },
          data: {
            emailChangeToken: null,
            emailChangeExpires: null,
            pendingEmail: null,
          },
        }),
      ]);

      const result: TokenCleanupResult = {
        emailVerificationTokens: emailVerificationResult.count,
        passwordResetTokens: passwordResetResult.count,
        emailChangeTokens: emailChangeResult.count,
        total: emailVerificationResult.count + passwordResetResult.count + emailChangeResult.count,
      };

      if (result.total > 0) {
        console.log(`Cleaned up ${result.total} expired tokens:`, result);
      }

      return result;
    } catch (error) {
      console.error('Token cleanup error:', error);
      return {
        emailVerificationTokens: 0,
        passwordResetTokens: 0,
        emailChangeTokens: 0,
        total: 0,
      };
    }
  }

  /**
   * 特定ユーザーのトークンを無効化
   */
  public async invalidateUserTokens(userId: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          emailVerificationToken: null,
          emailVerificationExpires: null,
          passwordResetToken: null,
          passwordResetExpires: null,
          emailChangeToken: null,
          emailChangeExpires: null,
          pendingEmail: null,
        },
      });
    } catch (error) {
      console.error('Token invalidation error:', error);
      throw error;
    }
  }

  /**
   * トークンの統計情報を取得
   */
  public async getTokenStatistics(): Promise<{
    activeEmailVerificationTokens: number;
    activePasswordResetTokens: number;
    activeEmailChangeTokens: number;
    expiredTokens: number;
  }> {
    const now = new Date();

    try {
      const [
        activeEmailVerificationTokens,
        activePasswordResetTokens,
        activeEmailChangeTokens,
        expiredTokens,
      ] = await Promise.all([
        this.prisma.user.count({
          where: {
            emailVerificationToken: { not: null },
            emailVerificationExpires: { gt: now },
          },
        }),
        this.prisma.user.count({
          where: {
            passwordResetToken: { not: null },
            passwordResetExpires: { gt: now },
          },
        }),
        this.prisma.user.count({
          where: {
            emailChangeToken: { not: null },
            emailChangeExpires: { gt: now },
          },
        }),
        this.prisma.user.count({
          where: {
            OR: [
              {
                emailVerificationToken: { not: null },
                emailVerificationExpires: { lt: now },
              },
              {
                passwordResetToken: { not: null },
                passwordResetExpires: { lt: now },
              },
              {
                emailChangeToken: { not: null },
                emailChangeExpires: { lt: now },
              },
            ],
          },
        }),
      ]);

      return {
        activeEmailVerificationTokens,
        activePasswordResetTokens,
        activeEmailChangeTokens,
        expiredTokens,
      };
    } catch (error) {
      console.error('Token statistics error:', error);
      return {
        activeEmailVerificationTokens: 0,
        activePasswordResetTokens: 0,
        activeEmailChangeTokens: 0,
        expiredTokens: 0,
      };
    }
  }

  /**
   * セキュリティチェック: 疑わしいトークンアクティビティを検出
   */
  public async detectSuspiciousTokenActivity(userId: string): Promise<{
    suspicious: boolean;
    reasons: string[];
    recommendations: string[];
  }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          emailVerificationToken: true,
          emailVerificationExpires: true,
          passwordResetToken: true,
          passwordResetExpires: true,
          emailChangeToken: true,
          emailChangeExpires: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return {
          suspicious: false,
          reasons: [],
          recommendations: [],
        };
      }

      const reasons: string[] = [];
      const recommendations: string[] = [];

      // 複数のアクティブなトークンをチェック
      const activeTokens = [
        user.emailVerificationToken,
        user.passwordResetToken,
        user.emailChangeToken,
      ].filter(Boolean);

      if (activeTokens.length > 2) {
        reasons.push('複数のアクティブなトークンが存在');
        recommendations.push('不要なトークンを無効化することを検討');
      }

      // 最近の頻繁な更新をチェック
      const recentUpdateThreshold = new Date(Date.now() - 10 * 60 * 1000); // 10分前
      if (user.updatedAt > recentUpdateThreshold) {
        reasons.push('最近頻繁にトークンが更新されている');
        recommendations.push('セキュリティログを確認し、異常なアクティビティがないか調査');
      }

      return {
        suspicious: reasons.length > 0,
        reasons,
        recommendations,
      };
    } catch (error) {
      console.error('Suspicious token activity detection error:', error);
      return {
        suspicious: false,
        reasons: [],
        recommendations: [],
      };
    }
  }
}

// ヘルパー関数
export function createTokenManager(prisma: PrismaClient): TokenManager {
  return new TokenManager(prisma);
}

// バックグラウンドクリーンアップ用（Vercel Cronジョブで実行可能）
export async function cleanupExpiredTokens(prisma: PrismaClient): Promise<TokenCleanupResult> {
  const tokenManager = createTokenManager(prisma);
  return tokenManager.cleanupExpiredTokens();
}
