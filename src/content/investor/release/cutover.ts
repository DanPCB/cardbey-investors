import {
  allMandatoryGatesAcceptable,
  calculateReleaseGates,
  gateBlocksCutover,
  summarizeReleaseGates,
} from "./gates";

export type CutoverDecisionValue =
  | "APPROVE_CUTOVER"
  | "APPROVE_PRIVATE_SOFT_LAUNCH"
  | "HOLD_FOR_EVIDENCE"
  | "HOLD_FOR_LEGAL"
  | "REJECT_CUTOVER";

export type CutoverOption = "A" | "B" | "C" | "D";

export type CutoverDecisionRecord = {
  decision: CutoverDecisionValue;
  proposedReleaseDate?: string;
  proposedRouteStrategy: CutoverOption;
  legalStatus: string;
  evidenceStatus: string;
  knownRisks: string[];
  remainingConditions: string[];
  rollbackPlanDoc: string;
  monitoringPlanDoc: string;
  responsibleOwner: string;
  recordedAt: string;
  explicitFounderApproval: boolean;
  notes: string;
};

/**
 * Explicit cutover decision for Phase 4.
 * APPROVE_CUTOVER must never be set without founder approval recorded here.
 */
export const cutoverDecision: CutoverDecisionRecord = {
  decision: "HOLD_FOR_EVIDENCE",
  proposedRouteStrategy: "A",
  legalStatus: "Open — disclaimer, solicitation, privacy, risk items incomplete",
  evidenceStatus:
    "Product/execution proof present; no public-approved media; commercial metrics gated",
  knownRisks: [
    "Public soft launch without product screenshots may feel thin",
    "Contact founder display name not yet bound to approved founder-input",
    "Legal reviewer not identified",
  ],
  remainingConditions: [
    "Confirm or keep founder-led team fallback",
    "Approve product media assets before implying visual proof",
    "Complete legal disclaimer and risk disclosure",
    "Confirm soft-launch narrative founder-input approval",
    "Explicit founder approval required before APPROVE_CUTOVER",
  ],
  rollbackPlanDoc: "docs/investor-v2/INVESTOR_V2_ROLLBACK_PLAN.md",
  monitoringPlanDoc: "docs/investor-v2/INVESTOR_V2_POST_LAUNCH_MONITORING.md",
  responsibleOwner: "founder",
  recordedAt: "2026-08-02",
  explicitFounderApproval: false,
  notes:
    "Continue Option A private preview on /investors-v2. Option B/C blocked until evidence and legal gates clear. Legacy / untouched.",
};

export function getActiveCutoverOption(): CutoverOption {
  return cutoverDecision.proposedRouteStrategy;
}

export function isPrimaryCutoverApproved(): boolean {
  return (
    cutoverDecision.decision === "APPROVE_CUTOVER" &&
    cutoverDecision.explicitFounderApproval === true &&
    !gateBlocksCutover() &&
    allMandatoryGatesAcceptable()
  );
}

export function assertCutoverConsistency(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  const gates = calculateReleaseGates();
  const summary = summarizeReleaseGates(gates);

  if (cutoverDecision.decision === "APPROVE_CUTOVER") {
    if (!cutoverDecision.explicitFounderApproval) {
      errors.push("APPROVE_CUTOVER requires explicitFounderApproval=true");
    }
    if (summary.cutoverBlocked) {
      errors.push("APPROVE_CUTOVER requires all mandatory gates acceptable");
    }
    if (cutoverDecision.proposedRouteStrategy !== "C") {
      errors.push("APPROVE_CUTOVER should use route strategy C");
    }
  }

  if (
    cutoverDecision.decision === "APPROVE_PRIVATE_SOFT_LAUNCH" &&
    cutoverDecision.proposedRouteStrategy === "C"
  ) {
    errors.push("Private soft launch must not use primary route strategy C");
  }

  return { ok: errors.length === 0, errors };
}
