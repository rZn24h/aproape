import { render, screen } from "@testing-library/react";

import { EmptyState, ErrorState, LoadingState } from "@/components/shared/states";

describe("State components", () => {
  it("EmptyState afișează titlul, descrierea și acțiunea", () => {
    render(<EmptyState title="Niciun anunț" description="Încearcă alte filtre." action={<button>Resetează</button>} />);
    expect(screen.getByRole("heading", { name: "Niciun anunț" })).toBeInTheDocument();
    expect(screen.getByText("Încearcă alte filtre.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Resetează" })).toBeInTheDocument();
  });

  it("ErrorState are rol alert și text implicit în română", () => {
    render(<ErrorState />);
    expect(screen.getByRole("alert")).toHaveTextContent("Ceva nu a funcționat");
  });

  it("LoadingState anunță încărcarea", () => {
    render(<LoadingState variant="cards" label="Se încarcă anunțurile…" />);
    expect(screen.getByRole("status")).toHaveTextContent("Se încarcă anunțurile…");
  });
});
