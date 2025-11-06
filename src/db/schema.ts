import { integer, text, boolean, pgTable, numeric } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  inStock: boolean("in_stock").notNull().default(true),
});