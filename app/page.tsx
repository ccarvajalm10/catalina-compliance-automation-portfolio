import Link from "next/link";
import { getDemoAnalysis } from "@/lib/loadAnalysis";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const a = getDemoAnalysis();
  const total = a.findings.length;
  const s = a.summary;

  return (
    <>
      {/* ================= hero ================= */}
      <section className="container-x pt-16 pb-16 sm:pt-24 sm:pb-24">
        <p className="kicker">{siteConfig.portfolio.kicker}</p>
        <h1 className="display mt-4 max-w-[15ch] text-[clamp(2.6rem,6vw,4.6rem)]">
          {siteConfig.portfolio.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[var(--ink-2)]">
          {siteConfig.portfolio.lede}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/case-study" className="btn btn-primary">
            Read case study 01
          </Link>
          <Link href="/tool" className="btn btn-ghost">
            Open the live tool
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-2">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-3)]">
            Focus areas
          </span>
          {siteConfig.about.expertise.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ================= case study 01 ================= */}
      <section className="band-dark">
        <div className="container-x py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="kicker">Case study 01</p>
              <h2 className="display mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)]">
                An ISO&nbsp;27001 gap analysis, rebuilt as an AI pipeline
              </h2>

              <h3 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#e6b980]">
                The process
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#c3cec6]">
                Before an organisation can be certified to ISO/IEC 27001:2022, someone has to
                judge all 93 Annex&nbsp;A controls: is each one implemented, partially
                implemented, not implemented, or legitimately out of scope, and what is the
                evidence either way. The output is a gap register and a Statement of
                Applicability.
              </p>

              <h3 className="mt-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#e6b980]">
                The problem
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#c3cec6]">
                Done from scratch for a company this size it is roughly four analyst-days of
                reading and mapping. The line between Met and Partial drifts with fatigue, and
                the finished spreadsheet rarely shows which sentence justified each verdict.
              </p>

              <h3 className="mt-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#e6b980]">
                The AI angle
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#c3cec6]">
                A pipeline reads the whole document set and drafts a cited verdict for every
                control, so a reviewer checks 93 pre-argued findings instead of writing them
                from a blank page. Draft in minutes, reviewed assessment in about one day. The
                reviewer still makes every final call; the saving is in the authoring.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/case-study" className="btn btn-ondark">
                  Read the write-up
                </Link>
                <Link
                  href="/tool"
                  className="btn border-[#4a6a5f] bg-transparent text-[#eef1ec] hover:border-[#7d968c]"
                >
                  Open the assessment
                </Link>
              </div>
            </div>

            {/* result snapshot */}
            <div className="self-start rounded-2xl border border-[#3a564c] bg-[#12332b] p-5">
              <div className="flex items-center justify-between text-[13px] text-[#9db3a9]">
                <span>{a.company}</span>
                <span>coverage {s.coverageScore}/100</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["Met", s.met, "dot-met"],
                  ["Partial", s.partial, "dot-partial"],
                  ["Gap", s.gap, "dot-gap"],
                  ["N/A", s.notApplicable, "dot-na"],
                ].map(([label, n, dot]) => (
                  <div
                    key={label as string}
                    className="rounded-xl bg-[#0e2a23] px-4 py-3"
                  >
                    <div className="flex items-center gap-2 text-[11.5px] text-[#9db3a9]">
                      <span className={`dot ${dot}`} /> {label}
                    </div>
                    <div className="mt-1 font-serif text-2xl text-[#f2efe7]">
                      {n as number}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[12.5px] leading-relaxed text-[#8ba79c]">
                {total} controls assessed on every run. Each Met or Partial verdict carries a
                verbatim quote from a named document.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= how this was built ================= */}
      <section className="container-x py-16 sm:py-20">
        <p className="kicker">Provenance</p>
        <h2 className="display mt-3 max-w-[24ch] text-[clamp(1.8rem,3.4vw,2.6rem)]">
          How this case study was built
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              t: "From the Master's",
              d: "Built on modules from my MSc in Law, Data and AI and my Cybersecurity specialisation at Universidad de León, which cover applying the ISO/IEC 27001 framework inside enterprises: scope, risk assessment, Annex A control selection and the Statement of Applicability.",
            },
            {
              t: "From practice",
              d: "Informed by compliance work at a law firm in Colombia, where readiness assessments against control frameworks were done by hand. The working spreadsheets I used there, shared below, shaped the output format of the tool.",
            },
            {
              t: "From published guidance",
              d: "The verdict rubric, the risk-based framing and the Statement of Applicability structure follow public implementation guidance, including the NQA ISO/IEC 27001:2022 Implementation Guide. No copyrighted standard text is reproduced.",
            },
          ].map((c, i) => (
            <div key={c.t} className="card p-5">
              <div className="font-serif text-lg text-[var(--forest)]">0{i + 1}</div>
              <div className="mt-1 font-semibold">{c.t}</div>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-2)]">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= what's inside ================= */}
      <section className="bg-[var(--paper-2)]">
        <div className="container-x py-16 sm:py-20">
          <p className="kicker">What is inside</p>
          <h2 className="display mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)]">
            One case study, seen from two angles
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-serif text-xl">The case study</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--ink-2)]">
                The written narrative: what the process is, why it is slow, how the AI
                pipeline works step by step, how the time figures are derived, the accuracy
                measured against a hand-labelled gold set, and where the tool is weak.
              </p>
              <Link
                href="/case-study"
                className="mt-4 inline-block text-[14px] font-semibold text-[var(--forest)]"
              >
                Read it
              </Link>
            </div>
            <div className="card p-6">
              <h3 className="font-serif text-xl">The live tool</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--ink-2)]">
                The actual output of that pipeline: the full 93-control assessment of a sample
                company, filterable by verdict and theme, with a decision trace for every
                control and exports to a remediation backlog and a draft Statement of
                Applicability.
              </p>
              <Link
                href="/tool"
                className="mt-4 inline-block text-[14px] font-semibold text-[var(--forest)]"
              >
                Open it
              </Link>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-[13.5px] leading-relaxed text-[var(--ink-3)]">
            They are the same piece of work. The tool is the artefact the case study
            describes; the case study is the reasoning behind what the tool shows.
          </p>
        </div>
      </section>

      {/* ================= templates ================= */}
      <section id="templates" className="container-x py-16 sm:py-20">
        <p className="kicker">Working templates</p>
        <h2 className="display mt-3 max-w-[26ch] text-[clamp(1.8rem,3.4vw,2.6rem)]">
          The spreadsheets this replaces
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-2)]">
          These are the manual templates behind the process. The AI tool produces the same
          artefacts, a self-assessment and a gap analysis feeding a Statement of
          Applicability, as a reviewed first draft rather than a blank workbook.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
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
              <div className="mt-3 font-semibold">{t.name}</div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--ink-2)]">
                {t.note}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ================= about ================= */}
      <section className="bg-[var(--paper-2)]">
        <div className="container-x py-16 sm:py-20">
          <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
            <div className="sm:w-[150px]">
              {siteConfig.author.photo && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={siteConfig.author.photo}
                  alt={siteConfig.author.name}
                  width={150}
                  height={150}
                  className="h-[150px] w-[150px] rounded-full object-cover object-[center_20%] ring-1 ring-[var(--line-2)]"
                />
              )}
            </div>
            <div>
              <p className="kicker">About</p>
              <h2 className="display mt-2 text-[clamp(1.6rem,3vw,2.2rem)]">
                {siteConfig.author.name}
              </h2>
              <p className="mt-1 text-[14px] text-[var(--ink-3)]">
                {siteConfig.author.title}, {siteConfig.author.location}
              </p>
              <div className="mt-4 space-y-3 text-[14.5px] leading-relaxed text-[var(--ink-2)]">
                <p>{siteConfig.about.bio}</p>
                <p>{siteConfig.about.background}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-[14px] font-semibold text-[var(--forest)]">
                <a href={siteConfig.links.linkedin}>LinkedIn</a>
                <a href={siteConfig.links.github}>GitHub</a>
                <a href={`mailto:${siteConfig.author.email}`}>Email</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= cta ================= */}
      <section className="container-x py-16">
        <div className="card flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-serif text-xl">See the assessment the pipeline produces</div>
            <p className="mt-1 text-[14px] text-[var(--ink-2)]">
              All 93 controls for the sample company, with a decision trace on each one.
            </p>
          </div>
          <Link href="/tool" className="btn btn-primary shrink-0">
            Open the live tool
          </Link>
        </div>
      </section>
    </>
  );
}
