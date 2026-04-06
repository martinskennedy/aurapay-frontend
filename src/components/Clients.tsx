"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  {
    name: "Stripe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  }, // Substituído aqui
  {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "CocaCola",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
  },
];

const triplicatedClients = [...clients, ...clients, ...clients]; // Triplica para criar um loop mais longo

export default function Clients() {
  return (
    <section
      className="mx-auto w-full max-w-7xl"
      aria-labelledby="clients-title"
    >
      <div className="rounded-2xl border-y border-border/50 bg-linear-to-br from-primary/50 via-transparent to-secondary/30 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <p
          id="clients-title"
          className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70 sm:mb-10 sm:text-sm sm:tracking-[0.2em] lg:mb-12"
        >
          Tecnologia utilizada por líderes globais
        </p>

        {/* Container do Carrossel */}
        <div className="group relative flex overflow-hidden">
          <motion.div
            className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12 md:gap-20 md:pr-20 lg:gap-24 lg:pr-24"
            animate={{
              x: ["0%", "-33%"], // Move metade da largura total
            }}
            transition={{
              duration: 30, // Velocidade (quanto menor, mais rápido)
              ease: "linear",
              repeat: Infinity,
            }}
            aria-hidden="true"
          >
            {triplicatedClients.map((client, index) => (
              <div
                key={index}
                className="relative h-7 w-24 shrink-0 grayscale opacity-50 transition-all duration-500 hover:grayscale-0 hover:opacity-100 sm:h-8 sm:w-28 md:h-9 md:w-32"
              >
                {" "}
                <Image
                  src={client.logo}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>

          {/* Gradientes nas pontas para suavizar a entrada/saída (Fade) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-background to-transparent sm:w-16 lg:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-background to-transparent sm:w-16 lg:w-20" />
        </div>

        {/* Texto invisível apenas para leitores de tela para explicar a seção */}
        <span className="sr-only">
          Logotipos das empresas parceiras: Stripe, Microsoft, Airbnb, Amazon e
          Coca-Cola.
        </span>
      </div>
    </section>
  );
}
