"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LayoutGrid, MessageCircle, Plus, UserRound, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { features, type FeatureKey } from "@/config/features";
import { PUBLISH_PATH } from "@/components/layout/publish-button";

type Tab = { label: string; icon: LucideIcon; href: string; feature?: FeatureKey; primary?: boolean };

const tabs: readonly Tab[] = [
  { label: "Acasă", icon: House, href: "/" },
  { label: "Categorii", icon: LayoutGrid, href: "/#categorii" },
  { label: "Publică", icon: Plus, href: PUBLISH_PATH, feature: "publish", primary: true },
  { label: "Mesaje", icon: MessageCircle, href: "/mesaje", feature: "messages" },
  { label: "Cont", icon: UserRound, href: "/cont", feature: "account" },
];

/** Navigare de jos pe mobil (sub 768px). Intrările indisponibile sunt dezactivate. */
export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navigare rapidă"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid h-16 grid-cols-5">
        {tabs.map(({ label, icon: Icon, href, feature, primary }) => {
          const available = feature ? features[feature] : true;
          const current = href === "/" && pathname === "/";
          const content = (
            <>
              <span
                className={cn(
                  "flex items-center justify-center",
                  primary && "size-9 rounded-full",
                  primary && (available ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="type-caption">{label}</span>
            </>
          );
          const base = "flex h-full flex-col items-center justify-center gap-0.5";
          return (
            <li key={label}>
              {available ? (
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  className={cn(base, "rounded-sm focus-visible:focus-ring", current ? "text-primary" : "text-ink-secondary")}
                >
                  {content}
                </Link>
              ) : (
                <span className={cn(base, "text-muted-foreground")} aria-disabled="true">
                  {content}
                  <span className="sr-only">(în curând)</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
