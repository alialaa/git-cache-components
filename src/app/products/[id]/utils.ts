import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cacheLife } from "next/cache";
import { cookies } from "next/headers";

export async function getProduct(id: number) {
  "use cache";
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return product[0];
}

export async function getProductPrice(id: number) {
  "use cache: remote";
  cacheLife("minutes");
  console.log("getProductPrice Ran for id:", id);
  const product = await db
    .select({ price: products.price })
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return product[0]?.price;
}

export async function getRecommendedProducts() {
  "use cache: private";
  console.log("getRecommendedProducts Ran");
  const sessionId = (await cookies()).get("token")?.value;
  console.log("Session ID:", sessionId);
  const recommendedProducts = await db.select().from(products).limit(3);
  return recommendedProducts;
}
