"use client";

import { Wallet } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">AuraPay</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="hover:text-primary transition">Funcionalidades</a>
          <a href="#" className="hover:text-primary transition">Soluções</a>
          <a href="#" className="hover:text-primary transition">Preços</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium hover:text-primary transition">Entrar</button>
          <button className="bg-primary text-black px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition shadow-lg shadow-primary/20">
            Abrir conta
          </button>
        </div>
      </div>
    </header>
  );
}