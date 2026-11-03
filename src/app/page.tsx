import type { Metadata } from "next";
import { Suspense } from "react";

import { siteConfig } from "@/config/site";
import { CategoryGrid } from "@/features/home/components/category-grid";
import {
  LocalBusinessesSection,
  PromotedListingsSection,
  RecentListingsSection,
} from "@/features/home/components/data-sections";
import { HomeHero } from "@/features/home/components/home-hero";
import { PublishCta } from "@/features/home/components/publish-cta";
import { SectionSkeleton } from "@/features/home/components/section-skeleton";

const title = "aproape24.ro — Anunțuri locale aproape de tine";
const description =
  "Descoperă produse, servicii și oferte de la persoane și firme din apropierea ta. Cumpără și vinde mai simplu pe aproape24.ro.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { type: "website", locale: siteConfig.locale, siteName: siteConfig.name, title, description, ...(siteConfig.url ? { url: "/" } : {}) },
  ...(siteConfig.url ? { alternates: { canonical: "/" } } : {}),
};

/** M01 — Homepage. */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CategoryGrid />
      <Suspense fallback={<SectionSkeleton id="promovate" title="Anunțuri promovate" label="Se încarcă anunțurile promovate…" />}>
        <PromotedListingsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton id="recente" title="Anunțuri recente din apropiere" label="Se încarcă anunțurile recente…" />}>
        <RecentListingsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton id="firme" title="Descoperă firme din apropiere" label="Se încarcă firmele…" />}>
        <LocalBusinessesSection />
      </Suspense>
      <PublishCta />
    </>
  );
}
