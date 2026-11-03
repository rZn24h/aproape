import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-28 w-full rounded-md border border-input bg-card px-3 py-2.5 type-body text-foreground transition-colors placeholder:text-muted-foreground hover:border-ink-secondary focus-visible:border-primary focus-visible:focus-ring disabled:cursor-not-allowed disabled:bg-muted aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
