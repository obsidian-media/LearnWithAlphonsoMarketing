import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AnimatedCounter } from "./AnimatedCounter";

describe("AnimatedCounter", () => {
  it("renders the final value and optional unit as accessible text", () => {
    render(<AnimatedCounter value={534} unit="lessons" />);
    expect(screen.getByText(/534/)).toBeInTheDocument();
    expect(screen.getByText(/lessons/)).toBeInTheDocument();
  });
});
