import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PricingPage, { metadata } from "./page";

describe("Pricing page", () => {
  it("shows Free and Alphonso Pro, with Pro available in the iOS app and not sold on the web", () => {
    render(<PricingPage />);
    expect(screen.getByRole("heading", { name: /^free$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^alphonso pro$/i })).toBeInTheDocument();
    expect(screen.getAllByText(/in the ios app/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/not purchasable/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /subscribe|buy|purchase/i }),
    ).not.toBeInTheDocument();
  });

  it("states the App Store price, trial and renewal the same way the paywall does", () => {
    render(<PricingPage />);
    expect(screen.getByText("$9.99/month")).toBeInTheDocument();
    expect(screen.getByText(/2-week free trial for new subscribers/i)).toBeInTheDocument();
    expect(screen.getByText(/renews monthly until you cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/local prices are shown in the app store/i)).toBeInTheDocument();
  });

  it("says Pro can be bought once the iOS app launches, not today", () => {
    render(<PricingPage />);
    expect(screen.getByText("Launching on iOS")).toBeInTheDocument();
    expect(screen.getByText(/subscribe in the ios app once it launches/i)).toBeInTheDocument();
    expect(String(metadata.description)).toMatch(/once the iOS app launches/);
  });

  it("has metadata that no longer says coming soon", () => {
    expect(String(metadata.description)).not.toMatch(/coming soon/i);
    expect(String(metadata.description)).toMatch(/Alphonso Pro/);
  });

  it("shows Hector's portrait on the Pro card", () => {
    render(<PricingPage />);
    expect(screen.getByAltText(/hector/i)).toBeInTheDocument();
  });
});
