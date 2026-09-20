import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FeatureGrid } from "./FeatureGrid";
import { BookIcon } from "./icons";

describe("FeatureGrid", () => {
  it("renders one card per item", () => {
    render(
      <FeatureGrid
        items={[
          { title: "5 CEFR levels", description: "A1 through C1.", icon: <BookIcon /> },
          { title: "Two courses", description: "English and French.", icon: <BookIcon /> },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { name: "5 CEFR levels" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Two courses" })).toBeInTheDocument();
  });
});
