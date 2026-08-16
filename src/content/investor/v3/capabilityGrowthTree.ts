import type { LocalizedString } from "../schemas/types";
import type { ProductStatus } from "../schemas/status";

/**
 * Display tree for CapabilityGrowthExplorer.
 * Maps to canonical capability registry IDs — no invented products.
 */
export type CapabilityTreeNode = {
  id: string;
  /** Short diagram label */
  label: LocalizedString;
  /** One-line purpose on main nodes */
  purpose?: LocalizedString;
  /** Canonical capability id when applicable */
  capabilityId?: string;
  /** Evidence / diligence anchor */
  evidenceHref?: string;
  children?: CapabilityTreeNode[];
};

export type CapabilityGrowthStep = 1 | 2 | 3 | 4;

export const capabilityGrowthSteps: {
  id: CapabilityGrowthStep;
  title: LocalizedString;
  subtitle: LocalizedString;
}[] = [
  {
    id: 1,
    title: { en: "Start simple", vi: "Bắt đầu đơn giản" },
    subtitle: { en: "A practical first outcome", vi: "Kết quả thực tế đầu tiên" },
  },
  {
    id: 2,
    title: { en: "Expand capability", vi: "Mở rộng năng lực" },
    subtitle: { en: "Add capability around the same business", vi: "Thêm năng lực quanh cùng doanh nghiệp" },
  },
  {
    id: 3,
    title: { en: "Go deeper", vi: "Đi sâu hơn" },
    subtitle: { en: "Explore what is inside", vi: "Khám phá bên trong" },
  },
  {
    id: 4,
    title: { en: "Full picture", vi: "Toàn cảnh" },
    subtitle: { en: "See the connected system", vi: "Xem hệ thống kết nối" },
  },
];

export const capabilityGrowthCopy = {
  frameTitle: {
    en: "One context. Growing capability.",
    vi: "Một ngữ cảnh. Năng lực tăng dần.",
  },
  frameSubtitle: {
    en: "Practice, not theory. An existing business or new economic activity can enter the same Cardbey system. Adding capability attaches another economic function to that same context.",
    vi: "Thực hành, không phải lý thuyết. Doanh nghiệp hiện tại hoặc hoạt động kinh tế mới có thể đi vào cùng hệ thống Cardbey. Thêm năng lực là gắn thêm một chức năng kinh tế vào cùng ngữ cảnh đó.",
  },
  uspBridge: {
    en: "Technology makes this possible. Existing businesses and new economic activity enter the same system — not two product stories.",
    vi: "Công nghệ làm điều này khả thi. Doanh nghiệp hiện tại và hoạt động kinh tế mới đi vào cùng một hệ thống — không phải hai câu chuyện sản phẩm.",
  },
  uspLink: {
    en: "Resource Aggregation Accelerator →",
    vi: "Nền Tảng Tổng Hợp Gia Tốc Nguồn Lực →",
  },
  growCta: { en: "Grow capability", vi: "Tăng năng lực" },
  reset: { en: "Reset", vi: "Đặt lại" },
  viewAll: { en: "Explore full system", vi: "Khám phá toàn hệ thống" },
  collapse: { en: "Return to focus", vi: "Quay lại tiêu điểm" },
  previous: { en: "Previous", vi: "Trước" },
  next: { en: "Next", vi: "Tiếp" },
  whyItMatters: { en: "Why it matters", vi: "Vì sao quan trọng" },
  viewEvidence: { en: "View evidence →", vi: "Xem bằng chứng →" },
  selectBranch: {
    en: "Select a capability to explore",
    vi: "Chọn một năng lực để khám phá",
  },
  closing: {
    en: "Start simple. Add capability as the context needs it — around the same economic activity, not as a new product company. The same Resource Aggregation Accelerator can extend an existing business or help new economic activity become operational.",
    vi: "Bắt đầu từ nhu cầu thực tế. Kết nối thêm nguồn lực và năng lực để biến nhu cầu đó thành hoạt động kinh tế có thể vận hành và phát triển.\n\nCùng một Nền Tảng Tổng hợp Gia Tốc Nguồn lực, có thể giúp doanh nghiệp hiện tại mở rộng năng lực, hoặc tập hợp những nguồn lực cần thiết để một ý tưởng, sản phẩm hay cơ hội mới đi vào thị trường.",
  },
  railStart: { en: "01 Start", vi: "01 Bắt đầu" },
  railExpand: { en: "02 Expand", vi: "02 Mở rộng" },
  railExplore: { en: "03 Explore", vi: "03 Khám phá" },
  railSystem: { en: "04 System", vi: "04 Hệ thống" },
  srSummary: {
    en: "Interactive diagram: an existing business or a person, idea or opportunity connects through Cardbey’s coordination layer. A storefront is one starting surface. Further capability — Performer, promotion, displays, commerce and related functions — can attach to the same context.",
    vi: "Sơ đồ tương tác: doanh nghiệp hiện tại hoặc một người, ý tưởng hay cơ hội kết nối qua lớp điều phối Cardbey. Storefront là một bề mặt bắt đầu. Năng lực tiếp — Performer, quảng bá, màn hình, thương mại và các chức năng liên quan — có thể gắn vào cùng ngữ cảnh.",
  },
  entryKicker: {
    en: "Two starting points. One system.",
    vi: "Hai điểm bắt đầu. Một hệ thống.",
  },
  entryATitle: {
    en: "I have a business",
    vi: "Tôi đã có doanh nghiệp",
  },
  entryABody: {
    en: "Grow capability around an operating business.",
    vi: "Tăng năng lực quanh doanh nghiệp đang vận hành.",
  },
  entryBTitle: {
    en: "I want to build a business",
    vi: "Tôi muốn khởi nghiệp",
  },
  entryBBody: {
    en: "Start with an idea, skill, product or opportunity and assemble the capabilities needed to become operational.",
    vi: "Bắt đầu từ ý tưởng, kỹ năng, sản phẩm hoặc cơ hội và tập hợp các năng lực cần để trở nên vận hành được.",
  },
  entryConverge: {
    en: "Existing business or person / idea / opportunity → Cardbey → capability → economic activity",
    vi: "Doanh nghiệp hiện tại hoặc cá nhân / ý tưởng / cơ hội → Cardbey → năng lực → hoạt động kinh tế",
  },
  businessHint: {
    en: "An existing business, or an idea becoming operational activity — the persistent context",
    vi: "Doanh nghiệp hiện tại, hoặc ý tưởng đang thành hoạt động vận hành được — ngữ cảnh bền vững",
  },
  cardbeyHint: {
    en: "Coordinates relevant resources around that context",
    vi: "Điều phối nguồn lực phù hợp quanh ngữ cảnh đó",
  },
  storefrontHint: {
    en: "A surface where capability becomes visible and actionable",
    vi: "Bề mặt nơi năng lực trở nên nhìn thấy và hành động được",
  },
  whyDefault: {
    en: "A useful first outcome. Additional capabilities can be added as the business needs them.",
    vi: "Một kết quả hữu ích đầu tiên. Năng lực bổ sung có thể được thêm khi doanh nghiệp cần.",
  },
} as const;

/** Spine: Business → Cardbey → Storefront */
export const capabilityGrowthSpine = {
  business: {
    id: "business",
    label: { en: "Business", vi: "Doanh nghiệp" },
  },
  cardbey: {
    id: "cardbey",
    label: { en: "CARDBEY", vi: "CARDBEY" },
  },
  storefront: {
    id: "storefront",
    label: { en: "Storefront", vi: "Storefront" },
    purpose: {
      en: "A surface where business capability becomes visible and actionable",
      vi: "Bề mặt nơi năng lực kinh doanh trở nên nhìn thấy và hành động được",
    },
    capabilityId: "cap-ai-storefront",
    evidenceHref: "#diligence",
  },
} as const;

/** Primary branches — Step 2 */
export const capabilityGrowthBranches: CapabilityTreeNode[] = [
  {
    id: "performer",
    label: { en: "Performer", vi: "Performer" },
    purpose: {
      en: "Emerging coordination of business actions, within current technical boundaries",
      vi: "Điều phối hành động kinh doanh đang hình thành, trong ranh giới kỹ thuật hiện tại",
    },
    capabilityId: "cap-ai-performer",
    evidenceHref: "#diligence",
    children: [
      {
        id: "performer-content",
        label: { en: "Content", vi: "Nội dung" },
        capabilityId: "cap-structured-drafts",
        evidenceHref: "#diligence",
      },
      {
        id: "performer-language",
        label: { en: "Language", vi: "Ngôn ngữ" },
        capabilityId: "cap-conversation-localization",
        evidenceHref: "#diligence",
      },
      {
        id: "performer-tasks",
        label: { en: "Tasks", vi: "Tác vụ" },
        capabilityId: "cap-readiness-preflight",
        evidenceHref: "#diligence",
      },
      {
        id: "performer-context",
        label: { en: "Context", vi: "Ngữ cảnh" },
        capabilityId: "cap-business-memory",
        evidenceHref: "#diligence",
      },
    ],
  },
  {
    id: "promotion",
    label: { en: "Promotion & growth", vi: "Quảng bá & tăng trưởng" },
    purpose: {
      en: "Participation, attribution and contribution around growth activity",
      vi: "Tham gia, ghi nhận nguồn và đóng góp quanh hoạt động tăng trưởng",
    },
    capabilityId: "cap-growth-engine",
    evidenceHref: "#diligence",
    children: [
      {
        id: "promo-partner",
        label: { en: "Partner", vi: "Đối tác" },
        capabilityId: "cap-partner-pass",
        evidenceHref: "#diligence",
      },
      {
        id: "promo-attribution",
        label: { en: "Attribution", vi: "Ghi nhận nguồn" },
        capabilityId: "cap-partner-attribution",
        evidenceHref: "#diligence",
      },
    ],
  },
  {
    id: "devices",
    label: { en: "Displays & devices", vi: "Màn hình & thiết bị" },
    purpose: {
      en: "Additional surfaces where information, content and opportunity can become actionable",
      vi: "Bề mặt thêm nơi thông tin, nội dung và cơ hội có thể trở nên hành động được",
    },
    capabilityId: "cap-smart-display-runtime",
    evidenceHref: "#diligence",
    children: [
      {
        id: "device-display",
        label: { en: "Display", vi: "Màn hình" },
        capabilityId: "cap-smart-display-runtime",
        evidenceHref: "#diligence",
      },
      {
        id: "device-pairing",
        label: { en: "Pairing", vi: "Ghép nối" },
        capabilityId: "cap-device-pairing",
        evidenceHref: "#diligence",
      },
      {
        id: "device-signage",
        label: { en: "Signage", vi: "Biển hiệu" },
        capabilityId: "cap-signage-scheduling",
        evidenceHref: "#diligence",
      },
      {
        id: "device-playlist",
        label: { en: "Playlist", vi: "Playlist" },
        capabilityId: "cap-playlist",
        evidenceHref: "#diligence",
      },
    ],
  },
  {
    id: "structure",
    label: { en: "Business structure", vi: "Cấu trúc doanh nghiệp" },
    purpose: {
      en: "Business context — without it, coordination becomes generic automation",
      vi: "Ngữ cảnh doanh nghiệp — thiếu nó, điều phối trở thành tự động hóa chung chung",
    },
    capabilityId: "cap-business-import",
    evidenceHref: "#diligence",
    children: [
      {
        id: "struct-import",
        label: { en: "Business info", vi: "Thông tin DN" },
        capabilityId: "cap-business-import",
        evidenceHref: "#diligence",
      },
      {
        id: "struct-drafts",
        label: { en: "Drafts", vi: "Bản nháp" },
        capabilityId: "cap-structured-drafts",
        evidenceHref: "#diligence",
      },
      {
        id: "struct-locale",
        label: { en: "Localization", vi: "Bản địa hóa" },
        capabilityId: "cap-storefront-localization",
        evidenceHref: "#diligence",
      },
      {
        id: "struct-knowledge",
        label: { en: "Knowledge", vi: "Tri thức" },
        capabilityId: "cap-business-graph",
        evidenceHref: "#diligence",
      },
    ],
  },
];

export function findBranch(id: string): CapabilityTreeNode | undefined {
  return capabilityGrowthBranches.find((b) => b.id === id);
}

export function findNode(
  id: string
): { node: CapabilityTreeNode; parentId?: string } | undefined {
  for (const branch of capabilityGrowthBranches) {
    if (branch.id === id) return { node: branch };
    for (const child of branch.children || []) {
      if (child.id === id) return { node: child, parentId: branch.id };
    }
  }
  if (id === "storefront") {
    return {
      node: {
        id: "storefront",
        label: capabilityGrowthSpine.storefront.label,
        purpose: capabilityGrowthSpine.storefront.purpose,
        capabilityId: capabilityGrowthSpine.storefront.capabilityId,
        evidenceHref: capabilityGrowthSpine.storefront.evidenceHref,
      },
    };
  }
  return undefined;
}

export type MaturityDisplay = ProductStatus | "unknown";
