import { Prisma } from "@prisma/client";

export const fruitSelect = Prisma.validator<Prisma.FruitSelect>()({
  name: true,
  in_season: true,
  colors: { select: { color: true } },
});

export type FoundFruit = Prisma.FruitGetPayload<{ select: typeof fruitSelect }>;

export type FruitSerialized = Omit<FoundFruit, "colors"> & { colors: string[] };
