import { revalidatePath, revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag(`product-price-1`, "max");
  return new Response("Invalidation Successful", { status: 200 });
}
