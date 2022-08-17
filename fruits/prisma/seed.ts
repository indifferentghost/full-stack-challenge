import { PrismaClient } from "@prisma/client";
import fruits from "../../fruitList.json";

const prisma = new PrismaClient();

async function resetDb() {
  return prisma.$transaction([
    prisma.fruit.deleteMany(),
    prisma.color.deleteMany(),
  ]);
}

async function main() {
  await resetDb();
  // Prisma doesn't have a createMany for SQLite
  // https://github.com/prisma/prisma/issues/10710
  const inserts = fruits.map(({ colors, ...fruit }) =>
    prisma.fruit.create({
      data: {
        ...fruit,
        colors: { create: colors.map((color) => ({ color })) },
      },
    })
  );

  await prisma.$transaction(inserts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
