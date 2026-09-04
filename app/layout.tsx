import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${siteConfig.author.name}, ${siteConfig.author.title}`,
  description:
    "A portfolio of three worked examples on using governed AI workflows to make governance, privacy and AI-governance work faster: an ISO/IEC 27001 gap analysis (with a live tool), a GDPR Data Processing Agreement review, and EU AI Act readiness.",
};

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_86%,transparent)] backdrop-blur">
      <div className="container-x flex h-[60px] items-center justify-between py-3">
        <Link href="/" className="font-serif text-[19px] font-medium tracking-tight">
          {siteConfig.author.name}
        </Link>
        <nav className="flex items-center gap-1 text-[13.5px] text-[var(--ink-2)]">
          <Link href="/case-study" className="rounded-lg px-3 py-1.5 hover:bg-black/[0.04] hover:text-[var(--ink)]">
            Case studies
          </Link>
          <Link href="/tool" className="rounded-lg px-3 py-1.5 hover:bg-black/[0.04] hover:text-[var(--ink)]">
            Live tool
          </Link>
          <Link href="/resources" className="rounded-lg px-3 py-1.5 hover:bg-black/[0.04] hover:text-[var(--ink)]">
            Resources
          </Link>
          <Link href="/how-it-was-built" className="rounded-lg px-3 py-1.5 hover:bg-black/[0.04] hover:text-[var(--ink)]">
            Method
          </Link>
          <Link href="/#contact" className="rounded-lg px-3 py-1.5 hover:bg-black/[0.04] hover:text-[var(--ink)]">
            Contact
          </Link>
          <a
            href={siteConfig.links.repo}
            className="ml-1 rounded-lg border border-[var(--line-2)] px-3 py-1.5 hover:border-[var(--ink-3)] hover:text-[var(--ink)]"
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
      <div className="container-x flex flex-col gap-3 py-10 text-[13.5px] text-[var(--ink-2)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          {siteConfig.author.name}, {siteConfig.author.title}. {siteConfig.author.location}.
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
      <div className="container-x pb-10 text-[11.5px] leading-relaxed text-[var(--ink-3)]">
        The sample company, its documents and the assessment shown in the live tool are
        fictional and were written for this demonstration. ISO/IEC 27001 and 27002 are
        copyright works of ISO/IEC and their text is not reproduced here.
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
