import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ListenMockup } from "./ListenMockup";

describe("ListenMockup", () => {
  it("renders an episode list and a now-playing mini-player", () => {
    render(<ListenMockup />);
    expect(screen.getAllByText("Ordering at a café").length).toBeGreaterThan(0);
    expect(screen.getByText(/resumes on any device/i)).toBeInTheDocument();
  });
});
