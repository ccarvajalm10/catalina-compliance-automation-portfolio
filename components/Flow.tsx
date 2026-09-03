/**
 * Vertical workflow diagram. Pure presentational, no client JS.
 * Used on the case-study pages to show the governed AI workflow as a picture.
 */

export type FlowStep = {
  title: string;
  sub?: string;
  /** small chips shown under the node, e.g. retrieval sources */
  branch?: string[];
  /** highlight this node in the page accent colour */
  accent?: boolean;
  /** render as a dashed "gate" (human approval, guardrail) */
  gate?: boolean;
};

export function Flow({ steps, className = "" }: { steps: FlowStep[]; className?: string }) {
  return (
    <div className={`flow ${className}`} role="list" aria-label="Workflow steps">
      {steps.map((s, i) => (
        <FlowItem key={s.title} step={s} last={i === steps.length - 1} />
      ))}
    </div>
  );
}

function FlowItem({ step, last }: { step: FlowStep; last: boolean }) {
  return (
    <>
      <div
        role="listitem"
        className={`flow-node ${step.accent ? "is-accent" : ""} ${step.gate ? "is-gate" : ""}`}
      >
        <div className="n-title">{step.title}</div>
        {step.sub && <div className="n-sub">{step.sub}</div>}
      </div>

      {step.branch && step.branch.length > 0 && (
        <>
          <div className="flow-arrow" aria-hidden />
          <div className="flow-branch" aria-hidden>
            {step.branch.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </>
      )}

      {!last && <div className="flow-arrow" aria-hidden />}
    </>
  );
}
