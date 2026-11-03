import { Building2, MapPin, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { SellerType } from "@/types/listing";

type SellerCardProps = {
  name: string;
  type: SellerType;
  location?: string;
  avatarUrl?: string;
  /** Ex. „Membru din 2026” — afișat doar dacă vine din date reale. */
  memberSince?: string;
  className?: string;
};

function initials(name: string): string {
  return name
    .replace(/\[[^\]]*\]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.match(/\p{L}|\p{N}/u)?.[0]?.toUpperCase() ?? "")
    .join("");
}

/** Prezintă vânzătorul exclusiv cu datele primite. Fără ratinguri sau verificări inventate. */
export function SellerCard({ name, type, location, avatarUrl, memberSince, className }: SellerCardProps) {
  const isCompany = type === "firma";
  return (
    <section
      data-slot="seller-card"
      aria-label={`Vânzător: ${name}`}
      className={cn("flex items-center gap-3 rounded-lg border bg-card p-4", className)}
    >
      <Avatar className={cn(isCompany && "rounded-md")}>
        {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
        <AvatarFallback className={cn(isCompany && "rounded-md")}>{initials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="truncate font-semibold">{name}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 type-label font-normal text-muted-foreground">
          <Badge variant={isCompany ? "brand" : "neutral"}>
            {isCompany ? <Building2 aria-hidden="true" /> : <UserRound aria-hidden="true" />}
            {isCompany ? "Firmă" : "Persoană fizică"}
          </Badge>
          {location ? (
            <span className="flex items-center gap-1">
              <MapPin className="size-4" aria-hidden="true" />
              {location}
            </span>
          ) : null}
          {memberSince ? <span>{memberSince}</span> : null}
        </div>
      </div>
    </section>
  );
}
