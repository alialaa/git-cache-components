import "dotenv/config";
import { reset, seed } from "drizzle-seed";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await reset(db, schema);
  await seed(db, schema).refine((f) => ({
    products: {
      count: 10,
      columns: {
        title: f.loremIpsum({ sentencesCount: 1 }),
        description: f.loremIpsum({ sentencesCount: 2 }),
        price: f.number({ minValue: 100, maxValue: 10000 }),
        inStock: f.boolean(),
      },
    },
  }));
}

main();
