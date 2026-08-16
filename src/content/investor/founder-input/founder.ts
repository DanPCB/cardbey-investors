import type { FounderInputRecord } from "../schemas/approvals";

export const founderInput: FounderInputRecord[] = [
  {
    id: "founder-public-name",
    value: "[FOUNDER PUBLIC NAME REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: false,
    confidential: false,
    owner: "Founder",
  },
  {
    id: "founder-title",
    value: "[FOUNDER TITLE REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: false,
    confidential: false,
    owner: "Founder",
  },
  {
    id: "founder-bio",
    value: "[FOUNDER BIO REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: false,
    confidential: false,
    owner: "Founder",
  },
  {
    id: "founder-linkedin",
    value: "[LINKEDIN URL REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: false,
    confidential: false,
    owner: "Founder",
  },
];
