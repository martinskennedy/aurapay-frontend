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
    <section className="container mx-auto">
      <div className="py-16 px-4 bg-linear-to-br from-primary/50 via-transparent to-secondary/30 border-y border-border/50 rounded-2xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] mb-12">
          Tecnologia utilizada por líderes globais
        </p>

        {/* Container do Carrossel */}
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-12 md:gap-24 pr-12 md:pr-24 items-center"
            animate={{
              x: ["0%", "-33%"], // Move metade da largura total
            }}
            transition={{
              duration: 25, // Velocidade (quanto menor, mais rápido)
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {triplicatedClients.map((client, index) => (
              <div
                key={index}
                className="relative h-7 md:h-10 w-28 md:w-32 shrink-0 group"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>

          {/* Gradientes nas pontas para suavizar a entrada/saída (Fade) */}
          <div className="absolute inset-y-0 left-0 w-5 bg-linear-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-5 bg-linear-to-l from-background to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
