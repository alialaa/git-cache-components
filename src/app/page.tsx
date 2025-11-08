import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { connection } from "next/server";
import { Suspense } from "react";

export default async function Home() {
  console.log("Home Component Ran");

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">Hello</h1>
      <div className="p-2 mt-2 bg-violet-800">
        <Suspense fallback={<div className="text-2xl">Loading...</div>}>
          <DynamicWord />
        </Suspense>
      </div>
      <div className="p-2 mt-2 bg-green-800">
        <StaticWord />
      </div>
      <div className="p-2 mt-2 bg-blue-800">
        <Suspense fallback={<div className="text-2xl">Loading...</div>}>
          <FeaturedProduct />
        </Suspense>
      </div>
      <div className="p-2 mt-2 bg-red-800">
        <Suspense fallback={<div className="text-2xl">Loading...</div>}>
          <RandomNumber />
        </Suspense>
      </div>
    </div>
  );
}

async function RandomNumber() {
  console.log("RandomNumber Component Ran");
  await connection();
  return <div className="text-2xl">Random Number: {Math.random() * 10}</div>;
}

async function FeaturedProduct() {
  console.log("FeaturedProduct Component Ran");
  const [product] = await db.select().from(products).limit(1);
  return (
    <div>
      <h2 className="text-2xl">{product.title}</h2>
      <p>{product.price}</p>
    </div>
  );
}

async function DynamicWord() {
  console.log("DynamicWord Ran");
  const randomWord = await fetch(
    `https://random-word-api.herokuapp.com/word`
  ).then((res) => res.json());
  return <div className="text-2xl">Dynamic Random Word: {randomWord}</div>;
}

async function getRandomWord(lang = "en") {
  "use cache";
  return fetch(`https://random-word-api.herokuapp.com/word?lang=${lang}`).then(
    (res) => res.json()
  );
}

async function StaticWord() {
  console.log("StaticWord Ran");
  const randomWord = await getRandomWord();
  const randomWord2 = await getRandomWord("zh");
  return (
    <div className="text-2xl">
      Static Random Word: {randomWord} {randomWord2}
    </div>
  );
}
