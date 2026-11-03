import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-input bg-card px-3 type-body text-foreground transition-colors placeholder:text-muted-foreground hover:border-ink-secondary focus-visible:border-primary focus-visible:focus-ring disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground aria-invalid:border-destructive file:border-0 file:bg-transparent file:font-medium",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
