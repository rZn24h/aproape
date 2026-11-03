import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("execută onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Caută</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Caută" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("în starea loading este dezactivat și marcat aria-busy", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Se salvează
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Se salvează" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("aplică varianta și asChild", () => {
    render(
      <Button asChild variant="secondary">
        <a href="/x">Link</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("data-slot", "button");
    expect(link.className).toContain("border-input");
  });
});
