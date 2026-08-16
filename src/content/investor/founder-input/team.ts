import type { FounderInputRecord } from "../schemas/approvals";

export const teamInput: FounderInputRecord[] = [
  {
    id: "team-member-1",
    value: "[TEAM MEMBER PROFILE REQUIRED]",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: false,
    confidential: false,
    owner: "Founder",
  },
];
