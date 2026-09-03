import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.author.name} — AI-assisted ISO 27001 compliance`,
  description:
    "Portfolio and working demo: an ISO/IEC 27001:2022 gap & evidence analyser built on Claude, with an evaluation harness and a process case study.",
};

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur">
      <div className="container-x flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.author.name}
        </Link>
        <nav className="flex items-center gap-1 text-sm text-[var(--ink-2)]">
          <Link href="/tool" className="rounded-lg px-3 py-1.5 hover:bg-black/[0.04] hover:text-[var(--ink)]">
            Live tool
          </Link>
          <Link href="/case-study" className="rounded-lg px-3 py-1.5 hover:bg-black/[0.04] hover:text-[var(--ink)]">
            Case study
          </Link>
          <a
            href={siteConfig.links.repo}
            className="rounded-lg px-3 py-1.5 hover:bg-black/[0.04] hover:text-[var(--ink)]"
          >
            Code
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--line)]">
      <div className="container-x flex flex-col gap-2 py-10 text-sm text-[var(--ink-2)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          {siteConfig.author.name} · {siteConfig.author.location}
        </p>
        <div className="flex gap-4">
          <a href={`mailto:${siteConfig.author.email}`} className="hover:text-[var(--ink)]">
            Email
          </a>
          <a href={siteConfig.links.linkedin} className="hover:text-[var(--ink)]">
            LinkedIn
          </a>
          <a href={siteConfig.links.github} className="hover:text-[var(--ink)]">
            GitHub
          </a>
        </div>
      </div>
      <div className="container-x pb-10 text-xs text-[var(--ink-2)]/70">
        Sample company, its documents, and the assessment shown here are fictional and were
        written for this demo. ISO/IEC 27001 and 27002 text is not reproduced.
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
