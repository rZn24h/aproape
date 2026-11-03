import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors select-none focus-visible:focus-ring disabled:pointer-events-none disabled:bg-muted disabled:text-input disabled:shadow-none aria-disabled:pointer-events-none aria-disabled:bg-muted aria-disabled:text-input [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        secondary:
          "border border-input bg-card text-foreground hover:border-primary hover:text-primary active:bg-muted",
        tonal: "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-hover",
        ghost: "text-ink-secondary hover:bg-muted hover:text-foreground active:bg-border",
        link: "h-auto px-0 text-primary underline-offset-4 hover:underline active:text-primary-active",
        promote: "bg-highlight text-highlight-foreground hover:bg-highlight-hover",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-9 px-3 type-secondary rounded-sm",
        md: "h-11 px-4 type-secondary",
        lg: "h-13 px-6 type-body",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Afișează un indicator și blochează acțiunea; păstrează eticheta pentru cititoare de ecran. */
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), loading && "cursor-progress", className)}
      disabled={asChild ? undefined : disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : null}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants, type ButtonProps };
