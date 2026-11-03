import { Plus } from "lucide-react";

import { features } from "@/config/features";
import { PublishButton } from "@/components/layout/publish-button";

export function PublishCta() {
  return (
    <section aria-labelledby="publica-title" className="container-content py-6 md:py-8">
      <div className="flex flex-col items-start gap-4 rounded-xl bg-secondary px-5 py-8 md:rounded-2xl md:px-14 md:py-14">
        <h2 id="publica-title" className="type-h2">
          Ai ceva de vândut?
        </h2>
        <p className="max-w-xl type-body text-ink-secondary">
          Publică un anunț și ajungi mai aproape de oamenii interesați din zona ta.
        </p>
        <div className="mt-2 flex flex-col gap-2">
          <PublishButton size="lg" aria-describedby={features.publish ? undefined : "publica-nota"}>
            <Plus aria-hidden="true" />
            Publică un anunț
          </PublishButton>
          {features.publish ? null : (
            <p id="publica-nota" className="type-label font-normal text-secondary-foreground">
              Publicarea anunțurilor va fi disponibilă în curând.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
