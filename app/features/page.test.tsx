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

  // Numbers re-derived from the shipped app's curriculum files on 2026-10-09.
  // Re-derive whenever the lesson content changes.
  it("states lesson counts and formats that match the shipped curriculum", () => {
    render(<FeaturesPage />);
    expect(
      screen.getByText(/609 English lessons, 575 French lessons and 583 Spanish lessons/),
    ).toBeInTheDocument();
    expect(screen.getByText("5 question formats")).toBeInTheDocument();
    expect(screen.queryByText(/every question type/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sentence reordering/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/image matching/)).not.toBeInTheDocument();
  });

  it("describes hearts, leagues, themes and languages as they actually work", () => {
    render(<FeaturesPage />);
    expect(screen.getByText(/refill 30 minutes after you run out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Bronze through Diamond/)).not.toBeInTheDocument();
    expect(screen.getByText(/Five league tiers/)).toBeInTheDocument();
    expect(screen.getByText(/Canopy, Meadow, Studio Ink or Manuscript/)).toBeInTheDocument();
    expect(screen.getByText(/in English, French and Spanish, by voice or text/i)).toBeInTheDocument();
    expect(screen.getByText(/only after you allow them/i)).toBeInTheDocument();
  });

  it("has a Listen section with a stable deep-link id", () => {
    render(<FeaturesPage />);
    expect(screen.getByText(/mini-player that remembers/i)).toBeInTheDocument();
    expect(document.getElementById("listen")).not.toBeNull();
  });

  it("mentions self-serve account deletion and safety tools", () => {
    render(<FeaturesPage />);
    expect(screen.getByText(/your account, your control/i)).toBeInTheDocument();
  });
});
