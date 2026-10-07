import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CTAButton } from "./CTAButton";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("CTAButton", () => {
  it("renders an internal link by default", () => {
    render(<CTAButton href="/features">See features</CTAButton>);
    const link = screen.getByRole("link", { name: /see features/i });
    expect(link).toHaveAttribute("href", "/features");
  });

  it("adds target=_blank and rel for external links", () => {
    render(
      <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
        Start learning free
      </CTAButton>,
    );
    const link = screen.getByRole("link", { name: /start learning free/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("applies secondary styling when requested", () => {
    render(
      <CTAButton href="/download" variant="secondary">
        Notify me
      </CTAButton>,
    );
    expect(screen.getByRole("link", { name: /notify me/i }).className).toContain("border");
  });

  it("applies inverted secondary styling for use on dark backgrounds", () => {
    render(
      <CTAButton href="https://example.com/beta" variant="secondary-inverted" external>
        Join the beta
      </CTAButton>,
    );
    const link = screen.getByRole("link", { name: /join the beta/i });
    expect(link.className).toContain("text-white");
    expect(link.className).toContain("border-white/30");
  });

  it("fires the named analytics event on click when trackEvent is set", async () => {
    const { track } = await import("@vercel/analytics");
    const user = userEvent.setup();
    render(
      <CTAButton href="/somewhere" trackEvent="test_event">
        Click me
      </CTAButton>,
    );
    await user.click(screen.getByRole("link", { name: "Click me" }));
    expect(track).toHaveBeenCalledWith("test_event");
  });

  it("does not call track when trackEvent is omitted", async () => {
    const { track } = await import("@vercel/analytics");
    vi.mocked(track).mockClear();
    const user = userEvent.setup();
    render(<CTAButton href="/somewhere">Click me</CTAButton>);
    await user.click(screen.getByRole("link", { name: "Click me" }));
    expect(track).not.toHaveBeenCalled();
  });
});
