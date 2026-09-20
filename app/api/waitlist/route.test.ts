import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";

const insertMock = vi.fn();
vi.mock("@/db", () => ({
  getDb: () => ({ insert: () => ({ values: insertMock }) }),
}));

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => insertMock.mockReset());

  it("rejects an invalid email with 400", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("stores a valid email and returns 201", async () => {
    insertMock.mockResolvedValueOnce(undefined);
    const res = await POST(makeRequest({ email: "friend@example.com" }));
    expect(res.status).toBe(201);
    expect(insertMock).toHaveBeenCalledWith({ email: "friend@example.com" });
  });

  it("treats a duplicate-key error as an already-joined 200, not a failure", async () => {
    insertMock.mockRejectedValueOnce(new Error("duplicate key value violates unique constraint"));
    const res = await POST(makeRequest({ email: "friend@example.com" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.alreadyJoined).toBe(true);
  });
});
