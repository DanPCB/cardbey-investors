export type ConfirmationStatus =
  | "missing"
  | "submitted"
  | "needs_evidence"
  | "under_review"
  | "confirmed"
  | "rejected"
  | "expired";

export type ContentApprovalStatus =
  | "draft"
  | "needs_evidence"
  | "founder_confirmed"
  | "legal_review"
  | "approved_public"
  | "approved_private"
  | "rejected"
  | "expired";

export type ContentApprovalType =
  | "claim"
  | "metric"
  | "proof"
  | "media"
  | "team"
  | "funding"
  | "market"
  | "legal"
  | "fallback";

export type ContentApproval = {
  contentId: string;
  contentType: ContentApprovalType;
  status: ContentApprovalStatus;
  approvedBy?: string;
  approvedAt?: string;
  evidenceIds?: string[];
  notes?: string;
  expiresAt?: string;
};

export type FounderInputRecord<T = string> = {
  id: string;
  value: T;
  status: ConfirmationStatus;
  source?: string;
  evidenceReference?: string;
  approvedForPublic: boolean;
  approvedForInvestorOnly: boolean;
  confidential: boolean;
  owner?: string;
  reviewedAt?: string;
  reviewNotes?: string;
};

export function isApprovalPublic(status: ContentApprovalStatus): boolean {
  return status === "approved_public";
}

export function isApprovalUsable(status: ContentApprovalStatus): boolean {
  return status === "approved_public" || status === "approved_private";
}

export function isFounderInputPublic(record: FounderInputRecord): boolean {
  return (
    record.status === "confirmed" &&
    record.approvedForPublic &&
    !record.confidential &&
    !!String(record.value ?? "").trim() &&
    !String(record.value).includes("[")
  );
}

export function isFounderInputInvestorOnly(record: FounderInputRecord): boolean {
  return (
    record.status === "confirmed" &&
    record.approvedForInvestorOnly &&
    !record.confidential &&
    !!String(record.value ?? "").trim()
  );
}
