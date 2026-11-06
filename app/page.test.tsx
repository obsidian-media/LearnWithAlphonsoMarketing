import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./page";
import { APP_FACTS } from "@/lib/app-facts.generated";
import { IPHONE_BETA_URL, START_LEARNING_URL } from "@/lib/links";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("Home page", () => {
  it("leads with the headline and one label per CTA intent", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Talk your way into a new language.",
    );
    for (const a of screen.getAllByRole("link", { name: /start learning free/i }))
      expect(a).toHaveAttribute("href", START_LEARNING_URL);
    for (const a of screen.getAllByRole("link", { name: /join the iphone beta/i }))
      expect(a).toHaveAttribute("href", IPHONE_BETA_URL);
  });

  it("lists every course with its unit count from the app", () => {
    render(<Home />);
    for (const c of APP_FACTS.courses)
      expect(screen.getByText(new RegExp(`${c.units} units`))).toBeInTheDocument();
  });

  it("quotes the real Practice opener and a real course question", () => {
    render(<Home />);
    expect(screen.getByText(APP_FACTS.heroScenario.opener)).toBeInTheDocument();
    expect(screen.getByText(APP_FACTS.demoQuestion.prompt)).toBeInTheDocument();
  });

  it("answers the demo question the way the app grades it", () => {
    render(<Home />);
    const q = APP_FACTS.demoQuestion;
    const wrong = q.choices.findIndex((_, i) => i !== q.answer);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`${q.choices[wrong]}$`) }));
    fireEvent.click(screen.getByRole("button", { name: "Check" }));
    expect(screen.getByRole("status")).toHaveTextContent(/not quite/i);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`${q.choices[q.answer]}$`) }));
    fireEvent.click(screen.getByRole("button", { name: "Check" }));
    expect(screen.getByRole("status")).toHaveTextContent(/nice one/i);
    expect(screen.getByRole("status")).toHaveTextContent(q.explanation);
  });

  it("names every room in the app's room map, and the league tiers", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: new RegExp(`^${APP_FACTS.rooms.length} painted rooms`) }),
    ).toBeInTheDocument();
    const leagues = screen.getByRole("list", { name: "Leagues" });
    expect(
      within(leagues)
        .getAllByRole("listitem")
        .map((li) => li.textContent),
    ).toEqual(APP_FACTS.leagues.map((l) => l.label));
  });

  it("answers the FAQ with today's facts", () => {
    render(<Home />);
    expect(screen.getByText(/American English/)).toBeInTheDocument();
    expect(screen.getByText(/OpenRouter/)).toBeInTheDocument();
    expect(screen.getByText(/free public beta through Apple's TestFlight/)).toBeInTheDocument();
  });

  it("shows the paid tier only as coming soon", () => {
    render(<Home />);
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });
});
