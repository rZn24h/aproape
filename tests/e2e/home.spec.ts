import { expect, test } from "@playwright/test";

test.describe("pagina principală", () => {
  test("se încarcă cu identitatea brandului", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/aproape24\.ro/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ro");
    await expect(page.getByRole("heading", { level: 1, name: "Mai aproape de ce cauți." })).toBeVisible();
    await expect(page.getByRole("search", { name: "Caută anunțuri" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Categorii principale" })).toBeVisible();
    await expect(page.getByText("Locuri de muncă")).toBeVisible();
  });

  test("header și footer sunt vizibile", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("banner").getByRole("link", { name: "aproape24.ro — pagina principală" })).toBeVisible();
    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(`© ${new Date().getFullYear()} aproape24.ro`);
  });

  test("căutarea demonstrativă validează și nu pretinde rezultate", async ({ page }) => {
    await page.goto("/");
    const search = page.getByRole("search", { name: "Caută anunțuri" });
    await search.getByRole("button", { name: "Caută" }).click();
    await expect(search.getByRole("alert")).toHaveText("Scrie cel puțin 2 caractere.");
    await search.getByLabel("Ce cauți?").fill("frigider");
    await search.getByRole("button", { name: "Caută" }).click();
    await expect(page.getByText("Căutarea va fi disponibilă în curând")).toBeVisible();
  });

  test("fără overflow orizontal", async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `overflow la ${width}px`).toBeLessThanOrEqual(0);
    }
  });

  test("ruta Design System este 404 în production", async ({ page }) => {
    const response = await page.goto("/dev/design-system");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Pagina nu a fost găsită" })).toBeVisible();
  });

  test("robots.txt exclude /dev/", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(await res.text()).toContain("Disallow: /dev/");
  });
});
