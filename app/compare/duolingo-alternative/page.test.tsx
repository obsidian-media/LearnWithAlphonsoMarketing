import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Page from "./page";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("duolingo-alternative comparison page", () => {
  it("renders the comparison headline and does not disparage the competitor", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/duolingo/i);
    expect(screen.queryByText(/duolingo is bad|duolingo sucks/i)).not.toBeInTheDocument();
  });
});
