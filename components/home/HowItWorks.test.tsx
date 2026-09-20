import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HowItWorks } from "./HowItWorks";

describe("HowItWorks", () => {
  it("lists all four steps in order", () => {
    render(<HowItWorks />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual([
      "Take the placement test",
      "Learn in bite-size lessons",
      "Review with spaced repetition",
      "Keep your streak alive",
    ]);
  });
});
