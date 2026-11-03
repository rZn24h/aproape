"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { MapPin, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { searchSchema, type SearchInput, type SearchValues } from "@/lib/validations/search";

type SearchBarProps = {
  /** Primește valorile validate. M03 va conecta aici navigarea către rezultate. */
  onSearch: (values: SearchValues) => void | Promise<void>;
  defaultValues?: Partial<SearchInput>;
  variant?: "hero" | "compact";
  className?: string;
};

export function SearchBar({ onSearch, defaultValues, variant = "hero", className }: SearchBarProps) {
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

  return (
    <form
      role="search"
      aria-label="Caută anunțuri"
      noValidate
      onSubmit={handleSubmit(onSearch)}
      className={cn("w-full", className)}
    >
      <div
        className={cn(
          "flex flex-col gap-2 rounded-lg border bg-card p-2 md:flex-row md:items-stretch",
          variant === "hero" && "shadow-md",
        )}
      >
        <div className="flex min-w-0 flex-[2] flex-col rounded-md px-3 py-1.5 focus-within:ring-2 focus-within:ring-ring">
          <label htmlFor={queryId} className="type-label text-ink-secondary">
            Ce cauți?
          </label>
          <div className="flex items-center gap-2">
            <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              id={queryId}
              type="search"
              autoComplete="off"
              enterKeyHint="search"
              placeholder="ex. bicicletă, apartament, frigider"
              aria-invalid={!!errors.query}
              aria-describedby={errors.query ? errorId : undefined}
              className="h-9 w-full min-w-0 bg-transparent type-body outline-none placeholder:text-muted-foreground"
              {...register("query")}
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col rounded-md border-t px-3 py-1.5 focus-within:ring-2 focus-within:ring-ring md:border-t-0 md:border-l">
          <label htmlFor={locationId} className="type-label text-ink-secondary">
            Unde?
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              id={locationId}
              type="text"
              autoComplete="address-level2"
              placeholder="Localitate"
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? errorId : undefined}
              className="h-9 w-full min-w-0 bg-transparent type-body outline-none placeholder:text-muted-foreground"
              {...register("location")}
            />
          </div>
        </div>
        <Button type="submit" size="lg" loading={isSubmitting} className="md:h-auto md:min-h-13">
          {isSubmitting ? null : <Search aria-hidden="true" />}
          Caută
        </Button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-2 px-1 type-label text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  );
}
