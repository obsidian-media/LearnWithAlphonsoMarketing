import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FeaturesPage from "./page";

describe("Features page", () => {
  it("covers curriculum, AI conversation, spaced repetition, gamification, social, and themes", () => {
    render(<FeaturesPage />);
    // Section titles (h2) echo some of the same words as their feature cards
    // (h3), so these check the cards specifically to avoid an ambiguous match.
    // This card sits directly under the page's h1 (Curriculum section), so it
    // renders as h2, not the usual h3 -- see FeatureGrid's headingLevel prop.
    expect(screen.getByRole("heading", { name: /cefr/i, level: 2 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AI conversation practice", level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /spaced repetition/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Gamification", level: 3 })).toBeInTheDocument();
  });

  it("covers Teams, Duels, and the Season Ladder", () => {
    render(<FeaturesPage />);
    expect(screen.getByRole("heading", { name: "Teams", level: 3 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Duels & weekly challenges", level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Season ladder", level: 3 })).toBeInTheDocument();
  });
});
