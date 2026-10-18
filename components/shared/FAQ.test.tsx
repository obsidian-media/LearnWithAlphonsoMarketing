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
    expect(data.mainEntity).toHaveLength(7);
  });

  it("answers the free, iPhone, account and AI questions without prices, Pro or rival claims", () => {
    const { container } = render(<FAQ />);
    expect(screen.getByText(/an iphone beta is open through testflight/i)).toBeInTheDocument();
    expect(screen.getByText(/yes, a free one/i)).toBeInTheDocument();
    expect(screen.getByText(/ai features run only after you allow them/i)).toBeInTheDocument();
    expect(screen.getByText(/the app is rated 13\+/i)).toBeInTheDocument();
    expect(screen.queryByText(/different from duolingo/i)).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/Pro|9\.99/);
  });
});
