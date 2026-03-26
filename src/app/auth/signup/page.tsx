import { SignUpForm } from "@/features/auth/components/SignUpForm";

// Página de cadastro
export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <SignUpForm />
    </main>
  );
}