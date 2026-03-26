"use client";

import { useState } from "react";
import { Wallet, Menu, X, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
});

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const menuItems = [
    { name: "Funcionalidades", href: "#" },
    { name: "Soluções", href: "#" },
    { name: "Preços", href: "#" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-2 sm:px-4 h-16 flex items-center justify-between gap-2">
        
        {/* Esquerda: Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 sm:gap-2 shrink-0 focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-all"
          aria-label="AuraPay Home"
        >
          <Wallet
            className="w-5 h-5 sm:w-7 sm:h-7 text-primary shrink-0"
            aria-hidden="true"
          />
          <span className="text-base sm:text-xl font-bold tracking-tight">
            AuraPay
          </span>
        </Link>

        {/* Centro: Nav Desktop */}
        <nav
          className="hidden lg:flex items-center gap-6 text-sm font-medium"
          aria-label="Navegação principal"
        >
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-primary transition-colors focus:text-primary outline-none"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Direita: Ações */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          <ThemeToggle />

          {isAuthenticated ? (
            /* Se logado: Botão para Dashboard */
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-sm font-bold hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              Painel
            </Link>
          ) : (
            /* Se não logado: Entrar e Criar Conta */
            <>
              <Link 
                href="/auth/login"
                className="text-[12px] sm:text-sm font-medium hover:text-primary transition px-1 sm:px-2 focus:text-primary outline-none"
              >
                Entrar
              </Link>
              
              <Link 
                href="/auth/signup"
                className="bg-primary px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-sm text-white font-medium hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 whitespace-nowrap shrink-0"
              >
                Abrir conta
              </Link>
            </>
          )}

          {/* Hamburguer */}
          <button
            className="lg:hidden p-1 text-foreground focus:ring-2 focus:ring-primary rounded-md outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
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
            <nav className="flex flex-col p-4 gap-4" aria-label="Navegação móvel">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium py-2 hover:text-primary transition-colors outline-none focus:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {/* Opções de Auth no Mobile se necessário */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}