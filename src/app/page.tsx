export default async function Home() {
  console.log("Home Component Ran");

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">Hello</h1>
    </div>
  );
}
