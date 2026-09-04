import type { Metadata } from "next";
import Link from "next/link";
import { Consultation } from "@/components/Consultation";

export const metadata: Metadata = {
  title: "How this was built: an AI-assisted worked example of the thesis framework",
  description:
    "How the ISO 27001 case study and its live tool were built: a case invented from practice, an AI pipeline authored with Claude Code inside a Visual Studio Code editor, and a governance pattern that does not depend on the provider or the editor used.",
};

export default function HowItWasBuilt() {
  return (
    <div data-accent="forest">
      <article className="container-x max-w-[860px] py-14">
        <p className="kicker on-accent">Method</p>
        <h1 className="display mt-3 text-[clamp(2rem,4.4vw,3rem)]">
          How this was built
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-[var(--ink-2)]">
          This page documents how <Link href="/case-study/iso-27001" className="font-semibold text-[var(--forest)]">case study 01</Link>{" "}
          and its <Link href="/tool" className="font-semibold text-[var(--forest)]">live tool</Link>{" "}
          were made. It is written so the project can be read as a worked example: an
          illustrative implementation of the framework proposed in my thesis,{" "}
          <em>From Regulation to Workflow</em>, built end to end with an AI coding agent.
        </p>

        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 text-[14px] leading-relaxed text-[var(--ink-2)]">
          <span className="font-semibold text-[var(--ink)]">In short. </span>
          The scenario is fictional, invented from my compliance practice. The tool is a
          small AI pipeline that reads a document set and drafts a cited verdict for every
          ISO/IEC&nbsp;27001 Annex&nbsp;A control. Both the tool and this website were
          authored with <strong>Claude Code</strong> (Anthropic&rsquo;s AI coding agent)
          running inside a <strong>Visual Studio Code</strong> editor, with me directing and
          reviewing every step. The commercial provider and the editor are implementation
          choices; the governance pattern behind the tool is provider-agnostic.
        </div>

        <div className="prose mt-8">
          <h2>1. The case is invented, from practice</h2>
          <p>
            The sample organisation, &ldquo;Northwind Cloud&rdquo;, does not exist. I wrote
            it: a roughly 60-person SaaS company pursuing its first certification, with an
            ISMS of about ten policies and an evidence register. The gaps built into it are
            the kinds I have seen in real readiness work: backups that are documented but
            never test-restored, an overdue penetration test, a supplier-security policy
            still in draft, no internal audit cycle yet, secure-architecture principles that
            are practised but not written down.
          </p>
          <p>
            No client data is used anywhere. The ISO/IEC&nbsp;27001 and 27002 texts are
            copyright works and are not reproduced; the 93 control objectives in the tool are
            my own plain-language paraphrases of each control&rsquo;s intent.
          </p>

          <h2>2. Where and how it was built</h2>
          <p>
            The whole project was authored in a{" "}
            <strong>Visual Studio Code</strong> editor (Microsoft) with the{" "}
            <strong>Claude Code</strong> extension (Anthropic) connected to it. Claude Code
            is an AI coding agent: I describe what I want in plain language, and it reads and
            writes the project files, runs the build, checks types, and commits to version
            control, pausing for me to review.
          </p>
          <p>
            The working loop was the same one the case studies describe. I set the direction
            and the constraints; the agent produced a draft change; I read the diff,
            corrected it, and accepted or rejected it. Nothing reached the repository without
            my review. Over the course of the project that produced the design system, the
            three case-study pages, the pipeline code, the evaluation harness, and this page.
          </p>
          <p>
            The application is a <strong>Next.js</strong> site in{" "}
            <strong>TypeScript</strong>, styled with <strong>Tailwind CSS</strong>. It is in
            a <strong>Git</strong> repository on <strong>GitHub</strong> and deploys
            automatically to <strong>Vercel</strong> on every push. The diagrams and the
            hero illustration are hand-written SVG, not stock images.
          </p>

          <h2>3. What the live tool actually does</h2>
          <p>The pipeline has four stages, all visible in the repository:</p>
          <ol>
            <li>
              <strong>Inputs.</strong> The fictional company&rsquo;s policies and evidence
              register are loaded as plain text and tagged as policy or evidence. The 93
              Annex&nbsp;A control objectives are held in code as original paraphrases.
            </li>
            <li>
              <strong>Retrieval by theme.</strong> The 93 controls are grouped by
              Annex&nbsp;A theme and sent to the model in batches. Each request carries the
              full document set and, for every control in that batch, the objective to
              assess it against. The model is instructed to judge only from the supplied
              text.
            </li>
            <li>
              <strong>Classification under a fixed rubric.</strong> A system prompt requires,
              for each control, one of four verdicts, plus: a verbatim quote from a named
              document for any &ldquo;Met&rdquo; or &ldquo;Partial&rdquo; (no quote, no
              pass), one concrete remediation action for anything short of Met, a one or two
              sentence rationale, and a confidence score. The request goes to Claude through
              the Anthropic API; the model id is configurable and defaults to a current
              Claude model.
            </li>
            <li>
              <strong>Validation in code.</strong> The model&rsquo;s JSON is parsed
              defensively: unknown control IDs are rejected, a &ldquo;Met&rdquo; or
              &ldquo;Partial&rdquo; with no supporting quote is downgraded to
              &ldquo;Gap&rdquo;, confidence is clamped, and any control the model skipped is
              added back as a &ldquo;Gap&rdquo; for a human to check.
            </li>
          </ol>
          <p>
            The deployed site ships a <strong>pre-computed run</strong> of this pipeline as a
            JSON file, so every page works with no API key and no spend. The
            &ldquo;Run&nbsp;live&nbsp;sample&rdquo; button re-runs four controls against the
            model when a key is configured on the server, and otherwise shows the recorded
            verdicts for those four.
          </p>
          <p>
            Alongside the tool is an <strong>evaluation harness</strong>: a 30-control set I
            hand-labelled with justifications, and a scorer that reports per-verdict
            precision and recall, a confusion matrix and a full list of every disagreement.
            It runs on every change so the pipeline&rsquo;s agreement with my labels is
            measured, not assumed.
          </p>

          <h2>4. How it implements the thesis framework</h2>
          <p>
            My thesis argues that responsible AI in legal and compliance work comes from
            building governance into the workflow itself. The tool is a small, concrete
            instance of that. Each mechanism in the framework has a specific counterpart in
            the code:
          </p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[var(--line-2)] text-left text-[var(--ink-3)]">
                <th className="py-2 pr-4 font-semibold">Framework mechanism</th>
                <th className="py-2 font-semibold">In this tool</th>
              </tr>
            </thead>
            <tbody className="text-[var(--ink-2)]">
              {[
                ["Retrieval grounding", "The model judges only from the policies and evidence supplied in the request. If it is not in the documents, it does not exist for the assessment."],
                ["Encoded playbook", "The four-verdict rubric and the citation-mandatory system prompt are explicit, inspectable rules held in the repository, not conventions in a reviewer’s head."],
                ["Evaluator loop", "The defensive parser is a second, deterministic pass that catches unquoted passes, unknown controls and dropped controls before any human sees the output."],
                ["Human approval gate", "The output is 93 pre-argued findings for a reviewer to accept, edit or reject. Nothing is a certification result; the reviewer makes every final call."],
                ["Audit trail", "Every verdict carries its quote, its source document, its rationale and a confidence score. Runs are re-executable and the JSON diffs cleanly between assessments."],
              ].map(([m, d]) => (
                <tr key={m} className="border-b border-[var(--line)] align-top">
                  <td className="py-3 pr-4 font-semibold text-[var(--ink)]">{m}</td>
                  <td className="py-3">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose mt-8">
          <h2>5. The provider and the editor are swappable</h2>
          <p>
            This implementation uses one commercial model provider, <strong>Claude</strong>{" "}
            (Anthropic), and was built in one editor, <strong>Visual Studio Code</strong>{" "}
            (Microsoft), with the Claude Code agent. The worked example in my thesis was run
            in Claude&rsquo;s Cowork environment; this portfolio was built with Claude Code.
            Both are Anthropic surfaces, but nothing in the design depends on them.
          </p>
          <p>
            The transferable part is the pattern, not the vendor. The same pipeline (grouped
            retrieval, an explicit rules prompt, a deterministic validation pass, a human
            gate, and a logged trace) can be built against any capable large language model,
            including OpenAI&rsquo;s and Google&rsquo;s, or an open-weight model run
            privately. It can equally be built in another agentic editor, such as
            Google&rsquo;s Antigravity, or in plain Visual Studio Code with a different
            assistant. The provider and the tool are implementation choices to be made on
            cost, data-handling and capability grounds. The governance mechanisms are what
            make the workflow responsible, and they carry across every LLM environment.
          </p>

          <h2>6. What you can inspect</h2>
          <ul>
            <li>The control catalogue and the paraphrased objectives.</li>
            <li>The fictional company&rsquo;s full ISMS document set.</li>
            <li>The pipeline: the prompt, the batching, and the defensive parser.</li>
            <li>The pre-computed result the site ships.</li>
            <li>The gold set and the scorer, with a written accuracy report.</li>
          </ul>
          <p>
            All of it is in the{" "}
            <Link href="/case-study/iso-27001" className="font-semibold text-[var(--forest)]">
              case study
            </Link>{" "}
            and the public repository.
          </p>
        </div>
      </article>

      <Consultation variant="band" />
    </div>
  );
}
