import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { areDevRoutesEnabled } from "@/lib/env";
import { DesignSystemShowcase } from "./_components/showcase";

export const metadata: Metadata = {
  title: "Design System (intern)",
  robots: { index: false, follow: false, nocache: true },
};

// Evaluat la fiecare cerere: guard-ul de mediu nu trebuie „înghețat” la build.
export const dynamic = "force-dynamic";

export default function DesignSystemPage() {
  if (!areDevRoutesEnabled()) notFound();
  return <DesignSystemShowcase />;
}
