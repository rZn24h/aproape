# aproape24.ro

> **„Mai aproape de ce cauți.”**

Marketplace românesc de anunțuri locale: persoane fizice și firme publică anunțuri, găsesc produse și servicii în apropiere și comunică între ele.

Stare: **Etapa 1** (fundația tehnică și Design System-ul) și **Etapa 2 — M01 Homepage** sunt implementate. Celelalte module de business (M02–M12) nu sunt încă implementate; vezi [Limitări actuale](#10-limitări-actuale).

Designul de referință este canvasul Claude Design „aproape24.ro — Homepage” (planșele Acasă, Antet, Subsol, Navigare mobilă), construit pe design system-ul „aproape24.ro”.

---

## 1. Ce conține acum

| Implementat | Descriere |
|---|---|
| Next.js App Router + TypeScript strict | `src/` cu alias `@/*`, Server Components implicit |
| Design tokens | `src/app/globals.css` — paleta oficială, tipografie, spațiere, raze, umbre, focus |
| Componente UI (shadcn/ui + Radix) | Button, Input, Textarea, Label, Checkbox, RadioGroup, Select, Switch, Card, Badge, Separator, Skeleton, Avatar, Alert, Dialog, DropdownMenu, Tooltip, Toast (Sonner), Sheet, Form |
| Componente marketplace | BrandLogo, ListingCard, SellerCard, SearchBar, EmptyState / ErrorState / LoadingState |
| Layout global | Antet cu căutare rapidă și bară de categorii, meniu mobil (Sheet), bară de navigare jos pe mobil, subsol pe 4 coloane, link „Sari la conținut” |
| M01 — Homepage `/` | Hero cu căutare, 10 categorii, anunțuri promovate, anunțuri recente, firme locale, CTA „Ai ceva de vândut?” — fiecare secțiune de date cu stări loading / gol / indisponibil / eroare |
| Pagini de categorie `/categorii/<slug>` | Destinație stabilă pentru linkuri: titlu, subcategorii, stare goală; `noindex` până există anunțuri |
| Pagina `/dev/design-system` | Vitrina componentelor; 404 în producție, `noindex` |
| Formulare | React Hook Form + Valibot (`@hookform/resolvers/valibot`) |
| SEO de bază | `lang="ro"`, Metadata API, Open Graph fără imagini, `robots.txt`, `sitemap.xml`, icon |
| Cloudflare | OpenNext adapter + Wrangler, verificat local în workerd |
| Teste | Vitest + RTL (40 teste), Playwright (32 teste E2E pe desktop + mobil) |

## 2. Stack și versiuni instalate

| Pachet | Versiune |
|---|---|
| Next.js | 16.4.4 |
| React / React DOM | 19.3.1 |
| TypeScript | 6.0.3 |
| Tailwind CSS | 4.3.4 (`@tailwindcss/postcss`) |
| shadcn/ui | componente scrise manual după registry-ul `new-york` (CLI-ul nu a avut acces la rețea), `components.json` configurat |
| Radix UI | `radix-ui` 1.8.1 (pachetul unificat) |
| Lucide React | 1.67.0 |
| React Hook Form | 7.91.0 |
| Valibot | 1.5.0 |
| @hookform/resolvers | 7.0.1 (doar resolverul `valibot`) |
| Sonner | 2.0.8 |
| @opennextjs/cloudflare | 1.20.15 |
| Wrangler | 4.157.0 |
| Vitest | 5.1.0 |
| Playwright | 1.63.0 |
| ESLint | 9.39.5 + `eslint-config-next` 16.4.4 |

Versiunile sunt fixate exact în `package.json`; `package-lock.json` este sursa de adevăr.

**De ce nu TypeScript 7 / ESLint 10:** TypeScript 7 (portarea nativă) nu este suportat de `typescript-eslint` (`<6.1.0`), iar `eslint-plugin-react` din `eslint-config-next` nu declară suport pentru ESLint 10.

## 3. Cerințe

- **Node.js ≥ 22.12** (vezi `.nvmrc`)
- **npm 10** — singurul package manager folosit; nu adăuga alte lockfile-uri.

## 4. Dezvoltare locală

```bash
npm install
```

```bash
npm run dev
```

- Aplicația: http://localhost:3000
- Design System: http://localhost:3000/dev/design-system (doar în development)

Variabile de mediu: vezi `.env.example`. Niciuna nu este obligatorie în această etapă.

## 5. Testare și verificări

| Comandă | Ce face |
|---|---|
| `npm run typecheck` | `tsc --noEmit` (strict) |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript; Zod interzis prin regulă) |
| `npm test` | Vitest + React Testing Library |
| `npm run test:watch` | Vitest în mod watch |
| `npm run build` | Build de producție Next.js |
| `npm run test:e2e` | Playwright pe build-ul de producție (rulează `npm run build` înainte) |
| `npm run check` | typecheck + lint + test + build |

Playwright pornește automat două servere `next start` din același build: `:3100` (producție normală — verifică 404 pe `/dev/design-system`) și `:3101` (cu `ENABLE_DEV_ROUTES=1` — testează componentele interactive).

Prima rulare Playwright pe o mașină nouă: `npx playwright install chromium`.

## 6. Cloudflare

| Comandă | Ce face |
|---|---|
| `npm run cf:build` | `opennextjs-cloudflare build` → `.open-next/worker.js` |
| `npm run cf:preview` | build + preview local în workerd (Wrangler) |
| `npm run cf:typegen` | generează `cloudflare-env.d.ts` din `wrangler.jsonc` |

Nu există script de deploy: deployment-ul necesită aprobare și resurse create explicit. Detalii în [docs/architecture.md](docs/architecture.md#7-runtime-cloudflare).

## 7. Structura directoarelor

```text
src/
  app/                      rute (App Router)
    categorii/[slug]/       pagină minimă de categorie (M02 o va extinde)
    dev/design-system/      vitrina Design System (internă, 404 în producție)
    globals.css             design tokens + tema Tailwind/shadcn
    layout.tsx              <html lang="ro">, fonturi, header, footer, Toaster
    page.tsx                homepage M01 (compune secțiunile din features/home)
    not-found.tsx, error.tsx
    robots.ts, sitemap.ts, icon.svg
  components/
    ui/                     primitive Design System (shadcn/ui + Radix)
    layout/                 SiteHeader, SiteFooter, MobileNav, MobileTabBar, PublishButton
    shared/                 componente comune (ListingCard, SellerCard, BusinessCard, SearchBar, SiteSearch, stări)
  features/
    home/components/        secțiunile homepage-ului
    listings/               contract ListingsSource + serviciu server-side
    businesses/             contract BusinessesSource + serviciu server-side
  config/                   site, features (module disponibile), navigație, categorii, tokenuri TS
  lib/
    utils.ts                cn()
    utils/format.ts         formatare preț și dată (ro-RO)
    validations/            scheme Valibot
    search/url.ts           construirea URL-ului /cautare?q=…&loc=…
    data/section-result.ts  rezultatul ok / unavailable / error al unei secțiuni
    env.ts                  guard-uri de mediu (server-only)
  types/                    tipuri comune (ListingSummary)
tests/
  unit/                     Vitest + RTL
  e2e/                      Playwright
docs/architecture.md
```

`hooks/` și `providers/` vor fi create odată cu primul modul care are nevoie de ele (fără directoare goale).

## 8. Design tokens

Definite o singură dată în `src/app/globals.css`, în trei straturi:

1. **Brand** (`--a24-*`): paleta oficială — `primary-700 #137F70`, `primary-500 #18A88F`, `mint-100 #E8F7F2`, `ink-900 #172B35`, `canvas #F6F8F8`, `highlight #F4B544` — plus derivate cu contrast verificat (ink-700, ink-500, line, line-strong, danger etc.).
2. **Semantice** compatibile shadcn/ui: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, plus `--highlight`, `--dark`, `--brand-accent`.
3. **Tailwind** prin `@theme inline`: `bg-primary`, `text-muted-foreground`, `bg-highlight`, `rounded-lg`, `shadow-md`…

Utilitare proprii:

| Utilitar | Valoare |
|---|---|
| `type-h1` / `type-h2` / `type-h3` | Plus Jakarta Sans; 32→48 / 26→32 / 20→22 px (prag 768px) |
| `type-body` / `type-secondary` / `type-label` / `type-caption` | Inter 16 / 14 / 13 / 12 px |
| `type-price` | Inter Bold 21 → 26 px |
| `container-content` | max 1280px + gutter 16px (mobil) / 32px (≥1024px) |
| `focus-ring` | 2px `primary-700` cu offset alb de 2px |

Spațiere: scara Tailwind (`1`=4px, `2`=8px, `3`=12px, `4`=16px, `6`=24px, `8`=32px, `12`=48px, `16`=64px). Raze: `rounded-sm` 8, `rounded-md` 12, `rounded-lg` 16, `rounded-xl` 20, `rounded-2xl` 24.

Tema implicită este light. Pentru un dark mode ulterior se redefinesc doar tokenurile semantice sub un selector (ex. `.dark`).

## 9. Convenții pentru componente

- Server Component implicit; `"use client"` doar pentru stare, evenimente sau Radix interactiv.
- Clasele se compun cu `cn()`; variantele cu `class-variance-authority`.
- Fără HEX în componente — doar tokenuri semantice.
- Toate textele vizibile sunt în română, cu diacritice corecte (ș, ț cu virgulă).
- Iconurile decorative au `aria-hidden="true"`; butoanele doar cu icon au `aria-label`.
- Erorile au icon + text, nu doar culoare.
- Funcționalitățile neimplementate apar ca acțiuni dezactivate etichetate „În curând”, nu ca linkuri spre 404.
- Badge-ul „Promovat” apare doar pentru `isPromoted: true`; nu există badge „Verificat”.
- Validarea se face exclusiv cu Valibot (Zod este interzis prin ESLint).

## 10. Limitări actuale

- Nu există autentificare, bază de date, upload, mesagerie, plăți sau căutare reală.
- Secțiunile de anunțuri și firme de pe homepage afișează starea „vor apărea aici”: sursele de date (`getListingsSource`, `getBusinessesSource`) returnează `null` până la conectarea D1.
- Căutarea validează și construiește URL-ul `/cautare?q=…&loc=…`, dar cât timp `features.search` este `false` doar anunță că rezultatele vin în curând și păstrează valorile (M03). Localitatea este text liber: nu există încă o listă reală de localități și nici selector de rază.
- Butoanele Favorite / Mesaje / Cont / Publică anunț sunt dezactivate; se activează din `src/config/features.ts` odată cu modulele lor.
- Paginile de categorie nu listează anunțuri (M02).
- Nu există imagini reale de anunțuri; `next/image` pe Cloudflare va necesita binding-ul `IMAGES` (de activat în M04/M05).
- Cache-ul incremental OpenNext (R2) nu este configurat (nu există încă pagini ISR).
- Deployment-ul Cloudflare nu a fost efectuat; runtime-ul a fost verificat doar local (workerd prin Wrangler).
- `npm audit` raportează vulnerabilități moderate/ridicate în dependențe de dezvoltare (lanțul `minimatch` din pluginurile ESLint); nu afectează bundle-ul de producție.
- `zod` apare în `node_modules` doar ca dependență tranzitivă a `eslint-plugin-react-hooks` (tooling de lint); nu este folosit în cod.

## 11. Pașii următori

1. **Backend de date**: D1 + Drizzle, schema pentru categorii, anunțuri și firme (după aprobarea modelului de date). Implementarea `ListingsSource` și `BusinessesSource` conectează automat homepage-ul.
2. **M02 — Categorii** și **M03 — Căutare** pe aceeași schemă.
3. M06 Autentificare → M05 Publicare.
