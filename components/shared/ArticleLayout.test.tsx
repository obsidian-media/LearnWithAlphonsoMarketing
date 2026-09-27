import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ArticleLayout } from "./ArticleLayout";

describe("ArticleLayout", () => {
  it("renders the title as an h1 and embeds Article JSON-LD", () => {
    const { container } = render(
      <ArticleLayout title="Test Title" description="Test description" datePublished="2026-09-27">
        <p>Body</p>
      </ArticleLayout>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Test Title" })).toBeInTheDocument();
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.textContent ?? "{}");
    expect(data["@type"]).toBe("Article");
    expect(data.headline).toBe("Test Title");
  });
});
