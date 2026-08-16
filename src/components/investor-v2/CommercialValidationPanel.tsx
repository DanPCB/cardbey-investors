import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import { StepFlow } from "@/components/investor-v3/StructuralNarrative";
import {
  firstMarketEvidenceSteps,
  structuralCopy as copy,
} from "@/content/investor/v3/structuralNarrative";
import {
  phase1Copy,
  phase1ExecutionSteps,
} from "@/content/investor/v3/operatingLayer";

/**
 * Phase 1 — market execution. Never invents CAC/LTV/ARR or conversion certainty.
 */
export function CommercialValidationPanel({ locale }: { locale: LocaleCode }) {
  return (
    <div
      className="iv3-validation"
      aria-label={
        locale === "vi"
          ? "Giai đoạn 1 — kích hoạt và kiểm chứng thị trường"
          : "Phase 1 — market activation and validation"
      }
    >
      <p className="iv3-visual-kicker">{t(copy.firstMarketKicker, locale)}</p>

      <section className="iv3-phase" aria-labelledby="iv3-phase-title">
        <h4 className="iv3-validation-subhead" id="iv3-phase-title">
          {t(phase1Copy.kicker, locale)}
        </h4>
        <p className="iv3-validation-note">{t(phase1Copy.frame, locale)}</p>
        <dl className="iv3-phase-dl">
          <dt>{t(phase1Copy.whereLabel, locale)}</dt>
          <dd>{t(phase1Copy.where, locale)}</dd>
          <dt>{t(phase1Copy.unitLabel, locale)}</dt>
          <dd>{t(phase1Copy.unit, locale)}</dd>
          <dt>{t(phase1Copy.mechanismLabel, locale)}</dt>
          <dd>{t(phase1Copy.mechanism, locale)}</dd>
          <dt>{t(phase1Copy.capabilityLabel, locale)}</dt>
          <dd>{t(phase1Copy.capability, locale)}</dd>
          <dt>{t(phase1Copy.commercialLabel, locale)}</dt>
          <dd>{t(phase1Copy.commercial, locale)}</dd>
          <dt>{t(phase1Copy.validationLabel, locale)}</dt>
          <dd>{t(phase1Copy.validation, locale)}</dd>
          <dt>{t(phase1Copy.durationLabel, locale)}</dt>
          <dd>{t(phase1Copy.duration, locale)}</dd>
          <dt>{t(phase1Copy.decisionLabel, locale)}</dt>
          <dd>{t(phase1Copy.decision, locale)}</dd>
        </dl>
        <ul className="iv3-phase-qs">
          <li>
            <strong>{t(phase1Copy.qExistingLabel, locale)}</strong>
            <span>{t(phase1Copy.qExisting, locale)}</span>
          </li>
          <li>
            <strong>{t(phase1Copy.qNewLabel, locale)}</strong>
            <span>{t(phase1Copy.qNew, locale)}</span>
          </li>
        </ul>
        <p className="iv3-validation-note">{t(phase1Copy.qNote, locale)}</p>
      </section>

      <section className="iv3-seq-hyp" aria-labelledby="iv3-exec-title">
        <h4 className="iv3-validation-subhead" id="iv3-exec-title">
          {t(copy.executionKicker, locale)}
        </h4>
        <p className="iv3-validation-note">{t(copy.executionLead, locale)}</p>
        <ol className="iv3-proof-steps">
          {phase1ExecutionSteps.map((step) => (
            <li key={step.en}>{t(step, locale)}</li>
          ))}
        </ol>
      </section>

      <section className="iv3-seq-hyp" aria-labelledby="iv3-seq-hyp-title">
        <p className="iv3-proof-status">{t(copy.commercialHypKicker, locale)}</p>
        <h4 className="iv3-validation-subhead" id="iv3-seq-hyp-title">
          {t(copy.commercialHypTitle, locale)}
        </h4>
        <p className="iv3-seq-label">{t(copy.commercialTraditionalLabel, locale)}</p>
        <p className="iv3-seq-line">{t(copy.commercialTraditional, locale)}</p>
        <p className="iv3-seq-label">{t(copy.commercialCardbeyLabel, locale)}</p>
        <p className="iv3-seq-line">{t(copy.commercialCardbey, locale)}</p>
        <p className="iv3-validation-note">{t(copy.commercialHypBody, locale)}</p>
      </section>

      <section className="iv3-market-why" aria-labelledby="iv3-market-why-title">
        <h4 className="iv3-validation-subhead" id="iv3-market-why-title">
          {t(copy.marketWhyTitle, locale)}
        </h4>
        <p className="iv3-validation-note">{t(copy.marketWhyLead, locale)}</p>
        <article>
          <h5 className="iv3-market-why-h">{t(copy.marketAuTitle, locale)}</h5>
          <p>{t(copy.marketAuBody, locale)}</p>
        </article>
        <article>
          <h5 className="iv3-market-why-h">{t(copy.marketVnTitle, locale)}</h5>
          <p>{t(copy.marketVnBody, locale)}</p>
        </article>
        <article>
          <h5 className="iv3-market-why-h">{t(copy.marketLinkTitle, locale)}</h5>
          <p>{t(copy.marketLinkBody, locale)}</p>
        </article>
        <article>
          <h5 className="iv3-market-why-h">{t(copy.marketAccessTitle, locale)}</h5>
          <p>{t(copy.marketAccessBody, locale)}</p>
        </article>
        <article className="iv3-market-dir">
          <h5 className="iv3-market-why-h">{t(copy.marketDirKicker, locale)}</h5>
          <p>{t(copy.marketDirLead, locale)}</p>
          <p>{t(copy.marketDirVnAu, locale)}</p>
          <p>{t(copy.marketDirAuVn, locale)}</p>
          <p>{t(copy.marketDirLocal, locale)}</p>
          <p className="iv2-disclosure">{t(copy.marketDirNote, locale)}</p>
        </article>
      </section>

      <h4 className="iv3-validation-subhead">{t(copy.firstMarketEvidenceLabel, locale)}</h4>
      <StepFlow
        items={firstMarketEvidenceSteps}
        locale={locale}
        ariaLabel={
          locale === "vi" ? "Chuỗi bằng chứng thị trường đầu" : "First-market evidence progression"
        }
        className="iv3-first-market-steps"
      />
      <p className="iv2-disclosure">
        {locale === "vi"
          ? "Không có CAC, LTV, tỷ lệ chuyển đổi hay mục tiêu doanh thu công khai được tuyên bố ở đây. Đây là thí nghiệm cần kiểm — không phải product-market fit đã chứng minh."
          : "No public CAC, LTV, conversion or revenue targets are claimed here. This is an experiment to be tested — not proven product-market fit."}
      </p>
    </div>
  );
}
