import type { LocalizedString } from "../schemas/types";

/**
 * Company-development roadmap — one timeline from foundation to conditional future.
 * Possibility path, not a forecast. Company scale ≠ investor liquidity.
 */

export type DevNodeId =
  | "today"
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "decision"
  | "expansion"
  | "network"
  | "broader"
  | "liquidity";

export type SuccessBranchId = "stop" | "change" | "scale";

export const successPathCopy = {
  evidenceHeadline: {
    en: "The next round is not the milestone. Evidence is.",
    vi: "Vòng tiếp theo không phải cột mốc. Bằng chứng mới là.",
  } satisfies LocalizedString,
  programLead: {
    en: "A$3M funds a 12-month transition from foundation to real market evidence. At the end of that period, Cardbey should know what to scale, what to change, and what not to continue.",
    vi: "A$3M tài trợ chuyển tiếp 12 tháng từ nền tảng sang bằng chứng thị trường thật. Cuối giai đoạn đó, Cardbey cần biết điều gì nhân rộng, điều gì đổi hướng, và điều gì không tiếp tục.",
  } satisfies LocalizedString,
  title: {
    en: "From foundation → evidence → scale",
    vi: "Từ nền tảng → bằng chứng → quy mô",
  } satisfies LocalizedString,
  supporting: {
    en: "Where Cardbey is today, what the 12-month seed program is designed to prove, and what may come next if the evidence supports it.",
    vi: "Cardbey đang ở đâu hôm nay, chương trình seed 12 tháng nhằm chứng minh điều gì, và điều gì có thể tới nếu bằng chứng hỗ trợ.",
  } satisfies LocalizedString,
  todayLabel: {
    en: "Today — foundation exists",
    vi: "Hôm nay — nền tảng đã có",
  } satisfies LocalizedString,
  todayStatus: { en: "EXISTS", vi: "ĐÃ CÓ" } satisfies LocalizedString,
  todayTitle: { en: "Today", vi: "Hôm nay" } satisfies LocalizedString,
  todayBody: {
    en: "A product and platform foundation exists. Core business capability is being consolidated. The commercial model remains unproven. Australia and Vietnam are the first strategic markets.",
    vi: "Nền tảng sản phẩm và nền tảng đã có. Năng lực kinh doanh cốt lõi đang được củng cố. Mô hình thương mại vẫn chưa được chứng minh. Úc và Việt Nam là thị trường chiến lược đầu tiên.",
  } satisfies LocalizedString,
  bandLabel: {
    en: "Seed — 12 months · proposed program",
    vi: "Seed — 12 tháng · chương trình đề xuất",
  } satisfies LocalizedString,
  decisionKicker: {
    en: "Evidence decides the next stage",
    vi: "Bằng chứng quyết định giai đoạn tiếp",
  } satisfies LocalizedString,
  decisionStatus: { en: "GATE", vi: "CỔNG" } satisfies LocalizedString,
  decisionTitle: { en: "Decision", vi: "Quyết định" } satisfies LocalizedString,
  decisionBody: {
    en: "Stop, change or scale. All three outcomes are legitimate. Scale is not the default.",
    vi: "Dừng, đổi hướng hoặc nhân rộng. Cả ba kết quả đều chính đáng. Nhân rộng không phải mặc định.",
  } satisfies LocalizedString,
  futureLabel: {
    en: "If evidence supports it — not a forecast",
    vi: "Nếu bằng chứng hỗ trợ — không phải dự báo",
  } satisfies LocalizedString,
  companyTrack: { en: "Cardbey development", vi: "Phát triển Cardbey" } satisfies LocalizedString,
  investorTrack: { en: "Investor", vi: "Nhà đầu tư" } satisfies LocalizedString,
  equationLabel: {
    en: "More businesses × more capabilities × more markets",
    vi: "Nhiều doanh nghiệp × nhiều năng lực × nhiều thị trường",
  } satisfies LocalizedString,
  networkPointsLabel: {
    en: "Direction only — not a current network-effect claim",
    vi: "Chỉ định hướng — không tuyên bố hiệu ứng mạng hiện tại",
  } satisfies LocalizedString,
  dilutionTitle: {
    en: "Dilution / continuing interest",
    vi: "Pha loãng / lợi ích tiếp diễn",
  } satisfies LocalizedString,
  dilutionBody: {
    en: "Future financing may reduce percentage ownership. The investor may still participate in a more valuable company if Cardbey succeeds. Paper value and liquidity are different. Detailed mechanics live in diligence.",
    vi: "Tài trợ sau có thể giảm tỷ lệ sở hữu. Nhà đầu tư vẫn có thể tham gia vào công ty giá trị hơn nếu Cardbey thành công. Giá trị trên giấy và thanh khoản là khác nhau. Cơ chế chi tiết nằm ở thẩm định.",
  } satisfies LocalizedString,
  safeLink: {
    en: "How does my SAFE participate? →",
    vi: "SAFE của tôi tham gia thế nào? →",
  } satisfies LocalizedString,
  closing: {
    en: "The seed round funds the first proof — not the final destination.",
    vi: "Vòng Seed tài trợ cho bằng chứng đầu tiên — không phải đích đến cuối cùng.",
  } satisfies LocalizedString,
  laterNote: {
    en: "A later round is considered, not promised. Fundraising itself is not a success metric.",
    vi: "Vòng sau được xem xét, không được hứa. Bản thân việc gọi vốn không phải chỉ số thành công.",
  } satisfies LocalizedString,
  sr: {
    en: "Development roadmap: today a foundation exists. A$3 million funds twelve months across Australia and Vietnam, quarter by quarter, then an evidence decision to stop, change or scale. Expansion, network, broader scale and possible liquidity are conditional and not a forecast.",
    vi: "Lộ trình phát triển: hôm nay đã có nền tảng. A$3 triệu tài trợ mười hai tháng tại Úc và Việt Nam, từng quý, rồi quyết định bằng chứng: dừng, đổi hoặc nhân rộng. Mở rộng, mạng, quy mô rộng và thanh khoản có thể là có điều kiện — không phải dự báo.",
  } satisfies LocalizedString,
  safeChainTitle: {
    en: "How the proposed SAFE can participate",
    vi: "Cách Post-money SAFE đề xuất có thể tham gia",
  } satisfies LocalizedString,
  developmentLabel: { en: "Development", vi: "Phát triển" } satisfies LocalizedString,
  outcomeLabel: { en: "Market outcome", vi: "Kết quả thị trường" } satisfies LocalizedString,
} as const;

export const todayFacts: LocalizedString[] = [
  { en: "Product/platform foundation exists", vi: "Nền tảng sản phẩm / nền tảng đã có" },
  { en: "Core business capability is being consolidated", vi: "Năng lực kinh doanh cốt lõi đang được củng cố" },
  { en: "Commercial model remains unproven", vi: "Mô hình thương mại vẫn chưa được chứng minh" },
  { en: "Australia + Vietnam are the first strategic markets", vi: "Úc + Việt Nam là thị trường chiến lược đầu tiên" },
];

export const seedBandChips: LocalizedString[] = [
  { en: "A$3M", vi: "A$3M" },
  { en: "12 months", vi: "12 tháng" },
  { en: "Australia + Vietnam", vi: "Úc + Việt Nam" },
  { en: "Four evidence gates", vi: "Bốn cổng bằng chứng" },
];

export const successSafeChain: LocalizedString[] = [
  { en: "A$3M seed SAFE — proposed", vi: "SAFE seed A$3M — đề xuất" },
  { en: "Future equity conversion", vi: "Chuyển đổi cổ phần tương lai" },
  { en: "Subsequent financing / dilution", vi: "Tài trợ sau / pha loãng" },
  { en: "Continuing equity interest", vi: "Lợi ích cổ phần tiếp diễn" },
  { en: "Possible future liquidity event — not guaranteed", vi: "Sự kiện thanh khoản tương lai có thể — không bảo đảm" },
];

export const successBranches: {
  id: SuccessBranchId;
  title: LocalizedString;
  body: LocalizedString;
}[] = [
  {
    id: "stop",
    title: { en: "Stop / reassess", vi: "Dừng / đánh giá lại" },
    body: {
      en: "Evidence does not support continued investment in the hypothesis.",
      vi: "Bằng chứng không hỗ trợ tiếp tục đầu tư vào giả thuyết.",
    },
  },
  {
    id: "change",
    title: { en: "Change", vi: "Đổi hướng" },
    body: {
      en: "Some assumptions work. Redirect capital and strategy toward stronger evidence.",
      vi: "Một số giả định hiệu lực. Chuyển vốn và chiến lược về bằng chứng mạnh hơn.",
    },
  },
  {
    id: "scale",
    title: { en: "Scale", vi: "Nhân rộng" },
    body: {
      en: "Evidence supports concentration and expansion. The path below is possible only from this branch.",
      vi: "Bằng chứng hỗ trợ tập trung và mở rộng. Đường dưới đây chỉ có thể từ nhánh này.",
    },
  },
];

export const futureNodes: {
  id: Extract<DevNodeId, "expansion" | "network" | "broader" | "liquidity">;
  title: LocalizedString;
  body: LocalizedString;
  status: LocalizedString;
  phase: number;
}[] = [
  {
    id: "expansion",
    title: { en: "Expansion", vi: "Mở rộng" },
    body: {
      en: "Expand what works across more businesses, more capabilities and additional markets — only if evidence supports it. No dates attached.",
      vi: "Mở rộng điều hiệu lực sang nhiều doanh nghiệp, nhiều năng lực và thêm thị trường — chỉ khi bằng chứng hỗ trợ. Không gắn mốc thời gian.",
    },
    status: { en: "DIRECTION", vi: "ĐỊNH HƯỚNG" },
    phase: 5,
  },
  {
    id: "network",
    title: { en: "Network", vi: "Mạng" },
    body: {
      en: "More relationships, more economic activity, more opportunities. A network would have to emerge from useful participation — it is not claimed today.",
      vi: "Nhiều quan hệ hơn, nhiều hoạt động kinh tế hơn, nhiều cơ hội hơn. Mạng phải xuất hiện từ sự tham gia hữu ích — không được tuyên bố hôm nay.",
    },
    status: { en: "DIRECTION", vi: "ĐỊNH HƯỚNG" },
    phase: 6,
  },
  {
    id: "broader",
    title: { en: "Broader scale", vi: "Quy mô rộng hơn" },
    body: {
      en: "Cardbey may become a broader coordination layer around economic activity. This is a longer-term ambition, not a current fact.",
      vi: "Cardbey có thể trở thành lớp điều phối rộng hơn quanh hoạt động kinh tế. Đây là tham vọng dài hạn, không phải sự kiện hiện tại.",
    },
    status: { en: "TO PROVE", vi: "CẦN CHỨNG MINH" },
    phase: 7,
  },
  {
    id: "liquidity",
    title: { en: "Potential liquidity", vi: "Thanh khoản tiềm năng" },
    body: {
      en: "If Cardbey becomes substantially more valuable, investors may eventually have opportunities to realise value. No liquidity event is guaranteed.",
      vi: "Nếu Cardbey trở nên giá trị hơn rõ rệt, nhà đầu tư cuối cùng có thể có cơ hội hiện thực hóa giá trị. Không sự kiện thanh khoản nào được bảo đảm.",
    },
    status: { en: "IF EVIDENCE SUPPORTS IT", vi: "NẾU BẰNG CHỨNG HỖ TRỢ" },
    phase: 8,
  },
];

export const successEquationParts: LocalizedString[] = [
  { en: "More businesses", vi: "Nhiều doanh nghiệp" },
  { en: "More capabilities", vi: "Nhiều năng lực" },
  { en: "More markets", vi: "Nhiều thị trường" },
];

export const networkPoints: LocalizedString[] = [
  { en: "More relationships", vi: "Nhiều quan hệ hơn" },
  { en: "More economic activity", vi: "Nhiều hoạt động kinh tế hơn" },
  { en: "More opportunities", vi: "Nhiều cơ hội hơn" },
];

export const successLiquidityOutcomes: LocalizedString[] = [
  { en: "Acquisition", vi: "Mua lại" },
  { en: "Secondary", vi: "Giao dịch thứ cấp" },
  { en: "Public markets", vi: "Thị trường công chúng" },
  { en: "Other future shareholder outcomes", vi: "Kết quả cổ đông tương lai khác" },
];

export const investorTrackItems: {
  id: string;
  label: LocalizedString;
  dilution?: boolean;
}[] = [
  { id: "risk", label: { en: "Early risk", vi: "Rủi ro sớm" } },
  { id: "safe", label: { en: "SAFE rights", vi: "Quyền SAFE" } },
  { id: "evidence", label: { en: "Market evidence", vi: "Bằng chứng thị trường" } },
  { id: "uncertainty", label: { en: "Reduced uncertainty", vi: "Giảm bất định" } },
  { id: "value", label: { en: "Potential company value growth", vi: "Tăng giá trị công ty tiềm năng" } },
  {
    id: "dilution",
    label: { en: "Dilution / continuing interest", vi: "Pha loãng / lợi ích tiếp diễn" },
    dilution: true,
  },
  { id: "liquidity", label: { en: "Possible liquidity", vi: "Thanh khoản có thể" } },
];

/** @deprecated kept as alias for tests that still scan node copy */
export const successNodes = futureNodes;
