import type { RoadmapItem } from "../schemas/types";

/** Capability-maturity roadmap — no speculative IPO/calendar promises */
export const investorRoadmap: RoadmapItem[] = [
  {
    id: "roadmap-foundation",
    phase: { en: "Foundation", vi: "Nền tảng" },
    timeframe: { en: "Capability stage", vi: "Giai đoạn năng lực" },
    summary: {
      en: "Business creation, import, storefront platform and shared device runtime.",
      vi: "Tạo lập doanh nghiệp, nhập liệu, nền tảng storefront và runtime thiết bị dùng chung.",
    },
    items: [
      {
        en: "Strengthen evidence for storefront, import kernel and device runtime.",
        vi: "Củng cố bằng chứng storefront, import kernel và runtime thiết bị.",
      },
    ],
    status: "draft",
    public: true,
  },
  {
    id: "roadmap-assisted",
    phase: { en: "Assisted operation", vi: "Vận hành có hỗ trợ" },
    timeframe: { en: "Capability stage", vi: "Giai đoạn năng lực" },
    summary: {
      en: "Role-based agents, preferences, readiness, language intelligence and growth workflows.",
      vi: "Agent theo vai trò, tùy chọn, sẵn sàng, language intelligence và quy trình tăng trưởng.",
    },
    items: [
      {
        en: "Expand permissioned agent workflows with reviewable outputs.",
        vi: "Mở rộng quy trình agent có phân quyền với kết quả có thể rà soát.",
      },
    ],
    status: "draft",
    public: true,
  },
  {
    id: "roadmap-connected",
    phase: { en: "Connected business network", vi: "Mạng doanh nghiệp kết nối" },
    timeframe: { en: "Capability stage", vi: "Giai đoạn năng lực" },
    summary: {
      en: "Cross-channel context, physical-to-digital attribution, broader device distribution and reusable category workflows.",
      vi: "Ngữ cảnh đa kênh, ghi nhận vật lý–số, phân phối thiết bị rộng hơn và quy trình theo ngành tái sử dụng.",
    },
    items: [
      {
        en: "Connect distribution surfaces with attributable commerce and knowledge.",
        vi: "Kết nối bề mặt phân phối với thương mại có ghi nhận và tri thức.",
      },
    ],
    status: "draft",
    public: true,
  },
  {
    id: "roadmap-long",
    phase: { en: "Long-term direction", vi: "Hướng dài hạn" },
    timeframe: { en: "Vision", vi: "Tầm nhìn" },
    summary: {
      en: "Increasingly autonomous operations, international participation, and broader agent/partner ecosystem — vision, not commitment.",
      vi: "Vận hành ngày càng tự chủ hơn, tham gia quốc tế, và hệ sinh thái agent/đối tác rộng hơn — tầm nhìn, không phải cam kết.",
    },
    items: [
      {
        en: "Remain explicit about maturity; do not present vision as achieved traction.",
        vi: "Giữ rõ mức độ chín; không trình bày tầm nhìn như traction đã đạt.",
      },
    ],
    status: "draft",
    public: true,
  },
];
