export default async function Home() {
  console.log("Home Component Ran");
  const randomWord = await fetch(
    `https://random-word-api.herokuapp.com/word`
  ).then((r) => r.json());
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">{randomWord}</h1>
    </div>
  );
}
