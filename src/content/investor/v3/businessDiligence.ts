import type { LocalizedString } from "../schemas/types";

/** Evidence states for investor/business diligence — not a financial model. */
export type DiligenceEvidenceStatus =
  | "exists"
  | "validating"
  | "to_measure"
  | "to_prove"
  | "direction";

export const diligenceStatusLabel: Record<DiligenceEvidenceStatus, LocalizedString> = {
  exists: { en: "EXISTS", vi: "ĐÃ CÓ" },
  validating: { en: "VALIDATING", vi: "ĐANG KIỂM CHỨNG" },
  to_measure: { en: "TO MEASURE", vi: "CẦN ĐO LƯỜNG" },
  to_prove: { en: "TO PROVE", vi: "CẦN CHỨNG MINH" },
  direction: { en: "DIRECTION", vi: "ĐỊNH HƯỚNG" },
};

export const businessDiligenceCopy = {
  modelTitle: {
    en: "One business — economic model to validate",
    vi: "Một doanh nghiệp — mô hình kinh tế cần kiểm chứng",
  } satisfies LocalizedString,
  modelPrinciple: {
    en: "The model is defined. The economics are not yet proven.",
    vi: "Mô hình đã được xác định. Hiệu quả kinh tế chưa được chứng minh.",
  } satisfies LocalizedString,
  modelLead: {
    en: "The seed program is intended to establish the acquisition, revenue, retention, expansion and margin profile of a real Cardbey business unit.",
    vi: "Chương trình seed nhằm đo lường chi phí thu hút, doanh thu, khả năng giữ chân, mở rộng và biên lợi nhuận trên một đơn vị doanh nghiệp Cardbey thực tế.",
  } satisfies LocalizedString,
  progressionTitle: {
    en: "One-business economic progression",
    vi: "Tiến trình kinh tế một doanh nghiệp",
  } satisfies LocalizedString,
  seedQuestionLabel: {
    en: "Seed question",
    vi: "Câu hỏi của giai đoạn Seed",
  } satisfies LocalizedString,
  seedQuestion: {
    en: "Does this progression occur repeatedly enough to support a scalable business model?",
    vi: "Quá trình này có lặp lại đủ ổn định để hình thành một mô hình kinh doanh có khả năng mở rộng hay không?",
  } satisfies LocalizedString,
  proveTitle: {
    en: "What would prove the business model?",
    vi: "Điều gì sẽ chứng minh mô hình kinh doanh?",
  } satisfies LocalizedString,
  proveClose: {
    en: "These are the commercial questions the A$3M / 12-month seed program is intended to answer.",
    vi: "Đây là những câu hỏi thương mại mà chương trình seed A$3M / 12 tháng được thiết kế để trả lời.",
  } satisfies LocalizedString,
  growthLinkTitle: {
    en: "How the seed program measures the model",
    vi: "Cách chương trình seed đo mô hình",
  } satisfies LocalizedString,
  growthLinkLead: {
    en: "The A$3M / 12-month roadmap on the main pitch is the measurement window. The commercial questions sit here and in Business & Economics — not as forecasts.",
    vi: "Lộ trình A$3M / 12 tháng trên pitch chính là cửa sổ đo lường. Câu hỏi thương mại nằm ở đây và trong Kinh doanh & kinh tế — không phải dự báo.",
  } satisfies LocalizedString,
  growthLinkCta: {
    en: "Open Business & Economics →",
    vi: "Mở Kinh doanh & kinh tế →",
  } satisfies LocalizedString,
  marketTitle: {
    en: "Market thesis",
    vi: "Luận điểm thị trường",
  } satisfies LocalizedString,
  marketP1: {
    en: "Cardbey's thesis is that technology is making intelligence, infrastructure, markets and other productive resources increasingly accessible.",
    vi: "Luận điểm của Cardbey là công nghệ đang giúp trí tuệ, hạ tầng, thị trường và các nguồn lực sản xuất khác ngày càng dễ tiếp cận hơn.",
  } satisfies LocalizedString,
  marketP2: {
    en: "Access alone does not create economic capability.",
    vi: "Nhưng tiếp cận nguồn lực không đồng nghĩa với có năng lực kinh tế.",
  } satisfies LocalizedString,
  marketP3: {
    en: "Cardbey is testing whether coordinating those resources around real businesses can produce useful, repeatable economic outcomes.",
    vi: "Cardbey đang kiểm chứng liệu việc phối hợp các nguồn lực đó quanh doanh nghiệp thực có thể tạo ra những kết quả kinh tế hữu ích và có khả năng lặp lại hay không.",
  } satisfies LocalizedString,
  hypothesisTitle: {
    en: "Initial market hypothesis — VALIDATING",
    vi: "Giả thuyết thị trường ban đầu — ĐANG KIỂM CHỨNG",
  } satisfies LocalizedString,
  hypothesisMarkets: {
    en: "Australia + Vietnam",
    vi: "Úc + Việt Nam",
  } satisfies LocalizedString,
  hypothesisLead: {
    en: "Cardbey begins with Australia and Vietnam as two different but connected environments in which to test the mechanism. The purpose is not to prove that these are Cardbey's only markets. The purpose is to learn whether useful business capability can be created, paid for and repeated across real operating contexts.",
    vi: "Cardbey bắt đầu với Australia và Việt Nam như hai môi trường khác nhau nhưng có khả năng kết nối để kiểm chứng cơ chế. Mục tiêu không phải chứng minh đây là hai thị trường duy nhất của Cardbey, mà để xác định liệu năng lực kinh doanh hữu ích có thể được tạo ra, được trả phí và lặp lại trong các bối cảnh vận hành thực hay không.",
  } satisfies LocalizedString,
  whoTitle: {
    en: "Who first?",
    vi: "Ai trước?",
  } satisfies LocalizedString,
  whoLead: {
    en: "SMEs requiring stronger business capability, initially around areas such as the following. Not every SME needs every capability.",
    vi: "Các SME cần tăng cường năng lực kinh doanh, ban đầu trong những lĩnh vực như sau. Không phải mọi SME cần mọi năng lực.",
  } satisfies LocalizedString,
  auTitle: {
    en: "Australia — VALIDATING",
    vi: "Úc — ĐANG KIỂM CHỨNG",
  } satisfies LocalizedString,
  auBody: {
    en: "A developed, relatively high-cost operating environment where SMEs already have access to many digital and business services. Higher labour and service cost means automation, displays, managed services, business setup, promotion and operational efficiency may be particularly relevant — a test of whether better coordination reduces friction. Not merely a geography bet.",
    vi: "Môi trường vận hành phát triển, chi phí tương đối cao, nơi SME đã tiếp cận nhiều dịch vụ số và dịch vụ kinh doanh. Chi phí nhân công và dịch vụ cao hơn khiến tự động hóa, màn hình, dịch vụ quản lý, thiết lập doanh nghiệp, quảng bá và hiệu quả vận hành có thể đặc biệt phù hợp — bài kiểm liệu điều phối tốt hơn có giảm ma sát. Không chỉ là cược địa lý.",
  } satisfies LocalizedString,
  vnTitle: {
    en: "Vietnam — VALIDATING",
    vi: "Việt Nam — ĐANG KIỂM CHỨNG",
  } satisfies LocalizedString,
  vnBody: {
    en: "A rapidly digitising SME and social-commerce environment. Mobile, social channels, manufacturing, packaging, fragmented services and entrepreneurial SMEs may produce different entry points — smart products, social commerce, live engagement, cross-border presence and coordinated services. Those combinations are to be tested, not assumed ready.",
    vi: "Môi trường SME và thương mại xã hội đang số hóa nhanh. Di động, kênh xã hội, sản xuất, bao bì, dịch vụ phân mảnh và SME khởi nghiệp có thể tạo cửa vào khác — sản phẩm thông minh, thương mại xã hội, tương tác livestream, hiện diện xuyên biên giới và dịch vụ được điều phối. Những tổ hợp đó cần được kiểm, không được giả định đã sẵn sàng.",
  } satisfies LocalizedString,
  linkTitle: {
    en: "Australia ↔ Vietnam — hypothesis",
    vi: "Úc ↔ Việt Nam — giả thuyết",
  } satisfies LocalizedString,
  linkBody: {
    en: "Commercial, community and business links between Australia and Vietnam allow Cardbey to test the mechanism across markets rather than treating each country as an isolated expansion. Cross-border network effects are not claimed today.",
    vi: "Các liên kết thương mại, cộng đồng và kinh doanh giữa Úc và Việt Nam cho phép Cardbey kiểm cơ chế xuyên thị trường, thay vì coi mỗi nước là một hướng mở rộng tách rời. Không tuyên bố hiệu ứng mạng xuyên biên giới hiện nay.",
  } satisfies LocalizedString,
  accessTitle: {
    en: "Founder-market access",
    vi: "Tiếp cận thị trường của founder",
  } satisfies LocalizedString,
  accessBody: {
    en: "Existing relationships may support initial distribution across the Australia–Vietnam corridor and may affect the practical cost and speed at which the hypothesis can be tested. This is not a defensibility claim and not a measured CAC advantage.",
    vi: "Quan hệ hiện có có thể hỗ trợ phân phối ban đầu trên hành lang Úc–Việt Nam, và có thể ảnh hưởng đến chi phí cũng như tốc độ thực tế khi kiểm giả thuyết. Đây không phải tuyên bố lợi thế phòng thủ, cũng không phải lợi thế CAC đã đo được.",
  } satisfies LocalizedString,
  ladderTitle: {
    en: "Growth is capability-led, not category-led",
    vi: "Tăng trưởng theo năng lực, không phải theo danh mục",
  } satisfies LocalizedString,
  ladderNote: {
    en: "Later layers are direction, not current Cardbey businesses. They become relevant only where repeated economic activity demonstrates a need for them.",
    vi: "Các lớp sau là định hướng, không phải hoạt động kinh doanh hiện tại của Cardbey. Chúng chỉ trở nên phù hợp khi hoạt động kinh tế lặp lại cho thấy nhu cầu thực tế.",
  } satisfies LocalizedString,
  humanTitle: {
    en: "Human participation — longer-term direction",
    vi: "Sự tham gia của cá nhân — định hướng dài hạn",
  } satisfies LocalizedString,
  humanLead: {
    en: "Cardbey's longer-term opportunity may extend beyond SMEs. As technology reduces the cost of accessing business capability, individuals may increasingly operate with capabilities that historically required larger organizations.",
    vi: "Cơ hội dài hạn của Cardbey có thể vượt ra ngoài SME. Khi công nghệ làm giảm chi phí tiếp cận năng lực kinh doanh, cá nhân có thể ngày càng vận hành với những năng lực trước đây thường chỉ có trong các tổ chức lớn hơn.",
  } satisfies LocalizedString,
  humanNote: {
    en: "A person does not need to become a startup founder for increased economic capability to matter.",
    vi: "Một người không cần trở thành founder startup để việc gia tăng năng lực kinh tế trở nên có ý nghĩa.",
  } satisfies LocalizedString,
  humanStatus: {
    en: "DIRECTION — not yet a validated Cardbey market.",
    vi: "DIRECTION — chưa phải thị trường Cardbey đã được kiểm chứng.",
  } satisfies LocalizedString,
  philosophyNote: {
    en: "Operating Philosophy v1.0 remains frozen in internal / founder materials. It informs this diligence; it does not lead it.",
    vi: "Operating Philosophy v1.0 vẫn đóng băng trong tài liệu nội bộ / founder. Nó thông tin thẩm định này; không dẫn dắt bề mặt.",
  } satisfies LocalizedString,
} as const;

export const unitEconomicsRows: {
  id: string;
  title: LocalizedString;
  status: DiligenceEvidenceStatus;
  body: LocalizedString;
}[] = [
  {
    id: "acquisition",
    title: { en: "Initial acquisition cost", vi: "Chi phí thu hút ban đầu" },
    status: "to_measure",
    body: {
      en: "Cost to discover, acquire, prepare and activate one business.",
      vi: "Chi phí để khám phá, tiếp cận, chuẩn bị và kích hoạt một doanh nghiệp.",
    },
  },
  {
    id: "paid-outcome",
    title: { en: "Initial project / paid outcome revenue", vi: "Doanh thu kết quả trả phí ban đầu" },
    status: "validating",
    body: {
      en: "Revenue from the first useful paid business outcome, which may include setup, digital presence, content, promotion, signage/display or another business service actually delivered. Not every business buys all of these.",
      vi: "Doanh thu từ kết quả kinh doanh hữu ích đầu tiên được khách hàng trả phí, có thể gồm thiết lập, hiện diện số, nội dung, quảng bá, bảng hiệu/màn hình hoặc dịch vụ kinh doanh thực tế khác. Không phải mọi doanh nghiệp mua tất cả.",
    },
  },
  {
    id: "recurring",
    title: { en: "Recurring revenue", vi: "Doanh thu định kỳ" },
    status: "validating",
    body: {
      en: "Recurring platform, service or operating revenue after initial activation.",
      vi: "Doanh thu nền tảng, dịch vụ hoặc vận hành lặp lại sau khi doanh nghiệp được kích hoạt.",
    },
  },
  {
    id: "capability",
    title: { en: "Additional capability revenue", vi: "Doanh thu từ năng lực bổ sung" },
    status: "validating",
    body: {
      en: "Revenue generated when an existing business adds further Cardbey-enabled capabilities as its needs grow.",
      vi: "Doanh thu khi doanh nghiệp hiện hữu bổ sung thêm năng lực được Cardbey hỗ trợ.",
    },
  },
  {
    id: "commerce",
    title: { en: "Commerce / economic activity revenue", vi: "Doanh thu từ thương mại / hoạt động kinh tế" },
    status: "direction",
    body: {
      en: "Potential revenue attributable to transactions, promotion, distribution or other economic activity where Cardbey has a legitimate participation or attribution role. Not claimed at commercial scale today.",
      vi: "Doanh thu tiềm năng từ giao dịch, quảng bá, phân phối hoặc hoạt động kinh tế khác khi Cardbey có vai trò tham gia hoặc ghi nhận hợp lệ. Không tuyên bố quy mô thương mại hiện nay.",
    },
  },
  {
    id: "margin",
    title: { en: "Gross margin", vi: "Biên gộp" },
    status: "to_measure",
    body: {
      en: "Gross margin should ultimately be measured by revenue layer rather than presented today as one speculative blended margin.",
      vi: "Biên gộp cần được đo theo từng lớp doanh thu thay vì giả định một mức biên tổng hợp khi chưa có đủ bằng chứng.",
    },
  },
  {
    id: "retention",
    title: { en: "Retention", vi: "Giữ chân" },
    status: "to_prove",
    body: {
      en: "Whether businesses continue using Cardbey after the initial useful outcome.",
      vi: "Doanh nghiệp có tiếp tục sử dụng Cardbey sau kết quả hữu ích ban đầu hay không.",
    },
  },
  {
    id: "expansion",
    title: { en: "Expansion revenue", vi: "Doanh thu mở rộng" },
    status: "to_prove",
    body: {
      en: "Whether an activated business adds and pays for additional capabilities over time.",
      vi: "Doanh nghiệp đã kích hoạt có tiếp tục bổ sung và trả phí cho các năng lực khác theo thời gian hay không.",
    },
  },
  {
    id: "payback",
    title: { en: "Acquisition payback", vi: "Thời gian hoàn vốn thu hút" },
    status: "to_measure",
    body: {
      en: "How long it takes the economic contribution from a business relationship to recover the cost of acquiring and activating that business.",
      vi: "Thời gian cần thiết để đóng góp kinh tế từ quan hệ với một doanh nghiệp bù lại chi phí thu hút và kích hoạt doanh nghiệp đó.",
    },
  },
];

export const economicProgression: LocalizedString[] = [
  { en: "Discover", vi: "Khám phá" },
  { en: "Activate", vi: "Kích hoạt" },
  { en: "First paid outcome", vi: "Kết quả trả phí đầu tiên" },
  { en: "Retain", vi: "Giữ chân" },
  { en: "Add capability", vi: "Thêm năng lực" },
  { en: "More economic activity", vi: "Hoạt động kinh tế lớn hơn" },
];

export const seedProofQuestions: {
  id: string;
  title: LocalizedString;
  body: LocalizedString;
}[] = [
  {
    id: "acquisition",
    title: { en: "Acquisition", vi: "Thu hút" },
    body: {
      en: "Can Cardbey repeatedly reach appropriate businesses at sustainable cost?",
      vi: "Cardbey có thể tiếp cận đúng doanh nghiệp một cách lặp lại với chi phí bền vững không?",
    },
  },
  {
    id: "activation",
    title: { en: "Activation", vi: "Kích hoạt" },
    body: {
      en: "Can a discovered business be turned into useful capability efficiently?",
      vi: "Một doanh nghiệp được khám phá có thể nhanh chóng được chuyển thành năng lực hữu ích không?",
    },
  },
  {
    id: "payment",
    title: { en: "Payment", vi: "Chi trả" },
    body: {
      en: "Will businesses pay for useful outcomes?",
      vi: "Doanh nghiệp có trả tiền cho kết quả hữu ích không?",
    },
  },
  {
    id: "retention",
    title: { en: "Retention", vi: "Giữ chân" },
    body: {
      en: "Do they continue using Cardbey after the first outcome?",
      vi: "Họ có tiếp tục sử dụng Cardbey sau kết quả đầu tiên không?",
    },
  },
  {
    id: "expansion",
    title: { en: "Expansion", vi: "Mở rộng" },
    body: {
      en: "Do existing businesses add additional capabilities?",
      vi: "Doanh nghiệp hiện hữu có bổ sung thêm năng lực không?",
    },
  },
  {
    id: "economics",
    title: { en: "Economics & distribution", vi: "Kinh tế & phân phối" },
    body: {
      en: "Can revenue/activity justify acquisition and service costs, and can distribution become repeatable rather than primarily founder-dependent?",
      vi: "Doanh thu/hoạt động có đủ để biện minh cho chi phí thu hút và phục vụ, và việc phân phối có thể trở nên lặp lại thay vì phụ thuộc chủ yếu vào founder hay không?",
    },
  },
];

export const firstBusinessNeeds: LocalizedString[] = [
  { en: "Digital presence", vi: "Hiện diện số" },
  { en: "Business / store setup", vi: "Thiết lập doanh nghiệp / store" },
  { en: "Promotion and customer reach", vi: "Quảng bá và tiếp cận khách hàng" },
  { en: "Products / services", vi: "Sản phẩm / dịch vụ" },
  { en: "Content", vi: "Nội dung" },
  { en: "Signage / displays where relevant", vi: "Bảng hiệu / màn hình khi phù hợp" },
  { en: "Connected digital / physical customer experiences", vi: "Trải nghiệm khách hàng kết nối giữa môi trường số và vật lý" },
];

export const capabilityLadder: {
  id: string;
  title: LocalizedString;
  status: LocalizedString;
  items: LocalizedString[];
}[] = [
  {
    id: "now",
    title: { en: "Now — business capability", vi: "Hiện nay — năng lực kinh doanh" },
    status: { en: "EXISTS / VALIDATING", vi: "ĐÃ CÓ / ĐANG KIỂM CHỨNG" },
    items: [
      { en: "Create", vi: "Tạo" },
      { en: "Operate", vi: "Vận hành" },
      { en: "Promote", vi: "Quảng bá" },
      { en: "Sell", vi: "Bán" },
      { en: "Communicate", vi: "Giao tiếp" },
    ],
  },
  {
    id: "next",
    title: { en: "Next — relationships & distribution", vi: "Tiếp theo — quan hệ & phân phối" },
    status: { en: "DIRECTION", vi: "ĐỊNH HƯỚNG" },
    items: [
      { en: "Businesses", vi: "Doanh nghiệp" },
      { en: "Customers", vi: "Khách hàng" },
      { en: "Partners", vi: "Đối tác" },
      { en: "Suppliers", vi: "Nhà cung cấp" },
      { en: "Creators", vi: "Creator" },
      { en: "Devices", vi: "Thiết bị" },
    ],
  },
  {
    id: "later",
    title: { en: "Later — supporting economic capabilities", vi: "Sau này — năng lực kinh tế hỗ trợ" },
    status: { en: "DIRECTION", vi: "ĐỊNH HƯỚNG" },
    items: [
      { en: "Market coordination", vi: "Điều phối thị trường" },
      { en: "Logistics connections", vi: "Kết nối logistics" },
      { en: "Financial capabilities", vi: "Năng lực tài chính" },
    ],
  },
];

export const humanExamples: LocalizedString[] = [
  { en: "Employee + capability", vi: "Nhân viên + năng lực" },
  { en: "Creator + capability", vi: "Creator + năng lực" },
  { en: "Specialist + capability", vi: "Chuyên gia + năng lực" },
  { en: "Micro-business owner + capability", vi: "Chủ doanh nghiệp siêu nhỏ + năng lực" },
  { en: "Entrepreneur + capability", vi: "Doanh nhân + năng lực" },
];
