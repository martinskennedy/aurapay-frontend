"use client";

import { motion } from "framer-motion";
import { Globe, Lock, Zap, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "Pagamentos Globais",
    description: "Transfira dinheiro para mais de 150 países com as menores taxas do mercado."
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "Segurança de Elite",
    description: "Proteção biométrica e criptografia de ponta a ponta em todas as transações."
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Instantâneo",
    description: "Seu dinheiro cai na conta em segundos, não importa o dia ou horário."
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: "Tudo no App",
    description: "Gerencie cartões, investimentos e contas em uma interface intuitiva."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-white rounded-2xl border border-border hover:shadow-xl transition-shadow group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}