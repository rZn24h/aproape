import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { mainCategories } from "@/config/categories";
import { Badge } from "@/components/ui/badge";
import { HeroSearch } from "@/app/_components/hero-search";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.slogan}` },
  ...(siteConfig.url ? { alternates: { canonical: "/" } } : {}),
};

/** Pagină principală temporară. Homepage-ul complet se dezvoltă în M01. */
export default function HomePage() {
  return (
    <>
      <section aria-labelledby="hero-title" className="container-content py-12 md:py-16">
        <div className="flex flex-col items-center gap-6 rounded-xl border bg-card px-4 py-12 text-center md:rounded-2xl md:px-12 md:py-16">
          <Badge variant="brand" className="type-label">
            Marketplace local de anunțuri
          </Badge>
          <h1 id="hero-title" className="type-h1">
            {siteConfig.slogan}
          </h1>
          <p className="max-w-[620px] type-body text-ink-secondary">
            aproape24.ro pune în legătură oameni și firme din aceeași comunitate, ca să cumperi și să vinzi produse și
            servicii aproape de tine.
          </p>
          <HeroSearch />
        </div>
      </section>

      <section id="categorii" aria-labelledby="categorii-title" className="container-content scroll-mt-24 pb-12 md:pb-16">
        <div className="mb-6 flex flex-col gap-1 md:mb-8">
          <h2 id="categorii-title" className="type-h2">
            Categorii principale
          </h2>
          <p className="type-secondary text-muted-foreground">
            Paginile fiecărei categorii vor fi disponibile în curând.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {mainCategories.map(({ slug, name, icon: Icon }) => (
            <li key={slug} className="flex min-h-16 items-center gap-3 rounded-lg border bg-card p-3 md:p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="text-[15px] leading-[22px] font-medium">{name}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
