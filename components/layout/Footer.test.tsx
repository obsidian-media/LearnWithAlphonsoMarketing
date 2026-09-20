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
});
