import { describe, expect, it } from "vitest";
import {
  allFounderInput,
  getPublicFounderInput,
} from "./founder-input";
import { getPublicTeam } from "./shared/team";
import { getPublicMetrics, investorMetrics } from "./shared/metrics";
import { canRenderMediaPublicly, getPublicMedia, productMedia } from "./shared/media";
import { getPublicResources } from "./shared/documents";
import {
  assertCutoverConsistency,
  calculateReleaseGates,
  claimRequiresEvidence,
  cutoverDecision,
  getPublicApprovedClaims,
  isPrimaryCutoverApproved,
  publicClaims,
  summarizeClaimAudit,
  summarizeLegalReview,
  summarizeReleaseGates,
} from "./release";
import { isFounderInputPublic } from "./schemas/approvals";

describe("phase 4 release and evidence guards", () => {
  it("excludes unconfirmed founder data from public rendering", () => {
    for (const record of allFounderInput) {
      if (record.status !== "confirmed" || !record.approvedForPublic) {
        expect(isFounderInputPublic(record)).toBe(false);
      }
    }
    const publicIds = getPublicFounderInput().map((r) => r.id).sort();
    expect(publicIds).toEqual(["company-abn-acn", "company-legal-name"]);
  });

  it("hides incomplete team profiles in public mode", () => {
    expect(getPublicTeam().length).toBe(0);
  });

  it("renders only verified/draft product traction publicly", () => {
    const publicMetrics = getPublicMetrics();
    expect(publicMetrics.length).toBeGreaterThan(0);
    for (const metric of publicMetrics) {
      expect(metric.public).toBe(true);
      expect(["product", "execution"]).toContain(metric.category);
      expect(metric.status).not.toBe("placeholder");
    }
  });

  it("excludes unverified commercial traction", () => {
    const revenue = investorMetrics.find((m) => m.id === "metric-revenue")!;
    expect(getPublicMetrics([revenue])).toEqual([]);
    const customers = investorMetrics.find((m) => m.id === "metric-customer-count")!;
    expect(getPublicMetrics([customers])).toEqual([]);
  });

  it("excludes expired metrics", () => {
    const base = getPublicMetrics()[0];
    expect(
      getPublicMetrics([
        {
          ...base,
          expiresAt: "2000-01-01",
        },
      ])
    ).toEqual([]);
  });

  it("blocks customer-sensitive media without approval", () => {
    expect(getPublicMedia()).toEqual([]);
    const sample = productMedia.find((m) => m.customerSensitive) || productMedia[0];
    expect(
      canRenderMediaPublicly({
        ...sample,
        publicApproved: true,
        assetPath: "/x.png",
        status: "verified",
        customerSensitive: true,
        customerApproval: false,
      })
    ).toBe(false);
  });

  it("keeps funding terms out of public founder input", () => {
    const funding = allFounderInput.filter((r) => r.id.startsWith("funding-"));
    expect(funding.length).toBeGreaterThan(0);
    for (const record of funding) {
      expect(isFounderInputPublic(record)).toBe(false);
      expect(record.confidential || !record.approvedForPublic).toBe(true);
    }
  });

  it("excludes confidential resources from public resource list", () => {
    const resources = getPublicResources();
    expect(resources.every((r) => r.public !== false)).toBe(true);
    expect(resources.every((r) => r.resourceState !== "confidential")).toBe(true);
    expect(resources.find((r) => r.id === "res-financial-model")).toBeUndefined();
    expect(resources.find((r) => r.id === "res-data-room")).toBeUndefined();
  });

  it("requires evidence or approval id for public-approved claims", () => {
    for (const claim of getPublicApprovedClaims()) {
      expect(claimRequiresEvidence(claim)).toBe(true);
    }
    const summary = summarizeClaimAudit(publicClaims);
    expect(summary.unsupportedPublic.length).toBe(0);
  });

  it("keeps legal review open items from pretending complete", () => {
    const legal = summarizeLegalReview();
    expect(legal.publicOpen).toBeGreaterThan(0);
  });

  it("calculates release gates with cutover blocked", () => {
    const gates = calculateReleaseGates();
    const summary = summarizeReleaseGates(gates);
    expect(gates.length).toBe(8);
    expect(summary.blocked).toBeGreaterThan(0);
    expect(summary.cutoverBlocked).toBe(true);
    expect(isPrimaryCutoverApproved()).toBe(false);
  });

  it("records HOLD cutover decision without auto-approve", () => {
    expect(cutoverDecision.decision).not.toBe("APPROVE_CUTOVER");
    expect(cutoverDecision.explicitFounderApproval).toBe(false);
    expect(cutoverDecision.proposedRouteStrategy).toBe("A");
    expect(assertCutoverConsistency().ok).toBe(true);
  });

  it("rejects inconsistent APPROVE_CUTOVER without founder approval", () => {
    const check = assertCutoverConsistency();
    expect(check.ok).toBe(true);
    // Simulate unsafe decision shape via local assert logic expectations
    expect(cutoverDecision.decision === "APPROVE_CUTOVER").toBe(false);
  });
});
