import type { Metadata } from "next";
import Link from "next/link";
import { References } from "@/components/References";
import { Consultation } from "@/components/Consultation";
import {
  ISO_RESOURCES,
  DPA_RESOURCES,
  AI_RESOURCES,
  CROSS_CUTTING,
} from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resource library: the standards and law behind the case studies",
  description:
    "The primary sources each case study is built on — ISO/IEC 27001 and 27002, the GDPR and EDPB guidance, the EU AI Act — each linked to the issuing authority's official page.",
};

const SECTIONS = [
  {
    slug: "iso-27001",
    accent: "forest" as const,
    n: "01",
    title: "ISO 27001 gap analysis",
    groups: ISO_RESOURCES,
  },
  {
    slug: "dpa-review",
    accent: "clay" as const,
    n: "02",
    title: "Data Processing Agreement review",
    groups: DPA_RESOURCES,
  },
  {
    slug: "ai-governance",
    accent: "indigo" as const,
    n: "03",
    title: "EU AI Act readiness",
    groups: AI_RESOURCES,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="container-x max-w-[880px] pt-14 pb-2">
        <p className="kicker">Resource library</p>
        <h1 className="display mt-3 text-[clamp(2rem,4.4vw,3rem)]">
          The standards and law behind the work
        </h1>
        <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-[var(--ink-2)]">
          Each case study is built on published, authoritative sources. Everything below
          links to the issuing body&rsquo;s own page: EUR-Lex for EU regulations, the EDPB
          and national regulators for guidance, ISO for standards, NIST for frameworks.
        </p>
      </section>

      {SECTIONS.map((s) => (
        <div key={s.slug} data-accent={s.accent}>
          <div className="container-x max-w-[880px] pt-8">
            <div className="flex items-center gap-3 border-t border-[var(--line)] pt-8">
              <span className="font-serif text-[28px] text-[var(--accent)]">{s.n}</span>
              <h2 className="font-serif text-[20px]">{s.title}</h2>
              <Link
                href={`/case-study/${s.slug}`}
                className="ml-auto text-[13px] font-semibold text-[var(--accent-deep)] hover:underline"
              >
                Read the case study →
              </Link>
            </div>
          </div>
          <References
            groups={s.groups}
            title=""
            lead=""
          />
        </div>
      ))}

      <div data-accent="forest">
        <div className="container-x max-w-[880px] pt-8">
          <div className="border-t border-[var(--line)] pt-8">
            <h2 className="font-serif text-[20px]">Cross-cutting</h2>
          </div>
        </div>
        <References groups={CROSS_CUTTING} title="" lead="" />
      </div>

      <div className="container-x max-w-[880px] pb-10">
        <p className="rounded-xl border border-dashed border-[var(--line-2)] bg-[var(--paper-2)] p-4 text-[12.5px] leading-relaxed text-[var(--ink-2)]">
          Links resolve to the issuing authority. EU regulations and regulator guidance
          (EUR-Lex, the European Commission, the EDPB, national supervisory authorities) are
          free to access. ISO/IEC standards are published by ISO and require purchase.
          Citations are given so each source stays identifiable if a link changes.
        </p>
      </div>

      <Consultation variant="band" />
    </>
  );
}
