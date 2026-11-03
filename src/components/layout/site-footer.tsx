import Link from "next/link";

import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";
import { BrandLogo } from "@/components/shared/brand-logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="container-content flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <BrandLogo variant="dark" href="/" />
            <p className="type-secondary text-dark-muted-foreground">{siteConfig.slogan}</p>
          </div>
          <nav aria-label="Navigare informativă">
            <ul className="flex flex-col type-secondary">
              {footerNav.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center rounded-sm text-dark-foreground underline-offset-4 hover:underline focus-visible:shadow-[0_0_0_2px_var(--dark),0_0_0_4px_var(--brand-accent-on-dark)] focus-visible:outline-none"
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.label} className="flex min-h-11 items-center gap-2 text-dark-muted-foreground">
                    {item.label}
                    <span className="type-caption">(în curând)</span>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-dark-border pt-4 type-label font-normal text-dark-muted-foreground md:flex-row md:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <p>Paginile de ajutor, siguranță și termeni sunt în pregătire.</p>
        </div>
      </div>
    </footer>
  );
}
