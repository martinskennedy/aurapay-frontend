"use client";

import { DashboardFeatureHero } from "@/components/DashboardFeatureHero";
import { CardsManagementSection } from "@/features/cards/components/CardsManagementSection";

export default function CardsPage() {
  return (
    <div className="px-4 pb-10 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <DashboardFeatureHero
          title="Meus cartões"
          description="Gerencie seus cartões virtuais, visualize informações e controle o status com segurança."
          showDecorations
        />

        <CardsManagementSection />
      </div>
    </div>
  );
}
