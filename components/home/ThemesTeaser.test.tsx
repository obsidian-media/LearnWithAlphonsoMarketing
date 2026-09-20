import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemesTeaser } from "./ThemesTeaser";

describe("ThemesTeaser", () => {
  it("names all three in-app themes", () => {
    render(<ThemesTeaser />);
    expect(screen.getByText("Meadow")).toBeInTheDocument();
    expect(screen.getByText("Studio Ink")).toBeInTheDocument();
    expect(screen.getByText("Manuscript")).toBeInTheDocument();
  });
});
