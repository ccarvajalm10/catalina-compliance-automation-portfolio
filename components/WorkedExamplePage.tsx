import Link from "next/link";
import { Flow } from "@/components/Flow";
import { CaseSample } from "@/components/CaseSample";
import { References } from "@/components/References";
import { Consultation } from "@/components/Consultation";
import { CASE_RESOURCES } from "@/lib/resources";
import type { WorkedExample } from "@/lib/caseContent";

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function IconDot() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export function WorkedExamplePage({ ex }: { ex: WorkedExample }) {
  return (
    <div data-accent={ex.accent}>
      {/* header */}
      <section className="container-x max-w-[880px] pt-12 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/case-study" className="text-[13px] text-[var(--ink-3)] hover:text-[var(--ink)]">
            Case studies
          </Link>
          <span className="text-[var(--ink-3)]">/</span>
          <span className="area-tag">{ex.area}</span>
        </div>
        <p className="kicker on-accent mt-5">Case study {ex.slug === "dpa-review" ? "02" : "03"}</p>
        <h1 className="display mt-3 text-[clamp(2rem,4.4vw,3rem)]">{ex.title}</h1>

        <div className="mt-6 grid gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6">
          <div>
            <div className="text-[12px] text-[var(--ink-3)]">Today</div>
            <div className="mt-1 font-serif text-[22px] text-[var(--ink-2)]">
              <s className="decoration-[var(--v-gap)]">{ex.metric.before}</s>
            </div>
          </div>
          <div className="hidden text-[var(--ink-3)] sm:block">→</div>
          <div>
            <div className="text-[12px] text-[var(--ink-3)]">With the governed workflow</div>
            <div className="metric-value mt-1">{ex.metric.after}</div>
          </div>
          <div className="sm:col-span-3">
            <div className="rounded-lg bg-[var(--accent-tint)] px-3 py-2 text-[13px] font-semibold text-[var(--accent-deep)]">
              {ex.metric.headline}
            </div>
          </div>
        </div>
      </section>

      {/* illustrative-implementation disclaimer */}
      <section className="container-x max-w-[880px] py-4">
        <p className="rounded-xl border border-dashed border-[var(--line-2)] bg-[var(--paper-2)] p-4 text-[12.5px] leading-relaxed text-[var(--ink-2)]">
          This is an <strong>illustrative implementation</strong> of a workflow I would build
          working in a legal-compliance team, not a claim of proven effectiveness. It is
          assessed against externally established legal requirements, not against internally
          defined success criteria. The sample data is fictional and nothing here is legal
          advice.
        </p>
      </section>

      {/* the process / problem / change */}
      <section className="container-x max-w-[880px] py-8">
        <div className="prose">
          <h2>The process</h2>
          <p>{ex.process}</p>
          <h2>Why it is slow today</h2>
        </div>
        <ul className="icon-list mt-4 max-w-[720px]">
          {ex.problem.map((t) => (
            <li key={t}>
              <IconDot />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div className="prose mt-2">
          <h2>What the governed AI workflow changes</h2>
        </div>
        <ul className="icon-list mt-4 max-w-[720px]">
          {ex.change.map((t) => (
            <li key={t}>
              <IconCheck />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* workflow diagram */}
      <section className="bg-[var(--paper-2)]">
        <div className="container-x max-w-[880px] py-12">
          <p className="kicker on-accent">The workflow</p>
          <h2 className="display mt-2 text-[clamp(1.6rem,3vw,2.1rem)]">
            Governance built into the flow, not bolted on after
          </h2>
          <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[var(--ink-2)]">
            Each step has a job. Retrieval keeps it anchored to the law as written; the
            skills encode the playbook; the evaluator loop catches the obvious misses; the
            gate keeps a person accountable for every final call.
          </p>
          <div className="mt-8">
            <Flow steps={ex.flow} />
          </div>
        </div>
      </section>

      {/* run the sample */}
      <section className="container-x max-w-[880px] py-12">
        <p className="kicker on-accent">See it work</p>
        <h2 className="display mt-2 text-[clamp(1.6rem,3vw,2.1rem)]">Run the workflow on a sample</h2>
        <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[var(--ink-2)]">
          A fixed example so you can see the shape of the output: the checks it runs, what
          it finds, and the citation behind each line. Press the button.
        </p>
        <div className="mt-6">
          <CaseSample ex={ex} />
        </div>
      </section>

      {/* governance components */}
      <section className="container-x max-w-[880px] py-8">
        <p className="kicker on-accent">Why each part is there</p>
        <h2 className="display mt-2 text-[clamp(1.6rem,3vw,2.1rem)]">The governance components</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ex.governance.map((g) => (
            <div key={g.title} className="card p-5">
              <div className="font-semibold text-[var(--accent-deep)]">{g.title}</div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--ink-2)]">{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* method + weaknesses */}
      <section className="container-x max-w-[880px] py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="prose"><h2>How the numbers are derived</h2></div>
            <ul className="icon-list mt-3">
              {ex.method.map((t) => (
                <li key={t}><IconDot /><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="prose"><h2>Where it is weak</h2></div>
            <ul className="icon-list mt-3">
              {ex.weak.map((t) => (
                <li key={t}><IconDot /><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* extends */}
      <section className="container-x max-w-[880px] py-8">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
          <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-3)]">
            The same architecture extends to
          </div>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--ink)]">{ex.extends}</p>
        </div>
      </section>

      {/* references */}
      <References groups={CASE_RESOURCES[ex.slug] ?? []} />

      {/* consultation */}
      <Consultation />

      {/* nav to others */}
      <section className="container-x max-w-[880px] py-10">
        <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:justify-between">
          <Link href="/case-study" className="text-[14px] font-semibold text-[var(--accent-deep)]">
            ← All three case studies
          </Link>
          <Link
            href={ex.slug === "dpa-review" ? "/case-study/ai-governance" : "/case-study/dpa-review"}
            className="text-[14px] font-semibold text-[var(--accent-deep)]"
          >
            {ex.slug === "dpa-review"
              ? "Next: EU AI Act readiness →"
              : "Next: DPA review →"}
          </Link>
        </div>
      </section>
    </div>
  );
}
