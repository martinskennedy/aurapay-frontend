import { ProtectedRoute } from "@/components/ProtectedRoute";

// Layout do dashboard, que envolve todas as páginas dentro de /dashboard
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Envolvemos tudo com a rota protegida para garantir que só usuários logados acessem o dashboard
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Aqui depois colocaremos a Sidebar e o Header fixo */}
        <div className="flex">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
