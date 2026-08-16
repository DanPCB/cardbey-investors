import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import {
  businessDiligenceCopy as copy,
  diligenceStatusLabel,
  economicProgression,
  seedProofQuestions,
  unitEconomicsRows,
  type DiligenceEvidenceStatus,
} from "@/content/investor/v3/businessDiligence";

function StatusBadge({
  status,
  locale,
}: {
  status: DiligenceEvidenceStatus;
  locale: LocaleCode;
}) {
  return (
    <span className="iv3-dil-status" data-status={status}>
      {t(diligenceStatusLabel[status], locale)}
    </span>
  );
}

export function SeedProofQuestions({ locale }: { locale: LocaleCode }) {
  return (
    <section className="iv3-dil-block" aria-labelledby="iv3-dil-prove-title">
      <h3 className="iv3-dil-h" id="iv3-dil-prove-title">
        {t(copy.proveTitle, locale)}
      </h3>
      <ul className="iv3-dil-questions">
        {seedProofQuestions.map((item) => (
          <li key={item.id}>
            <strong>{t(item.title, locale)}</strong>
            <span>{t(item.body, locale)}</span>
          </li>
        ))}
      </ul>
      <p className="iv3-dil-close">{t(copy.proveClose, locale)}</p>
    </section>
  );
}

/**
 * One-business economic model for diligence.
 * Statuses are evidence states — never invented numbers.
 */
export function UnitEconomicsFrame({
  locale,
}: {
  locale: LocaleCode;
  isDev?: boolean;
}) {
  return (
    <div className="iv3-dil">
      <section className="iv3-dil-block" aria-labelledby="iv3-dil-model-title">
        <h3 className="iv3-dil-h" id="iv3-dil-model-title">
          {t(copy.modelTitle, locale)}
        </h3>
        <p className="iv3-dil-principle">{t(copy.modelPrinciple, locale)}</p>
        <p className="iv3-gc-lead">{t(copy.modelLead, locale)}</p>
        <ul className="iv3-dil-rows">
          {unitEconomicsRows.map((row) => (
            <li key={row.id}>
              <div className="iv3-dil-row-head">
                <h4>{t(row.title, locale)}</h4>
                <StatusBadge status={row.status} locale={locale} />
              </div>
              <p>{t(row.body, locale)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="iv3-dil-block" aria-labelledby="iv3-dil-progress-title">
        <h3 className="iv3-dil-h" id="iv3-dil-progress-title">
          {t(copy.progressionTitle, locale)}
        </h3>
        <ol className="iv3-dil-progress" aria-label={t(copy.progressionTitle, locale)}>
          {economicProgression.map((step) => (
            <li key={step.en}>{t(step, locale)}</li>
          ))}
        </ol>
        <p className="iv3-dil-question">
          <strong>{t(copy.seedQuestionLabel, locale)}</strong>
          {t(copy.seedQuestion, locale)}
        </p>
      </section>

      <SeedProofQuestions locale={locale} />
    </div>
  );
}
