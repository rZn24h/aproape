"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { features } from "@/config/features";
import { buildSearchUrl } from "@/lib/search/url";
import type { SearchValues } from "@/lib/validations/search";
import { SearchBar } from "@/components/shared/search-bar";

type SiteSearchProps = {
  variant?: "hero" | "compact";
  label?: string;
  className?: string;
};

const UNAVAILABLE = "Căutarea va fi disponibilă în curând.";

/**
 * Comportamentul real al căutării: când M03 există, navighează la
 * /cautare?q=…&loc=…; până atunci spune explicit că rezultatele nu sunt
 * disponibile și păstrează valorile introduse. Nu simulează rezultate.
 */
export function SiteSearch({ variant = "hero", label, className }: SiteSearchProps) {
  const router = useRouter();
  const [notice, setNotice] = React.useState<string | null>(null);

  function handleSearch(values: SearchValues) {
    if (features.search) {
      router.push(buildSearchUrl(values));
      return;
    }
    const text = `${UNAVAILABLE} Ai căutat „${values.query}”${values.location ? ` în ${values.location}` : ""}.`;
    if (variant === "compact") toast.info(UNAVAILABLE, { description: text.replace(`${UNAVAILABLE} `, "") });
    else setNotice(text);
  }

  return (
    <div className={className}>
      <SearchBar variant={variant} label={label} onSearch={handleSearch} />
      {variant === "hero" ? (
        <p role="status" aria-live="polite" className="mt-3 min-h-5 text-center type-label font-normal">
          {notice}
        </p>
      ) : null}
    </div>
  );
}
