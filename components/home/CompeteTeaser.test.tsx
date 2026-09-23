import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompeteTeaser } from "./CompeteTeaser";

describe("CompeteTeaser", () => {
  it("teases Teams, Duels, and the Season Ladder, and links to the full Features section", () => {
    render(<CompeteTeaser />);
    expect(screen.getByRole("heading", { name: "Teams", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see all the ways to compete/i })).toHaveAttribute(
      "href",
      "/features#compete",
    );
  });
});
