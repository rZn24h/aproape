import Link from "next/link";

import { siteConfig } from "@/config/site";
import { footerColumns } from "@/config/navigation";
import { BrandLogo } from "@/components/shared/brand-logo";

const darkFocus =
  "rounded-sm focus-visible:shadow-[0_0_0_2px_var(--dark),0_0_0_4px_var(--brand-accent-on-dark)] focus-visible:outline-none";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="container-content flex flex-col gap-8 pt-12 pb-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="flex flex-col gap-3 lg:w-72 lg:shrink-0">
            <BrandLogo variant="dark" href="/" />
            <p className="max-w-72 type-secondary text-dark-muted-foreground">
              {siteConfig.slogan} Anunțuri de la oameni și firme din comunitatea ta.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mb-3 font-sans type-secondary font-semibold text-dark-foreground">{col.title}</h2>
                <ul className="flex flex-col gap-2.5 type-secondary">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className={`text-dark-foreground underline-offset-4 hover:underline ${darkFocus}`}
                        >
                          {link.label}
                          {link.external ? <span className="sr-only"> (se deschide într-o filă nouă)</span> : null}
                        </Link>
                      ) : (
                        <span className="text-dark-muted-foreground">
                          {link.label} <span className="type-caption">· în curând</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-dark-border pt-4 type-label font-normal text-dark-muted-foreground md:flex-row md:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <p>Un marketplace românesc, mai aproape de comunitatea ta.</p>
        </div>
      </div>
    </footer>
  );
}
