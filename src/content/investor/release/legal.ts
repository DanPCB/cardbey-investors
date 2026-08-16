export type LegalReviewStatus =
  | "not_started"
  | "in_progress"
  | "changes_required"
  | "approved"
  | "blocked"
  | "expired";

export type LegalReviewItem = {
  id: string;
  contentId: string;
  category:
    | "solicitation"
    | "safe"
    | "projections"
    | "returns"
    | "valuation"
    | "eligibility"
    | "privacy"
    | "contact"
    | "customer"
    | "market_source"
    | "ip"
    | "competition"
    | "forward_looking"
    | "risk";
  issue: string;
  jurisdiction?: string;
  reviewer?: string;
  reviewStatus: LegalReviewStatus;
  requiredChanges?: string;
  approvalDate?: string;
  expiryDate?: string;
  publicVisibility: boolean;
  notes?: string;
};

/**
 * Legal review register — Phase 4.
 * No item is marked approved without an identified reviewer or explicit founder-authorized decision.
 */
export const legalReviewItems: LegalReviewItem[] = [
  {
    id: "legal-solicitation",
    contentId: "funding-section",
    category: "solicitation",
    issue: "Investment solicitation / invitation wording",
    jurisdiction: "AU",
    reviewStatus: "blocked",
    publicVisibility: true,
    notes: "Uses Investor Discussions fallback; external legal review not recorded.",
  },
  {
    id: "legal-safe",
    contentId: "res-safe-en",
    category: "safe",
    issue: "SAFE references and public availability",
    reviewStatus: "blocked",
    publicVisibility: false,
    notes: "SAFE docs marked unavailable; no Sign SAFE CTA.",
  },
  {
    id: "legal-projections",
    contentId: "financial-projections",
    category: "projections",
    issue: "Financial projections on public page",
    reviewStatus: "approved",
    reviewer: "phase4-default-exclusion",
    approvalDate: "2026-08-02",
    publicVisibility: false,
    notes: "Approved exclusion — projections not published.",
  },
  {
    id: "legal-valuation",
    contentId: "funding-valuation",
    category: "valuation",
    issue: "Valuation language",
    reviewStatus: "approved",
    reviewer: "phase4-default-exclusion",
    approvalDate: "2026-08-02",
    publicVisibility: false,
    notes: "Approved exclusion — no public valuation.",
  },
  {
    id: "legal-privacy-contact",
    contentId: "contact-modal",
    category: "privacy",
    issue: "Contact form data handling disclosure",
    reviewStatus: "in_progress",
    publicVisibility: true,
    notes: "Contact collects name/email/message; privacy disclosure should be confirmed before cutover.",
  },
  {
    id: "legal-customer-media",
    contentId: "product-media",
    category: "customer",
    issue: "Customer logos / identifiable media",
    reviewStatus: "blocked",
    publicVisibility: false,
    notes: "No public media; customer-sensitive items require approval.",
  },
  {
    id: "legal-market-sources",
    contentId: "market-figures",
    category: "market_source",
    issue: "Market-source usage rights",
    reviewStatus: "approved",
    reviewer: "phase4-default-exclusion",
    approvalDate: "2026-08-02",
    publicVisibility: false,
    notes: "Approved exclusion — no TAM/SAM published.",
  },
  {
    id: "legal-forward-looking",
    contentId: "roadmap-expansion",
    category: "forward_looking",
    issue: "Forward-looking / expansion statements",
    reviewStatus: "in_progress",
    publicVisibility: true,
    notes: "Roadmap framed as direction; risk disclosure section recommended before primary cutover.",
  },
  {
    id: "legal-risk",
    contentId: "risk-disclosure",
    category: "risk",
    issue: "Risk and forward-looking disclosure block",
    reviewStatus: "not_started",
    publicVisibility: true,
    notes: "Restrained risk section prepared in docs; not yet approved for public render.",
  },
  {
    id: "legal-disclaimer",
    contentId: "legal-public-disclaimer-ok",
    category: "solicitation",
    issue: "Public legal disclaimer / company line",
    reviewStatus: "blocked",
    publicVisibility: true,
    notes: "Founder-input legal-public-disclaimer-ok still missing.",
  },
];

export function summarizeLegalReview(items: LegalReviewItem[] = legalReviewItems) {
  const openStatuses: LegalReviewStatus[] = [
    "not_started",
    "in_progress",
    "changes_required",
    "blocked",
    "expired",
  ];
  return {
    total: items.length,
    approved: items.filter((i) => i.reviewStatus === "approved").length,
    open: items.filter((i) => openStatuses.includes(i.reviewStatus)).length,
    publicOpen: items.filter(
      (i) => i.publicVisibility && openStatuses.includes(i.reviewStatus)
    ).length,
  };
}

export function isLegalItemPublicApproved(item: LegalReviewItem): boolean {
  return item.reviewStatus === "approved" && Boolean(item.reviewer);
}
