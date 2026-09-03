import { siteConfig } from "@/lib/site";

/**
 * Consultation space. A direct mailto, deliberately not a data-collecting form.
 */
export function Consultation({ variant = "light" }: { variant?: "light" | "band" }) {
  const c = siteConfig.consultation;
  const mailto = `mailto:${siteConfig.author.email}?subject=${encodeURIComponent(c.emailSubject)}`;

  return (
    <section
      id="consult"
      className={variant === "band" ? "band-dark" : "bg-[var(--paper-2)]"}
    >
      <div className="container-x max-w-[880px] py-14">
        <p className="kicker">{c.heading}</p>
        <h2
          className={`display mt-3 text-[clamp(1.7rem,3.2vw,2.4rem)] ${
            variant === "band" ? "text-[#f2efe7]" : ""
          }`}
        >
          A consultation on any of these three
        </h2>
        <p
          className={`mt-4 max-w-[640px] text-[15px] leading-relaxed ${
            variant === "band" ? "text-[#c3cec6]" : "text-[var(--ink-2)]"
          }`}
        >
          {c.blurb}
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {c.offers.map((o) => (
            <li
              key={o}
              className={`rounded-xl border p-4 text-[13px] leading-relaxed ${
                variant === "band"
                  ? "border-[#ffffff26] bg-[#ffffff0d] text-[#dfe6e0]"
                  : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-2)]"
              }`}
            >
              {o}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a href={mailto} className={`btn ${variant === "band" ? "btn-ondark" : "btn-primary"}`}>
            Email me about a consultation
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${variant === "band" ? "btn-hero-ghost" : "btn-ghost"}`}
          >
            Connect on LinkedIn
          </a>
        </div>
        <p
          className={`mt-3 text-[12px] ${
            variant === "band" ? "text-[#9db3a9]" : "text-[var(--ink-3)]"
          }`}
        >
          {c.note}
        </p>
      </div>
    </section>
  );
}
