import type * as React from "react";

import { cn } from "@/lib/utils";

type HomeSectionProps = {
  id: string;
  title: string;
  description?: string;
  /** Link „vezi tot”, doar când destinația există. */
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function HomeSection({ id, title, description, action, children, className }: HomeSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("container-content scroll-mt-32 py-6 md:py-8", className)}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 md:mb-6">
        <div className="flex flex-col gap-1">
          <h2 id={`${id}-title`} className="type-h2">
            {title}
          </h2>
          {description ? <p className="type-secondary text-muted-foreground">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
