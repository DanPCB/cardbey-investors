import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import {
  economicActivitySteps,
  operatingCapabilities,
  operatingLayerCopy as copy,
  operatingSurfaces,
  revenueFutureItems,
  revenueNowItems,
  revenueValidateItems,
} from "@/content/investor/v3/operatingLayer";

/**
 * Commercial operating layer under the Practice explorer.
 * Not a product catalogue and not a second thesis.
 */
export function OperatingLayer({ locale }: { locale: LocaleCode }) {
  return (
    <div
      className="iv3-op"
      id="operating-layer"
      aria-label={
        locale === "vi"
          ? "Lớp vận hành và thương mại quanh một ngữ cảnh kinh tế"
          : "Operating and commercial layer around one economic context"
      }
    >
      <p className="iv3-visual-kicker">{t(copy.kicker, locale)}</p>
      <p className="iv3-op-spine">{t(copy.spine, locale)}</p>
      <p className="iv3-op-lead">{t(copy.lead, locale)}</p>

      <section className="iv3-op-chain" aria-labelledby="iv3-op-start-title">
        <h4 className="iv3-validation-subhead" id="iv3-op-start-title">
          {t(copy.startKicker, locale)}
        </h4>
        <ul className="iv3-op-surface-grid">
          <li>
            <strong>{t(copy.startExisting, locale)}</strong>
            <span>{t(copy.startExistingBody, locale)}</span>
          </li>
          <li>
            <strong>{t(copy.startNew, locale)}</strong>
            <span>{t(copy.startNewBody, locale)}</span>
          </li>
        </ul>
        <p className="iv3-op-chain-arrow">{t(copy.contextLine, locale)}</p>
        <p className="iv3-op-destination">{t(copy.destinationNote, locale)}</p>
      </section>

      <div className="iv3-op-table-wrap">
        <table className="iv3-op-table">
          <caption className="iv3-op-caption">{t(copy.tableCaption, locale)}</caption>
          <thead>
            <tr>
              <th scope="col">{t(copy.colCapability, locale)}</th>
              <th scope="col">{t(copy.colFunction, locale)}</th>
              <th scope="col">{t(copy.colStatus, locale)}</th>
            </tr>
          </thead>
          <tbody>
            {operatingCapabilities.map((row) => (
              <tr key={row.id} data-status={row.status.en.split(" / ")[0]}>
                <th scope="row">
                  {t(row.capability, locale)}
                  {row.note ? <span className="iv3-op-note">{t(row.note, locale)}</span> : null}
                </th>
                <td>{t(row.economicFn, locale)}</td>
                <td>
                  <span className="iv3-op-status">{t(row.status, locale)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="iv2-disclosure">{t(copy.existsNote, locale)}</p>

      <section className="iv3-op-surfaces" aria-labelledby="iv3-op-surfaces-title">
        <h4 className="iv3-validation-subhead" id="iv3-op-surfaces-title">
          {t(copy.surfacesKicker, locale)}
        </h4>
        <p className="iv3-op-lead">{t(copy.surfacesLead, locale)}</p>
        <ul className="iv3-op-surface-grid">
          {operatingSurfaces.map((surface) => (
            <li key={surface.id}>
              <strong>{t(surface.title, locale)}</strong>
              <span>{t(surface.items, locale)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="iv3-op-activity" aria-labelledby="iv3-op-activity-title">
        <h4 className="iv3-validation-subhead" id="iv3-op-activity-title">
          {t(copy.activityKicker, locale)}
        </h4>
        <ol className="iv3-proof-steps">
          {economicActivitySteps.map((step) => (
            <li key={step.en}>{t(step, locale)}</li>
          ))}
        </ol>
      </section>

      <section className="iv3-op-revenue" aria-labelledby="iv3-op-revenue-title">
        <h4 className="iv3-validation-subhead" id="iv3-op-revenue-title">
          {t(copy.revenueKicker, locale)}
        </h4>
        <p className="iv3-op-lead">{t(copy.revenueLead, locale)}</p>
        <div className="iv3-op-rev-grid">
          <article>
            <h5 className="iv3-op-rev-h">{t(copy.nowTitle, locale)}</h5>
            <p>{t(copy.nowLead, locale)}</p>
            <ul>
              {revenueNowItems.map((item) => (
                <li key={item.en}>{t(item, locale)}</li>
              ))}
            </ul>
          </article>
          <article>
            <h5 className="iv3-op-rev-h">{t(copy.validateTitle, locale)}</h5>
            <p>{t(copy.validateLead, locale)}</p>
            <ul>
              {revenueValidateItems.map((item) => (
                <li key={item.en}>{t(item, locale)}</li>
              ))}
            </ul>
          </article>
          <article>
            <h5 className="iv3-op-rev-h">{t(copy.futureTitle, locale)}</h5>
            <p>{t(copy.futureLead, locale)}</p>
            <ul>
              {revenueFutureItems.map((item) => (
                <li key={item.en}>{t(item, locale)}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
