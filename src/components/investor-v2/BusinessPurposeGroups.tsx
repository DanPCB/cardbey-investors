import type { LocaleCode, ProductCapability } from "@/content/investor";
import { t } from "@/content/investor";
import { ProductStatusBadge } from "./badges";

const PURPOSE_GROUPS: {
  id: string;
  title: { en: string; vi: string };
  capabilityIds: string[];
}[] = [
  {
    id: "create",
    title: {
      en: "Create & understand a business",
      vi: "Tạo & hiểu một doanh nghiệp",
    },
    capabilityIds: [
      "cap-business-import",
      "cap-ai-storefront",
      "cap-structured-drafts",
      "cap-storefront-localization",
    ],
  },
  {
    id: "operate",
    title: {
      en: "Operate with AI assistance",
      vi: "Vận hành với hỗ trợ AI",
    },
    capabilityIds: [
      "cap-ai-performer",
      "cap-business-memory",
      "cap-conversation-localization",
    ],
  },
  {
    id: "promote",
    title: {
      en: "Promote & grow",
      vi: "Quảng bá & tăng trưởng",
    },
    capabilityIds: ["cap-growth-engine", "cap-partner-attribution"],
  },
  {
    id: "reach",
    title: {
      en: "Reach customers",
      vi: "Tiếp cận khách hàng",
    },
    capabilityIds: [
      "cap-smart-display-runtime",
      "cap-device-pairing",
      "cap-signage-scheduling",
    ],
  },
];

/**
 * Groups capabilities by business purpose for the commercial pitch —
 * not a dump of the full technical registry.
 */
export function BusinessPurposeGroups({
  capabilities,
  locale,
  allowedIds,
}: {
  capabilities: ProductCapability[];
  locale: LocaleCode;
  allowedIds?: string[];
}) {
  const byId = new Map(capabilities.map((c) => [c.id, c]));

  return (
    <div className="iv3-purpose-groups" aria-label={locale === "vi" ? "Theo mục đích kinh doanh" : "By business purpose"}>
      {PURPOSE_GROUPS.map((group) => {
        const items = group.capabilityIds
          .filter((id) => !allowedIds || allowedIds.includes(id))
          .map((id) => byId.get(id))
          .filter((c): c is ProductCapability => Boolean(c));
        if (!items.length) return null;
        return (
          <section className="iv3-purpose-group" key={group.id}>
            <h3>{t(group.title, locale)}</h3>
            <ul className="iv3-purpose-list">
              {items.map((capability) => (
                <li key={capability.id}>
                  <div className="iv3-purpose-item-head">
                    <strong>{t(capability.title, locale)}</strong>
                    <ProductStatusBadge status={capability.status} locale={locale} />
                  </div>
                  <p>{t(capability.shortDescription, locale)}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
