import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DownloadPage from "./page";
import { IPHONE_BETA_URL, START_LEARNING_URL } from "@/lib/links";

// DownloadPage is an async Server Component that reads a live waitlist count: mock the DB read (same pattern as
// app/api/waitlist/route.test.ts) and await the component before rendering it.
vi.mock("@/db", () => ({
  getDb: () => ({
    select: () => ({
      from: () => Promise.resolve([{ value: 3 }]),
    }),
  }),
}));

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("Download page", () => {
  it("offers the web app as the primary path", async () => {
    render(await DownloadPage());
    expect(screen.getByRole("heading", { level: 2, name: "Web app" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start learning free/i })).toHaveAttribute(
      "href",
      START_LEARNING_URL,
    );
  });

  it("offers the iPhone beta through the one approved TestFlight link", async () => {
    render(await DownloadPage());
    expect(screen.getByRole("link", { name: /join the iphone beta/i })).toHaveAttribute(
      "href",
      IPHONE_BETA_URL,
    );
    expect(screen.getByText(/install testflight/i)).toBeInTheDocument();
  });

  it("keeps the launch waitlist for the stores the app is not on yet, with its live count", async () => {
    render(await DownloadPage());
    expect(
      screen.getByRole("heading", { level: 2, name: "App Store and Android" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByText(/3 people already waiting/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/privacy",
    );
  });

  it("shows no store badge or store link", async () => {
    const { container } = render(await DownloadPage());
    expect(container.innerHTML).not.toMatch(/apps\.apple\.com|play\.google\.com/);
  });
});
