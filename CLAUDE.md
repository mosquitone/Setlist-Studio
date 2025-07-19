# CLAUDE.md

このファイルは、Claude Code（claude.ai/code）がこのリポジトリでコード作業を行う際のガイダンスを提供します。

## プロジェクト概要

mosquitone Emotional Setlist Studioは、音楽バンド向けのモダンなセットリスト生成アプリケーションです。ユーザー認証、楽曲管理、セットリスト作成機能を備えています。Vercel Functionsを活用したGraphQL APIルートを持つ統一されたNext.jsアーキテクチャを使用し、本番環境デプロイ対応済みです。

### リポジトリ構成
- **開発リポジトリ**: GitHub（このリポジトリ）
- **デプロイリポジトリ**: GitLab（https://gitlab.com/mosquitone8/setlist-studio）
- **デプロイメント**: Vercelを通じてGitLabリポジトリから本番環境へデプロイ

## ソース修正

すべての実装が完了後、必ずlintチェックとコンパイルチェックを行った上で、完了とすること。
コミット前に、必ずClaude.mdを更新するかを検討すること

### Git操作
- **GitHub CLI**: `gh` コマンドが利用可能（v2.74.1）- プルリクエスト、Issue管理
- **GitLab CLI**: `glab` コマンドが利用可能（v1.63.0）- プロジェクト管理、MRなど
- **リモートリポジトリ**: 
  - `origin`: GitHub（開発用）
  - `gitlab`: GitLab（デプロイ用）

## 開発コマンド

### 基本開発コマンド
- **開発サーバー起動**: `pnpm dev` (Next.js + GraphQL API を http://localhost:3000 で実行)
- **本番ビルド**: `pnpm build`
- **コードチェック**: `pnpm lint`
- **lint問題の修正**: `pnpm lint:fix`
- **TypeScript型チェック**: `npx tsc --noEmit`

### GraphQL開発
- **GraphQLスキーマ生成**: `pnpm generate:schema` (デバッグ用スキーマファイルを生成)
- **GraphQLスキーマファイル**: `src/lib/server/graphql/schema.graphql`
- **TypeScript生成スキーマ**: `src/lib/server/graphql/generated-schema.ts`

### データベース操作
- **初期セットアップ**: `pnpm db:setup` (セキュリティ対応PostgreSQL初回セットアップ)
- **PostgreSQL起動**: `docker-compose up -d postgres`
- **スキーマ変更適用**: `pnpm db:push`
- **Prismaクライアント生成**: `pnpm generate`
- **データベーススタジオ開く**: `pnpm db:studio`
- **マイグレーション作成**: `pnpm db:migrate`

### 環境セットアップ
- **依存関係インストール**: `pnpm install`
- **環境変数セットアップ**: `cp .env.example .env.local`
- **必須環境変数** (`.env.local`内):
  - `DATABASE_URL`: PostgreSQL接続文字列
  - `JWT_SECRET`: JWTトークン生成用シークレットキー (32文字以上)
  - `CSRF_SECRET`: CSRF保護シークレット、JWT_SECRETとは別 (32文字以上)
  - `IP_HASH_SALT`: IPアドレスハッシュ化用ソルト (16文字以上)
  - `CRON_SECRET`: Vercelクロンジョブ認証用シークレット (32文字以上)
  - `POSTGRES_PASSWORD`: Docker用PostgreSQLパスワード (ローカル開発のみ)
  - `RESEND_API_KEY`: Resendメール送信APIキー
  - `RESEND_FROM_EMAIL`: メール送信元アドレス
  - `EMAIL_VERIFICATION_SECRET`: メール認証用シークレット (32文字以上)
  - `PASSWORD_RESET_SECRET`: パスワードリセット用シークレット (32文字以上)

### 環境変数詳細

| 変数 | 用途 | ローカル開発 | 本番環境 (Vercel) | 生成方法 |
|----------|---------|-------------------|---------------------|------------|
| `DATABASE_URL` | データベース接続 | `postgresql://postgres:postgres@localhost:5432/setlist_generator` | マネージドDB接続文字列 | プロバイダから提供 |
| `JWT_SECRET` | JWTトークン署名 | 32文字以上の任意文字列 | 強力なランダム文字列 | `openssl rand -base64 32` |
| `CSRF_SECRET` | CSRFトークン署名 | 32文字以上の任意文字列 | JWT_SECRETとは別の文字列 | `openssl rand -base64 32` |
| `IP_HASH_SALT` | IP匿名化 | 16文字以上の任意文字列 | 強力なランダム文字列 | `openssl rand -base64 16` |
| `CRON_SECRET` | クロンジョブ認証 | 32文字以上の任意文字列 | 強力なランダム文字列 | `openssl rand -base64 32` |
| `POSTGRES_PASSWORD` | Docker PostgreSQL | `postgres` | 未使用 (マネージドDB) | N/A |
| `RESEND_API_KEY` | Resendメール送信 | `re_xxxxxx` | Resendダッシュボードから取得 | Resendアカウント作成 |
| `RESEND_FROM_EMAIL` | メール送信元 | `onboarding@resend.dev` | `noreply@yourdomain.com` | 独自ドメイン設定 |
| `EMAIL_VERIFICATION_SECRET` | メール認証署名 | 32文字以上の任意文字列 | 強力なランダム文字列 | `openssl rand -base64 32` |
| `PASSWORD_RESET_SECRET` | パスワードリセット署名 | 32文字以上の任意文字列 | 強力なランダム文字列 | `openssl rand -base64 32` |
| `NODE_ENV` | 環境モード | `development` | Vercelで自動設定 | N/A |

## アーキテクチャ概要

### ハイブリッドNext.jsアーキテクチャ (Static + Serverless)
アプリケーションは、モダンで性能最適化されたハイブリッドアーキテクチャを使用しています：

**フロントエンド & バックエンド (Next.js 15.3.4)**
- Next.js 15.3.4 App Router、TypeScript 5、ハイブリッドレンダリング戦略
- Material-UI v5.17.1（カスタムテーマとパッケージ最適化付き）
- Apollo Client 3.13.8 for GraphQL状態管理
- クライアントサイド認証状態管理
- React 19.0.0（strict mode）

**性能最適化**
- **静的ページ**: ログイン/登録ページは完全静的生成でCDN配信 (10倍高速)
- **SSRページ**: 動的ページ（セットリスト、楽曲）はセキュリティのためサーバーレンダリング
- **画像最適化**: WebP/AVIF形式サポート、1日キャッシュTTL
- **バンドル最適化**: MUIコンポーネント用に最適化されたパッケージインポート

**GraphQL API (Vercel Functions)**
- Apollo Server v4.12.2が`/api/graphql`でNext.js APIルートとして動作
- Type-GraphQL 1.1.1によるスキーマファーストAPI開発
- PostgreSQL用ORM Prisma 6.11.0
- JWTトークンとbcryptjs 3.0.2によるHttpOnly Cookie認証
- セキュリティ強化: クエリ深度制限、リクエストサイズ制限、イントロスペクション制御
- 循環依存なしでリレーションを処理するフィールドリゾルバー

**データベース**
- DockerコンテナでPostgreSQL 15を実行
- User、Song、Setlist、SetlistItemモデルを含むPrismaスキーマ
- 全エンティティでCUIDベースのID

### 主要コンポーネント

**データモデル**
- `User`: 一意のemail/usernameによる認証とユーザー管理
- `Song`: メタデータ付き楽曲（タイトル、アーティスト、キー、テンポ、長さ、メモ）
- `Setlist`: バンド/会場情報付きパフォーマンス用楽曲コレクション
- `SetlistItem`: セットリストと楽曲を順序・タイミング付きで結ぶ中間テーブル

**主要機能**
- **セットリスト管理**: ドラッグ&ドロップ楽曲順序付きでセットリストの作成、編集、削除、複製
- **画像生成**: 合理化されたUIでプロフェッショナルなセットリスト画像生成 - テーマ選択 + ワンクリックダウンロード
- **QRコード統合**: セットリストページへのリンク付き自動QRコード
- **テーマシステム**: ドロップダウンセレクター付きBlack/Whiteテーマ
- **複製システム**: URLクエリパラメータによる既存セットリストのクローン
- **認証**: JWTトークンと保護ルート付きHttpOnly Cookieベースユーザーシステム

**フロントエンドアーキテクチャ**
- MUIProviderとApolloProviderを分離したProviderパターン
- 青/赤カラースキーム、Interフォント付きカスタムMUIテーマ
- HttpOnly Cookie認証とCSRF保護が設定されたApollo Client
- NextJS App Routerによるクライアントサイドルーティング
- html2canvasとQRコード統合を使用した高度な画像生成システム
- UX向上のためのBlack/White選択による簡素化テーマシステム
- Material-UIコンポーネントによるレスポンシブデザイン

**GraphQL統合**
- Apollo ClientはHttpOnly Cookieによる自動認証を使用
- GraphQL APIはCookieベースJWTトークン検証のAuthMiddlewareを使用
- ミューテーション用トークンベース検証によるCSRF保護
- 統一GraphQLバージョン: v15.8.0（pnpm overrideによる互換性）

### 認証フロー
- セキュアなHttpOnly CookieにJWTトークンを保存
- 保護されたGraphQLリゾルバーはCookie検証付きAuthMiddlewareデコレーターを使用
- Cookie管理付きGraphQLミューテーションによるユーザー登録/ログイン
- サブスクリプションパターンのsecureAuthClientによるクライアントサイド認証状態管理
- 状態変更操作の自動CSRF保護

## 重要な設定ノート

### GraphQLバージョン管理
- pnpm overrideによる統一GraphQLバージョン: v15.8.0
- Apollo Client 3.13.8とType-GraphQL 1.1.1の両方と互換性
- 依存関係管理簡素化のための単一package.json

### パッケージ管理
- Node.js 20.11.1要件でpnpm 10.12.1を使用
- プロジェクトルートの単一統合package.json
- コードフォーマット用ESLint 9.x、TypeScript 5、Prettier 3.6.2
- **ESLint設定**: ignoresプロパティ付きフラット設定形式（eslint.config.mjs）を使用

### 開発ワークフロー（ローカル）
1. 依存関係インストール: `pnpm install`
2. PostgreSQL起動（初回セットアップ）:
   ```bash
   pnpm db:setup
   ```
   
   または手動で:
   ```bash
   # セキュリティ設定を一時的に無効化
   sed -i.bak 's/user: "999:999"/# user: "999:999"/' docker-compose.yml
   sed -i.bak 's/read_only: true/# read_only: true/' docker-compose.yml
   
   # PostgreSQL起動と初期化
   docker-compose down -v && docker-compose up -d postgres
   sleep 10 && pnpm db:push
   
   # セキュリティ設定を再有効化
   sed -i.bak 's/# user: "999:999"/user: "999:999"/' docker-compose.yml
   sed -i.bak 's/# read_only: true/read_only: true/' docker-compose.yml
   docker-compose up -d postgres
   ```
3. 開発サーバー起動: `pnpm dev`
4. 以降の起動: `docker-compose up -d postgres && pnpm dev`

### 本番デプロイ（Vercel）
- **データベース**: Vercel Postgresまたは外部マネージドDBサービス（Supabase、Neon、Railway）を使用
- **環境変数**: Vercelダッシュボードで設定（全て必須）:
  - `DATABASE_URL`: 本番データベースへの接続文字列（SSL付き）
  - `JWT_SECRET`: 強力な本番シークレット（32文字以上、一意）
  - `CSRF_SECRET`: JWT_SECRETとは別（32文字以上、一意）
  - `IP_HASH_SALT`: IPアドレス匿名化用（16文字以上、一意）
  - `CRON_SECRET`: クロンジョブ認証用（32文字以上、一意）
- **クロンジョブ**: Vercelダッシュボードで設定
  - path: `/api/cron/cleanup`
  - スケジュール: `0 2 * * *`（毎日午前2時）
- **セキュリティヘッダー**: vercel.jsonにより自動適用
- **Vercel Functions設定**: 
  - GraphQL API: 最大実行時間60秒、メモリ1024MB
  - リージョン: hnd1（東京）
  - パフォーマンス最適化: メモリ増強によるcold start時間短縮
- **注意**: docker-compose.ymlはローカル開発のみ、Vercelでは未使用

詳細なデプロイ手順は [VERCEL_DEPLOYMENT_GUIDE.md](./docs/deployment/VERCEL_DEPLOYMENT_GUIDE.md) を参照

### プロジェクト構造
```
/                           # Next.jsアプリケーションルート
├── docs/                   # 技術ドキュメント（構造化済み）
│   ├── api/                # API・GraphQL関連ドキュメント
│   │   ├── API_ROUTES.md
│   │   ├── GRAPHQL_BEGINNERS_GUIDE.md
│   │   ├── GRAPHQL_CIRCULAR_DEPS_RESOLUTION.md
│   │   └── GRAPHQL_SCHEMA_TYPES.md
│   ├── database/           # データベース・Prisma関連ドキュメント
│   │   ├── PRISMA_BEGINNERS_GUIDE.md
│   │   ├── PRISMA_OPTIMIZATION_GUIDE.md
│   │   └── PRISMA_GRAPHQL_INTEGRATION.md
│   ├── deployment/         # デプロイ・運用関連ドキュメント
│   │   ├── VERCEL_DEPLOYMENT_GUIDE.md
│   │   └── SUPABASE_SETUP_GUIDE.md
│   ├── security/           # セキュリティ関連ドキュメント
│   │   ├── SECURITY.md
│   │   └── SECURITY_TEST_PLAN.md
│   └── project/            # プロジェクト管理ドキュメント
│       └── HISTORY.md
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # APIルート（Vercel Functions）
│   │   │   ├── auth/       # 認証エンドポイント
│   │   │   │   └── route.ts
│   │   │   ├── csrf/       # CSRF保護
│   │   │   │   └── route.ts
│   │   │   ├── graphql/    # GraphQL API
│   │   │   │   └── route.ts
│   │   │   └── security/   # セキュリティ関連
│   │   │       └── cleanup/
│   │   │           └── route.ts
│   │   ├── (pages)/        # グループルート（利用規約・プライバシーポリシー）
│   │   │   ├── privacy/    # プライバシーポリシー
│   │   │   │   └── page.tsx
│   │   │   └── terms/      # 利用規約
│   │   │       └── page.tsx
│   │   ├── guide/          # ガイドページ
│   │   │   └── page.tsx
│   │   ├── login/          # ログインページ
│   │   │   ├── page.tsx
│   │   │   └── LoginClient.tsx
│   │   ├── auth/           # 認証関連ページ
│   │   │   ├── check-email/ # メール認証ページ
│   │   │   │   ├── page.tsx
│   │   │   │   └── CheckEmailClient.tsx
│   │   │   └── forgot-password/ # パスワードリセット
│   │   │       └── ForgotPasswordClient.tsx
│   │   ├── profile/        # プロフィールページ
│   │   │   └── page.tsx
│   │   ├── register/       # 登録ページ
│   │   │   ├── page.tsx
│   │   │   └── RegisterClient.tsx
│   │   ├── setlists/       # セットリスト管理
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── songs/          # 楽曲管理
│   │   │   ├── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── globals.css     # グローバルスタイル
│   │   ├── layout.tsx      # ルートレイアウト
│   │   ├── page.tsx        # ホームページ
│   │   ├── HomeClient.tsx  # ホームページクライアントコンポーネント
│   │   └── sitemap.ts      # サイトマップ生成
│   ├── components/         # Reactコンポーネント
│   │   ├── auth/           # 認証関連コンポーネント
│   │   │   └── LogoutButton.tsx
│   │   ├── common/         # 共通UIコンポーネント
│   │   │   ├── layout/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Header.tsx
│   │   │   └── ui/
│   │   │       ├── ErrorMessage.tsx
│   │   │       ├── LoadingSpinner.tsx
│   │   │       └── SuccessMessage.tsx
│   │   ├── forms/          # フォーム関連コンポーネント
│   │   │   ├── SetlistForm.tsx
│   │   │   └── SongForm.tsx
│   │   ├── home/           # ホームページ専用コンポーネント
│   │   │   ├── Feature.tsx
│   │   │   ├── Features.tsx
│   │   │   └── HeroSection.tsx
│   │   ├── providers/      # コンテキストプロバイダー
│   │   │   ├── Providers.tsx
│   │   │   ├── MuiProvider.tsx
│   │   │   ├── ApolloProvider.tsx
│   │   │   └── CSRFProvider.tsx
│   │   ├── setlist/        # セットリスト専用コンポーネント
│   │   │   ├── SetlistActions.tsx
│   │   │   ├── SetlistDetail.tsx
│   │   │   ├── SetlistDetails.tsx
│   │   │   ├── SetlistListItem.tsx
│   │   │   ├── SetlistList.tsx
│   │   │   ├── SongListItem.tsx
│   │   │   ├── ImageGenerator.tsx
│   │   │   └── ShareButtons.tsx
│   │   ├── setlist-themes/ # テーマシステム
│   │   │   ├── BasicBlackTheme.tsx
│   │   │   ├── BasicWhiteTheme.tsx
│   │   │   └── themes.ts
│   │   └── songs/          # 楽曲管理コンポーネント
│   │       ├── SongList.tsx
│   │       └── SongListItem.tsx
│   ├── hooks/              # カスタムReactフック
│   │   ├── useAuth.ts
│   │   ├── useCSRF.ts
│   │   ├── useSetlists.ts
│   │   └── useSongs.ts
│   ├── lib/                # 共有ユーティリティ
│   │   ├── client/         # クライアントサイドユーティリティ
│   │   │   ├── apolloClient.ts
│   │   │   ├── authClient.ts
│   │   │   └── queries.ts
│   │   ├── server/         # サーバーサイドユーティリティ
│   │   │   ├── auth/
│   │   │   │   ├── auth.ts
│   │   │   │   └── middleware.ts
│   │   │   ├── email/          # メール配信システム
│   │   │   │   ├── emailService.ts
│   │   │   │   └── emailReliability.ts
│   │   │   ├── graphql/
│   │   │   │   ├── context.ts
│   │   │   │   ├── generated-schema.ts
│   │   │   │   ├── resolvers/
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── AuthResolver.ts
│   │   │   │   │   ├── SetlistResolver.ts
│   │   │   │   │   ├── SongResolver.ts
│   │   │   │   │   └── UserResolver.ts
│   │   │   │   ├── schema.graphql
│   │   │   │   └── schema.ts
│   │   │   └── prisma.ts
│   │   ├── security/       # セキュリティ関連ユーティリティ
│   │   │   ├── csrf.ts
│   │   │   ├── headers.ts
│   │   │   ├── rateLimit.ts
│   │   │   ├── threatDetection.ts
│   │   │   ├── simple-audit-logger.ts
│   │   │   └── security-logger-db.ts
│   │   └── shared/         # クライアント/サーバー共有ユーティリティ
│   │       └── types.ts
│   └── types/              # TypeScript型定義
│       ├── graphql.ts
│       └── index.ts
├── prisma/                 # データベース関連
│   ├── migrations/         # マイグレーション
│   └── schema.prisma       # Prismaスキーマ
├── public/                 # 静的アセット
│   └── favicon.ico
├── scripts/                # 開発スクリプト
│   └── generate-schema.ts
├── .env.example            # 環境変数サンプル
├── .gitignore
├── CLAUDE.md               # このファイル
├── docker-compose.yml      # ローカル開発用PostgreSQL
├── eslint.config.mjs       # ESLint設定
├── next.config.ts          # Next.js設定
├── package.json            # プロジェクト設定
├── pnpm-lock.yaml          # 依存関係ロックファイル
├── README.md               # プロジェクトREADME
├── tsconfig.json           # TypeScript設定
└── vercel.json             # Vercelデプロイ設定
```

### 主要ディレクトリ詳細

**docs/**: 技術ドキュメント（構造化済み）
- `api/`: API Routes・GraphQL関連ドキュメント
- `database/`: Prisma関連ドキュメント（初心者ガイド・最適化・GraphQL統合）
- `deployment/`: Vercelデプロイ・Supabase設定
- `security/`: セキュリティアーキテクチャ・テストプラン
- `project/`: 更新履歴・プロジェクト管理

**src/app/**: Next.js App Router
- `api/`: Vercel Functions（auth、csrf、graphql、security）
- 各ページ: login、register、guide、profile、setlists、songs

**src/components/**: Reactコンポーネント
- `common/`: ui、layout、auth関連の共通コンポーネント
- `forms/`: セットリスト・楽曲フォーム
- `setlist/`: セットリスト表示・画像生成・アクション
- `setlist-themes/`: Black/Whiteテーマシステム

**src/lib/**: 共有ユーティリティ
- `server/graphql/`: GraphQLスキーマ、リゾルバー、型定義
- `server/email/`: メール配信システム（Circuit Breaker・リトライ機構付き信頼性向上）
- `security/`: レート制限、脅威検出、CSRF保護、軽量監査ログ（AuditLog）
- `client/`: Apollo Client、認証クライアント

### 現在のステータス
- **アーキテクチャ**: 最適化されたstatic/SSRレンダリング戦略によるハイブリッドNext.jsアプリケーション
- **パフォーマンス**: ログイン/登録ページ10倍高速化（静的）、認証最適化されたホームページ
- **データベース**: Prisma経由で完全スキーマが適用されたPostgreSQL
- **認証**: JWTトークン付きregister/login用完全GraphQLリゾルバー
- **フロントエンド**: パフォーマンス最適化ページとセットリスト管理を持つ完全アプリケーション
- **セットリスト管理**: 複製機能付き完全CRUD操作
- **ユーザーインターフェース**: アクションボタン付き合理化セットリスト詳細ページ（編集、ダウンロード、共有、複製）
- **画像生成**: テーマ選択ドロップダウンとデバッグプレビューモード付き簡素化ワンクリックダウンロードシステム
- **テーマシステム**: リアルタイムプレビュー更新、ローディング状態、適切なテーマ永続化付きBlack/Whiteテーマ
- **ブランディング**: テンプレートベースメタデータ付き統一"Setlist Studio"タイトルシステム
- **複製機能**: クエリパラメータ経由でセットリストをクローン（/setlists/new?duplicate=ID）
- **開発**: ホットリロードとAPIルート付きハイブリッド最適化Next.jsセットアップ
- **コード品質**: Type-GraphQL循環依存解決、全TypeScript警告解決、型安全性強化（any型排除、JWT型ガード、共通型統合）
- **セキュリティ**: 強化セキュリティ機能とEOL脆弱性修正付きApollo Server v4
- **SEO対策**: 完全実装済み（プレビューデプロイメント制御、動的サイトマップ、AIボット制御、2025年対応）
- **コンプライアンス**: 利用規約・プライバシーポリシー完全実装、実装整合性確保
- **デプロイ**: Vercel用ハイブリッドアーキテクチャ最適化で本番対応
- **PR #40改善実装**: セキュリティ強化・UX改善・メール信頼性向上完了（2025-07-19）
  - ✅ メール認証UX改善（/auth/check-email、プログレス表示、再送信クールダウン）
  - ✅ セキュリティ強化（軽量監査ログ、Circuit Breaker、リトライ機構）
  - ✅ 本番環境マイグレーション対応（完全ガイド・P3005エラー対応）
  - ✅ Vercelリソース効率化（軽量実装、コスト最適化）
- **i18n(国際化)機能**: 完全実装完了（2025-07-19）
  - ✅ 日本語・英語対応の完全なメッセージシステム
  - ✅ 認証状態メッセージ・フォームバリデーション国際化
  - ✅ メール機能WithDetails版への移行完了
  - ✅ 全UIコンポーネントの多言語対応実装

## API Routes詳細

詳細なAPI仕様については、[API_ROUTES.md](./docs/api/API_ROUTES.md)を参照してください。

### 主要エンドポイント
- `/api/auth` - JWT認証管理
- `/api/csrf` - CSRF保護トークン生成
- `/api/graphql` - メインGraphQL API
- `/api/security/cleanup` - セキュリティデータクリーンアップ

## パフォーマンス最適化（ハイブリッドアーキテクチャ）

### レンダリング戦略最適化
アプリケーションは最適なパフォーマンスのための戦略的ハイブリッドアプローチを実装：

| ページタイプ | 戦略 | パフォーマンス向上 | キャッシュ |
|-----------|----------|------------------|---------|
| `/login`, `/register` | **静的生成** | **10倍高速** | CDN永続 |
| `/` (ホーム) | **SSR** | 認証依存 | キャッシュなし |
| `/setlists/[id]` | **SSR** | セキュリティ重視 | キャッシュなし |
| `/songs`, `/profile` | **SSR** | 認証必須 | キャッシュなし |

### 技術実装
- **静的ページ**: ビルド時事前構築、CDNから即座に配信
- **SSRページ**: リクエスト毎サーバーレンダリング（保護コンテンツ）
- **APIルート**: 全GraphQL操作用サーバーレス関数

### SEO & パフォーマンス利点
- **Core Web Vitals**: 劇的に向上したローディングスコア
- **検索エンジン最適化**: 静的ページの即座インデックス
- **ユーザーエクスペリエンス**: 認証ページのほぼ瞬時ページロード
- **コスト効率**: 戦略的キャッシュによるサーバー負荷軽減

## 最近のUI/UX改善

### セットリスト詳細ページ (/setlists/[id])
- **簡素化レイアウト**: よりクリーンな単一ページ体験のためタブインターフェースを削除
- **アクションボタン行**: 編集、ダウンロード、共有、複製ボタンの水平レイアウト
- **テーマセレクター**: "Theme: basic/white"形式の右上ドロップダウン
- **成功通知**: 画像ダウンロード成功後の"Setlist Generated !"バナー
- **ワンクリックダウンロード**: プレビュータブなしの直接画像生成・ダウンロード

### 画像生成システム
- **合理化コンポーネント**: ImageGeneratorを単一ダウンロードボタンに簡素化
- **リアルタイムプレビュー**: テーマ変更でローディング状態付きプレビューを即座更新
- **ダウンロード統合**: useRefを使用して自動ダウンロードを防止、ボタンクリック時のみ
- **QRコード統合**: 生成画像に自動QRコードを含める
- **デバッグモード**: DOMプレビューと画像プレビュー間の開発専用トグル
- **統一プレビューサイズ**: 全モードで一貫表示のための700px × 990px（A4比率）

### 複製ワークフロー
- **クエリパラメータシステム**: シームレスクローンのための`/setlists/new?duplicate={id}`
- **自動入力フォーム**: 元セットリストデータが"(コピー)"サフィックス付きでフォームを事前入力
- **構造保持**: 複製で楽曲順序、タイミング、全メタデータを維持

### CSRF & CSP実装 (2025-07-01)
- **CSRFトークンAPI**: セキュアなトークン生成と配布のため`/api/csrf`エンドポイントを追加
- **CSP開発修正**: 開発時のみ`unsafe-inline`と`unsafe-eval`を許可するようContent Security Policyを更新
- **Apollo Client統合**: 全GraphQLミューテーション用の自動CSRFトークン取得とヘッダー注入
- **集約CSRF管理**: 単一CSRFProviderがアプリ全体のトークン初期化を処理、重複useCSRF呼び出しを削除
- **本番セキュリティ**: Next.js開発機能を有効にしながら本番で厳格なCSPを維持

## セキュリティアーキテクチャ

包括的なセキュリティ実装については、[SECURITY.md](./docs/security/SECURITY.md)を参照してください。

### 主要セキュリティ機能
- **HttpOnly Cookie認証**: XSS攻撃防止
- **CSRF保護**: タイミング攻撃耐性
- **レート制限**: 分散対応データベースベース
- **脅威検出**: ブルートフォース攻撃検出
- **監査ログ**: リスクベース軽量監査システム（AuditLogテーブル）
- **データ保護**: 入力サニタイゼーション + SQLインジェクション防止
- **自動クリーンアップ**: Vercelクロン経由の定期メンテナンス

### セキュリティレベル
エンタープライズ級セキュリティ（OWASP Top 10準拠）を実装済み

## 更新履歴と記録

最新の開発履歴と変更記録については、[HISTORY.md](./docs/project/HISTORY.md)を参照してください。

### 最新の主要更新
- **i18n(国際化)機能完全実装 (2025-07-19)**: 日本語・英語対応の完全な多言語システム
  - ✅ 統合メッセージ構造（messages.ts）による一元管理
  - ✅ 認証状態・フォームバリデーション・UI全体の国際化
  - ✅ WithDetails版メール機能への移行完了
  - ✅ 全34コンポーネントの多言語対応実装
- **PR #40改善実装完了 (2025-07-19)**: セキュリティ強化・UX改善・メール信頼性向上・本番マイグレーション完了
  - ✅ メール認証UX改善（/auth/check-email、プログレス表示、再送信クールダウンタイマー）
  - ✅ セキュリティ強化（軽量監査ログAuditLog、Circuit Breaker、exponential backoffリトライ）
  - ✅ 本番環境マイグレーション対応（完全ガイド・P3005エラー対応手順）
  - ✅ Vercelリソース効率化（軽量実装、コスト最適化、デグレードなし）
- **高優先度SEO対策実装 (2025-07-18)**: プレビューデプロイメント制御、動的サイトマップ、AIボット制御完全実装
- **利用規約・プライバシーポリシー実装整合性修正 (2025-07-18)**: 虚偽記載の削除、Cookie使用の正確化、実装済みセキュリティ機能の明記
- **GraphQL N+1問題解決 (2025-07-17)**: SetlistResolver FieldResolver最適化、事前ロード戦略による性能向上
- **useSongsフック責務分割リファクタリング (2025-07-17)**: Issue #25対応
- **セットリスト表示最適化 & DRY原則実装 (2025-07-17)**: Issue #34対応
- **GraphQLドキュメント体系化 (2025-07-17)**: 3つの詳細ガイドに分割
- **セキュリティアーキテクチャ強化 (2025-07-01)**: エンタープライズ級実装
- **パフォーマンス最適化 (2025-07-11)**: GraphQL API高速化