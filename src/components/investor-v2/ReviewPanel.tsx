import {
  getMissingFounderInput,
  getConfidentialFounderInput,
} from "@/content/investor/founder-input";
import { getMediaFallbacks } from "@/content/investor/shared/media";
import { listBlockingApprovals } from "@/content/investor/shared/approvals";
import { investorContent, assertLanguageCompleteness } from "@/content/investor";
import {
  calculateReleaseGates,
  cutoverDecision,
  summarizeClaimAudit,
  summarizeLegalReview,
  summarizeReleaseGates,
} from "@/content/investor/release";
import { countDoctrineNarrativesByDepth } from "@/content/doctrine";
import { isInvestorV2ReviewMode } from "@/lib/featureFlags";

/**
 * Review-only summary. Must never render unless VITE_INVESTOR_V2_REVIEW_MODE is explicitly true.
 */
export function ReviewPanel() {
  if (!isInvestorV2ReviewMode()) return null;

  const missing = getMissingFounderInput();
  const confidential = getConfidentialFounderInput();
  const mediaMissing = getMediaFallbacks();
  const blocking = listBlockingApprovals();
  const lang = assertLanguageCompleteness(investorContent);
  const sections = investorContent.sections.length;
  const gates = calculateReleaseGates();
  const gateSummary = summarizeReleaseGates(gates);
  const claims = summarizeClaimAudit();
  const legal = summarizeLegalReview();
  const doctrine = countDoctrineNarrativesByDepth();

  return (
    <aside
      className="iv2-review-panel"
      data-review-mode="true"
      aria-label="Investor V2 review panel"
    >
      <h2>Review mode</h2>
      <p>Private soft-launch inspection only. Not for public production.</p>

      <h3>Release summary</h3>
      <ul>
        <li>
          Cutover decision: <strong>{cutoverDecision.decision}</strong>
        </li>
        <li>Route strategy: Option {cutoverDecision.proposedRouteStrategy}</li>
        <li>
          Gates: {gateSummary.passed} passed · {gateSummary.conditional} conditional ·{" "}
          {gateSummary.blocked} blocked
        </li>
        <li>Primary cutover blocked: {gateSummary.cutoverBlocked ? "yes" : "no"}</li>
        <li>
          Claims: {claims.publicApproved} public-approved · {claims.blocked} blocked ·{" "}
          {claims.revise} revise
        </li>
        <li>
          Legal: {legal.approved} approved · {legal.publicOpen} public-open
        </li>
        <li>
          Doctrine narratives: {doctrine.publicTotal} public ·{" "}
          {doctrine.missingOrUnpublished} unpublished
        </li>
      </ul>

      <details open>
        <summary>Gate statuses</summary>
        <ul>
          {gates.map((gate) => (
            <li key={gate.id}>
              {gate.label}: {gate.status}
            </li>
          ))}
        </ul>
      </details>

      <ul>
        <li>Sections registered: {sections}</li>
        <li>Missing / unconfirmed founder inputs: {missing.length}</li>
        <li>Confidential founder inputs: {confidential.length}</li>
        <li>Media awaiting approval/assets: {mediaMissing.length}</li>
        <li>Blocking approvals: {blocking.length}</li>
        <li>
          Language completeness: {lang.ok ? "ok" : `issues (${lang.errors.length})`}
        </li>
      </ul>
      <details>
        <summary>Missing founder input IDs</summary>
        <ul>
          {missing.slice(0, 40).map((item) => (
            <li key={item.id}>
              {item.id} · {item.status}
            </li>
          ))}
        </ul>
      </details>
    </aside>
  );
}
