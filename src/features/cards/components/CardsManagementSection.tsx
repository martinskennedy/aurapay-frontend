"use client";

import { SubmitEvent, useEffect, useState } from "react";
import {
  cardService,
  CardResponse,
  CardSensitiveDataResponse,
} from "@/features/cards/services/card-service";
import { CreditCard, Wallet } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export function CardsManagementSection() {
  const [cards, setCards] = useState<CardResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [createError, setCreateError] = useState<string | null>(null);
  const [listError, setListError] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);

  const [revealedData, setRevealedData] = useState<
    Record<string, CardSensitiveDataResponse>
  >({});
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);

  const loadCards = async () => {
    setLoading(true);
    setListError(null);

    try {
      const data = await cardService.getMyCards();
      setCards(data);
    } catch (err: unknown) {
      setListError(
        err instanceof Error ? err.message : "Erro ao carregar cartões.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleCreate = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateError(null);

    const holderName = user?.fullName?.trim();

    if (!holderName || holderName.length < 3) {
      setCreateError("Não foi possível identificar o nome do titular.");
      return;
    }
    try {
      setCreating(true);
      await cardService.createVirtual({ holderName });
      setCreateError(null);
      await loadCards();
    } catch (err: unknown) {
      setCreateError(
        err instanceof Error ? err.message : "Erro ao criar cartão virtual.",
      );
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (cardId: string) => {
    setListError(null);

    try {
      setActionLoadingId(cardId);
      await cardService.toggleStatus(cardId);
      await loadCards();
    } catch (err: unknown) {
      setListError(
        err instanceof Error
          ? err.message
          : "Erro ao alterar status do cartão.",
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReveal = async (cardId: string) => {
    setListError(null);

    if (revealedData[cardId]) {
      setRevealedData((prev) => {
        const updated = { ...prev };
        delete updated[cardId];
        return updated;
      });
      return;
    }

    try {
      setActionLoadingId(cardId);
      const data = await cardService.revealCardData(cardId);
      setRevealedData((prev) => ({ ...prev, [cardId]: data }));
    } catch (err: unknown) {
      setListError(
        err instanceof Error ? err.message : "Erro ao revelar dados do cartão.",
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 rounded-[2.5rem] border border-border/50 bg-linear-to-br from-primary/40 via-transparent to-secondary/20 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10 relative overflow-hidden">
      <div className="rounded-[30px] border border-border/60 bg-white/75 p-6 shadow-sm backdrop-blur-sm sm:p-7 dark:bg-white/5">
        <div className="mb-6 flex items-center gap-4 min-h-18">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CreditCard className="h-7 w-7" />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight leading-none text-foreground">
              Criar cartão virtual
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              Gere um novo cartão para uso online com segurança.
            </p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground">
              Nome do titular
            </label>
            <div className="mt-2 w-full rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-foreground/90">
              {user?.fullName ?? "Nome não disponível"}
            </div>{" "}
          </div>

          {createError && <p className="text-sm text-red-500">{createError}</p>}

          <button
            type="submit"
            disabled={creating}
            className="w-full inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
          >
            {creating ? "Criando..." : "Criar cartão"}
          </button>
        </form>
      </div>

      <div className="rounded-[30px] border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur-sm sm:p-7 dark:bg-background/50">
        <div className="mb-6 flex items-center gap-4 min-h-18">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Wallet className="h-7 w-7" />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight leading-none text-foreground">
              Lista de cartões
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              Visualize e gerencie seus cartões ativos.
            </p>
          </div>
        </div>

        {listError && <p className="text-sm text-red-500">{listError}</p>}

        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando cartões...</p>
        ) : cards.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum cartão encontrado.
          </p>
        ) : (
          <ul className="space-y-3">
            {cards.map((card) => (
              <li
                key={card.id}
                className="rounded-2xl border border-transparent px-4 py-4 transition hover:border-border/60 hover:bg-white/60 dark:hover:bg-white/5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">
                      {card.cardHolderName}
                    </p>
                    <p className="text-sm text-foreground/65">
                      **** **** **** {card.lastFourDigits}
                    </p>
                    <p className="text-sm text-foreground/65">
                      Validade: {card.expiryDate}
                    </p>
                    <p className="text-sm font-medium">
                      {card.isActive ? "Ativo" : "Bloqueado"}
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <button
                      type="button"
                      onClick={() => handleReveal(card.id)}
                      disabled={actionLoadingId === card.id}
                      className="inline-flex w-full justify-center items-center rounded-full border border-border/60 bg-white/80 px-3 py-2 text-xs font-medium shadow-sm transition hover:bg-foreground/5 disabled:opacity-50 sm:w-auto dark:bg-white/5"
                    >
                      {revealedData[card.id] ? "Esconder" : "Revelar"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggle(card.id)}
                      disabled={actionLoadingId === card.id}
                      className="inline-flex w-full justify-center items-center rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50 sm:w-auto"
                    >
                      {card.isActive ? "Bloquear" : "Ativar"}
                    </button>
                  </div>
                </div>

                {revealedData[card.id] && (
                  <div className="mt-3 rounded-xl border border-border/50 bg-background/80 p-3 text-sm space-y-1">
                    <p>Número: {revealedData[card.id].cardNumber}</p>
                    <p>CVV: {revealedData[card.id].cvv}</p>
                    <p>Validade: {revealedData[card.id].expiryDate}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
