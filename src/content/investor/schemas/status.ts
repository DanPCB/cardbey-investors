/** Content maturity — editorial / claim readiness */
export const CONTENT_STATUSES = [
  "verified",
  "draft",
  "placeholder",
  "needs_source",
  "confidential",
  "not_for_public_site",
] as const;

export type ContentStatus = (typeof CONTENT_STATUSES)[number];

/** Product capability maturity — investor-facing mapping applied at render time */
export const PRODUCT_STATUSES = [
  "live",
  "pilot",
  "development",
  "planned",
  "vision",
] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

/** Investor-facing labels for product maturity (never expose internal-only tags raw) */
export const PRODUCT_STATUS_LABEL: Record<
  ProductStatus,
  { en: string; vi: string }
> = {
  live: { en: "Available now", vi: "Đã sẵn sàng" },
  pilot: { en: "In pilot", vi: "Đang thử nghiệm" },
  development: { en: "In development", vi: "Đang phát triển" },
  planned: { en: "Planned", vi: "Đã lên kế hoạch" },
  vision: { en: "Long-term vision", vi: "Tầm nhìn dài hạn" },
};

export const CONTENT_STATUS_LABEL: Record<
  ContentStatus,
  { en: string; vi: string }
> = {
  verified: { en: "Verified", vi: "Đã xác minh" },
  draft: { en: "Draft", vi: "Bản nháp" },
  placeholder: { en: "Placeholder — confirmation required", vi: "Chỗ trống — cần xác nhận" },
  needs_source: { en: "Needs source", vi: "Cần nguồn" },
  confidential: { en: "Confidential", vi: "Bảo mật" },
  not_for_public_site: { en: "Internal only", vi: "Chỉ nội bộ" },
};

export type MetricDisplayKind =
  | "historical"
  | "target"
  | "model"
  | "estimate"
  | "projection"
  | "placeholder";

export function isPubliclyRenderableContent(status: ContentStatus): boolean {
  return status !== "confidential" && status !== "not_for_public_site";
}

export function canShowMetricAsFact(status: ContentStatus): boolean {
  return status === "verified";
}
