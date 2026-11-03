import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";

import { EmptyState } from "@/components/shared/states";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pagina nu a fost găsită",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="container-content py-16">
      <EmptyState
        icon={SearchX}
        title="Pagina nu a fost găsită"
        description="Adresa poate fi greșită sau pagina nu mai există."
        action={
          <Link href="/" className={buttonVariants()}>
            Înapoi la pagina principală
          </Link>
        }
      />
    </div>
  );
}
