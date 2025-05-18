import ListingDisplay from "./components/ListingDisplay";
import garageLogo from "@/public/images/with_garage.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <div className="text-center mb-8">
      <header className="w-full max-w-4xl mb-10">
        <h1 className="text-3xl font-bold">Garage Fire Truck Invoice Generator</h1>
      </header>
      </div>
      <Image src={garageLogo} alt="Garage Logo" width={100} height={100} />
      <main className="flex flex-col items-center w-full">
        <ListingDisplay />
      </main>
    </div>
  );
}
