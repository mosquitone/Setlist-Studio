# メール認証システム実装ガイド

## 概要

Setlist Studioのメール認証システムは、Resendサービスを使用した包括的なメール認証機能を提供します。このガイドでは、実装詳細、設定方法、使用方法について説明します。

## 機能概要

### 実装済み機能

- **メール認証**: 新規登録時のメールアドレス確認
- **パスワードリセット**: セキュアなパスワードリセット機能
- **メールアドレス変更**: 既存ユーザーのメールアドレス変更
- **レート制限**: メール種別ごとの詳細レート制限
- **トークン管理**: セキュアなトークン生成・管理・クリーンアップ
- **セキュリティログ**: 全操作の包括的ログ記録

## アーキテクチャ

### コンポーネント構成

```
src/lib/server/email/
├── emailService.ts          # メール送信サービス
├── security/
│   ├── email-rate-limit.ts  # メール専用レート制限
│   └── token-manager.ts     # トークン管理システム
└── graphql/resolvers/
    └── AuthResolver.ts      # GraphQLリゾルバー
```

### データベーススキーマ

```prisma
model User {
  // 既存フィールド
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  password  String
  
  // メール認証関連
  emailVerified          Boolean   @default(false)
  emailVerificationToken String?
  emailVerificationExpires DateTime?
  
  // パスワードリセット関連
  passwordResetToken     String?
  passwordResetExpires   DateTime?
  
  // メールアドレス変更関連
  pendingEmail           String?
  emailChangeToken       String?
  emailChangeExpires     DateTime?
}
```

## 設定方法

### 1. 環境変数設定

`.env.local`に以下の環境変数を設定：

```env
# Resend Email Service
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# メール認証用シークレット
EMAIL_VERIFICATION_SECRET="your-email-verification-secret-key"
PASSWORD_RESET_SECRET="your-password-reset-secret-key"

# 既存の必要な変数
JWT_SECRET="your-jwt-secret"
CSRF_SECRET="your-csrf-secret"
```

### 2. Resendアカウント設定

1. [Resend](https://resend.com)でアカウント作成
2. APIキーを取得
3. 送信ドメインを設定（本番環境の場合）

### 3. データベース設定

```bash
# スキーマ変更を適用
pnpm db:push

# または マイグレーションの場合
pnpm db:migrate
```

## 使用方法

### GraphQL Mutations

#### 1. パスワードリセット要求

```graphql
mutation RequestPasswordReset($input: PasswordResetRequestInput!) {
  requestPasswordReset(input: $input) {
    success
    message
  }
}
```

**変数:**
```json
{
  "input": {
    "email": "user@example.com"
  }
}
```

#### 2. パスワードリセット実行

```graphql
mutation ResetPassword($input: PasswordResetInput!) {
  resetPassword(input: $input) {
    success
    message
  }
}
```

**変数:**
```json
{
  "input": {
    "token": "reset-token-from-email",
    "newPassword": "NewSecurePassword123!"
  }
}
```

#### 3. メール認証実行

```graphql
mutation VerifyEmail($input: EmailVerificationInput!) {
  verifyEmail(input: $input) {
    success
    message
  }
}
```

**変数:**
```json
{
  "input": {
    "token": "verification-token-from-email"
  }
}
```

#### 4. メール認証再送信

```graphql
mutation ResendVerificationEmail($email: String!) {
  resendVerificationEmail(email: $email) {
    success
    message
  }
}
```

**変数:**
```json
{
  "email": "user@example.com"
}
```

### フロントエンドページ

#### 認証関連ページ

- `/auth/forgot-password` - パスワードリセット要求
- `/auth/reset-password?token=xxx` - パスワードリセット実行
- `/auth/verify-email?token=xxx` - メール認証確認
- `/auth/confirm-email-change?token=xxx` - メールアドレス変更確認

#### 使用例

```typescript
// パスワードリセット要求
const [requestReset] = useMutation(REQUEST_PASSWORD_RESET);

const handlePasswordReset = async (email: string) => {
  await requestReset({
    variables: { input: { email } }
  });
};
```

## セキュリティ機能

### レート制限

#### メール種別ごとの制限

| 種別 | 本番環境 | 開発環境 | 時間窓 |
|------|----------|----------|---------|
| パスワードリセット | 3回 | 100回 | 1時間 |
| メール認証 | 5回 | 50回 | 15分 |
| メール変更 | 2回 | 20回 | 1時間 |

#### IPアドレス制限

より厳格なIPアドレスベースの制限も併用。

### トークン管理

#### セキュリティ機能

- **セキュアトークン生成**: 暗号学的に安全なランダム生成
- **期限管理**: 種別ごとの適切な有効期限設定
- **自動クリーンアップ**: 期限切れトークンの自動削除
- **疑わしいアクティビティ検出**: 異常なトークン使用パターンの検出

#### 有効期限

- **メール認証**: 24時間
- **パスワードリセット**: 1時間
- **メール変更**: 24時間

### ログ記録

全操作で包括的なセキュリティログを記録：

- メール送信成功/失敗
- レート制限違反
- トークン検証結果
- 疑わしいアクティビティ

## メールテンプレート

### 実装済みテンプレート

1. **メール認証** (`sendEmailVerification`)
2. **パスワードリセット** (`sendPasswordResetEmail`)
3. **メールアドレス変更確認** (`sendEmailChangeConfirmation`)
4. **パスワードリセット完了通知** (`sendPasswordResetSuccessEmail`)

### テンプレート特徴

- **統一デザイン**: Material-UI風のスタイル
- **レスポンシブ**: モバイル対応
- **多言語対応**: 日本語UI
- **セキュリティ**: 自動生成メール警告

## 運用・保守

### 自動クリーンアップ

Vercel Cronジョブ（毎日午前2時実行）で自動クリーンアップ：

```bash
# 手動実行（開発環境）
curl -X POST http://localhost:3000/api/security/cleanup
```

### 監視・統計

```typescript
// トークン統計の取得
const tokenManager = createTokenManager(prisma);
const stats = await tokenManager.getTokenStatistics();

// 疑わしいアクティビティの検出
const suspiciousActivity = await tokenManager.detectSuspiciousTokenActivity(userId);
```

## トラブルシューティング

### よくある問題

#### 1. メールが送信されない

**原因:**
- Resend APIキーが無効
- 送信ドメインが未設定
- レート制限に達している

**対処法:**
```bash
# APIキーを確認
echo $RESEND_API_KEY

# ログを確認
tail -f logs/email-service.log
```

#### 2. トークンが無効

**原因:**
- トークンの有効期限切れ
- データベースの不整合
- 環境変数の設定ミス

**対処法:**
```bash
# トークンクリーンアップ実行
curl -X POST http://localhost:3000/api/security/cleanup

# 新しいトークンを再発行
# メール認証再送信機能を使用
```

#### 3. レート制限エラー

**原因:**
- 短時間での大量リクエスト
- 開発環境での設定ミス

**対処法:**
```typescript
// 開発環境では制限を確認
const isDev = process.env.NODE_ENV === 'development';
console.log('Rate limit settings:', { isDev });
```

### デバッグ方法

#### 1. ログの確認

```bash
# セキュリティログ
grep "email" logs/security.log

# メール送信ログ
grep "Email sent" logs/application.log
```

#### 2. データベース確認

```sql
-- アクティブなトークンを確認
SELECT 
  id, email, 
  emailVerificationToken, emailVerificationExpires,
  passwordResetToken, passwordResetExpires
FROM users 
WHERE emailVerificationToken IS NOT NULL 
   OR passwordResetToken IS NOT NULL;

-- レート制限状況を確認
SELECT * FROM rate_limit_entries 
WHERE key LIKE 'email_%' 
ORDER BY updatedAt DESC;
```

## 拡張方法

### 新しいメール種別の追加

1. **EmailService**に新しいメソッドを追加
2. **EmailRateLimit**に制限設定を追加
3. **GraphQLリゾルバー**に新しいミューテーションを追加
4. **フロントエンド**に対応ページを作成

### カスタムテンプレート

```typescript
// EmailServiceを拡張
public async sendCustomEmail(
  email: string,
  subject: string,
  htmlContent: string
): Promise<boolean> {
  return this.sendEmail({
    from: this.fromEmail,
    to: email,
    subject,
    html: htmlContent,
  });
}
```

## 最適化

### パフォーマンス

- **並行処理**: レート制限チェックとDB操作の並行実行
- **キャッシュ**: 頻繁にアクセスされるデータのキャッシュ
- **インデックス**: 検索パフォーマンスの最適化

### セキュリティ

- **トークンエントロピー**: 十分な長さの乱数生成
- **タイミング攻撃対策**: 一定時間でのレスポンス
- **レート制限**: 多層防御システム

## 本番環境デプロイ

### Vercel設定

```json
{
  "env": {
    "RESEND_API_KEY": "@resend-api-key",
    "RESEND_FROM_EMAIL": "noreply@yourdomain.com",
    "EMAIL_VERIFICATION_SECRET": "@email-verification-secret",
    "PASSWORD_RESET_SECRET": "@password-reset-secret"
  },
  "crons": [
    {
      "path": "/api/security/cleanup",
      "schedule": "0 2 * * *"
    }
  ]
}
```

### セキュリティチェックリスト

- [ ] 強力なシークレットキー設定
- [ ] 独自ドメインでのメール送信設定
- [ ] レート制限の適切な設定
- [ ] セキュリティログの監視設定
- [ ] 自動クリーンアップの動作確認

## まとめ

このメール認証システムは、エンタープライズレベルのセキュリティ機能を提供し、スケーラブルで保守性の高いアーキテクチャを実現しています。適切な設定と運用により、安全で信頼性の高いメール認証機能を提供できます。