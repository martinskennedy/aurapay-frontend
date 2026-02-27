"use client";

import { motion } from "framer-motion";
import { Globe, Lock, Zap, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Globe className="w-8 h-8 text-primary" aria-hidden="true" />,
    title: "Pagamentos Globais",
    description:
      "Transfira dinheiro para mais de 150 países com as menores taxas do mercado.",
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" aria-hidden="true" />,
    title: "Segurança de Elite",
    description:
      "Proteção biométrica e criptografia de ponta a ponta em todas as transações.",
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" aria-hidden="true" />,
    title: "Instantâneo",
    description:
      "Seu dinheiro cai na conta em segundos, não importa o dia ou horário.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" aria-hidden="true" />,
    title: "Tudo no App",
    description:
      "Gerencie cartões, investimentos e contas em uma interface intuitiva.",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-background" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        {/* Título de seção para SEO */}
        <h2 id="features-heading" className="sr-only">
          Nossas Funcionalidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10, // Sobe 10 pixels
                scale: 1.02, // Aumenta levemente o tamanho
              }}
              tabIndex={0}
              className="p-8 bg-linear-to-br from-primary/20 via-transparent to-secondary/5 rounded-2xl border border-border hover:shadow-xl transition-shadow group outline-none focus:ring-2 focus:ring-primary/40"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
