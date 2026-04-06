"use client";

import { motion } from "framer-motion";
import { Globe, Lock, Zap, Smartphone } from "lucide-react";

const features = [
  {
    icon: (
      <Globe
        className="h-7 w-7 text-primary sm:h-8 sm:w-8"
        aria-hidden="true"
      />
    ),
    title: "Pagamentos Globais",
    description:
      "Transfira dinheiro para mais de 150 países com as menores taxas do mercado.",
  },
  {
    icon: (
      <Lock className="h-7 w-7 text-primary sm:h-8 sm:w-8" aria-hidden="true" />
    ),
    title: "Segurança de Elite",
    description:
      "Proteção biométrica e criptografia de ponta a ponta em todas as transações.",
  },
  {
    icon: (
      <Zap className="h-7 w-7 text-primary sm:h-8 sm:w-8" aria-hidden="true" />
    ),
    title: "Instantâneo",
    description:
      "Seu dinheiro cai na conta em segundos, não importa o dia ou horário.",
  },
  {
    icon: (
      <Smartphone
        className="h-7 w-7 text-primary sm:h-8 sm:w-8"
        aria-hidden="true"
      />
    ),
    title: "Tudo no App",
    description:
      "Gerencie cartões, investimentos e contas em uma interface intuitiva.",
  },
];

export default function Features() {
  return (
    <section
      className="bg-background py-10 sm:py-14 lg:py-16"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Título de seção para SEO */}
        <h2 id="features-heading" className="sr-only">
          Nossas Funcionalidades
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
              className="group rounded-2xl border border-border bg-linear-to-br from-primary/20 via-transparent to-secondary/5 p-5 transition-shadow outline-none hover:shadow-xl focus:ring-2 focus:ring-primary/40 sm:p-6 lg:p-8"
            >
              <div className="mb-3 inline-block transition-transform duration-300 group-hover:scale-110 sm:mb-4">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground sm:text-xl">
                {feature.title}
              </h3>{" "}
              <p className="text-sm leading-relaxed text-foreground/70 sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
