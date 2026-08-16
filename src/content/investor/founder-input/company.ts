import type { FounderInputRecord } from "../schemas/approvals";

export const companyInput: FounderInputRecord[] = [
  {
    id: "company-legal-name",
    value: "SIGNSCATER PTY LTD",
    status: "confirmed",
    source: "Founder",
    approvedForPublic: true,
    approvedForInvestorOnly: true,
    confidential: false,
    owner: "Founder",
    reviewedAt: "2026-08-16",
  },
  {
    id: "company-abn-acn",
    value: "ABN 50 685 406 697 · ACN 685 406 697",
    status: "confirmed",
    source: "Founder",
    approvedForPublic: true,
    approvedForInvestorOnly: true,
    confidential: false,
    owner: "Founder",
    reviewedAt: "2026-08-16",
  },
  {
    id: "company-jurisdiction",
    value: "[JURISDICTION REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: true,
    confidential: false,
    owner: "Founder",
  },
];
