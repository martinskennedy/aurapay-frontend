"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ArrowRightLeft, AlertCircle } from "lucide-react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Função para buscar a cotação real
  const fetchExchangeRate = async () => {
    try {
      setLoading(true);
      // Usando a AwesomeAPI (Gratuita e sem necessidade de chave para BRL-USD)
      const response = await fetch(
        "https://economia.awesomeapi.com.br/last/USD-BRL"
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

  const result = amount > 0 && rate > 0 ? amount / rate : 0;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Transfira globalmente com a{" "}
              <span className="text-primary">melhor taxa</span>.
            </h2>
            <p className="text-gray-600 mb-8">
              Diga adeus às taxas bancárias abusivas. Com a AuraPay, você usa o
              câmbio comercial em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:justify-start gap-4 text-sm font-semibold">
              <span
                className="flex items-center gap-1 text-primary cursor-pointer hover:opacity-80 transition-all active:scale-95"
                onClick={() => !loading && fetchExchangeRate()} // Só clica se não estiver carregando
                title="Clique para atualizar"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Atualizando..." : "Câmbio comercial ao vivo"}
              </span>{" "}
              {rate > 0 && (
                <span className="text-gray-500">
                  1 USD ={" "}
                  {rate.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              )}
            </div>

            {error && (
              <p className="mt-4 text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Erro ao conectar com a API.
                Usando taxa padrão.
              </p>
            )}
          </div>

          {/* Card da Calculadora */}
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-border">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Você envia (BRL)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:outline-none font-bold text-xl"
                  placeholder="0,00"
                />
              </div>

              <div className="flex justify-center -my-2">
                <div className="bg-primary text-white p-2 rounded-full z-10 shadow-md">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Você recebe (USD)
                </label>
                <div className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-border font-bold text-xl text-primary">
                  {loading
                    ? "..."
                    : result.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                </div>
              </div>

              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-primary/20">
                Começar transferência
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
