import { formatListingDate, formatPrice } from "@/lib/utils/format";

describe("format", () => {
  it("formatează prețuri cu punct la mii și moneda după", () => {
    expect(formatPrice(12900, "EUR")).toBe("12.900 €");
    expect(formatPrice(1950, "RON")).toBe("1.950 lei");
    expect(formatPrice(950, "RON")).toBe("950 lei");
  });

  it("formatează data relativ: Azi, Ieri, dată scurtă", () => {
    const now = new Date("2026-11-03T12:00:00Z");
    expect(formatListingDate(new Date("2026-11-03T12:20:00Z"), now)).toBe("Azi, 14:20");
    expect(formatListingDate(new Date("2026-11-02T08:00:00Z"), now)).toMatch(/^Ieri, 10:00$/);
    expect(formatListingDate(new Date("2026-10-20T08:00:00Z"), now)).toBe("20 oct.");
  });
});
