"use client";

import { Wallet, Github, Linkedin, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Logo e Descrição */}
          <div className="col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 group outline-none"
            >
              <Wallet className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold">AuraPay</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Transformando a maneira como você lida com dinheiro. Global,
              seguro e instantâneo.
            </p>
          </div>

          {/* Links Rápidos */}
          <nav aria-label="Links do Produto">
            {" "}
            <h4 className="font-bold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors focus-visible:text-primary outline-none"
                >
                  Conta Digital
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors focus-visible:text-primary outline-none"
                >
                  Cartão Global
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary  transition-colors focus-visible:text-primary outline-none"
                >
                  Investimentos
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h4 className="font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors focus-visible:text-primary outline-none"
                >
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors focus-visible:text-primary outline-none"
                >
                  Carreiras
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors focus-visible:text-primary outline-none"
                >
                  Segurança
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/martinskennedy"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Siga-nos no Github"
                className="p-2 bg-card rounded-full border-2 border-gray-300 hover:border-primary/50 hover:text-primary transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-primary outline-none"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/kennedy-martins/"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Siga-nos no Linkedin"
                className="p-2 bg-card rounded-full border-2 border-gray-300 hover:border-primary/50 hover:text-primary transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-primary outline-none"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Siga-nos no Linkedin"
                className="p-2 bg-card rounded-full border-2 border-gray-300 hover:border-primary/50 hover:text-primary transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-primary outline-none"
              >
                <X className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-gray-500">
          <p>
            © 2026 AuraPay. Todos os direitos reservados. Este é um projeto de
            portfólio.
          </p>
        </div>
      </div>
    </footer>
  );
}
