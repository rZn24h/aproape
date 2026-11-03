import Link from "next/link";
import { LayoutGrid, Plus } from "lucide-react";

import { categoryHref, mainCategories } from "@/config/categories";
import { headerActions, isAvailable } from "@/config/navigation";
import { BrandLogo } from "@/components/shared/brand-logo";
import { SiteSearch } from "@/components/shared/site-search";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PublishButton } from "@/components/layout/publish-button";

/** Antet global (Server Component). Doar căutarea și meniul mobil rulează în browser. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-card">
      <div className="container-content flex h-(--header-height) items-center gap-2 lg:gap-6">
        <div className="-ml-2.5 lg:hidden">
          <MobileNav />
        </div>
        <BrandLogo href="/" size="md" className="max-lg:[&_[data-slot=brand-logo]]:text-xl" />

        <div className="hidden max-w-xl flex-1 lg:block">
          <SiteSearch variant="compact" label="Căutare rapidă" />
        </div>

        <nav aria-label="Cont" className="ml-auto flex items-center gap-1">
          {headerActions.map(({ id, label, icon: Icon, href, feature }) =>
            isAvailable(feature) ? (
              <Button key={id} variant="ghost" asChild className="hidden xl:inline-flex">
                <Link href={href}>
                  <Icon aria-hidden="true" />
                  {label}
                </Link>
              </Button>
            ) : (
              <Button
                key={id}
                variant="ghost"
                disabled
                className="hidden disabled:bg-transparent disabled:text-muted-foreground xl:inline-flex"
              >
                <Icon aria-hidden="true" />
                {label}
                <span className="sr-only">(în curând)</span>
              </Button>
            ),
          )}
          <PublishButton className="ml-1 hidden sm:inline-flex">
            <Plus aria-hidden="true" />
            Publică anunț
          </PublishButton>
        </nav>
      </div>

      <nav aria-label="Categorii" className="hidden border-t lg:block">
        <div className="container-content">
          <ul className="-mx-3 flex items-center gap-1 overflow-x-auto py-1.5 [scrollbar-width:none]">
            <li>
              <Link
                href="/#categorii"
                className="inline-flex h-9 items-center gap-2 rounded-full border px-3 type-label whitespace-nowrap text-foreground hover:border-primary hover:text-primary focus-visible:focus-ring"
              >
                <LayoutGrid className="size-4" aria-hidden="true" />
                Toate categoriile
              </Link>
            </li>
            {mainCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={categoryHref(c.slug)}
                  className="inline-flex h-9 items-center rounded-sm px-3 type-secondary font-medium whitespace-nowrap text-ink-secondary hover:text-primary focus-visible:focus-ring"
                >
                  {c.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
