import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PlacementTestPage from "./page";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("Placement test page", () => {
  it("explains the three real test formats and why speaking is excluded", () => {
    render(<PlacementTestPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/15 questions/i);
    expect(screen.getByRole("heading", { name: "Multiple choice", level: 3 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Listening comprehension", level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Written translation", level: 3 })).toBeInTheDocument();
    expect(screen.getByText(/microphone access/i)).toBeInTheDocument();
  });

  it("links the primary CTA to the live signup flow", () => {
    render(<PlacementTestPage />);
    expect(screen.getByRole("link", { name: /take the placement test free/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/auth",
    );
  });
});
