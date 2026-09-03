"use client";

import { useMemo, useState } from "react";
import type { AnalysisResult, Control, Verdict } from "@/lib/types";

const VERDICTS: Verdict[] = ["Met", "Partial", "Gap", "Not Applicable"];
const THEMES = ["Organizational", "People", "Physical", "Technological"] as const;

const verdictClass: Record<Verdict, string> = {
  Met: "v-met",
  Partial: "v-partial",
  Gap: "v-gap",
  "Not Applicable": "v-na",
};

function csv(rows: (string | number)[][]): string {
  return rows
    .map((r) =>
      r
        .map((cell) => {
          const s = String(cell ?? "");
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(","),
    )
    .join("\r\n");
}

function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const el = document.createElement("a");
  el.href = url;
  el.download = name;
  el.click();
  URL.revokeObjectURL(url);
}

export default function ToolClient({
  initial,
  controls,
}: {
  initial: AnalysisResult;
  controls: Control[];
}) {
  const [result, setResult] = useState<AnalysisResult>(initial);
  const [running, setRunning] = useState(false);
  const [runNote, setRunNote] = useState<string | null>(null);
  const [verdictFilter, setVerdictFilter] = useState<Verdict | "All">("All");
  const [themeFilter, setThemeFilter] = useState<(typeof THEMES)[number] | "All">("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const ctl = useMemo(
    () => Object.fromEntries(controls.map((c) => [c.id, c])),
    [controls],
  );

  const rows = useMemo(() => {
    return result.findings
      .map((f) => ({ f, c: ctl[f.controlId] }))
      .filter(({ f, c }) => {
        if (verdictFilter !== "All" && f.verdict !== verdictFilter) return false;
        if (themeFilter !== "All" && c?.theme !== themeFilter) return false;
        if (q) {
          const hay = `${f.controlId} ${c?.title ?? ""} ${f.rationale} ${f.remediation ?? ""}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
        return true;
      });
  }, [result, ctl, verdictFilter, themeFilter, q]);

  async function runLive() {
    setRunning(true);
    setRunNote(null);
    try {
      const res = await fetch("/api/analyze", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        setRunNote(`Error: ${data.error}`);
      } else {
        setResult(data as AnalysisResult);
        setRunNote(
          data.note ??
            `Live run complete — ${data.mode} mode${data.model ? ` (${data.model})` : ""}.`,
        );
      }
    } catch (e) {
      setRunNote(e instanceof Error ? e.message : "request failed");
    } finally {
      setRunning(false);
    }
  }

  const s = result.summary;

  return (
    <div className="container-x py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-[680] tracking-[-0.01em]">
            {result.company} — Annex A gap assessment
          </h1>
          <p className="mt-1 text-sm text-[var(--ink-2)]">
            {result.mode === "demo" ? "Pre-computed demo result" : "Live model result"} ·{" "}
            {result.documentsAnalyzed.length} documents · generated{" "}
            {new Date(result.generatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={runLive} disabled={running}>
            {running ? "Running…" : "Run live analysis"}
          </button>
        </div>
      </div>

      {runNote && (
        <p className="mt-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--ink-2)]">
          {runNote}
        </p>
      )}

      {/* summary */}
      <div className="mt-6 card grid grid-cols-2 gap-px overflow-hidden bg-[var(--line)] sm:grid-cols-5">
        {[
          ["Coverage", `${s.coverageScore}/100`, "v-na"],
          ["Met", s.met, "v-met"],
          ["Partial", s.partial, "v-partial"],
          ["Gap", s.gap, "v-gap"],
          ["N/A", s.notApplicable, "v-na"],
        ].map(([label, val, cls]) => (
          <div key={label as string} className="bg-[var(--surface)] px-5 py-4">
            <div className="flex items-center gap-2 text-xs text-[var(--ink-2)]">
              <span className={`verdict-dot ${cls}`} /> {label}
            </div>
            <div className="mt-1 text-2xl font-[660]">{val as string}</div>
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search control, rationale, action…"
          className="w-full max-w-xs rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 text-sm outline-none focus:border-[#cfd8e3]"
        />
        <select
          value={verdictFilter}
          onChange={(e) => setVerdictFilter(e.target.value as Verdict | "All")}
          className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm"
        >
          <option value="All">All verdicts</option>
          {VERDICTS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={themeFilter}
          onChange={(e) =>
            setThemeFilter(e.target.value as (typeof THEMES)[number] | "All")
          }
          className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm"
        >
          <option value="All">All themes</option>
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <span className="text-sm text-[var(--ink-2)]">{rows.length} shown</span>

        <div className="ml-auto flex gap-2">
          <button
            className="btn btn-ghost py-2! text-[13px]!"
            onClick={() =>
              download(
                "analysis.json",
                JSON.stringify(result, null, 2),
                "application/json",
              )
            }
          >
            Export JSON
          </button>
          <button
            className="btn btn-ghost py-2! text-[13px]!"
            onClick={() =>
              download(
                "remediation-backlog.csv",
                csv([
                  ["Control", "Title", "Verdict", "Confidence", "Action"],
                  ...result.findings
                    .filter((f) => f.verdict === "Partial" || f.verdict === "Gap")
                    .map((f) => [
                      f.controlId,
                      ctl[f.controlId]?.title ?? "",
                      f.verdict,
                      f.confidence.toFixed(2),
                      f.remediation ?? "",
                    ]),
                ]),
                "text/csv",
              )
            }
          >
            Export backlog
          </button>
          <button
            className="btn btn-ghost py-2! text-[13px]!"
            onClick={() =>
              download(
                "statement-of-applicability-draft.csv",
                csv([
                  ["Control", "Title", "Theme", "Applicable", "Status", "Justification"],
                  ...result.findings.map((f) => {
                    const c = ctl[f.controlId];
                    const applicable = f.verdict !== "Not Applicable";
                    return [
                      f.controlId,
                      c?.title ?? "",
                      c?.theme ?? "",
                      applicable ? "Yes" : "No",
                      f.verdict === "Met"
                        ? "Implemented"
                        : f.verdict === "Partial"
                          ? "Partially implemented"
                          : f.verdict === "Gap"
                            ? "Not implemented"
                            : "Excluded",
                      applicable
                        ? f.rationale
                        : `Excluded: ${f.rationale}`,
                    ];
                  }),
                ]),
                "text/csv",
              )
            }
          >
            Export SoA draft
          </button>
        </div>
      </div>

      {/* findings */}
      <ul className="mt-4 card divide-y divide-[var(--line)] overflow-hidden">
        {rows.map(({ f, c }) => {
          const isOpen = open === f.controlId;
          return (
            <li key={f.controlId}>
              <button
                className="flex w-full items-start gap-3 px-5 py-4 text-left hover:bg-black/[0.015]"
                onClick={() => setOpen(isOpen ? null : f.controlId)}
              >
                <span className={`chip ${verdictClass[f.verdict]} mt-0.5`}>
                  {f.verdict}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-sm font-[600]">
                    {f.controlId} · {c?.title ?? "—"}
                  </span>
                  <span className="ml-2 text-xs text-[var(--ink-2)]">
                    {c?.theme}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--ink-2)]">
                    {f.rationale}
                  </span>
                </span>
                <span className="mt-0.5 shrink-0 text-xs text-[var(--ink-2)]">
                  {f.confidence.toFixed(2)}
                </span>
              </button>
              {isOpen && (
                <div className="space-y-3 border-t border-[var(--line)] bg-black/[0.012] px-5 py-4 text-sm">
                  <p className="text-[var(--ink-2)]">
                    <span className="font-[600] text-[var(--ink)]">Objective. </span>
                    {c?.objective}
                  </p>
                  {f.evidence.length > 0 && (
                    <div>
                      <div className="mb-1 font-[600]">Evidence</div>
                      <ul className="space-y-1.5">
                        {f.evidence.map((e, i) => (
                          <li
                            key={i}
                            className="border-l-2 border-[var(--line)] pl-3 italic text-[#33383f]"
                          >
                            “{e.quote}”
                            <span className="not-italic text-[var(--ink-2)]"> — {e.source}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {f.remediation && (
                    <p>
                      <span className="font-[600]">Recommended action. </span>
                      {f.remediation}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
        {rows.length === 0 && (
          <li className="px-5 py-10 text-center text-sm text-[var(--ink-2)]">
            No controls match those filters.
          </li>
        )}
      </ul>
    </div>
  );
}
