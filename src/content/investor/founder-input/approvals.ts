import type { FounderInputRecord } from "../schemas/approvals";

/** Meta approvals for soft-launch readiness */
export const founderApprovalsInput: FounderInputRecord[] = [
  {
    id: "approval-soft-launch-narrative",
    value: "pending",
    status: "under_review",
    approvedForPublic: false,
    approvedForInvestorOnly: false,
    confidential: false,
    owner: "Founder",
    reviewNotes: "Narrative ready for private review; not production cutover.",
  },
];
