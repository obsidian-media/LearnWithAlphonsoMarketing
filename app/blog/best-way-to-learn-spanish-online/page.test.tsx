import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page from "./page";

describe("best-way-to-learn-spanish-online page", () => {
  it("renders the article title and links to the placement test", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: "The best way to learn Spanish online in 2026" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /placement test/i })).toHaveAttribute(
      "href",
      "/placement-test",
    );
  });
});
