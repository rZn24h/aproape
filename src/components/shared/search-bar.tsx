"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { MapPin, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { searchSchema, type SearchInput, type SearchValues } from "@/lib/validations/search";

type SearchBarProps = {
  /** Primește valorile validate. Valorile rămân în formular după trimitere. */
  onSearch: (values: SearchValues) => void | Promise<void>;
  defaultValues?: Partial<SearchInput>;
  /** `hero` = câmpuri cu etichete vizibile; `compact` = un rând, pentru antet. */
  variant?: "hero" | "compact";
  /** Numele landmark-ului de căutare (distinct când există mai multe pe pagină). */
  label?: string;
  className?: string;
};

export function SearchBar({
  onSearch,
  defaultValues,
  variant = "hero",
  label = "Caută anunțuri",
  className,
}: SearchBarProps) {
  const queryId = React.useId();
  const locationId = React.useId();
  const errorId = React.useId();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchInput, unknown, SearchValues>({
    resolver: valibotResolver(searchSchema),
    defaultValues: { query: "", location: "", ...defaultValues },
    shouldFocusError: true,
  });

  const error = errors.query?.message ?? errors.location?.message;
  const compact = variant === "compact";

  const queryInput = (
    <input
      id={queryId}
      type="search"
      autoComplete="off"
      enterKeyHint="search"
      placeholder={compact ? "Ce cauți?" : "ex. bicicletă, apartament, frigider"}
      aria-label={compact ? "Ce cauți?" : undefined}
      aria-invalid={!!errors.query}
      aria-describedby={errors.query ? errorId : undefined}
      className="h-9 w-full min-w-0 bg-transparent type-body outline-none placeholder:text-muted-foreground"
      {...register("query")}
    />
  );
  const locationInput = (
    <input
      id={locationId}
      type="text"
      autoComplete="address-level2"
      placeholder="Localitate"
      aria-label={compact ? "Localitate" : undefined}
      aria-invalid={!!errors.location}
      aria-describedby={errors.location ? errorId : undefined}
      className="h-9 w-full min-w-0 bg-transparent type-body outline-none placeholder:text-muted-foreground"
      {...register("location")}
    />
  );

  return (
    <form role="search" aria-label={label} noValidate onSubmit={handleSubmit(onSearch)} className={cn("relative w-full", className)}>
      {compact ? (
        <div className="flex h-11 items-center rounded-md border border-input bg-card pl-3 text-foreground transition-colors focus-within:border-primary focus-within:focus-ring">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div className="flex min-w-0 flex-[2] px-2">{queryInput}</div>
          <span className="h-6 w-px bg-border" aria-hidden="true" />
          <MapPin className="ml-3 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div className="flex min-w-0 flex-1 px-2">{locationInput}</div>
          <Button type="submit" size="icon" loading={isSubmitting} aria-label="Caută" className="m-0.5 size-9 rounded-sm">
            {isSubmitting ? null : <Search aria-hidden="true" />}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 rounded-lg border bg-card p-2 text-foreground shadow-md md:flex-row md:items-stretch">
          <div className="flex min-w-0 flex-[2] flex-col rounded-md px-3 py-1.5 focus-within:ring-2 focus-within:ring-ring">
            <label htmlFor={queryId} className="type-label text-ink-secondary">
              Ce cauți?
            </label>
            <div className="flex items-center gap-2">
              <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              {queryInput}
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col rounded-md border-t px-3 py-1.5 focus-within:ring-2 focus-within:ring-ring md:border-t-0 md:border-l">
            <label htmlFor={locationId} className="type-label text-ink-secondary">
              Unde?
            </label>
            <div className="flex items-center gap-2">
              <MapPin className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              {locationInput}
            </div>
          </div>
          <Button type="submit" size="lg" loading={isSubmitting} className="md:h-auto md:min-h-13">
            {isSubmitting ? null : <Search aria-hidden="true" />}
            Caută
          </Button>
        </div>
      )}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className={cn(
            // Fundal propriu: mesajul rămâne lizibil și pe hero-ul întunecat.
            "mt-2 w-fit rounded-sm bg-card px-2 py-1 type-label text-destructive",
            compact && "absolute top-full left-0 z-10 mt-1 border shadow-sm",
          )}
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
