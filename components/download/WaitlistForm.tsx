"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

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
        className="rounded-2xl bg-royal/10 px-5 py-4 text-sm font-semibold text-royal"
      >
        🦙 {message}
      </motion.p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-full border border-ink/10 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-coral"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap rounded-full bg-gradient-to-r from-coral to-amber px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Joining..." : "Notify me on iOS"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {message}
        </p>
      )}
    </form>
  );
}
