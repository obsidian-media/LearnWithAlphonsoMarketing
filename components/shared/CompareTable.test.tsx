import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompareTable } from "./CompareTable";

describe("CompareTable", () => {
  it("renders the competitor name and every row", () => {
    render(
      <CompareTable
        competitorName="Testlingo"
        rows={[["A feature", "Our answer", "Their answer"]]}
      />,
    );
    expect(screen.getByText("Testlingo")).toBeInTheDocument();
    expect(screen.getByText("A feature")).toBeInTheDocument();
    expect(screen.getByText("Our answer")).toBeInTheDocument();
    expect(screen.getByText("Their answer")).toBeInTheDocument();
  });
});
