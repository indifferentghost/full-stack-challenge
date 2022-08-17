import { Prisma } from "@prisma/client";
import { fruitSelect, FruitSerialized } from "lib/prisma-types";
import prisma from "lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = FruitSerialized[] | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const filter: Prisma.FruitWhereInput = {};

  if ("in_season" in req.query) {
    const in_season = `${req.query.in_season}`;
    const options = { true: true, false: false };
    if (!(in_season in options)) {
      res.status(422).json({ error: "in_season not valid" });
    }
    filter.in_season = options[in_season as keyof typeof options];
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
