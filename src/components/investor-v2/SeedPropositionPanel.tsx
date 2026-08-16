import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import {
  seedCloseMechanics,
  seedFundBuckets,
  seedOwnershipExamples,
  seedPropositionCopy as copy,
  seedSafeProposed,
  seedSafeToFinalise,
  seedSummaryItems,
} from "@/content/investor/v3/seedProposition";
import { growthCapitalCopy } from "@/content/investor/v3/growthCapital";
import { successPathCopy, successSafeChain } from "@/content/investor/v3/successPath";
import { SuccessPathVisual } from "./SuccessPathVisual";

function SeedPropositionSummary({ locale }: { locale: LocaleCode }) {
  return (
    <section className="iv3-seed-prop" aria-labelledby="iv3-seed-prop-title">
      <p className="iv3-visual-kicker">{t(copy.termsKicker, locale)}</p>
      <h3 className="iv3-gc-h" id="iv3-seed-prop-title">
        {t(copy.headline, locale)}
      </h3>
      <dl className="iv3-seed-terms iv3-seed-prop-grid">
        {seedSummaryItems.map((item) => (
          <div key={item.id}>
            <dt>
              <span>{t(item.label, locale)}</span>
            </dt>
            <dd>
              <strong>{t(item.value, locale)}</strong>
            </dd>
          </div>
        ))}
      </dl>
      <p className="iv3-gc-lead">{t(copy.instrumentExplain, locale)}</p>
      <p className="iv3-gc-lead">{t(copy.instrumentNote, locale)}</p>
      <h4 className="iv3-validation-subhead">{t(copy.whyCapTitle, locale)}</h4>
      <p className="iv3-proof-status">{t(copy.whyCapKicker, locale)}</p>
      <p className="iv3-gc-lead">{t(copy.whyCapBody, locale)}</p>
      <p className="iv2-disclosure">{t(copy.legalDisclosure, locale)}</p>
    </section>
  );
}

function InvestorReceive({ locale }: { locale: LocaleCode }) {
  return (
    <section className="iv3-seed-prop" aria-labelledby="iv3-seed-get-title">
      <h3 className="iv3-gc-h" id="iv3-seed-get-title">
        {t(copy.investorAskTitle, locale)}
      </h3>
      <p className="iv3-gc-lead">{t(copy.investorReceive, locale)}</p>
      <p className="iv3-gc-lead">{t(copy.investorOrdinary, locale)}</p>
    </section>
  );
}

function OwnershipExamples({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-seed-prop" aria-labelledby="iv3-seed-cap-title">
      <h3 className="iv3-gc-h" id="iv3-seed-cap-title">
        {t(copy.capTitle, locale)}
      </h3>
      <p className="iv3-visual-kicker">{t(copy.capIllustrative, locale)}</p>
      <p className="iv3-gc-lead">{t(copy.capFormula, locale)}</p>
      <div className="iv3-seed-cap-table-wrap">
        <table className="iv3-seed-cap-table">
          <caption className="iv2-sr-only">{t(copy.capIllustrative, locale)}</caption>
          <thead>
            <tr>
              <th scope="col">{locale === "vi" ? "Đầu tư" : "Investment"}</th>
              <th scope="col">
                {locale === "vi" ? "Tỷ lệ khái niệm" : "Conceptual share"}
              </th>
            </tr>
          </thead>
          <tbody>
            {seedOwnershipExamples.map((row) => (
              <tr key={row.investment.en}>
                <td>{t(row.investment, locale)}</td>
                <td>{t(row.share, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="iv2-disclosure">{t(copy.capNote, locale)}</p>
    </figure>
  );
}

function WhatA3MBuys({ locale }: { locale: LocaleCode }) {
  return (
    <section className="iv3-seed-prop" aria-labelledby="iv3-seed-buy-title">
      <h3 className="iv3-gc-h" id="iv3-seed-buy-title">
        {t(copy.buyTitle, locale)}
      </h3>
      <p className="iv3-seed-buy-hero">{t(copy.buyHero, locale)}</p>
      <p className="iv3-gc-lead">{t(copy.buyLead, locale)}</p>
    </section>
  );
}

function UseOfFunds({ locale }: { locale: LocaleCode }) {
  return (
    <section className="iv3-seed-prop" aria-labelledby="iv3-seed-funds-title">
      <h3 className="iv3-gc-h" id="iv3-seed-funds-title">
        {t(copy.fundsTitle, locale)}
      </h3>
      <p className="iv3-gc-lead">{t(copy.fundsLead, locale)}</p>
      <div className="iv3-seed-funds">
        {seedFundBuckets.map((bucket) => (
          <article key={bucket.id}>
            <span className="iv3-seed-funds-n">{bucket.n}</span>
            <h4>{t(bucket.title, locale)}</h4>
            <p>{t(bucket.body, locale)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Public pitch capital chapter — proposed terms plus one development roadmap. */
export function SeedPropositionPanel({ locale }: { locale: LocaleCode }) {
  return (
    <div className="iv3-seed-prop-stack">
      <SeedPropositionSummary locale={locale} />
      <InvestorReceive locale={locale} />
      <OwnershipExamples locale={locale} />
      <WhatA3MBuys locale={locale} />
      <UseOfFunds locale={locale} />
      <SuccessPathVisual locale={locale} />
    </div>
  );
}

/** Diligence-only SAFE and close mechanics. Not a completed legal instrument. */
export function SafeDiligencePanel({ locale }: { locale: LocaleCode }) {
  return (
    <div className="iv3-seed-prop" id="drawer-safe">
      <p className="iv3-visual-kicker">
        {locale === "vi" ? "Phụ thuộc rà soát pháp lý / chưa cuối cùng" : "Subject to legal review / not final"}
      </p>
      <h3 className="iv3-gc-h">{t(copy.safeDrawerTitle, locale)}</h3>
      <p className="iv3-gc-lead">{t(copy.safeDrawerLead, locale)}</p>
      <h4 className="iv3-validation-subhead">
        {locale === "vi" ? "Đề xuất" : "Proposed"}
      </h4>
      <ul className="iv3-drawer-list">
        {seedSafeProposed.map((item) => (
          <li key={item.en}>{t(item, locale)}</li>
        ))}
      </ul>
      <h4 className="iv3-validation-subhead">{t(successPathCopy.safeChainTitle, locale)}</h4>
      <ol className="iv3-drawer-list iv3-success-safe-chain">
        {successSafeChain.map((item) => (
          <li key={item.en}>{t(item, locale)}</li>
        ))}
      </ol>
      <h4 className="iv3-validation-subhead">{t(copy.toFinaliseTitle, locale)}</h4>
      <ul className="iv3-drawer-list">
        {seedSafeToFinalise.map((item) => (
          <li key={item.en}>{t(item, locale)}</li>
        ))}
      </ul>
      <h4 className="iv3-validation-subhead">{t(copy.closeTitle, locale)}</h4>
      <p className="iv3-gc-lead">{t(copy.closeLead, locale)}</p>
      <dl className="iv3-seed-terms">
        {seedCloseMechanics.map((row) => (
          <div key={row.label.en}>
            <dt>
              <span>{t(row.label, locale)}</span>
            </dt>
            <dd>
              <strong>{t(row.value, locale)}</strong>
            </dd>
          </div>
        ))}
      </dl>
      <p className="iv2-disclosure">{t(growthCapitalCopy.disclosure, locale)}</p>
    </div>
  );
}
