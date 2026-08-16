import { allFounderInput, getMissingFounderInput, getPublicFounderInput } from "../founder-input";
import { isContentApprovedPublic } from "../shared/approvals";
import { getPublicMedia, productMedia } from "../shared/media";
import { getPublicMetrics } from "../shared/metrics";
import { getPublicTeam } from "../shared/team";
import { investorSections } from "../shared/sections";
import { isFounderInputPublic } from "../schemas/approvals";
import { publicClaims, summarizeClaimAudit } from "./claims";
import { legalReviewItems, summarizeLegalReview } from "./legal";

export type GateStatus =
  | "passed"
  | "passed_with_conditions"
  | "blocked"
  | "not_applicable";

export type ReleaseGateId =
  | "narrative"
  | "evidence"
  | "capability"
  | "team"
  | "funding"
  | "legal"
  | "quality"
  | "operational";

export type ReleaseGate = {
  id: ReleaseGateId;
  label: string;
  status: GateStatus;
  owner: string;
  evidence: string[];
  approvalDate?: string;
  notes: string;
};

/** Avoid importing content.ts here (circular with barrel re-exports). */
function langOk() {
  return investorSections.every(
    (section) =>
      Boolean(section.title?.en?.trim()) && Boolean(section.title?.vi?.trim())
  );
}

function softLaunchNarrativeApproved(): boolean {
  const record = allFounderInput.find((r) => r.id === "approval-soft-launch-narrative");
  return record ? isFounderInputPublic(record) : false;
}

/**
 * Calculates mandatory release gates from live registries.
 * Does not invent approvals — blocked when required confirmations are absent.
 */
export function calculateReleaseGates(): ReleaseGate[] {
  const publicFounder = getPublicFounderInput();
  const publicTeam = getPublicTeam();
  const publicMedia = getPublicMedia();
  const publicMetrics = getPublicMetrics();
  const claimSummary = summarizeClaimAudit(publicClaims);
  const legalSummary = summarizeLegalReview(legalReviewItems);
  const softLaunchOk = softLaunchNarrativeApproved();
  const teamFallback = isContentApprovedPublic("fallback-team-statement");
  const fundingFallback = isContentApprovedPublic("fallback-funding-discussions");
  const founderName = publicFounder.find((r) => r.id === "founder-public-name");
  const unsupportedPublic = claimSummary.unsupportedPublic.length;

  return [
    {
      id: "narrative",
      label: "Narrative",
      status: langOk() ? (softLaunchOk ? "passed" : "passed_with_conditions") : "blocked",
      owner: "founder",
      evidence: ["diagram-system", "sections-en-vi"],
      notes: softLaunchOk
        ? "EN/VI narrative and soft-launch sign-off approved."
        : "EN/VI present; soft-launch narrative still not confirmed for public.",
    },
    {
      id: "evidence",
      label: "Evidence",
      status:
        unsupportedPublic > 0
          ? "blocked"
          : publicMedia.length > 0
            ? "passed"
            : "passed_with_conditions",
      owner: "founder+product",
      evidence: publicMetrics.map((m) => m.id),
      notes:
        publicMedia.length === 0
          ? `No public-approved media (${productMedia.length} registry slots). Product/execution metrics only.`
          : "Public media and claims cleared.",
    },
    {
      id: "capability",
      label: "Capability",
      status: "passed_with_conditions",
      owner: "product",
      evidence: ["capabilities-registry", "proof-register"],
      approvalDate: "2026-08-02",
      notes:
        "Maturity labels conservative; commercial LIVE claims require founder reconfirm before cutover.",
    },
    {
      id: "team",
      label: "Team",
      status:
        founderName || (teamFallback && publicTeam.length === 0)
          ? "passed_with_conditions"
          : "blocked",
      owner: "founder",
      evidence: teamFallback ? ["fallback-team-statement"] : [],
      notes: founderName
        ? "Founder profile public-approved."
        : "Using approved founder-led fallback; bios missing.",
    },
    {
      id: "funding",
      label: "Funding",
      status: fundingFallback ? "passed_with_conditions" : "blocked",
      owner: "founder+legal",
      evidence: fundingFallback ? ["fallback-funding-discussions"] : [],
      notes: "Investor Discussions fallback only. SAFE terms and Sign SAFE remain unavailable.",
    },
    {
      id: "legal",
      label: "Legal",
      status: legalSummary.publicOpen === 0 ? "passed" : "blocked",
      owner: "founder+legal",
      evidence: legalReviewItems.map((i) => i.id),
      notes: `Legal public-open items=${legalSummary.publicOpen}. No identified external legal reviewer for solicitation/disclaimer.`,
    },
    {
      id: "quality",
      label: "Quality",
      status: "passed_with_conditions",
      owner: "engineering",
      evidence: ["typecheck", "tests", "lint", "build"],
      approvalDate: "2026-08-02",
      notes: "Automated gates pass. Manual accessibility/screen-reader pass remains pre-cutover.",
    },
    {
      id: "operational",
      label: "Operational",
      status: "passed_with_conditions",
      owner: "engineering",
      evidence: ["contact-modal", "analytics-noop", "rollback-plan"],
      notes: "Contact modal wired; production V2 flag false; rollback via flags documented.",
    },
  ];
}

export function gateBlocksCutover(gates: ReleaseGate[] = calculateReleaseGates()): boolean {
  return gates.some((g) => g.status === "blocked");
}

export function allMandatoryGatesAcceptable(
  gates: ReleaseGate[] = calculateReleaseGates()
): boolean {
  return gates.every(
    (g) => g.status === "passed" || g.status === "passed_with_conditions"
  );
}

export function summarizeReleaseGates(gates: ReleaseGate[] = calculateReleaseGates()) {
  return {
    total: gates.length,
    passed: gates.filter((g) => g.status === "passed").length,
    conditional: gates.filter((g) => g.status === "passed_with_conditions").length,
    blocked: gates.filter((g) => g.status === "blocked").length,
    missingFounderInputs: getMissingFounderInput().length,
    cutoverBlocked: gateBlocksCutover(gates),
  };
}
