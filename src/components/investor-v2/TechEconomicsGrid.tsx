import type { LocaleCode } from "@/content/investor";

/** Commercial consequence of capabilities — qualitative, not savings claims */
const TECH_ECONOMICS: {
  id: string;
  en: string;
  vi: string;
  effectEn: string;
  effectVi: string;
}[] = [
  {
    id: "import",
    en: "Business Import",
    vi: "Nhập doanh nghiệp",
    effectEn: "Reduce onboarding and setup effort",
    effectVi: "Giảm công sức onboarding và thiết lập",
  },
  {
    id: "storefront",
    en: "Storefront",
    vi: "Storefront",
    effectEn: "Establish digital presence and commerce surface",
    effectVi: "Thiết lập hiện diện số và bề mặt thương mại",
  },
  {
    id: "performer",
    en: "Performer",
    vi: "Performer",
    effectEn: "Assist policy-bounded preparation and execution of repeatable tasks",
    effectVi: "Hỗ trợ chuẩn bị và thực thi tác vụ lặp lại trong phạm vi chính sách",
  },
  {
    id: "language",
    en: "Language Intelligence",
    vi: "Language Intelligence",
    effectEn: "Support expansion across languages and markets",
    effectVi: "Hỗ trợ mở rộng đa ngôn ngữ và thị trường",
  },
  {
    id: "memory",
    en: "Business Memory",
    vi: "Bộ nhớ doanh nghiệp",
    effectEn: "Retain useful context across interactions",
    effectVi: "Giữ ngữ cảnh hữu ích qua các tương tác",
  },
  {
    id: "growth",
    en: "Growth Engine",
    vi: "Growth Engine",
    effectEn: "Create attributable acquisition and partner pathways",
    effectVi: "Tạo đường dẫn thu hút và đối tác có ghi nhận",
  },
  {
    id: "display",
    en: "Display Runtime",
    vi: "Runtime hiển thị",
    effectEn: "Extend into physical distribution surfaces",
    effectVi: "Mở rộng sang bề mặt phân phối vật lý",
  },
];

export function TechEconomicsGrid({ locale }: { locale: LocaleCode }) {
  return (
    <div className="iv3-tech-econ" aria-label={locale === "vi" ? "Hệ quả thương mại" : "Commercial consequence"}>
      {TECH_ECONOMICS.map((row) => (
        <article key={row.id} className="iv3-tech-econ-row">
          <h3>{locale === "vi" ? row.vi : row.en}</h3>
          <p>{locale === "vi" ? row.effectVi : row.effectEn}</p>
        </article>
      ))}
      <p className="iv2-disclosure">
        {locale === "vi"
          ? "Diễn giải kinh tế — không phải số liệu tiết kiệm hay doanh thu đã xác minh."
          : "Economic interpretation — not verified savings or revenue figures."}
      </p>
    </div>
  );
}
