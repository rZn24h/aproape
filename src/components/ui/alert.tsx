import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-md border px-4 py-3 type-secondary [&>svg]:mt-0.5 [&>svg]:size-5 [&>svg]:shrink-0 [&>:not(svg)]:col-start-2",
  {
    variants: {
      variant: {
        info: "border-secondary-hover bg-secondary text-foreground [&>svg]:text-secondary-foreground",
        success: "border-secondary-hover bg-secondary text-foreground [&>svg]:text-secondary-foreground",
        warning: "border-highlight/40 bg-highlight-soft text-foreground [&>svg]:text-highlight-soft-foreground",
        error: "border-destructive/30 bg-destructive-soft text-foreground [&>svg]:text-destructive",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role={variant === "error" ? "alert" : "status"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="alert-title" className={cn("font-semibold", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("text-ink-secondary", className)} {...props} />;
}

export { Alert, AlertDescription, AlertTitle };
