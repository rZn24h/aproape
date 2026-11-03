import { expect, test } from "@playwright/test";

test.describe("homepage M01", () => {
  test("metadata SEO și un singur H1", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("aproape24.ro — Anunțuri locale aproape de tine");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Descoperă produse, servicii și oferte de la persoane și firme din apropierea ta/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Anunțuri locale aproape de tine/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ro");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tot ce cauți, mai aproape de tine.");
  });

  test("secțiunile apar în ordinea stabilită", async ({ page }) => {
    await page.goto("/");
    const h2 = await page.locator("main h2").allTextContents();
    expect(h2).toEqual([
      "Categorii principale",
      "Anunțuri promovate",
      "Anunțuri recente din apropiere",
      "Descoperă firme din apropiere",
      "Ai ceva de vândut?",
    ]);
  });

  test("secțiunile fără date afișează stări corecte, fără anunțuri inventate", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Anunțurile promovate vor apărea aici")).toBeVisible();
    await expect(page.getByText("Anunțurile recente vor apărea aici")).toBeVisible();
    await expect(page.getByText("Firmele locale vor apărea aici")).toBeVisible();
    await expect(page.locator("main article")).toHaveCount(0);
  });

  test("header și footer sunt vizibile", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("banner").getByRole("link", { name: "aproape24.ro — pagina principală" })).toBeVisible();
    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(`© ${new Date().getFullYear()} aproape24.ro`);
    await expect(footer.getByRole("link", { name: /ANPC/ })).toHaveAttribute("href", "https://anpc.ro");
  });

  test("căutarea validează, păstrează valorile și nu simulează rezultate", async ({ page }) => {
    await page.goto("/");
    const search = page.getByRole("search", { name: "Caută anunțuri" });
    await search.getByRole("button", { name: "Caută" }).click();
    await expect(search.getByRole("alert")).toHaveText("Scrie cel puțin 2 caractere.");
    await expect(search.getByLabel("Ce cauți?")).toBeFocused();

    await search.getByLabel("Ce cauți?").fill("frigider");
    await search.getByLabel("Unde?").fill("Dorohoi");
    await search.getByRole("button", { name: "Caută" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Căutarea va fi disponibilă în curând" })).toContainText(
      "Ai căutat „frigider” în Dorohoi.",
    );
    await expect(search.getByLabel("Ce cauți?")).toHaveValue("frigider");
    await expect(page).toHaveURL(/\/$/);
  });

  test("categoriile duc la pagini reale de categorie", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("region", { name: "Categorii principale" }).getByRole("link", { name: "Imobiliare" }).click();
    await expect(page).toHaveURL(/\/categorii\/imobiliare$/);
    await expect(page.getByRole("heading", { level: 1, name: "Imobiliare" })).toBeVisible();
    await expect(page.getByText("Apartamente de vânzare")).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("o categorie inexistentă răspunde 404", async ({ page }) => {
    const response = await page.goto("/categorii/nu-exista");
    expect(response?.status()).toBe(404);
  });

  test("butoanele modulelor neimplementate sunt dezactivate", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("region", { name: "Ai ceva de vândut?" }).getByRole("button", { name: /Publică un anunț/ })).toBeDisabled();
  });

  test("fără overflow orizontal", async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `overflow la ${width}px`).toBeLessThanOrEqual(0);
    }
  });

  test("navigare din tastatură: primul Tab ajunge la „Sari la conținut”", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Sari la conținut" })).toBeFocused();
  });

  test("ruta Design System este 404 în production", async ({ page }) => {
    const response = await page.goto("/dev/design-system");
    expect(response?.status()).toBe(404);
  });

  test("robots.txt exclude /dev/", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(await res.text()).toContain("Disallow: /dev/");
  });
});

test.describe("antet desktop", () => {
  test("bara de categorii și căutarea rapidă", async ({ page, isMobile }) => {
    test.skip(isMobile, "Doar desktop");
    await page.goto("/");
    const cats = page.getByRole("navigation", { name: "Categorii" });
    await expect(cats.getByRole("link", { name: "Electronice" })).toHaveAttribute("href", "/categorii/electronice-it");
    const quick = page.getByRole("search", { name: "Căutare rapidă" });
    await quick.getByLabel("Ce cauți?").fill("telefon");
    await quick.getByRole("button", { name: "Caută" }).click();
    await expect(page.getByText("Căutarea va fi disponibilă în curând.").first()).toBeVisible();
  });
});
