"use client";

import { DashboardFeatureHero } from "@/components/DashboardFeatureHero";
import { TransfersContentSection } from "@/features/transactions/components/TransfersContentSection";

export default function TransfersPage() {
  return (
    <div className="pt-28 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <DashboardFeatureHero
          title="Transferências"
          description="Envie valores com rapidez entre contas e acompanhe todo o histórico em um layout claro e organizado."
        />

        <TransfersContentSection />
      </div>
    </div>
  );
}
