import { render, screen } from "@testing-library/react";

import { BrandLogo } from "@/components/shared/brand-logo";

describe("BrandLogo", () => {
  it("are nume accesibil și „24” evidențiat", () => {
    render(<BrandLogo />);
    const logo = screen.getByRole("img", { name: "aproape24.ro" });
    expect(logo).toHaveTextContent("aproape24.ro");
    expect(screen.getByText("24")).toHaveClass("text-brand-accent");
  });

  it("varianta dark folosește accentul pentru fundal întunecat", () => {
    render(<BrandLogo variant="dark" />);
    expect(screen.getByText("24")).toHaveClass("text-brand-accent-on-dark");
  });

  it("devine link către pagina principală când primește href", () => {
    render(<BrandLogo href="/" />);
    const link = screen.getByRole("link", { name: "aproape24.ro — pagina principală" });
    expect(link).toHaveAttribute("href", "/");
  });
});
