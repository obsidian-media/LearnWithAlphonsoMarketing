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

  it("points iPhone users to the download page, with no TestFlight link and no badge before launch", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /iphone app: coming soon/i });
    expect(cta).toHaveAttribute("href", "/download");
    expect(cta).not.toHaveAttribute("target");
    expect(screen.queryByRole("link", { name: /testflight/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /app store/i })).not.toBeInTheDocument();
  });
});
