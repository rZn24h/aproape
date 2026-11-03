import { expect, test } from "@playwright/test";

test("meniul mobil se deschide și se închide", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Doar pe viewport mobil");
  await page.goto("/");
  await page.getByRole("button", { name: "Deschide meniul" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("navigation", { name: "Navigare mobilă" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  await page.getByRole("button", { name: "Deschide meniul" }).click();
  await page.getByRole("button", { name: "Închide meniul" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("button", { name: "Deschide meniul" })).toBeFocused();
});
