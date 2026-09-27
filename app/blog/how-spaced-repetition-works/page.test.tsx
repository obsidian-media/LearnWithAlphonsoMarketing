import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page from "./page";

describe("how-spaced-repetition-works page", () => {
  it("renders the article title", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: "How spaced repetition actually works" }),
    ).toBeInTheDocument();
  });
});
