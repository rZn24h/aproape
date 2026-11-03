import type { Currency } from "@/lib/utils/format";

export type SellerType = "persoana" | "firma";

/** Forma de prezentare a unui anunț (nu modelul de date din D1). */
export type ListingSummary = {
  id: string;
  href: string;
  title: string;
  image?: { src: string; alt: string } | null;
  price?: { amount: number; currency: Currency } | null;
  /** Ex. „Preț negociabil”, „Gratuit” când nu există sumă. */
  priceLabel?: string;
  location: string;
  publishedAt: Date;
  /** Doar pentru plasări plătite reale. */
  isPromoted?: boolean;
  sellerType?: SellerType;
};
