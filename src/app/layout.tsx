import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Configurações de exibição mobile
export const viewport: Viewport = {
  themeColor: "#000000", // Cor da barra do navegador no mobile
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "AuraPay | O Banco Digital que Evolui com Você",
    template: "%s | AuraPay", // Permite títulos dinâmicos em outras páginas
  },
  description:
    "A AuraPay oferece pagamentos globais em mais de 150 países, segurança biométrica e investimentos instantâneos. Simplifique sua vida financeira.",
  keywords: [
    "fintech",
    "banco digital",
    "pagamentos globais",
    "cartão internacional",
    "investimentos",
  ],
  authors: [{ name: "AuraPay Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange // Evita "piscada" de cores ao carregar
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
