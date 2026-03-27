"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { accountService } from "@/features/accounts/services/account-service";
import { cardService } from "@/features/cards/services/card-service";
import { transactionService } from "@/features/transactions/services/transaction-service";
import Link from "next/link";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  const [balance, setBalance] = useState<number | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [balanceError, setBalanceError] = useState<string | null>(null);

  const [cardsCount, setCardsCount] = useState<number | null>(null);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [cardsError, setCardsError] = useState<string | null>(null);

  const [history, setHistory] = useState<
    { id: string; amount: number; type: string; timestamp: string }[]
  >([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setBalanceLoading(true);
    setBalanceError(null);
    setCardsLoading(true);
    setCardsError(null);
    setHistoryLoading(true);
    setHistoryError(null);

    try {
      const [balanceData, cardsData, historyData] = await Promise.all([
        accountService.getBalance(),
        cardService.getMyCards(),
        transactionService.getHistory(),
      ]);

      setBalance(balanceData.balance);
      setCardsCount(cardsData.filter((card) => card.isActive).length);
      setHistory(historyData.slice(0, 5));
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao carregar dados do painel.";

      // Se falhar, exibimos fallback nos dois cards
      setBalanceError(message);
      setCardsError(message);
      setHistoryError(message);
    } finally {
      setBalanceLoading(false);
      setCardsLoading(false);
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

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
          <h2 className="text-2xl font-bold mt-2">
            {balanceLoading
              ? "Carregando..."
              : balanceError
                ? "Indisponível"
                : (balance ?? 0).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
          </h2>
          {balanceError && (
            <p className="text-xs text-red-500 mt-2">{balanceError}</p>
          )}
        </div>

        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-muted-foreground">
            Meus Cartões
          </p>
          <h2 className="text-2xl font-bold mt-2">
            {cardsLoading
              ? "Carregando..."
              : cardsError
                ? "Indisponível"
                : `${cardsCount ?? 0} Ativos`}
          </h2>
          {cardsError && (
            <p className="text-xs text-red-500 mt-2">{cardsError}</p>
          )}
        </div>

        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-muted-foreground">Documento</p>
          <h2 className="text-lg font-mono mt-2">{user?.document}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border rounded-2xl bg-card flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Transferências</h3>
            <p className="text-sm text-muted-foreground">
              Faça transferências nacionais e veja o histórico completo.
            </p>
          </div>

          <Link
            href="/dashboard/transfers"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-all"
          >
            Acessar
          </Link>
        </div>

        <div className="p-6 border rounded-2xl bg-card flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Internacional</h3>
            <p className="text-sm text-muted-foreground">
              Simule câmbio e envie transferências internacionais.
            </p>
          </div>

          <Link
            href="/dashboard/international"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-all"
          >
            Acessar
          </Link>
        </div>

        <div className="p-6 border rounded-2xl bg-card flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Cartões</h3>
            <p className="text-sm text-muted-foreground">
              Crie, bloqueie/desbloqueie e revele dados do cartão virtual.
            </p>
          </div>

          <Link
            href="/dashboard/cards"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-all"
          >
            Acessar
          </Link>
        </div>
      </div>

      <div className="p-6 border rounded-2xl bg-card">
        <h3 className="text-lg font-bold mb-4">Últimas Transações</h3>

        {historyLoading ? (
          <p className="text-sm text-muted-foreground">
            Carregando histórico...
          </p>
        ) : historyError ? (
          <p className="text-sm text-red-500">{historyError}</p>
        ) : history.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma transação encontrada.
          </p>
        ) : (
          <ul className="space-y-3">
            {history.map((tx) => (
              <li
                key={tx.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <span className="text-sm">
                  {tx.type === "TransferIn" ? "Entrada" : "Saída"}
                </span>
                <span className="text-sm font-medium">
                  {tx.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(tx.timestamp).toLocaleString("pt-BR")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
