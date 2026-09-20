import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders eyebrow, title, and description", () => {
    render(
      <SectionHeading eyebrow="How it works" title="Lessons that stick" description="Bite-size and warm." />,
    );
    expect(screen.getByText("How it works")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Lessons that stick" })).toBeInTheDocument();
    expect(screen.getByText("Bite-size and warm.")).toBeInTheDocument();
  });
});
