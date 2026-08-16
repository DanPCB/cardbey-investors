import type { LocaleCode, ProductCapability } from "@/content/investor";
import { t } from "@/content/investor";
import {
  paradoxOrgItems,
  paradoxPersonItems,
  structuralCopy,
} from "@/content/investor/v3/structuralNarrative";
import { ProductStatusBadge } from "./badges";
import { MediaGallery } from "./MediaGallery";
import type { ProductMediaAsset } from "@/content/investor";
import { shouldShowMediaGallery } from "@/content/investor/shared/media";
import { InvestorCapabilityIllustration } from "./InvestorCapabilityIllustrations";

/** Split thesis: Organization automate vs Individual amplify */
export function TwoSidesOfAI({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-two-sides" aria-label={locale === "vi" ? "Hai phía của AI" : "Two sides of AI"}>
      <div className="iv3-two-sides-hub">AI</div>
      <div className="iv3-two-sides-grid">
        <div className="iv3-two-sides-col iv3-two-sides-col--org">
          <h3>{locale === "vi" ? "TỔ CHỨC" : "ORGANIZATIONS"}</h3>
          <p className="iv3-two-sides-lead">{t(structuralCopy.orgLead, locale)}</p>
          <ul>
            {paradoxOrgItems.map((item) => (
              <li key={item.en}>{t(item, locale)}</li>
            ))}
          </ul>
        </div>
        <div className="iv3-two-sides-col iv3-two-sides-col--person">
          <h3>{locale === "vi" ? "CÁ NHÂN / DN NHỎ" : "INDIVIDUAL / SMALL BUSINESS"}</h3>
          <p className="iv3-two-sides-lead">{t(structuralCopy.personLead, locale)}</p>
          <ul>
            {paradoxPersonItems.map((item) => (
              <li key={item.en}>{t(item, locale)}</li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="iv3-two-sides-caption">
        <p>
          {locale === "vi"
            ? "AI có thể giúp công ty phụ thuộc ít hơn vào con người."
            : "AI may allow companies to depend less on people."}
        </p>
        <p className="iv3-two-sides-emphasis">
          {locale === "vi"
            ? "Nó cũng có thể giúp con người phụ thuộc ít hơn vào công ty."
            : "It may also allow people to depend less on companies."}
        </p>
      </figcaption>
    </figure>
  );
}

/** Cardbey as amplifier — not another resource */
export function AcceleratorDiagram({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-accelerator" aria-label={locale === "vi" ? "Cardbey khuếch đại nguồn lực" : "Cardbey amplifies resources"}>
      <figcaption className="iv3-visual-kicker">
        {locale === "vi" ? "Tổng hợp. Phối hợp. Khuếch đại." : "Aggregate. Coordinate. Amplify."}
      </figcaption>
      <div className="iv3-accelerator-flow">
        <ul className="iv3-accelerator-inputs">
          <li>{locale === "vi" ? "Thị trường" : "Market"}</li>
          <li>{locale === "vi" ? "Trí tuệ" : "Intelligence"}</li>
          <li>{locale === "vi" ? "Hạ tầng" : "Infrastructure"}</li>
          <li>{locale === "vi" ? "Vốn" : "Capital"}</li>
        </ul>
        <div className="iv3-accelerator-core">CARDBEY</div>
        <ol className="iv3-accelerator-out">
          <li>{locale === "vi" ? "Doanh nghiệp" : "Business"}</li>
          <li>{locale === "vi" ? "Thêm năng lực" : "More capability"}</li>
          <li>{locale === "vi" ? "Thêm hoạt động" : "More activity"}</li>
          <li>{locale === "vi" ? "Thêm giá trị" : "More value"}</li>
        </ol>
      </div>
    </figure>
  );
}

/** Economic activity expansion — not a product roadmap first */
export function EconomicNetworkVisual({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-econ-network" aria-label={locale === "vi" ? "Từ một người đến mạng kinh tế" : "From one person to an economic network"}>
      <ol className="iv3-econ-steps">
        <li>
          <strong>{locale === "vi" ? "Một doanh nghiệp" : "One business"}</strong>
        </li>
        <li>
          <strong>{locale === "vi" ? "Nhiều năng lực hơn" : "More capabilities"}</strong>
        </li>
        <li>
          <strong>{locale === "vi" ? "Nhiều hành động hơn" : "More business actions"}</strong>
        </li>
        <li>
          <strong>{locale === "vi" ? "Nhiều quan hệ hơn" : "More relationships"}</strong>
        </li>
        <li>
          <strong>{locale === "vi" ? "Mạng doanh nghiệp" : "Business network"}</strong>
          <span>{locale === "vi" ? "Hệ quả có thể — không phải điểm bắt đầu" : "A possible consequence — not the starting point"}</span>
        </li>
        <li>
          <strong>{locale === "vi" ? "Điều phối tái sử dụng" : "Reusable coordination"}</strong>
          <span> — {locale === "vi" ? "ĐỊNH HƯỚNG" : "DIRECTION"}</span>
        </li>
        <li>
          <strong>{locale === "vi" ? "Hạ tầng tiềm năng" : "Potential infrastructure"}</strong>
          <span>{locale === "vi" ? "Chỉ nếu sự hữu ích lặp lại" : "Only if usefulness repeats"}</span>
        </li>
      </ol>
      <div className="iv3-econ-layers" aria-label={locale === "vi" ? "Lớp nền tảng xung quanh hoạt động" : "Platform layers around activity"}>
        <p className="iv3-visual-kicker">
          {locale === "vi"
            ? "Các lớp Cardbey có thể phát triển quanh hoạt động đó"
            : "Cardbey layers that can develop around that activity"}
        </p>
        <ul>
          <li>
            <strong>{locale === "vi" ? "Năng lực kinh doanh" : "Business capability"}</strong>
            <span> — {locale === "vi" ? "ĐÃ CÓ" : "EXISTS"}</span>
          </li>
          <li>
            <strong>{locale === "vi" ? "Mạng số" : "Digital network"}</strong>
            <span> — {locale === "vi" ? "ĐỊNH HƯỚNG" : "DIRECTION"}</span>
          </li>
          <li>
            <strong>Logistics</strong>
            <span> — {locale === "vi" ? "ĐỊNH HƯỚNG" : "DIRECTION"}</span>
          </li>
          <li>
            <strong>{locale === "vi" ? "Năng lực tài chính" : "Financial capability"}</strong>
            <span> — {locale === "vi" ? "ĐỊNH HƯỚNG" : "DIRECTION"}</span>
          </li>
        </ul>
      </div>
    </figure>
  );
}

/** Conceptual $1 amplifies resources — not an ROI multiple */
export function CapitalAmplificationVisual({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-capital-amp" aria-label={locale === "vi" ? "Vốn seed khuếch đại nguồn lực" : "Seed capital amplifies resources"}>
      <figcaption className="iv3-visual-kicker">
        {locale === "vi" ? "Đồng vốn làm gì?" : "What happens to the dollar?"}
      </figcaption>
      <div className="iv3-capital-tree">
        <div className="iv3-capital-root">{locale === "vi" ? "VỐN SEED" : "SEED CAPITAL"}</div>
        <div className="iv3-capital-branches">
          <div>
            <strong>{locale === "vi" ? "Người" : "People"}</strong>
            <span>{locale === "vi" ? "Thực thi" : "Execution"}</span>
          </div>
          <div>
            <strong>{locale === "vi" ? "Thị trường" : "Market"}</strong>
            <span>{locale === "vi" ? "Chấp nhận" : "Adoption"}</span>
          </div>
          <div>
            <strong>{locale === "vi" ? "Nền tảng" : "Platform"}</strong>
            <span>{locale === "vi" ? "Năng lực" : "Capability"}</span>
          </div>
        </div>
        <ol className="iv3-capital-result">
          <li>{locale === "vi" ? "Bằng chứng thị trường" : "Market proof"}</li>
          <li>{locale === "vi" ? "Công ty mạnh hơn" : "Stronger company"}</li>
          <li>{locale === "vi" ? "Giai đoạn vốn tiếp theo" : "Next capital stage"}</li>
        </ol>
      </div>
      <p className="iv3-capital-note">
        {locale === "vi"
          ? "“$1” mang tính khái niệm — không phải tuyên bố một đô la đầu tư tạo bội số xác định. Vốn giúp kết hợp Thị trường + Trí tuệ + Hạ tầng + Vốn thành năng lực kinh doanh lớn hơn."
          : "“$1” is conceptual — not a claim that one invested dollar produces a specified multiple. Capital helps combine Market + Intelligence + Infrastructure + Capital into greater business capability."}
      </p>
    </figure>
  );
}

export function SeedJourneyVisual({ locale }: { locale: LocaleCode }) {
  const steps =
    locale === "vi"
      ? [
          "Hôm nay — Tầm nhìn + Nền tảng",
          "Vòng seed",
          "Vào thị trường",
          "Doanh nghiệp thật",
          "Sử dụng + Giao dịch",
          "Bằng chứng thị trường",
          "Mở rộng",
          "Giai đoạn tài trợ tiếp theo",
        ]
      : [
          "Today — Vision + Foundation",
          "Seed round",
          "Market entry",
          "Real businesses",
          "Usage + Transactions",
          "Market evidence",
          "Expansion",
          "Next funding stage",
        ];

  return (
    <figure className="iv3-seed-journey" aria-label={locale === "vi" ? "Hành trình đầu tư seed" : "Seed investment journey"}>
      <figcaption className="iv3-visual-kicker">
        {locale === "vi"
          ? "Vốn → hành động thị trường → bằng chứng → cơ hội lớn hơn"
          : "Capital → market action → evidence → larger opportunity"}
      </figcaption>
      <ol className="iv3-seed-steps">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="iv2-disclosure">
        {locale === "vi"
          ? "Cột mốc và số tiền cụ thể chỉ khi founder xác nhận — không invent trên trang công khai."
          : "Exact milestones and amounts only when founder-confirmed — not invented on the public page."}
      </p>
    </figure>
  );
}

const COLLAGE_SLOTS: {
  id: string;
  illustration: "storefront" | "performer" | "growth" | "devices";
  capabilityIds: string[];
  en: string;
  vi: string;
  featured?: boolean;
}[] = [
  {
    id: "storefront",
    illustration: "storefront",
    capabilityIds: ["cap-ai-storefront", "cap-business-import"],
    en: "Storefront / business creation",
    vi: "Storefront / tạo doanh nghiệp",
    featured: true,
  },
  {
    id: "performer",
    illustration: "performer",
    capabilityIds: ["cap-ai-performer"],
    en: "Performer",
    vi: "Performer",
  },
  {
    id: "promote",
    illustration: "growth",
    capabilityIds: ["cap-growth-engine", "cap-partner-attribution"],
    en: "Promotion & growth",
    vi: "Quảng bá & tăng trưởng",
  },
  {
    id: "displays",
    illustration: "devices",
    capabilityIds: ["cap-smart-display-runtime", "cap-signage-scheduling"],
    en: "Displays & devices",
    vi: "Màn hình & thiết bị",
  },
];

/**
 * Real product evidence collage. Uses approved media when present;
 * otherwise coded outline illustrations + maturity (no fake screenshots).
 */
export function RealEvidenceCollage({
  locale,
  capabilities,
  media,
  isDev,
}: {
  locale: LocaleCode;
  capabilities: ProductCapability[];
  media: ProductMediaAsset[];
  isDev: boolean;
}) {
  const byId = new Map(capabilities.map((c) => [c.id, c]));
  const hasMedia = shouldShowMediaGallery(media);

  return (
    <div className="iv3-real-evidence">
      <p className="iv3-real-evidence-headline">
        {locale === "vi"
          ? "Tầm nhìn đã có điểm khởi đầu."
          : "The vision already has a starting point."}
      </p>

      {hasMedia ? (
        <MediaGallery media={media} locale={locale} isDev={isDev} />
      ) : (
        <div
          className="iv3-evidence-collage"
          aria-label={locale === "vi" ? "Năng lực sản phẩm" : "Product capabilities"}
        >
          {COLLAGE_SLOTS.map((slot) => {
            const caps = slot.capabilityIds
              .map((id) => byId.get(id))
              .filter((c): c is ProductCapability => Boolean(c));
            const status = caps[0]?.status || "development";
            return (
              <article
                key={slot.id}
                className={`iv3-evidence-tile${slot.featured ? " iv3-evidence-tile--featured" : ""}`}
              >
                <InvestorCapabilityIllustration
                  type={slot.illustration}
                  locale={locale}
                />
                <div className="iv3-evidence-tile-meta">
                  <h3>{locale === "vi" ? slot.vi : slot.en}</h3>
                  <ProductStatusBadge status={status} locale={locale} />
                </div>
                {caps[0] ? <p>{t(caps[0].shortDescription, locale)}</p> : null}
                <a className="iv3-evidence-tile-link" href="#diligence">
                  {locale === "vi" ? "Xem bằng chứng →" : "View evidence →"}
                </a>
              </article>
            );
          })}
          <p className="iv3-evidence-illust-note">
            {locale === "vi"
              ? "Hình minh họa giải thích mục đích sản phẩm. Bằng chứng sản phẩm đã duyệt có ở lớp sâu hơn khi được phép."
              : "Concept illustrations explain product purpose. Approved product evidence is available separately where permitted."}
          </p>
        </div>
      )}
    </div>
  );
}
