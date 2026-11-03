import { getLocalBusinesses } from "@/features/businesses/server/businesses.service";
import { getPromotedListings, getRecentListings } from "@/features/listings/server/listings.service";
import type { ListingsSource } from "@/features/listings/types";
import type { ListingSummary } from "@/types/listing";

const listing = (id: string, isPromoted?: boolean): ListingSummary => ({
  id,
  href: `/anunt/${id}`,
  title: `Anunț ${id}`,
  location: "Botoșani",
  publishedAt: new Date("2026-11-01T10:00:00Z"),
  isPromoted,
});

describe("servicii homepage", () => {
  it("fără sursă de date returnează `unavailable` (nu date simulate)", async () => {
    expect(await getPromotedListings()).toEqual({ status: "unavailable" });
    expect(await getRecentListings()).toEqual({ status: "unavailable" });
    expect(await getLocalBusinesses()).toEqual({ status: "unavailable" });
  });

  it("promovate: păstrează doar anunțurile marcate explicit și limitează rezultatul", async () => {
    const source: ListingsSource = {
      promoted: async () => [listing("1", true), listing("2"), listing("3", true), listing("4", true)],
      recent: async () => [],
    };
    const result = await getPromotedListings(2, source);
    expect(result).toEqual({ status: "ok", items: [listing("1", true), listing("3", true)] });
  });

  it("recente: transmite limita și o aplică", async () => {
    const recent = vi.fn(async () => [listing("1"), listing("2"), listing("3")]);
    const result = await getRecentListings({ limit: 2, location: "Dorohoi" }, { promoted: async () => [], recent });
    expect(recent).toHaveBeenCalledWith({ limit: 2, location: "Dorohoi" });
    expect(result.status === "ok" && result.items.map((l) => l.id)).toEqual(["1", "2"]);
  });

  it("o eroare a sursei devine `error`, fără a arunca mai departe", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await getRecentListings(
      { limit: 4 },
      { promoted: async () => [], recent: async () => Promise.reject(new Error("D1 indisponibil")) },
    );
    expect(result).toEqual({ status: "error" });
    spy.mockRestore();
  });
});
