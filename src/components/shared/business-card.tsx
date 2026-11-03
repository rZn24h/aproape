import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import type { BusinessSummary } from "@/features/businesses/types";

type BusinessCardProps = {
  business: BusinessSummary;
  className?: string;
};

/** Card de prezentare pentru o firmă. Afișează doar câmpurile primite. */
export function BusinessCard({ business, className }: BusinessCardProps) {
  const { name, href, logo, location, activity, description } = business;
  return (
    <article
      data-slot="business-card"
      className={cn("relative flex flex-col gap-3 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md", className)}
    >
      <div className="flex items-center gap-3">
        <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary text-secondary-foreground">
          {logo ? (
            <Image src={logo.src} alt={logo.alt} fill sizes="48px" className="object-cover" />
          ) : (
            <Building2 className="size-6" aria-hidden="true" />
          )}
        </span>
        <div className="flex min-w-0 flex-col">
          <h3 className="truncate font-sans type-body font-semibold">
            {href ? (
              <Link href={href} className="rounded-sm after:absolute after:inset-0 hover:text-primary focus-visible:focus-ring">
                {name}
              </Link>
            ) : (
              name
            )}
          </h3>
          {activity ? <p className="truncate type-label font-normal text-muted-foreground">{activity}</p> : null}
        </div>
      </div>
      {description ? <p className="line-clamp-2 type-secondary text-ink-secondary">{description}</p> : null}
      {location || href ? (
        <div className="mt-auto flex items-center justify-between gap-2 type-label font-normal text-muted-foreground">
          {location ? (
            <span className="flex items-center gap-1">
              <MapPin className="size-4" aria-hidden="true" />
              {location}
            </span>
          ) : (
            <span />
          )}
          {href ? (
            <span className="flex items-center gap-1 font-medium text-primary" aria-hidden="true">
              Vezi profilul
              <ArrowRight className="size-4" />
            </span>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
