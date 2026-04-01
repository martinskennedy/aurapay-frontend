"use client";

import { SubmitEvent, useState } from "react";
import { Globe, ReceiptText } from "lucide-react";
import {
  internationalTransactionService,
  InternationalTransferPreview,
} from "@/features/international/services/international-transaction-service";

export function InternationalTransferSection() {
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
      const data = await internationalTransactionService.getPreview(parsedAmount);
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
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 rounded-[2.5rem] border border-border/50 bg-linear-to-br from-primary/40 via-transparent to-secondary/20 p-8 lg:grid-cols-[1fr_1.1fr] lg:p-10 relative overflow-hidden">
      <div className="rounded-[30px] border border-border/60 bg-white/75 p-6 shadow-sm backdrop-blur-sm sm:p-7 dark:bg-white/5">
        <div className="mb-6 flex items-center gap-4 min-h-18">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Globe className="h-7 w-7" />
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight leading-none text-foreground">
              Nova remessa
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              Preencha os dados do beneficiário e simule a operação antes de
              enviar.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground">
              Valor em BRL
            </label>
            <input
              value={amountBrl}
              onChange={(e) => setAmountBrl(e.target.value)}
              placeholder="1000,00"
              inputMode="decimal"
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/80 px-4 py-3 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Nome do beneficiário
            </label>
            <input
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/80 px-4 py-3 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-foreground">SWIFT</label>
              <input
                value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border/60 bg-background/80 px-4 py-3 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">IBAN</label>
              <input
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border/60 bg-background/80 px-4 py-3 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Banco</label>
              <input
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border/60 bg-background/80 px-4 py-3 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={handlePreview}
              disabled={loadingPreview}
              className="inline-flex items-center justify-center rounded-full border border-border/60 bg-white/80 px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-foreground/5 disabled:opacity-50 dark:bg-white/5"
            >
              {loadingPreview ? "Simulando..." : "Simular remessa"}
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Enviar transferência"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-[30px] border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm sm:p-7 dark:bg-background/50">
        <div className="mb-6 flex items-center gap-4 min-h-18">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ReceiptText className="h-7 w-7" />
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight leading-none text-foreground">
              Prévia da remessa
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              Confira câmbio, taxas e valor final antes da confirmação.
            </p>
          </div>
        </div>

        {preview ? (
          <div className="space-y-3 rounded-3xl border border-border/50 bg-white/70 p-5 dark:bg-white/5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground/70">Câmbio</span>
              <span className="text-sm font-semibold text-foreground">
                {preview.exchangeRate.toLocaleString("pt-BR")}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground/70">IOF</span>
              <span className="text-sm font-semibold text-foreground">
                {preview.iofAmount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground/70">Taxa de serviço</span>
              <span className="text-sm font-semibold text-foreground">
                {preview.serviceFee.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <div className="my-2 h-px bg-border/70" />

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-foreground">
                Total debitado
              </span>
              <span className="text-base font-bold text-foreground">
                {preview.totalToDeductBrl.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3">
              <span className="text-sm font-medium text-primary">
                Valor recebido
              </span>
              <span className="text-base font-bold text-primary">
                {preview.finalAmount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/60 bg-white/50 p-6 text-sm text-foreground/65 dark:bg-white/5">
            Preencha os dados e clique em <strong>Simular remessa</strong> para
            visualizar o resumo da operação.
          </div>
        )}
      </div>
    </section>
  );
}
