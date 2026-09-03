"use client";

import { useRef, useState } from "react";
import type { SampleCheck, WorkedExample } from "@/lib/caseContent";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MARK: Record<SampleCheck["status"], string> = {
  pass: "M4 10.5l4 4 8-9",
  flag: "M10 3v9M10 16v.5",
  fail: "M5 5l10 10M15 5L5 15",
};
const MARK_CLASS: Record<SampleCheck["status"], string> = {
  pass: "check-pass",
  flag: "check-flag",
  fail: "check-fail",
};
const PILL: Record<SampleCheck["status"], [string, string]> = {
  pass: ["pill-pass", "PASS"],
  flag: ["pill-flag", "FLAG"],
  fail: ["pill-fail", "FAIL"],
};

export function CaseSample({ ex }: { ex: WorkedExample }) {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [line, setLine] = useState(0);
  const runId = useRef(0);

  const counts = ex.sample.checks.reduce(
    (a, c) => ((a[c.status] += 1), a),
    { pass: 0, flag: 0, fail: 0 } as Record<SampleCheck["status"], number>,
  );

  async function run() {
    const id = ++runId.current;
    setPhase("running");
    setLine(0);
    for (let i = 0; i < ex.sample.steps.length; i++) {
      if (runId.current !== id) return;
      await sleep(650);
      if (runId.current !== id) return;
      setLine(i + 1);
    }
    await sleep(450);
    if (runId.current !== id) return;
    setPhase("done");
  }

  return (
    <div className="card-flat p-5 sm:p-6" data-accent={ex.accent}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-3)]">
            {ex.sample.inputLabel}
          </div>
          <div className="mt-1 text-[14px] font-semibold">{ex.sample.inputName}</div>
        </div>
        <button
          className="btn btn-accent"
          onClick={run}
          disabled={phase === "running"}
        >
          {phase === "running"
            ? "Running the review"
            : phase === "done"
              ? "Run again"
              : "Run the review on this sample"}
        </button>
      </div>

      {/* step log */}
      {phase !== "idle" && (
        <ol className="mt-4 space-y-1.5 border-l-2 border-[var(--accent-tint)] pl-4 text-[12.5px] text-[var(--ink-2)]">
          {ex.sample.steps.slice(0, phase === "done" ? undefined : line).map((s, i) => (
            <li key={i} className={phase === "running" && i === line - 1 ? "running" : ""}>
              {s}
            </li>
          ))}
        </ol>
      )}

      {/* results */}
      {phase === "done" && (
        <div className="mt-5">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[12px]">
            <span className="pill pill-pass">{counts.pass} PASS</span>
            <span className="pill pill-flag">{counts.flag} FLAG</span>
            <span className="pill pill-fail">{counts.fail} FAIL</span>
            <span className="text-[var(--ink-3)]">
              across {ex.sample.checks.length} checks
            </span>
          </div>

          {/* coverage bar */}
          <div className="flex h-2 overflow-hidden rounded-full">
            {(["pass", "flag", "fail"] as const).map((k) =>
              counts[k] ? (
                <span
                  key={k}
                  className={
                    k === "pass"
                      ? "bg-[var(--v-met)]"
                      : k === "flag"
                        ? "bg-[var(--v-partial)]"
                        : "bg-[var(--v-gap)]"
                  }
                  style={{ width: `${(counts[k] / ex.sample.checks.length) * 100}%` }}
                />
              ) : null,
            )}
          </div>

          <div className="mt-4">
            {ex.sample.checks.map((c) => {
              const [pillClass, pillText] = PILL[c.status];
              return (
                <div key={c.ref} className="check-row">
                  <svg
                    className={`check-mark ${MARK_CLASS[c.status]}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={MARK[c.status]} />
                  </svg>
                  <div>
                    <div className="font-semibold text-[var(--ink)]">
                      {c.ref} · {c.requirement}
                    </div>
                    <div className="mt-0.5 text-[var(--ink-2)]">{c.finding}</div>
                    <div className="check-cite">Source: {c.cite}</div>
                  </div>
                  <span className={`pill ${pillClass}`}>{pillText}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl bg-[var(--accent-tint)] p-4 text-[13px] leading-relaxed text-[var(--ink)]">
            <span className="font-semibold">Reviewer summary. </span>
            {ex.sample.verdict}
          </div>

          <p className="mt-3 text-[12px] text-[var(--ink-3)]">
            This is a fixed sample output, shown to illustrate the workflow. It is not a
            live model run and not legal advice.
          </p>
        </div>
      )}
    </div>
  );
}
