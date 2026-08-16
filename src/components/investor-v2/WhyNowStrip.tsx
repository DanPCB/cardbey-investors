import type { LocaleCode } from "@/content/investor";

/** Compact WHY NOW strip — merged into Expansion chapter */
export function WhyNowStrip({ locale }: { locale: LocaleCode }) {
  const items =
    locale === "vi"
      ? [
          { k: "AI", v: "trí tuệ dễ tiếp cận" },
          { k: "Cloud + API", v: "hạ tầng tái sử dụng" },
          { k: "Nền tảng toàn cầu", v: "thị trường tiếp cận được" },
          { k: "Tự động hóa", v: "năng lực thực thi lớn hơn" },
          { k: "Công việc tích lũy", v: "nền tảng khởi đầu" },
        ]
      : [
          { k: "AI", v: "accessible intelligence" },
          { k: "Cloud + APIs", v: "reusable infrastructure" },
          { k: "Global platforms", v: "reachable markets" },
          { k: "Automation", v: "greater execution capacity" },
          { k: "Accumulated work", v: "starting foundation" },
        ];

  return (
    <figure
      className="iv3-why-now-strip"
      aria-label={locale === "vi" ? "Vì sao bây giờ" : "Why now"}
    >
      <figcaption className="iv3-visual-kicker">
        {locale === "vi" ? "Vì sao bây giờ" : "Why now"}
      </figcaption>
      <ul className="iv3-why-now-list">
        {items.map((item) => (
          <li key={item.k}>
            <strong>{item.k}</strong>
            <span>→ {item.v}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
