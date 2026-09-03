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
          The full 93-control assessment below is the reference run.{" "}
          {live
            ? "The live sample calls the model."
            : "The live sample shows the reference verdicts for four controls; a model call is used when the site is configured with a key."}
        </div>
      </div>
      <ToolClient initial={initial} controls={[...CONTROLS]} liveEnabled={live} />
    </>
  );
}
