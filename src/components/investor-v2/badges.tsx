import {
  CONTENT_STATUS_LABEL,
  PRODUCT_STATUS_LABEL,
  type ContentStatus,
  type LocaleCode,
  type ProductStatus,
} from "@/content/investor";

export function ProductStatusBadge({
  status,
  locale,
}: {
  status: ProductStatus;
  locale: LocaleCode;
}) {
  return (
    <span className="iv2-badge" data-status={status}>
      {PRODUCT_STATUS_LABEL[status][locale]}
    </span>
  );
}

export function EvidenceBadge({
  status,
  locale,
}: {
  status: ContentStatus;
  locale: LocaleCode;
}) {
  if (status === "verified") {
    return (
      <span className="iv2-badge" data-kind="verified">
        {CONTENT_STATUS_LABEL.verified[locale]}
      </span>
    );
  }
  if (status === "placeholder" || status === "needs_source" || status === "draft") {
    return (
      <span className="iv2-badge" data-kind={status}>
        {CONTENT_STATUS_LABEL[status][locale]}
      </span>
    );
  }
  return null;
}
