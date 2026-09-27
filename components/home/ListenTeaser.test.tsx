import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ListenTeaser } from "./ListenTeaser";

describe("ListenTeaser", () => {
  it("links out to the full Listen section on the Features page", () => {
    render(<ListenTeaser />);
    expect(screen.getByRole("link", { name: /how listen works/i })).toHaveAttribute(
      "href",
      "/features#listen",
    );
  });
});
