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

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

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

  it("does not push a TestFlight beta", async () => {
    render(await DownloadPage());
    expect(screen.queryByRole("link", { name: /testflight/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/testflight|beta/i)).not.toBeInTheDocument();
  });

  it("says the iPhone app is coming to the App Store and offers the launch email", async () => {
    render(await DownloadPage());
    expect(
      screen.getByRole("heading", { name: /coming soon to the app store/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/tell you the day it's available/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it("does not show an App Store badge before launch", async () => {
    render(await DownloadPage());
    expect(
      screen.queryByRole("link", { name: /download on the app store/i }),
    ).not.toBeInTheDocument();
  });
});
