import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import {
  getPublicPrebuiltExample,
  prebuiltProofCopy as copy,
  prebuiltProofSteps,
} from "@/content/investor/v3/prebuiltProof";

/**
 * Compact proof card under the Resource Aggregation Accelerator.
 * Not a product gallery and not a redefinition of Cardbey as a store generator.
 */
export function PrebuiltProofCard({ locale }: { locale: LocaleCode }) {
  const example = getPublicPrebuiltExample();

  return (
    <aside
      className="iv3-proof"
      aria-label={
        locale === "vi" ? "Minh chứng cụ thể của cơ chế" : "Concrete demonstration of the mechanism"
      }
    >
      <p className="iv3-visual-kicker">{t(copy.kicker, locale)}</p>
      <p className="iv3-proof-lead">{t(copy.resources, locale)}</p>
      <p className="iv3-proof-lead">{t(copy.gap, locale)}</p>
      <p className="iv3-proof-lead">{t(copy.mechanism, locale)}</p>

      <ol className="iv3-proof-steps">
        {prebuiltProofSteps.map((step) => (
          <li key={step.en}>{t(step, locale)}</li>
        ))}
      </ol>

      {example?.assetPath ? (
        <figure className="iv3-proof-example">
          <img src={example.assetPath} alt={t(example.altText, locale)} />
          <figcaption>
            <strong>{t(copy.exampleCaption, locale)}</strong>
            <span>{t(copy.exampleNote, locale)}</span>
          </figcaption>
        </figure>
      ) : null}

      <p className="iv3-proof-distinction">{t(copy.distinction, locale)}</p>
      <p className="iv3-proof-status">{t(copy.existsLabel, locale)}</p>
      <p className="iv2-disclosure">{t(copy.notMoat, locale)}</p>
    </aside>
  );
}
