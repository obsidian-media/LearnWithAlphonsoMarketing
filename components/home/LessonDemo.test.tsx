import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { LessonDemo } from "./LessonDemo";

describe("LessonDemo", () => {
  it("shows correct feedback when the right answer is picked", async () => {
    const user = userEvent.setup();
    render(<LessonDemo />);

    await user.click(screen.getByRole("button", { name: "went" }));

    expect(await screen.findByText(/that's right/i)).toBeInTheDocument();
  });

  it("shows corrective feedback naming the right answer when a wrong option is picked", async () => {
    const user = userEvent.setup();
    render(<LessonDemo />);

    await user.click(screen.getByRole("button", { name: "go" }));

    expect(await screen.findByText(/correct answer is "went"/i)).toBeInTheDocument();
  });

  it("moves to the next question and re-enables answering", async () => {
    const user = userEvent.setup();
    render(<LessonDemo />);

    await user.click(screen.getByRole("button", { name: "went" }));
    await user.click(screen.getByRole("button", { name: /next question/i }));

    expect(screen.getByRole("button", { name: "on" })).toBeEnabled();
  });
});
