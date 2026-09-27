import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Page from "./page";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("babbel-alternative comparison page", () => {
  it("renders the comparison headline and does not disparage the competitor", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/babbel/i);
    expect(screen.queryByText(/babbel is bad|babbel sucks/i)).not.toBeInTheDocument();
  });
});
