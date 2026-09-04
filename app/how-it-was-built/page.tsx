import type { Metadata } from "next";
import Link from "next/link";
import { Consultation } from "@/components/Consultation";

export const metadata: Metadata = {
  title: "How this was built: an AI-assisted worked example of the thesis framework",
  description:
    "In brief: the ISO 27001 case is invented from practice; its live tool is an AI pipeline authored with Claude Code inside a Visual Studio Code editor; and the governance pattern does not depend on the provider or the editor used.",
};

export default function HowItWasBuilt() {
  return (
    <div data-accent="forest">
      <article className="container-x max-w-[820px] py-14">
        <p className="kicker on-accent">Method</p>
        <h1 className="display mt-3 text-[clamp(2rem,4.4vw,3rem)]">How this was built</h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-2)]">
          A short account of how{" "}
          <Link href="/case-study/iso-27001" className="font-semibold text-[var(--forest)]">
            case study 01
          </Link>{" "}
          and its{" "}
          <Link href="/tool" className="font-semibold text-[var(--forest)]">
            live tool
          </Link>{" "}
          were made. It is a worked example: an illustrative implementation of the framework
          from my thesis, <em>From Regulation to Workflow</em>, built end to end with an AI
          coding agent. The full version is written up in the thesis itself.
        </p>

        <div className="prose mt-8">
          <h2>The case</h2>
          <p>
            The sample organisation is fictional. I invented it from my compliance practice:
            a roughly 60-person SaaS company pursuing its first certification, with an ISMS
            of about ten policies and an evidence register, and with the kinds of gap I have
            seen in real readiness work built in deliberately. No client data is used, and
            the copyrighted ISO texts are not reproduced; the 93 control objectives are my
            own paraphrases.
          </p>

          <h2>How it was built</h2>
          <p>
            Both the tool and this website were authored in a{" "}
            <strong>Visual Studio Code</strong> editor (Microsoft) with the{" "}
            <strong>Claude Code</strong> agent (Anthropic): I gave the direction and the
            constraints in plain language, the agent drafted each change, and I reviewed
            every diff before it was committed. That loop, in which a person directs, an AI
            drafts, the person approves, and version control keeps the record, is itself an
            instance of the framework. The stack is Next.js, TypeScript and Tailwind,
            deployed from GitHub to Vercel.
          </p>

          <h2>What the tool does</h2>
          <p>The pipeline has four stages:</p>
          <ol>
            <li>
              <strong>Inputs.</strong> The company&rsquo;s policies and evidence register as
              text; the 93 Annex A control objectives in code.
            </li>
            <li>
              <strong>Retrieval by theme.</strong> Controls are batched by Annex A theme and
              sent to the model with the full document set, to be judged only from that
              text.
            </li>
            <li>
              <strong>Classification.</strong> A system prompt requires one of four
              verdicts, a verbatim quote for any pass, one remediation action for anything
              short, and a confidence score. Requests go to Claude via the Anthropic SDK.
            </li>
            <li>
              <strong>Validation in code.</strong> Unknown control IDs are rejected, unquoted
              passes are downgraded, skipped controls are back-filled for a human to check.
            </li>
          </ol>
          <p>
            The site ships a pre-computed run so it works with no API key; an evaluation
            harness scores the pipeline against a 30-control hand-labelled set on every
            change.
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
                ["Retrieval grounding", "The model judges only from the documents supplied in the request."],
                ["Encoded playbook", "The rubric and the citation-mandatory prompt are explicit files, not conventions in a reviewer’s head."],
                ["Evaluator loop", "The deterministic parser catches unquoted passes and dropped controls before a human sees the output."],
                ["Human approval gate", "The output is 93 pre-argued findings to accept, edit or reject. It is a draft, not a certification result."],
                ["Audit trail", "Every verdict carries its quote, source, rationale and confidence; runs re-execute and diff cleanly."],
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
          <h2>The provider and the editor are swappable</h2>
          <p>
            This build uses one commercial provider, <strong>Claude</strong> (Anthropic), in
            one editor, <strong>Visual Studio Code</strong> (Microsoft). The thesis worked
            example ran in Claude&rsquo;s Cowork environment; this portfolio was built with
            Claude Code. Nothing in the design depends on either. The same pattern (grouped retrieval, a rules prompt, a
            validation pass, a human gate, a logged trace) can be built against any capable model, including OpenAI&rsquo;s
            and Google&rsquo;s or an open-weight model run privately, and in another agentic
            editor such as Google&rsquo;s Antigravity or plain Visual Studio Code. The
            provider and the tooling are implementation choices; the governance mechanisms
            are the transferable part.
          </p>
        </div>
      </article>

      <Consultation variant="band" />
    </div>
  );
}
