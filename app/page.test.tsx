import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";

describe("Home placeholder", () => {
  it("renders the site name", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /learn with alphonso/i })).toBeInTheDocument();
  });
});
