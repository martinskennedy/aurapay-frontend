"use client";

import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Send } from "lucide-react";
import { TransferForm } from "@/features/transactions/components/TransferForm";
import { transactionService } from "@/features/transactions/services/transaction-service";

type HistoryItem = {
  id: string;
  amount: number;
  type: string;
  timestamp: string;
};

type StatementPeriod = "7d" | "30d" | "90d" | "all";

export function TransfersContentSection() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [statementPeriod, setStatementPeriod] =
    useState<StatementPeriod>("30d");

  const loadHistory = async () => {
    setHistoryLoading(true);
    setHistoryError(null);

    try {
      const data = await transactionService.getHistory();
      setHistory(data);
    } catch (err: unknown) {
      setHistoryError(
        err instanceof Error ? err.message : "Erro ao carregar histórico.",
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

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

  const filterHistoryByPeriod = (
    items: HistoryItem[],
    period: StatementPeriod,
  ) => {
    if (period === "all") return items;

    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - days);

    return items.filter((tx) => new Date(tx.timestamp) >= startDate);
  };

  const filteredHistory = filterHistoryByPeriod(history, statementPeriod);

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 rounded-[2.5rem] border border-border/50 bg-linear-to-br from-primary/40 via-transparent to-secondary/20 p-8 lg:grid-cols-[1fr_1.1fr] lg:p-10 relative overflow-hidden">
      <div className="rounded-[30px] border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm sm:p-7 dark:bg-background/50">
        <div className="mb-6 flex items-center gap-4 min-h-18">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Send className="h-7 w-7" />
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight leading-none text-foreground">
              Nova transferência
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              Preencha os dados e envie o valor com segurança.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border/50 bg-white/80 p-4 sm:p-5 dark:bg-white/5">
          <TransferForm onTransferSuccess={loadHistory} />
        </div>
      </div>

      <div className="rounded-[30px] border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm sm:p-7 dark:bg-background/50">
<div className="mb-6 flex flex-col gap-4 min-h-18 sm:flex-row sm:items-start sm:justify-between">
  <div className="min-w-0">
    <h2 className="text-2xl font-bold tracking-tight leading-none text-foreground">
      Histórico completo
    </h2>
    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
      Acompanhe entradas e saídas recentes da sua conta.
    </p>
  </div>

  <div className="flex items-center gap-2 shrink-0">
    <select
      value={statementPeriod}
      onChange={(e) => setStatementPeriod(e.target.value as StatementPeriod)}
      className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
    >
      <option value="7d">7 dias</option>
      <option value="30d">30 dias</option>
      <option value="90d">90 dias</option>
      <option value="all">Tudo</option>
    </select>

    <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
      {historyLoading ? "Atualizando..." : `${filteredHistory.length} registros`}
    </div>
  </div>
</div>


        {historyLoading ? (
          <p className="text-sm text-muted-foreground">
            Carregando histórico...
          </p>
        ) : historyError ? (
          <p className="text-sm text-red-500">{historyError}</p>
        ) : filteredHistory.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma transação encontrada.
          </p>
        ) : (
          <div className="max-h-115 overflow-y-auto pr-2">
            <ul>
              {filteredHistory.map((tx) => (
                <li
                  key={tx.id}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-transparent px-2 py-3 transition hover:border-border/60 hover:bg-white/60 dark:hover:bg-white/5"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${getTransactionIconWrapper(
                      tx.type,
                    )}`}
                  >
                    {getTransactionIcon(tx.type)}
                  </div>

                  <div className="min-w-0">
                    <p className="text-base font-semibold text-foreground sm:text-lg">
                      {getTransactionTypeLabel(tx.type)}
                    </p>
                    <p className="mt-1 text-sm text-foreground/65">
                      {new Date(tx.timestamp).toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    {tx.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
