import {
  getCapabilitiesByProofGroup,
  getPublicCapabilities,
  getPublicMetrics,
  getPublicProofs,
  getPublicResources,
  getPublicTeam,
  getMediaFallbacks,
  t,
  type LocaleCode,
  type InvestorContentBundle,
  type ProductCapability,
  type InvestorMetric,
  type InvestorResource,
  type TeamMember,
  type RoadmapItem,
  type InvestorProof,
} from "@/content/investor";
import { resourceStateLabel } from "@/content/investor/shared/documents";
import { isContentApprovedPublic } from "@/content/investor/shared/approvals";
import { trackInvestorEvent } from "@/lib/analytics";
import { EvidenceBadge, ProductStatusBadge } from "./badges";
import { InvestorCTA } from "./primitives";
import { MediaGallery } from "./MediaGallery";
import { DoctrineNarrativesPanel } from "./DoctrineNarratives";
import { TechEconomicsGrid } from "./TechEconomicsGrid";
import { BusinessPurposeGroups } from "./BusinessPurposeGroups";
import { CommercialValidationPanel } from "./CommercialValidationPanel";
import { ResourceAggregationAccelerator } from "@/components/investor-v3/ResourceAggregationAccelerator";
import { PrebuiltProofCard } from "@/components/investor-v3/PrebuiltProofCard";
import { OperatingLayer } from "@/components/investor-v3/OperatingLayer";
import {
  AccumulationHypothesis,
  CoordinationBottleneck,
  EconomicPathways,
  ExpansionLadder,
} from "@/components/investor-v3/StructuralNarrative";
import { LabourMarketChart } from "./LabourMarketChart";
import {
  AcceleratorDiagram,
  RealEvidenceCollage,
} from "./ThesisVisuals";
import { SeedOpportunityPanel } from "./SeedOpportunityPanel";
import { GrowthCapitalJourney } from "./GrowthCapitalJourney";
import { DiligenceDrawers } from "./DiligenceDrawers";
import { CapabilityGrowthExplorer } from "@/components/investor-v3/CapabilityGrowthExplorer";
import { InvestorQA } from "@/components/investor-v3/InvestorQA";

const PROOF_GROUPS: {
  id: NonNullable<ProductCapability["proofGroup"]>;
  en: string;
  vi: string;
}[] = [
  { id: "product_creation", en: "Product creation", vi: "Tạo lập sản phẩm" },
  { id: "business_intelligence", en: "Business intelligence", vi: "Trí tuệ doanh nghiệp" },
  { id: "growth", en: "Growth", vi: "Tăng trưởng" },
  { id: "device_distribution", en: "Device and distribution", vi: "Thiết bị và phân phối" },
  { id: "commerce_experience", en: "Commerce and customer experience", vi: "Thương mại và trải nghiệm khách hàng" },
];

export function MetricCard({
  metric,
  locale,
}: {
  metric: InvestorMetric;
  locale: LocaleCode;
}) {
  return (
    <article className="iv2-metric">
      <EvidenceBadge status={metric.status} locale={locale} />
      <h3>{t(metric.label, locale)}</h3>
      <div className="iv2-metric-value">{metric.value}</div>
      <p>
        {[metric.category, metric.displayKind, metric.period, metric.geography]
          .filter(Boolean)
          .join(" · ")}
      </p>
    </article>
  );
}

export function MetricGroup({
  metrics,
  locale,
}: {
  metrics: InvestorMetric[];
  locale: LocaleCode;
}) {
  const list = getPublicMetrics(metrics);
  if (!list.length) return null;

  const product = list.filter((m) => (m.tractionTier || "product") === "product");
  const operational = list.filter((m) => m.tractionTier === "operational");
  const heading =
    locale === "vi" ? "Bằng chứng sản phẩm (đã hoàn thành / có bằng chứng)" : "Product proof (completed / evidenced)";
  const opHeading =
    locale === "vi" ? "Bằng chứng vận hành (đã triển khai / pilot)" : "Operational proof (deployed / pilot)";

  return (
    <div className="iv2-traction-hierarchy">
      {product.length ? (
        <div className="iv2-traction-tier">
          <h3 className="iv2-traction-tier-title">{heading}</h3>
          <div className="iv2-metric-grid">
            {product.map((metric) => (
              <MetricCard key={metric.id} metric={metric} locale={locale} />
            ))}
          </div>
        </div>
      ) : null}
      {operational.length ? (
        <div className="iv2-traction-tier">
          <h3 className="iv2-traction-tier-title">{opHeading}</h3>
          <div className="iv2-metric-grid">
            {operational.map((metric) => (
              <MetricCard key={metric.id} metric={metric} locale={locale} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ProofPoint({
  capability,
  locale,
}: {
  capability: ProductCapability;
  locale: LocaleCode;
}) {
  return (
    <article className="iv2-cap">
      <ProductStatusBadge status={capability.status} locale={locale} />
      <h3>{t(capability.title, locale)}</h3>
      <p>{t(capability.shortDescription, locale)}</p>
      {capability.evidenceNote ? (
        <p className="iv2-cap-evidence">{capability.evidenceNote}</p>
      ) : null}
      {capability.confirmationRequired ? (
        <p className="iv2-cap-note">
          {locale === "vi"
            ? "Cần xác nhận trước khi coi là sẵn sàng thương mại."
            : "Confirmation required before treating as commercially ready."}
        </p>
      ) : null}
    </article>
  );
}

export function ProductStatusPanel({
  capabilities,
  locale,
}: {
  capabilities: ProductCapability[];
  locale: LocaleCode;
}) {
  return (
    <div className="iv2-cap-grid">
      {getPublicCapabilities(capabilities).map((capability) => (
        <ProofPoint key={capability.id} capability={capability} locale={locale} />
      ))}
    </div>
  );
}

export function WhatBuiltPanel({
  capabilities,
  locale,
}: {
  capabilities: ProductCapability[];
  locale: LocaleCode;
}) {
  return (
    <div className="iv2-built-stack">
      {PROOF_GROUPS.map((group) => {
        const items = getCapabilitiesByProofGroup(group.id, capabilities);
        if (!items.length) return null;
        return (
          <div className="iv2-built-group" key={group.id}>
            <h3 className="iv2-built-heading">{locale === "vi" ? group.vi : group.en}</h3>
            <div className="iv2-cap-grid">
              {items.map((capability) => (
                <ProofPoint key={capability.id} capability={capability} locale={locale} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProofRegisterPanel({
  proofs,
  locale,
  ids,
}: {
  proofs: InvestorProof[];
  locale: LocaleCode;
  ids?: string[];
}) {
  const list = getPublicProofs(proofs).filter((p) => !ids || ids.includes(p.id));
  if (!list.length) return null;
  return (
    <div className="iv2-proof-grid">
      {list.map((proof) => (
        <article className="iv2-proof" key={proof.id}>
          <span className="iv2-badge" data-kind={proof.maturity}>
            {proof.maturity === "partially_verified"
              ? locale === "vi"
                ? "Xác minh một phần"
                : "Partially verified"
              : locale === "vi"
                ? "Đã xác minh"
                : "Verified"}
          </span>
          <h3>{t(proof.title, locale)}</h3>
          <p>{t(proof.description, locale)}</p>
          <button
            type="button"
            className="iv2-btn iv2-btn-ghost"
            style={{ marginTop: 10 }}
            onClick={() =>
              trackInvestorEvent("product_proof_opened", { proofId: proof.id })
            }
          >
            {locale === "vi" ? "Loại bằng chứng" : "Proof type"}: {proof.proofType}
            {proof.category ? ` · ${proof.category}` : ""}
          </button>
        </article>
      ))}
    </div>
  );
}

export function MediaFallbackNote({
  locale,
  showDev,
}: {
  locale: LocaleCode;
  showDev: boolean;
}) {
  if (!showDev) return null;
  const missing = getMediaFallbacks();
  if (!missing.length) return null;
  return (
    <p className="iv2-placeholder-note">
      {locale === "vi"
        ? `${missing.length} mục media đang chờ ảnh/duyệt công khai.`
        : `${missing.length} media items awaiting approved assets.`}
    </p>
  );
}

export function DocumentCard({
  resource,
  locale,
}: {
  resource: InvestorResource;
  locale: LocaleCode;
}) {
  const onClick = () => {
    if (resource.category === "safe") {
      trackInvestorEvent("safe_note_clicked", { id: resource.id });
    } else if (resource.category === "deck") {
      trackInvestorEvent("investor_pack_clicked", { id: resource.id });
      trackInvestorEvent("investor_deck_clicked", { id: resource.id });
    } else if (resource.id === "res-request-access" || resource.id === "res-data-room-request") {
      trackInvestorEvent("request_access_submitted", { id: resource.id });
    }
  };

  const state = resource.resourceState || "available_on_request";
  const canOpen =
    !!resource.href &&
    resource.resourceState === "available_public" &&
    resource.availability === "available" &&
    !resource.href.startsWith("#");
  const canRequest =
    !!resource.href &&
    (resource.resourceState === "available_on_request" ||
      resource.resourceState === "preparing") &&
    resource.href.startsWith("#");

  return (
    <article className="iv2-doc">
      <span className="iv2-badge" data-kind={state}>
        {resourceStateLabel(state, locale)}
      </span>
      <h3>{t(resource.title, locale)}</h3>
      <p>{t(resource.description, locale)}</p>
      {canOpen || canRequest ? (
        <div style={{ marginTop: 12 }}>
          <InvestorCTA
            href={resource.href}
            variant="secondary"
            onClick={() => {
              onClick();
              if (resource.id === "res-request-access") {
                trackInvestorEvent("investor_materials_cta", { id: resource.id });
              }
            }}
          >
            {canRequest
              ? locale === "vi"
                ? "Yêu cầu truy cập"
                : "Request access"
              : locale === "vi"
                ? "Mở tài nguyên"
                : "Open resource"}
          </InvestorCTA>
        </div>
      ) : (
        <p style={{ marginTop: 12 }}>{resourceStateLabel(state, locale)}</p>
      )}
    </article>
  );
}

export function ResourcePanel({
  resources,
  locale,
}: {
  resources: InvestorResource[];
  locale: LocaleCode;
}) {
  const list = getPublicResources(resources);
  return (
    <div className="iv2-doc-grid">
      {list.map((resource) => (
        <DocumentCard key={resource.id} resource={resource} locale={locale} />
      ))}
    </div>
  );
}

export function Timeline({
  items,
  locale,
}: {
  items: RoadmapItem[];
  locale: LocaleCode;
}) {
  return (
    <div className="iv2-timeline">
      {items
        .filter((item) => item.public)
        .map((item) => (
          <RoadmapPhase key={item.id} item={item} locale={locale} />
        ))}
    </div>
  );
}

export function RoadmapPhase({
  item,
  locale,
}: {
  item: RoadmapItem;
  locale: LocaleCode;
}) {
  return (
    <article className="iv2-phase">
      <EvidenceBadge status={item.status} locale={locale} />
      <h3>
        {t(item.phase, locale)} · {t(item.timeframe, locale)}
      </h3>
      <p>{t(item.summary, locale)}</p>
      <ul className="iv2-list" style={{ marginTop: 10 }}>
        {item.items.map((line) => (
          <li key={line.en}>{t(line, locale)}</li>
        ))}
      </ul>
    </article>
  );
}

export function TeamPanel({
  team,
  locale,
  showPlaceholders,
}: {
  team: TeamMember[];
  locale: LocaleCode;
  showPlaceholders: boolean;
}) {
  const publicTeam = getPublicTeam(team);

  if (publicTeam.length) {
    return (
      <div className="iv2-team-grid">
        {publicTeam.map((member) => (
          <article className="iv2-team-card" key={member.id}>
            <EvidenceBadge status={member.status} locale={locale} />
            <h3>{member.fullName}</h3>
            <p>{t(member.role, locale)}</p>
            <p style={{ marginTop: 8 }}>{t(member.biography, locale)}</p>
          </article>
        ))}
      </div>
    );
  }

  // Never render empty/incomplete identity cards publicly.
  if (isContentApprovedPublic("fallback-team-statement")) {
    return (
      <>
        <p className="iv2-fallback-statement">
          {locale === "vi"
            ? "Cardbey hiện do founder dẫn dắt, kết hợp phát triển sản phẩm với kinh nghiệm trực tiếp triển khai hạ tầng kinh doanh số và vật lý."
            : "Cardbey is currently founder-led, combining product development with direct experience delivering digital and physical business infrastructure."}
        </p>
        {showPlaceholders ? (
          <p className="iv2-placeholder-note">
            {locale === "vi"
              ? "DEV/Review: hồ sơ đội ngũ chi tiết vẫn đang chờ xác nhận."
              : "DEV/Review: detailed team profiles still await confirmation."}
          </p>
        ) : null}
      </>
    );
  }

  if (showPlaceholders) {
    return (
      <p className="iv2-placeholder-note">
        {locale === "vi"
          ? "DEV: hồ sơ đội ngũ chưa xác nhận."
          : "DEV: team profiles not yet confirmed."}
      </p>
    );
  }

  return null;
}

export function SectionBodyBlocks({
  bundle,
  sectionId,
  locale,
  showTeamPlaceholders,
  isDev,
  onContact,
  onNavigate,
}: {
  bundle: InvestorContentBundle;
  sectionId: string;
  locale: LocaleCode;
  showTeamPlaceholders: boolean;
  isDev: boolean;
  onContact?: () => void;
  onNavigate?: (id: string) => void;
}) {
  const section = bundle.sections.find((s) => s.id === sectionId);
  if (!section) return null;

  return (
    <>
      {section.body?.map((line) => (
        <p className="iv2-body" key={line.en} style={{ marginBottom: 12 }}>
          {t(line, locale)}
        </p>
      ))}
      {section.bullets?.length &&
      sectionId !== "four-pillars" &&
      sectionId !== "business-model" ? (
        <ul className="iv2-list">
          {section.bullets.map((line) => (
            <li key={line.en}>{t(line, locale)}</li>
          ))}
        </ul>
      ) : null}

      {sectionId === "hero" ? (
        <>
          <EconomicPathways locale={locale} />
          <LabourMarketChart locale={locale} />
        </>
      ) : null}

      {sectionId === "paradox" ? <CoordinationBottleneck locale={locale} /> : null}

      {sectionId === "missing-layer" ? (
        <>
          <ResourceAggregationAccelerator locale={locale} />
          <PrebuiltProofCard locale={locale} />
        </>
      ) : null}

      {sectionId === "cardbey-layer" ? <AcceleratorDiagram locale={locale} /> : null}

      {sectionId === "expansion" ? (
        <>
          <ExpansionLadder locale={locale} />
          <AccumulationHypothesis locale={locale} />
        </>
      ) : null}

      {sectionId === "start-one" ? (
        <>
          <CapabilityGrowthExplorer
            locale={locale}
            capabilities={getPublicCapabilities(bundle.capabilities)}
          />
          <OperatingLayer locale={locale} />
          <DiligenceDrawers bundle={bundle} locale={locale} isDev={isDev} />
        </>
      ) : null}

      {sectionId === "growth-capital" ? (
        <GrowthCapitalJourney
          locale={locale}
          isDev={isDev}
          onContact={onContact}
          variant="pitch"
        />
      ) : null}

      {sectionId === "seed-opportunity" ? (
        <SeedOpportunityPanel locale={locale} isDev={isDev} />
      ) : null}

      {sectionId === "qa" ? (
        <InvestorQA locale={locale} onContact={onContact} onNavigate={onNavigate} />
      ) : null}

      {sectionId === "what-exists" ? (
        <>
          <RealEvidenceCollage
            locale={locale}
            capabilities={getPublicCapabilities(bundle.capabilities)}
            media={bundle.media}
            isDev={isDev}
          />
          <BusinessPurposeGroups
            capabilities={getPublicCapabilities(bundle.capabilities)}
            locale={locale}
            allowedIds={section.relatedCapabilityIds}
          />
          <DiligenceDrawers bundle={bundle} locale={locale} isDev={isDev} />
        </>
      ) : null}

      {sectionId === "commercial-validation" ? (
        <CommercialValidationPanel locale={locale} />
      ) : null}

      {sectionId === "evidence" ? (
        <>
          <TechEconomicsGrid locale={locale} />
          <div className="iv3-evidence-table" aria-label={locale === "vi" ? "Bằng chứng gọn" : "Compact evidence"}>
            {getPublicCapabilities(bundle.capabilities)
              .filter((c) => section.relatedCapabilityIds?.includes(c.id))
              .map((capability) => (
                <div className="iv3-evidence-row" key={capability.id}>
                  <div>
                    <h3>{t(capability.title, locale)}</h3>
                    <p>{t(capability.shortDescription, locale)}</p>
                  </div>
                  <span className="iv3-evidence-status">{capability.status}</span>
                  <ProductStatusBadge status={capability.status} locale={locale} />
                </div>
              ))}
          </div>
          <DiligenceDrawers bundle={bundle} locale={locale} isDev={isDev} />
        </>
      ) : null}

      {sectionId === "execution" ? (
        <>
          <div className="iv3-evidence-table" aria-label={locale === "vi" ? "Bằng chứng thực thi" : "Execution evidence"}>
            {getPublicCapabilities(bundle.capabilities)
              .slice(0, 12)
              .map((capability) => (
                <div className="iv3-evidence-row" key={capability.id}>
                  <div>
                    <h3>{t(capability.title, locale)}</h3>
                    <p>{t(capability.shortDescription, locale)}</p>
                  </div>
                  <span className="iv3-evidence-status">{capability.status}</span>
                  <ProductStatusBadge status={capability.status} locale={locale} />
                </div>
              ))}
          </div>
          <ProofRegisterPanel
            proofs={bundle.proofs}
            locale={locale}
            ids={section.relatedProofIds}
          />
          <MediaGallery media={bundle.media} locale={locale} isDev={isDev} />
          <MediaFallbackNote locale={locale} showDev={isDev} />
          <MetricGroup metrics={bundle.metrics} locale={locale} />
        </>
      ) : null}

      {sectionId === "what-built" ? (
        <>
          <WhatBuiltPanel capabilities={bundle.capabilities} locale={locale} />
          <ProofRegisterPanel
            proofs={bundle.proofs}
            locale={locale}
            ids={section.relatedProofIds}
          />
          <MediaGallery media={bundle.media} locale={locale} isDev={isDev} />
          <MediaFallbackNote locale={locale} showDev={isDev} />
        </>
      ) : null}

      {sectionId === "four-pillars" && section.bullets?.length ? (
        <>
          <div className="iv3-foundations" aria-label={locale === "vi" ? "Bốn nền tảng" : "Four foundations"}>
            {section.bullets.map((line, index) => {
              const raw = t(line, locale);
              const match = raw.match(/^([^—–-]+)\s*[—–-]\s*(.*)$/);
              const title = (match?.[1] || raw).trim();
              const body = (match?.[2] || raw).trim();
              return (
                <article className="iv3-foundation" key={line.en}>
                  <span className="iv3-foundation-num">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              );
            })}
          </div>
          <p className="iv3-foundations-statement">
            {locale === "vi"
              ? "Cơ hội không chỉ là tiếp cận các nguồn lực này. Đó là khả năng phối hợp và áp dụng chúng."
              : "The opportunity is not simply access to these resources. It is the ability to coordinate and apply them."}
          </p>
        </>
      ) : null}

      {sectionId === "business-model" && section.bullets?.length ? (
        <div className="iv3-horizons" aria-label={locale === "vi" ? "Chân trời doanh thu" : "Business horizons"}>
          {section.bullets.slice(0, 3).map((line, index) => {
            const horizon = index === 0 ? "today" : index === 1 ? "near" : "long";
            const label =
              locale === "vi"
                ? index === 0
                  ? "Hiện tại"
                  : index === 1
                    ? "Gần hạn"
                    : "Dài hạn"
                : index === 0
                  ? "Today"
                  : index === 1
                    ? "Near term"
                    : "Long term";
            const raw = t(line, locale);
            const body = raw.replace(/^(Current|Near-term|Long-term|Hiện tại|Gần hạn|Dài hạn)\s*[—–-]\s*/i, "");
            return (
              <article className="iv3-horizon" data-horizon={horizon} key={line.en}>
                <span className="iv3-horizon-label">{label}</span>
                <p>{body}</p>
              </article>
            );
          })}
        </div>
      ) : null}

      {sectionId === "progressive-leverage" ? (
        <DoctrineNarrativesPanel locale={locale} isDev={isDev} />
      ) : null}

      {sectionId === "market-entry" ? (
        <div className="iv2-wedge" aria-label={locale === "vi" ? "Phân khúc đầu vào" : "Market wedge"}>
          <div className="iv2-wedge-core">
            <strong>{locale === "vi" ? "Phân khúc đầu vào" : "Entry wedge"}</strong>
            <p>
              {locale === "vi"
                ? "Doanh nghiệp nhỏ cần cả hiện diện số và hạ tầng kinh doanh vật lý."
                : "Small businesses that need both digital presence and physical business infrastructure."}
            </p>
          </div>
          <ol className="iv2-wedge-steps">
            {(locale === "vi"
              ? ["Thị trường đầu vào", "Quy trình theo ngành", "Vận hành SME rộng hơn", "Đa ngôn ngữ", "Mạng xuyên biên giới"]
              : ["Entry market", "Category workflows", "Broader SME operations", "Multilingual expansion", "Cross-border network"]
            ).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      ) : null}

      {sectionId === "roadmap" ? (
        <div
          onFocus={() => trackInvestorEvent("roadmap_engaged", { sectionId: "roadmap" })}
          tabIndex={0}
        />
      ) : null}

      {sectionId === "traction" ? (
        <>
          <h3 className="iv2-built-heading">
            {locale === "vi" ? "Bằng chứng sản phẩm & thực thi" : "Product & execution proof"}
          </h3>
          <ProofRegisterPanel
            proofs={bundle.proofs}
            locale={locale}
            ids={section.relatedProofIds}
          />
          <MetricGroup metrics={bundle.metrics} locale={locale} />
        </>
      ) : null}

      {sectionId === "resources" ? (
        <ResourcePanel resources={bundle.resources} locale={locale} />
      ) : null}
      {sectionId === "roadmap" ? <Timeline items={bundle.roadmap} locale={locale} /> : null}
      {sectionId === "team" ? (
        <TeamPanel
          team={bundle.team}
          locale={locale}
          showPlaceholders={showTeamPlaceholders}
        />
      ) : null}

      {section.relatedCapabilityIds?.length &&
      sectionId !== "what-built" &&
      sectionId !== "execution" &&
      sectionId !== "evidence" &&
      sectionId !== "what-exists" &&
      sectionId !== "start-one" &&
      sectionId !== "traction" ? (
        <div className="iv2-cap-grid">
          {bundle.capabilities
            .filter((c) => section.relatedCapabilityIds?.includes(c.id) && c.public)
            .map((capability) => (
              <ProofPoint key={capability.id} capability={capability} locale={locale} />
            ))}
        </div>
      ) : null}
    </>
  );
}
