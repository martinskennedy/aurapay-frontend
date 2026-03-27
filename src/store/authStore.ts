import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/features/auth/services/auth-service";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      setHasHydrated: (value: boolean) => set({ hasHydrated: value }),

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
          sessionStorage.removeItem("aurapay-auth-storage");
          window.location.href = "/auth/login";
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "aurapay-auth-storage", // Nome da chave no sessionStorage
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
