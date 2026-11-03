import "server-only";

import type { ListingsSource } from "../types";

/**
 * Sursa de anunțuri. Returnează `null` până când D1 + Drizzle sunt
 * configurate (etapa backend). Nu există date simulate.
 */
export function getListingsSource(): ListingsSource | null {
  return null;
}
