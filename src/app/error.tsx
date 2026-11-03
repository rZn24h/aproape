"use client";

import { ErrorState } from "@/components/shared/states";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-content py-16">
      <ErrorState
        title="Ceva nu a funcționat"
        description="A apărut o eroare neașteptată. Încearcă din nou."
        action={<Button onClick={reset}>Încearcă din nou</Button>}
      />
    </div>
  );
}
