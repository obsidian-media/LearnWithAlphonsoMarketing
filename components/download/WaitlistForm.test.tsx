import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WaitlistForm } from "./WaitlistForm";

describe("WaitlistForm", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );
  });

  it("submits the entered email and shows a success message", async () => {
    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/email address/i), "friend@example.com");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/you're on the list/i);
    expect(fetch).toHaveBeenCalledWith("/api/waitlist", expect.objectContaining({ method: "POST" }));
  });

  it("shows a distinct message for an already-joined email", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, alreadyJoined: true }),
    });
    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/email address/i), "friend@example.com");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/already on the list/i);
  });
});
