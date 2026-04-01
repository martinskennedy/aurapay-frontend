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
    <section className="pb-16 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-linear-to-br from-primary/40 via-transparent to-secondary/20 rounded-[2.5rem] p-8 lg:p-16 border border-border/50 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
          <div className="flex-1 text-center lg:text-left z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Transfira globalmente com a{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                melhor taxa
              </span>
            </h2>
            <p className="text-foreground/70 text-lg mb-8 max-w-md mx-auto">
              Diga adeus às taxas bancárias abusivas. Com a AuraPay, você usa o
              câmbio comercial em tempo real.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-max mx-auto">
              <button
                type="button"
                onClick={() => !loading && fetchExchangeRate()} // Só clica se não estiver carregando
                className="flex items-center gap-2 px-2.5 py-2 rounded-full bg-primary/10 text-primary text-xl font-bold hover:bg-primary/20 transition-all active:scale-95"
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
                <div className="px-2.5 py-1.5 rounded-full border border-border bg-background/50 backdrop-blur-sm text-xl font-medium">
                  1 USD ={" "}
                  {rate.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              )}
            </div>

            {error && (
              <p className="mt-4 text-red-500 text-sm flex items-center gap-1">
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
