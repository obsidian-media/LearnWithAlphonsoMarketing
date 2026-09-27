import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page from "./page";

describe("ai-conversation-practice-vs-multiple-choice page", () => {
  it("renders the article title and links to the placement test and features page", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "AI conversation practice: why talking beats multiple choice",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /features breakdown/i })).toHaveAttribute(
      "href",
      "/features",
    );
    expect(screen.getByRole("link", { name: /placement test/i })).toHaveAttribute(
      "href",
      "/placement-test",
    );
  });
});
