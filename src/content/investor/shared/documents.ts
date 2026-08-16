import type { InvestorResource } from "../schemas/types";

export const investorResources: InvestorResource[] = [
  {
    id: "res-pack-en",
    title: { en: "Investor overview (English)", vi: "Tổng quan nhà đầu tư (tiếng Anh)" },
    description: {
      en: "Provided following a request — not a public direct download.",
      vi: "Được cung cấp sau khi có yêu cầu — không phải tệp tải trực tiếp trên trang công khai.",
    },
    category: "deck",
    accessLevel: "request",
    href: "#contact",
    language: "en",
    confidentiality: "draft",
    availability: "request_only",
    resourceState: "available_on_request",
    public: true,
  },
  {
    id: "res-pack-vi",
    title: { en: "Investor overview (Vietnamese)", vi: "Tổng quan nhà đầu tư (tiếng Việt)" },
    description: {
      en: "Provided following a request — not a public direct download.",
      vi: "Được cung cấp sau khi có yêu cầu — không phải tệp tải trực tiếp trên trang công khai.",
    },
    category: "deck",
    accessLevel: "request",
    href: "#contact",
    language: "vi",
    confidentiality: "draft",
    availability: "request_only",
    resourceState: "available_on_request",
    public: true,
  },
  {
    id: "res-detailed-deck",
    title: { en: "Detailed investor deck", vi: "Deck nhà đầu tư chi tiết" },
    description: {
      en: "Available on request after qualification. Materials are provided following the request.",
      vi: "Có theo yêu cầu sau khi đủ điều kiện. Tài liệu được cung cấp sau khi có yêu cầu.",
    },
    category: "deck",
    accessLevel: "request",
    href: "#contact",
    confidentiality: "draft",
    availability: "request_only",
    resourceState: "available_on_request",
    public: true,
  },
  {
    id: "res-safe-en",
    title: { en: "SAFE documentation", vi: "Tài liệu SAFE" },
    description: {
      en: "Unavailable until confirmed and legally reviewed for disclosure.",
      vi: "Chưa sẵn sàng cho đến khi được xác nhận và rà soát pháp lý để công bố.",
    },
    category: "safe",
    accessLevel: "request",
    confidentiality: "needs_source",
    availability: "unavailable",
    resourceState: "unavailable",
    public: true,
  },
  {
    id: "res-financial-model",
    title: { en: "Financial model", vi: "Mô hình tài chính" },
    description: {
      en: "Confidential — qualified investor access only.",
      vi: "Bảo mật — chỉ nhà đầu tư đủ điều kiện.",
    },
    category: "financial_model",
    accessLevel: "confidential",
    confidentiality: "confidential",
    availability: "unavailable",
    resourceState: "confidential",
    public: false,
  },
  {
    id: "res-data-room",
    title: { en: "Data room", vi: "Data room" },
    description: {
      en: "Access by invitation.",
      vi: "Truy cập theo lời mời.",
    },
    category: "data_room",
    accessLevel: "data_room",
    confidentiality: "confidential",
    availability: "unavailable",
    resourceState: "investor_only",
    public: false,
  },
  {
    id: "res-data-room-request",
    title: { en: "Request data room access", vi: "Yêu cầu truy cập data room" },
    description: {
      en: "Request controlled access after qualification.",
      vi: "Yêu cầu truy cập có kiểm soát sau khi đủ điều kiện.",
    },
    category: "other",
    accessLevel: "request",
    href: "#contact",
    confidentiality: "draft",
    availability: "request_only",
    resourceState: "available_on_request",
    public: true,
  },
  {
    id: "res-architecture",
    title: { en: "Product architecture brief", vi: "Tóm tắt kiến trúc sản phẩm" },
    description: {
      en: "Preparing — available on request when ready.",
      vi: "Đang chuẩn bị — có theo yêu cầu khi sẵn sàng.",
    },
    category: "architecture",
    accessLevel: "request",
    href: "#contact",
    confidentiality: "placeholder",
    availability: "placeholder",
    resourceState: "preparing",
    public: true,
  },
  {
    id: "res-contact-founder",
    title: { en: "Contact founder", vi: "Liên hệ founder" },
    description: {
      en: "Request a conversation with the founding team.",
      vi: "Yêu cầu trao đổi với đội ngũ sáng lập.",
    },
    category: "contact",
    accessLevel: "public",
    href: "#contact",
    confidentiality: "draft",
    availability: "available",
    resourceState: "available_on_request",
    public: true,
  },
  {
    id: "res-request-access",
    title: { en: "Request investor materials", vi: "Yêu cầu tài liệu nhà đầu tư" },
    description: {
      en: "Request materials that are not published on the public site. They are provided following the request.",
      vi: "Yêu cầu tài liệu không công bố trên trang công khai. Tài liệu được cung cấp sau khi có yêu cầu.",
    },
    category: "other",
    accessLevel: "request",
    href: "#contact",
    confidentiality: "draft",
    availability: "request_only",
    resourceState: "available_on_request",
    public: true,
  },
];

export function getPublicResources(list: InvestorResource[] = investorResources) {
  return list.filter(
    (r) =>
      r.public &&
      r.confidentiality !== "confidential" &&
      r.confidentiality !== "not_for_public_site" &&
      r.accessLevel !== "confidential" &&
      r.accessLevel !== "data_room"
  );
}

export function resourceStateLabel(
  state: InvestorResource["resourceState"],
  locale: "en" | "vi"
): string {
  const map: Record<string, { en: string; vi: string }> = {
    available_public: { en: "Available publicly", vi: "Công khai" },
    available_on_request: { en: "Available on request", vi: "Theo yêu cầu" },
    investor_only: { en: "Access by invitation", vi: "Theo lời mời" },
    confidential: { en: "Confidential — qualified investor access", vi: "Bảo mật — nhà đầu tư đủ điều kiện" },
    preparing: { en: "Preparing", vi: "Đang chuẩn bị" },
    unavailable: { en: "Unavailable until confirmed", vi: "Chưa sẵn sàng đến khi xác nhận" },
  };
  if (!state) return locale === "vi" ? "Trạng thái tài nguyên" : "Resource status";
  return map[state]?.[locale] || state;
}
