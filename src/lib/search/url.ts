import type { SearchValues } from "@/lib/validations/search";

export const SEARCH_PATH = "/cautare";

/** Parametrii URL stabili pentru M03: /cautare?q=<termen>&loc=<localitate>. */
export function buildSearchUrl(values: SearchValues): string {
  const params = new URLSearchParams();
  params.set("q", values.query);
  if (values.location) params.set("loc", values.location);
  return `${SEARCH_PATH}?${params.toString()}`;
}
