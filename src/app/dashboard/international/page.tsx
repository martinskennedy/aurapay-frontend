"use client";

import { DashboardFeatureHero } from "@/components/DashboardFeatureHero";
import { InternationalTransferSection } from "@/features/international/components/InternationalTransferSection";

export default function InternationalTransferPage() {
  return (
    <div className="px-4 pb-10 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <DashboardFeatureHero
          title="Transferência internacional"
          description="Envie valores para o exterior com uma experiência clara, moderna e segura."
        />

        <InternationalTransferSection />
      </div>
    </div>
  );
}
