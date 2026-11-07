"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(json.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage(json.alreadyJoined ? "You're already on the list!" : "You're on the list!");
      track("waitlist_submit");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="verdict ok"
      >
        {message}
      </motion.p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="field" noValidate>
      <label htmlFor="waitlist-email">Email address</label>
      <div className="row">
        <input
          id="waitlist-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
        <button type="submit" disabled={status === "loading"} className="btn btn-quiet">
          {status === "loading" ? "Joining..." : "Notify me"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="field-error">
          {message}
        </p>
      )}
    </form>
  );
}
