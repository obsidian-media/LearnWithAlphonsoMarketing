import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("links legal pages out to the main app, not local pages", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /privacy/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/privacy",
    );
    expect(screen.getByRole("link", { name: /terms/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/terms",
    );
  });

  it("names the operator in the copyright line", () => {
    render(<Footer />);
    expect(screen.getByText(/© \d{4} Shayan Salimi \(Obsidian Media\)\./)).toBeInTheDocument();
  });

  it("links the Instagram profile in a new tab", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /follow @learnwithalphonso on instagram/i });
    expect(link).toHaveAttribute("href", "https://www.instagram.com/learnwithalphonso/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
