"use client";

import { motion } from "framer-motion";
import { Zap, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function QuickStats() {
  const stats = [
    {
      icon: <Zap className="w-5 h-5" aria-hidden="true" />,
      label: "Tempo Médio",
      value: "2.4s",
      detail: "Transferência instantânea",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      icon: <Globe className="w-5 h-5" aria-hidden="true" />,
      label: "Alcance Global",
      value: "150+",
      detail: "Países suportados",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
      label: "Segurança",
      value: "99.9%",
      detail: "Uptime garantido",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <ul className="pb-16 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto list-none">
      {stats.map((stat, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px"}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{
            y: -10, // Sobe 10 pixels
            scale: 1.02, // Aumenta levemente o tamanho
          }}
          className="relative group p-6 rounded-4xl bg-background/40 border border-border/50 backdrop-blur-md hover:border-primary/30 transition-all shadow-sm"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300 ${stat.bg} ${stat.color}`}
            >
              {stat.icon}
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" aria-hidden="true" />
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-foreground/40">
              {stat.label}
            </p>
            <h3 className="text-3xl font-bold tracking-tight text-foreground" aria-label={`${stat.label}: ${stat.value}`}>
              {stat.value}
            </h3>
            <p className="text-xs text-foreground/60 font-medium">
              {stat.detail}
            </p>
          </div>

          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.li>
      ))}
    </ul>
  );
}
