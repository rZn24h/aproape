import { render, screen, within } from "@testing-library/react";

import { BusinessesSectionView } from "@/features/home/components/businesses-section";
import { CategoryGrid } from "@/features/home/components/category-grid";
import { ListingsSectionView } from "@/features/home/components/listings-section";
import { PublishCta } from "@/features/home/components/publish-cta";
import type { ListingSummary } from "@/types/listing";

const now = new Date("2026-11-03T12:00:00Z");
const promoted: ListingSummary = {
  id: "p1",
  href: "/anunt/p1",
  title: "Bicicletă de oraș",
  price: { amount: 1250, currency: "RON" },
  location: "Botoșani",
  publishedAt: new Date("2026-11-03T08:00:00Z"),
  isPromoted: true,
};

describe("secțiunile homepage", () => {
  it("categoriile sunt 10 linkuri cu slug-uri stabile", () => {
    render(<CategoryGrid />);
    const section = screen.getByRole("region", { name: "Categorii principale" });
    const links = within(section).getAllByRole("link");
    expect(links).toHaveLength(10);
    expect(within(section).getByRole("link", { name: "Auto & Moto" })).toHaveAttribute("href", "/categorii/auto-moto");
    expect(within(section).getByRole("link", { name: "Locuri de muncă" })).toHaveAttribute("href", "/categorii/locuri-de-munca");
  });

  it("anunțuri: starea indisponibilă nu afișează carduri", () => {
    render(<ListingsSectionView kind="promoted" result={{ status: "unavailable" }} />);
    expect(screen.getByRole("heading", { level: 2, name: "Anunțuri promovate" })).toBeInTheDocument();
    expect(screen.getByText("Anunțurile promovate vor apărea aici")).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("anunțuri: lista goală are mesaj propriu", () => {
    render(<ListingsSectionView kind="recent" result={{ status: "ok", items: [] }} />);
    expect(screen.getByText("Nu există anunțuri recente")).toBeInTheDocument();
  });

  it("anunțuri: eroarea afișează un mesaj generic", () => {
    render(<ListingsSectionView kind="recent" result={{ status: "error" }} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Nu am putut încărca anunțurile recente");
  });

  it("anunțuri: succes randează ListingCard cu badge „Promovat”, fără buton favorite", () => {
    render(<ListingsSectionView kind="promoted" result={{ status: "ok", items: [promoted] }} now={now} />);
    expect(screen.getByRole("link", { name: "Bicicletă de oraș" })).toHaveAttribute("href", "/anunt/p1");
    expect(screen.getByText("Promovat")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /favorite/ })).not.toBeInTheDocument();
  });

  it("firme: indisponibil și succes", () => {
    const { rerender } = render(<BusinessesSectionView result={{ status: "unavailable" }} />);
    expect(screen.getByText("Firmele locale vor apărea aici")).toBeInTheDocument();
    rerender(
      <BusinessesSectionView
        result={{ status: "ok", items: [{ id: "b1", name: "Service Exemplu", activity: "Servicii · Reparații auto", location: "Dorohoi" }] }}
      />,
    );
    expect(screen.getByRole("heading", { name: "Service Exemplu" })).toBeInTheDocument();
    expect(screen.getByText("Servicii · Reparații auto")).toBeInTheDocument();
    expect(screen.queryByText(/verificat/i)).not.toBeInTheDocument();
  });

  it("CTA: butonul de publicare este dezactivat și explicat cât timp M05 lipsește", () => {
    render(<PublishCta />);
    const button = screen.getByRole("button", { name: /Publică un anunț/ });
    expect(button).toBeDisabled();
    expect(button).toHaveAccessibleDescription("Publicarea anunțurilor va fi disponibilă în curând.");
  });
});
