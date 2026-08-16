import type { ContentApproval } from "../schemas/approvals";
import { isApprovalPublic } from "../schemas/approvals";

/**
 * Local approval registry — not a CMS.
 * Only approved_public items may influence public rendering of gated content.
 */
export const contentApprovals: ContentApproval[] = [
  {
    contentId: "fallback-team-statement",
    contentType: "fallback",
    status: "approved_public",
    approvedBy: "phase3-default",
    approvedAt: "2026-08-02",
    notes: "Generic founder-led statement without years/achievements.",
  },
  {
    contentId: "fallback-funding-discussions",
    contentType: "fallback",
    status: "approved_public",
    approvedBy: "phase3-default",
    approvedAt: "2026-08-02",
    notes: "Controlled funding section without terms.",
  },
  {
    contentId: "diagram-system",
    contentType: "claim",
    status: "approved_public",
    approvedBy: "phase3-default",
    approvedAt: "2026-08-02",
  },
];

export function getApproval(contentId: string) {
  return contentApprovals.find((a) => a.contentId === contentId);
}

export function isContentApprovedPublic(contentId: string): boolean {
  const approval = getApproval(contentId);
  if (!approval) return false;
  if (approval.status === "rejected" || approval.status === "expired") return false;
  if (approval.expiresAt && Date.parse(approval.expiresAt) < Date.now()) return false;
  return isApprovalPublic(approval.status);
}

export function listBlockingApprovals() {
  return contentApprovals.filter(
    (a) =>
      a.status === "needs_evidence" ||
      a.status === "draft" ||
      a.status === "legal_review" ||
      a.status === "rejected" ||
      a.status === "expired"
  );
}
