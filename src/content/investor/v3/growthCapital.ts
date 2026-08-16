import type { LocalizedString } from "../schemas/types";

/** Content registry for Growth & Capital Journey — no hard-coded UI strings in components. */

export const growthCapitalCopy = {
  sectionEyebrow: {
    en: "Growth & Capital Journey",
    vi: "Hành trình Tăng trưởng & Vốn",
  } satisfies LocalizedString,
  sectionTitle: {
    en: "How seed capital is intended to turn today's foundations into market evidence and a stronger company.",
    vi: "Cách vốn seed được dự kiến biến nền tảng hiện tại thành bằng chứng thị trường và một doanh nghiệp mạnh hơn.",
  } satisfies LocalizedString,
  sectionIntro: {
    en: "Capital → capability → market action → evidence → lower uncertainty → scale what is validated.",
    vi: "Vốn → năng lực → hành động thị trường → bằng chứng → giảm bất định → nhân rộng điều đã được kiểm chứng.",
  } satisfies LocalizedString,
  todayTitle: {
    en: "Cardbey today",
    vi: "Cardbey hôm nay",
  } satisfies LocalizedString,
  todayLead: {
    en: "What already exists before new capital enters.",
    vi: "Những gì đã có trước khi vốn mới vào.",
  } satisfies LocalizedString,
  todayLayers: [
    { en: "Vision", vi: "Tầm nhìn" },
    { en: "Platform foundations", vi: "Nền tảng đã xây" },
    { en: "AI-era execution", vi: "Thực thi kỷ nguyên AI" },
    { en: "Initial market pathways", vi: "Đường thị trường ban đầu" },
  ] as LocalizedString[],
  todayCta: {
    en: "View product & execution evidence",
    vi: "Xem bằng chứng sản phẩm & thực thi",
  } satisfies LocalizedString,
  seedThenMarket: {
    en: "Seed capital → Market action",
    vi: "Vốn seed → Hành động thị trường",
  } satisfies LocalizedString,
  capitalFlowTitle: {
    en: "What seed capital is intended to do",
    vi: "Vốn seed nhằm làm gì",
  } satisfies LocalizedString,
  capitalFlowLead: {
    en: "Strategic destinations — not an expense pie chart. Percentages appear only after founder confirmation.",
    vi: "Đích chiến lược — không phải biểu đồ chi phí. Phần trăm chỉ hiện sau khi founder xác nhận.",
  } satisfies LocalizedString,
  capitalHub: { en: "Seed capital", vi: "Vốn seed" } satisfies LocalizedString,
  capitalDestinations: [
    {
      id: "market-access",
      title: { en: "Market access", vi: "Tiếp cận thị trường" },
      outcome: { en: "Businesses", vi: "Doanh nghiệp" },
    },
    {
      id: "execution",
      title: { en: "Execution", vi: "Thực thi" },
      outcome: { en: "Capability", vi: "Năng lực" },
    },
    {
      id: "distribution",
      title: { en: "Distribution", vi: "Phân phối" },
      outcome: { en: "Reach", vi: "Tầm với" },
    },
  ],
  marketActivity: { en: "Market activity", vi: "Hoạt động thị trường" } satisfies LocalizedString,
  evidenceNode: { en: "Evidence", vi: "Bằng chứng" } satisfies LocalizedString,
  stagesTitle: {
    en: "Company value journey",
    vi: "Hành trình giá trị công ty",
  } satisfies LocalizedString,
  stagesLead: {
    en: "Not an engineering roadmap — stages advance when evidence is earned.",
    vi: "Không phải lộ trình kỹ thuật — giai đoạn tiến khi bằng chứng được tạo ra.",
  } satisfies LocalizedString,
  stages: [
    {
      id: "seed-prove",
      short: { en: "Seed / Prove", vi: "Seed / Chứng minh" },
      objective: {
        en: "Put Cardbey into concentrated real-market activity and establish evidence of economic value.",
        vi: "Đưa Cardbey vào hoạt động thị trường thật tập trung và tạo bằng chứng giá trị kinh tế.",
      },
      capitalRole: {
        en: "Fund market entry, service capacity, commercial experiments and evidence capture.",
        vi: "Tài trợ vào thị trường, năng lực phục vụ, thử nghiệm thương mại và thu thập bằng chứng.",
      },
      evidence: {
        en: "Participating and paying businesses, usage, revenue, recurring relationships, distribution, operating efficiency.",
        vi: "DN tham gia và trả phí, sử dụng, doanh thu, quan hệ định kỳ, phân phối, hiệu quả vận hành.",
      },
      unlocks: {
        en: "A clearer commercial engine — basis for a potential next financing stage.",
        vi: "Động cơ thương mại rõ hơn — cơ sở cho giai đoạn tài trợ tiếp theo tiềm năng.",
      },
    },
    {
      id: "multiply",
      short: { en: "Multiply", vi: "Nhân rộng" },
      objective: {
        en: "Put more resources behind commercial pathways that demonstrate repeatability.",
        vi: "Đưa thêm nguồn lực vào các đường thương mại đã chứng minh khả năng lặp lại.",
      },
      capitalRole: {
        en: "Amplify proven acquisition, capability-per-business and economic activity — not feature volume for its own sake.",
        vi: "Khuếch đại thu hút đã chứng minh, năng lực mỗi DN và hoạt động kinh tế — không phải khối lượng tính năng vì chính nó.",
      },
      evidence: {
        en: "More businesses × more capability per business × more economic activity.",
        vi: "Thêm doanh nghiệp × thêm năng lực mỗi DN × thêm hoạt động kinh tế.",
      },
      unlocks: {
        en: "Repeatable expansion where larger growth capital may become appropriate.",
        vi: "Mở rộng lặp lại được nơi vốn tăng trưởng lớn hơn có thể phù hợp.",
      },
    },
    {
      id: "expand",
      short: { en: "Expand", vi: "Mở rộng" },
      objective: {
        en: "Extend into additional markets and platform layers where earlier activity justifies expansion.",
        vi: "Mở sang thị trường và lớp nền tảng thêm khi hoạt động trước đủ biện minh.",
      },
      capitalRole: {
        en: "Support directional layers — broader markets, digital network, logistics, financial capability — only when earned.",
        vi: "Hỗ trợ lớp định hướng — thị trường rộng hơn, mạng số, logistics, năng lực tài chính — chỉ khi đã được chứng minh.",
      },
      evidence: {
        en: "Justification from prior economic activity. Future layers remain directional — not completed products.",
        vi: "Biện minh từ hoạt động kinh tế trước. Lớp tương lai vẫn mang tính định hướng — không phải sản phẩm đã hoàn thành.",
      },
      unlocks: {
        en: "Platform expansion as a consequence of proven demand — not a calendar promise.",
        vi: "Mở rộng nền tảng như hệ quả của nhu cầu đã chứng minh — không phải lời hứa lịch.",
      },
    },
  ],
  timelineNodes: [
    { id: "today", label: { en: "Today", vi: "Hôm nay" } },
    { id: "seed", label: { en: "Seed / Prove", vi: "Seed / Chứng minh" } },
    { id: "evidence", label: { en: "Evidence gate", vi: "Cổng bằng chứng" } },
    { id: "next", label: { en: "Next round", vi: "Vòng tiếp theo" } },
    { id: "growth", label: { en: "Multiply / Expand", vi: "Nhân rộng / Mở rộng" } },
  ],
  evidenceGateTitle: {
    en: "What must become true?",
    vi: "Điều gì phải được chứng minh?",
  } satisfies LocalizedString,
  evidenceGateLead: {
    en: "The next financing stage should be earned by evidence, not reached simply because twelve months have passed.",
    vi: "Giai đoạn tài trợ tiếp theo nên được tạo bởi bằng chứng — không phải vì đã hết mười hai tháng.",
  } satisfies LocalizedString,
  evidenceCategories: [
    { en: "Adoption", vi: "Chấp nhận" },
    { en: "Willingness to pay", vi: "Sẵn sàng trả tiền" },
    { en: "Recurring activity", vi: "Hoạt động định kỳ" },
    { en: "Distribution", vi: "Phân phối" },
    { en: "Operating economics", vi: "Kinh tế vận hành" },
  ] as LocalizedString[],
  scenariosTitle: {
    en: "Illustrative Growth Scenarios",
    vi: "Các Kịch bản Tăng trưởng Minh họa",
  } satisfies LocalizedString,
  scenariosSubtitle: {
    en: "Seed-stage scenarios based on explicit assumptions, not guaranteed forecasts.",
    vi: "Kịch bản giai đoạn seed dựa trên các giả định rõ ràng, không phải dự báo được bảo đảm.",
  } satisfies LocalizedString,
  founderInputRequired: {
    en: "Founder input required",
    vi: "Cần dữ liệu founder",
  } satisfies LocalizedString,
  formulaLead: {
    en: "Economics from drivers — not an arbitrary top-line number.",
    vi: "Kinh tế từ các động lực — không phải con số đỉnh tùy ý.",
  } satisfies LocalizedString,
  chartEmpty: {
    en: "Numeric scenario curves appear after founder-confirmed assumptions are approved for public display. Until then, only the driver framework is shown.",
    vi: "Đường cong kịch bản số sẽ hiện sau khi giả định founder được duyệt công khai. Trước đó chỉ hiện khung động lực.",
  } satisfies LocalizedString,
  chartLegendIllustrative: {
    en: "Illustrative — not a forecast",
    vi: "Minh họa — không phải dự báo",
  } satisfies LocalizedString,
  valueLadderTitle: {
    en: "Value creation ladder",
    vi: "Thang tạo giá trị",
  } satisfies LocalizedString,
  valueLadderLead: {
    en: "Evidence can reduce uncertainty and provide a stronger basis for future company value and financing. Not a guaranteed valuation increase.",
    vi: "Bằng chứng có thể giảm bất định và tạo cơ sở mạnh hơn cho giá trị công ty và tài trợ tương lai. Không bảo đảm tăng định giá.",
  } satisfies LocalizedString,
  valueLadderSteps: [
    { en: "Capital", vi: "Vốn" },
    { en: "Capability", vi: "Năng lực" },
    { en: "Market participation", vi: "Tham gia thị trường" },
    { en: "Customer / business activity", vi: "Hoạt động khách hàng / DN" },
    { en: "Revenue + usage + learning", vi: "Doanh thu + sử dụng + học hỏi" },
    { en: "Repeatability", vi: "Khả năng lặp lại" },
    { en: "Lower commercial uncertainty", vi: "Giảm bất định thương mại" },
    { en: "Greater company value potential", vi: "Tiềm năng giá trị công ty lớn hơn" },
  ] as LocalizedString[],
  fundraisingTitle: {
    en: "Fundraising journey (conditional)",
    vi: "Hành trình gọi vốn (có điều kiện)",
  } satisfies LocalizedString,
  fundraisingLead: {
    en: "These stages may become appropriate if preceding evidence is established — they are not scheduled commitments.",
    vi: "Các giai đoạn này có thể phù hợp nếu bằng chứng trước được thiết lập — không phải cam kết đã lên lịch.",
  } satisfies LocalizedString,
  fundraisingStages: [
    {
      id: "pre",
      title: { en: "Founder / pre-seed work", vi: "Công việc founder / pre-seed" },
      purpose: {
        en: "Vision, platform foundations and initial pathways.",
        vi: "Tầm nhìn, nền tảng và đường đi ban đầu.",
      },
      amplifies: {
        en: "Existing execution capability.",
        vi: "Năng lực thực thi hiện có.",
      },
      evidenceBefore: {
        en: "Enough clarity to justify concentrated market entry.",
        vi: "Đủ rõ để biện minh vào thị trường tập trung.",
      },
    },
    {
      id: "seed",
      title: { en: "Seed", vi: "Seed" },
      purpose: {
        en: "Prove Cardbey can create and capture economic value in real markets.",
        vi: "Chứng minh Cardbey có thể tạo và nắm bắt giá trị kinh tế trên thị trường thật.",
      },
      amplifies: {
        en: "Market access, people, distribution and commercial learning.",
        vi: "Tiếp cận thị trường, người, phân phối và học hỏi thương mại.",
      },
      evidenceBefore: {
        en: "Thesis credibility + build readiness (already in motion).",
        vi: "Độ tin cậy luận điểm + sẵn sàng xây (đã đang diễn ra).",
      },
    },
    {
      id: "evidence",
      title: { en: "Market evidence", vi: "Bằng chứng thị trường" },
      purpose: {
        en: "Convert activity into measurable commercial signal.",
        vi: "Biến hoạt động thành tín hiệu thương mại đo được.",
      },
      amplifies: {
        en: "What seed capital already put in motion.",
        vi: "Những gì vốn seed đã đưa vào chuyển động.",
      },
      evidenceBefore: {
        en: "Participating businesses, willingness to pay, recurrence, distribution.",
        vi: "DN tham gia, sẵn sàng trả tiền, lặp lại, phân phối.",
      },
    },
    {
      id: "next",
      title: { en: "Potential next round", vi: "Vòng tiếp theo tiềm năng" },
      purpose: {
        en: "Multiply pathways that demonstrated repeatability.",
        vi: "Nhân rộng các đường đã chứng minh khả năng lặp lại.",
      },
      amplifies: {
        en: "Proven acquisition and capability expansion — amounts only when confirmed.",
        vi: "Thu hút và mở rộng năng lực đã chứng minh — số tiền chỉ khi xác nhận.",
      },
      evidenceBefore: {
        en: "Evidence gate cleared — not a calendar date.",
        vi: "Cổng bằng chứng đạt — không phải ngày trên lịch.",
      },
    },
    {
      id: "growth",
      title: { en: "Potential growth capital", vi: "Vốn tăng trưởng tiềm năng" },
      purpose: {
        en: "Expand economic layers around an established participant base.",
        vi: "Mở rộng lớp kinh tế quanh cơ sở người tham gia đã hình thành.",
      },
      amplifies: {
        en: "Network, logistics, financial capability and broader markets — directional.",
        vi: "Mạng, logistics, năng lực tài chính và thị trường rộng hơn — định hướng.",
      },
      evidenceBefore: {
        en: "Repeatable expansion evidence from prior stages.",
        vi: "Bằng chứng mở rộng lặp lại từ các giai đoạn trước.",
      },
    },
  ],
  summaryJourneyTitle: {
    en: "The investment journey",
    vi: "Hành trình đầu tư",
  } satisfies LocalizedString,
  summarySteps: [
    { en: "Today — vision, foundations, pathways", vi: "Hôm nay — tầm nhìn, nền tảng, đường đi" },
    { en: "Seed capital", vi: "Vốn seed" },
    { en: "Market entry", vi: "Vào thị trường" },
    { en: "Real businesses", vi: "Doanh nghiệp thật" },
    { en: "Usage + transactions + revenue", vi: "Sử dụng + giao dịch + doanh thu" },
    { en: "Commercial evidence", vi: "Bằng chứng thương mại" },
    { en: "Repeatability", vi: "Khả năng lặp lại" },
    { en: "Next financing possibility", vi: "Khả năng tài trợ tiếp theo" },
    { en: "Multiplication", vi: "Nhân rộng" },
    { en: "Platform expansion", vi: "Mở rộng nền tảng" },
  ] as LocalizedString[],
  pitchJourneyTitle: {
    en: "How seed capital is intended to work",
    vi: "Cách vốn seed được dự kiến vận hành",
  } satisfies LocalizedString,
  pitchJourneySteps: [
    { en: "Seed capital", vi: "Vốn seed" },
    { en: "Market action", vi: "Hành động thị trường" },
    { en: "Evidence", vi: "Bằng chứng" },
    { en: "Reduced uncertainty", vi: "Giảm bất định" },
    { en: "Scale what works", vi: "Nhân rộng điều hiệu lực" },
  ] as LocalizedString[],
  capitalAggregationTitle: {
    en: "Capital is another resource",
    vi: "Vốn là một nguồn lực khác",
  } satisfies LocalizedString,
  capitalAggregationLead: {
    en: "Capital is not the outcome. The intended outcome is evidence that tells Cardbey — and its investors — what deserves to scale. No return is promised.",
    vi: "Vốn không phải kết quả. Kết quả nhằm tới là bằng chứng cho Cardbey — và nhà đầu tư — biết điều gì xứng đáng được nhân rộng. Không hứa lợi nhuận.",
  } satisfies LocalizedString,
  outcomesTitle: {
    en: "Potential investor outcomes",
    vi: "Kết quả tiềm năng cho nhà đầu tư",
  } satisfies LocalizedString,
  outcomesLead: {
    en: "These are possible future pathways, not commitments or forecasts.",
    vi: "Đây là các đường đi tương lai có thể — không phải cam kết hay dự báo.",
  } satisfies LocalizedString,
  outcomes: [
    {
      id: "follow-on",
      title: { en: "Follow-on financing", vi: "Tài trợ follow-on" },
      body: {
        en: "Early equity may increase in value if later investors finance Cardbey at higher valuations — not guaranteed.",
        vi: "Vốn sớm có thể tăng giá trị nếu nhà đầu tư sau tài trợ Cardbey ở định giá cao hơn — không bảo đảm.",
      },
    },
    {
      id: "strategic",
      title: { en: "Strategic transaction", vi: "Giao dịch chiến lược" },
      body: {
        en: "A future strategic acquisition could provide liquidity if Cardbey becomes valuable to larger platforms or industries — not a development objective.",
        vi: "Mua lại chiến lược tương lai có thể tạo thanh khoản nếu Cardbey trở nên giá trị với nền tảng hoặc ngành lớn hơn — không phải mục tiêu phát triển.",
      },
    },
    {
      id: "public",
      title: { en: "Public market", vi: "Thị trường công chúng" },
      body: {
        en: "A public listing could become possible if Cardbey eventually reaches sufficient scale and maturity — long-term and highly uncertain.",
        vi: "Niêm yết công chúng có thể trở nên khả thi nếu Cardbey đạt đủ quy mô và trưởng thành — dài hạn và rất bất định.",
      },
    },
    {
      id: "independent",
      title: { en: "Independent company", vi: "Công ty độc lập" },
      body: {
        en: "Cardbey may instead develop as a substantial independent company creating long-term shareholder value.",
        vi: "Cardbey cũng có thể phát triển như công ty độc lập đáng kể tạo giá trị cổ đông dài hạn.",
      },
    },
  ],
  proposalTitle: { en: "Seed proposal", vi: "Đề xuất seed" } satisfies LocalizedString,
  proposalCtaMaterials: {
    en: "Request Investor Materials",
    vi: "Yêu cầu tài liệu nhà đầu tư",
  } satisfies LocalizedString,
  proposalCtaFounder: {
    en: "Talk to the Founder",
    vi: "Nói chuyện với Founder",
  } satisfies LocalizedString,
  viaMaterials: {
    en: "Via investor materials",
    vi: "Qua tài liệu nhà đầu tư",
  } satisfies LocalizedString,
  leverageMirrorTitle: {
    en: "Capital as another resource Cardbey coordinates",
    vi: "Vốn như một nguồn lực khác Cardbey điều phối",
  } satisfies LocalizedString,
  leverageMirrorLead: {
    en: "Seed capital joins existing technology, people, partners and market access — coordinated into market action, evidence and the next decision. Not a guaranteed return.",
    vi: "Vốn seed cùng công nghệ, người, đối tác và tiếp cận thị trường hiện có — được điều phối thành hành động thị trường, bằng chứng và quyết định tiếp theo. Không phải lợi nhuận được bảo đảm.",
  } satisfies LocalizedString,
  disclosure: {
    en: "Proposed seed terms. Subject to final legal documentation. Early-stage venture risk. No guaranteed return, IPO, acquisition or liquidity. A$12M is a proposed post-money SAFE valuation cap, not an established current valuation.",
    vi: "Điều khoản seed đề xuất. Phụ thuộc hồ sơ pháp lý cuối cùng. Rủi ro đầu tư mạo hiểm giai đoạn sớm. Không bảo đảm lợi nhuận, IPO, M&A hay thanh khoản. A$12M là valuation cap đề xuất của post-money SAFE, không phải định giá hiện tại đã xác lập.",
  } satisfies LocalizedString,
} as const;
