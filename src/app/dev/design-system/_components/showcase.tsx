"use client";

import * as React from "react";
import { toast } from "sonner";
import { CircleAlert, Info, LogOut, Pencil, Plus, Settings, TriangleAlert } from "lucide-react";

import { brandColors, derivedColors, radii, spacingScale } from "@/config/design-tokens";
import type { ListingSummary } from "@/types/listing";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ListingCard } from "@/components/shared/listing-card";
import { SearchBar } from "@/components/shared/search-bar";
import { SellerCard } from "@/components/shared/seller-card";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/states";
import { DemoForm } from "./demo-form";
import { DsSection } from "./section";

const NOW = new Date();
const hoursAgo = (h: number) => new Date(NOW.getTime() - h * 3_600_000);

/** Date demonstrative — nu sunt anunțuri reale. */
const demoListings: ListingSummary[] = [
  {
    id: "demo-1",
    href: "#listing-card",
    title: "[Demo] Bicicletă de oraș, cadru aluminiu, roți 28 inch, stare foarte bună",
    price: { amount: 1250, currency: "RON" },
    location: "[Localitate demo]",
    publishedAt: hoursAgo(1),
    isPromoted: true,
    sellerType: "persoana",
  },
  {
    id: "demo-2",
    href: "#listing-card",
    title: "[Demo] Autoturism compact, exemplu de titlu",
    price: { amount: 12900, currency: "EUR" },
    location: "[Localitate demo]",
    publishedAt: hoursAgo(26),
    sellerType: "firma",
  },
  {
    id: "demo-3",
    href: "#listing-card",
    title: "[Demo] Anunț fără preț și fără fotografie",
    priceLabel: "Preț negociabil",
    location: "[Localitate demo]",
    publishedAt: hoursAgo(24 * 9),
  },
];

const sections = [
  ["logo", "Logo"],
  ["culori", "Culori"],
  ["tipografie", "Tipografie"],
  ["spatiere", "Spațiere și raze"],
  ["butoane", "Butoane"],
  ["controale", "Controale"],
  ["formular", "Formular (Valibot)"],
  ["continut", "Carduri, badge-uri, avatar"],
  ["feedback", "Alert, Dialog, Toast, Tooltip"],
  ["listing-card", "ListingCard"],
  ["seller-card", "SellerCard"],
  ["search-bar", "SearchBar"],
  ["stari", "Stări"],
] as const;

export function DesignSystemShowcase() {
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({ "demo-2": true });
  const [notifications, setNotifications] = React.useState(true);
  const [newsletter, setNewsletter] = React.useState(false);
  const [sort, setSort] = React.useState("recente");
  const [lastSearch, setLastSearch] = React.useState<string | null>(null);

  return (
    <div className="container-content flex flex-col gap-6 py-8 md:gap-8 md:py-12">
      <header className="flex flex-col gap-3">
        <Badge variant="danger">Instrument intern — doar în development</Badge>
        <h1 className="type-h1">Design System</h1>
        <p className="max-w-2xl text-ink-secondary">
          Componentele fundației aproape24.ro. Toate datele de pe această pagină sunt demonstrative.
        </p>
        <nav aria-label="Secțiuni Design System">
          <ul className="flex flex-wrap gap-2">
            {sections.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex h-9 items-center rounded-full border bg-card px-3 type-label hover:border-primary hover:text-primary focus-visible:focus-ring"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <DsSection id="logo" title="Logo">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex min-h-32 items-center justify-center rounded-lg border bg-card p-6">
            <BrandLogo size="lg" />
          </div>
          <div className="flex min-h-32 items-center justify-center rounded-lg bg-dark p-6">
            <BrandLogo size="lg" variant="dark" />
          </div>
        </div>
      </DsSection>

      <DsSection id="culori" title="Culori">
        <h3 className="mb-3 type-secondary font-semibold text-ink-secondary">Paleta oficială</h3>
        <ul className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {brandColors.map((c) => (
            <li key={c.token} className="flex flex-col gap-1.5">
              <span className="h-16 rounded-md border" style={{ backgroundColor: c.hex }} aria-hidden="true" />
              <span className="type-label font-semibold">{c.token}</span>
              <span className="type-label font-normal text-muted-foreground">{c.hex}</span>
              <span className="type-label font-normal text-muted-foreground">{c.usage}</span>
            </li>
          ))}
        </ul>
        <h3 className="mb-3 type-secondary font-semibold text-ink-secondary">Derivate (contrast verificat)</h3>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {derivedColors.map((c) => (
            <li key={c.token} className="flex flex-col gap-1.5">
              <span className="h-12 rounded-md border" style={{ backgroundColor: c.hex }} aria-hidden="true" />
              <span className="type-label font-semibold">{c.token}</span>
              <span className="type-label font-normal text-muted-foreground">{c.hex}</span>
            </li>
          ))}
        </ul>
      </DsSection>

      <DsSection id="tipografie" title="Tipografie">
        <div className="flex flex-col gap-4">
          <p className="type-h1">H1 — Mai aproape de ce cauți.</p>
          <p className="type-h2">H2 — Anunțuri recente din apropiere</p>
          <p className="type-h3">H3 — Firme locale</p>
          <p className="type-body">Body 16 — Descoperă oferte de la oameni și firme din zona ta.</p>
          <p className="type-secondary text-muted-foreground">Secundar 14 — Azi, 14:20</p>
          <p className="type-label">Etichetă 13 — Localitate</p>
          <p className="type-caption">Caption 12 — Promovat</p>
          <p className="type-price">Preț — 12.900 €</p>
          <p className="type-body">Diacritice: ă â î ș ț — Ă Â Î Ș Ț — „ghilimele românești”</p>
        </div>
      </DsSection>

      <DsSection id="spatiere" title="Spațiere și raze">
        <ul className="mb-6 flex flex-wrap items-end gap-4">
          {spacingScale.map((s) => (
            <li key={s} className="flex flex-col items-center gap-1">
              <span className="block bg-brand-accent" style={{ width: s, height: s }} aria-hidden="true" />
              <span className="type-label font-normal text-muted-foreground">{s}px</span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-4">
          {radii.map((r) => (
            <li key={r.token} className="flex flex-col items-center gap-1">
              <span className="block size-20 border-2 border-primary bg-secondary" style={{ borderRadius: r.px }} aria-hidden="true" />
              <span className="type-label">{r.token}</span>
              <span className="type-label font-normal text-muted-foreground">
                {r.px}px · {r.usage}
              </span>
            </li>
          ))}
        </ul>
      </DsSection>

      <DsSection id="butoane" title="Butoane">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <Button>Principal</Button>
            <Button variant="secondary">Secundar</Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="promote">Promovează</Button>
            <Button variant="destructive">Șterge</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Mic</Button>
            <Button size="md">Mediu</Button>
            <Button size="lg">Mare</Button>
            <Button size="icon" aria-label="Adaugă">
              <Plus aria-hidden="true" />
            </Button>
            <Button disabled>Dezactivat</Button>
            <Button loading>Se salvează</Button>
          </div>
        </div>
      </DsSection>

      <DsSection id="controale" title="Controale">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="ds-input">Input</Label>
            <Input id="ds-input" placeholder="Scrie ceva" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ds-input-error">Input cu eroare</Label>
            <Input id="ds-input-error" defaultValue="ab" aria-invalid aria-describedby="ds-input-error-msg" />
            <p id="ds-input-error-msg" className="flex items-center gap-1.5 type-label text-destructive">
              <CircleAlert className="size-4" aria-hidden="true" />
              Scrie cel puțin 3 caractere.
            </p>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ds-input-disabled">Input dezactivat</Label>
            <Input id="ds-input-disabled" disabled defaultValue="Indisponibil" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ds-select">Sortare</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger id="ds-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recente">Cele mai recente</SelectItem>
                <SelectItem value="pret-asc">Preț crescător</SelectItem>
                <SelectItem value="pret-desc">Preț descrescător</SelectItem>
              </SelectContent>
            </Select>
            <p className="type-label font-normal text-muted-foreground" data-testid="sort-value">
              Selectat: {sort}
            </p>
          </div>
          <div className="grid gap-1.5 md:col-span-2">
            <Label htmlFor="ds-textarea">Textarea</Label>
            <Textarea id="ds-textarea" placeholder="Descrierea anunțului" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Checkbox id="ds-checkbox" checked={newsletter} onCheckedChange={(v) => setNewsletter(v === true)} />
              <Label htmlFor="ds-checkbox">Checkbox {newsletter ? "(bifat)" : "(nebifat)"}</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="ds-checkbox-disabled" disabled />
              <Label htmlFor="ds-checkbox-disabled">Checkbox dezactivat</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="ds-switch" checked={notifications} onCheckedChange={setNotifications} />
              <Label htmlFor="ds-switch">Notificări {notifications ? "activate" : "dezactivate"}</Label>
            </div>
          </div>
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 type-label">Radio Group</legend>
            <RadioGroup defaultValue="toate">
              {(
                [
                  ["toate", "Toate anunțurile"],
                  ["persoane", "Doar persoane fizice"],
                  ["firme", "Doar firme"],
                ] as const
              ).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3">
                  <RadioGroupItem value={value} id={`ds-radio-${value}`} />
                  <Label htmlFor={`ds-radio-${value}`}>{label}</Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>
        </div>
      </DsSection>

      <DsSection id="formular" title="Formular (React Hook Form + Valibot)">
        <DemoForm />
      </DsSection>

      <DsSection id="continut" title="Carduri, badge-uri, avatar">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card</CardTitle>
              <CardDescription>Container alb, bordură subtilă, rază 16px.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="type-secondary">Conținutul cardului.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Acțiune</Button>
              <Button size="sm" variant="ghost">
                Anulează
              </Button>
            </CardFooter>
          </Card>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Neutru</Badge>
              <Badge variant="brand">Firmă</Badge>
              <Badge variant="promoted">Promovat</Badge>
              <Badge variant="danger">Expirat</Badge>
              <Badge variant="outline">Contur</Badge>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </DsSection>

      <DsSection id="feedback" title="Alert, Dialog, Dropdown, Toast, Tooltip">
        <div className="flex flex-col gap-4">
          <Alert variant="info">
            <Info aria-hidden="true" />
            <AlertTitle>Informare</AlertTitle>
            <AlertDescription>Mesaj neutru pentru utilizator.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <TriangleAlert aria-hidden="true" />
            <AlertTitle>Atenție</AlertTitle>
            <AlertDescription>Verifică datele înainte de a continua.</AlertDescription>
          </Alert>
          <Alert variant="error">
            <CircleAlert aria-hidden="true" />
            <AlertTitle>Eroare</AlertTitle>
            <AlertDescription>Nu am putut finaliza acțiunea.</AlertDescription>
          </Alert>
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Deschide dialogul</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Raportează anunțul</DialogTitle>
                  <DialogDescription>Exemplu de dialog cu focus management și închidere cu Escape.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Anulează</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button>Confirmă</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Meniu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Exemplu</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => toast("Ai ales: Editează")}>
                  <Pencil aria-hidden="true" />
                  Editează
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast("Ai ales: Setări")}>
                  <Settings aria-hidden="true" />
                  Setări
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onSelect={() => toast("Ai ales: Ieși")}>
                  <LogOut aria-hidden="true" />
                  Ieși
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="tonal" onClick={() => toast.success("Modificările au fost salvate (demo).")}>
              Afișează toast
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Treci cu mouse-ul</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltip accesibil și din tastatură</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </DsSection>

      <DsSection id="listing-card" title="ListingCard (date demonstrative)">
        <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {demoListings.map((l) => (
            <li key={l.id}>
              <ListingCard
                listing={l}
                now={NOW}
                isFavorite={favorites[l.id] ?? false}
                onFavoriteChange={(next) => setFavorites((f) => ({ ...f, [l.id]: next }))}
              />
            </li>
          ))}
        </ul>
      </DsSection>

      <DsSection id="seller-card" title="SellerCard (date demonstrative)">
        <div className="grid gap-4 md:grid-cols-2">
          <SellerCard name="[Demo] Ana Popescu" type="persoana" location="[Localitate demo]" />
          <SellerCard name="[Demo] Firmă Exemplu SRL" type="firma" location="[Localitate demo]" />
        </div>
      </DsSection>

      <DsSection id="search-bar" title="SearchBar">
        <SearchBar onSearch={(v) => setLastSearch(`${v.query}${v.location ? ` · ${v.location}` : ""}`)} />
        <p className="mt-3 type-label font-normal text-muted-foreground" data-testid="search-result" aria-live="polite">
          {lastSearch ? `Valori validate: ${lastSearch}` : "Trimite formularul pentru a vedea valorile validate."}
        </p>
      </DsSection>

      <DsSection id="stari" title="Stări">
        <div className="grid gap-6 lg:grid-cols-3">
          <EmptyState
            title="Niciun anunț încă"
            description="Când vor exista anunțuri în zona ta, le vei vedea aici."
            action={<Button variant="tonal">Resetează filtrele</Button>}
          />
          <ErrorState action={<Button variant="secondary">Încearcă din nou</Button>} />
          <LoadingState />
        </div>
        <div className="mt-6">
          <LoadingState variant="cards" label="Se încarcă anunțurile…" />
        </div>
      </DsSection>
    </div>
  );
}
