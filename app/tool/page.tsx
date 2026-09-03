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
          The full 93-control assessment below is a recorded run.{" "}
          {live
            ? "This server has an API key, so the live sample calls the model."
            : "The live sample returns recorded verdicts until a spending-capped key is added."}
        </div>
      </div>
      <ToolClient initial={initial} controls={[...CONTROLS]} liveEnabled={live} />
    </>
  );
}
