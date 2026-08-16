import type { FounderInputRecord } from "../schemas/approvals";

export const legalInput: FounderInputRecord[] = [
  {
    id: "legal-public-disclaimer-ok",
    value: "[LEGAL DISCLAIMER APPROVAL REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: false,
    confidential: false,
    owner: "Counsel",
  },
  {
    id: "legal-safe-public-ok",
    value: "[SAFE PUBLIC DISCLOSURE APPROVAL REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: true,
    confidential: true,
    owner: "Counsel",
  },
];
