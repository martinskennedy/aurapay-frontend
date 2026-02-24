import { Wallet, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">AuraPay</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Transformando a maneira como você lida com dinheiro. Global, seguro e instantâneo.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-bold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition">Conta Digital</a></li>
              <li><a href="#" className="hover:text-primary transition">Cartão Global</a></li>
              <li><a href="#" className="hover:text-primary transition">Investimentos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition">Sobre nós</a></li>
              <li><a href="#" className="hover:text-primary transition">Carreiras</a></li>
              <li><a href="#" className="hover:text-primary transition">Segurança</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-full border border-border hover:text-primary transition shadow-sm"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white rounded-full border border-border hover:text-primary transition shadow-sm"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white rounded-full border border-border hover:text-primary transition shadow-sm"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-gray-500">
          <p>© 2026 AuraPay. Todos os direitos reservados. Este é um projeto de portfólio.</p>
        </div>
      </div>
    </footer>
  );
}