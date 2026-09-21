import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DownloadPage from "./page";

// DownloadPage is an async Server Component that reads a live waitlist
// count -- mock the DB read (same pattern as app/api/waitlist/route.test.ts)
// and await the component itself before handing its JSX to RTL, since
// render() can't process a Promise<JSX.Element> directly.
vi.mock("@/db", () => ({
  getDb: () => ({
    select: () => ({
      from: () => Promise.resolve([{ value: 3 }]),
    }),
  }),
}));

describe("Download page", () => {
  it("offers the web app as the primary path and an email waitlist for iOS", async () => {
    render(await DownloadPage());
    expect(screen.getByRole("link", { name: /start learning free/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/auth",
    );
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it("shows the live waitlist count", async () => {
    render(await DownloadPage());
    expect(screen.getByText(/3 people already waiting/i)).toBeInTheDocument();
  });
});
