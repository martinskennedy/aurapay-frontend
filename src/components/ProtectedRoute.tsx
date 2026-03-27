"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
