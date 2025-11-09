import { revalidatePath } from "next/cache";

export async function POST() {
  revalidatePath("/products/[id]", "page");
  return new Response("Invalidation Successful", { status: 200 });
}
