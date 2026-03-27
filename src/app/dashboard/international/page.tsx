"use client";

import { SubmitEvent, useState } from "react";
import Link from "next/link";
import {
  internationalTransactionService,
  InternationalTransferPreview,
} from "@/features/international/services/international-transaction-service";

export default function InternationalTransferPage() {
  const [amountBrl, setAmountBrl] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [iban, setIban] = useState("");
  const [bankName, setBankName] = useState("");

  const [preview, setPreview] = useState<InternationalTransferPreview | null>(
    null,
  );
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const parsedAmount = Number(amountBrl.replace(",", "."));

  const handlePreview = async () => {
    setError(null);
    setSuccess(null);
    setPreview(null);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Informe um valor BRL válido para simulação.");
      return;
    }

    try {
      setLoadingPreview(true);
      const data =
        await internationalTransactionService.getPreview(parsedAmount);
      setPreview(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao gerar simulação.");
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Informe um valor BRL válido.");
      return;
    }

    if (!beneficiaryName || !swiftCode || !iban || !bankName) {
      setError("Preencha todos os dados bancários internacionais.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await internationalTransactionService.transfer({
        amountBrl: parsedAmount,
        beneficiaryName,
        swiftCode,
        iban,
        bankName,
      });

      setSuccess(response.message);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Falha ao enviar transferência.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transferência Internacional</h1>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-primary hover:underline"
        >
          Voltar ao dashboard
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded-2xl bg-card space-y-4"
      >
        <div>
          <label className="text-sm font-medium">Valor em BRL</label>
          <input
            value={amountBrl}
            onChange={(e) => setAmountBrl(e.target.value)}
            placeholder="1000.00"
            className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary"
            inputMode="decimal"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Nome do beneficiário</label>
          <input
            value={beneficiaryName}
            onChange={(e) => setBeneficiaryName(e.target.value)}
            className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">SWIFT</label>
            <input
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">IBAN</label>
            <input
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Banco</label>
            <input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePreview}
            disabled={loadingPreview}
            className="px-4 py-2 border rounded-md font-medium hover:bg-foreground/5 disabled:opacity-50"
          >
            {loadingPreview ? "Simulando..." : "Simular remessa"}
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Enviando..." : "Enviar transferência"}
          </button>
        </div>
      </form>

      {preview && (
        <div className="p-6 border rounded-2xl bg-card space-y-2">
          <h2 className="text-lg font-bold">Prévia da Remessa</h2>
          <p className="text-sm">
            Câmbio: {preview.exchangeRate.toLocaleString("pt-BR")}
          </p>
          <p className="text-sm">
            IOF:{" "}
            {preview.iofAmount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p className="text-sm">
            Taxa de serviço:{" "}
            {preview.serviceFee.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p className="text-sm font-semibold">
            Total debitado:{" "}
            {preview.totalToDeductBrl.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p className="text-sm font-semibold">
            Valor recebido:{" "}
            {preview.finalAmount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
