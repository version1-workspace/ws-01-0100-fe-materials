
# Todo 管理用 Web API

## 使用技術

- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker

## ディレクトリ構成

- `src/app.ts`
  Express アプリケーションの組み立てを行います。テストではこの `app` を直接利用します。
- `src/index.ts`
  アプリケーションの起動エントリポイントです。
- `src/lib`
  JWT や共通エラーなど、アプリケーション全体で使うユーティリティを配置しています。
- `src/middleware`
  認証、async handler、error handler などの Express middleware を配置しています。
- `src/models`
  Prisma を使ったデータアクセスをまとめています。Controller から ORM を直接呼ばないための層です。
- `src/routes`
  HTTP リクエストを受け取り、入力検証、model 呼び出し、serializer 呼び出しを担当します。
- `src/serializers`
  API レスポンス用の整形処理と `XXXResponse` 型を配置しています。
- `prisma`
  Prisma schema、migration、seed を管理します。
- `public/spec`
  Swagger UI と OpenAPI 定義を配置しています。
- `tests/e2e`
  Swagger の要件を満たしているかを確認する E2E テストを配置しています。

## セットアップ

PostgreSQL を Docker で起動します。

```bash
docker compose up -d
```

必要な依存をインストールします。

```bash
npm install
```

マイグレーションを適用します。

```bash
npx prisma migrate dev
```

初期データを投入します。

```bash
npm run db:seed
```

## API仕様について

API 仕様は [public/spec/swagger.yml](/Users/admin/Projects/Menta/ws-01-0001-fe-materials/0700-express-web-api/public/spec/swagger.yml) を参照してください。

Swagger UI を使用して API 仕様を確認することもできます。

```bash
npm run dev
```

「http://localhost:3000/spec」にアクセスすると Swagger UI が表示されます。

## テスト

単体テストと E2E テストは Vitest で実行します。

```bash
npm test
```

ウォッチモードで実行する場合:

```bash
npm run test:watch
```

テストの内訳:

- `src/**/*.test.ts`
  各モジュールと同階層に置いた単体テストです。
- `tests/e2e/swagger.e2e.test.ts`
  `swagger.yml` の主要要件に沿った E2E テストです。
