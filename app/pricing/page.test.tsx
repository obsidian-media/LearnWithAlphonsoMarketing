import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PricingPage, { metadata } from "./page";

describe("Pricing page", () => {
  it("shows Free and starts the web sign-up", () => {
    render(<PricingPage />);
    expect(screen.getByRole("heading", { name: /^free$/i })).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start learning free/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/auth?utm_source=site&utm_medium=button&utm_campaign=beta1",
    );
  });

  it("promises no paid tier, price or purchase while Pro is not purchasable", () => {
    const { container } = render(<PricingPage />);
    expect(container.textContent).not.toMatch(/Pro|9\.99|trial|subscribe/);
    expect(screen.queryByRole("button", { name: /subscribe|buy|purchase/i })).not.toBeInTheDocument();
    expect(String(metadata.description)).not.toMatch(/Pro|subscription|coming soon/);
  });
});
