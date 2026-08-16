import type { InvestorContentBundle, LocaleCode, SectionId } from "./schemas/types";
import { productCapabilities } from "./shared/capabilities";
import { investorResources } from "./shared/documents";
import { investorMetrics } from "./shared/metrics";
import { productMedia } from "./shared/media";
import { investorProofs } from "./shared/proof";
import { investorRoadmap } from "./shared/roadmap";
import { investorSections } from "./shared/sections";
import { investorSources } from "./shared/sources";
import { investorTeam } from "./shared/team";
import { isPubliclyRenderableContent } from "./schemas/status";
import { getPublicProofs } from "./shared/proof";

export const investorContent: InvestorContentBundle = {
  localeMeta: {
    primary: "en",
    supported: ["en", "vi"],
  },
  brand: {
    name: "Cardbey",
    positioning: {
      en: "Cardbey is building the AI operating system for small businesses.",
      vi: "Cardbey đang xây dựng hệ điều hành AI cho doanh nghiệp nhỏ.",
    },
    supporting: {
      en: "From business information to a structured, operating business system.",
      vi: "Từ thông tin doanh nghiệp đến một hệ thống doanh nghiệp có cấu trúc và biết vận hành.",
    },
  },
  sections: investorSections,
  capabilities: productCapabilities,
  metrics: investorMetrics,
  sources: investorSources,
  resources: investorResources,
  team: investorTeam,
  roadmap: investorRoadmap,
  proofs: investorProofs,
  media: productMedia,
  legal: {
    companyLine: {
      en: "SIGNSCATER PTY LTD · ABN 50 685 406 697 · ACN 685 406 697",
      vi: "SIGNSCATER PTY LTD · ABN 50 685 406 697 · ACN 685 406 697",
    },
    notes: [
      {
        en: "This page does not constitute an offer of securities where such an offer would be unlawful.",
        vi: "Trang này không cấu thành lời chào bán chứng khoán nơi việc chào bán là bất hợp pháp.",
      },
      {
        en: "Forward-looking statements are directional and subject to change.",
        vi: "Các tuyên bố hướng tới tương lai mang tính định hướng và có thể thay đổi.",
      },
    ],
  },
};

export function getOrderedSections(bundle: InvestorContentBundle = investorContent) {
  return [...bundle.sections].sort((a, b) => a.order - b.order);
}

export function getSection(id: SectionId, bundle: InvestorContentBundle = investorContent) {
  return bundle.sections.find((s) => s.id === id);
}

export function t(
  value: Record<LocaleCode, string> | undefined,
  locale: LocaleCode,
  fallback = ""
) {
  if (!value) return fallback;
  return value[locale] || value.en || fallback;
}

export function looksLikePlaceholder(text: string): boolean {
  return /\[[A-Z0-9 _/-]+REQUIRED[^\]]*\]/i.test(text) || text.includes("[CẦN ");
}

export function assertContentCompleteness(bundle: InvestorContentBundle = investorContent) {
  const errors: string[] = [];
  if (!bundle.sections.length) errors.push("No sections defined");
  const ids = new Set<string>();
  for (const section of bundle.sections) {
    if (ids.has(section.id)) errors.push(`Duplicate section id: ${section.id}`);
    ids.add(section.id);
    if (!section.title?.en || !section.title?.vi) {
      errors.push(`Section ${section.id} missing bilingual title`);
    }
  }
  for (const resource of bundle.resources) {
    if (
      resource.public &&
      (resource.confidentiality === "confidential" ||
        resource.accessLevel === "confidential" ||
        resource.accessLevel === "data_room")
    ) {
      errors.push(`Resource ${resource.id} marked public but confidential`);
    }
  }
  for (const proof of bundle.proofs) {
    if (proof.public && proof.maturity === "requires_confirmation") {
      errors.push(`Proof ${proof.id} public but requires confirmation`);
    }
    if (proof.public && (proof.category === "market" || proof.category === "commercial")) {
      errors.push(`Proof ${proof.id} market/commercial must not be public without verification`);
    }
  }
  return { ok: errors.length === 0, errors };
}

export function assertLanguageCompleteness(bundle: InvestorContentBundle = investorContent) {
  const errors: string[] = [];
  for (const section of bundle.sections) {
    if (!section.title.en.trim() || !section.title.vi.trim()) {
      errors.push(`Section ${section.id} incomplete language title`);
    }
    if (section.introduction && (!section.introduction.en.trim() || !section.introduction.vi.trim())) {
      errors.push(`Section ${section.id} incomplete language introduction`);
    }
  }
  for (const capability of bundle.capabilities) {
    if (!capability.title.en.trim() || !capability.title.vi.trim()) {
      errors.push(`Capability ${capability.id} incomplete bilingual title`);
    }
  }
  return { ok: errors.length === 0, errors };
}

export function filterPublicBundle(
  bundle: InvestorContentBundle = investorContent,
  opts: { isDev?: boolean } = {}
) {
  const isDev = opts.isDev ?? false;
  return {
    ...bundle,
    sections: bundle.sections
      .filter((s) => isPubliclyRenderableContent(s.status))
      .map((section) => ({
        ...section,
        bullets:
          section.bullets?.filter((b) => {
            if (!looksLikePlaceholder(b.en) && !looksLikePlaceholder(b.vi)) return true;
            return isDev;
          }) ?? section.bullets,
      })),
    resources: bundle.resources.filter(
      (r) =>
        r.public &&
        isPubliclyRenderableContent(r.confidentiality) &&
        r.accessLevel !== "confidential" &&
        r.accessLevel !== "data_room"
    ),
    metrics: bundle.metrics.filter(
      (m) =>
        m.public &&
        isPubliclyRenderableContent(m.status) &&
        m.status !== "placeholder" &&
        (m.category === "product" || m.category === "execution")
    ),
    team: bundle.team.filter(
      (m) =>
        m.public &&
        isPubliclyRenderableContent(m.status) &&
        m.status !== "placeholder" &&
        !m.fullName.includes("[")
    ),
    capabilities: bundle.capabilities.filter((c) => c.public),
    proofs: getPublicProofs(bundle.proofs),
    // Keep full media registry; renderers enforce public approval gates.
    media: bundle.media,
  };
}

export function getCoreSectionOrder(bundle: InvestorContentBundle = investorContent) {
  return getOrderedSections(bundle).map((s) => s.id);
}

export * from "./schemas/status";
export * from "./schemas/types";
export * from "./schemas/approvals";
export { getPublicCapabilities, getCapabilitiesByProofGroup } from "./shared/capabilities";
export { getPublicResources, resourceStateLabel } from "./shared/documents";
export {
  getPublicMetrics,
  getDisplayableMetrics,
  canShowMetricPublicly,
  getPublicMetricsByTractionTier,
} from "./shared/metrics";
export { getPublicTeam } from "./shared/team";
export { getPublicProofs, getProofsByCategory } from "./shared/proof";
export {
  getPublicMedia,
  getMediaFallbacks,
  canRenderMediaPublicly,
  shouldShowMediaGallery,
} from "./shared/media";
export { isContentApprovedPublic, contentApprovals } from "./shared/approvals";
export { getDiagram, investorDiagrams } from "./shared/diagrams";
