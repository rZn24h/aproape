# Arhitectura aproape24.ro

Documentul separă **ce există acum** (Etapa 1) de **ce este planificat**. Orice secțiune marcată „Planificat” nu are încă cod.

## 1. Straturi și separarea responsabilităților

```text
app/ (rute, layout, metadata)            ← compune pagini; fără logică de business
  └─ features/<modul>/components         ← UI specific modulului        (planificat)
  └─ components/{ui,layout,shared}        ← UI reutilizabil, doar props  (există)
features/<modul>/server/                  ← servicii de business          (planificat)
  └─ lib/db, lib/storage                  ← acces la date (D1, R2)        (planificat)
lib/validations/                          ← scheme Valibot partajate client/server (există)
```

Reguli:

- Componentele din `components/` sunt **prezentaționale**: primesc date prin props și emit evenimente (`onSearch`, `onFavoriteChange`). Nu fac fetch și nu cunosc baza de date.
- Logica de business stă în servicii server-side (`features/<modul>/server/*.ts`, cu `import "server-only"`), apelate din Server Components, Server Actions sau Route Handlers.
- Accesul la date (Drizzle/D1, R2) este izolat în `lib/db` și `lib/storage`; serviciile nu construiesc SQL direct în componente.
- Schemele Valibot sunt aceleași pe client (UX) și pe server (securitate). Validarea server-side este obligatorie; cea client-side este doar ajutor.

### Implementat în M01

- `src/features/listings/types.ts` — contractul `ListingsSource` (`promoted`, `recent`). Implementarea D1 trebuie să returneze doar anunțuri active, publice, aprobate și neexpirate.
- `src/features/listings/server/listings.service.ts` — `getPromotedListings`, `getRecentListings`: limitează rezultatele și filtrează suplimentar `isPromoted === true`.
- `src/features/businesses/` — `BusinessSummary`, `BusinessesSource`, `getLocalBusinesses`.
- `src/lib/data/section-result.ts` — `SectionResult<T>`: `ok` | `unavailable` (sursa nu e conectată) | `error` (citire eșuată; detaliile se loghează doar pe server).
- `src/features/home/components/data-sections.tsx` — Server Components async; fiecare secțiune e în propriul `<Suspense>` cu skeleton, iar o eroare rămâne locală secțiunii.
- `src/config/features.ts` — disponibilitatea modulelor. Linkurile și butoanele spre module neimplementate sunt dezactivate până când flag-ul devine `true`.

Pentru a conecta datele reale este suficient ca `getListingsSource()` / `getBusinessesSource()` să returneze o implementare bazată pe Drizzle; componentele nu se schimbă.

## 2. Organizarea modulelor

Fiecare modul primește un director în `src/features/` **doar când începe implementarea lui** (există deja `home`, `listings`, `businesses`):

```text
src/features/listings/
  components/     ListingGallery, ListingForm…
  server/         listings.service.ts, listings.repo.ts
  validations.ts
  types.ts
```

Rutele rămân în `src/app/` și importă din `features/`. Un modul nu importă din interiorul altui modul; codul comun urcă în `components/shared` sau `lib/`.

## 3. Convenții TypeScript

- `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`.
- Interzise: `any`, `@ts-ignore` (impuse prin ESLint).
- Tipurile de date provin din surse unice: `v.InferOutput<typeof schema>` pentru input validat; tipurile Drizzle (`$inferSelect`) pentru rânduri din DB. Tipurile de prezentare (ex. `ListingSummary`) sunt separate de cele de stocare.
- Variabilele de mediu se citesc doar în module `server-only` (ex. `lib/env.ts`). Nicio valoare sensibilă cu prefix `NEXT_PUBLIC_`.

## 4. Principii API (planificat)

- Mutațiile din UI propriu → **Server Actions** (validare Valibot + autorizare în serviciu).
- **Route Handlers** (`app/api/**/route.ts`) doar când e nevoie de un endpoint HTTP real: webhook-uri de plată, upload direct, integrări externe.
- Răspunsuri JSON consistente: `{ data }` sau `{ error: { code, message } }`, mesaje pentru utilizator în română.
- Autorizarea se face în serviciu, nu în UI; fiecare endpoint verifică sesiunea și rolul (vizitator, persoană fizică, firmă, moderator, administrator).
- Nu se creează endpointuri fără un caz de utilizare real.

## 5. Strategia D1 / Drizzle (planificat)

1. Instalare `drizzle-orm` + `drizzle-kit`; schema în `src/lib/db/schema/*.ts`.
2. Migrații generate cu `drizzle-kit generate` în `drizzle/migrations`, aplicate local cu `wrangler d1 migrations apply aproape24 --local`.
3. Binding `DB` în `wrangler.jsonc` (comentat acum); `database_id` se adaugă după crearea bazei, cu aprobare.
4. Acces din cod server:

   ```ts
   import { getCloudflareContext } from "@opennextjs/cloudflare";
   import { drizzle } from "drizzle-orm/d1";

   export function getDb() {
     const { env } = getCloudflareContext();
     return drizzle(env.DB);
   }
   ```

5. În `next dev`, `initOpenNextCloudflareForDev()` (deja activ în `next.config.ts`) expune binding-urile locale (Miniflare), deci același cod rulează local.
6. Prima schemă: utilizatori, categorii, anunțuri, firme — **după** aprobarea modelului de date. Acum nu există tabele sau migrații. Slug-urile din `src/config/categories.ts` sunt stabile și trebuie păstrate la migrarea categoriilor în D1.

## 6. Strategia R2 (planificat)

- Bucket `aproape24-media`, binding `MEDIA`, privat.
- Upload: Route Handler care validează tipul/dimensiunea, scrie în R2 sub chei neghicibile (`listings/<listingId>/<uuid>.webp`), salvează doar cheia în D1.
- Afișare: prin Cloudflare Images (binding `IMAGES`) pentru redimensionare; `next/image` cu loader OpenNext.
- Ștergerea fișierelor la ștergerea anunțului se face asincron (Cloudflare Queues, când e justificat).

## 7. Runtime Cloudflare

**Decizie: OpenNext pentru Cloudflare (`@opennextjs/cloudflare` 1.20.15).**

Alternativa evaluată: **vinext** (1.4.2) — reimplementează CLI-ul Next.js peste Vite. Cloudflare îl recomandă pentru aplicații noi, dar este încă beta, depinde de `@vitejs/plugin-rsc` 0.5.x și nu rulează compilatorul oficial Next.js.

Motivele alegerii OpenNext:

- Folosește build-ul oficial `next build`: App Router, React Server Components, SSR, Route Handlers, Metadata API și `next/font` se comportă identic local și în Workers.
- Versiune stabilă (1.x) care declară suport pentru Next `>=16.4.1`.
- Acces la binding-uri (D1, R2, Queues) prin `getCloudflareContext()`, inclusiv în `next dev`.
- Migrarea ulterioară spre vinext rămâne posibilă: codul aplicației nu depinde de adaptor.

Configurație:

- `wrangler.jsonc`: `main: .open-next/worker.js`, assets `.open-next/assets`, `compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"]`. Binding-urile D1/R2/Images sunt comentate până la aprobare.
- `open-next.config.ts`: fără cache incremental remote (fără R2) în această etapă.

Verificat în Etapa 1 (local, fără cont Cloudflare):

- `opennextjs-cloudflare build` reușește și produce worker-ul.
- `wrangler dev` (workerd local): `/` → 200, `/dev/design-system` → 404, `/robots.txt` → 200, rută inexistentă → 404, CSS și fonturi servite.
- `wrangler types` generează `cloudflare-env.d.ts`.

Neverificat: deployment real, limitele de dimensiune ale worker-ului pe planul ales, Cloudflare Images, D1/R2 remote. Documentația oficială Cloudflare/OpenNext nu a fost accesibilă din mediul de lucru (rețea restricționată); decizia s-a bazat pe metadatele pachetelor și pe teste locale. Se recomandă reverificarea înainte de primul deployment.

Riscuri: `next/image` fără binding `IMAGES` nu optimizează imaginile pe Workers; API-urile Node.js incompatibile trebuie evitate în codul server (se folosesc `fetch`, Web Crypto, `nodejs_compat` doar unde e nevoie).

## 8. Autentificare (planificat, M06)

- Nu există autentificare și nici simulare a ei.
- Direcție: sesiuni server-side cu cookie `HttpOnly`, `Secure`, `SameSite=Lax`, stocate în D1; parole cu hash compatibil Workers (Web Crypto / Argon2 WASM) sau login prin e-mail (magic link).
- Turnstile pe formularele de înregistrare și autentificare.
- Roluri: `persoana`, `firma`, `moderator`, `admin`; verificate în servicii, nu în UI.
- Alegerea concretă (bibliotecă vs. implementare proprie) necesită aprobare la începutul M06.

## 9. Securitate (în vigoare)

- Fără secrete în repository; `.env*`, `.dev.vars` ignorate.
- `/dev/*` blocat server-side (`notFound()` dacă `NODE_ENV !== "development"` și `ENABLE_DEV_ROUTES !== "1"`), `noindex` și `Disallow` în `robots.txt`.
- `poweredByHeader: false`.
