import Link from "next/link";
import { getDemoAnalysis } from "@/lib/loadAnalysis";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const a = getDemoAnalysis();
  const total = a.findings.length;

  return (
    <>
      {/* ── hero ───────────────────────────────────────────────────────────── */}
      <section className="container-x pt-16 pb-14 sm:pt-24 sm:pb-20">
        <span className="chip">
          <span className="verdict-dot v-met" /> ISO/IEC 27001:2022 · Annex A
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-[680] leading-[1.08] tracking-[-0.02em] sm:text-[56px]">
          Make ISO 27001 gap analysis a first pass, not a blank page.
        </h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--ink-2)]">
          {siteConfig.background.cta}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/tool" className="btn btn-primary">
            Open the live tool →
          </Link>
          <Link href="/case-study" className="btn btn-ghost">
            Read the case study
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-[var(--ink-2)]/70">
            Where I work
          </span>
          {siteConfig.background.expertise.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ── about ─────────────────────────────────────────────────────────── */}
      <section className="container-x pb-4">
        <div className="card grid gap-6 p-6 sm:grid-cols-[1fr_1.4fr] sm:p-8">
          <div>
            {siteConfig.author.photo && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={siteConfig.author.photo}
                alt={siteConfig.author.name}
                width={132}
                height={132}
                className="mb-4 h-[132px] w-[132px] rounded-full object-cover ring-1 ring-[var(--line)]"
              />
            )}
            <div className="text-lg font-[660]">{siteConfig.author.name}</div>
            <div className="mt-0.5 text-sm text-[var(--ink-2)]">
              {siteConfig.author.title} · {siteConfig.author.location}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a href={siteConfig.links.linkedin} className="font-medium text-[var(--brand)]">
                LinkedIn
              </a>
              <a href={siteConfig.links.github} className="font-medium text-[var(--brand)]">
                GitHub
              </a>
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="font-medium text-[var(--brand)]"
              >
                Email
              </a>
            </div>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-[var(--ink-2)]">
            <p>{siteConfig.background.intro}</p>
            <p>{siteConfig.background.mission}</p>
            <p>{siteConfig.background.approach}</p>
          </div>
        </div>
      </section>

      {/* ── tool preview ──────────────────────────────────────────────────── */}
      <section className="container-x">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3 text-sm">
            <span className="font-medium">
              {a.company} — Annex A readiness
            </span>
            <span className="text-[var(--ink-2)]">
              coverage {a.summary.coverageScore}/100
            </span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-4">
            {[
              ["Met", a.summary.met, "v-met"],
              ["Partial", a.summary.partial, "v-partial"],
              ["Gap", a.summary.gap, "v-gap"],
              ["N/A", a.summary.notApplicable, "v-na"],
            ].map(([label, n, cls]) => (
              <div key={label as string} className="bg-[var(--surface)] px-5 py-4">
                <div className="flex items-center gap-2 text-xs text-[var(--ink-2)]">
                  <span className={`verdict-dot ${cls}`} /> {label}
                </div>
                <div className="mt-1 text-2xl font-[660]">{n as number}</div>
              </div>
            ))}
          </div>
          <ul className="divide-y divide-[var(--line)]">
            {a.findings
              .filter((f) => f.evidence.length > 0)
              .slice(0, 3)
              .map((f) => (
                <li key={f.controlId} className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span
                      className={`chip ${
                        f.verdict === "Met"
                          ? "v-met"
                          : f.verdict === "Partial"
                            ? "v-partial"
                            : "v-gap"
                      }`}
                    >
                      {f.verdict}
                    </span>
                    {f.controlId}
                    <span className="text-[var(--ink-2)]">· conf {f.confidence.toFixed(2)}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-[var(--ink-2)]">{f.rationale}</p>
                  {f.evidence[0] && (
                    <p className="mt-1.5 border-l-2 border-[var(--line)] pl-3 text-sm italic text-[#33383f]">
                      “{f.evidence[0].quote}”
                      <span className="not-italic text-[var(--ink-2)]">
                        {" "}
                        — {f.evidence[0].source}
                      </span>
                    </p>
                  )}
                </li>
              ))}
          </ul>
          <div className="border-t border-[var(--line)] px-5 py-3 text-center text-sm">
            <Link href="/tool" className="font-medium text-[var(--brand)]">
              See all {total} control findings →
            </Link>
          </div>
        </div>
      </section>

      {/* ── the problem ───────────────────────────────────────────────────── */}
      <section className="container-x pt-20">
        <h2 className="max-w-2xl text-2xl font-[660] tracking-[-0.01em] sm:text-[32px]">
          A first ISO 27001 gap analysis is slow, manual, and hard to audit.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Slow",
              tint: "var(--brand-tint)",
              d: "A consultant reads every policy and maps it to 93 controls by hand. Typically 25–40 hours before anyone sees a finding.",
            },
            {
              t: "Inconsistent",
              tint: "var(--magenta-tint)",
              d: "Two assessors grade the same evidence differently. The Met/Partial line moves depending on who is tired.",
            },
            {
              t: "Opaque",
              tint: "var(--violet-tint)",
              d: "The output is a spreadsheet of verdicts with no trace back to the sentence that justified each one.",
            },
          ].map((c) => (
            <div key={c.t} className="card p-5">
              <div
                className="mb-3 h-9 w-9 rounded-xl"
                style={{ background: c.tint }}
              />
              <div className="font-[620]">{c.t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-2)]">
                {c.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── what I built ─────────────────────────────────────────────────── */}
      <section className="container-x pt-20">
        <h2 className="max-w-2xl text-2xl font-[660] tracking-[-0.01em] sm:text-[32px]">
          So I built the first pass.
        </h2>
        <p className="mt-3 max-w-xl text-[var(--ink-2)]">
          A pipeline that reads an organisation&rsquo;s ISMS documents and drafts a verdict for
          every Annex A control, with the quote it relied on. A human then reviews 93
          pre-argued findings instead of starting from nothing.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Full Annex A coverage", "Every one of the 93 controls (2022 revision) is assessed on each run — Met, Partial, Gap, or a justified Not Applicable."],
            ["Evidence-cited verdicts", "A Met or Partial verdict must carry a verbatim quote from a supplied document. No quote, no pass — enforced in the prompt and again at parse time."],
            ["Remediation + draft SoA", "Every Partial and Gap comes with one concrete next action. Output exports to a remediation backlog and Statement of Applicability starter."],
            ["Evaluation harness", "30 hand-labelled controls, per-verdict precision/recall, a severity-collapsed accuracy, and a miss table so weaknesses are visible, not averaged away."],
            ["Demo mode", "Ships a pre-computed result so the tool works with zero configuration. Add an API key and the same UI runs the model live."],
            ["IP-safe by construction", "Original paraphrased control objectives only. The copyrighted ISO text is never stored or reproduced."],
          ].map(([t, d], i) => (
            <div key={t} className="card p-5">
              <div
                className="chip mb-3"
                style={{
                  background: [
                    "var(--brand-tint)",
                    "var(--green-tint)",
                    "var(--violet-tint)",
                    "var(--amber-tint)",
                    "var(--magenta-tint)",
                    "var(--red-tint)",
                  ][i],
                  borderColor: "transparent",
                  color: "var(--ink)",
                }}
              >
                0{i + 1}
              </div>
              <div className="font-[620]">{t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-2)]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── metrics ──────────────────────────────────────────────────────── */}
      <section className="container-x pt-20">
        <div className="card grid gap-px overflow-hidden bg-[var(--line)] sm:grid-cols-3">
          {[
            ["≈4 days → ≈1 day", "End-to-end first gap analysis for the sample company — draft in minutes, then reviewed (method in the case study)"],
            [`${total} controls`, "Assessed on every run, with a citation attached to each non-gap verdict"],
            ["30 labels", "Independent gold set the tool is scored against on every change"],
          ].map(([big, small]) => (
            <div key={big} className="bg-[var(--surface)] px-6 py-8">
              <div className="text-[26px] font-[680] tracking-[-0.01em]">{big}</div>
              <p className="mt-2 text-sm text-[var(--ink-2)]">{small}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--ink-2)]/80">
          The tool produces a reviewed <em>draft</em>. It does not replace an assessor,
          an internal audit, or a certification body — and the case study is explicit about that.
        </p>
      </section>

      {/* ── how it works ────────────────────────────────────────────────── */}
      <section className="container-x pt-20">
        <h2 className="text-2xl font-[660] tracking-[-0.01em] sm:text-[32px]">
          How it works
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Ingest", "Load the ISMS document set — policies plus an evidence register. Each is tagged policy or evidence."],
            ["Assess in batches", "Controls are batched by Annex A theme. Each batch goes to the model with the full document corpus and strict output rules."],
            ["Validate", "Responses are parsed defensively: unknown control IDs rejected, verdicts without a quote downgraded, confidence clamped."],
            ["Report", "Verdicts, citations, remediation, a weighted coverage score, and exports. Re-runnable and diffable."],
          ].map(([t, d], i) => (
            <li key={t} className="card p-5">
              <div className="text-sm font-[680] text-[var(--brand)]">
                Step {i + 1}
              </div>
              <div className="mt-1 font-[620]">{t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-2)]">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── cta ──────────────────────────────────────────────────────────── */}
      <section className="container-x pt-20">
        <div className="card flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xl font-[660]">Look at the actual output.</div>
            <p className="mt-1 text-sm text-[var(--ink-2)]">
              The full 93-control assessment of the sample company, filterable by verdict and theme.
            </p>
          </div>
          <Link href="/tool" className="btn btn-primary shrink-0">
            Open the live tool →
          </Link>
        </div>
      </section>
    </>
  );
}
