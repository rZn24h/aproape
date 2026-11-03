import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  /** `light` = pe fundal luminos (implicit), `dark` = pe ink-900. */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  /** Dacă e setat, logo-ul devine link (ex. „/”). */
  href?: string;
  className?: string;
};

const sizes = { sm: "text-xl", md: "text-2xl", lg: "text-4xl" } as const;

/** Logotip tipografic: „aproape” + „24” (accent) + „.ro”. Fără simboluri decorative. */
export function BrandLogo({ variant = "light", size = "md", href, className }: BrandLogoProps) {
  const mark = (
    <span
      data-slot="brand-logo"
      data-variant={variant}
      className={cn(
        "font-display leading-none font-bold tracking-[-0.02em] whitespace-nowrap",
        variant === "light" ? "text-foreground" : "text-dark-foreground",
        sizes[size],
        !href && className,
      )}
      aria-hidden={href ? true : undefined}
    >
      aproape
      <span className={variant === "light" ? "text-brand-accent" : "text-brand-accent-on-dark"}>24</span>
      .ro
    </span>
  );

  if (!href) {
    return (
      <span role="img" aria-label="aproape24.ro" className={className}>
        {mark}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label="aproape24.ro — pagina principală"
      className={cn(
        "inline-flex min-h-11 items-center rounded-sm",
        variant === "dark" ? "focus-visible:shadow-[0_0_0_2px_var(--dark),0_0_0_4px_var(--brand-accent-on-dark)] focus-visible:outline-none" : "focus-visible:focus-ring",
        className,
      )}
    >
      {mark}
    </Link>
  );
}
