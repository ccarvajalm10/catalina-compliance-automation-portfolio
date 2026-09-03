import type { Metadata } from "next";
import Link from "next/link";
import { getDemoAnalysis } from "@/lib/loadAnalysis";

export const metadata: Metadata = {
  title: "Case study — cutting a first ISO 27001 gap analysis from ~4 days to ~1",
};

export default function CaseStudy() {
  const a = getDemoAnalysis();
  const s = a.summary;

  return (
    <article className="container-x max-w-[760px] py-12">
      <p className="text-sm font-[600] uppercase tracking-wide text-[var(--brand)]">
        Case study
      </p>
      <h1 className="mt-2 text-[34px] font-[680] leading-tight tracking-[-0.02em]">
        Cutting a first ISO&nbsp;27001 gap analysis from ~4 days to ~1
      </h1>

      <div className="card mt-6 grid gap-4 p-5 text-sm sm:grid-cols-3">
        <div>
          <div className="text-[var(--ink-2)]">Context</div>
          <div className="mt-1 font-[550]">
            Fictional 60-person SaaS (&ldquo;Northwind Cloud&rdquo;) preparing for its first
            ISO/IEC 27001:2022 certification
          </div>
        </div>
        <div>
          <div className="text-[var(--ink-2)]">My role</div>
          <div className="mt-1 font-[550]">
            Designed the workflow, built the analyser, authored the gold set, ran the review
          </div>
        </div>
        <div>
          <div className="text-[var(--ink-2)]">Outcome</div>
          <div className="mt-1 font-[550]">
            Reviewed 93-control assessment + remediation backlog + draft SoA, produced in ~1
            analyst-day
          </div>
        </div>
      </div>

      <div className="prose-block mt-4">
        <h2>The situation</h2>
        <p>
          A readiness assessment against Annex A of ISO/IEC 27001:2022 means taking an
          organisation&rsquo;s ISMS documentation — a dozen or so policies plus whatever
          evidence exists — and forming a defensible view on all 93 controls: is each one{" "}
          <strong>implemented</strong>, <strong>partially implemented</strong>,{" "}
          <strong>not implemented</strong>, or <strong>legitimately out of scope</strong>,
          and what is the evidence either way.
        </p>
        <p>
          Done from scratch this is roughly four analyst-days for an organisation this size:
          read every document, hold the 93 control intents in your head, map text to control,
          write a verdict and a rationale, and start a remediation list. It is slow, the
          Met/Partial boundary drifts with fatigue, and the output rarely traces each verdict
          back to the sentence that justified it.
        </p>

        <h2>What I changed</h2>
        <p>
          I built a pipeline that does the <strong>first pass</strong>. It reads the whole
          document set and, batching the controls by Annex A theme, asks the model for a
          verdict on each control under strict rules: an <em>Implemented</em> or{" "}
          <em>Partial</em> verdict must quote a specific supplied sentence; no quote means it
          cannot pass; every Partial or Gap must carry one concrete remediation action;
          confidence is stated per verdict. Responses are validated in code — unknown control
          IDs are rejected, unquoted passes are downgraded, dropped controls are back-filled
          as gaps for a human to check.
        </p>
        <p>
          The analyst&rsquo;s job becomes <strong>review, not authoring</strong>: work down 93
          pre-argued findings, each with its citation and a draft action, correcting rather
          than composing. Output exports straight to a remediation backlog and a Statement of
          Applicability starter.
        </p>

        <h2>Method — how the time figures are derived</h2>
        <p>
          The &ldquo;~4 days&rdquo; baseline is a standard effort estimate for a first
          readiness assessment of a ~10-policy ISMS at this org size, not a measured control.
          The &ldquo;~1 day&rdquo; after figure breaks down as:
        </p>
        <ul>
          <li>
            <strong>Model pass:</strong> ~3–5 minutes of compute for all 93 controls across
            eight themed batches; a few cents to low single-digit dollars per run.
          </li>
          <li>
            <strong>Analyst review:</strong> ~5–6 hours to check every verdict against its
            citation, adjust boundary calls, and firm up remediation wording.
          </li>
          <li>
            <strong>Packaging:</strong> exports are generated; ~30 minutes to tidy the SoA
            draft and backlog.
          </li>
        </ul>
        <p>
          The honest saving is in the authoring, not the judgement: the reviewer still makes
          every final call, but starts from a cited draft instead of a blank sheet.
        </p>

        <h2>Results on the sample company</h2>
        <ul>
          <li>
            <strong>{s.met} Implemented, {s.partial} Partial, {s.gap} Gap, {s.notApplicable}{" "}
            Not Applicable</strong> across the 93 controls; weighted coverage{" "}
            <strong>{s.coverageScore}/100</strong>.
          </li>
          <li>
            Every non-gap verdict carries a verbatim quote from a named document, so review is
            a lookup, not a re-read.
          </li>
          <li>
            The remediation backlog surfaced the real blockers to certification — untested
            backup restoration, an overdue penetration test, an unapproved supplier policy, no
            internal audit yet, undocumented secure-architecture principles — rather than
            burying them in a spreadsheet.
          </li>
          <li>
            Against a 30-control{" "}
            <Link href="/tool" className="text-[var(--brand)]">
              hand-labelled gold set
            </Link>
            , accuracy is reported per-verdict with a confusion matrix and a full miss list on
            every change (see <code>evals/</code>). The strict metric is exact-verdict
            agreement; a severity-collapsed metric treats a Partial-vs-Implemented slip as a
            half-miss.
          </li>
        </ul>

        <h2>Where it is weak</h2>
        <ul>
          <li>
            <strong>Partial vs Implemented boundary calls.</strong> When a control is
            documented but evidence of <em>operation</em> is thin, the model and a human
            reasonably disagree. This is the largest error class and the reason a review step
            is non-negotiable.
          </li>
          <li>
            <strong>Not Applicable needs a human.</strong> The model proposes exclusions
            (e.g. physical controls for a remote-first, cloud-hosted org); an assessor must
            still accept each one and record the justification in the SoA.
          </li>
          <li>
            <strong>It only sees what it is given.</strong> A polished policy with no
            operating evidence can read as Implemented. Feeding the evidence register
            alongside the policies materially changes verdicts and is required, not optional.
          </li>
        </ul>

        <h2>Controls around the tool</h2>
        <ul>
          <li>
            <strong>Human-in-the-loop.</strong> Output is a draft. It does not replace an
            assessor, an internal audit, or a certification body, and it is labelled as a
            draft everywhere it appears.
          </li>
          <li>
            <strong>Data handling.</strong> Real ISMS documents are sensitive. Any live use
            needs a data-processing agreement with the model provider and a decision on what
            may leave the environment; the demo uses only fictional data.
          </li>
          <li>
            <strong>IP.</strong> The control catalogue is original paraphrased objectives.
            The copyrighted ISO/IEC 27001 and 27002 text is never stored or reproduced.
          </li>
          <li>
            <strong>Traceability.</strong> Runs are deterministic to re-execute and the JSON
            output diffs cleanly, so you can show what changed between assessments.
          </li>
        </ul>

        <h2>What I would do next</h2>
        <ul>
          <li>
            Add framework crosswalks (SOC 2 TSC, NIST CSF 2.0) off the same evidence pass.
          </li>
          <li>
            Evidence-freshness checks: flag controls whose supporting evidence is older than a
            policy-defined threshold.
          </li>
          <li>
            Expand the gold set to ~60 controls and add a second independent labeller to
            measure inter-rater agreement as a ceiling for model performance.
          </li>
          <li>
            A diff view between two runs for surveillance-audit preparation.
          </li>
        </ul>
      </div>

      <div className="card mt-10 flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--ink-2)]">
          The assessment described here is live and filterable.
        </p>
        <Link href="/tool" className="btn btn-primary">
          Open the live tool →
        </Link>
      </div>
    </article>
  );
}
