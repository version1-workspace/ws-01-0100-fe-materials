


# プロジェクト作成

```bash
mkdir my-app
cd my-app
npm init -y
```

# Express インストール

```bash
npm install express
```

# TypeScript 関連のパッケージインストール


```bash
npm install -D typescript ts-node @types/node @types/express
```

# tsconfig.json 作成

```bash
npx tsc --init
```

# Prisma のインストール

https://www.prisma.io/docs/prisma-orm/quickstart/prisma-postgres

```bash
npm install prisma @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

## Prisma の初期化

```bash
npx prisma init
```

```bash
npx prisma init --output ./generated/prisma
```

# Docker+PostgreSQL のセットアップ

```bash
```
