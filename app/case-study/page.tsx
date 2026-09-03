import type { Metadata } from "next";
import Link from "next/link";
import { getDemoAnalysis } from "@/lib/loadAnalysis";
import { siteConfig } from "@/lib/site";
import { PIPELINE_STEPS, VERDICT_ORDER, VERDICT_RUBRIC } from "@/lib/rubric";

export const metadata: Metadata = {
  title: "Case study 01: an ISO 27001 gap analysis rebuilt as an AI pipeline",
  description:
    "How a first ISO/IEC 27001:2022 Annex A gap analysis goes from roughly four analyst-days to about one, by letting an AI pipeline draft a cited verdict for every control and having a reviewer check instead of author.",
};

export default function CaseStudy() {
  const a = getDemoAnalysis();
  const s = a.summary;

  return (
    <article className="container-x max-w-[780px] py-14">
      <p className="kicker">Case study 01</p>
      <h1 className="display mt-4 text-[clamp(2rem,4.4vw,3rem)]">
        An ISO&nbsp;27001 gap analysis, rebuilt as an AI pipeline
      </h1>
      <p className="mt-5 text-[17px] leading-relaxed text-[var(--ink-2)]">
        This is one case study from the portfolio. It takes a slow, document-heavy
        compliance task, the first readiness gap analysis against ISO/IEC 27001:2022,
        rebuilds it around an AI pipeline, and measures what actually changed. The{" "}
        <Link href="/tool" className="font-semibold text-[var(--forest)]">
          live tool
        </Link>{" "}
        is the output of that pipeline; this page is the reasoning behind it.
      </p>

      {/* fact strip */}
      <div className="card mt-8 grid gap-5 p-6 text-[13.5px] sm:grid-cols-3">
        <div>
          <div className="text-[var(--ink-3)]">Context</div>
          <div className="mt-1 font-[550]">
            A fictional 60-person SaaS ({a.company}) preparing for its first
            ISO/IEC&nbsp;27001:2022 certification
          </div>
        </div>
        <div>
          <div className="text-[var(--ink-3)]">My role</div>
          <div className="mt-1 font-[550]">
            Designed the workflow, built the analyser, wrote the gold set, ran the
            review
          </div>
        </div>
        <div>
          <div className="text-[var(--ink-3)]">Outcome</div>
          <div className="mt-1 font-[550]">
            A reviewed 93-control assessment, remediation backlog and draft Statement of
            Applicability in about one analyst-day instead of four
          </div>
        </div>
      </div>

      <div className="prose mt-6">
        <h2>What the process is</h2>
        <p>
          Before an organisation can be certified to ISO/IEC 27001:2022, someone has to
          form a defensible view on every one of the 93 Annex&nbsp;A controls. For each
          control the question is the same: is it{" "}
          <strong>implemented</strong>, <strong>partially implemented</strong>,{" "}
          <strong>not implemented</strong>, or <strong>legitimately out of scope</strong>,
          and what in the organisation&rsquo;s own documents is the evidence either way.
          The result is a gap register that drives the remediation plan, plus a Statement
          of Applicability that records a decision on all 93 controls.
        </p>
        <p>
          The raw material is the organisation&rsquo;s ISMS documentation: roughly a
          dozen policies, plus whatever operational evidence exists (tickets, logs,
          review records, meeting minutes). The assessor reads all of it and maps it,
          control by control, to the Annex&nbsp;A intent.
        </p>

        <h2>The problem</h2>
        <p>
          Done from scratch for an organisation this size, a first gap analysis is
          roughly <strong>four analyst-days</strong>. You read every document, hold the
          93 control intents in your head, decide which sentences bear on each control,
          write a verdict and a rationale, and start a remediation list. Three things go
          wrong at that scale. It is slow. The line between{" "}
          <em>implemented</em> and <em>partially implemented</em> drifts as
          concentration fades across the day. And the finished spreadsheet rarely records
          which sentence justified each verdict, so the next reviewer has to redo the
          reading to check the work.
        </p>

        <h2>The AI angle: what I changed</h2>
        <p>
          I built a pipeline that does the <strong>first pass</strong>. It reads the whole
          document set once and, working through the controls in themed batches, drafts a
          verdict for each one under strict rules: an <em>implemented</em> or{" "}
          <em>partial</em> verdict must quote a specific supplied sentence, no quote means
          it cannot pass, every partial or gap must carry one concrete remediation
          action, and a confidence score is stated per verdict. The model&rsquo;s
          response is then validated in code, not trusted as-is: unknown control IDs are
          rejected, an unquoted pass is downgraded, and any control the model skipped is
          added back as a gap for a human to look at.
        </p>
        <p>
          The analyst&rsquo;s job changes from <strong>authoring to reviewing</strong>.
          Instead of a blank sheet, they work down 93 pre-argued findings, each with its
          citation and a draft action, correcting rather than composing. The output
          exports straight to a remediation backlog and a Statement of Applicability
          starter.
        </p>

        <h2>How the AI reaches each verdict</h2>
        <p>
          The label on its own (Met, Partial, Gap, Not Applicable) is not the useful
          part. What makes the output reviewable is that every verdict is the end of a
          fixed, visible chain:
        </p>
        <ol>
          {PIPELINE_STEPS.map((p) => (
            <li key={p.n}>
              <strong>{p.title}.</strong> {p.body}
            </li>
          ))}
        </ol>
        <p>
          Step&nbsp;3 applies the same four tests every time. Stated plainly:
        </p>
        <ul>
          {VERDICT_ORDER.map((v) => (
            <li key={v}>
              <strong>{v}:</strong> {VERDICT_RUBRIC[v].test}{" "}
              <span className="text-[var(--ink-3)]">
                Needs {VERDICT_RUBRIC[v].needs.charAt(0).toLowerCase()}
                {VERDICT_RUBRIC[v].needs.slice(1)}
              </span>
            </li>
          ))}
        </ul>
        <p>
          In the live tool every control opens to a <strong>decision trace</strong> that
          shows exactly this: the control objective, the test applied for the verdict it
          got, the sentences the model found in the documents (with their source), the
          rationale, the recommended action, and the confidence with a note on how that
          class of verdict tends to be wrong. That is the answer to &ldquo;how did it
          conclude that&rdquo;, for any single control, in one click.
        </p>

        <h2>How the time figures are derived</h2>
        <p>
          The <strong>four-day baseline</strong> is a standard effort estimate for a
          first readiness assessment of a roughly ten-policy ISMS at this organisation
          size. It is an estimate, not a stopwatch measurement. The{" "}
          <strong>one-day after figure</strong> breaks down as:
        </p>
        <ul>
          <li>
            <strong>Model pass:</strong> about 3 to 5 minutes of compute for all 93
            controls across the themed batches; a few cents to low single-digit dollars
            per run.
          </li>
          <li>
            <strong>Analyst review:</strong> about 5 to 6 hours to check every verdict
            against its citation, adjust the boundary calls, and firm up the remediation
            wording.
          </li>
          <li>
            <strong>Packaging:</strong> the exports are generated automatically; about 30
            minutes to tidy the Statement of Applicability draft and the backlog.
          </li>
        </ul>
        <p>
          The honest saving is in the authoring, not the judgement. The reviewer still
          makes every final call. They just start from a cited draft instead of a blank
          page.
        </p>

        <h2>Results on the sample company</h2>
        <ul>
          <li>
            <strong>
              {s.met} implemented, {s.partial} partial, {s.gap} gap, {s.notApplicable}{" "}
              not applicable
            </strong>{" "}
            across the 93 controls; weighted coverage{" "}
            <strong>{s.coverageScore}/100</strong>.
          </li>
          <li>
            Every non-gap verdict carries a verbatim quote from a named document, so a
            check is a lookup rather than a re-read.
          </li>
          <li>
            The remediation backlog surfaced the real blockers to certification: untested
            backup restoration, an overdue penetration test, an unapproved supplier
            policy, no internal audit yet, undocumented secure-architecture principles.
            None of them were buried in a spreadsheet.
          </li>
          <li>
            Accuracy is reported against a 30-control hand-labelled gold set on every
            change, with per-verdict precision and recall, a confusion matrix, and a full
            list of every miss (see <code>evals/</code> in the repository). The strict
            metric is exact-verdict agreement; a second metric treats a
            partial-versus-implemented slip as a half miss.
          </li>
        </ul>

        <h2>How this case study was built</h2>
        <p>
          It draws on three things, and none of them is a real client engagement:
        </p>
        <ul>
          <li>
            <strong>The Master&rsquo;s.</strong> It is built on modules from my MSc in
            Law, Data and AI and my Cybersecurity specialisation at Universidad de
            Le&oacute;n, which cover applying the ISO/IEC 27001 framework inside
            enterprises: defining scope, running the risk assessment, selecting Annex&nbsp;A
            controls, and producing the Statement of Applicability.
          </li>
          <li>
            <strong>Practice.</strong> It is informed by compliance work at a law firm in
            Colombia, where readiness assessments against control frameworks were done by
            hand. The working spreadsheets I used there, offered for download below,
            shaped the output format the tool targets.
          </li>
          <li>
            <strong>Published guidance.</strong> The verdict rubric, the risk-based
            framing and the Statement of Applicability structure follow public
            implementation guidance, including the NQA ISO/IEC 27001:2022 Implementation
            Guide. No copyrighted standard text is stored or reproduced anywhere in the
            project.
          </li>
        </ul>

        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
          {siteConfig.templates.map((t) => (
            <a
              key={t.file}
              href={t.file}
              download
              className="card group flex flex-col p-5 transition hover:border-[var(--ink-3)]"
            >
              <div className="flex items-center gap-2">
                <span className="badge badge-met">XLSX</span>
                <span className="text-[13px] text-[var(--ink-3)] group-hover:text-[var(--forest)]">
                  Download
                </span>
              </div>
              <div className="mt-3 text-[14px] font-semibold">{t.name}</div>
              <p className="mt-1.5! mb-0! text-[13px] leading-relaxed text-[var(--ink-2)]">
                {t.note}
              </p>
            </a>
          ))}
        </div>

        <h2>Where it is weak</h2>
        <ul>
          <li>
            <strong>Partial versus implemented boundary calls.</strong> When a control is
            documented but the evidence that it actually <em>operates</em> is thin, the
            model and a human can reasonably disagree. This is the largest error class
            and the reason the review step is not optional.
          </li>
          <li>
            <strong>Not Applicable needs a human.</strong> The model proposes exclusions,
            for example physical-site controls for a remote-first, cloud-hosted
            organisation. An assessor still has to accept each one and record the
            justification in the Statement of Applicability.
          </li>
          <li>
            <strong>It only sees what it is given.</strong> A polished policy with no
            operating evidence can read as implemented. Feeding the evidence register
            alongside the policies changes verdicts materially, so it is required, not
            optional.
          </li>
        </ul>

        <h2>Controls around the tool</h2>
        <ul>
          <li>
            <strong>Human in the loop.</strong> The output is a draft. It does not
            replace an assessor, an internal audit, or a certification body, and it is
            labelled as a draft everywhere it appears.
          </li>
          <li>
            <strong>Data handling.</strong> Real ISMS documents are sensitive. Any live
            use needs a data-processing agreement with the model provider and a decision
            on what is allowed to leave the environment. The demo uses only fictional
            data.
          </li>
          <li>
            <strong>Intellectual property.</strong> The control catalogue is original
            paraphrased objectives. The copyrighted ISO/IEC 27001 and 27002 text is never
            stored or reproduced.
          </li>
          <li>
            <strong>Traceability.</strong> Runs are straightforward to re-execute and the
            JSON output diffs cleanly, so the change between two assessments is easy to
            show.
          </li>
        </ul>

        <h2>What I would do next</h2>
        <ul>
          <li>
            Add framework crosswalks (SOC&nbsp;2 TSC, NIST CSF 2.0) off the same evidence
            pass.
          </li>
          <li>
            Evidence-freshness checks: flag controls whose supporting evidence is older
            than a policy-defined threshold.
          </li>
          <li>
            Expand the gold set to about 60 controls and add a second independent
            labeller, to measure inter-rater agreement as a ceiling on model performance.
          </li>
          <li>A diff view between two runs, for surveillance-audit preparation.</li>
        </ul>
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
    </article>
  );
}
