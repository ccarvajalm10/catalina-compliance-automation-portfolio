import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case studies: AI workflows for GRC, privacy and AI governance",
  description:
    "Three worked examples of rebuilding a slow legal-compliance process around a governed AI workflow: an ISO 27001 gap analysis, a Data Processing Agreement review, and EU AI Act readiness.",
};

export default function CaseStudyIndex() {
  return (
    <div className="container-x max-w-[960px] py-14">
      <p className="kicker">Case studies</p>
      <h1 className="display mt-3 text-[clamp(2rem,4.5vw,3rem)]">
        Three slow processes, rebuilt around a governed AI workflow
      </h1>
      <p className="mt-5 max-w-[680px] text-[16px] leading-relaxed text-[var(--ink-2)]">
        Each one takes a document-heavy legal-compliance task, puts an AI workflow through
        the first pass with the controls kept inside the flow, and shows the time it takes
        before and after. One has a live tool behind it; the other two are worked examples
        with a sample you can run. Together they are the applied side of my Master&rsquo;s
        thesis, <em>From Regulation to Workflow</em>.
      </p>

      <div className="mt-10 grid gap-5">
        {siteConfig.caseStudies.map((c) => (
          <Link
            key={c.slug}
            href={`/case-study/${c.slug}`}
            data-accent={c.accent}
            className="group grid gap-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition hover:border-[color-mix(in_srgb,var(--accent)_45%,transparent)] hover:shadow-[var(--shadow-md)] sm:grid-cols-[auto_1fr_auto] sm:items-center"
          >
            <div className="font-serif text-[40px] leading-none text-[var(--accent)]">
              {c.number}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="area-tag">{c.area}</span>
                {c.liveTool ? (
                  <span className="chip">Live tool</span>
                ) : (
                  <span className="chip">Worked example</span>
                )}
              </div>
              <h2 className="mt-2 font-serif text-[21px] text-[var(--ink)]">{c.title}</h2>
              <p className="mt-1.5 max-w-[560px] text-[13.5px] leading-relaxed text-[var(--ink-2)]">
                {c.summary}
              </p>
            </div>
            <div className="sm:text-right">
              <div className="metric-flow sm:flex-col sm:items-end">
                <s>{c.metric.before}</s>
                <b>{c.metric.after}</b>
              </div>
              <div className="mt-2 text-[12px] font-semibold text-[var(--accent-deep)]">
                {c.metric.headline}
              </div>
              <span className="mt-3 inline-block text-[13px] font-semibold text-[var(--accent-deep)] group-hover:underline">
                Read case study {c.number} →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-10 rounded-xl border border-dashed border-[var(--line-2)] bg-[var(--paper-2)] p-4 text-[12.5px] leading-relaxed text-[var(--ink-2)]">
        Each case study is an illustrative implementation, not a claim of proven
        effectiveness. Workflows are assessed against external legal requirements (ISO/IEC
        27001, GDPR, the EU AI Act), not against internally defined success criteria. All
        sample data is fictional and nothing here is legal advice.
      </p>
    </div>
  );
}
