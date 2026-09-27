import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page from "./page";

describe("cefr-levels-explained page", () => {
  it("renders the article title", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: "CEFR levels explained: which one are you?" }),
    ).toBeInTheDocument();
  });

  it("links to the placement test", () => {
    render(<Page />);
    expect(screen.getByRole("link", { name: /take the free placement test/i })).toHaveAttribute(
      "href",
      "/placement-test",
    );
  });
});
