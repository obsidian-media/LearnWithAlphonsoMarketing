import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompeteMockup } from "./CompeteMockup";

describe("CompeteMockup", () => {
  it("shows a duel face-off between two players", () => {
    render(<CompeteMockup />);
    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("Theo")).toBeInTheDocument();
    expect(screen.getByText("VS")).toBeInTheDocument();
  });
});
