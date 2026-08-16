import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";

const close = {
  en: "The opportunity is visible. The mechanism has a foundation. Phase 1 is about testing how far it can go in the market.",
  vi: "Cơ hội đã được xác định. Cơ chế đã có nền tảng. Giai đoạn 1 sẽ kiểm chứng cơ chế đó trong hoạt động thị trường thực tế.",
} as const;

/**
 * Invitation close — execution-oriented, not a warning slogan.
 */
export function SeedOpportunityPanel({
  locale,
}: {
  locale: LocaleCode;
  isDev?: boolean;
}) {
  return (
    <p className="iv3-seed-close">{t(close, locale)}</p>
  );
}
