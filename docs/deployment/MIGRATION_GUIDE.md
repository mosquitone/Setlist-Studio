# マイグレーション実行ガイド

## 本番環境でのマイグレーション手順

### 1. 本番環境での安全なマイグレーション

```bash
# 本番環境でのマイグレーション適用
npx prisma migrate deploy

# マイグレーション状況確認
npx prisma migrate status
```

### 2. Vercelでのマイグレーション

Vercelの場合、以下の方法でマイグレーションを実行できます：

#### 方法1: Vercel CLI
```bash
# Vercelにログイン
vercel login

# 本番環境変数を取得
vercel env pull .env.production

# 本番環境変数を使ってマイグレーション実行
dotenv -f .env.production run npx prisma migrate deploy
```

#### 方法2: Build Command
`vercel.json`または`package.json`でビルド時に実行：

```json
{
  "scripts": {
    "build": "prisma migrate deploy && next build",
    "vercel-build": "prisma migrate deploy && next build"
  }
}
```

### 3. 現在の未適用マイグレーション

```
20250701120235_add_security_tables  - 基本テーブル作成
20250718000000_add_audit_logs       - 監査ログテーブル作成
```

### 4. マイグレーションファイルの内容

#### 20250701120235_add_security_tables
- users, songs, setlists, setlist_items
- rate_limit_entries, security_events, threat_activities

#### 20250718000000_add_audit_logs
- audit_logs (シンプルな監査ログテーブル)

### 5. ローカル開発環境での適用

```bash
# 開発環境でマイグレーション適用
pnpm db:migrate dev

# または手動適用
dotenv -f .env.local run npx prisma migrate deploy
```

### 6. 注意事項

#### 本番環境での注意点
- **データの損失リスク**: 本番環境では`prisma migrate reset`を使用しない
- **ダウンタイム**: マイグレーション中はサービスが一時停止する可能性
- **バックアップ**: マイグレーション前に必ずデータベースをバックアップ

#### 推奨手順
1. ステージング環境でのマイグレーションテスト
2. 本番データベースのバックアップ
3. メンテナンスモードの有効化
4. マイグレーション実行
5. 動作確認
6. メンテナンスモードの解除

### 7. トラブルシューティング

#### マイグレーションが失敗した場合
```bash
# マイグレーション状況確認
dotenv -f .env.production run npx prisma migrate status

# 特定のマイグレーションを適用済みとしてマーク（注意深く使用）
dotenv -f .env.production run npx prisma migrate resolve --applied <migration_name>

# スキーマとDBの差分確認
dotenv -f .env.production run npx prisma db push --accept-data-loss
```

#### よくある問題
- **権限エラー**: データベースユーザーに適切な権限があるか確認
- **接続エラー**: DATABASE_URLが正しく設定されているか確認
- **タイムアウト**: 大きなテーブルの場合、タイムアウト設定を調整
- **P3005エラー**: 既存データベースのベースライン化が必要

#### 既存データベースのベースライン化（P3005エラー）
既存のデータベースに対してマイグレーションを適用する場合：

```bash
# 1. 既存のマイグレーションを適用済みとしてマーク
dotenv -f .env.production run npx prisma migrate resolve --applied "20250701120235_add_security_tables"

# 2. 新しいマイグレーションのみ適用
dotenv -f .env.production run npx prisma migrate deploy
```

または、強制的にスキーマを同期（データ損失の可能性があるため注意）：
```bash
# 注意: 本番環境では使用しないでください
dotenv -f .env.production run npx prisma db push --accept-data-loss
```

### 8. Vercel固有の設定

#### 環境変数
```bash
# Vercelで設定する環境変数
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
```

#### vercel.json設定例
```json
{
  "buildCommand": "prisma migrate deploy && npm run build",
  "functions": {
    "app/api/**/*.js": {
      "maxDuration": 60
    }
  }
}
```

## まとめ

本番環境では必ず`prisma migrate deploy`を使用し、開発環境では`prisma migrate dev`を使用してください。データの安全性を最優先に、適切な手順でマイグレーションを実行しましょう。