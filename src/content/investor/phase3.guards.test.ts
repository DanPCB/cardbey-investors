import { describe, expect, it } from "vitest";
import {
  canRenderMediaPublicly,
  getPublicMedia,
  isContentApprovedPublic,
  investorDiagrams,
  investorContent,
  getPublicResources,
} from "./content";
import {
  allFounderInput,
  getMissingFounderInput,
  getPublicFounderInput,
} from "./founder-input";
import { productMedia } from "./shared/media";
import { isFounderInputPublic } from "./schemas/approvals";

describe("phase 3 approval and media guards", () => {
  it("keeps unconfirmed founder input private and publishes confirmed company identifiers", () => {
    const publicIds = getPublicFounderInput().map((r) => r.id).sort();
    expect(publicIds).toEqual(["company-abn-acn", "company-legal-name"]);
    expect(getMissingFounderInput().length).toBeGreaterThan(0);
    for (const record of allFounderInput) {
      if (record.confidential) {
        expect(isFounderInputPublic(record)).toBe(false);
      }
    }
  });

  it("blocks confidential founder input even if flags are forced", () => {
    const confidential = allFounderInput.find((r) => r.confidential)!;
    expect(
      isFounderInputPublic({
        ...confidential,
        status: "confirmed",
        approvedForPublic: true,
        value: "secret",
      })
    ).toBe(false);
  });

  it("requires confirmed + approvedForPublic + non-placeholder value", () => {
    expect(
      isFounderInputPublic({
        id: "x",
        value: "Real Name",
        status: "confirmed",
        approvedForPublic: true,
        approvedForInvestorOnly: false,
        confidential: false,
      })
    ).toBe(true);
    expect(
      isFounderInputPublic({
        id: "y",
        value: "[NAME REQUIRED]",
        status: "confirmed",
        approvedForPublic: true,
        approvedForInvestorOnly: false,
        confidential: false,
      })
    ).toBe(false);
  });

  it("excludes unapproved and customer-sensitive media from public render", () => {
    expect(getPublicMedia(productMedia)).toEqual([]);
    const draft = {
      ...productMedia[0],
      publicApproved: true,
      assetPath: "/media/test.png",
      status: "draft" as const,
      customerSensitive: true,
      customerApproval: false,
    };
    expect(canRenderMediaPublicly(draft)).toBe(false);
    expect(
      canRenderMediaPublicly({
        ...draft,
        customerSensitive: false,
        status: "verified",
      })
    ).toBe(true);
  });

  it("treats missing approvals as non-public and allows approved fallbacks", () => {
    expect(isContentApprovedPublic("nonexistent")).toBe(false);
    expect(isContentApprovedPublic("fallback-team-statement")).toBe(true);
  });

  it("has bilingual diagram labels for all diagrams", () => {
    expect(investorDiagrams.length).toBeGreaterThanOrEqual(6);
    for (const diagram of investorDiagrams) {
      expect(diagram.title.en && diagram.title.vi).toBeTruthy();
      expect(diagram.explanation.en && diagram.explanation.vi).toBeTruthy();
      expect(diagram.accessibleDescription.en && diagram.accessibleDescription.vi).toBeTruthy();
      for (const node of diagram.nodes || []) {
        expect(node.label.en && node.label.vi).toBeTruthy();
      }
      for (const layer of diagram.layers || []) {
        expect(layer.name.en && layer.name.vi).toBeTruthy();
      }
    }
  });

  it("exposes resource states without leaking confidential binaries", () => {
    const publicResources = getPublicResources(investorContent.resources);
    expect(publicResources.some((r) => r.id === "res-financial-model")).toBe(false);
    expect(publicResources.some((r) => r.id === "res-data-room")).toBe(false);
    const safe = publicResources.find((r) => r.id === "res-safe-en");
    expect(safe?.resourceState).toBe("unavailable");
    expect(safe?.href).toBeUndefined();
  });
});
