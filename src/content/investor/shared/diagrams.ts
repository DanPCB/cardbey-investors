import type { LocaleCode, LocalizedString } from "../schemas/types";

export type DiagramId =
  | "hero-os"
  | "lifecycle"
  | "platform-layers"
  | "ai-workforce"
  | "physical-digital"
  | "growth-network"
  | "language-intelligence"
  | "v3-world-opening"
  | "v3-four-pillars"
  | "v3-platform-modules"
  | "v3-app-first"
  | "v3-progressive-capability"
  | "v3-value-creation"
  | "v3-value-system"
  | "v3-coordination-gap"
  | "v3-orchestrate-position"
  | "v3-start-business"
  | "v3-revenue-ladder"
  | "v3-relationship-deepen"
  | "v3-economics-progression"
  | "v3-growth-dimensions"
  | "v3-capital-acceleration"
  | "v3-hero-progression"
  | "v3-ai-economics"
  | "v3-four-resource"
  | "v3-seed-assumption-model"
  | "v3-paradox"
  | "v3-human-models"
  | "v3-missing-layer"
  | "v3-layer-between"
  | "v3-start-one"
  | "v3-economic-expansion"
  | "v3-why-now"
  | "v3-seed-meet-market";

export type DiagramNode = {
  id: string;
  label: LocalizedString;
};

export type DiagramLayer = {
  id: string;
  name: LocalizedString;
  detail: LocalizedString;
};

export type DiagramDefinition = {
  id: DiagramId;
  title: LocalizedString;
  explanation: LocalizedString;
  accessibleDescription: LocalizedString;
  mode: "flow" | "layers" | "hero";
  nodes?: DiagramNode[];
  layers?: DiagramLayer[];
  heroColumns?: {
    id: string;
    title: LocalizedString;
    items: LocalizedString[];
  }[];
};

export const investorDiagrams: DiagramDefinition[] = [
  {
    id: "hero-os",
    title: {
      en: "From fragmented inputs to an operating system",
      vi: "Từ đầu vào rời rạc đến hệ điều hành",
    },
    explanation: {
      en: "Cardbey turns fragmented business information into structured identity, workflows and multi-channel distribution.",
      vi: "Cardbey biến thông tin doanh nghiệp rời rạc thành định danh có cấu trúc, quy trình và phân phối đa kênh.",
    },
    accessibleDescription: {
      en: "Three columns: unstructured inputs, Cardbey structuring, then distribution across web, phone, display, QR and physical surfaces.",
      vi: "Ba cột: đầu vào chưa cấu trúc, Cardbey cấu trúc hóa, rồi phân phối qua web, điện thoại, màn hình, QR và bề mặt vật lý.",
    },
    mode: "hero",
    heroColumns: [
      {
        id: "inputs",
        title: { en: "Unstructured inputs", vi: "Đầu vào chưa cấu trúc" },
        items: [
          { en: "Name & logo", vi: "Tên & logo" },
          { en: "Products & services", vi: "Sản phẩm & dịch vụ" },
          { en: "Conversations", vi: "Hội thoại" },
          { en: "Images & documents", vi: "Ảnh & tài liệu" },
        ],
      },
      {
        id: "structure",
        title: { en: "Cardbey structures", vi: "Cardbey cấu trúc hóa" },
        items: [
          { en: "Business identity", vi: "Định danh doanh nghiệp" },
          { en: "Storefront & workflows", vi: "Storefront & quy trình" },
          { en: "Knowledge & language preferences", vi: "Tri thức & tùy chọn ngôn ngữ" },
          { en: "Growth opportunities", vi: "Cơ hội tăng trưởng" },
        ],
      },
      {
        id: "distribute",
        title: { en: "Distributes across", vi: "Phân phối trên" },
        items: [
          { en: "Web & phone", vi: "Web & điện thoại" },
          { en: "Smart display", vi: "Màn hình thông minh" },
          { en: "QR & physical surfaces", vi: "QR & bề mặt vật lý" },
          { en: "Partner / growth channels", vi: "Kênh đối tác / tăng trưởng" },
        ],
      },
    ],
  },
  {
    id: "lifecycle",
    title: {
      en: "One business operating system",
      vi: "Một hệ điều hành doanh nghiệp",
    },
    explanation: {
      en: "A continuous loop from business input through creation, operation, distribution, growth and learning.",
      vi: "Vòng lặp liên tục từ đầu vào đến tạo lập, vận hành, phân phối, tăng trưởng và học hỏi.",
    },
    accessibleDescription: {
      en: "Flow: Business Input, Understanding, Structured Business Knowledge, Creation, Operation, Distribution, Growth, Learning.",
      vi: "Luồng: Đầu vào, Hiểu, Tri thức có cấu trúc, Tạo lập, Vận hành, Phân phối, Tăng trưởng, Học.",
    },
    mode: "flow",
    nodes: [
      { id: "input", label: { en: "Business Input", vi: "Đầu vào DN" } },
      { id: "understand", label: { en: "Understanding", vi: "Hiểu" } },
      { id: "knowledge", label: { en: "Structured Knowledge", vi: "Tri thức có cấu trúc" } },
      { id: "create", label: { en: "Creation", vi: "Tạo lập" } },
      { id: "operate", label: { en: "Operation", vi: "Vận hành" } },
      { id: "distribute", label: { en: "Distribution", vi: "Phân phối" } },
      { id: "growth", label: { en: "Growth", vi: "Tăng trưởng" } },
      { id: "learn", label: { en: "Learning", vi: "Học" } },
    ],
  },
  {
    id: "platform-layers",
    title: {
      en: "Platform architecture",
      vi: "Kiến trúc nền tảng",
    },
    explanation: {
      en: "Experience, agents, intelligence, commerce, growth, distribution and infrastructure share context.",
      vi: "Trải nghiệm, agent, trí tuệ, thương mại, tăng trưởng, phân phối và hạ tầng chia sẻ ngữ cảnh.",
    },
    accessibleDescription: {
      en: "Seven stacked layers from experience through infrastructure, including AI agents, business intelligence, commerce, growth and device distribution.",
      vi: "Bảy lớp xếp chồng từ trải nghiệm đến hạ tầng, gồm agent AI, trí tuệ doanh nghiệp, thương mại, tăng trưởng và phân phối thiết bị.",
    },
    mode: "layers",
    layers: [
      {
        id: "experience",
        name: { en: "Experience", vi: "Trải nghiệm" },
        detail: {
          en: "Business owner · customer · partner · investor/admin",
          vi: "Chủ DN · khách hàng · đối tác · nhà đầu tư/admin",
        },
      },
      {
        id: "agents",
        name: { en: "AI & agents", vi: "AI & agent" },
        detail: {
          en: "Performer · role-based agents · permissions · readiness · approvals",
          vi: "Performer · agent theo vai · phân quyền · sẵn sàng · phê duyệt",
        },
      },
      {
        id: "intelligence",
        name: { en: "Business intelligence", vi: "Trí tuệ doanh nghiệp" },
        detail: {
          en: "Identity · preferences · knowledge · memory · language intelligence",
          vi: "Định danh · tùy chọn · tri thức · bộ nhớ · language intelligence",
        },
      },
      {
        id: "commerce",
        name: { en: "Commerce & operations", vi: "Thương mại & vận hành" },
        detail: {
          en: "Storefront · products/services · interaction · payment/delivery · workflows",
          vi: "Storefront · SP/DV · tương tác · thanh toán/giao nhận · quy trình",
        },
      },
      {
        id: "growth",
        name: { en: "Growth", vi: "Tăng trưởng" },
        detail: {
          en: "Attribution · partner participation · recovery/rewards · opportunity tracking",
          vi: "Ghi nhận · tham gia đối tác · recovery/rewards · theo dõi cơ hội",
        },
      },
      {
        id: "distribution",
        name: { en: "Distribution", vi: "Phân phối" },
        detail: {
          en: "Web · mobile · QR · signs · packaging · vehicles · Android · webOS · future Tizen",
          vi: "Web · mobile · QR · biển · bao bì · xe · Android · webOS · Tizen tương lai",
        },
      },
      {
        id: "infra",
        name: { en: "Infrastructure", vi: "Hạ tầng" },
        detail: {
          en: "APIs · data · device runtime · diagnostics · auditability",
          vi: "API · dữ liệu · runtime thiết bị · chẩn đoán · kiểm toán",
        },
      },
    ],
  },
  {
    id: "ai-workforce",
    title: {
      en: "Permission-based AI workforce",
      vi: "Lực lượng AI có phân quyền",
    },
    explanation: {
      en: "Agents assist inside owner-defined boundaries with readiness checks and reviewable outputs — not unsupervised chatbots.",
      vi: "Agent hỗ trợ trong phạm vi chủ DN định nghĩa, có kiểm tra sẵn sàng và kết quả có thể rà soát — không phải chatbot thiếu kiểm soát.",
    },
    accessibleDescription: {
      en: "Flow from business owner through permissions, readiness, approved task execution and reviewable records.",
      vi: "Luồng từ chủ DN qua phân quyền, sẵn sàng, thực thi tác vụ được duyệt và hồ sơ có thể rà soát.",
    },
    mode: "flow",
    nodes: [
      { id: "owner", label: { en: "Business Owner", vi: "Chủ DN" } },
      { id: "permission", label: { en: "Role & permission", vi: "Vai trò & phân quyền" } },
      { id: "ready", label: { en: "Readiness check", vi: "Kiểm tra sẵn sàng" } },
      { id: "input", label: { en: "Request missing input", vi: "Yêu cầu thiếu sót" } },
      { id: "task", label: { en: "Approved task", vi: "Tác vụ được duyệt" } },
      { id: "output", label: { en: "Recorded output", vi: "Kết quả ghi nhận" } },
      { id: "review", label: { en: "Reviewable", vi: "Có thể rà soát" } },
    ],
  },
  {
    id: "physical-digital",
    title: {
      en: "Physical-to-digital commerce loop",
      vi: "Vòng thương mại vật lý–số",
    },
    explanation: {
      en: "Physical surfaces connect discovery to digital experience, attribution and improved future action.",
      vi: "Bề mặt vật lý kết nối khám phá với trải nghiệm số, ghi nhận nguồn và hành động tốt hơn sau này.",
    },
    accessibleDescription: {
      en: "Flow from physical surface through QR or display interaction to transaction, attribution, knowledge and improvement.",
      vi: "Luồng từ bề mặt vật lý qua QR hoặc màn hình đến giao dịch, ghi nhận, tri thức và cải thiện.",
    },
    mode: "flow",
    nodes: [
      { id: "surface", label: { en: "Physical surface", vi: "Bề mặt vật lý" } },
      { id: "discover", label: { en: "Discovery", vi: "Khám phá" } },
      { id: "interact", label: { en: "QR / display", vi: "QR / màn hình" } },
      { id: "digital", label: { en: "Digital experience", vi: "Trải nghiệm số" } },
      { id: "convert", label: { en: "Enquiry / transaction", vi: "Liên hệ / giao dịch" } },
      { id: "attr", label: { en: "Attribution", vi: "Ghi nhận nguồn" } },
      { id: "memory", label: { en: "Business knowledge", vi: "Tri thức DN" } },
      { id: "improve", label: { en: "Improved action", vi: "Hành động tốt hơn" } },
    ],
  },
  {
    id: "growth-network",
    title: {
      en: "Growth Engine flow",
      vi: "Luồng Growth Engine",
    },
    explanation: {
      en: "Natural references become attributable opportunities under policy — not guaranteed conversion or reward, and not MLM.",
      vi: "Giới thiệu tự nhiên trở thành cơ hội ghi nhận theo chính sách — không bảo đảm chuyển đổi hay phần thưởng, và không phải MLM.",
    },
    accessibleDescription: {
      en: "Flow from natural reference through eligibility, verified conversion, value allocation and append-only record.",
      vi: "Luồng từ giới thiệu tự nhiên qua điều kiện đủ, chuyển đổi xác minh, phân bổ giá trị và bản ghi append-only.",
    },
    mode: "flow",
    nodes: [
      { id: "ref", label: { en: "Natural reference", vi: "Giới thiệu tự nhiên" } },
      { id: "opp", label: { en: "Attributable opportunity", vi: "Cơ hội ghi nhận" } },
      { id: "policy", label: { en: "Eligibility policy", vi: "Chính sách đủ điều kiện" } },
      { id: "convert", label: { en: "Verified conversion", vi: "Chuyển đổi xác minh" } },
      { id: "value", label: { en: "Value allocation", vi: "Phân bổ giá trị" } },
      { id: "growth", label: { en: "Recovery / growth", vi: "Recovery / tăng trưởng" } },
      { id: "ledger", label: { en: "Append-only record", vi: "Bản ghi append-only" } },
    ],
  },
  {
    id: "language-intelligence",
    title: {
      en: "Language Intelligence flow",
      vi: "Luồng Language Intelligence",
    },
    explanation: {
      en: "AI-assisted localization using preferences and glossary — advisory and non-authoritative; original content remains preserved.",
      vi: "Bản địa hóa có hỗ trợ AI dùng tùy chọn và thuật ngữ — mang tính tư vấn, không phán quyết tuyệt đối; bản gốc được giữ.",
    },
    accessibleDescription: {
      en: "Flow from original content through preferences, glossary and tone into a localized view while preserving the original.",
      vi: "Luồng từ nội dung gốc qua tùy chọn, thuật ngữ và giọng điệu thành bản địa hóa, vẫn giữ bản gốc.",
    },
    mode: "flow",
    nodes: [
      { id: "original", label: { en: "Original content", vi: "Nội dung gốc" } },
      { id: "pref", label: { en: "Language preference", vi: "Tùy chọn ngôn ngữ" } },
      { id: "glossary", label: { en: "Business glossary", vi: "Thuật ngữ DN" } },
      { id: "tone", label: { en: "Tone / culture", vi: "Giọng điệu / văn hóa" } },
      { id: "local", label: { en: "Localized view", vi: "Bản địa hóa" } },
      { id: "preserve", label: { en: "Original preserved", vi: "Giữ bản gốc" } },
    ],
  },
];

/** Extra diagrams registered by V3 (and future packs). */
const registeredDiagrams: DiagramDefinition[] = [];

export function registerDiagrams(list: DiagramDefinition[]) {
  for (const diagram of list) {
    if (!registeredDiagrams.some((d) => d.id === diagram.id)) {
      registeredDiagrams.push(diagram);
    }
  }
}

export function getDiagram(id: string | undefined) {
  if (!id) return undefined;
  return (
    investorDiagrams.find((d) => d.id === id) ||
    registeredDiagrams.find((d) => d.id === id)
  );
}

export function diagramLabel(
  value: LocalizedString,
  locale: LocaleCode
): string {
  return value[locale] || value.en;
}
