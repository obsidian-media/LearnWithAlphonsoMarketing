import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PlacementTestPage from "./page";
import { APP_FACTS } from "@/lib/app-facts.generated";
import { START_LEARNING_URL } from "@/lib/links";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("Placement test page", () => {
  it("states the test length the app's own picker produces", () => {
    render(<PlacementTestPage />);
    expect(
      screen.getByText(new RegExp(`up to ${APP_FACTS.placement.maxQuestions} questions`)),
    ).toBeInTheDocument();
  });

  it("lists one entry per question type the app draws from, and explains why speaking is left out", () => {
    render(<PlacementTestPage />);
    const list = screen.getByRole("list");
    expect(list.querySelectorAll("li")).toHaveLength(APP_FACTS.placement.questionTypes.length);
    expect(screen.getByText(/microphone access/i)).toBeInTheDocument();
  });

  it("links the primary CTA to the live sign-up flow", () => {
    render(<PlacementTestPage />);
    expect(screen.getByRole("link", { name: /take the placement test free/i })).toHaveAttribute(
      "href",
      START_LEARNING_URL,
    );
  });
});
