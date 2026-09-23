import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompeteMockup } from "./CompeteMockup";

describe("CompeteMockup", () => {
  it("shows a duel face-off between two players", () => {
    render(<CompeteMockup />);
    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("Theo")).toBeInTheDocument();
    expect(screen.getByText("VS")).toBeInTheDocument();
  });

  // Regression check for a code-review finding: duels aren't scoped to a
  // season-ladder division (they're an independent system, matched by
  // course/level), and "Gold" isn't a real tier name in either system --
  // labeling the mockup this way implies a relationship that doesn't exist.
  it("does not label the duel with a division that doesn't exist", () => {
    render(<CompeteMockup />);
    expect(screen.queryByText(/gold division/i)).not.toBeInTheDocument();
  });
});
