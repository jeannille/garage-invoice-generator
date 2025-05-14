import ListingDisplay from "./components/ListingDisplay";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <header className="w-full max-w-4xl mb-10">
        <h1 className="text-3xl font-bold">Garage Listing Viewer</h1>
      </header>
      <main className="flex flex-col items-center w-full">
        <ListingDisplay />
      </main>
    </div>
  );
}
