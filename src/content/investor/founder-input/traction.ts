import type { FounderInputRecord } from "../schemas/approvals";

export const tractionInput: FounderInputRecord[] = [
  {
    id: "traction-customers",
    value: "[LIVE CUSTOMER COUNT REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: true,
    confidential: false,
    owner: "Founder",
  },
  {
    id: "traction-devices",
    value: "[DEVICE COUNT REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: true,
    confidential: false,
    owner: "Founder",
  },
  {
    id: "traction-revenue",
    value: "[COMMERCIAL REVENUE REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: true,
    confidential: true,
    owner: "Founder",
  },
];
