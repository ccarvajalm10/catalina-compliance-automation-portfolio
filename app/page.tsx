import Link from "next/link";
import { getDemoAnalysis } from "@/lib/loadAnalysis";
import { siteConfig } from "@/lib/site";
import { HeroArt } from "@/components/HeroArt";
import { Consultation } from "@/components/Consultation";

export default function Home() {
  const a = getDemoAnalysis();
  const cases = siteConfig.caseStudies;

  return (
    <>
      {/* ================= dark gradient hero ================= */}
      <section className="gradient-hero">
        <span className="gradient-grain" aria-hidden />
        <div className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
          <div>
            <p className="kicker">{siteConfig.portfolio.kicker}</p>
            <h1 className="hero-title mt-4 text-[clamp(2.4rem,5.4vw,4rem)]">
              {siteConfig.portfolio.tagline}
            </h1>
            <p className="hero-lede mt-6 max-w-xl text-[16.5px] leading-relaxed">
              {siteConfig.portfolio.lede}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/case-study" className="btn btn-onhero">
                Read the case studies
              </Link>
              <Link href="/tool" className="btn btn-hero-ghost">
                Open the live tool
              </Link>
              <Link href="/#about" className="btn btn-hero-ghost">
                About me
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {siteConfig.portfolio.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-[#ffffff2e] px-3 py-1 text-[12px] text-[#d9d3f2]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-art p-3 sm:p-5" style={{ background: "transparent", border: "none", boxShadow: "none" }}>
            <HeroArt className="w-full" />
            <div className="mt-3 grid grid-cols-3 gap-3">
              {cases.map((c) => (
                <div key={c.slug} className="hero-stat">
                  <div className="hs-value">{c.metric.after}</div>
                  <div className="hs-label">was {c.metric.before}</div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-[#b7afe0]">
              Demonstrative figures from a controlled build, not measured results.
            </p>
          </div>
        </div>
      </section>

      {/* ================= the three case studies ================= */}
      <section className="container-x py-16 sm:py-20">
        <p className="kicker">The work</p>
        <h2 className="display mt-3 max-w-[24ch] text-[clamp(1.8rem,3.4vw,2.6rem)]">
          Three case studies, one method
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-2)]">
          Take a slow, document-heavy process. Put a governed AI workflow through the first
          pass, with retrieval grounding, an encoded playbook, an evaluator check and a
          human approval gate. Show the time before and after on a fixed example.
        </p>

        <div className="mt-10 grid gap-5">
          {cases.map((c) => (
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
                  <span className="chip">{c.liveTool ? "Live tool" : "Worked example"}</span>
                </div>
                <h3 className="mt-2 font-serif text-[21px] text-[var(--ink)]">{c.title}</h3>
                <p className="mt-1.5 max-w-[560px] text-[13.5px] leading-relaxed text-[var(--ink-2)]">
                  {c.summary}
                </p>
              </div>
              <div className="sm:text-right">
                <div className="metric-flow sm:flex-col sm:items-end">
                  <s>{c.metric.before}</s>
                  <b>{c.metric.after}</b>
                </div>
                <div className="mt-2 max-w-[240px] text-[12px] font-semibold text-[var(--accent-deep)] sm:ml-auto">
                  {c.metric.headline}
                </div>
                <span className="mt-3 inline-block text-[13px] font-semibold text-[var(--accent-deep)] group-hover:underline">
                  Read case study {c.number} →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-5 max-w-2xl text-[12.5px] leading-relaxed text-[var(--ink-3)]">
          {siteConfig.metricsDisclaimer}
        </p>
      </section>

      {/* ================= how this was built ================= */}
      <section className="bg-[var(--paper-2)]">
        <div className="container-x py-16 sm:py-20">
          <p className="kicker">Provenance</p>
          <h2 className="display mt-3 max-w-[24ch] text-[clamp(1.8rem,3.4vw,2.6rem)]">
            The applied side of a Master&rsquo;s thesis
          </h2>
          <div className="mt-6 max-w-[720px] rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
            <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-3)]">
              {siteConfig.thesis.degree}
            </div>
            <p className="mt-2 font-serif text-[19px] leading-snug text-[var(--ink)]">
              {siteConfig.thesis.title}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-2)]">
              {siteConfig.thesis.argument} {siteConfig.thesis.note}
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                t: "From the thesis",
                d: "The framework these workflows implement, from my thesis From Regulation to Workflow: turning a regulatory instrument into an operational process with governance built into each step.",
              },
              {
                t: "From practice",
                d: "A compliance team at a law firm in Colombia, where organisations and contracts were reviewed by hand against control frameworks and statutory requirements. The working templates I used there are on this site.",
              },
              {
                t: "From published guidance",
                d: "The rubrics and workflow structures follow public implementation guidance and the text of the instruments themselves. No copyrighted standard text is stored or reproduced.",
              },
            ].map((c, i) => (
              <div key={c.t} className="card p-5">
                <div className="font-serif text-lg text-[var(--forest)]">0{i + 1}</div>
                <div className="mt-1 font-semibold">{c.t}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-2)]">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= templates ================= */}
      <section id="templates" className="container-x py-16 sm:py-20">
        <p className="kicker">Working templates</p>
        <h2 className="display mt-3 max-w-[26ch] text-[clamp(1.8rem,3.4vw,2.6rem)]">
          The spreadsheets behind the ISO 27001 case
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-2)]">
          The manual templates I have used to run readiness assessments in practice. The AI
          tool produces the same artefacts as a reviewed first draft rather than a blank
          workbook.
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
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--ink-2)]">{t.note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ================= about ================= */}
      <section id="about" className="scroll-mt-20 bg-[var(--paper-2)]">
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
              <div className="mt-5 flex flex-wrap gap-2">
                {siteConfig.about.expertise.map((e) => (
                  <span key={e} className="chip">
                    {e}
                  </span>
                ))}
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

      {/* ================= consultation ================= */}
      <Consultation variant="band" />

      {/* ================= cta ================= */}
      <section className="container-x py-16">
        <div className="card flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-serif text-xl">Start with the ISO 27001 tool</div>
            <p className="mt-1 text-[14px] text-[var(--ink-2)]">
              All 93 controls for a sample company, with a decision trace on each one.
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
