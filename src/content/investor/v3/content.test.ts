import { describe, expect, it } from "vitest";
import { assertLanguageCompleteness, filterPublicBundle } from "../content";
import { getDiagram } from "../shared/diagrams";
import { getPublicMedia } from "../shared/media";
import { getPublicResources } from "../shared/documents";
import { investorSources } from "../shared/sources";
import {
  investorV3Content,
  investorV3Diagrams,
  investorV3Sections,
} from "./content";
import { V3_COMPRESSED_AWAY_IDS } from "./sections";
import { structuralCopy } from "./structuralNarrative";
import { assertNoLegacyLeakage, listPublicInvestorFigures } from "./financialFigures";

describe("investor V3 high-momentum compressed pitch", () => {
  it("orders nine pitch chapters before materials", () => {
    const ids = [...investorV3Sections]
      .sort((a, b) => a.order - b.order)
      .map((s) => s.id);
    expect(ids.slice(0, 9)).toEqual([
      "hero",
      "paradox",
      "missing-layer",
      "start-one",
      "commercial-validation",
      "expansion",
      "growth-capital",
      "seed-opportunity",
      "qa",
    ]);
    expect(ids).toContain("resources");
    expect(assertLanguageCompleteness(investorV3Content).ok).toBe(true);
  });

  it("removes compressed chapters from the public section list", () => {
    const ids = new Set(investorV3Sections.map((s) => s.id));
    for (const id of V3_COMPRESSED_AWAY_IDS) {
      expect(ids.has(id)).toBe(false);
    }
  });

  it("does not lead with commercial-inside or philosophy-first section ids", () => {
    const main = new Set(
      [...investorV3Sections]
        .sort((a, b) => a.order - b.order)
        .slice(0, 9)
        .map((s) => s.id)
    );
    expect(main.has("change")).toBe(false);
    expect(main.has("what-sells")).toBe(false);
    expect(main.has("investment")).toBe(false);
    expect(main.has("commercial-validation")).toBe(true);
  });

  it("registers opportunity diagrams and WEF/UN/ILO sources", () => {
    for (const id of ["v3-human-models", "v3-four-resource", "v3-start-one", "v3-why-now"]) {
      expect(getDiagram(id)?.id).toBe(id);
    }
    expect(investorV3Diagrams.length).toBeGreaterThan(10);
    expect(investorSources.some((s) => s.id === "src-wef-future-of-jobs-2025")).toBe(true);
    expect(investorSources.some((s) => s.id === "src-un-world-population-8-billion")).toBe(true);
    expect(investorSources.some((s) => s.id === "src-ilo-genai-jobs-2025")).toBe(true);
  });

  it("labels expansion with EXISTS / VALIDATING / DIRECTION maturity", () => {
    const expansion = investorV3Sections.find((s) => s.id === "expansion")!;
    expect(expansion.bullets?.some((b) => /EXISTS/i.test(b.en))).toBe(true);
    expect(expansion.bullets?.some((b) => /VALIDATING/i.test(b.en))).toBe(true);
    expect(expansion.bullets?.some((b) => /DIRECTION/i.test(b.en))).toBe(true);
    expect(expansion.introduction?.en).toMatch(/does not begin by manufacturing a network/i);
    expect(expansion.body?.some((b) => /directional/i.test(b.en))).toBe(true);
  });

  it("keeps central opportunity language on the surface", () => {
    const missing = investorV3Sections.find((s) => s.id === "missing-layer")!;
    const blob = [missing.title.en, missing.introduction?.en, ...(missing.body?.map((b) => b.en) || [])]
      .join(" ");
    expect(missing.title.en).toMatch(/Resource Aggregation Accelerator/i);
    expect(blob).toMatch(/already exist/i);
    expect(blob).toMatch(/put them to work/i);
    expect(missing.disclosure?.en).toMatch(/not a claim/i);
  });

  it("frames the paradox without anti-employment essay length", () => {
    const paradox = investorV3Sections.find((s) => s.id === "paradox")!;
    expect(paradox.title.en).toMatch(/Access ≠ Capability/i);
    const blob = [paradox.introduction?.en, ...(paradox.body?.map((b) => b.en) || [])].join(" ");
    expect(blob).toMatch(/do not coordinate|coordination/i);
    expect(blob).toMatch(/existing businesses/i);
    expect(blob).toMatch(/new economic activity/i);
    expect(paradox.body?.length).toBeLessThanOrEqual(2);
  });

  it("states Phase 1 as market execution without claiming product-market fit", () => {
    const market = investorV3Sections.find((s) => s.id === "commercial-validation")!;
    expect(market.title.en).toMatch(/market execution/i);
    expect(market.introduction?.en).toMatch(/Phase 1/i);
    expect(market.introduction?.en).toMatch(/Australia and Vietnam/i);
    const blob = [...(market.bullets?.map((b) => b.en) || [])].join(" ");
    expect(blob).toMatch(/WHO/i);
    expect(blob).toMatch(/PAID OUTCOME/i);
    expect(blob).toMatch(/PHASE 1 TEST/i);
    expect(blob).toMatch(/EVIDENCE/i);
    expect(blob).not.toMatch(/\$\d/);
    expect(blob).toMatch(/No public CAC, LTV/i);
    expect(market.disclosure?.en).toMatch(/not established/i);
  });

  it("keeps the Cardbey chapter from becoming a storefront-definition lecture", () => {
    const missing = investorV3Sections.find((s) => s.id === "missing-layer")!;
    expect(missing.title.en).toMatch(/Resource Aggregation Accelerator/i);
    expect(JSON.stringify(missing)).not.toMatch(/ghost store/i);
    expect(JSON.stringify(missing.body || [])).not.toMatch(/prebuilt store/i);
  });

  it("states proposed seed terms on the investment chapter without treating them as closed financing", () => {
    const capital = investorV3Sections.find((s) => s.id === "growth-capital")!;
    expect(capital.introduction?.en).toMatch(/an A\$3M/i);
    expect(capital.introduction?.en).toMatch(/post-money SAFE/i);
    expect(capital.introduction?.en).toMatch(/proposed A\$12M valuation cap/i);
    expect(capital.introduction?.en).toMatch(/Proposed terms/i);
    expect(capital.introduction?.en).not.toMatch(/\ba A\$/i);
    expect(capital.disclosure?.en).toMatch(/Subject to final legal documentation/i);
    expect(capital.disclosure?.en).toMatch(/No return, IPO, acquisition or liquidity promises/i);
    expect(capital.introduction?.vi).toMatch(/post-money SAFE/);
    expect(capital.introduction?.vi).toMatch(/valuation cap đề xuất A\$12M/);
    expect(capital.introduction?.vi).toMatch(/điều khoản đề xuất/i);
    expect(investorV3Content.legal.companyLine.vi).toMatch(/SIGNSCATER PTY LTD/);
    expect(JSON.stringify(investorV3Content.legal)).not.toMatch(/REQUIRED/);
  });

  it("keeps the invitation execution-oriented without a defensive close slogan", () => {
    const seed = investorV3Sections.find((s) => s.id === "seed-opportunity")!;
    expect(seed.disclosure?.en).toMatch(/venture risk|Not an offer/i);
    expect(seed.title.en).toMatch(/market execution/i);
    expect(seed.introduction?.en).toMatch(/Australia and Vietnam/i);
    expect(JSON.stringify(seed)).toMatch(/A\$3M/i);
    expect(JSON.stringify(seed)).not.toMatch(/Don't invest/i);
    expect(JSON.stringify(seed)).not.toMatch(/worth the bet/i);
    expect(JSON.stringify(seed)).not.toMatch(/inevitable/i);
    expect(JSON.stringify(seed)).not.toMatch(/FOUNDER TO CONFIRM/i);
    expect(investorV3Sections.find((s) => s.id === "closing")).toBeUndefined();
    const contact = investorV3Sections.find((s) => s.id === "contact")!;
    expect(JSON.stringify(contact)).not.toMatch(/Don't invest/i);
    expect(contact.ctas?.some((c) => c.action === "contact")).toBe(true);
    expect(contact.ctas?.some((c) => c.targetSectionId === "resources")).toBe(true);
  });

  it("hides incomplete public financial figures", () => {
    expect(listPublicInvestorFigures()).toEqual([]);
  });

  it("attributes labour projections as WEF structural transformation, not AI-only", () => {
    expect(structuralCopy.labourSignal.en).toMatch(/One signal of the shift/i);
    expect(structuralCopy.labourSignalLead.en).toMatch(/one observable signal/i);
    expect(structuralCopy.labourSignalLead.en).toMatch(/WEF and ILO/i);
    expect(structuralCopy.labourSignalLead.en).not.toMatch(/AI destroys/i);
    const hero = investorV3Sections.find((s) => s.id === "hero")!;
    expect(hero.disclosure?.en).toMatch(/not a claim that all resources/i);
  });

  it("keeps Performer wording maturity-safe on evidence chapter", () => {
    const start = investorV3Sections.find((s) => s.id === "start-one")!;
    expect(start.disclosure?.en).toMatch(/development-stage|policy-bounded/i);
  });

  it("preserves evidence gates on the public bundle", () => {
    const publicBundle = filterPublicBundle(investorV3Content, { isDev: false });
    expect(getPublicMedia(publicBundle.media)).toEqual([]);
    expect(publicBundle.team.length).toBe(0);
    const resources = getPublicResources(publicBundle.resources);
    expect(resources.every((r) => r.confidentiality !== "confidential")).toBe(true);
    const packs = resources.filter((r) => r.id === "res-pack-en" || r.id === "res-pack-vi");
    expect(packs.length).toBe(2);
    expect(packs.every((r) => r.resourceState === "available_on_request")).toBe(true);
    expect(packs.every((r) => r.href === "#contact")).toBe(true);
    expect(packs.every((r) => !r.href?.includes("/files/"))).toBe(true);
  });

  it("maintains EN/VI parity on every section string field", () => {
    for (const section of investorV3Sections) {
      expect(section.title.vi.length).toBeGreaterThan(0);
      if (section.introduction) expect(section.introduction.vi.length).toBeGreaterThan(0);
      if (section.eyebrow) expect(section.eyebrow.vi.length).toBeGreaterThan(0);
      for (const line of section.body || []) expect(line.vi.length).toBeGreaterThan(0);
      for (const line of section.bullets || []) expect(line.vi.length).toBeGreaterThan(0);
      if (section.disclosure) expect(section.disclosure.vi.length).toBeGreaterThan(0);
      for (const cta of section.ctas || []) expect(cta.label.vi.length).toBeGreaterThan(0);
    }
  });

  it("publishes confirmed Signscater company identifiers", () => {
    expect(investorV3Content.legal.companyLine.en).toMatch(/SIGNSCATER PTY LTD/);
    expect(investorV3Content.legal.companyLine.en).toMatch(/ABN 50 685 406 697/);
    expect(investorV3Content.legal.companyLine.en).toMatch(/ACN 685 406 697/);
    expect(investorV3Content.legal.companyLine.en).not.toMatch(/REQUIRED/);
    const footer = investorV3Sections.find((s) => s.id === "footer");
    expect(footer?.introduction?.en).toMatch(/SIGNSCATER PTY LTD/);
    expect(footer?.introduction?.en).toMatch(/ABN 50 685 406 697/);
  });

  it("blocks legacy financial leakage in section registry", () => {
    expect(assertNoLegacyLeakage(JSON.stringify(investorV3Sections))).toBe(true);
  });

  it("uses short nav eyebrows for compressed IA", () => {
    const byId = Object.fromEntries(investorV3Sections.map((s) => [s.id, s]));
    expect(byId.paradox.eyebrow?.en).toBe("Bottleneck");
    expect(byId["missing-layer"].eyebrow?.en).toBe("Cardbey");
    expect(byId["start-one"].eyebrow?.en).toBe("Practice");
    expect(byId["commercial-validation"].eyebrow?.en).toBe("First market");
    expect(byId["growth-capital"].eyebrow?.en).toBe("Investment");
    expect(byId.qa.eyebrow?.en).toBe("Q&A");
    expect(byId.resources.eyebrow?.en).toBe("Materials");
  });
});
