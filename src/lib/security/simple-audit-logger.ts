// シンプルな監査ログシステム - 軽量版

import { PrismaClient } from '@prisma/client';
import { SecurityEvent, SecurityEventType } from './security-logger-db';

// 簡素化された監査ログエントリー
export interface SimpleAuditLogEntry {
  eventType: SecurityEventType;
  outcome: 'SUCCESS' | 'FAILURE';
  timestamp: Date;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  details?: Record<string, unknown>;
}

// 軽量監査ログシステム
export class SimpleAuditLogger {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // シンプルな監査ログ作成
  async logSecurityEvent(
    event: SecurityEvent,
    additionalDetails?: Record<string, unknown>,
  ): Promise<void> {
    const riskLevel = this.calculateSimpleRiskLevel(event);

    // 高リスクイベントのみ詳細記録
    if (riskLevel === 'HIGH') {
      await this.createDetailedAuditLog(event, riskLevel, additionalDetails);
    } else {
      // 通常イベントは軽量記録
      await this.createLightAuditLog(event, riskLevel);
    }
  }

  // 簡単なリスクレベル計算
  private calculateSimpleRiskLevel(event: SecurityEvent): 'LOW' | 'MEDIUM' | 'HIGH' {
    const highRiskEvents = [
      SecurityEventType.BRUTE_FORCE_ATTEMPT,
      SecurityEventType.SQL_INJECTION_ATTEMPT,
      SecurityEventType.XSS_ATTEMPT,
      SecurityEventType.DATA_BREACH_ATTEMPT,
      SecurityEventType.UNAUTHORIZED_ACCESS,
    ];

    const mediumRiskEvents = [
      SecurityEventType.LOGIN_FAILURE,
      SecurityEventType.RATE_LIMIT_EXCEEDED,
      SecurityEventType.CSRF_TOKEN_INVALID,
      SecurityEventType.PERMISSION_DENIED,
    ];

    if (highRiskEvents.includes(event.type)) return 'HIGH';
    if (mediumRiskEvents.includes(event.type)) return 'MEDIUM';
    return 'LOW';
  }

  // 詳細監査ログ作成（高リスクのみ）
  private async createDetailedAuditLog(
    event: SecurityEvent,
    riskLevel: 'HIGH',
    additionalDetails?: Record<string, unknown>,
  ): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          eventType: event.type,
          outcome: this.getOutcome(event),
          userId: event.userId,
          ipAddress: event.ipAddress,
          userAgent: event.userAgent,
          riskLevel,
          details: {
            reason: event.details?.reason || 'unknown',
            resource: event.resource || 'unknown',
            additionalDetails: additionalDetails || {},
          } as any,
        },
      });
    } catch (error) {
      console.error('Detailed audit log creation error:', error);
    }
  }

  // 軽量監査ログ作成（通常イベント）
  private async createLightAuditLog(
    event: SecurityEvent,
    riskLevel: 'LOW' | 'MEDIUM',
  ): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          eventType: event.type,
          outcome: this.getOutcome(event),
          userId: event.userId,
          ipAddress: event.ipAddress,
          userAgent: event.userAgent,
          riskLevel,
          details: {
            reason: event.details?.reason || 'normal',
          } as any,
        },
      });
    } catch (error) {
      console.error('Light audit log creation error:', error);
    }
  }

  // 結果判定
  private getOutcome(event: SecurityEvent): 'SUCCESS' | 'FAILURE' {
    const successEvents = [
      SecurityEventType.LOGIN_SUCCESS,
      SecurityEventType.REGISTER_SUCCESS,
      SecurityEventType.EMAIL_VERIFICATION_SUCCESS,
      SecurityEventType.PASSWORD_RESET_SUCCESS,
      SecurityEventType.PASSWORD_CHANGE_SUCCESS,
    ];

    return successEvents.includes(event.type) ? 'SUCCESS' : 'FAILURE';
  }

  // 基本統計情報
  async getBasicStatistics(): Promise<{
    todayEvents: number;
    weeklyFailures: number;
    highRiskEvents: number;
  }> {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const [todayEvents, weeklyFailures, highRiskEvents] = await Promise.all([
        this.prisma.auditLog.count({
          where: { timestamp: { gte: today } },
        }),
        this.prisma.auditLog.count({
          where: {
            timestamp: { gte: weekAgo },
            outcome: 'FAILURE',
          },
        }),
        this.prisma.auditLog.count({
          where: {
            timestamp: { gte: weekAgo },
            riskLevel: 'HIGH',
          },
        }),
      ]);

      return {
        todayEvents,
        weeklyFailures,
        highRiskEvents,
      };
    } catch (error) {
      console.error('Statistics error:', error);
      return {
        todayEvents: 0,
        weeklyFailures: 0,
        highRiskEvents: 0,
      };
    }
  }

  // 定期クリーンアップ（30日以上古いLOW/MEDIUMイベントを削除）
  async cleanupOldEvents(): Promise<number> {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const result = await this.prisma.auditLog.deleteMany({
        where: {
          timestamp: { lt: thirtyDaysAgo },
          riskLevel: { in: ['LOW', 'MEDIUM'] },
        },
      });

      return result.count;
    } catch (error) {
      console.error('Cleanup error:', error);
      return 0;
    }
  }
}

// 便利な関数
export async function logSimpleAudit(
  prisma: PrismaClient,
  event: SecurityEvent,
  additionalDetails?: Record<string, unknown>,
): Promise<void> {
  const logger = new SimpleAuditLogger(prisma);
  await logger.logSecurityEvent(event, additionalDetails);
}
