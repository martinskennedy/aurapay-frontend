"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge de Destaque */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            <span>Nova versão 2.0 disponível</span>
          </motion.div>

          {/* Título Principal */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            O banco digital que <br />
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              evolui com você.
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
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
            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-border rounded-full font-semibold hover:bg-gray-50 transition-colors">
              Ver Planos
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}