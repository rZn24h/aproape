import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-sm px-2 py-1 type-caption [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "bg-muted text-ink-secondary",
        brand: "bg-secondary text-secondary-foreground",
        /** Exclusiv pentru plasări plătite reale („Promovat”). */
        promoted: "bg-highlight text-highlight-foreground",
        danger: "bg-destructive-soft text-destructive",
        outline: "border bg-card text-ink-secondary",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
