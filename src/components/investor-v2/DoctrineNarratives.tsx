import {
  countDoctrineNarrativesByDepth,
  getPublicDoctrineNarratives,
  type CustomerDoctrineNarrative,
} from "@/content/doctrine";
import type { LocaleCode } from "@/content/investor";

function NarrativeCard({
  narrative,
  locale,
}: {
  narrative: CustomerDoctrineNarrative;
  locale: LocaleCode;
}) {
  return (
    <article className="iv2-doctrine-card">
      <p className="iv2-eyebrow">
        {locale === "vi" ? "Bằng chứng học thuyết" : "Doctrine evidence"}
      </p>
      <h3>{narrative.publicLabel}</h3>
      <p>
        <strong>{locale === "vi" ? "Vấn đề" : "Problem"}:</strong>{" "}
        {narrative.initialProblem}
      </p>
      <p>
        <strong>{locale === "vi" ? "Cardbey đã giải" : "Cardbey solved"}:</strong>{" "}
        {narrative.whatCardbeySolved}
      </p>
      <p>
        <strong>{locale === "vi" ? "Năng lực tăng" : "Capability increased"}:</strong>{" "}
        {narrative.capabilityIncreased}
      </p>
      {narrative.relationshipExpanded ? (
        <p>
          <strong>{locale === "vi" ? "Quan hệ mở rộng" : "Relationship expanded"}:</strong>{" "}
          {narrative.relationshipNotes ||
            (locale === "vi" ? "Có" : "Yes")}
        </p>
      ) : null}
      {narrative.moduleCompounding && narrative.modulesCompounded?.length ? (
        <p>
          <strong>{locale === "vi" ? "Mô-đun cộng dồn" : "Modules compounded"}:</strong>{" "}
          {narrative.modulesCompounded.join(" · ")}
        </p>
      ) : null}
    </article>
  );
}

/**
 * Public doctrine narratives only. Collapses entirely when none are approved —
 * no empty testimonial theatre.
 */
export function DoctrineNarrativesPanel({
  locale,
  isDev = false,
}: {
  locale: LocaleCode;
  isDev?: boolean;
}) {
  const list = getPublicDoctrineNarratives();
  const stats = countDoctrineNarrativesByDepth();

  if (!list.length) {
    if (!isDev) return null;
    return (
      <p className="iv2-placeholder-note">
        {locale === "vi"
          ? `DEV: ${stats.missingOrUnpublished} câu chuyện học thuyết chưa công bố.`
          : `DEV: ${stats.missingOrUnpublished} doctrine narratives unpublished.`}
      </p>
    );
  }

  return (
    <div className="iv2-doctrine-stack" aria-label={locale === "vi" ? "Bằng chứng học thuyết" : "Doctrine evidence"}>
      <h3 className="iv2-built-heading">
        {locale === "vi"
          ? "Bằng chứng từ doanh nghiệp thực"
          : "Evidence from real businesses"}
      </h3>
      {list.map((narrative) => (
        <NarrativeCard key={narrative.id} narrative={narrative} locale={locale} />
      ))}
    </div>
  );
}
