import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatsBand } from "./StatsBand";

describe("StatsBand", () => {
  it("shows the real content counts", () => {
    render(<StatsBand />);
    expect(screen.getByText("1,542")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
