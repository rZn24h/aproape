import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchBar } from "@/components/shared/search-bar";

describe("SearchBar", () => {
  it("trimite valorile validate și curățate", async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    await userEvent.type(screen.getByLabelText("Ce cauți?"), "  bicicletă  ");
    await userEvent.type(screen.getByLabelText("Unde?"), "Botoșani");
    await userEvent.click(screen.getByRole("button", { name: "Caută" }));
    expect(onSearch).toHaveBeenCalledWith({ query: "bicicletă", location: "Botoșani" }, expect.anything());
  });

  it("afișează eroare în română și focalizează câmpul invalid", async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    await userEvent.type(screen.getByLabelText("Ce cauți?"), "a");
    await userEvent.click(screen.getByRole("button", { name: "Caută" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Scrie cel puțin 2 caractere.");
    expect(screen.getByLabelText("Ce cauți?")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Ce cauți?")).toHaveFocus();
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("expune un landmark de căutare", () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByRole("search", { name: "Caută anunțuri" })).toBeInTheDocument();
  });
});
