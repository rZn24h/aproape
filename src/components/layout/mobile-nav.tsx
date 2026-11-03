"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Plus } from "lucide-react";

import { mainCategories } from "@/config/categories";
import { headerActions, primaryNav } from "@/config/navigation";
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
      <SheetContent side="right" aria-describedby="mobile-nav-desc" closeLabel="Închide meniul">
        <SheetHeader>
          <SheetTitle>
            <BrandLogo size="sm" />
            <span className="sr-only">Meniu</span>
          </SheetTitle>
          <SheetDescription id="mobile-nav-desc">Mai aproape de ce cauți.</SheetDescription>
        </SheetHeader>

        <nav aria-label="Navigare mobilă" className="flex flex-col gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex h-11 items-center rounded-md px-3 font-semibold hover:bg-muted focus-visible:focus-ring"
            >
              {item.label}
            </Link>
          ))}
          <ul className="grid grid-cols-1 gap-0.5 pl-3" aria-label="Categorii principale">
            {mainCategories.map(({ slug, name, icon: Icon }) => (
              <li key={slug} className="flex h-10 items-center gap-3 px-3 type-secondary text-ink-secondary">
                <Icon className="size-5 text-secondary-foreground" aria-hidden="true" />
                {name}
              </li>
            ))}
          </ul>
        </nav>

        <Separator />

        <div className="flex flex-col gap-1">
          {headerActions.map(({ id, label, icon: Icon }) => (
            <Button key={id} variant="ghost" disabled className="justify-start disabled:bg-transparent disabled:text-muted-foreground">
              <Icon aria-hidden="true" />
              {label}
              <Badge className="ml-auto">În curând</Badge>
            </Button>
          ))}
        </div>

        <Button disabled size="lg" className="mt-auto w-full">
          <Plus aria-hidden="true" />
          Publică anunț — în curând
        </Button>
      </SheetContent>
    </Sheet>
  );
}
