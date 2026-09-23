import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PricingPage from "./page";

describe("Pricing page", () => {
  it("shows Free and Hector Pro, with Pro clearly marked coming soon and not purchasable", () => {
    render(<PricingPage />);
    expect(screen.getByRole("heading", { name: /^free$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /hector/i })).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /subscribe|buy|purchase/i })).not.toBeInTheDocument();
  });

  it("shows Hector's portrait on the Pro card", () => {
    render(<PricingPage />);
    expect(screen.getByAltText(/hector/i)).toBeInTheDocument();
  });
});
