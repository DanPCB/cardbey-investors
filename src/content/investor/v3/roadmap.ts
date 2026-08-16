import type { RoadmapItem } from "../schemas/types";

/** Platform-module roadmap for V3 — future stages clearly labeled */
export const investorV3Roadmap: RoadmapItem[] = [
  {
    id: "v3-roadmap-ops",
    phase: { en: "Business Operating Module", vi: "Mô-đun Vận hành Doanh nghiệp" },
    timeframe: { en: "Current", vi: "Hiện tại" },
    summary: {
      en: "Make businesses structured and digitally operable — the load-bearing prerequisite for later modules.",
      vi: "Làm doanh nghiệp có cấu trúc và vận hành số được — điều kiện tiên quyết cho các mô-đun sau.",
    },
    items: [
      {
        en: "Strengthen storefront, import, operation and device evidence with honest maturity labels.",
        vi: "Củng cố bằng chứng storefront, nhập liệu, vận hành và thiết bị với nhãn chín trung thực.",
      },
    ],
    status: "draft",
    public: true,
  },
  {
    id: "v3-roadmap-network",
    phase: { en: "Digital Network", vi: "Mạng số" },
    timeframe: { en: "Future", vi: "Tương lai" },
    summary: {
      en: "Network participation becomes meaningful only after businesses are operable. Must increase usefulness of the operating module.",
      vi: "Tham gia mạng chỉ có ý nghĩa khi doanh nghiệp đã vận hành được. Phải tăng tính hữu dụng của mô-đun vận hành.",
    },
    items: [
      {
        en: "Planned direction — not presented as completed capability.",
        vi: "Hướng dự kiến — không trình bày như năng lực đã hoàn thành.",
      },
    ],
    status: "draft",
    public: true,
  },
  {
    id: "v3-roadmap-logistics",
    phase: { en: "Logistics", vi: "Logistics" },
    timeframe: { en: "Future", vi: "Tương lai" },
    summary: {
      en: "Logistics grounded in structured commerce — amplifying prior modules, not standing alone.",
      vi: "Logistics dựa trên thương mại có cấu trúc — khuếch đại mô-đun trước, không đứng một mình.",
    },
    items: [
      {
        en: "Vision stage until execution evidence exists.",
        vi: "Giai đoạn tầm nhìn cho đến khi có bằng chứng thực thi.",
      },
    ],
    status: "draft",
    public: true,
  },
  {
    id: "v3-roadmap-finance",
    phase: { en: "Financial Layer", vi: "Lớp Tài chính" },
    timeframe: { en: "Future", vi: "Tương lai" },
    summary: {
      en: "Financial capability attaches to trusted business reality created by earlier modules.",
      vi: "Năng lực tài chính gắn vào thực tế doanh nghiệp đáng tin do các mô-đun trước tạo ra.",
    },
    items: [
      {
        en: "Vision stage — no public financial product claims.",
        vi: "Giai đoạn tầm nhìn — không tuyên bố sản phẩm tài chính công khai.",
      },
    ],
    status: "draft",
    public: true,
  },
];
