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

  it("renders an optional visual alongside the content", () => {
    render(
      <ContentSection title="AI conversation practice" visual={<p>Mockup content</p>}>
        <p>Body content</p>
      </ContentSection>,
    );
    expect(screen.getByText("Mockup content")).toBeInTheDocument();
  });

  it("applies an id when given one, for deep-linking", () => {
    const { container } = render(<ContentSection title="Compete" id="compete" />);
    expect(container.querySelector("section#compete")).toBeInTheDocument();
  });
});
