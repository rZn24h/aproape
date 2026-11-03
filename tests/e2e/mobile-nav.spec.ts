import { expect, test } from "@playwright/test";

test.describe("mobil", () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!isMobile, "Doar pe viewport mobil");
  });

  test("meniul mobil se deschide și se închide", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Deschide meniul" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Auto & Moto/ })).toHaveAttribute("href", "/categorii/auto-moto");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Deschide meniul" }).click();
    await page.getByRole("button", { name: "Închide meniul" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page.getByRole("button", { name: "Deschide meniul" })).toBeFocused();
  });

  test("bara de navigare de jos este vizibilă și nu acoperă subsolul", async ({ page }) => {
    await page.goto("/");
    const tabs = page.getByRole("navigation", { name: "Navigare rapidă" });
    await expect(tabs).toBeVisible();
    await expect(tabs.getByRole("link", { name: "Acasă" })).toHaveAttribute("aria-current", "page");
    await expect(tabs.getByText("Publică")).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footerBottom = await page.getByRole("contentinfo").evaluate((el) => el.getBoundingClientRect().bottom);
    const tabsTop = await tabs.evaluate((el) => el.getBoundingClientRect().top);
    expect(footerBottom).toBeLessThanOrEqual(tabsTop + 1);
  });
});
