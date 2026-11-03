"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ImageOff, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatListingDate, formatPrice } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import type { ListingSummary } from "@/types/listing";

type ListingCardProps = {
  listing: ListingSummary;
  /** Stare favorite controlată din exterior (persistarea vine în M10). */
  isFavorite?: boolean;
  onFavoriteChange?: (next: boolean) => void;
  /** Data de referință pentru „Azi/Ieri” (util în teste și SSR). */
  now?: Date;
  className?: string;
};

const sellerLabel = { persoana: "Persoană fizică", firma: "Firmă" } as const;

export function ListingCard({ listing, isFavorite = false, onFavoriteChange, now, className }: ListingCardProps) {
  const { title, href, image, price, priceLabel, location, publishedAt, isPromoted, sellerType } = listing;
  const priceText = price ? formatPrice(price.amount, price.currency) : (priceLabel ?? null);

  return (
    <article
      data-slot="listing-card"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-[4/3] bg-muted">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 296px, (min-width: 1024px) 33vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="size-6" aria-hidden="true" />
            <span className="type-label">Fără fotografie</span>
          </div>
        )}
        {isPromoted ? (
          <Badge variant="promoted" className="absolute top-2 left-2">
            Promovat
          </Badge>
        ) : null}
      </div>

      {onFavoriteChange ? (
        <button
          type="button"
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Elimină „${title}” de la favorite` : `Adaugă „${title}” la favorite`}
          onClick={() => onFavoriteChange(!isFavorite)}
          className="absolute top-2 right-2 z-10 inline-flex size-11 items-center justify-center rounded-full bg-card text-foreground shadow-xs transition-colors hover:text-primary focus-visible:focus-ring"
        >
          <Heart
            className={cn("size-5", isFavorite && "fill-primary text-primary")}
            aria-hidden="true"
          />
        </button>
      ) : null}

      <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-4">
        {priceText ? <p className="type-price text-foreground">{priceText}</p> : null}
        <h3 className="line-clamp-2 font-sans text-[15px] leading-[22px] font-medium">
          <Link
            href={href}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] hover:text-primary focus-visible:focus-ring"
          >
            {title}
          </Link>
        </h3>
        <div className="mt-auto flex flex-col gap-1 pt-1 type-label font-normal text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{location}</span>
          </span>
          <span>
            <time dateTime={publishedAt.toISOString()}>{formatListingDate(publishedAt, now)}</time>
            {sellerType ? <> · {sellerLabel[sellerType]}</> : null}
          </span>
        </div>
      </div>
    </article>
  );
}
