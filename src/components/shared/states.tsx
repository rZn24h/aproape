import * as React from "react";
import { CircleAlert, Inbox, LoaderCircle, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type StateProps = {
  title: string;
  description?: string;
  /** Acțiune opțională (ex. un <Button>). */
  action?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
};

function StateShell({
  icon: Icon,
  title,
  description,
  action,
  className,
  tone,
  role,
}: StateProps & { icon: LucideIcon; tone: "neutral" | "error"; role?: "alert" | "status" }) {
  return (
    <div
      role={role}
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border bg-card px-6 py-10 text-center",
        tone === "neutral" && "border-dashed border-input",
        tone === "error" && "border-destructive/30",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-full",
          tone === "neutral" ? "bg-secondary text-secondary-foreground" : "bg-destructive-soft text-destructive",
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="type-h3">{title}</h3>
      {description ? <p className="max-w-md type-secondary text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-1 flex flex-wrap justify-center gap-2">{action}</div> : null}
    </div>
  );
}

export function EmptyState({ icon = Inbox, ...props }: StateProps) {
  return <StateShell icon={icon} tone="neutral" {...props} />;
}

export function ErrorState({
  icon = CircleAlert,
  title = "Ceva nu a funcționat",
  description = "Încearcă din nou în câteva momente.",
  ...props
}: Partial<StateProps>) {
  return <StateShell icon={icon} tone="error" role="alert" title={title} description={description} {...props} />;
}

type LoadingStateProps = {
  label?: string;
  /** `spinner` pentru acțiuni, `cards` pentru liste de anunțuri. */
  variant?: "spinner" | "cards";
  count?: number;
  className?: string;
};

export function LoadingState({ label = "Se încarcă…", variant = "spinner", count = 4, className }: LoadingStateProps) {
  if (variant === "cards") {
    return (
      <div role="status" aria-live="polite" className={cn("grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4", className)}>
        <span className="sr-only">{label}</span>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border bg-card">
            <Skeleton className="aspect-[4/3] rounded-none" />
            <div className="flex flex-col gap-2 p-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div role="status" aria-live="polite" className={cn("flex items-center justify-center gap-3 py-10 text-muted-foreground", className)}>
      <LoaderCircle className="size-6 animate-spin text-primary" aria-hidden="true" />
      <span className="type-secondary">{label}</span>
    </div>
  );
}
