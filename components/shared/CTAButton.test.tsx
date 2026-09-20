import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CTAButton } from "./CTAButton";

describe("CTAButton", () => {
  it("renders an internal link by default", () => {
    render(<CTAButton href="/features">See features</CTAButton>);
    const link = screen.getByRole("link", { name: /see features/i });
    expect(link).toHaveAttribute("href", "/features");
  });

  it("adds target=_blank and rel for external links", () => {
    render(
      <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
        Start learning free
      </CTAButton>,
    );
    const link = screen.getByRole("link", { name: /start learning free/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("applies secondary styling when requested", () => {
    render(
      <CTAButton href="/download" variant="secondary">
        Notify me
      </CTAButton>,
    );
    expect(screen.getByRole("link", { name: /notify me/i }).className).toContain("border");
  });
});
