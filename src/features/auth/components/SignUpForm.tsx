"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/features/auth/services/auth-service";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Schema de validação com Zod
const signUpSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  document: z
    .string()
    .regex(/^\d{11}$/, "Documento deve conter exatamente 11 dígitos numéricos"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Registrar no Backend .NET (UsersController)
      await authService.register(data);

      // 2. Realizar Login automático após registro (opcional, mas recomendado para UX)
      const authData = await authService.login(data.email, data.password);

      // 3. Salvar no Estado Global e Ir para o Dashboard
      setAuth(authData.user, authData.accessToken);

      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao criar conta. Verifique seus dados.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md p-6 bg-card border rounded-xl shadow-lg"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Criar sua conta AuraPay</h2>
        <p className="text-sm text-muted-foreground">
          Abra sua conta em poucos segundos
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">Nome Completo</label>
        <input
          {...register("fullName")}
          className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Ex: João Silva"
        />
        {errors.fullName && (
          <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">E-mail</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="email@exemplo.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Documento (CPF)</label>
          <input
            {...register("document")}
            className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Apenas números"
          />
          {errors.document && (
            <p className="text-xs text-red-500 mt-1">
              {errors.document.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Senha</label>
        <input
          {...register("password")}
          type="password"
          className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Mínimo 6 caracteres"
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-2 rounded-md font-bold hover:opacity-90 transition-all disabled:opacity-50 shadow-md active:scale-[0.98]"
      >
        {loading ? "Criando conta..." : "Criar Conta"}
      </button>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Já tem uma conta?{" "}
        <a href="/auth/login" className="text-primary hover:underline">
          Entre aqui
        </a>
        .
      </p>
    </form>
  );
}
