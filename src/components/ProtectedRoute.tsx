"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Hook oficial para evitar erros de hidratação no Next.js
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    // Se já carregou o estado no cliente e não está logado, tchau!
    if (isClient && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isClient, isAuthenticated, router]);

  // Enquanto está decidindo ou no servidor, mostra o loading
  if (!isClient || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}