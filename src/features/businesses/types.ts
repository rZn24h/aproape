/** Forma de prezentare a unei firme (M08 va furniza datele reale). */
export type BusinessSummary = {
  id: string;
  name: string;
  /** Link spre profilul public; doar când profilul există. */
  href?: string;
  logo?: { src: string; alt: string } | null;
  location?: string;
  /** Domeniul de activitate, ex. „Servicii · Reparații auto”. */
  activity?: string;
  description?: string;
};

export interface BusinessesSource {
  /** Firme cu profil public activ, opțional dintr-o localitate. */
  local(query: { limit: number; location?: string }): Promise<readonly BusinessSummary[]>;
}
