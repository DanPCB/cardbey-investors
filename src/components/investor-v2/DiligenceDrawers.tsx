import { useEffect } from "react";
import type { LocaleCode } from "@/content/investor";
import { getPublicCapabilities, t } from "@/content/investor";
import type { InvestorContentBundle } from "@/content/investor";
import { ProductStatusBadge } from "./badges";
import { TechEconomicsGrid } from "./TechEconomicsGrid";
import { UnitEconomicsFrame } from "./UnitEconomicsFrame";
import { VisionMarketPanel } from "./VisionMarketPanel";
import { GrowthCapitalJourney } from "./GrowthCapitalJourney";
import { SafeDiligencePanel } from "./SeedPropositionPanel";
import { BusinessPurposeGroups } from "./BusinessPurposeGroups";
import { businessDiligenceCopy, seedProofQuestions } from "@/content/investor/v3/businessDiligence";

/**
 * Four deeper investor routes — progressive disclosure after the main pitch.
 * Native details for accessibility.
 */
export function DiligenceDrawers({
  bundle,
  locale,
  isDev,
}: {
  bundle: InvestorContentBundle;
  locale: LocaleCode;
  isDev: boolean;
}) {
  const caps = getPublicCapabilities(bundle.capabilities);

  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      const target = document.getElementById(id);
      const drawer = target?.closest("details.iv3-drawer");
      if (drawer instanceof HTMLDetailsElement) drawer.open = true;
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div className="iv3-drawers" id="diligence">
      <h2 className="iv3-drawers-title">
        {locale === "vi" ? "Đi sâu theo nhu cầu nhà đầu tư" : "Go deeper by investor focus"}
      </h2>
      <p className="iv3-drawers-intro">
        {locale === "vi"
          ? "Pitch chính trả lời mô hình thương mại. Các lớp dưới dành cho thẩm định — không bắt buộc nếu chỉ cần hiểu Cardbey bán gì và kiếm tiền thế nào."
          : "The main pitch answers the commercial model. Layers below are for diligence — not required to understand what Cardbey sells and how it makes money."}
      </p>

      <details className="iv3-drawer" id="drawer-business-economics">
        <summary>
          {locale === "vi" ? "Kinh doanh & kinh tế" : "Business & Economics"}
        </summary>
        <div className="iv3-drawer-body">
          <UnitEconomicsFrame locale={locale} />
        </div>
      </details>

      <details className="iv3-drawer" id="drawer-vision-market">
        <summary>
          {locale === "vi" ? "Tầm nhìn & thị trường" : "Vision & Market"}
        </summary>
        <div className="iv3-drawer-body">
          <VisionMarketPanel locale={locale} isDev={isDev} />
        </div>
      </details>

      <details className="iv3-drawer" id="drawer-growth-capital">
        <summary>
          {locale === "vi" ? "Tăng trưởng & vốn (chi tiết)" : "Growth & Capital (detail)"}
        </summary>
        <div className="iv3-drawer-body">
          <p>
            {locale === "vi"
              ? "Pitch chính nêu đề xuất seed A$3M. Chi tiết SAFE, cơ chế đóng vòng, giai đoạn và kịch bản nằm đây — phụ thuộc rà soát pháp lý, chưa phải bản cuối."
              : "The main pitch states the proposed A$3M seed. SAFE detail, close mechanics, stages and scenarios live here — subject to legal review, not final."}
          </p>
          <section className="iv3-dil-block" aria-labelledby="iv3-dil-gc-measure">
            <h3 className="iv3-dil-h" id="iv3-dil-gc-measure">
              {t(businessDiligenceCopy.growthLinkTitle, locale)}
            </h3>
            <p className="iv3-gc-lead">{t(businessDiligenceCopy.growthLinkLead, locale)}</p>
            <ol className="iv3-dil-progress iv3-dil-progress--questions">
              {seedProofQuestions.map((item) => (
                <li key={item.id}>{t(item.title, locale)}</li>
              ))}
            </ol>
            <p className="iv3-dil-close">{t(businessDiligenceCopy.proveClose, locale)}</p>
            <p className="iv3-gc-deep-link">
              <a href="#drawer-business-economics">{t(businessDiligenceCopy.growthLinkCta, locale)}</a>
            </p>
          </section>
          <SafeDiligencePanel locale={locale} />
          <GrowthCapitalJourney locale={locale} isDev={isDev} variant="full" />
        </div>
      </details>

      <details className="iv3-drawer" id="drawer-technology-evidence">
        <summary>
          {locale === "vi" ? "Công nghệ & bằng chứng" : "Technology & Evidence"}
        </summary>
        <div className="iv3-drawer-body">
          <p>
            {locale === "vi"
              ? "Công nghệ là hạ tầng và bằng chứng thực thi — không phải toàn bộ luận điểm đầu tư. Mỗi năng lực giữ trạng thái chín; route/component không tự chứng minh độ tin cậy production."
              : "Technology is infrastructure and execution evidence — not the whole investment argument. Each capability keeps its maturity status; routes/components do not automatically prove production reliability."}
          </p>
          <TechEconomicsGrid locale={locale} />
          <BusinessPurposeGroups
            capabilities={caps}
            locale={locale}
          />
          <p>
            {locale === "vi"
              ? "Lớp trải nghiệm · AI/agent · trí tuệ kinh doanh · thương mại · tăng trưởng · phân phối · hạ tầng. Sơ đồ đầy đủ còn ở V2 và tài liệu nội bộ."
              : "Experience · AI/agent · business intelligence · commerce · growth · distribution · infrastructure layers. Full diagrams remain in V2 and internal materials."}
          </p>
          <ul className="iv3-drawer-list">
            {caps.map((c) => (
              <li key={c.id}>
                <div className="iv3-drawer-item-head">
                  <strong>{t(c.title, locale)}</strong>
                  <ProductStatusBadge status={c.status} locale={locale} />
                </div>
                <p>{t(c.shortDescription, locale)}</p>
                {c.evidenceNote ? <p className="iv2-cap-evidence">{c.evidenceNote}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      </details>

      <details className="iv3-drawer" id="drawer-investor-materials">
        <summary>
          {locale === "vi" ? "Tài liệu nhà đầu tư" : "Investor Materials"}
        </summary>
        <div className="iv3-drawer-body">
          <p>
            {locale === "vi"
              ? "Chỉ tài nguyên được phê duyệt phù hợp. Tài liệu bảo mật và on-request không xuất hiện công khai. Cuộn tới phần Resources trên trang hoặc liên hệ founder."
              : "Only appropriately approved resources. Confidential and on-request materials do not appear publicly. Scroll to Resources on this page or contact the founder."}
          </p>
          <p>
            <a className="iv2-text-link" href="#resources">
              {locale === "vi" ? "Tới tài liệu nhà đầu tư →" : "Go to investor materials →"}
            </a>
          </p>
        </div>
      </details>
    </div>
  );
}
