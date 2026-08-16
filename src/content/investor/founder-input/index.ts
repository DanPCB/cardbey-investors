import { isFounderInputPublic, type FounderInputRecord } from "../schemas/approvals";
import { businessModelInput } from "./businessModel";
import { companyInput } from "./company";
import { founderInput } from "./founder";
import { fundingInput } from "./funding";
import { legalInput } from "./legal";
import { marketInput } from "./market";
import { milestonesInput } from "./milestones";
import { teamInput } from "./team";
import { tractionInput } from "./traction";
import { founderApprovalsInput } from "./approvals";

export const allFounderInput: FounderInputRecord[] = [
  ...companyInput,
  ...founderInput,
  ...teamInput,
  ...tractionInput,
  ...fundingInput,
  ...marketInput,
  ...businessModelInput,
  ...milestonesInput,
  ...legalInput,
  ...founderApprovalsInput,
];

export function getPublicFounderInput(list: FounderInputRecord[] = allFounderInput) {
  return list.filter(isFounderInputPublic);
}

export function getMissingFounderInput(list: FounderInputRecord[] = allFounderInput) {
  return list.filter(
    (r) =>
      r.status === "missing" ||
      r.status === "needs_evidence" ||
      r.status === "rejected" ||
      r.status === "expired" ||
      (r.status !== "confirmed" && !r.approvedForPublic)
  );
}

export function getConfidentialFounderInput(list: FounderInputRecord[] = allFounderInput) {
  return list.filter((r) => r.confidential);
}

export * from "./company";
export * from "./founder";
export * from "./team";
export * from "./traction";
export * from "./funding";
export * from "./market";
export * from "./businessModel";
export * from "./milestones";
export * from "./legal";
export * from "./approvals";
