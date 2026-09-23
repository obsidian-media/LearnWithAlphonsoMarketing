import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutPage from "./page";

describe("About page", () => {
  it("introduces Alphonso and Obsidian Media", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: /alphonso/i })).toBeInTheDocument();
    expect(screen.getByText(/obsidian media/i)).toBeInTheDocument();
  });

  it("shows the product values grid, not just the hero paragraph", () => {
    render(<AboutPage />);
    expect(screen.getByText("Small, honest reps")).toBeInTheDocument();
    expect(screen.getByText("Real conversations, not flashcards")).toBeInTheDocument();
  });

  it("introduces Hector as the Pro AI tutor, separately from Alphonso", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: /hector/i })).toBeInTheDocument();
    expect(screen.getByAltText(/hector/i)).toBeInTheDocument();
  });
});
