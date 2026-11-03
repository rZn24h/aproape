import { expect, test } from "@playwright/test";

test.describe("Design System (ENABLE_DEV_ROUTES=1)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dev/design-system");
  });

  test("este noindex", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Design System" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("dialogul se deschide și se închide cu Escape", async ({ page }) => {
    await page.getByRole("button", { name: "Deschide dialogul" }).click();
    const dialog = page.getByRole("dialog", { name: "Raportează anunțul" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("switch, checkbox, select și favorite sunt interactive", async ({ page }) => {
    const sw = page.getByRole("switch", { name: /Notificări/ });
    await expect(sw).toHaveAttribute("aria-checked", "true");
    await sw.click();
    await expect(sw).toHaveAttribute("aria-checked", "false");

    await page.getByRole("checkbox", { name: /Checkbox \(nebifat\)/ }).click();
    await expect(page.getByText("Checkbox (bifat)")).toBeVisible();

    await page.getByRole("combobox", { name: "Sortare" }).click();
    await page.getByRole("option", { name: "Preț crescător" }).click();
    await expect(page.getByTestId("sort-value")).toHaveText("Selectat: pret-asc");

    const fav = page.getByRole("button", { name: /Adaugă „\[Demo\] Bicicletă/ });
    await fav.click();
    await expect(page.getByRole("button", { name: /Elimină „\[Demo\] Bicicletă/ })).toHaveAttribute("aria-pressed", "true");
  });

  test("toast-ul apare", async ({ page }) => {
    await page.getByRole("button", { name: "Afișează toast" }).click();
    await expect(page.getByText("Modificările au fost salvate (demo).")).toBeVisible();
  });

  test("formularul demonstrativ afișează erori și apoi succes", async ({ page }) => {
    const form = page.getByRole("form", { name: "Formular demonstrativ" });
    await form.getByRole("button", { name: "Trimite" }).click();
    await expect(form.getByText("Introdu numele.")).toBeVisible();
    await expect(form.getByText("Introdu adresa de e-mail.")).toBeVisible();
    await expect(form.getByText("Alege o categorie.")).toBeVisible();
    await expect(form.getByText("Trebuie să accepți termenii pentru a continua.")).toBeVisible();
    await expect(form.getByLabel("Nume")).toBeFocused();
    await expect(form.getByLabel("Nume")).toHaveAttribute("aria-invalid", "true");

    await form.getByLabel("Nume").fill("Ana");
    await form.getByLabel("E-mail").fill("ana@exemplu.ro");
    await form.getByRole("combobox", { name: "Categorie" }).click();
    await page.getByRole("option", { name: "Diverse" }).click();
    await form.getByLabel("Mesaj").fill("Un mesaj demonstrativ suficient de lung.");
    await form.getByRole("checkbox", { name: /Accept termenii/ }).click();
    await form.getByRole("button", { name: "Trimite" }).click();
    await expect(form.getByText("Formular valid")).toBeVisible();
  });
});
