import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FAQ } from "./FAQ";

describe("FAQ", () => {
  it("renders every question", () => {
    render(<FAQ />);
    expect(screen.getByText("Is Learn with Alphonso free?")).toBeInTheDocument();
    expect(screen.getByText("Can I delete my account and my data?")).toBeInTheDocument();
  });

  it("embeds a valid FAQPage JSON-LD script", () => {
    const { container } = render(<FAQ />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.textContent ?? "{}");
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(6);
  });

  it("answers pricing and iOS questions with launch-accurate facts", () => {
    render(<FAQ />);
    expect(
      screen.getByText(/alphonso pro, an optional \$9\.99\/month subscription in the ios app/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/coming soon to the app store/i)).toBeInTheDocument();
    expect(screen.queryByText(/testflight/i)).not.toBeInTheDocument();
  });
});
