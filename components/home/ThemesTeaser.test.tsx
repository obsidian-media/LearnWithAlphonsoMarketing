import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ThemesTeaser } from "./ThemesTeaser";

describe("ThemesTeaser", () => {
  it("names all three in-app themes as swatch buttons", () => {
    render(<ThemesTeaser />);
    expect(screen.getByRole("button", { name: /Meadow/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Studio Ink/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Manuscript/ })).toBeInTheDocument();
  });

  it("switches the live preview when a different theme is selected", async () => {
    const user = userEvent.setup();
    render(<ThemesTeaser />);

    // Meadow is selected by default -- its name appears in both the swatch
    // button and the preview panel.
    expect(screen.getAllByText("Meadow")).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: /Manuscript/ }));

    expect(screen.getAllByText("Manuscript")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /Meadow/ })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: /Manuscript/ })).toHaveAttribute("aria-pressed", "true");
  });
});
