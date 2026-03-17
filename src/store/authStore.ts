import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserResponse } from "@/features/auth/services/auth-service";

// Zustand Store para gerenciar o estado de autenticação do usuário
interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  setAuth: (user: UserResponse) => void;
  logout: () => void;
}

// Criando a store com persistência no LocalStorage
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user) => set({ user, isAuthenticated: true }),
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "aurapay-auth-storage", // Nome da chave no LocalStorage
    },
  ),
);
