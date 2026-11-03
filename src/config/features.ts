/**
 * Disponibilitatea modulelor. O acțiune devine link/buton activ doar când
 * modulul ei există. Se schimbă în `true` odată cu livrarea modulului.
 */
export const features = {
  /** M03 — ruta /cautare cu rezultate reale. */
  search: false,
  /** M05 — fluxul de publicare. */
  publish: false,
  /** M10 — salvarea favoritelor. */
  favorites: false,
  /** M09 — mesagerie. */
  messages: false,
  /** M06 — autentificare și cont. */
  account: false,
  /** M08 — profiluri publice de firmă. */
  businessProfiles: false,
} as const;

export type FeatureKey = keyof typeof features;
