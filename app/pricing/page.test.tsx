import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PricingPage from "./page";
import { LAUNCH } from "@/lib/launch-state";
import { PRO } from "@/lib/pro-copy";
import { UNITS_TOTAL } from "@/lib/facts";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("Pricing page", () => {
  it("offers the whole course free, with the unit total from the app", () => {
    render(<PricingPage />);
    expect(screen.getByRole("heading", { level: 2, name: "The whole course" })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${UNITS_TOTAL} units`))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start learning free/i })).toBeInTheDocument();
  });

  it("names Hector as the only paid part, with no price, no trial length and no way to buy", () => {
    const { container } = render(<PricingPage />);
    expect(screen.getByRole("heading", { level: 2, name: "Hector" })).toBeInTheDocument();
    expect(screen.getByText(PRO.priceNote)).toBeInTheDocument();
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/[$€£]\s?\d|\d+[- ]day/);
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getAllByRole("link")).toHaveLength(1);
    if (!LAUNCH.proOnSale) expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });
});
