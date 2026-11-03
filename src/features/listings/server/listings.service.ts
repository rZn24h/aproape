import "server-only";

import { loadSection, type SectionResult } from "@/lib/data/section-result";
import type { ListingSummary } from "@/types/listing";
import type { ListingsSource, RecentListingsQuery } from "../types";
import { getListingsSource } from "./source";

export const HOME_PROMOTED_LIMIT = 4;
export const HOME_RECENT_LIMIT = 8;

export async function getPromotedListings(
  limit = HOME_PROMOTED_LIMIT,
  source: ListingsSource | null = getListingsSource(),
): Promise<SectionResult<ListingSummary>> {
  const result = await loadSection("anunturi-promovate", source ? () => source.promoted(limit) : null);
  if (result.status !== "ok") return result;
  // Apărare suplimentară: secțiunea afișează exclusiv anunțuri marcate promovate.
  return { status: "ok", items: result.items.filter((l) => l.isPromoted === true).slice(0, limit) };
}

export async function getRecentListings(
  query: RecentListingsQuery = { limit: HOME_RECENT_LIMIT },
  source: ListingsSource | null = getListingsSource(),
): Promise<SectionResult<ListingSummary>> {
  const result = await loadSection("anunturi-recente", source ? () => source.recent(query) : null);
  if (result.status !== "ok") return result;
  return { status: "ok", items: result.items.slice(0, query.limit) };
}
