import { buildSearchUrl } from "@/lib/search/url";

describe("buildSearchUrl", () => {
  it("construiește parametrii q și loc codificați", () => {
    expect(buildSearchUrl({ query: "mașină de spălat", location: "Botoșani" })).toBe(
      "/cautare?q=ma%C8%99in%C4%83+de+sp%C4%83lat&loc=Boto%C8%99ani",
    );
  });

  it("omite localitatea goală", () => {
    expect(buildSearchUrl({ query: "frigider", location: "" })).toBe("/cautare?q=frigider");
  });
});
