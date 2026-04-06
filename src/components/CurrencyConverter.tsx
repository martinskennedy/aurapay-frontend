"use client";

import { useState, useEffect } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function CurrencyConverter() {
  const [amount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Função para buscar a cotação real
  const fetchExchangeRate = async () => {
    try {
      setLoading(true);
      // Usando a AwesomeAPI (Gratuita e sem necessidade de chave para BRL-USD)
      const response = await fetch(
        "https://economia.awesomeapi.com.br/last/USD-BRL",
      );
      const data = await response.json();

      // A API retorna o valor de 1 USD em BRL (ex: 5.40)
      const currentRate = parseFloat(data.USDBRL.bid);
      setRate(currentRate);
      setError(false);
    } catch (err) {
      console.error("Erro ao buscar cotação:", err);
      setError(true);
      setRate(5.2); // Valor de fallback caso a API falhe
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl bg-background">
      <div className="px-4 pt-4 pb-10 sm:px-6 sm:pt-6 sm:pb-14 lg:px-8 lg:pt-8 lg:pb-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-4xl border border-border/50 bg-linear-to-br from-primary/40 via-transparent to-secondary/20 p-5 sm:p-6 lg:flex-row lg:gap-12 lg:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
          <div className="z-10 flex-1 text-center lg:text-left">
            <h2 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl lg:mb-6 lg:text-4xl">
              Transfira globalmente com a{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                melhor taxa
              </span>
            </h2>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base lg:mb-8">
              Diga adeus às taxas bancárias abusivas. Com a AuraPay, você usa o
              câmbio comercial em tempo real.
            </p>

            <div className="mx-auto flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => !loading && fetchExchangeRate()} // Só clica se não estiver carregando
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-all active:scale-95 hover:bg-primary/20 sm:w-auto sm:text-base"
                aria-label="Atualizar cotação do dólar"
                title="Clique para atualizar"
              >
                <RefreshCw
                  className={`${loading ? "animate-spin" : ""}`}
                  aria-hidden="true"
                />
                {loading ? "Atualizando..." : "Câmbio ao vivo"}
              </button>
              {rate > 0 && (
                <div className="flex w-full items-center justify-center rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium backdrop-blur-sm sm:w-auto sm:text-base">
                  1 USD ={" "}
                  {rate.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              )}
            </div>

            {error && (
              <p className="mt-3 flex items-center justify-center gap-1 text-xs text-red-500 sm:justify-start sm:text-sm">
                <AlertCircle className="w-4 h-4" /> Erro ao conectar com a API.
                Usando taxa padrão.
              </p>
            )}
          </div>

          {/* Card da Calculadora 
          <div className="w-full max-w-md bg-background p-8 rounded-3xl shadow-2xl shadow-primary/80 border border-border relative z-10">
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2 ml-1">
                  Você envia (BRL)
                </label>
                <input
                  id="send-amount"
                  type="number"
                  inputMode="decimal"
                  value={amount === 0 ? "" : amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.03] border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-2xl outline-none"
                  placeholder="0,00"
                />
              </div>

              <div
                className="flex justify-center my-8 sm:-my-8 relative z-20"
                aria-hidden="true"
              >
                <div className="bg-primary text-white p-3 rounded-2xl shadow-xl shadow-primary/40 rotate-0 hover:rotate-180 transition-transform duration-500 cursor-pointer">
                  <ArrowRightLeft className="w-6 h-6" />
                </div>
              </div>

              <div className="relative">
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2 ml-1"
                >
                  Você recebe (USD)
                </label>
                <div
                  id="receive-amount"
                  role="status" // Avisa leitores de tela quando o valor mudar
                  aria-live="polite"
                  className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/20 font-bold text-2xl text-primary flex items-center justify-between overflow-hidden"
                >
                  <span>
                    {loading
                      ? "..."
                      : result.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                  </span>
                </div>
              </div>

            </div>
          </div>
          */}
        </div>
      </div>
    </section>
  );
}
