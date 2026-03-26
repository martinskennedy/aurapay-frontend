"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/features/auth/services/auth-service";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Schema de validação com Zod
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Chama o seu Backend .NET (AuthController)
      // O backend já retorna o objeto { user, accessToken }
      const authData = await authService.login(data.email, data.password);

      // 2. Salva no estado global (Zustand) e no LocalStorage (via setAuth)
      // Passamos o objeto user e a string do token
      setAuth(authData.user, authData.accessToken);

      // 3. Redireciona para o dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "E-mail ou senha incorretos.";
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
        <h2 className="text-2xl font-bold">Entrar no AuraPay</h2>
        <p className="text-sm text-muted-foreground">
          Acesse sua conta digital
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">E-mail</label>
        <input
          {...register("email")}
          type="email"
          placeholder="exemplo@email.com"
          className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Senha</label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-500 text-center font-medium">
            {error}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-2 rounded-md font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
      >
        {loading ? "Autenticando..." : "Entrar"}
      </button>
    </form>
  );
}
