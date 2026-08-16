import { describe, expect, it } from "vitest";
import {
  assertNoLegacyLeakage,
  formatPublicFigure,
  getInvestorFigure,
  isFigureSafeForPublic,
  legacyBlockedFigures,
  listPublicInvestorFigures,
  scenarioDriverFigures,
} from "./financialFigures";
import { growthCapitalCopy } from "./growthCapital";
import { seedPropositionCopy, seedSummaryItems } from "./seedProposition";
import { successPathCopy, successNodes } from "./successPath";
import { businessDiligenceCopy, unitEconomicsRows } from "./businessDiligence";

describe("V3 financial figure discipline", () => {
  it("never exposes legacy_unverified or placeholder figures publicly", () => {
    for (const figure of [...legacyBlockedFigures, ...scenarioDriverFigures]) {
      expect(isFigureSafeForPublic(figure)).toBe(false);
    }
    expect(listPublicInvestorFigures()).toEqual([]);
  });

  it("formats missing drivers as founder input required — not invented zeros", () => {
    const fig = getInvestorFigure("fig-illustrative-revenue");
    const formatted = formatPublicFigure(fig, "en", {
      en: "Founder input required",
      vi: "Cần dữ liệu founder",
    });
    expect(formatted.text).toBe("Founder input required");
    expect(formatted.kind).toBe("missing");
  });

  it("blocks known legacy leakage strings", () => {
    expect(assertNoLegacyLeakage("A$36M → A$216M → A$900M")).toBe(false);
    expect(assertNoLegacyLeakage("Cap A$18M")).toBe(false);
    expect(assertNoLegacyLeakage("Sign SAFE now")).toBe(false);
    expect(assertNoLegacyLeakage("IPO preparation: year 4/5")).toBe(false);
    expect(assertNoLegacyLeakage("Illustrative Growth Scenarios")).toBe(true);
  });
});

describe("growth capital copy registry", () => {
  it("keeps EN/VI parity on top-level strings", () => {
    const keys = Object.keys(growthCapitalCopy) as (keyof typeof growthCapitalCopy)[];
    for (const key of keys) {
      const value = growthCapitalCopy[key];
      if (value && typeof value === "object" && "en" in value && "vi" in value) {
        expect(String(value.vi).length).toBeGreaterThan(0);
        expect(String(value.en).length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps EN/VI parity on seed proposition strings", () => {
    const keys = Object.keys(seedPropositionCopy) as (keyof typeof seedPropositionCopy)[];
    for (const key of keys) {
      const value = seedPropositionCopy[key];
      if (value && typeof value === "object" && "en" in value && "vi" in value) {
        expect(String(value.vi).length).toBeGreaterThan(0);
        expect(String(value.en).length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps EN/VI parity on success-path strings and nodes", () => {
    const keys = Object.keys(successPathCopy) as (keyof typeof successPathCopy)[];
    for (const key of keys) {
      const value = successPathCopy[key];
      if (value && typeof value === "object" && "en" in value && "vi" in value) {
        expect(String(value.vi).length).toBeGreaterThan(0);
        expect(String(value.en).length).toBeGreaterThan(0);
      }
    }
    for (const node of successNodes) {
      expect(node.title.vi.length).toBeGreaterThan(0);
      expect(node.body.vi.length).toBeGreaterThan(0);
      expect(node.status.vi.length).toBeGreaterThan(0);
    }
  });

  it("keeps EN/VI parity on business diligence strings", () => {
    const keys = Object.keys(businessDiligenceCopy) as (keyof typeof businessDiligenceCopy)[];
    for (const key of keys) {
      const value = businessDiligenceCopy[key];
      if (value && typeof value === "object" && "en" in value && "vi" in value) {
        expect(String(value.vi).length).toBeGreaterThan(0);
        expect(String(value.en).length).toBeGreaterThan(0);
      }
    }
    for (const row of unitEconomicsRows) {
      expect(row.title.vi.length).toBeGreaterThan(0);
      expect(row.body.vi.length).toBeGreaterThan(0);
    }
  });

  it("does not embed legacy unverified raise or revenue paths", () => {
    const blob =
      JSON.stringify(growthCapitalCopy) +
      JSON.stringify(seedPropositionCopy) +
      JSON.stringify(seedSummaryItems) +
      JSON.stringify(successPathCopy) +
      JSON.stringify(successNodes) +
      JSON.stringify(businessDiligenceCopy) +
      JSON.stringify(unitEconomicsRows);
    expect(assertNoLegacyLeakage(blob)).toBe(true);
    expect(blob).not.toMatch(/Sign SAFE/i);
    expect(blob).not.toMatch(/A\$100M|A\$1B|investor return|\[CONFIRM\]/i);
    expect(blob).not.toMatch(/funded plan/i);
    expect(blob).not.toMatch(/\ba A\$/i);
    expect(blob).toMatch(/Approximately 25%/);
    expect(blob).toMatch(/post-money SAFE/);
    expect(blob).toMatch(/A\$12M/);
    expect(blob).toMatch(/valuation cap/i);
    expect(blob).toMatch(/Why this cap/);
    expect(blob).not.toMatch(/Series A valuation/i);
    expect(blob).not.toMatch(/acquisition without CAC/i);
    expect(JSON.stringify(seedSummaryItems)).toMatch(/Valuation cap đề xuất/);
    expect(JSON.stringify(seedSummaryItems)).not.toMatch(/Mức trần định giá/);
  });
});
