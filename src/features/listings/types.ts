import type { ListingSummary } from "@/types/listing";

export type RecentListingsQuery = {
  limit: number;
  /** Localitatea aleasă explicit de vizitator; nu se deduce automat. */
  location?: string;
};

/**
 * Contractul pe care îl va implementa accesul la D1 (Drizzle).
 * Implementarea trebuie să returneze doar anunțuri active, publice,
 * neexpirate și aprobate.
 */
export interface ListingsSource {
  /** Anunțuri cu promovare activă, ordonate după începutul promovării, desc. */
  promoted(limit: number): Promise<readonly ListingSummary[]>;
  /** Anunțuri ordonate după data publicării, desc. */
  recent(query: RecentListingsQuery): Promise<readonly ListingSummary[]>;
}
