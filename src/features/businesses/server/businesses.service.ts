import "server-only";

import { loadSection, type SectionResult } from "@/lib/data/section-result";
import type { BusinessesSource, BusinessSummary } from "../types";

export const HOME_BUSINESSES_LIMIT = 4;

/** `null` până la implementarea M08 + D1. */
export function getBusinessesSource(): BusinessesSource | null {
  return null;
}

export async function getLocalBusinesses(
  limit = HOME_BUSINESSES_LIMIT,
  source: BusinessesSource | null = getBusinessesSource(),
): Promise<SectionResult<BusinessSummary>> {
  const result = await loadSection("firme-locale", source ? () => source.local({ limit }) : null);
  if (result.status !== "ok") return result;
  return { status: "ok", items: result.items.slice(0, limit) };
}
