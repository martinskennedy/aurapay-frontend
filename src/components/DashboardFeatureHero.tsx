"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface DashboardFeatureHeroProps {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  showDecorations?: boolean;
}

export function DashboardFeatureHero({
  title,
  description,
  backHref = "/dashboard",
  backLabel = "Voltar ao dashboard",
  showDecorations = false,
}: DashboardFeatureHeroProps) {
  return (
    <section className="mx-auto max-w-6xl rounded-[2.5rem] border border-border/50 bg-linear-to-br from-primary/40 via-transparent to-secondary/20 p-8 lg:p-10 relative overflow-hidden">
      {showDecorations && (
        <>
          <div className="pointer-events-none absolute -right-16 top-8 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-secondary/15 blur-3xl" />
        </>
      )}

      <div className="relative flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>

          <p className="mt-3 text-lg text-foreground/75">{description}</p>
        </div>

        <Link
          href={backHref}
          className="ml-auto inline-flex items-center justify-center rounded-full border border-primary/20 bg-white dark:bg-white/10 px-5 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {backLabel}
        </Link>
      </div>
    </section>
  );
}
