import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ListingCard } from "@/components/shared/listing-card";
import type { ListingSummary } from "@/types/listing";

const now = new Date("2026-11-03T12:00:00Z");
const base: ListingSummary = {
  id: "1",
  href: "/anunt/1",
  title: "Bicicletă de oraș",
  price: { amount: 12900, currency: "EUR" },
  location: "Botoșani",
  publishedAt: new Date("2026-11-03T09:30:00Z"),
};

describe("ListingCard", () => {
  it("afișează preț, titlu cu link, localitate și dată", () => {
    render(<ListingCard listing={base} now={now} />);
    expect(screen.getByText(/^12\.900\s€$/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Bicicletă de oraș" })).toHaveAttribute("href", "/anunt/1");
    expect(screen.getByText("Botoșani")).toBeInTheDocument();
    expect(screen.getByText(/^Azi, /)).toBeInTheDocument();
  });

  it("afișează „Promovat” doar când e marcat explicit", () => {
    const { rerender } = render(<ListingCard listing={base} now={now} />);
    expect(screen.queryByText("Promovat")).not.toBeInTheDocument();
    rerender(<ListingCard listing={{ ...base, isPromoted: true }} now={now} />);
    expect(screen.getByText("Promovat")).toBeInTheDocument();
  });

  it("nu afișează niciodată „Verificat”", () => {
    render(<ListingCard listing={{ ...base, isPromoted: true, sellerType: "firma" }} now={now} />);
    expect(screen.queryByText(/verificat/i)).not.toBeInTheDocument();
  });

  it("are stare pentru imagine lipsă și preț opțional", () => {
    render(<ListingCard listing={{ ...base, price: null, priceLabel: "Preț negociabil" }} now={now} />);
    expect(screen.getByText("Fără fotografie")).toBeInTheDocument();
    expect(screen.getByText("Preț negociabil")).toBeInTheDocument();
  });

  it("butonul favorite este accesibil și raportează noua stare", async () => {
    const onFavoriteChange = vi.fn();
    render(<ListingCard listing={base} now={now} onFavoriteChange={onFavoriteChange} />);
    const button = screen.getByRole("button", { name: "Adaugă „Bicicletă de oraș” la favorite" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button);
    expect(onFavoriteChange).toHaveBeenCalledWith(true);
  });
});
