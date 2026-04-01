"use client";

import { SubmitEvent, useState } from "react";
import { transactionService } from "../services/transaction-service";

interface TransferFormProps {
    onTransferSuccess: () => void;
}

export function TransferForm({ onTransferSuccess }: TransferFormProps) {
    const [destinationAccountNumber, setDestinationAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const normalizedAccount = destinationAccountNumber.replace(/\D/g, ""); // Remove non-digit characters
    const parsedAmount = Number(amount.replace(",", ".")); // Replace comma with dot for decimal

     if (!/^\d{6}$/.test(normalizedAccount)) {
      setError("A conta de destino deve ter exatamente 6 dígitos.");
      return;
    }

     if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Informe um valor de transferência válido.");
      return;
    }

    try {
      setLoading(true);

      const response = await transactionService.transfer({
        destinationAccountNumber: normalizedAccount,
        amount: parsedAmount,
      });

      setSuccess(response.message || "Transferência realizada com sucesso.");
      setDestinationAccountNumber("");
      setAmount("");
      onTransferSuccess?.();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível completar a transferência.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-card border rounded-2xl space-y-4">
      <div>
        <label className="text-sm font-medium">Conta de destino (6 dígitos)</label>
        <input
          value={destinationAccountNumber}
          onChange={(e) => setDestinationAccountNumber(e.target.value)}
          placeholder="123456"
          className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary transition-all"
          inputMode="numeric"
          maxLength={6}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Valor (BRL)</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100.00"
          className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary transition-all"
          inputMode="decimal"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Transferindo..." : "Transferir"}
      </button>
    </form>
  );
}