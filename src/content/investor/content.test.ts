import { describe, expect, it } from "vitest";
import {
  assertContentCompleteness,
  assertLanguageCompleteness,
  canShowMetricAsFact,
  canShowMetricPublicly,
  filterPublicBundle,
  getCoreSectionOrder,
  getPublicMedia,
  getPublicProofs,
  getPublicResources,
  getPublicTeam,
  investorContent,
  looksLikePlaceholder,
  PRODUCT_STATUS_LABEL,
} from "./content";
import { investorMetrics } from "./shared/metrics";
import { productCapabilities } from "./shared/capabilities";

describe("investor content foundation", () => {
  it("has complete bilingual section titles", () => {
    const result = assertContentCompleteness(investorContent);
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("has language completeness across sections and capabilities", () => {
    const result = assertLanguageCompleteness(investorContent);
    expect(result.ok).toBe(true);
  });

  it("uses the Phase 2 narrative section order", () => {
    const ids = getCoreSectionOrder(investorContent);
    expect(ids[0]).toBe("hero");
    expect(ids).toContain("what-built");
    expect(ids).toContain("expansion");
    expect(ids).toContain("funding");
    expect(ids).not.toContain("investor-overview");
    expect(ids.indexOf("problem")).toBeLessThan(ids.indexOf("why-now"));
    expect(ids.indexOf("what-built")).toBeLessThan(ids.indexOf("traction"));
  });

  it("never exposes confidential resources publicly", () => {
    const publicResources = getPublicResources(investorContent.resources);
    for (const resource of publicResources) {
      expect(resource.accessLevel).not.toBe("confidential");
      expect(resource.accessLevel).not.toBe("data_room");
      expect(resource.confidentiality).not.toBe("confidential");
      expect(resource.public).toBe(true);
    }
    const filtered = filterPublicBundle(investorContent, { isDev: false });
    expect(filtered.resources.some((r) => r.id === "res-financial-model")).toBe(false);
    expect(filtered.resources.some((r) => r.id === "res-data-room")).toBe(false);
    const safe = filtered.resources.find((r) => r.id === "res-safe-en");
    expect(safe?.resourceState).toBe("unavailable");
    expect(safe?.href).toBeUndefined();
  });

  it("hides incomplete team profiles in production filtering", () => {
    expect(getPublicTeam(investorContent.team)).toEqual([]);
    const prod = filterPublicBundle(investorContent, { isDev: false });
    expect(prod.team).toEqual([]);
  });

  it("does not treat placeholder metrics as verified facts or public metrics", () => {
    const placeholders = investorMetrics.filter((m) => m.status === "placeholder");
    expect(placeholders.length).toBeGreaterThan(0);
    for (const metric of placeholders) {
      expect(canShowMetricAsFact(metric.status)).toBe(false);
      expect(canShowMetricPublicly(metric)).toBe(false);
    }
    const prod = filterPublicBundle(investorContent, { isDev: false });
    expect(prod.metrics.every((m) => m.category === "product" || m.category === "execution")).toBe(
      true
    );
    expect(prod.metrics.every((m) => m.status !== "placeholder")).toBe(true);
  });

  it("maps product statuses to investor-facing labels", () => {
    expect(PRODUCT_STATUS_LABEL.live.en).toBe("Available now");
    expect(PRODUCT_STATUS_LABEL.pilot.vi).toBe("Đang thử nghiệm");
    expect(PRODUCT_STATUS_LABEL.vision.en).toBe("Long-term vision");
  });

  it("keeps capability maturity conservative for storefront and devices", () => {
    const storefront = productCapabilities.find((c) => c.id === "cap-ai-storefront");
    const runtime = productCapabilities.find((c) => c.id === "cap-smart-display-runtime");
    const tizen = productCapabilities.find((c) => c.id === "cap-tizen");
    expect(storefront?.status).toBe("development");
    expect(runtime?.status).toBe("development");
    expect(tizen?.status).toBe("planned");
    expect(storefront?.internalNotes).toBeTruthy();
  });

  it("only exposes partially verified product/execution proofs publicly", () => {
    const publicProofs = getPublicProofs(investorContent.proofs);
    expect(publicProofs.length).toBeGreaterThan(0);
    for (const proof of publicProofs) {
      expect(proof.maturity).not.toBe("requires_confirmation");
      expect(proof.category).not.toBe("market");
      expect(proof.category).not.toBe("commercial");
      expect(proof.public).toBe(true);
    }
    expect(publicProofs.some((p) => p.id === "proof-customers")).toBe(false);
  });

  it("hides unapproved media and reports missing-media fallbacks", () => {
    expect(getPublicMedia(investorContent.media)).toEqual([]);
    expect(investorContent.media.every((m) => !m.publicApproved || !m.assetPath)).toBe(true);
  });

  it("strips placeholder bullets outside development mode", () => {
    const prod = filterPublicBundle(investorContent, { isDev: false });
    const traction = prod.sections.find((s) => s.id === "traction");
    expect(traction?.bullets?.some((b) => looksLikePlaceholder(b.en))).toBeFalsy();

    const dev = filterPublicBundle(investorContent, { isDev: true });
    const tractionDev = dev.sections.find((s) => s.id === "traction");
    expect(tractionDev?.bullets?.some((b) => looksLikePlaceholder(b.en))).toBe(true);
  });

  it("does not promote downloadable SAFE binaries publicly", () => {
    const publicResources = getPublicResources();
    const safes = publicResources.filter((r) => r.category === "safe");
    expect(safes.every((r) => r.resourceState === "unavailable" && !r.href)).toBe(true);
  });
});
