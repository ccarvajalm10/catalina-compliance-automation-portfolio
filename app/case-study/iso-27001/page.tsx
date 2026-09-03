import type { Metadata } from "next";
import Link from "next/link";
import { getDemoAnalysis } from "@/lib/loadAnalysis";
import { siteConfig } from "@/lib/site";
import { Flow } from "@/components/Flow";
import { References } from "@/components/References";
import { Consultation } from "@/components/Consultation";
import { ISO_RESOURCES } from "@/lib/resources";
import { PIPELINE_STEPS, VERDICT_ORDER, VERDICT_RUBRIC } from "@/lib/rubric";

export const metadata: Metadata = {
  title: "Case study 01: an ISO 27001 gap analysis rebuilt as an AI pipeline",
  description:
    "How a first ISO/IEC 27001:2022 Annex A gap analysis goes from roughly four analyst-days to about one, by letting an AI pipeline draft a cited verdict for every control and having a reviewer check instead of author.",
};

const FLOW = [
  { title: "Load the document set", sub: "ISMS policies + evidence register, tagged" },
  {
    title: "Retrieve evidence per control",
    sub: "93 Annex A controls, batched by theme",
    branch: ["Organizational", "People", "Physical", "Technological"],
  },
  { title: "Classify against a fixed rubric", sub: "Met / Partial / Gap / Not Applicable", accent: true },
  { title: "Validate in code", sub: "reject unknown IDs, downgrade unquoted, back-fill skipped" },
  { title: "Reviewer checks 93 pre-argued findings", sub: "correct, do not compose", gate: true },
  { title: "Exports", sub: "remediation backlog + draft Statement of Applicability" },
];

export default function CaseStudy() {
  const a = getDemoAnalysis();
  const s = a.summary;

  return (
    <div data-accent="forest">
      <article className="container-x max-w-[880px] py-12">
        <div className="flex items-center gap-3">
          <Link href="/case-study" className="text-[13px] text-[var(--ink-3)] hover:text-[var(--ink)]">
            Case studies
          </Link>
          <span className="text-[var(--ink-3)]">/</span>
          <span className="area-tag">Governance, Risk &amp; Control</span>
        </div>

        <p className="kicker on-accent mt-5">Case study 01</p>
        <h1 className="display mt-3 text-[clamp(2rem,4.4vw,3rem)]">
          An ISO&nbsp;27001 gap analysis, rebuilt as an AI pipeline
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-[var(--ink-2)]">
          This is the one case study with a working tool behind it. It takes the first
          readiness gap analysis against ISO/IEC 27001:2022, rebuilds it around an AI
          pipeline, and measures what changed. The{" "}
          <Link href="/tool" className="font-semibold text-[var(--forest)]">
            live tool
          </Link>{" "}
          is the output of that pipeline; this page is the reasoning behind it.
        </p>

        <div className="mt-6 grid gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6">
          <div>
            <div className="text-[12px] text-[var(--ink-3)]">Today, from scratch</div>
            <div className="mt-1 font-serif text-[22px] text-[var(--ink-2)]">
              <s className="decoration-[var(--v-gap)]">~4 analyst-days</s>
            </div>
          </div>
          <div className="hidden text-[var(--ink-3)] sm:block">→</div>
          <div>
            <div className="text-[12px] text-[var(--ink-3)]">Draft, then reviewed</div>
            <div className="metric-value mt-1">~1 day</div>
          </div>
          <div className="sm:col-span-3">
            <div className="rounded-lg bg-[var(--accent-tint)] px-3 py-2 text-[13px] font-semibold text-[var(--accent-deep)]">
              About 75% less analyst time on the first pass, with a citation behind every verdict
            </div>
          </div>
        </div>

        <div className="prose mt-8">
          <h2>What the process is</h2>
          <p>
            Before an organisation can be certified to ISO/IEC 27001:2022, someone has to
            form a defensible view on every one of the 93 Annex&nbsp;A controls. For each
            control the question is the same: is it <strong>implemented</strong>,{" "}
            <strong>partially implemented</strong>, <strong>not implemented</strong>, or{" "}
            <strong>legitimately out of scope</strong>, and what in the organisation&rsquo;s
            own documents is the evidence either way. The result is a gap register that
            drives the remediation plan, plus a Statement of Applicability that records a
            decision on all 93 controls.
          </p>
          <p>
            The raw material is the organisation&rsquo;s ISMS documentation: roughly a dozen
            policies, plus whatever operational evidence exists. The assessor reads all of
            it and maps it, control by control, to the Annex&nbsp;A intent.
          </p>

          <h2>The problem</h2>
          <p>
            Done from scratch for an organisation this size, a first gap analysis is roughly{" "}
            <strong>four analyst-days</strong>. You read every document, hold the 93 control
            intents in your head, decide which sentences bear on each control, write a
            verdict and a rationale, and start a remediation list. It is slow, the line
            between <em>implemented</em> and <em>partially implemented</em> drifts as
            concentration fades, and the finished spreadsheet rarely records which sentence
            justified each verdict.
          </p>

          <h2>The AI angle: what I changed</h2>
          <p>
            I built a pipeline that does the <strong>first pass</strong>. It reads the whole
            document set once and, working through the controls in themed batches, drafts a
            verdict for each one under strict rules: an <em>implemented</em> or{" "}
            <em>partial</em> verdict must quote a specific supplied sentence, no quote means
            it cannot pass, every partial or gap must carry one concrete remediation action,
            and a confidence score is stated per verdict. The response is then validated in
            code, not trusted as-is.
          </p>
        </div>
      </article>

      {/* pipeline diagram */}
      <section className="bg-[var(--paper-2)]">
        <div className="container-x max-w-[880px] py-12">
          <p className="kicker on-accent">The pipeline</p>
          <h2 className="display mt-2 text-[clamp(1.6rem,3vw,2.1rem)]">
            How the AI reaches each verdict
          </h2>
          <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[var(--ink-2)]">
            The label on its own is not the useful part. What makes the output reviewable is
            that every verdict is the end of a fixed, visible chain.
          </p>
          <div className="mt-8">
            <Flow steps={FLOW} />
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {PIPELINE_STEPS.map((p) => (
              <li key={p.n} className="card p-4">
                <div className="text-[12px] font-bold text-[var(--forest)]">Step {p.n}</div>
                <div className="mt-0.5 text-[13.5px] font-semibold">{p.title}</div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--ink-2)]">{p.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-xl bg-[var(--surface)] p-4">
            <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-3)]">
              The four verdicts
            </div>
            <dl className="mt-3 space-y-2.5">
              {VERDICT_ORDER.map((v) => (
                <div key={v} className="grid gap-1 text-[13px] sm:grid-cols-[110px_1fr]">
                  <dt><span className={`badge badge-${v === "Met" ? "met" : v === "Partial" ? "partial" : v === "Gap" ? "gap" : "na"}`}>{v}</span></dt>
                  <dd className="leading-relaxed text-[var(--ink-2)]">{VERDICT_RUBRIC[v].test}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <article className="container-x max-w-[880px] py-10">
        <div className="prose">
          <h2>How the time figures are derived</h2>
          <ul>
            <li>
              <strong>Model pass:</strong> about 3 to 5 minutes of compute for all 93
              controls across the themed batches; a few cents to low single-digit dollars per
              run.
            </li>
            <li>
              <strong>Analyst review:</strong> about 5 to 6 hours to check every verdict
              against its citation, adjust the boundary calls, and firm up the remediation
              wording.
            </li>
            <li>
              <strong>Packaging:</strong> exports are generated automatically; about 30
              minutes to tidy the Statement of Applicability draft and the backlog.
            </li>
          </ul>
          <p>
            The honest saving is in the authoring, not the judgement. The reviewer still
            makes every final call; they start from a cited draft instead of a blank page.
          </p>

          <h2>Results on the sample company</h2>
          <ul>
            <li>
              <strong>
                {s.met} implemented, {s.partial} partial, {s.gap} gap, {s.notApplicable} not
                applicable
              </strong>{" "}
              across the 93 controls; weighted coverage <strong>{s.coverageScore}/100</strong>.
            </li>
            <li>
              Every non-gap verdict carries a verbatim quote from a named document, so a
              check is a lookup rather than a re-read.
            </li>
            <li>
              The remediation backlog surfaced the real blockers to certification: untested
              backup restoration, an overdue penetration test, an unapproved supplier policy,
              no internal audit yet.
            </li>
            <li>
              Accuracy is reported against a 30-control hand-labelled gold set on every
              change, with per-verdict precision and recall, a confusion matrix, and a full
              list of every miss (see <code>evals/</code> in the repository).
            </li>
          </ul>

          <h2>Where it is weak</h2>
          <ul>
            <li>
              <strong>Partial versus implemented boundary calls.</strong> When a control is
              documented but evidence of <em>operation</em> is thin, the model and a human
              can reasonably disagree. This is the largest error class.
            </li>
            <li>
              <strong>Not Applicable needs a human.</strong> The model proposes exclusions;
              an assessor accepts each one and records the justification in the SoA.
            </li>
            <li>
              <strong>It only sees what it is given.</strong> A polished policy with no
              operating evidence can read as implemented; the evidence register must be fed
              alongside the policies.
            </li>
          </ul>

          <h2>How this case study was built</h2>
          <ul>
            <li>
              <strong>The Master&rsquo;s.</strong> Modules from my MSc in Law, Data and AI
              and my Cybersecurity specialisation at Universidad de Le&oacute;n, covering
              applying the ISO/IEC 27001 framework inside enterprises.
            </li>
            <li>
              <strong>Practice.</strong> Compliance work at a law firm in Colombia, where
              readiness assessments were done by hand. The working spreadsheets from there,
              linked below, shaped the output format.
            </li>
            <li>
              <strong>Published guidance.</strong> The verdict rubric and Statement of
              Applicability structure follow public implementation guidance, including the
              NQA ISO/IEC 27001:2022 Implementation Guide. No copyrighted standard text is
              reproduced.
            </li>
          </ul>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {siteConfig.templates.map((t) => (
            <a
              key={t.file}
              href={t.file}
              download
              className="card group flex flex-col p-5 transition hover:border-[var(--ink-3)]"
            >
              <div className="flex items-center gap-2">
                <span className="badge badge-met">XLSX</span>
                <span className="text-[13px] text-[var(--ink-3)] group-hover:text-[var(--forest)]">Download</span>
              </div>
              <div className="mt-3 text-[14px] font-semibold">{t.name}</div>
              <p className="mt-1.5! mb-0! text-[13px] leading-relaxed text-[var(--ink-2)]">{t.note}</p>
            </a>
          ))}
        </div>

        <div className="card mt-10 flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] text-[var(--ink-2)]">
            The assessment described here is live, filterable, and traceable control by
            control.
          </p>
          <Link href="/tool" className="btn btn-primary shrink-0">
            Open the live tool
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:justify-between">
          <Link href="/case-study" className="text-[14px] font-semibold text-[var(--accent-deep)]">
            ← All three case studies
          </Link>
          <Link href="/case-study/dpa-review" className="text-[14px] font-semibold text-[var(--accent-deep)]">
            Next: DPA review →
          </Link>
        </div>
      </article>

      <References groups={ISO_RESOURCES} />
      <Consultation />
    </div>
  );
}
