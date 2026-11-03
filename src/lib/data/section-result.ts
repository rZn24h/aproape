/**
 * Rezultatul unei secțiuni care depinde de date.
 * - `ok`: date reale (lista poate fi goală)
 * - `unavailable`: sursa de date nu este încă conectată (ex. D1 neconfigurat)
 * - `error`: sursa există, dar citirea a eșuat (detaliile rămân pe server)
 */
export type SectionResult<T> =
  | { status: "ok"; items: readonly T[] }
  | { status: "unavailable" }
  | { status: "error" };

export async function loadSection<T>(
  label: string,
  load: (() => Promise<readonly T[]>) | null,
): Promise<SectionResult<T>> {
  if (!load) return { status: "unavailable" };
  try {
    return { status: "ok", items: await load() };
  } catch (error) {
    // Doar pe server; vizitatorul vede un mesaj generic.
    console.error(`[${label}] citirea datelor a eșuat`, error instanceof Error ? error.message : error);
    return { status: "error" };
  }
}
