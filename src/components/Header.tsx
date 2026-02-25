"use client";

import { useState } from "react";
import { Wallet, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
});

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Funcionalidades", href: "#" },
    { name: "Soluções", href: "#" },
    { name: "Preços", href: "#" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-primary/20 backdrop-blur-md">
      <div className="container mx-auto px-2 sm:px-4 h-16 flex items-center justify-between gap-2">
        {/* Esquerda: Logo */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Wallet className="w-5 h-5 sm:w-7 sm:h-7 text-primary shrink-0" />
          <span className="text-base sm:text-xl font-bold tracking-tight">
            AuraPay
          </span>
        </div>

        {/* Centro: Nav Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-primary transition"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Direita: Ações (Sempre Visíveis) */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          <ThemeToggle />

          <button className="text-[12px] sm:text-sm font-medium hover:text-primary transition px-1 sm:px-2">
            Entrar
          </button>

          <button className="bg-primary px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-sm text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20 whitespace-nowrap shrink-0">
            Abrir conta
          </button>

          {/* Hamburguer: troca o ícone para X quando aberto */}
          <button
            className="lg:hidden p-1 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* ---  MENU MOBILE --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)} // Fecha o menu ao clicar em um link
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
