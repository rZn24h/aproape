import { render, screen } from "@testing-library/react";

import { SellerCard } from "@/components/shared/seller-card";

describe("SellerCard", () => {
  it("afișează doar datele primite, fără ratinguri sau verificări", () => {
    render(<SellerCard name="Firmă Exemplu SRL" type="firma" location="Dorohoi" />);
    expect(screen.getByRole("region", { name: "Vânzător: Firmă Exemplu SRL" })).toBeInTheDocument();
    expect(screen.getByText("Firmă")).toBeInTheDocument();
    expect(screen.getByText("Dorohoi")).toBeInTheDocument();
    expect(screen.getByText("FE")).toBeInTheDocument();
    expect(screen.queryByText(/verificat|rating|stele/i)).not.toBeInTheDocument();
  });
});
