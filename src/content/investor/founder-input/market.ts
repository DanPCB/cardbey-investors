import type { FounderInputRecord } from "../schemas/approvals";

export const marketInput: FounderInputRecord[] = [
  {
    id: "market-tam",
    value: "[TAM WITH SOURCE REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: true,
    confidential: false,
    owner: "Founder",
  },
  {
    id: "market-entry-segment",
    value: "[ENTRY SEGMENT CONFIRMATION REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: false,
    confidential: false,
    owner: "Founder",
  },
];
