import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getProduct(id: number) {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return product[0];
}

export async function getProductPrice(id: number) {
  const product = await db
    .select({ price: products.price })
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return product[0]?.price;
}

export async function getRecommendedProducts() {
  const sessionId = (await cookies()).get("token")?.value;
  console.log("Session ID:", sessionId);
  const recommendedProducts = await db.select().from(products).limit(3);
  return recommendedProducts;
}
