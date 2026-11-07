import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FeaturesPage from "./page";
import { APP_FACTS } from "@/lib/app-facts.generated";
import { LEAGUE_RANGE } from "@/lib/facts";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("Features page", () => {
  it("has one chapter per part of the app", () => {
    render(<FeaturesPage />);
    for (const name of [
      "Learn",
      "Speak",
      "Talk freely with Hector",
      "Remember",
      "Listen",
      "Keep going",
    ])
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
  });

  it("states every count from the app's facts", () => {
    render(<FeaturesPage />);
    for (const c of APP_FACTS.courses)
      expect(screen.getByText(new RegExp(`${c.label}[^,]* ${c.units}`))).toBeInTheDocument();
    expect(
      screen.getByText(
        `${APP_FACTS.practice.scenarios} scenarios and ${APP_FACTS.practice.campaigns} story campaigns`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(LEAGUE_RANGE))).toBeInTheDocument();
  });

  it("marks the paid tier as not on sale", () => {
    render(<FeaturesPage />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
