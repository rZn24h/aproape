import { Heart, MessageCircle, UserRound, type LucideIcon } from "lucide-react";

/**
 * Strategia pentru funcționalități neimplementate: intrările fără `href`
 * se afișează ca acțiuni dezactivate cu eticheta „În curând”, nu ca linkuri
 * către pagini inexistente. Când un modul e livrat, i se adaugă `href`.
 */
export type NavAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  module: string;
};

export const headerActions: readonly NavAction[] = [
  { id: "favorite", label: "Favorite", icon: Heart, module: "M10" },
  { id: "mesaje", label: "Mesaje", icon: MessageCircle, module: "M09" },
  { id: "cont", label: "Cont", icon: UserRound, module: "M06" },
];

export const primaryNav = [{ label: "Categorii", href: "/#categorii" }] as const;

export const footerNav: readonly { label: string; href?: string; module: string }[] = [
  { label: "Categorii", href: "/#categorii", module: "M02" },
  { label: "Ajutor", module: "M12" },
  { label: "Siguranță", module: "M12" },
  { label: "Termeni și condiții", module: "M12" },
  { label: "Confidențialitate", module: "M12" },
];
