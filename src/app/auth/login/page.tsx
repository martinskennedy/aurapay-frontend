import { LoginForm } from "@/features/auth/components/LoginForm";

// Página de login
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <LoginForm />
    </main>
  );
}