import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/features/auth/services/auth-service";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // Chamado após o sucesso do login
      setAuth: (user, token) => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("aurapay-token", token);
        }
        set({ user, isAuthenticated: true });
      },

      // Limpa tudo e redireciona
      logout: () => {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("aurapay-token");
          // Opcional: limpa o storage do zustand manualmente se necessário
          sessionStorage.removeItem("aurapay-auth-storage");
          window.location.href = "/auth/login";
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "aurapay-auth-storage", // Nome da chave no sessionStorage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
