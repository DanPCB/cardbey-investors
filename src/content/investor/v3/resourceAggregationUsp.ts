import type { LocalizedString } from "../schemas/types";

/**
 * Public USP for Investor V3 — Resource Aggregation Accelerator.
 * Strategic positioning, not a claim of proven commercial acceleration.
 */

export type UspResourceId = "market" | "intelligence" | "infrastructure" | "capital";
export type UspOutcomeId = "capability" | "activity" | "evidence" | "accumulation";
export type UspMechanismId = "context" | "coordination" | "reuse";

export const uspCopy = {
  kicker: { en: "The Cardbey USP", vi: "USP của Cardbey" },
  englishName: {
    en: "Resource Aggregation Accelerator",
    vi: "Nền Tảng Tổng Hợp Gia Tốc Nguồn Lực",
  },
  meaning: {
    en: "A mechanism for turning distributed resources into coordinated economic capability.",
    vi: "Một cơ chế giúp biến các nguồn lực phân tán thành năng lực kinh tế được phối hợp.",
  },
  definition: {
    en: "Resources already exist. Cardbey puts them to work around economic activity — an existing business, or one that still needs to become operational — not by collecting APIs into a dashboard.",
    vi: "Nguồn lực đã tồn tại. Cardbey đưa chúng vào việc gia tăng giá trị quanh hoạt động kinh tế — doanh nghiệp hiện tại, hoặc gia tốc các hoạt động đã sẵn sàng — không phải gom các thuật toán vào một bảng điều khiển.",
  },
  acceleration: {
    en: "The secret of speed is not doing every task faster. It is reducing the gaps between resources, decisions and action.",
    vi: "Bí quyết của tốc độ không phải làm mọi tác vụ nhanh hơn. Đó là rút ngắn khoảng trống giữa nguồn lực, quyết định và hành động.",
  },
  activationPrinciple: {
    en: "Aggregation is not the end state. Activation is.",
    vi: "Tổng hợp không phải trạng thái cuối. Kích hoạt mới là.",
  },
  resultLine: {
    en: "Aggregation creates acceleration.",
    vi: "Tổng hợp tạo ra gia tốc.",
  },
  cycle: {
    en: "Shorter action cycles",
    vi: "Chu kỳ hành động ngắn hơn",
  },
  howItBegins: {
    en: "How it begins around a business or an idea →",
    vi: "Cách bắt đầu quanh một doanh nghiệp hoặc một ý tưởng →",
  },
  notOwnership: {
    en: "Cardbey is not claiming ownership of the global market, AI, cloud infrastructure or capital. The opportunity is discovery, coordination and reuse around real economic activity.",
    vi: "Cardbey không tuyên bố sở hữu thị trường toàn cầu, AI, hạ tầng cloud hay vốn. Cơ hội là khám phá, điều phối và tái sử dụng quanh hoạt động kinh tế thật.",
  },
  layerKicker: {
    en: "Technology enables coordination. Coordination enables economic activity.",
    vi: "Công nghệ làm điều phối khả thi. Điều phối làm hoạt động kinh tế khả thi.",
  },
  resourcesLabel: {
    en: "Distributed resources",
    vi: "Nguồn lực phân tán",
  },
  hubSub: {
    en: "Resource Aggregation Accelerator",
    vi: "Nền Tảng Tổng Hợp Gia Tốc Nguồn Lực",
  },
  activityLabel: {
    en: "Economic activity",
    vi: "Hoạt động kinh tế",
  },
  loopLabel: {
    en: "What activity can return — hypothesis / to be validated",
    vi: "Điều hoạt động có thể trả lại — giả thuyết / cần kiểm chứng",
  },
  loopNote: {
    en: "The return path is the longer-term thesis, not a claim that every loop is currently implemented.",
    vi: "Đường trở lại là luận điểm dài hạn — không phải tuyên bố mọi vòng hiện đã được triển khai.",
  },
  sr: {
    en: "Diagram: distributed resources connect through Cardbey into capability, activity, evidence and accumulation.",
    vi: "Sơ đồ: nguồn lực phân tán kết nối qua Cardbey thành năng lực, hoạt động, bằng chứng và tích lũy.",
  },
} as const;

export const uspResources: {
  id: UspResourceId;
  label: LocalizedString;
}[] = [
  { id: "market", label: { en: "Market", vi: "Thị trường" } },
  { id: "intelligence", label: { en: "Intelligence", vi: "Trí tuệ" } },
  { id: "infrastructure", label: { en: "Infrastructure", vi: "Hạ tầng" } },
  { id: "capital", label: { en: "Capital", vi: "Vốn" } },
];

export const uspOutcomes: {
  id: UspOutcomeId;
  label: LocalizedString;
}[] = [
  { id: "capability", label: { en: "Capability", vi: "Năng lực" } },
  { id: "activity", label: { en: "Activity", vi: "Hoạt động" } },
  { id: "evidence", label: { en: "Evidence", vi: "Bằng chứng" } },
  { id: "accumulation", label: { en: "Accumulation", vi: "Tích lũy" } },
];

export const uspLayers: { id: string; kicker: LocalizedString; label: LocalizedString }[] = [
  {
    id: "technology",
    kicker: { en: "How it operates", vi: "Cách vận hành" },
    label: { en: "Technology", vi: "Công nghệ" },
  },
  {
    id: "coordination",
    kicker: { en: "What it does", vi: "Việc nó làm" },
    label: { en: "Coordination", vi: "Điều phối" },
  },
  {
    id: "activity",
    kicker: { en: "Why it could matter", vi: "Vì sao có thể quan trọng" },
    label: { en: "Economic activity", vi: "Hoạt động kinh tế" },
  },
];

export const mechanismResources: { id: string; label: LocalizedString; foundation?: boolean }[] = [
  { id: "people", label: { en: "People", vi: "Con người" } },
  { id: "intelligence", label: { en: "Intelligence", vi: "Trí tuệ" }, foundation: true },
  { id: "businesses", label: { en: "Businesses", vi: "Doanh nghiệp" } },
  { id: "knowledge", label: { en: "Knowledge", vi: "Tri thức" } },
  { id: "content", label: { en: "Content", vi: "Nội dung" } },
  { id: "infrastructure", label: { en: "Infrastructure", vi: "Hạ tầng" }, foundation: true },
  { id: "market", label: { en: "Market", vi: "Thị trường" }, foundation: true },
  { id: "distribution", label: { en: "Distribution", vi: "Phân phối" } },
  { id: "devices", label: { en: "Devices", vi: "Thiết bị" } },
  { id: "capital", label: { en: "Capital", vi: "Vốn" }, foundation: true },
];

export const activationSequence: LocalizedString[] = [
  { en: "Find", vi: "Tìm" },
  { en: "Understand", vi: "Hiểu" },
  { en: "Aggregate", vi: "Tổng hợp" },
  { en: "Coordinate", vi: "Điều phối" },
  { en: "Activate", vi: "Kích hoạt" },
  { en: "Observe", vi: "Quan sát" },
  { en: "Reuse", vi: "Tái sử dụng" },
];

export const coordinationTriad: LocalizedString[] = [
  { en: "Context", vi: "Ngữ cảnh" },
  { en: "Coordination", vi: "Điều phối" },
  { en: "Activation", vi: "Kích hoạt" },
];

export const returnLoopItems: { id: string; label: LocalizedString; maturity?: LocalizedString }[] = [
  { id: "context", label: { en: "Context", vi: "Ngữ cảnh" } },
  { id: "evidence", label: { en: "Evidence", vi: "Bằng chứng" } },
  { id: "relationships", label: { en: "Relationships", vi: "Quan hệ" } },
  {
    id: "attribution",
    label: { en: "Attribution", vi: "Ghi nhận nguồn" },
    maturity: { en: "VALIDATING", vi: "ĐANG KIỂM CHỨNG" },
  },
  { id: "learning", label: { en: "Learning", vi: "Học hỏi" } },
  {
    id: "reuse",
    label: { en: "Reusable capability", vi: "Năng lực tái sử dụng" },
    maturity: { en: "DIRECTION", vi: "ĐỊNH HƯỚNG" },
  },
];

export const uspMechanisms: {
  id: UspMechanismId;
  title: LocalizedString;
  body: LocalizedString;
}[] = [
  {
    id: "context",
    title: { en: "Context", vi: "Ngữ cảnh" },
    body: {
      en: "The business does not need to be rediscovered at every step.",
      vi: "Doanh nghiệp không cần được khám phá lại ở mỗi bước.",
    },
  },
  {
    id: "coordination",
    title: { en: "Coordination", vi: "Điều phối" },
    body: {
      en: "Capabilities do not need to operate as disconnected tools.",
      vi: "Các năng lực không cần vận hành như công cụ rời rạc.",
    },
  },
  {
    id: "reuse",
    title: { en: "Reuse", vi: "Tái sử dụng" },
    body: {
      en: "What the business already knows, owns, creates or connects can support the next action.",
      vi: "Điều doanh nghiệp đã biết, sở hữu, tạo ra hoặc kết nối có thể hỗ trợ hành động tiếp theo.",
    },
  },
];

export function uspVisibleWordCount(): number {
  const blob = [
    uspCopy.definition.en,
    uspCopy.acceleration.en,
    uspCopy.resultLine.en,
    uspCopy.notOwnership.en,
    ...uspMechanisms.map((m) => `${m.title.en} ${m.body.en}`),
  ].join(" ");
  return blob.trim().split(/\s+/).filter(Boolean).length;
}
