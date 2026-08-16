import type { CustomerDoctrineNarrative } from "./types";

function missingSlot(
  id: string,
  partial?: Partial<CustomerDoctrineNarrative>
): CustomerDoctrineNarrative {
  return {
    id,
    publicLabel: "[ANONYMIZED LABEL REQUIRED]",
    segment: "[SEGMENT REQUIRED]",
    initialProblem: "[INITIAL PROBLEM REQUIRED]",
    resourcesInvolved: [],
    whatCardbeySolved: "[WHAT CARDBEY SOLVED REQUIRED]",
    surfacesInvolved: [],
    engagementType: "unknown",
    capabilityIncreased: "[CAPABILITY INCREASE REQUIRED]",
    relationshipExpanded: null,
    priorKnowledgeHelped: null,
    moduleCompounding: null,
    depth: "unknown",
    status: "missing",
    approvedForPublic: false,
    approvedForInvestorOnly: false,
    confidential: false,
    customerIdentityApproved: false,
    ...partial,
  };
}

/**
 * Intake slots — empty until founder-confirmed.
 * Do not invent customer facts to fill these.
 */
export const customerDoctrineNarratives: CustomerDoctrineNarrative[] = [
  missingSlot("cdn-001"),
  missingSlot("cdn-002"),
  missingSlot("cdn-003"),
];

function looksLikePlaceholder(value: string): boolean {
  return !value.trim() || value.includes("[") || /REQUIRED/i.test(value);
}

/** Hard public gate — mirrors founder-input discipline */
export function canPublishDoctrineNarrativePublicly(
  narrative: CustomerDoctrineNarrative
): boolean {
  if (narrative.status !== "confirmed") return false;
  if (!narrative.approvedForPublic) return false;
  if (narrative.confidential) return false;
  if (looksLikePlaceholder(narrative.publicLabel)) return false;
  if (looksLikePlaceholder(narrative.initialProblem)) return false;
  if (looksLikePlaceholder(narrative.whatCardbeySolved)) return false;
  if (looksLikePlaceholder(narrative.capabilityIncreased)) return false;
  if (narrative.realName && !narrative.customerIdentityApproved) return false;
  return true;
}

export function getPublicDoctrineNarratives(
  list: CustomerDoctrineNarrative[] = customerDoctrineNarratives
) {
  return list.filter(canPublishDoctrineNarrativePublicly);
}

export function getMissingDoctrineNarratives(
  list: CustomerDoctrineNarrative[] = customerDoctrineNarratives
) {
  return list.filter((n) => !canPublishDoctrineNarrativePublicly(n));
}

export function countDoctrineNarrativesByDepth(
  list: CustomerDoctrineNarrative[] = customerDoctrineNarratives
) {
  const pub = getPublicDoctrineNarratives(list);
  return {
    publicTotal: pub.length,
    solveOnly: pub.filter((n) => n.depth === "solve_only").length,
    deepened: pub.filter((n) => n.depth === "relationship_deepened").length,
    compounding: pub.filter((n) => n.depth === "module_compounding").length,
    intakeSlots: list.length,
    missingOrUnpublished: getMissingDoctrineNarratives(list).length,
  };
}
