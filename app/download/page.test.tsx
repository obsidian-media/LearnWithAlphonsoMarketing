import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DownloadPage from "./page";

describe("Download page", () => {
  it("offers the web app as the primary path and an email waitlist for iOS", () => {
    render(<DownloadPage />);
    expect(screen.getByRole("link", { name: /start learning free/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/auth",
    );
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });
});
