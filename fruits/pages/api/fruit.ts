import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const fruitSelect = Prisma.validator<Prisma.FruitSelect>()({
  name: true,
  in_season: true,
  colors: { select: { color: true } },
});

type FoundFruit = Prisma.FruitGetPayload<{ select: typeof fruitSelect }>;

type Data =
  | (Omit<FoundFruit, "colors"> & { colors: string[] })[]
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const filter: Prisma.FruitWhereInput = {};

  if ("in_season" in req.query) {
    filter.in_season = { true: true, false: false }[
      req.query.in_season as string
    ];
  }
  if ("name" in req.query) {
    filter.name = { contains: `${req.query.name}` };
  }
  if ("color" in req.query) {
    filter.colors = { some: { color: `${req.query.color}` } };
  }

  const foundFruits = await prisma.fruit.findMany({
    where: filter,
    select: fruitSelect,
  });

  const modifiedFruits = foundFruits.map((fruit) => ({
    ...fruit,
    colors: fruit.colors.map(({ color }) => color),
  }));

  res.status(200).json(modifiedFruits);
}
