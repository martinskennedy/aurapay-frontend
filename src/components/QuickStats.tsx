"use client";

import { motion } from "framer-motion";
import { Zap, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function QuickStats() {
  const stats = [
    {
      icon: <Zap className="h-5 w-5 sm:h-5 sm:w-5" aria-hidden="true" />,
      label: "Tempo Médio",
      value: "2.4s",
      detail: "Transferência instantânea",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      icon: <Globe className="h-5 w-5" aria-hidden="true" />,
      label: "Alcance Global",
      value: "150+",
      detail: "Países suportados",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
      label: "Segurança",
      value: "99.9%",
      detail: "Uptime garantido",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl bg-background">
      <div className="px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-14 lg:px-8 lg:pt-10 lg:pb-16">
        <ul className="mx-auto grid max-w-4xl list-none grid-cols-1 gap-4 md:grid-cols-3 sm:gap-6">
          {" "}
          {stats.map((stat, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -10, // Sobe 10 pixels
                scale: 1.02, // Aumenta levemente o tamanho
              }}
              className="group relative rounded-4xl border border-border/50 bg-background/40 p-5 shadow-sm backdrop-blur-md transition-all hover:border-primary/30 sm:p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={`rounded-2xl p-2.5 transition-transform duration-300 group-hover:scale-110 sm:p-3 ${stat.bg} ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />{" "}
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/40">
                  {stat.label}
                </p>
                <h3
                  className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                  aria-label={`${stat.label}: ${stat.value}`}
                >
                  {stat.value}
                </h3>
                <p className="text-xs font-medium text-foreground/60 sm:text-sm">
                  {stat.detail}
                </p>
              </div>

              {/* Efeito de brilho no hover */}
              <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
