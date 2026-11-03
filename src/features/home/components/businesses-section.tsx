import { Store } from "lucide-react";

import type { SectionResult } from "@/lib/data/section-result";
import type { BusinessSummary } from "@/features/businesses/types";
import { BusinessCard } from "@/components/shared/business-card";
import { EmptyState, ErrorState } from "@/components/shared/states";
import { HomeSection } from "./home-section";

export function BusinessesSectionView({ result }: { result: SectionResult<BusinessSummary> }) {
  return (
    <HomeSection
      id="firme"
      title="Descoperă firme din apropiere"
      description="Magazine, service-uri și agenții din zona ta, cu anunțurile lor într-un singur loc."
    >
      {result.status === "error" ? (
        <ErrorState title="Nu am putut încărca firmele" description="Încearcă din nou în câteva minute." />
      ) : result.status === "unavailable" ? (
        <EmptyState
          icon={Store}
          title="Firmele locale vor apărea aici"
          description="Profilurile de firmă sunt în pregătire. Firmele înregistrate vor fi listate în această secțiune."
        />
      ) : result.items.length === 0 ? (
        <EmptyState icon={Store} title="Nu există încă firme înregistrate" description="Revino curând pentru a descoperi firme din zona ta." />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {result.items.map((b) => (
            <li key={b.id}>
              <BusinessCard business={b} className="h-full" />
            </li>
          ))}
        </ul>
      )}
    </HomeSection>
  );
}
