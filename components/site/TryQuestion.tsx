"use client";

import { useState } from "react";
import { APP_FACTS } from "@/lib/app-facts.generated";
import { Icon } from "./Icon";

/** A real question from the app's course (design/app-picks.json), answered the way the app does it. */
export function TryQuestion() {
  const q = APP_FACTS.demoQuestion;
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const reset = () => {
    setPicked(null);
    setChecked(false);
  };
  const right = checked && picked === q.answer;

  return (
    <div className="q-card rv">
      <div className="q-ask">
        <span className="play" aria-hidden="true">
          <Icon name="speaker" />
        </span>
        <div>
          <span className="over">Alphonso asks</span>
          <div className="t">{q.prompt}</div>
        </div>
      </div>
      {q.choices.map((choice, i) => {
        const state = checked ? (i === q.answer ? " right" : i === picked ? " wrong" : "") : "";
        return (
          <button
            key={choice}
            type="button"
            className={`opt${state}`}
            aria-pressed={picked === i}
            disabled={checked}
            onClick={() => setPicked(i)}
          >
            <span className="k">{i + 1}</span>
            {choice}
          </button>
        );
      })}
      <div role="status" aria-live="polite">
        {checked && (
          <div className={`verdict ${right ? "ok" : "no"}`}>
            <b>{right ? "Nice one." : "Not quite."}</b>
            {q.explanation}
          </div>
        )}
      </div>
      <button
        type="button"
        className="btn btn-primary check"
        disabled={picked === null}
        onClick={() => (checked ? reset() : setChecked(true))}
      >
        {checked ? "Try again" : "Check"}
      </button>
    </div>
  );
}
