import * as React from "react";

export function DsSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 rounded-xl border bg-card p-4 md:rounded-2xl md:p-8">
      <h2 id={`${id}-title`} className="mb-6 type-h3">
        {title}
      </h2>
      {children}
    </section>
  );
}
