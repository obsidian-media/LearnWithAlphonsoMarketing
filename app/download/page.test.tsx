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
      "https://learn.alphonsoecosystem.app/auth?utm_source=site&utm_medium=button&utm_campaign=beta1",
    );
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it("shows the live waitlist count", async () => {
    render(await DownloadPage());
    expect(screen.getByText(/3 people already waiting/i)).toBeInTheDocument();
  });

  it("offers the iPhone beta through the one approved TestFlight link", async () => {
    render(await DownloadPage());
    expect(screen.getByRole("heading", { name: /join the iphone beta/i })).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /^join the iphone beta$/i });
    expect(cta).toHaveAttribute("href", "https://testflight.apple.com/join/AVAgvB3y");
    expect(cta).toHaveAttribute("target", "_blank");
  });

  it("still offers the App Store launch email, and says Android is later", async () => {
    render(await DownloadPage());
    expect(screen.getByText(/tell you the day it's available/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByText(/android is planned for later/i)).toBeInTheDocument();
  });

  it("does not show an App Store badge before launch", async () => {
    render(await DownloadPage());
    expect(
      screen.queryByRole("link", { name: /download on the app store/i }),
    ).not.toBeInTheDocument();
  });

  it("says what the waitlist email is used for and links the Privacy Policy", async () => {
    render(await DownloadPage());
    expect(
      screen.getByText(/we use your email only to tell you about the launch/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/privacy",
    );
  });
});
