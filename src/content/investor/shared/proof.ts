import type { InvestorProof } from "../schemas/types";

/**
 * Structured proof register.
 * Internal references are never rendered in public UI.
 * Customer/commercial proof stays requires_confirmation / non-public until founder-verified.
 */
export const investorProofs: InvestorProof[] = [
  {
    id: "proof-device-runtime",
    capabilityId: "cap-smart-display-runtime",
    title: {
      en: "Shared device runtime modules",
      vi: "Các mô-đun runtime thiết bị dùng chung",
    },
    description: {
      en: "Pairing, heartbeat, playlist push/confirm and repair-trigger modules exist as an implemented device-engine surface.",
      vi: "Các mô-đun ghép nối, heartbeat, đẩy/xác nhận playlist và kích hoạt sửa chữa đã được triển khai trong lớp device-engine.",
    },
    proofType: "repository",
    maturity: "partially_verified",
    internalReference: "adjacent-server/engines/device",
    verifiedAt: "2026-08-02",
    public: true,
    category: "product",
    notes: "Technical proof only — not a commercial deployment count.",
  },
  {
    id: "proof-device-pairing",
    capabilityId: "cap-device-pairing",
    title: {
      en: "Device pairing flow",
      vi: "Luồng ghép nối thiết bị",
    },
    description: {
      en: "Request/complete pairing tooling is implemented in the device engine.",
      vi: "Công cụ yêu cầu/hoàn tất ghép nối đã được triển khai trong device engine.",
    },
    proofType: "repository",
    maturity: "partially_verified",
    internalReference: "adjacent-server/engines/device/requestPairing.ts",
    verifiedAt: "2026-08-02",
    public: true,
    category: "product",
  },
  {
    id: "proof-playlist",
    capabilityId: "cap-playlist",
    title: {
      en: "Playlist synchronization path",
      vi: "Luồng đồng bộ playlist",
    },
    description: {
      en: "Playlist push and readiness confirmation paths are present in the device engine.",
      vi: "Luồng đẩy playlist và xác nhận sẵn sàng có trong device engine.",
    },
    proofType: "repository",
    maturity: "partially_verified",
    internalReference: "adjacent-server/engines/device/pushPlaylist.ts",
    verifiedAt: "2026-08-02",
    public: true,
    category: "product",
  },
  {
    id: "proof-storefront-api",
    capabilityId: "cap-ai-storefront",
    title: {
      en: "Storefront API surface",
      vi: "Bề mặt API storefront",
    },
    description: {
      en: "Storefront/frontscreen API routes are mounted and return slide/media payloads for digital presence experiences.",
      vi: "Các route API storefront/frontscreen đã được gắn và trả payload slide/media cho trải nghiệm hiện diện số.",
    },
    proofType: "repository",
    maturity: "partially_verified",
    internalReference: "adjacent-server/routes/storefront.js",
    verifiedAt: "2026-08-02",
    public: true,
    category: "product",
    notes: "Does not by itself prove commercial live MVP status.",
  },
  {
    id: "proof-performer",
    capabilityId: "cap-ai-performer",
    title: {
      en: "Performer orchestration routes",
      vi: "Route điều phối Performer",
    },
    description: {
      en: "Performer endpoints support command/chat/share execution with session history persistence hooks.",
      vi: "Các endpoint Performer hỗ trợ thực thi lệnh/chat/chia sẻ kèm hook lưu lịch sử phiên.",
    },
    proofType: "repository",
    maturity: "partially_verified",
    internalReference: "adjacent-server/routes/performer.js",
    verifiedAt: "2026-08-02",
    public: true,
    category: "execution",
  },
  {
    id: "proof-signage-screens",
    capabilityId: "cap-signage-scheduling",
    title: {
      en: "Signage and screen control routes",
      vi: "Route điều khiển biển hiệu và màn hình",
    },
    description: {
      en: "Signage, screens and related device routes exist alongside the shared runtime.",
      vi: "Các route biển hiệu, màn hình và thiết bị liên quan tồn tại cùng runtime dùng chung.",
    },
    proofType: "repository",
    maturity: "partially_verified",
    internalReference: "adjacent-server/routes/signage.js; screens.routes.js; device.routes.js",
    verifiedAt: "2026-08-02",
    public: true,
    category: "execution",
  },
  {
    id: "proof-rewards",
    capabilityId: "cap-growth-engine",
    title: {
      en: "Rewards and behaviour service",
      vi: "Dịch vụ phần thưởng và hành vi",
    },
    description: {
      en: "Rewards balance/history/award endpoints and related transaction logic exist as platform infrastructure.",
      vi: "Các endpoint số dư/lịch sử/ghi nhận phần thưởng và logic giao dịch liên quan tồn tại như hạ tầng nền tảng.",
    },
    proofType: "repository",
    maturity: "partially_verified",
    internalReference: "adjacent-server/routes/rewards.js",
    verifiedAt: "2026-08-02",
    public: true,
    category: "product",
    notes: "Not presented as Partner Pass commercial launch proof.",
  },
  {
    id: "proof-customers",
    title: {
      en: "Customer and partner traction",
      vi: "Traction khách hàng và đối tác",
    },
    description: {
      en: "[CUSTOMER / PARTNER TRACTION REQUIRED]",
      vi: "[CẦN TRACTION KHÁCH HÀNG / ĐỐI TÁC]",
    },
    proofType: "founder_confirmation",
    maturity: "requires_confirmation",
    public: false,
    category: "market",
  },
  {
    id: "proof-revenue",
    title: {
      en: "Commercial revenue evidence",
      vi: "Bằng chứng doanh thu thương mại",
    },
    description: {
      en: "[COMMERCIAL REVENUE EVIDENCE REQUIRED]",
      vi: "[CẦN BẰNG CHỨNG DOANH THU]",
    },
    proofType: "commercial",
    maturity: "requires_confirmation",
    public: false,
    category: "commercial",
  },
  {
    id: "proof-display-deployments",
    title: {
      en: "Physical display deployments",
      vi: "Triển khai màn hình vật lý",
    },
    description: {
      en: "[DEVICE DEPLOYMENT COUNT / LOCATIONS REQUIRED]",
      vi: "[CẦN SỐ LƯỢNG / ĐỊA ĐIỂM TRIỂN KHAI THIẾT BỊ]",
    },
    proofType: "device",
    maturity: "requires_confirmation",
    public: false,
    category: "distribution",
  },
];

export function getPublicProofs(list: InvestorProof[] = investorProofs) {
  return list.filter(
    (p) =>
      p.public &&
      p.maturity !== "requires_confirmation" &&
      p.proofType !== "customer" &&
      p.proofType !== "commercial"
  );
}

export function getProofsByCategory(
  category: NonNullable<InvestorProof["category"]>,
  list: InvestorProof[] = investorProofs
) {
  return getPublicProofs(list).filter((p) => p.category === category);
}
