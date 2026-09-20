import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutPage from "./page";

describe("About page", () => {
  it("introduces Alphonso and Obsidian Media", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: /alphonso/i })).toBeInTheDocument();
    expect(screen.getByText(/obsidian media/i)).toBeInTheDocument();
  });
});
