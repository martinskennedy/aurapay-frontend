import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CurrencyConverter from "@/components/CurrencyConverter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Hero />
      <Features />
      <CurrencyConverter />
      <Footer />
    </main>
  );
}