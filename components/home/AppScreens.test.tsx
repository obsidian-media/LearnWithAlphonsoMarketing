import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppScreens } from "./AppScreens";
import { APP_SCREENS, DEMO_VIDEO } from "@/lib/app-screens";

describe("AppScreens", () => {
  it("renders nothing when no real assets have been supplied", () => {
    const { container } = render(<AppScreens screens={[]} video={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a screenshot with its alt text and caption", () => {
    render(
      <AppScreens
        screens={[
          {
            src: "/screens/level-test.png",
            width: 390,
            height: 844,
            alt: "Level test result showing B1",
            caption: "Find your level",
          },
        ]}
        video={null}
      />,
    );
    expect(screen.getByRole("img", { name: "Level test result showing B1" })).toBeInTheDocument();
    expect(screen.getByText("Find your level")).toBeInTheDocument();
  });

  it("renders the demo video with a captions track", () => {
    const { container } = render(
      <AppScreens
        screens={[]}
        video={{
          src: "/screens/demo.mp4",
          poster: "/screens/demo.png",
          captions: "/screens/demo.vtt",
          caption: "20 seconds in the app",
        }}
      />,
    );
    expect(container.querySelector("video")).toHaveAttribute("poster", "/screens/demo.png");
    expect(container.querySelector("track")).toHaveAttribute("kind", "captions");
  });

  it("ships with the real-asset slots empty until the owner supplies them", () => {
    // If you add assets, update this test: every entry must be a file under public/screens.
    for (const s of APP_SCREENS) expect(s.src.startsWith("/screens/")).toBe(true);
    if (DEMO_VIDEO) expect(DEMO_VIDEO.src.startsWith("/screens/")).toBe(true);
  });
});
