import { areDevRoutesEnabled } from "@/lib/env";

describe("areDevRoutesEnabled", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("este dezactivat în production fără flag", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ENABLE_DEV_ROUTES", "");
    expect(areDevRoutesEnabled()).toBe(false);
  });

  it("este activ în development", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(areDevRoutesEnabled()).toBe(true);
  });

  it("poate fi activat explicit pentru teste", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ENABLE_DEV_ROUTES", "1");
    expect(areDevRoutesEnabled()).toBe(true);
  });
});
