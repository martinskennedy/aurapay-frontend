"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge de Destaque */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary sm:mb-8 sm:text-sm"
          >
            <Zap className="w-4 h-4" aria-hidden="true" />
            <span>Nova versão 2.0 disponível</span>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-5 text-4xl font-extrabold tracking-tight leading-tight sm:text-5xl md:text-6xl lg:mb-6 lg:text-7xl"
          >
            {" "}
            O banco digital que <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              evolui com você.
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg md:text-xl lg:mb-10"
          >
            Simplifique sua vida financeira com a AuraPay. Pagamentos globais,
            investimentos e segurança de ponta, tudo em um só lugar.
          </motion.p>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href="/auth/signup"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary/25 transition-all outline-none hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-primary/40 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
