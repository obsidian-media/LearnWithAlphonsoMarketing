import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page from "./page";

describe("best-language-learning-apps-2026 page", () => {
  it("renders the article title and links to all three comparison pages", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Best language learning apps in 2026: how to actually choose",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Duolingo" })).toHaveAttribute(
      "href",
      "/compare/duolingo-alternative",
    );
    expect(screen.getByRole("link", { name: "Babbel" })).toHaveAttribute(
      "href",
      "/compare/babbel-alternative",
    );
    expect(screen.getByRole("link", { name: "Busuu" })).toHaveAttribute(
      "href",
      "/compare/busuu-alternative",
    );
  });
});
