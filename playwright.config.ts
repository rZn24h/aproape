import { defineConfig, devices } from "@playwright/test";

/**
 * Testele rulează pe build-ul de producție (`next build` trebuie rulat înainte).
 * - :3100 — production standard (ruta /dev/design-system trebuie să dea 404)
 * - :3101 — production cu ENABLE_DEV_ROUTES=1 (testarea paginii Design System)
 */
const PROD = "http://127.0.0.1:3100";
const DEV_ROUTES = "http://127.0.0.1:3101";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: { trace: "retain-on-failure" },
  projects: [
    {
      name: "desktop",
      testIgnore: /design-system/,
      use: { ...devices["Desktop Chrome"], baseURL: PROD },
    },
    {
      name: "mobil",
      testIgnore: /design-system/,
      use: { ...devices["Pixel 7"], baseURL: PROD },
    },
    {
      name: "design-system",
      testMatch: /design-system/,
      use: { ...devices["Desktop Chrome"], baseURL: DEV_ROUTES },
    },
  ],
  webServer: [
    {
      command: "npx next start -p 3100 -H 127.0.0.1",
      url: PROD,
      reuseExistingServer: !process.env.CI,
      env: { ENABLE_DEV_ROUTES: "" },
    },
    {
      command: "npx next start -p 3101 -H 127.0.0.1",
      url: DEV_ROUTES,
      reuseExistingServer: !process.env.CI,
      env: { ENABLE_DEV_ROUTES: "1" },
    },
  ],
});
