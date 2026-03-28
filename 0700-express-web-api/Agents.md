# セットアップメモ

## PostgreSQL の起動

日本語ロケール対応の PostgreSQL イメージは `docker/postgres/Dockerfile` を使います。

```bash
docker compose up -d
```

停止:

```bash
docker compose down
```

データも削除する場合:

```bash
docker compose down -v
```

## Prisma 関連パッケージのインストール

```bash
npm install -D prisma @types/pg
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

## Prisma 初期化

初回のみ:

```bash
npx prisma init --output ./generated/prisma
```

## 環境変数

`.env` には Docker Compose の PostgreSQL へ接続するため、以下を設定しています。

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app?schema=public"
```

## Prisma スキーマの反映

スキーマ変更後にマイグレーションを作成して適用:

```bash
npx prisma migrate dev --name init
```

Prisma Client のみ再生成する場合:

```bash
npx prisma generate
```

DB の状態を確認したい場合:

```bash
npx prisma studio
```

## 追加済みスキーマ

- `User` -> `users`
- `Project` -> `projects`
- `Task` -> `tasks`

## 関連ファイル

- `compose.yaml`
- `docker/postgres/Dockerfile`
- `prisma/schema.prisma`
- `prisma.config.ts`
- `.env`
