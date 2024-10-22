# Pricma setup
[公式を参照](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)


公式の手順から省略できる部分を見直すと：

1. 必要なパッケージのインストール：
```bash
npm install prisma --save-dev
```
- `typescript`は Next.jsに含まれている
- `ts-node`と`@types/node`は不要（Next.jsで既に設定済み）

2. TypeScript初期化（`npx tsc --init`）：
- 不要（Next.jsプロジェクトで既に設定済み）

3. Prisma初期化：
```bash
npx prisma init
```

4. schema.prismaの設定例（最小限）：
```prisma
datasource db {
  provider = "postgresql"
  url      = env.DATABASE_URL
}

generator client {
  provider = "prisma-client-js"
}

model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

5. .envファイルの設定：
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

6. データベースへの反映：
```bash
npx prisma db push
```

これで：
- 必要最小限の設定
- Todoテーブルの作成
- Prismaクライアントの生成

が完了します。余分な設定を省いたシンプルな構成になりました。

## use seed
ダミーデータを作成する。prismaディレクトリにseed.tsを作成する。
```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // サンプルデータの作成
  await prisma.todo.createMany({
    data: [
      {
        title: 'Notionに日々の学びを書く',
        completed: false,
      },
      {
        title: '筋トレをする',
        completed: true,
      },
      {
        title: '朝活をする',
        completed: false,
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

## prisma-applicationディレクトリで実行

テーブル名の大文字小文字が原因のようです。PostgreSQLでは、ダブルクォートで囲まない限り、テーブル名は小文字として扱われます。

正しいクエリは以下のようになります：

```sql
SELECT * FROM "Todo";
```

または、`schema.prisma`を修正して小文字のテーブル名を使用することもできます：

```prisma
model todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())

  @@map("todo") // 明示的にテーブル名を指定
}
```

この場合は、以下の手順が必要です：

1. schema.prismaを修正
2. マイグレーションを再実行：
```bash
npx prisma migrate reset  // 既存のテーブルを削除して再作成
npx prisma migrate dev --name fix_table_name
```

どちらの方法を選択するかは、プロジェクトの要件に応じて決めてください：
1. SQLクエリで大文字小文字を意識する（`"Todo"`を使用）
2. すべて小文字のテーブル名に統一する（schema.prismaを修正）


## Use Prisma Studio
[公式を参照](https://www.prisma.io/docs/orm/tools/prisma-studio)

add package:
```shell
npm install @prisma/client
```

use prisma studio:
```shell
npx prisma studio
```