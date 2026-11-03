import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { findCategory, mainCategories } from "@/config/categories";
import { EmptyState } from "@/components/shared/states";
import { buttonVariants } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return mainCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = findCategory((await params).slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Anunțuri din categoria ${category.name} pe aproape24.ro.`,
    // Fără anunțuri încă: pagina nu se indexează până la lansarea M02/M03.
    robots: { index: false, follow: true },
  };
}

/** Pagină minimă de categorie: destinație stabilă pentru linkuri. Listarea completă vine în M02. */
export default async function CategoryPage({ params }: Props) {
  const category = findCategory((await params).slug);
  if (!category) notFound();
  const Icon = category.icon;

  return (
    <div className="container-content flex flex-col gap-6 py-6 md:py-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 type-label font-normal text-muted-foreground">
          <li>
            <Link href="/" className="rounded-sm hover:text-primary focus-visible:focus-ring">
              Acasă
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-4" />
          </li>
          <li aria-current="page" className="text-foreground">
            {category.name}
          </li>
        </ol>
      </nav>

      <header className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
          <Icon className="size-7" aria-hidden="true" />
        </span>
        <h1 className="type-h1">{category.name}</h1>
      </header>

      <section aria-labelledby="subcategorii-title" className="rounded-lg border bg-card p-4 md:p-6">
        <h2 id="subcategorii-title" className="mb-4 type-h3">
          Subcategorii
        </h2>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-2 type-secondary text-ink-secondary sm:grid-cols-2 lg:grid-cols-3">
          {category.subcategories.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <EmptyState
        icon={Icon}
        title="Anunțurile din această categorie vor apărea aici"
        description="Platforma se pregătește de lansare. Listarea și filtrarea anunțurilor pe categorii vor fi disponibile în curând."
        action={
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            Înapoi la pagina principală
          </Link>
        }
      />
    </div>
  );
}
