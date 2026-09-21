"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CTAButton } from "../shared/CTAButton";

type Question = { prompt: string; options: string[]; answer: string };

const QUESTIONS: Question[] = [
  {
    prompt: "She ___ to the store yesterday.",
    options: ["go", "went", "goes", "gone"],
    answer: "went",
  },
  {
    prompt: "The coffee is ___ the table.",
    options: ["in", "on", "at", "under"],
    answer: "on",
  },
  {
    prompt: "Which word means “happy”?",
    options: ["sad", "glad", "tired", "hungry"],
    answer: "glad",
  },
];

export function LessonDemo() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const question = QUESTIONS[index];
  const isLast = index === QUESTIONS.length - 1;
  const isCorrect = selected === question.answer;

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);
  }

  function handleNext() {
    setSelected(null);
    setIndex((i) => (i + 1) % QUESTIONS.length);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-[2rem] border border-ink/8 bg-white p-6 shadow-xl sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/mascot/alphonso-icon.png"
            alt=""
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">
            Try a real question
          </span>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {QUESTIONS.map((q, i) => (
            <span
              key={q.prompt}
              className={`size-1.5 rounded-full ${i === index ? "bg-coral" : "bg-ink/10"}`}
            />
          ))}
        </div>
      </div>

      {/* No AnimatePresence/exit here on purpose: mode="wait" would hold the
          new question unmounted until the old one's exit transition
          finishes -- a real dead gap for users and a source of test
          flakiness. The key-based remount alone still replays the
          initial->animate enter transition on every question change. */}
      <motion.div
        key={index}
        initial={{ x: 12 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mt-6 font-display text-xl font-semibold text-ink">{question.prompt}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {question.options.map((option) => {
            const isSelected = selected === option;
            const showCorrect = selected && option === question.answer;
            const showWrong = isSelected && option !== question.answer;
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                disabled={!!selected}
                className={`rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition disabled:cursor-default ${
                  showCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : showWrong
                      ? "border-rose-400 bg-rose-50 text-rose-600"
                      : "border-ink/10 text-ink hover:border-coral/50 hover:bg-cream disabled:opacity-60"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              role="status"
              className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
                isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"
              }`}
            >
              {isCorrect
                ? "🦙 That's right — nicely done!"
                : `🦙 Not quite — the correct answer is "${question.answer}".`}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-6">
        {selected ? (
          isLast ? (
            <CTAButton href="https://learn.alphonsoecosystem.app/auth" external className="w-full">
              Start real lessons free
            </CTAButton>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="w-full rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5"
            >
              Next question
            </button>
          )
        ) : (
          <p className="text-center text-xs text-ink-soft">Pick an answer to see how it works.</p>
        )}
      </div>
    </div>
  );
}
