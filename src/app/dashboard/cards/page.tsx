"use client";

import { SubmitEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  cardService,
  CardResponse,
  CardSensitiveDataResponse,
} from "@/features/cards/services/card-service";

export default function CardsPage() {
  const [cards, setCards] = useState<CardResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [holderName, setHolderName] = useState("");
  const [creating, setCreating] = useState(false);

  const [revealedData, setRevealedData] = useState<
    Record<string, CardSensitiveDataResponse>
  >({});
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const loadCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cardService.getMyCards();
      setCards(data);
    } catch (err: unknown) {
      setError(
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
    setError(null);

    if (holderName.trim().length < 3) {
      setError("O nome do titular deve ter no mínimo 3 caracteres.");
      return;
    }

    try {
      setCreating(true);
      await cardService.createVirtual({ holderName: holderName.trim() });
      setHolderName("");
      await loadCards();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erro ao criar cartão virtual.",
      );
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (cardId: string) => {
    setError(null);
    try {
      setActionLoadingId(cardId);
      await cardService.toggleStatus(cardId);
      await loadCards();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao alterar status do cartão.",
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReveal = async (cardId: string) => {
    setError(null);

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
      setError(
        err instanceof Error ? err.message : "Erro ao revelar dados do cartão.",
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="pt-28 p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus Cartões</h1>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-primary hover:underline"
        >
          Voltar ao dashboard
        </Link>
      </div>

      <form
        onSubmit={handleCreate}
        className="p-6 border rounded-2xl bg-card space-y-4"
      >
        <h2 className="text-lg font-bold">Criar cartão virtual</h2>
        <div>
          <label className="text-sm font-medium">Nome do titular</label>
          <input
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            placeholder="Ex: JOAO SILVA"
            className="w-full p-2 mt-1 bg-background border rounded-md outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 disabled:opacity-50"
        >
          {creating ? "Criando..." : "Criar cartão"}
        </button>
      </form>

      <div className="p-6 border rounded-2xl bg-card space-y-4">
        <h2 className="text-lg font-bold">Lista de cartões</h2>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando cartões...</p>
        ) : cards.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum cartão encontrado.
          </p>
        ) : (
          <ul className="space-y-4">
            {cards.map((card) => (
              <li key={card.id} className="border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{card.cardHolderName}</p>
                    <p className="text-sm text-muted-foreground">
                      {card.lastFourDigits}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Validade: {card.expiryDate}
                    </p>
                    <p className="text-sm">
                      Status: {card.isActive ? "Ativo" : "Bloqueado"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleReveal(card.id)}
                      disabled={actionLoadingId === card.id}
                      className="px-3 py-1 border rounded-md text-sm hover:bg-foreground/5 disabled:opacity-50"
                    >
                       {revealedData[card.id] ? "Esconder" : "Revelar"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggle(card.id)}
                      disabled={actionLoadingId === card.id}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 disabled:opacity-50"
                    >
                      {card.isActive ? "Bloquear" : "Ativar"}
                    </button>
                  </div>
                </div>

                {revealedData[card.id] && (
                  <div className="text-sm bg-background border rounded-lg p-3 space-y-1">
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
    </div>
  );
}
