import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/** Doar rutele publice existente. Fără URL canonic configurat, sitemap-ul e gol. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  return [{ url: `${siteConfig.url}/`, changeFrequency: "weekly", priority: 1 }];
}
