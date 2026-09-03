import type { ResourceGroup } from "@/lib/resources";

function Shield() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M8 1.5l5 2v4c0 3.5-2.4 5.6-5 6.5-2.6-.9-5-3-5-6.5v-4l5-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M5.6 8l1.7 1.7L10.6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function References({
  groups,
  title = "References and primary sources",
  lead = "Every check in this workflow cites an authority. These links go to the issuing body's own page.",
}: {
  groups: ResourceGroup[];
  title?: string;
  lead?: string;
}) {
  return (
    <section className="container-x max-w-[880px] py-6">
      {title ? (
        <>
          <p className="kicker on-accent">Sources</p>
          <h2 className="display mt-2 text-[clamp(1.6rem,3vw,2.1rem)]">{title}</h2>
        </>
      ) : null}
      {lead ? (
        <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[var(--ink-2)]">
          {lead}
        </p>
      ) : null}

      <div className={`${title || lead ? "mt-8" : "mt-2"} space-y-8`}>
        {groups.map((g) => (
          <div key={g.heading}>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-3)]">
              {g.heading}
            </h3>
            {g.intro && (
              <p className="mt-1.5 max-w-[620px] text-[12.5px] leading-relaxed text-[var(--ink-2)]">
                {g.intro}
              </p>
            )}
            <ul className="mt-3 divide-y divide-[var(--line)] rounded-xl border border-[var(--line)]">
              {g.items.map((r) => (
                <li key={r.id + r.url} className="p-4">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[13.5px] font-semibold text-[var(--ink)]">{r.id}</span>
                    <span className="text-[12px] text-[var(--ink-3)]">·</span>
                    <span className="text-[12.5px] text-[var(--ink-2)]">{r.publisher}</span>
                    <span
                      className={`ml-auto inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px] font-semibold ${
                        r.kind === "Standard"
                          ? "bg-[var(--paper-2)] text-[var(--ink-2)]"
                          : "bg-[var(--v-met-bg)] text-[var(--v-met)]"
                      }`}
                    >
                      {r.kind !== "Standard" && <Shield />}
                      {r.kind === "Standard" ? "Standard" : "Official source"}
                    </span>
                  </div>
                  <div className="mt-1 text-[13px] text-[var(--ink)]">{r.title}</div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--ink-2)]">{r.note}</p>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--accent-deep)] hover:underline"
                  >
                    {domainOf(r.url)}
                    <span aria-hidden>↗</span>
                    {!r.free && (
                      <span className="ml-1 font-normal text-[var(--ink-3)]">(purchase)</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {title ? (
        <p className="mt-6 text-[12px] leading-relaxed text-[var(--ink-3)]">
          Links resolve to the issuing authority. EU regulations and regulator guidance
          (EUR-Lex, the European Commission, the EDPB, national supervisory authorities) are
          free to access. ISO/IEC standards are published by ISO and require purchase.
        </p>
      ) : null}
    </section>
  );
}
