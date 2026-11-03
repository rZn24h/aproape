"use client";

import { toast } from "sonner";

import { SearchBar } from "@/components/shared/search-bar";

/** Demonstrație SearchBar: valorile sunt validate, dar căutarea reală vine în M03. */
export function HeroSearch() {
  return (
    <div className="flex w-full max-w-[880px] flex-col gap-2 text-left">
      <SearchBar
        onSearch={(values) => {
          toast.info("Căutarea va fi disponibilă în curând", {
            description: `Ai căutat „${values.query}”${values.location ? ` în ${values.location}` : ""}.`,
          });
        }}
      />
      <p className="text-center type-label font-normal text-muted-foreground">
        Demonstrație: motorul de căutare nu este încă disponibil.
      </p>
    </div>
  );
}
