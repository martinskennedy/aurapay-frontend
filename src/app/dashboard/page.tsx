"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { dashboardService } from "@/features/dashboard/services/dashboard-service";
import { RecentTransactionsPanel } from "@/features/dashboard/components/RecentTransactionsPanel";
import Link from "next/link";
import { BadgeDollarSign, CreditCard, Send, Wallet } from "lucide-react";

type TransactionItem = {
  id: string;
  amount: number;
  type: string;
  timestamp: string;
};

export default function DashboardPage() {
  const { user } = useAuthStore();

  const [balance, setBalance] = useState<number | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [balanceError, setBalanceError] = useState<string | null>(null);

  const [cardsCount, setCardsCount] = useState<number | null>(null);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [cardsError, setCardsError] = useState<string | null>(null);

  const [history, setHistory] = useState<TransactionItem[]>([]);
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
      const data = await dashboardService.getDashboardData();
      setBalance(data.balance);
      setCardsCount(data.activeCards);
      setHistory(data.history);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao carregar dados do painel.";

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

  const formattedBalance = balanceLoading
    ? "Carregando..."
    : balanceError
      ? "Indisponível"
      : (balance ?? 0).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

  const quickActions = [
    {
      title: "Transferencia",
      description: "Faça transferências entre contas.",
      href: "/dashboard/transfers",
      icon: Send,
    },
    {
      title: "Internacional",
      description: "Simule câmbio e envie transferências internacionais.",
      href: "/dashboard/international",
      icon: BadgeDollarSign,
    },
    {
      title: "Cartões",
      description: "Crie, bloqueie/desbloqueie e revele dados do cartão.",
      href: "/dashboard/cards",
      icon: CreditCard,
    },
  ];

  return (
    <div className="pt-28 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="max-w-7xl mx-auto bg-linear-to-br from-primary/40 via-transparent to-secondary/20 rounded-[2.5rem] p-8 lg:p-10 border border-border/50 relative overflow-hidden">
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-4">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  Olá, {user?.fullName || "Usuário"}! 👋
                </h3>
                <p className="mt-3 max-w-xl text-lg text-foreground/75 sm:text-xl">
                  O que você deseja fazer hoje?
                </p>
              </div>
            </div>

            <div className="relative flex justify-stretch lg:justify-end">
              <div className="w-full rounded-[30px] border border-border/60 bg-white/70 dark:bg-foreground/5 p-6 shadow-[0_20px_60px_rgba(99,102,241,0.12)] backdrop-blur-sm sm:p-8 lg:max-w-180">
                <div className="flex items-start justify-between gap-6 lg:gap-10">
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-medium text-foreground/75">
                      Saldo disponível
                    </p>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                      {formattedBalance}
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-16 sm:w-16">
                    <Wallet className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-primary/15 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                    <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-primary" />
                    Atualizado agora
                  </div>

                  <div className="inline-flex items-center rounded-full border border-border/60 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium text-foreground/70 shadow-sm">
                    {cardsLoading
                      ? "Cartões carregando..."
                      : cardsError
                        ? "Cartões indisponíveis"
                        : `${cardsCount ?? 0} cartão(ões) ativos`}
                  </div>
                </div>

                {balanceError && (
                  <p className="mt-4 text-sm text-red-500">{balanceError}</p>
                )}

                {cardsError && (
                  <p className="mt-2 text-sm text-red-500">{cardsError}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto rounded-[2.5rem] border border-border/50 bg-linear-to-br from-primary/40 via-transparent to-secondary/20 p-8 lg:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <RecentTransactionsPanel
              history={history}
              historyLoading={historyLoading}
              historyError={historyError}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="group flex flex-col rounded-3xl border border-border/60 bg-white/70 dark:bg-white/5 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
                  >
                    <div>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-7 w-7" />
                      </div>

                      <h2 className="text-2xl font-bold text-foreground">
                        {action.title}
                      </h2>

                      <p className="mt-3 text-sm leading-6 text-foreground/70">
                        {action.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="inline-flex items-center rounded-full border border-primary/20 bg-white dark:bg-white/10 px-5 py-2 text-sm font-semibold/ shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow">
                        Acessar
                        <span className="ml-2 text-base">›</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
