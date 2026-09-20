import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContentSection } from "./ContentSection";

describe("ContentSection", () => {
  it("renders its heading and children", () => {
    render(
      <ContentSection title="Spaced repetition" description="Never forget what you learned.">
        <p>Body content</p>
      </ContentSection>,
    );
    expect(screen.getByRole("heading", { name: "Spaced repetition" })).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });
});
