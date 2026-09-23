import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MascotPortraitCard } from "./MascotPortraitCard";

describe("MascotPortraitCard", () => {
  it("renders the portrait, name, and tagline", () => {
    render(
      <MascotPortraitCard
        src="/mascot/hector-portrait.png"
        alt="Hector, wearing AR goggles, in a grand library"
        name="Hector"
        tagline="The Pro AI tutor"
      />,
    );
    expect(screen.getByAltText(/hector, wearing ar goggles/i)).toBeInTheDocument();
    expect(screen.getByText("Hector")).toBeInTheDocument();
    expect(screen.getByText("The Pro AI tutor")).toBeInTheDocument();
  });
});
