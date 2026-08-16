import type { ConfirmationStatus } from "../investor/schemas/approvals";

export type DoctrineNarrativeDepth =
  | "solve_only"
  | "relationship_deepened"
  | "module_compounding"
  | "unknown";

export type DoctrineResourcePillar =
  | "market"
  | "intelligence"
  | "infrastructure"
  | "capital";

/**
 * Customer Doctrine Narrative — company validation record.
 * Not a marketing testimonial. Public only via canPublishDoctrineNarrativePublicly.
 */
export type CustomerDoctrineNarrative = {
  id: string;
  /** Anonymized label preferred until identity approved */
  publicLabel: string;
  realName?: string;
  segment: string;
  geography?: string;
  initialProblem: string;
  resourcesInvolved: DoctrineResourcePillar[];
  whatCardbeySolved: string;
  surfacesInvolved: string[];
  engagementType: "paid" | "pilot" | "internal" | "informal" | "unknown";
  capabilityIncreased: string;
  capabilityEvidenceSource?: string;
  relationshipExpanded: boolean | null;
  relationshipNotes?: string;
  priorKnowledgeHelped: boolean | null;
  moduleCompounding: boolean | null;
  modulesCompounded?: string[];
  systemValueNote?: string;
  depth: DoctrineNarrativeDepth;
  status: ConfirmationStatus;
  approvedForPublic: boolean;
  approvedForInvestorOnly: boolean;
  confidential: boolean;
  customerIdentityApproved: boolean;
  owner?: string;
  reviewedAt?: string;
  reviewNotes?: string;
};
