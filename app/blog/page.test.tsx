import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlogIndexPage from "./page";

describe("BlogIndexPage", () => {
  it("links to both seed articles", () => {
    render(<BlogIndexPage />);
    expect(
      screen.getByRole("link", { name: /how spaced repetition actually works/i }),
    ).toHaveAttribute("href", "/blog/how-spaced-repetition-works");
    expect(screen.getByRole("link", { name: /cefr levels explained/i })).toHaveAttribute(
      "href",
      "/blog/cefr-levels-explained",
    );
    expect(
      screen.getByRole("link", { name: /best language learning apps in 2026/i }),
    ).toHaveAttribute("href", "/blog/best-language-learning-apps-2026");
  });
});
