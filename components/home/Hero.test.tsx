import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline, primary CTA, and an iOS coming-soon badge (not an App Store link)", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/actually stick/i);
    expect(screen.getByRole("link", { name: /start learning free/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/auth",
    );
    expect(screen.getByText(/coming soon.*ios/i)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /app store/i })).not.toBeInTheDocument();
  });
});
