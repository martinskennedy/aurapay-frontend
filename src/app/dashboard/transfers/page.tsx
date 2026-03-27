"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TransferForm } from "@/features/transactions/components/TransferForm";
import { transactionService } from "@/features/transactions/services/transaction-service";

type HistoryItem = {
  id: string;
  amount: number;
  type: string;
  timestamp: string;
};

export default function TransfersPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);

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

  return (
    <div className="pt-28 p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transferências</h1>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-primary hover:underline"
        >
          Voltar ao dashboard
        </Link>
      </div>

      <TransferForm onTransferSuccess={loadHistory} />

      <div className="p-6 border rounded-2xl bg-card">
        <h2 className="text-lg font-bold mb-4">Histórico Completo</h2>

        {historyLoading ? (
          <p className="text-sm text-muted-foreground">Carregando histórico...</p>
        ) : historyError ? (
          <p className="text-sm text-red-500">{historyError}</p>
        ) : history.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma transação encontrada.</p>
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
