"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";

import { categoryHref, mainCategories } from "@/config/categories";
import { headerActions, isAvailable } from "@/config/navigation";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Deschide meniul">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" aria-describedby="mobile-nav-desc" closeLabel="Închide meniul">
        <SheetHeader>
          <SheetTitle>
            <BrandLogo size="sm" />
            <span className="sr-only">Meniu</span>
          </SheetTitle>
          <SheetDescription id="mobile-nav-desc">Mai aproape de ce cauți.</SheetDescription>
        </SheetHeader>

        <nav aria-label="Navigare mobilă" className="flex flex-col gap-1">
          <p className="px-3 pt-1 type-label text-muted-foreground">Categorii</p>
          <ul className="flex flex-col">
            {mainCategories.map(({ slug, name, icon: Icon }) => (
              <li key={slug}>
                <Link
                  href={categoryHref(slug)}
                  onClick={close}
                  className="flex min-h-11 items-center gap-3 rounded-md px-3 type-secondary font-medium hover:bg-muted focus-visible:focus-ring"
                >
                  <Icon className="size-5 text-secondary-foreground" aria-hidden="true" />
                  {name}
                  <ChevronRight className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Separator />

        <div className="flex flex-col gap-1">
          {headerActions.map(({ id, label, icon: Icon, href, feature }) =>
            isAvailable(feature) ? (
              <Button key={id} variant="ghost" asChild className="justify-start">
                <Link href={href} onClick={close}>
                  <Icon aria-hidden="true" />
                  {label}
                </Link>
              </Button>
            ) : (
              <Button key={id} variant="ghost" disabled className="justify-start disabled:bg-transparent disabled:text-muted-foreground">
                <Icon aria-hidden="true" />
                {label}
                <Badge className="ml-auto">În curând</Badge>
              </Button>
            ),
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
