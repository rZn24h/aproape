import Link from "next/link";
import type * as React from "react";

import { features } from "@/config/features";
import { Button, type ButtonProps } from "@/components/ui/button";

/** Destinația reală a fluxului de publicare (M05). */
export const PUBLISH_PATH = "/publica";

type PublishButtonProps = Omit<ButtonProps, "asChild" | "disabled"> & { children: React.ReactNode };

/**
 * Buton „Publică anunț”: link real când M05 există, altfel dezactivat
 * cu explicație accesibilă (nu duce la un flux inexistent).
 */
export function PublishButton({ children, ...props }: PublishButtonProps) {
  if (features.publish) {
    return (
      <Button asChild {...props}>
        <Link href={PUBLISH_PATH}>{children}</Link>
      </Button>
    );
  }
  return (
    <Button disabled title="Publicarea anunțurilor va fi disponibilă în curând" {...props}>
      {children}
      <span className="sr-only">(în curând)</span>
    </Button>
  );
}
