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