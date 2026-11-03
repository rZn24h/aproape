import Link from "next/link";

import { categoryHref, mainCategories } from "@/config/categories";
import { HomeSection } from "./home-section";

export function CategoryGrid() {
  return (
    <HomeSection id="categorii" title="Categorii principale" description="Alege o categorie și vezi anunțurile din zona ta.">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {mainCategories.map(({ slug, name, icon: Icon }) => (
          <li key={slug}>
            <Link
              href={categoryHref(slug)}
              className="group flex h-full min-h-16 items-center gap-3 rounded-lg border bg-card p-3 transition-[border-color,box-shadow] hover:border-brand-accent hover:shadow-sm focus-visible:focus-ring md:flex-col md:items-start md:gap-4 md:p-4"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground transition-colors group-hover:bg-secondary-hover md:size-12">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="text-[15px] leading-[22px] font-semibold">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
