// Vercel互換性のためのデータベースベースセキュリティログ

import { PrismaClient } from '@prisma/client';
import {
  sanitizeForLog,
  sanitizeEmailForLog,
  sanitizeUserAgentForLog,
  sanitizeIPForLog,
  sanitizeResourceForLog,
  sanitizeObjectForLog,
  formatSecurityLog,
} from './log-sanitizer';
import { Timestamp } from '@/types/common';

export enum SecurityEventType {
  // 認証関連
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILURE = 'REGISTER_FAILURE',
  LOGOUT = 'LOGOUT',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',

  // メール認証関連
  EMAIL_VERIFICATION_SUCCESS = 'EMAIL_VERIFICATION_SUCCESS',
  EMAIL_VERIFICATION_FAILURE = 'EMAIL_VERIFICATION_FAILURE',
  EMAIL_VERIFICATION_RESEND = 'EMAIL_VERIFICATION_RESEND',

  // パスワードリセット関連
  PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST',
  PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS',
  PASSWORD_RESET_FAILURE = 'PASSWORD_RESET_FAILURE',

  // パスワード変更関連
  PASSWORD_CHANGE_SUCCESS = 'PASSWORD_CHANGE_SUCCESS',
  PASSWORD_CHANGE_FAILURE = 'PASSWORD_CHANGE_FAILURE',

  // メールアドレス変更関連
  EMAIL_CHANGE_REQUEST = 'EMAIL_CHANGE_REQUEST',
  EMAIL_CHANGE_SUCCESS = 'EMAIL_CHANGE_SUCCESS',
  EMAIL_CHANGE_FAILURE = 'EMAIL_CHANGE_FAILURE',

  // アクセス制御
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  FORBIDDEN_ACCESS = 'FORBIDDEN_ACCESS',
  PERMISSION_DENIED = 'PERMISSION_DENIED',

  // セキュリティ攻撃
  BRUTE_FORCE_ATTEMPT = 'BRUTE_FORCE_ATTEMPT',
  CSRF_TOKEN_INVALID = 'CSRF_TOKEN_INVALID',
  CSRF_TOKEN_MISSING = 'CSRF_TOKEN_MISSING',
  SQL_INJECTION_ATTEMPT = 'SQL_INJECTION_ATTEMPT',
  XSS_ATTEMPT = 'XSS_ATTEMPT',

  // レート制限
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  API_ABUSE = 'API_ABUSE',

  // システム
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',

  // データ関連
  DATA_BREACH_ATTEMPT = 'DATA_BREACH_ATTEMPT',
  SENSITIVE_DATA_ACCESS = 'SENSITIVE_DATA_ACCESS',
}

export enum SecurityEventSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  severity: SecurityEventSeverity;
  timestamp: Timestamp;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  resource?: string;
  details?: Record<string, unknown>;
}

// Vercel互換性：データベースベースのセキュリティログシステム
export class DatabaseSecurityLogger {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async logEvent(event: Omit<SecurityEvent, 'id' | 'timestamp'>): Promise<void> {
    // ログインジェクション攻撃防止：すべての入力をサニタイズ
    const sanitizedEvent = {
      ...event,
      ipAddress: event.ipAddress ? sanitizeIPForLog(event.ipAddress) : undefined,
      userAgent: event.userAgent ? sanitizeUserAgentForLog(event.userAgent) : undefined,
      resource: event.resource ? sanitizeResourceForLog(event.resource) : undefined,
      details: event.details ? sanitizeObjectForLog(event.details) : undefined,
    };

    try {
      // データベースに保存
      await this.prisma.securityEvent.create({
        data: {
          type: sanitizedEvent.type,
          severity: sanitizedEvent.severity,
          userId: sanitizedEvent.userId,
          ipAddress: sanitizedEvent.ipAddress,
          userAgent: sanitizedEvent.userAgent,
          resource: sanitizedEvent.resource,
          details: (sanitizedEvent.details || {}) as any,
        },
      });

      // 重要度に応じてコンソール出力
      this.logToConsole({
        id: 'db_logged',
        timestamp: new Date(),
        ...sanitizedEvent,
      });

      // 緊急度が高い場合は即座に通知
      if (event.severity === SecurityEventSeverity.CRITICAL) {
        await this.sendCriticalAlert({
          id: 'critical_alert',
          timestamp: new Date(),
          ...sanitizedEvent,
        });
      }
    } catch (error) {
      console.error('Failed to log security event to database:', error);
      // フォールバック：最低限コンソールには出力
      this.logToConsole({
        id: 'fallback_log',
        timestamp: new Date(),
        ...sanitizedEvent,
      });
    }
  }

  private logToConsole(event: SecurityEvent): void {
    const logLevel =
      event.severity === SecurityEventSeverity.CRITICAL
        ? 'error'
        : event.severity === SecurityEventSeverity.HIGH
          ? 'warn'
          : 'info';

    // セキュアなログフォーマットを使用
    const secureLogEntry = formatSecurityLog({
      timestamp: event.timestamp,
      level: logLevel.toUpperCase(),
      type: event.type,
      message: `Security event: ${event.type}`,
      metadata: {
        id: event.id,
        severity: event.severity,
        userId: event.userId,
        ipAddress: event.ipAddress,
        resource: event.resource,
        details: event.details,
      },
    });

    console[logLevel]('🔒', secureLogEntry);
  }

  private async sendCriticalAlert(event: SecurityEvent): Promise<void> {
    // 緊急アラートの送信（メール、Slack、webhook等）
    console.error('🚨 CRITICAL SECURITY EVENT:', {
      type: event.type,
      details: event.details,
      timestamp: event.timestamp.toISOString(),
    });

    // TODO: 実際の通知システム実装
    // await sendSlackAlert(event)
    // await sendEmailAlert(event)
  }

  // 統計情報取得
  async getEventStatistics(): Promise<{
    totalEvents: number;
    eventsByType: Record<string, number>;
    eventsBySeverity: Record<string, number>;
    recentEvents: SecurityEvent[];
  }> {
    try {
      const [totalEvents, eventsByType, eventsBySeverity, recentEvents] = await Promise.all([
        this.prisma.securityEvent.count(),
        this.prisma.securityEvent.groupBy({
          by: ['type'],
          _count: { type: true },
        }),
        this.prisma.securityEvent.groupBy({
          by: ['severity'],
          _count: { severity: true },
        }),
        this.prisma.securityEvent.findMany({
          orderBy: { timestamp: 'desc' },
          take: 10,
        }),
      ]);

      const eventsByTypeMap: Record<string, number> = {};
      eventsByType.forEach((item) => {
        eventsByTypeMap[item.type] = item._count.type;
      });

      const eventsBySeverityMap: Record<string, number> = {};
      eventsBySeverity.forEach((item) => {
        eventsBySeverityMap[item.severity] = item._count.severity;
      });

      return {
        totalEvents,
        eventsByType: eventsByTypeMap,
        eventsBySeverity: eventsBySeverityMap,
        recentEvents: recentEvents.map((event) => ({
          id: event.id,
          type: event.type as SecurityEventType,
          severity: event.severity as SecurityEventSeverity,
          timestamp: event.timestamp,
          userId: event.userId || undefined,
          ipAddress: event.ipAddress || undefined,
          userAgent: event.userAgent || undefined,
          resource: event.resource || undefined,
          details: (event.details as Record<string, unknown>) || undefined,
        })),
      };
    } catch (error) {
      console.error('Failed to get security statistics:', error);
      return {
        totalEvents: 0,
        eventsByType: {},
        eventsBySeverity: {},
        recentEvents: [],
      };
    }
  }

  // 特定期間のイベント取得
  async getEventsByTimeRange(startTime: Date, endTime: Date): Promise<SecurityEvent[]> {
    try {
      const events = await this.prisma.securityEvent.findMany({
        where: {
          timestamp: {
            gte: startTime,
            lte: endTime,
          },
        },
        orderBy: { timestamp: 'desc' },
      });

      return events.map((event) => ({
        id: event.id,
        type: event.type as SecurityEventType,
        severity: event.severity as SecurityEventSeverity,
        timestamp: event.timestamp,
        userId: event.userId || undefined,
        ipAddress: event.ipAddress || undefined,
        userAgent: event.userAgent || undefined,
        resource: event.resource || undefined,
        details: (event.details as Record<string, unknown>) || undefined,
      }));
    } catch (error) {
      console.error('Failed to get events by time range:', error);
      return [];
    }
  }

  // 定期的なクリーンアップ
  async cleanup(): Promise<void> {
    try {
      // 90日以上古いイベントを削除
      const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

      const result = await this.prisma.securityEvent.deleteMany({
        where: {
          timestamp: {
            lt: ninetyDaysAgo,
          },
        },
      });

      console.log(`Cleaned up ${result.count} old security events`);
    } catch (error) {
      console.error('Security event cleanup error:', error);
    }
  }
}

// 便利なヘルパー関数（データベースベース）
export async function logSecurityEventDB(
  prisma: PrismaClient,
  event: Omit<SecurityEvent, 'id' | 'timestamp'>,
): Promise<void> {
  const logger = new DatabaseSecurityLogger(prisma);
  await logger.logEvent(event);
}

// 認証関連のログヘルパー
export const logAuthSuccessDB = (
  prisma: PrismaClient,
  userId: string,
  ipAddress?: string,
  userAgent?: string,
) =>
  logSecurityEventDB(prisma, {
    type: SecurityEventType.LOGIN_SUCCESS,
    severity: SecurityEventSeverity.LOW,
    userId,
    ipAddress,
    userAgent,
    details: { success: true },
  });

export const logAuthFailureDB = (
  prisma: PrismaClient,
  email: string,
  reason: string,
  ipAddress?: string,
  userAgent?: string,
) =>
  logSecurityEventDB(prisma, {
    type: SecurityEventType.LOGIN_FAILURE,
    severity: SecurityEventSeverity.MEDIUM,
    ipAddress,
    userAgent,
    details: {
      email: sanitizeEmailForLog(email),
      reason: sanitizeForLog(reason),
      failed: true,
    },
  });

export const logRateLimitExceededDB = (
  prisma: PrismaClient,
  ipAddress?: string,
  endpoint?: string,
  userAgent?: string,
) =>
  logSecurityEventDB(prisma, {
    type: SecurityEventType.RATE_LIMIT_EXCEEDED,
    severity: SecurityEventSeverity.HIGH,
    ipAddress,
    userAgent,
    resource: endpoint,
    details: { rateLimitExceeded: true },
  });

// バックグラウンドクリーンアップ用（Vercel Cronジョブで実行可能）
export async function cleanupOldSecurityEvents(prisma: PrismaClient): Promise<number> {
  try {
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

    const result = await prisma.securityEvent.deleteMany({
      where: {
        timestamp: {
          lt: ninetyDaysAgo,
        },
      },
    });

    return result.count;
  } catch (error) {
    console.error('Security event cleanup error:', error);
    return 0;
  }
}
