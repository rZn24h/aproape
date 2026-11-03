export const siteConfig = {
  name: "aproape24.ro",
  slogan: "Mai aproape de ce cauți.",
  description:
    "aproape24.ro este un marketplace românesc de anunțuri locale: cumperi și vinzi produse și servicii aproape de tine.",
  locale: "ro_RO",
  /**
   * URL-ul canonic se configurează prin NEXT_PUBLIC_SITE_URL (valoare publică, nu secret).
   * Fără el nu se emit canonical-uri sau URL-uri absolute.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? null,
} as const;
