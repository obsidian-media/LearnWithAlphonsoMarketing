import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline and primary CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/actually stick/i);
    expect(screen.getByRole("link", { name: /start learning free/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/auth",
    );
  });

  it("offers Join the TestFlight beta as a real CTA button, not an App Store badge", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /join the testflight beta/i });
    expect(cta).toHaveAttribute("href", "https://testflight.apple.com/join/awk9cvNQ");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(screen.queryByRole("link", { name: /app store/i })).not.toBeInTheDocument();
  });
});
