"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-16 lg:pt-24 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge de Destaque */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4" aria-hidden="true" />
            <span>Nova versão 2.0 disponível</span>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
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
            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto"
          >
            Simplifique sua vida financeira com a AuraPay. Pagamentos globais,
            investimentos e segurança de ponta, tudo em um só lugar.
          </motion.p>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/25 focus-visible:ring-4 focus-visible:ring-primary/40 outline-none"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>

            <Link href="#" className="w-full sm:w-auto px-8 py-4 border border-border rounded-full font-semibold hover:bg-foreground/5 transition-colors">
              Ver Planos
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
