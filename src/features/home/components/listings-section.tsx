import { Megaphone, PackageOpen } from "lucide-react";

import type { SectionResult } from "@/lib/data/section-result";
import type { ListingSummary } from "@/types/listing";
import { ListingCard } from "@/components/shared/listing-card";
import { EmptyState, ErrorState } from "@/components/shared/states";
import { HomeSection } from "./home-section";

type Copy = {
  emptyTitle: string;
  emptyDescription: string;
  unavailableTitle: string;
  unavailableDescription: string;
  errorTitle: string;
};

const copy = {
  promoted: {
    emptyTitle: "Nu există anunțuri promovate acum",
    emptyDescription: "Revino curând: aici apar anunțurile promovate de vânzători.",
    unavailableTitle: "Anunțurile promovate vor apărea aici",
    unavailableDescription: "Platforma se pregătește de lansare. Primele anunțuri promovate vor fi afișate în această secțiune, marcate clar.",
    errorTitle: "Nu am putut încărca anunțurile promovate",
  },
  recent: {
    emptyTitle: "Nu există anunțuri recente",
    emptyDescription: "Când vor fi publicate anunțuri noi, le vei găsi aici.",
    unavailableTitle: "Anunțurile recente vor apărea aici",
    unavailableDescription: "Platforma se pregătește de lansare. Anunțurile publicate de oameni și firme vor fi afișate aici, de la cele mai noi.",
    errorTitle: "Nu am putut încărca anunțurile recente",
  },
} satisfies Record<string, Copy>;

type ListingsSectionViewProps = {
  kind: keyof typeof copy;
  result: SectionResult<ListingSummary>;
  now?: Date;
};

const meta = {
  promoted: { id: "promovate", title: "Anunțuri promovate", icon: Megaphone, description: "Plasări plătite, marcate întotdeauna „Promovat”." },
  recent: { id: "recente", title: "Anunțuri recente din apropiere", icon: PackageOpen, description: undefined },
} as const;

/** Prezentarea unei liste de anunțuri cu toate stările (ok / gol / indisponibil / eroare). */
export function ListingsSectionView({ kind, result, now }: ListingsSectionViewProps) {
  const c = copy[kind];
  const m = meta[kind];
  return (
    <HomeSection id={m.id} title={m.title} description={m.description}>
      <ListingsBody result={result} copy={c} icon={m.icon} now={now} />
    </HomeSection>
  );
}

function ListingsBody({
  result,
  copy: c,
  icon,
  now,
}: {
  result: SectionResult<ListingSummary>;
  copy: Copy;
  icon: typeof Megaphone;
  now?: Date;
}) {
  if (result.status === "error") {
    return <ErrorState title={c.errorTitle} description="Încearcă din nou în câteva minute." />;
  }
  if (result.status === "unavailable") {
    return <EmptyState icon={icon} title={c.unavailableTitle} description={c.unavailableDescription} />;
  }
  if (result.items.length === 0) {
    return <EmptyState icon={icon} title={c.emptyTitle} description={c.emptyDescription} />;
  }
  return (
    <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {result.items.map((listing) => (
        <li key={listing.id}>
          <ListingCard listing={listing} now={now} />
        </li>
      ))}
    </ul>
  );
}
