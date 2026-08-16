/**
 * Public claim audit registry — Phase 4.
 * Records exact public-facing claims and their launch disposition.
 * Unsupported commercial/funding claims must not appear in public mode.
 */

export type ClaimAuditResult =
  | "approved"
  | "revise"
  | "remove"
  | "investor_only"
  | "blocked";

export type PublicClaimAuditItem = {
  id: string;
  wording: string;
  section: string;
  category:
    | "narrative"
    | "capability"
    | "metric"
    | "team"
    | "funding"
    | "market"
    | "legal"
    | "media"
    | "resource";
  evidenceId?: string;
  approvalId?: string;
  maturity?: string;
  publicVisibility: boolean;
  reviewer?: string;
  lastReviewedAt?: string;
  expiresAt?: string;
  result: ClaimAuditResult;
  notes?: string;
};

export const publicClaims: PublicClaimAuditItem[] = [
  {
    id: "claim-os-positioning",
    wording:
      "Cardbey is an AI-powered business operating system connecting creation, operation, distribution and growth.",
    section: "hero",
    category: "narrative",
    evidenceId: "diagram-system",
    approvalId: "diagram-system",
    publicVisibility: true,
    reviewer: "phase3-default",
    lastReviewedAt: "2026-08-02",
    result: "approved",
    notes: "Strategic positioning; not a commercial KPI.",
  },
  {
    id: "claim-product-surfaces",
    wording: "Platform surfaces with repository evidence (storefront, performer, devices, rewards, signage).",
    section: "traction",
    category: "metric",
    evidenceId: "metric-platform-surfaces",
    approvalId: "diagram-system",
    maturity: "development/pilot-mixed",
    publicVisibility: true,
    reviewer: "phase2-audit",
    lastReviewedAt: "2026-08-02",
    result: "approved",
    notes: "Product/execution proof only.",
  },
  {
    id: "claim-device-modules",
    wording: "Device runtime modules evidenced: pairing · heartbeat · playlist · repair.",
    section: "traction",
    category: "metric",
    evidenceId: "metric-device-runtime-modules",
    publicVisibility: true,
    reviewer: "phase2-audit",
    lastReviewedAt: "2026-08-02",
    result: "approved",
    notes: "Codebase evidence; not deployment count.",
  },
  {
    id: "claim-team-fallback",
    wording: "Cardbey is currently founder-led…",
    section: "team",
    category: "team",
    approvalId: "fallback-team-statement",
    publicVisibility: true,
    reviewer: "phase3-default",
    lastReviewedAt: "2026-08-02",
    result: "approved",
    notes: "Fallback until bios confirmed.",
  },
  {
    id: "claim-funding-discussions",
    wording: "Investor Discussions — detailed funding via direct conversation.",
    section: "funding",
    category: "funding",
    approvalId: "fallback-funding-discussions",
    publicVisibility: true,
    reviewer: "phase3-default",
    lastReviewedAt: "2026-08-02",
    result: "approved",
    notes: "No SAFE terms or amounts.",
  },
  {
    id: "claim-safe-terms",
    wording: "SAFE valuation / discount / Sign SAFE CTA",
    section: "funding",
    category: "funding",
    publicVisibility: false,
    result: "blocked",
    notes: "Must not render publicly until legal + founder approval.",
  },
  {
    id: "claim-customer-count",
    wording: "Live customer count",
    section: "traction",
    category: "metric",
    publicVisibility: false,
    result: "blocked",
    notes: "Placeholder metric; excluded from public metrics filter.",
  },
  {
    id: "claim-revenue",
    wording: "Commercial revenue figure",
    section: "traction",
    category: "metric",
    publicVisibility: false,
    result: "blocked",
    notes: "Confidential / missing founder input.",
  },
  {
    id: "claim-market-tam",
    wording: "TAM / SAM / SOM figures",
    section: "market-entry",
    category: "market",
    publicVisibility: false,
    result: "blocked",
    notes: "No sourced market records.",
  },
  {
    id: "claim-founder-bio",
    wording: "Founder biography and experience duration",
    section: "team",
    category: "team",
    publicVisibility: false,
    result: "blocked",
    notes: "Awaiting founder-input confirmation.",
  },
  {
    id: "claim-product-screenshots",
    wording: "Product media galleries as deployed commercial proof",
    section: "what-built",
    category: "media",
    publicVisibility: false,
    result: "revise",
    notes: "Galleries collapse until assets approved; do not imply screenshot proof exists.",
  },
];

export function summarizeClaimAudit(claims: PublicClaimAuditItem[] = publicClaims) {
  return {
    total: claims.length,
    approved: claims.filter((c) => c.result === "approved").length,
    revise: claims.filter((c) => c.result === "revise").length,
    remove: claims.filter((c) => c.result === "remove").length,
    investor_only: claims.filter((c) => c.result === "investor_only").length,
    blocked: claims.filter((c) => c.result === "blocked").length,
    publicApproved: claims.filter((c) => c.publicVisibility && c.result === "approved").length,
    unsupportedPublic: claims.filter((c) => c.publicVisibility && c.result !== "approved"),
  };
}

/** Public mode may only surface claims that are approved + publicVisibility. */
export function getPublicApprovedClaims(claims: PublicClaimAuditItem[] = publicClaims) {
  return claims.filter((c) => c.publicVisibility && c.result === "approved");
}

export function claimRequiresEvidence(claim: PublicClaimAuditItem): boolean {
  if (!claim.publicVisibility || claim.result !== "approved") return false;
  return Boolean(claim.evidenceId || claim.approvalId);
}
