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

  it("links to the download page with honest TestFlight-beta status, not an App Store badge", () => {
    render(<Hero />);
    const badge = screen.getByRole("link", { name: /testflight beta/i });
    expect(badge).toHaveAttribute("href", "/download");
    expect(screen.queryByRole("link", { name: /app store/i })).not.toBeInTheDocument();
  });
});
