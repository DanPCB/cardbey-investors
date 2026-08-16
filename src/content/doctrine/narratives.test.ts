import { describe, expect, it } from "vitest";
import {
  canPublishDoctrineNarrativePublicly,
  countDoctrineNarrativesByDepth,
  customerDoctrineNarratives,
  getPublicDoctrineNarratives,
} from "./narratives";
import type { CustomerDoctrineNarrative } from "./types";

const completeConfirmed: CustomerDoctrineNarrative = {
  id: "cdn-test",
  publicLabel: "Anonymized local service business",
  segment: "service",
  initialProblem: "No reliable digital presence connected to physical customers.",
  resourcesInvolved: ["market", "infrastructure"],
  whatCardbeySolved: "Structured storefront and operable digital path.",
  surfacesInvolved: ["storefront"],
  engagementType: "pilot",
  capabilityIncreased: "Owner can publish services and receive enquiries digitally.",
  capabilityEvidenceSource: "founder confirmation",
  relationshipExpanded: false,
  priorKnowledgeHelped: null,
  moduleCompounding: false,
  depth: "solve_only",
  status: "confirmed",
  approvedForPublic: true,
  approvedForInvestorOnly: false,
  confidential: false,
  customerIdentityApproved: false,
  owner: "founder",
  reviewedAt: "2026-08-03",
};

describe("doctrine narrative gates", () => {
  it("keeps all intake slots unpublished by default", () => {
    expect(getPublicDoctrineNarratives()).toEqual([]);
    expect(customerDoctrineNarratives.length).toBe(3);
    expect(countDoctrineNarrativesByDepth().missingOrUnpublished).toBe(3);
  });

  it("allows a fully confirmed anonymized narrative", () => {
    expect(canPublishDoctrineNarrativePublicly(completeConfirmed)).toBe(true);
  });

  it("blocks confidential and unapproved identity", () => {
    expect(
      canPublishDoctrineNarrativePublicly({
        ...completeConfirmed,
        confidential: true,
      })
    ).toBe(false);
    expect(
      canPublishDoctrineNarrativePublicly({
        ...completeConfirmed,
        realName: "Acme Pty Ltd",
        customerIdentityApproved: false,
      })
    ).toBe(false);
  });

  it("blocks placeholders even when flags are forced", () => {
    expect(
      canPublishDoctrineNarrativePublicly({
        ...completeConfirmed,
        capabilityIncreased: "[CAPABILITY INCREASE REQUIRED]",
      })
    ).toBe(false);
    expect(
      canPublishDoctrineNarrativePublicly({
        ...completeConfirmed,
        status: "submitted",
      })
    ).toBe(false);
  });
});
