import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CurrencyConverter from "@/components/CurrencyConverter";
import Clients from "@/components/Clients";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-16 px-24">
      <Hero />
      <Clients />
      <Features />
      <CurrencyConverter />
    </main>
  );
}