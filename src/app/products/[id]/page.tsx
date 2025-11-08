import { getProduct, getRecommendedProducts } from "./utils";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(+id);
  const recommendedProducts = await getRecommendedProducts();
  return (
    <div className="p-4">
      <h1 className="text-3xl bg-violet-800 mb-2 font-bold p-2">
        {product.title}
      </h1>
      <p className="text-2xl bg-pink-800 p-2 mb-2 font-medium">
        {product.price}
      </p>
      <p className="font-lg bg-green-700 p-2 mb-2">{product.description}</p>
      <div className="bg-blue-900 p-2 mt-4">
        <h2 className="font-bold text-2xl mb-2">Recommended Products</h2>
        <ul>
          {recommendedProducts.map((recommendedProduct) => (
            <li key={recommendedProduct.id} className="p-2 mb-2  bg-blue-950">
              {recommendedProduct.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
