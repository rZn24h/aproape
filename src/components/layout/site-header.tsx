import Link from "next/link";
import { Plus } from "lucide-react";

import { headerActions, primaryNav } from "@/config/navigation";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

/** Header global (Server Component). Doar meniul mobil este client-side. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-card">
      <div className="container-content flex h-(--header-height) items-center gap-4 lg:gap-6">
        <BrandLogo href="/" size="md" />

        <nav aria-label="Navigare principală" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-md px-3 type-secondary font-medium text-ink-secondary hover:bg-muted hover:text-foreground focus-visible:focus-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {headerActions.map(({ id, label, icon: Icon, module }) => (
            <Button
              key={id}
              variant="ghost"
              disabled
              title={`Disponibil odată cu modulul ${module}`}
              className="disabled:bg-transparent disabled:text-muted-foreground"
            >
              <Icon aria-hidden="true" />
              {label}
              <span className="sr-only">(în curând)</span>
            </Button>
          ))}
          <Button disabled className="ml-2" title="Disponibil odată cu modulul M05">
            <Plus aria-hidden="true" />
            Publică anunț
            <Badge variant="outline" className="ml-1 border-transparent bg-card/80">
              În curând
            </Badge>
          </Button>
        </div>

        <div className="ml-auto lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
