// メール配信の信頼性向上（リトライ機構 + exponential backoff）

import { EmailConfig } from './emailService';

export interface RetryOptions {
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  jitter: boolean;
}

export interface EmailResult {
  success: boolean;
  attempts: number;
  finalError?: Error;
  messageId?: string;
}

export class EmailReliabilityService {
  private static readonly DEFAULT_RETRY_OPTIONS: RetryOptions = {
    maxRetries: 3,
    baseDelayMs: 1000, // 1秒
    maxDelayMs: 30000, // 30秒
    backoffMultiplier: 2,
    jitter: true,
  };

  /**
   * 指数バックオフ付きリトライ機構
   */
  static async retryWithBackoff<T>(
    operation: () => Promise<T>,
    options: Partial<RetryOptions> = {},
  ): Promise<T> {
    const opts = { ...EmailReliabilityService.DEFAULT_RETRY_OPTIONS, ...options };
    let lastError: Error = new Error('Operation failed');
    let attempt = 0;

    while (attempt <= opts.maxRetries) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        attempt++;

        // 最大リトライ回数に達した場合は失敗
        if (attempt > opts.maxRetries) {
          break;
        }

        // 遅延計算
        const delay = EmailReliabilityService.calculateDelay(attempt, opts);
        console.log(`Retry attempt ${attempt} after ${delay}ms delay:`, lastError.message);

        // 遅延待機
        await EmailReliabilityService.sleep(delay);
      }
    }

    throw lastError;
  }

  /**
   * 指数バックオフ遅延の計算
   */
  private static calculateDelay(attempt: number, options: RetryOptions): number {
    // 基本的な指数バックオフ: baseDelay * (backoffMultiplier ^ (attempt - 1))
    const exponentialDelay = options.baseDelayMs * Math.pow(options.backoffMultiplier, attempt - 1);

    // 最大遅延でクランプ
    const clampedDelay = Math.min(exponentialDelay, options.maxDelayMs);

    // ジッターの追加（thundering herd problem を避けるため）
    if (options.jitter) {
      const jitterAmount = clampedDelay * 0.1; // 10%のジッター
      const jitter = (Math.random() - 0.5) * 2 * jitterAmount; // -10% ~ +10%
      return Math.max(0, Math.round(clampedDelay + jitter));
    }

    return clampedDelay;
  }

  /**
   * Promise.sleep実装
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * メール送信タイプ別のリトライ設定
   */
  static getRetryOptionsForEmailType(
    type: 'verification' | 'password_reset' | 'email_change' | 'notification',
  ): RetryOptions {
    const baseOptions = EmailReliabilityService.DEFAULT_RETRY_OPTIONS;

    switch (type) {
      case 'verification':
        // メール認証は重要なので積極的にリトライ
        return {
          ...baseOptions,
          maxRetries: 5,
          baseDelayMs: 2000,
          maxDelayMs: 60000, // 1分
        };

      case 'password_reset':
        // パスワードリセットは緊急性が高いので早めにリトライ
        return {
          ...baseOptions,
          maxRetries: 4,
          baseDelayMs: 1500,
          maxDelayMs: 45000, // 45秒
        };

      case 'email_change':
        // メールアドレス変更は重要だが緊急性は低い
        return {
          ...baseOptions,
          maxRetries: 3,
          baseDelayMs: 3000,
          maxDelayMs: 120000, // 2分
        };

      case 'notification':
        // 通知メールは失敗してもそれほど問題ない
        return {
          ...baseOptions,
          maxRetries: 2,
          baseDelayMs: 5000,
          maxDelayMs: 30000, // 30秒
        };

      default:
        return baseOptions;
    }
  }

  /**
   * 一時的なエラーか判定
   */
  static isTemporaryError(error: unknown): boolean {
    if (!error || typeof error !== 'object') return false;

    const errorMessage = error.toString().toLowerCase();

    // 一時的なエラーのパターン
    const temporaryPatterns = [
      'timeout',
      'connection',
      'network',
      'rate limit',
      'throttled',
      'temporarily unavailable',
      'service unavailable',
      'try again',
      'econnreset',
      'enotfound',
      'econnrefused',
      '429', // Too Many Requests
      '502', // Bad Gateway
      '503', // Service Unavailable
      '504', // Gateway Timeout
    ];

    // 永続的なエラーのパターン
    const permanentPatterns = [
      'invalid email',
      'invalid recipient',
      'blocked',
      'blacklisted',
      'unsubscribed',
      'bounce',
      'suppressed',
      '400', // Bad Request
      '401', // Unauthorized
      '403', // Forbidden
      '404', // Not Found
    ];

    // 永続的エラーの場合はリトライしない
    if (permanentPatterns.some((pattern) => errorMessage.includes(pattern))) {
      return false;
    }

    // 一時的エラーの場合はリトライする
    if (temporaryPatterns.some((pattern) => errorMessage.includes(pattern))) {
      return true;
    }

    // 不明なエラーの場合は一時的エラーとして扱う（安全側に寄せる）
    return true;
  }

  /**
   * Circuit Breaker Pattern実装
   */
  static createCircuitBreaker(failureThreshold: number = 5, resetTimeoutMs: number = 60000) {
    let failureCount = 0;
    let lastFailureTime = 0;
    let state: 'closed' | 'open' | 'half-open' = 'closed';

    return {
      async execute<T>(operation: () => Promise<T>): Promise<T> {
        const now = Date.now();

        // オープン状態の場合
        if (state === 'open') {
          if (now - lastFailureTime >= resetTimeoutMs) {
            state = 'half-open';
            failureCount = 0;
          } else {
            throw new Error('Circuit breaker is open - email service temporarily unavailable');
          }
        }

        try {
          const result = await operation();

          // 成功した場合
          if (state === 'half-open') {
            state = 'closed';
            failureCount = 0;
          }

          return result;
        } catch (error) {
          failureCount++;
          lastFailureTime = now;

          if (failureCount >= failureThreshold) {
            state = 'open';
            console.warn(`Circuit breaker opened after ${failureCount} failures`);
          }

          throw error;
        }
      },

      getState(): 'closed' | 'open' | 'half-open' {
        return state;
      },

      getFailureCount(): number {
        return failureCount;
      },

      reset(): void {
        state = 'closed';
        failureCount = 0;
        lastFailureTime = 0;
      },
    };
  }

  /**
   * バッチメール送信（複数の宛先に効率的に送信）
   */
  static async sendBulkEmails(
    emails: EmailConfig[],
    options: {
      concurrency?: number;
      retryOptions?: Partial<RetryOptions>;
      onProgress?: (completed: number, total: number) => void;
    } = {},
  ): Promise<EmailResult[]> {
    const { concurrency = 5, retryOptions = {}, onProgress } = options;
    const results: EmailResult[] = [];
    let completed = 0;

    // 並行度を制御してバッチ処理
    const chunks = EmailReliabilityService.chunkArray(emails, concurrency);

    for (const chunk of chunks) {
      const chunkResults = await Promise.all(
        chunk.map(async () => {
          let attempts = 0;
          let finalError: Error | undefined;
          let messageId: string | undefined;

          try {
            const result = await EmailReliabilityService.retryWithBackoff(async () => {
              attempts++;
              // 実際のメール送信処理を行う
              // この関数は EmailService から呼び出されることを想定
              return await EmailReliabilityService.sendSingleEmail();
            }, retryOptions);

            messageId = result.messageId;

            return {
              success: true,
              attempts,
              messageId,
            };
          } catch (error) {
            finalError = error instanceof Error ? error : new Error(String(error));
            return {
              success: false,
              attempts,
              finalError,
            };
          }
        }),
      );

      results.push(...chunkResults);
      completed += chunk.length;

      if (onProgress) {
        onProgress(completed, emails.length);
      }
    }

    return results;
  }

  /**
   * 単一メール送信（バッチ処理から呼び出される）
   * 注意: この関数は EmailService から実際の送信処理を注入する必要があります
   */
  private static async sendSingleEmail(): Promise<{ messageId: string }> {
    // この実装は EmailService.sendEmail メソッドを使用することを想定
    // 実際の EmailService とのinterfaceのため、ここでは抽象化されています
    throw new Error('sendSingleEmail must be implemented by EmailService integration');
  }

  /**
   * 配列を指定サイズのチャンクに分割
   */
  private static chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}
