import type { LocaleCode } from "@/content/investor";

export function CompactCommercialLadder({ locale }: { locale: LocaleCode }) {
  return (
    <details className="iv3-compact-commercial">
      <summary>
        {locale === "vi" ? "Cardbey kiếm tiền thế nào (gọn)" : "How Cardbey can make money (compact)"}
      </summary>
      <ol className="iv3-compact-ladder">
        <li>
          <strong>{locale === "vi" ? "Dịch vụ kinh doanh" : "Business services"}</strong>
          <span> — {locale === "vi" ? "ĐÃ CÓ / ĐANG KIỂM CHỨNG" : "EXISTS / VALIDATING"}</span>
        </li>
        <li>
          <strong>{locale === "vi" ? "Năng lực định kỳ" : "Recurring capability"}</strong>
          <span> — {locale === "vi" ? "ĐANG KIỂM CHỨNG" : "VALIDATING"}</span>
        </li>
        <li>
          <strong>{locale === "vi" ? "Hoạt động thương mại" : "Commercial activity"}</strong>
          <span> — {locale === "vi" ? "ĐANG KIỂM CHỨNG / ĐỊNH HƯỚNG" : "VALIDATING / DIRECTION"}</span>
        </li>
        <li>
          <strong>{locale === "vi" ? "Tham gia nền tảng" : "Platform participation"}</strong>
          <span> — {locale === "vi" ? "ĐỊNH HƯỚNG" : "DIRECTION"}</span>
        </li>
        <li>
          <strong>{locale === "vi" ? "Kinh tế mạng" : "Network economics"}</strong>
          <span> — {locale === "vi" ? "ĐỊNH HƯỚNG" : "DIRECTION"}</span>
        </li>
      </ol>
      <p className="iv2-disclosure">
        {locale === "vi"
          ? "Không invent doanh thu. Lớp ĐỊNH HƯỚNG không phải doanh thu hiện tại."
          : "No invented revenue. DIRECTION layers are not current revenue."}
      </p>
    </details>
  );
}
