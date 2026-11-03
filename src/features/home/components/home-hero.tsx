import { SiteSearch } from "@/components/shared/site-search";

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="container-content pt-4 md:pt-6">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-dark px-4 pt-8 pb-5 text-center text-dark-foreground md:gap-4 md:rounded-2xl md:px-14 md:pt-14 md:pb-8">
        <h1 id="hero-title" className="type-h1 text-dark-foreground">
          Tot ce cauți, mai aproape de tine.
        </h1>
        <p className="max-w-xl text-[15px] leading-[22px] text-dark-muted-foreground md:text-lg md:leading-7">
          Descoperă oferte de la oameni și firme din zona ta.
        </p>
        <SiteSearch
          variant="hero"
          label="Caută anunțuri"
          className="mt-2 w-full max-w-[1000px] text-left text-dark-muted-foreground md:mt-4"
        />
      </div>
    </section>
  );
}
