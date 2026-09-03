import type { Metadata } from "next";
import ToolClient from "@/components/ToolClient";
import { CONTROLS } from "@/lib/controls";
import { getDemoAnalysis, hasApiKey } from "@/lib/loadAnalysis";
import { COMPANY_PROFILE } from "@/lib/company";

export const metadata: Metadata = {
  title: "Live tool — ISO 27001 Gap & Evidence Analyzer",
};

export default function ToolPage() {
  const initial = getDemoAnalysis();
  const live = hasApiKey();

  return (
    <>
      <div className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="container-x py-4 text-sm text-[var(--ink-2)]">
          <span className="font-[600] text-[var(--ink)]">About this data. </span>
          {COMPANY_PROFILE.replace(/\s+/g, " ")}{" "}
          {live
            ? "This server has an API key configured — “Run live analysis” calls the model."
            : "No API key is configured here, so “Run live analysis” returns the same pre-computed result. Run the repo locally with a key for a live pass."}
        </div>
      </div>
      <ToolClient initial={initial} controls={[...CONTROLS]} />
    </>
  );
}
