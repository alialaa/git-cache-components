import { db } from "@/db/drizzle";
import { getProduct, getProductPrice, getRecommendedProducts } from "./utils";
import { products } from "@/db/schema";
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(+id);

  return (
    <div className="p-4">
      <h1 className="text-3xl bg-violet-800 mb-2 font-bold p-2">
        {product.title}
      </h1>
      <Suspense fallback={<div className="text-2xl">Loading Price...</div>}>
        <ProductPrice id={product.id} />
      </Suspense>
      <p className="font-lg bg-green-700 p-2 mb-2">{product.description}</p>
      <Suspense
        fallback={<div className="text-2xl">Loading Recommendations...</div>}
      >
        <RecommendedProducts />
      </Suspense>
    </div>
  );
}

async function RecommendedProducts() {
  const recommendedProducts = await getRecommendedProducts();
  return (
    <div className="bg-blue-900 p-2 mt-4">
      <h2 className="font-bold text-2xl mb-2">Recommended Products</h2>
      <ul>
        {recommendedProducts.map((recommendedProduct) => (
          <li key={recommendedProduct.id} className="p-2 mb-2  bg-blue-950">
            <Link href={`/products/${recommendedProduct.id}`}>
              {recommendedProduct.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function ProductPrice({ id }: { id: number }) {
  await connection();
  const price = getProductPrice(id);
  return <p className="text-2xl bg-pink-800 p-2 mb-2 font-medium">{price}</p>;
}

export async function generateStaticParams() {
  const ids = await db.select({ id: products.id }).from(products).limit(5);
  return ids.map(({ id }) => ({ id: id.toString() }));
}
