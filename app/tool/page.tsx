import type { Metadata } from "next";
import ToolClient from "@/components/ToolClient";
import { CONTROLS } from "@/lib/controls";
import { getDemoAnalysis, hasApiKey } from "@/lib/loadAnalysis";
import { COMPANY_PROFILE } from "@/lib/company";

export const metadata: Metadata = {
  title: "Live tool: ISO 27001 Gap & Evidence Analyzer",
};

export default function ToolPage() {
  const initial = getDemoAnalysis();
  const live = hasApiKey();

  return (
    <>
      <div className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="container-x py-4 text-[13px] leading-relaxed text-[var(--ink-2)]">
          <span className="font-semibold text-[var(--ink)]">About this data. </span>
          {COMPANY_PROFILE.replace(/\s+/g, " ")}{" "}
          {live
            ? "This server has an API key configured, so the run button calls the model."
            : "No API key is configured here, so the run button replays the recorded assessment. Run the repository locally with a key to execute a fresh pass."}
        </div>
      </div>
      <ToolClient initial={initial} controls={[...CONTROLS]} liveEnabled={live} />
    </>
  );
}
