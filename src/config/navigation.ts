import { Heart, MessageCircle, UserRound, type LucideIcon } from "lucide-react";

import { features, type FeatureKey } from "@/config/features";

/**
 * Strategia pentru funcționalități neimplementate: o intrare devine link doar
 * când `features[feature]` este true; altfel se afișează dezactivată cu
 * eticheta „În curând”, niciodată ca link spre o pagină inexistentă.
 */
export type NavAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  feature: FeatureKey;
};

export const headerActions: readonly NavAction[] = [
  { id: "favorite", label: "Favorite", icon: Heart, href: "/cont/favorite", feature: "favorites" },
  { id: "mesaje", label: "Mesaje", icon: MessageCircle, href: "/mesaje", feature: "messages" },
  { id: "cont", label: "Cont", icon: UserRound, href: "/cont", feature: "account" },
];

export function isAvailable(feature: FeatureKey): boolean {
  return features[feature];
}

export type FooterLink = { label: string; href?: string; external?: boolean };
export type FooterColumn = { title: string; links: readonly FooterLink[] };

export const footerColumns: readonly FooterColumn[] = [
  {
    title: "Descoperă",
    links: [{ label: "Toate categoriile", href: "/#categorii" }, { label: "Căutare avansată" }, { label: "Firme locale" }],
  },
  {
    title: "Contul tău",
    links: [{ label: "Publică anunț" }, { label: "Anunțurile mele" }, { label: "Favorite" }, { label: "Mesaje" }],
  },
  {
    title: "Ajutor",
    links: [{ label: "Centru de ajutor" }, { label: "Siguranță" }, { label: "Raportează un anunț" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Termeni și condiții" },
      { label: "Confidențialitate" },
      { label: "Cookie-uri" },
      { label: "ANPC", href: "https://anpc.ro", external: true },
    ],
  },
];
