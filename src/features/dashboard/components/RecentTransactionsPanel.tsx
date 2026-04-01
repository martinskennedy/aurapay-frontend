"use client";

import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

type TransactionItem = {
  id: string;
  amount: number;
  type: string;
  timestamp: string;
};

type StatementPeriod = "7d" | "30d" | "90d" | "all";

interface RecentTransactionsPanelProps {
  history: TransactionItem[];
  historyLoading: boolean;
  historyError: string | null;
}

export function RecentTransactionsPanel({
  history,
  historyLoading,
  historyError,
}: RecentTransactionsPanelProps) {
  const [statementPeriod, setStatementPeriod] =
    useState<StatementPeriod>("30d");

  const getTransactionTypeLabel = (type: string) =>
    type === "TransferIn" ? "Entrada" : "Saída";

  const getTransactionIcon = (type: string) =>
    type === "TransferIn" ? (
      <ArrowDownLeft className="h-5 w-5" />
    ) : (
      <ArrowUpRight className="h-5 w-5" />
    );

  const getTransactionIconWrapper = (type: string) =>
    type === "TransferIn"
      ? "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400"
      : "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400";

  const latestHistory = useMemo(() => {
    if (statementPeriod === "all") return history;

    const days = statementPeriod === "7d" ? 7 : statementPeriod === "30d" ? 30 : 90;
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - days);

    return history.filter((tx) => new Date(tx.timestamp) >= startDate);
  }, [history, statementPeriod]);

  return (
    <div className="p-5">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          Últimas Transações
        </h3>

        <select
          value={statementPeriod}
          onChange={(e) => setStatementPeriod(e.target.value as StatementPeriod)}
          className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
        >
          <option value="7d">Últimos 7 dias</option>
          <option value="30d">Últimos 30 dias</option>
          <option value="90d">Últimos 90 dias</option>
          <option value="all">Todo período</option>
        </select>
      </div>

      {historyLoading ? (
        <p className="text-sm text-muted-foreground">Carregando histórico...</p>
      ) : historyError ? (
        <p className="text-sm text-red-500">{historyError}</p>
      ) : latestHistory.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma transação encontrada.</p>
      ) : (
        <div className="max-h-80 overflow-y-auto pr-2">
          <ul className="space-y-4">
            {latestHistory.map((tx) => (
              <li
                key={`detail-${tx.id}`}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border/70 last:border-b-0 last:pb-0"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${getTransactionIconWrapper(tx.type)}`}
                >
                  {getTransactionIcon(tx.type)}
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    {getTransactionTypeLabel(tx.type)}{" "}
                    {tx.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                <span className="text-sm text-foreground/60">
                  {new Date(tx.timestamp).toLocaleString("pt-BR")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
