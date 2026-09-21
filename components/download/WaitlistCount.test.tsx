import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WaitlistCount } from "./WaitlistCount";

describe("WaitlistCount", () => {
  it("shows the real count when people have joined", () => {
    render(<WaitlistCount count={7} />);
    expect(screen.getByText(/7 people/i)).toBeInTheDocument();
  });

  it("invites visitors to be first when the count is zero, rather than showing a hollow 0", () => {
    render(<WaitlistCount count={0} />);
    expect(screen.getByText(/be the first/i)).toBeInTheDocument();
    expect(screen.queryByText(/0 people/i)).not.toBeInTheDocument();
  });

  it("renders nothing if the count couldn't be read, rather than showing a misleading number", () => {
    const { container } = render(<WaitlistCount count={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
