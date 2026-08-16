import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import {
  businessDiligenceCopy as copy,
  capabilityLadder,
  firstBusinessNeeds,
  humanExamples,
} from "@/content/investor/v3/businessDiligence";
import { DoctrineNarrativesPanel } from "./DoctrineNarratives";

export function VisionMarketPanel({
  locale,
  isDev,
}: {
  locale: LocaleCode;
  isDev: boolean;
}) {
  return (
    <div className="iv3-dil">
      <section className="iv3-dil-block" aria-labelledby="iv3-dil-market-title">
        <h3 className="iv3-dil-h" id="iv3-dil-market-title">
          {t(copy.marketTitle, locale)}
        </h3>
        <p className="iv3-gc-lead">{t(copy.marketP1, locale)}</p>
        <p className="iv3-dil-principle">{t(copy.marketP2, locale)}</p>
        <p className="iv3-gc-lead">{t(copy.marketP3, locale)}</p>
      </section>

      <section className="iv3-dil-block" aria-labelledby="iv3-dil-hyp-title">
        <h3 className="iv3-dil-h" id="iv3-dil-hyp-title">
          {t(copy.hypothesisTitle, locale)}
        </h3>
        <p className="iv3-visual-kicker">{t(copy.hypothesisMarkets, locale)}</p>
        <p className="iv3-gc-lead">{t(copy.hypothesisLead, locale)}</p>
        <div className="iv3-dil-markets">
          <article>
            <h4>{t(copy.auTitle, locale)}</h4>
            <p>{t(copy.auBody, locale)}</p>
          </article>
          <article>
            <h4>{t(copy.vnTitle, locale)}</h4>
            <p>{t(copy.vnBody, locale)}</p>
          </article>
        </div>
        <article className="iv3-dil-link-hyp">
          <h4>{t(copy.linkTitle, locale)}</h4>
          <p>{t(copy.linkBody, locale)}</p>
        </article>
        <article className="iv3-dil-link-hyp">
          <h4>{t(copy.accessTitle, locale)}</h4>
          <p>{t(copy.accessBody, locale)}</p>
        </article>
      </section>

      <section className="iv3-dil-block" aria-labelledby="iv3-dil-who-title">
        <h3 className="iv3-dil-h" id="iv3-dil-who-title">
          {t(copy.whoTitle, locale)}
        </h3>
        <p className="iv3-gc-lead">{t(copy.whoLead, locale)}</p>
        <ul className="iv3-dil-chips">
          {firstBusinessNeeds.map((item) => (
            <li key={item.en}>{t(item, locale)}</li>
          ))}
        </ul>
      </section>

      <section className="iv3-dil-block" aria-labelledby="iv3-dil-ladder-title">
        <h3 className="iv3-dil-h" id="iv3-dil-ladder-title">
          {t(copy.ladderTitle, locale)}
        </h3>
        <ol className="iv3-dil-ladder">
          {capabilityLadder.map((layer) => (
            <li key={layer.id} data-layer={layer.id}>
              <div className="iv3-dil-row-head">
                <h4>{t(layer.title, locale)}</h4>
                <span className="iv3-dil-status" data-status={layer.id === "now" ? "validating" : "direction"}>
                  {t(layer.status, locale)}
                </span>
              </div>
              <ul className="iv3-dil-chips">
                {layer.items.map((item) => (
                  <li key={item.en}>{t(item, locale)}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="iv2-disclosure">{t(copy.ladderNote, locale)}</p>
      </section>

      <section className="iv3-dil-block" aria-labelledby="iv3-dil-human-title">
        <h3 className="iv3-dil-h" id="iv3-dil-human-title">
          {t(copy.humanTitle, locale)}
        </h3>
        <p className="iv3-gc-lead">{t(copy.humanLead, locale)}</p>
        <ul className="iv3-dil-chips">
          {humanExamples.map((item) => (
            <li key={item.en}>{t(item, locale)}</li>
          ))}
        </ul>
        <p className="iv3-gc-lead">{t(copy.humanNote, locale)}</p>
        <p className="iv3-dil-status-line">{t(copy.humanStatus, locale)}</p>
      </section>

      <p className="iv2-disclosure">{t(copy.philosophyNote, locale)}</p>
      <DoctrineNarrativesPanel locale={locale} isDev={isDev} />
    </div>
  );
}
