import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders nav links to every page and a primary CTA to the live app", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /features/i })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: /pricing/i })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: /download/i })).toHaveAttribute("href", "/download");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
    const cta = screen.getByRole("link", { name: /start learning free/i });
    expect(cta).toHaveAttribute("href", "https://learn.alphonsoecosystem.app/auth");
  });
});
