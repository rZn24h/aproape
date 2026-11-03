export const siteConfig = {
  name: "aproape24.ro",
  slogan: "Mai aproape de ce cauți.",
  description:
    "Descoperă produse, servicii și oferte de la persoane și firme din apropierea ta. Cumpără și vinde mai simplu pe aproape24.ro.",
  locale: "ro_RO",
  /**
   * URL-ul canonic se configurează prin NEXT_PUBLIC_SITE_URL (valoare publică, nu secret).
   * Fără el nu se emit canonical-uri sau URL-uri absolute.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? null,
} as const;
