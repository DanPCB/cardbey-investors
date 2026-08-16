import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import { structuralCopy } from "@/content/investor/v3/structuralNarrative";
import { ClaimLabel } from "./ClaimLabel";

/**
 * Compact labour-market evidence — WEF Future of Jobs 2025 / ILO–NASK.
 * One observable signal of the larger shift — not "AI destroys 92M jobs."
 */
export function LabourMarketChart({ locale }: { locale: LocaleCode }) {
  const displaced = 92;
  const created = 170;
  const net = 78;
  const max = created;

  return (
    <figure className="iv3-labour-chart iv3-labour-chart--compact" aria-labelledby="iv3-labour-chart-title">
      <figcaption id="iv3-labour-chart-title" className="iv3-visual-kicker">
        {t(structuralCopy.labourSignal, locale)}
      </figcaption>
      <p className="iv3-labour-signal-lead">
        {t(structuralCopy.labourSignalLead, locale)}
      </p>

      <div className="iv3-labour-chart-bars" role="img" aria-label={
        locale === "vi"
          ? "92 triệu việc làm dự kiến bị thay thế, 170 triệu vai trò mới được tạo, tăng ròng 78 triệu"
          : "92 million jobs projected displaced, 170 million new roles created, net growth of 78 million"
      }>
        <div className="iv3-labour-bar-row">
          <span className="iv3-labour-bar-label">
            {locale === "vi" ? "Thay thế" : "Displaced"}
          </span>
          <div className="iv3-labour-bar-track">
            <div
              className="iv3-labour-bar iv3-labour-bar--displaced"
              style={{ width: `${(displaced / max) * 100}%` }}
            />
          </div>
          <strong className="iv3-labour-bar-value">92M</strong>
        </div>
        <div className="iv3-labour-bar-row">
          <span className="iv3-labour-bar-label">
            {locale === "vi" ? "Tạo mới" : "Created"}
          </span>
          <div className="iv3-labour-bar-track">
            <div
              className="iv3-labour-bar iv3-labour-bar--created"
              style={{ width: `${(created / max) * 100}%` }}
            />
          </div>
          <strong className="iv3-labour-bar-value">170M</strong>
        </div>
        <div className="iv3-labour-net">
          <ClaimLabel kind="projection" locale={locale} />
          <span className="iv3-labour-net-value">+{net}M</span>
          <span className="iv3-labour-net-label">
            {locale === "vi" ? "thay đổi ròng ước tính" : "estimated net change"}
          </span>
        </div>
      </div>

      <p className="iv3-labour-genai">
        <ClaimLabel kind="projection" locale={locale} />
        <span>
          {locale === "vi"
            ? "ILO–NASK 2025: 1 trong 4 người lao động toàn cầu đang ở nghề nghiệp có mức độ tiếp xúc GenAI nhất định. Chuyển đổi có khả năng hơn thay thế hàng loạt. Tiếp xúc tiềm năng — không phải mất việc đã xảy ra."
            : "ILO–NASK 2025: 1 in 4 workers globally are in occupations with some degree of GenAI exposure. Transformation is more likely than wholesale replacement. Potential exposure — not realised job losses."}
        </span>
      </p>
      <p className="iv3-stat-source">
        {locale === "vi"
          ? "Nguồn: World Economic Forum, Future of Jobs Report 2025 (kết hợp dữ liệu ILO); ILO–NASK, Generative AI and Jobs (2025). Dự báo chuyển đổi cơ cấu do nhiều xu hướng vĩ mô — không phải tuyên bố “AI sẽ phá hủy 92 triệu việc làm”."
          : "Source: World Economic Forum, Future of Jobs Report 2025 (combined with ILO employment data); ILO–NASK, Generative AI and Jobs (2025). Projection of structural transformation driven by multiple macrotrends — not a claim that “AI will destroy 92 million jobs.”"}
      </p>
    </figure>
  );
}

/** Kept for compatibility; GenAI exposure now sits inside the compact labour block. */
export function GenAIExposureStat({ locale }: { locale: LocaleCode }) {
  return (
    <aside className="iv3-exposure-stat iv3-exposure-stat--compact" aria-label={locale === "vi" ? "Mức độ tiếp xúc GenAI" : "GenAI exposure"}>
      <ClaimLabel kind="projection" locale={locale} />
      <p className="iv3-exposure-value">
        {locale === "vi" ? "1 TRONG 4" : "1 IN 4"}
      </p>
      <p className="iv3-exposure-label">
        {locale === "vi"
          ? "người lao động toàn cầu đang ở nghề nghiệp có mức độ tiếp xúc GenAI nhất định."
          : "workers globally are in occupations with some degree of GenAI exposure."}
      </p>
      <p className="iv3-stat-source">
        {locale === "vi"
          ? "Nguồn: ILO–NASK, Generative AI and Jobs (2025). Tiếp xúc tiềm năng — không phải mất việc đã xảy ra."
          : "Source: ILO–NASK, Generative AI and Jobs (2025). Potential exposure — not realised job losses."}
      </p>
    </aside>
  );
}
