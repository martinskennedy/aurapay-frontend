"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

// Schema de validação com Zod
const waitlistSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
});

type WaitlistData = z.infer<typeof waitlistSchema>;

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistData) => {
    setIsSubmitting(true);
    // Simulando um envio de API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("E-mail capturado:", data.email);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-linear-to-br from-primary/40 via-transparent to-secondary/20 rounded-[2.5rem] p-8 md:p-16 border border-border/50 text-center relative overflow-hidden">
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para evoluir suas <span className="text-primary">finanças?</span>
            </h2>
            <p className="text-foreground/70 mb-10 max-w-md mx-auto">
              Junte-se a mais de 10.000 pessoas na lista de espera para o novo AuraPay Card.
            </p>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-md mx-auto relative"
                >
                  <motion.div
                    // Efeito de tremer (shake) se houver erro
                    animate={errors.email ? { x: [-2, 2, -2, 2, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="relative flex flex-col md:flex-row gap-3"
                  >
                    <input
                      {...register("email")}
                      placeholder="seu@email.com"
                      className={`flex-1 px-6 py-4 rounded-2xl bg-background border outline-none transition-all font-medium
                        ${errors.email 
                          ? "border-red-500 ring-4 ring-red-500/10" 
                          : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
                        }`}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary text-white px-7 py-4 rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? "Enviando..." : "Entrar na lista"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>

                  {/* Mensagem de Erro em Tempo Real */}
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium mt-3 text-left ml-2"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 text-primary"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <p className="font-bold text-xl text-foreground">Você está na lista!</p>
                  <p className="text-sm text-foreground/60">Enviamos um convite para o seu e-mail.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Decoração de fundo igual ao CurrencyConverter */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
}