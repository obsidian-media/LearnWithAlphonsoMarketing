import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline, subhead and primary CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Learn English, French or Spanish in 5 minutes a day",
    );
    expect(screen.getByText(/level test that finds your starting point \(A1 to C1\)/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start learning free/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/auth?utm_source=site&utm_medium=button&utm_campaign=beta1",
    );
  });

  it("tags the web sign-up link so the app can attribute visitors from this site", () => {
    render(<Hero />);
    const href = screen.getByRole("link", { name: /start learning free/i }).getAttribute("href")!;
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe("https://learn.alphonsoecosystem.app/auth");
    expect(url.searchParams.get("utm_source")).toBe("site");
    expect(url.searchParams.get("utm_campaign")).toBe("beta1");
  });

  it("offers the iPhone beta through the one approved TestFlight link, opened in a new tab", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /join the iphone beta/i });
    expect(cta).toHaveAttribute("href", "https://testflight.apple.com/join/AVAgvB3y");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("says plainly that an account is needed and that Android is later", () => {
    render(<Hero />);
    expect(screen.getByText(/free account with email or google/i)).toBeInTheDocument();
    expect(screen.getByText(/iphone beta via testflight\. android coming later\./i)).toBeInTheDocument();
    expect(screen.queryByText(/no sign-?up/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  });
});
