import { revalidatePath } from "next/cache";

export async function POST() {
  revalidatePath("/");
  return new Response("Invalidation Successful", { status: 200 });
}
