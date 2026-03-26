"use client";

import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="pt-28 p-8 space-y-6">
      {/* Header do Dashboard */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Olá, {user?.fullName}!</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel AuraPay.
          </p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-md hover:bg-destructive hover:text-white transition-all font-medium"
        >
          Sair
        </button>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-muted-foreground">
            Saldo Disponível
          </p>
          <h2 className="text-2xl font-bold mt-2">R$ 0,00</h2>
        </div>

        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-muted-foreground">
            Meus Cartões
          </p>
          <h2 className="text-2xl font-bold mt-2">0 Ativos</h2>
        </div>

        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-muted-foreground">Documento</p>
          <h2 className="text-lg font-mono mt-2">{user?.document}</h2>
        </div>
      </div>

      {/* Placeholder para funcionalidades futuras */}
      <div className="p-12 border-2 border-dashed rounded-2xl text-center bg-muted/30">
        <p className="text-muted-foreground font-medium">
          Em breve: Histórico de transações e transferências internacionais.
        </p>
      </div>
    </div>
  );
}
