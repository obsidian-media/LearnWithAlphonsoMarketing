import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompeteTeaser } from "./CompeteTeaser";

describe("CompeteTeaser", () => {
  it("teases Teams, Duels, and the Season Ladder, and links to the full Features section", () => {
    render(<CompeteTeaser />);
    expect(screen.getByRole("heading", { name: "Teams", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see all the ways to compete/i })).toHaveAttribute(
      "href",
      "/features#compete",
    );
  });

  // Regression check for a code-review finding: the season ladder's divisions
  // are numbered (1-5), deliberately NOT named after the bronze/silver/
  // sapphire/ruby/diamond league tiers (LearnWithAlphonso's own deeper-
  // gamification spec keeps the two systems visually distinct on purpose) --
  // "Bronze to Diamond" here would restate the *Leagues* card one section
  // over as if it were the same system.
  it("describes the season ladder without borrowing the League tier names", () => {
    render(<CompeteTeaser />);
    expect(screen.queryByText(/bronze to diamond/i)).not.toBeInTheDocument();
  });

  // Regression check: duels are resolved by most-XP-by-a-deadline (lazily,
  // on read), not a race to a fixed XP target -- "first to the XP target"
  // describes a mechanic the app doesn't have.
  it("describes duels as most-XP-by-deadline, not a race to a fixed target", () => {
    render(<CompeteTeaser />);
    expect(screen.queryByText(/first to the xp target/i)).not.toBeInTheDocument();
  });
});
