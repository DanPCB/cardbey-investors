import type { SectionContent } from "../schemas/types";

/**
 * V3 high-momentum compressed pitch — 9 main chapters + diligence layers.
 * Operating Philosophy v1.0 remains frozen; detail moves to drawers/resources.
 */
export const investorV3Sections: SectionContent[] = [
  {
    id: "hero",
    order: 1,
    tier: "core",
    eyebrow: { en: "The shift", vi: "Chuyển dịch" },
    title: {
      en: "The Structure of Economic Participation Is Changing.",
      vi: "Cấu trúc tham gia kinh tế đang thay đổi.",
    },
    introduction: {
      en: "Technology is changing who can participate economically, what capability individuals and small organisations can access, and how businesses can be formed and operated.",
      vi: "Công nghệ đang thay đổi ai có thể tham gia kinh tế, năng lực nào cá nhân và tổ chức nhỏ có thể tiếp cận, và cách doanh nghiệp có thể được hình thành cũng như vận hành.",
    },
    body: [
      {
        en: "Technology is changing not only how existing businesses operate, but who can build, operate and participate in a business at all.",
        vi: "Công nghệ không chỉ thay đổi cách doanh nghiệp hiện tại vận hành, mà còn thay đổi ai có thể tạo dựng, vận hành và tham gia vào hoạt động kinh tế.",
      },
      {
        en: "Intelligence, software, infrastructure and access to markets that once required larger organisations, specialist teams and substantial resources are becoming increasingly accessible.",
        vi: "Trí tuệ, phần mềm, hạ tầng và khả năng tiếp cận thị trường — những nguồn lực trước đây thường đòi hỏi tổ chức lớn, đội ngũ chuyên môn và nguồn vốn đáng kể — đang ngày càng trở nên dễ tiếp cận hơn.",
      },
    ],
    bullets: [
      {
        en: "AI — Intelligence and specialised assistance are becoming more accessible.",
        vi: "AI — Trí tuệ và hỗ trợ chuyên biệt đang trở nên dễ tiếp cận hơn.",
      },
      {
        en: "Cloud + APIs — Sophisticated digital capabilities can increasingly be accessed on demand.",
        vi: "Cloud + API — Năng lực số phức tạp ngày càng có thể được dùng theo nhu cầu.",
      },
      {
        en: "Global digital networks — People, creators, suppliers, knowledge and markets are easier to reach across geography.",
        vi: "Mạng số toàn cầu — Người, nhà sáng tạo, nhà cung cấp, tri thức và thị trường dễ tiếp cận hơn xuyên địa lý.",
      },
      {
        en: "Distributed infrastructure — More economic capability can be assembled from resources that do not need to sit inside one organisation.",
        vi: "Hạ tầng phân tán — Nhiều năng lực kinh tế hơn có thể được lắp từ nguồn lực không cần nằm trong một tổ chức.",
      },
    ],
    ctas: [
      {
        id: "cta-v3-paradox",
        label: { en: "See the thesis", vi: "Xem luận điểm" },
        action: "scroll",
        targetSectionId: "paradox",
        variant: "primary",
      },
      {
        id: "cta-v3-materials",
        label: { en: "Investor Materials", vi: "Tài liệu nhà đầu tư" },
        action: "scroll",
        targetSectionId: "resources",
        variant: "secondary",
      },
    ],
    disclosure: {
      en: "Not a claim that all resources are universally cheap, immediately available, or useful without coordination.",
      vi: "Không phải tuyên bố mọi nguồn lực đều rẻ, sẵn có ngay, hoặc hữu ích nếu không được điều phối.",
    },
    status: "draft",
  },
  {
    id: "paradox",
    order: 2,
    tier: "core",
    eyebrow: { en: "Bottleneck", vi: "Điểm nghẽn" },
    title: {
      en: "Access ≠ Capability.",
      vi: "Tiếp cận ≠ Năng lực.",
    },
    introduction: {
      en: "More resources becoming accessible means existing businesses can reach more capability, and new economic activity can become possible. Those resources remain distributed. Access is not capability.",
      vi: "Nguồn lực dễ tiếp cận hơn nghĩa là doanh nghiệp hiện tại có thể có thêm năng lực, và hoạt động kinh tế mới có thể trở nên khả thi. Những nguồn lực đó vẫn phân tán. Tiếp cận không phải là năng lực.",
    },
    body: [
      {
        en: "The bottleneck is coordination: how the right resources work together, in the right context, toward a useful economic outcome — whether that outcome extends an existing business or helps a new one become operational.",
        vi: "Điểm nghẽn là điều phối: làm sao nguồn lực đúng làm việc cùng nhau, trong cùng một ngữ cảnh và đem lại kết quả kinh tế hữu ích — dù kết quả đó mở rộng doanh nghiệp hiện tại hay giúp nhà khởi nghiệp bắt đầu vận hành.",
      },
    ],
    ctas: [
      {
        id: "cta-v3-explore-thesis",
        label: { en: "See Cardbey’s answer →", vi: "Xem câu trả lời của Cardbey →" },
        action: "scroll",
        targetSectionId: "missing-layer",
        variant: "secondary",
      },
    ],
    status: "draft",
  },
  {
    id: "missing-layer",
    order: 3,
    tier: "core",
    eyebrow: { en: "Cardbey", vi: "Cardbey" },
    title: {
      en: "CARDBEY — Resource Aggregation Accelerator.",
      vi: "CARDBEY — Nền Tảng Tổng Hợp Gia Tốc Nguồn Lực.",
    },
    introduction: {
      en: "Resources already exist. Cardbey is building a way to put them to work around economic activity.",
      vi: "Nguồn lực đã có. Cardbey đang xây cách đưa chúng vào việc quanh hoạt động kinh tế.",
    },
    body: [
      {
        en: "Cardbey is designed to coordinate resources around economic activity at different starting points. For an existing business, that can mean adding capability. For a new venture, it can mean assembling the capabilities required to become operational in the first place.",
        vi: "Cardbey được thiết kế để điều phối nguồn lực quanh hoạt động kinh tế từ những điểm bắt đầu khác nhau. Với doanh nghiệp hiện tại, đó có thể là thêm năng lực. Với nhà khởi nghiệp, đó có thể là tập hợp các năng lực cần thiết để bắt đầu vận hành.",
      },
    ],
    ctas: [
      {
        id: "cta-v3-usp-begin",
        label: {
          en: "See how it begins →",
          vi: "Xem cách bắt đầu →",
        },
        action: "scroll",
        targetSectionId: "start-one",
        variant: "secondary",
      },
      {
        id: "cta-v3-philosophy",
        label: { en: "Explore the Cardbey Philosophy →", vi: "Khám phá triết lý Cardbey →" },
        href: "#diligence",
        variant: "accent",
      },
    ],
    disclosure: {
      en: "Strategic design principle — not a claim that Cardbey currently integrates every platform, owns global infrastructure, or has proven commercial acceleration. Population scale is not Cardbey TAM.",
      vi: "Nguyên tắc thiết kế chiến lược — không phải tuyên bố Cardbey hiện tích hợp mọi nền tảng, sở hữu hạ tầng toàn cầu, hoặc đã chứng minh gia tốc thương mại. Quy mô dân số không phải TAM của Cardbey.",
    },
    status: "draft",
  },
  {
    id: "start-one",
    order: 4,
    tier: "core",
    eyebrow: { en: "Practice", vi: "Thực hành" },
    title: {
      en: "Start with one context. Add capability as it needs it.",
      vi: "Bắt đầu từ một ngữ cảnh. Bổ sung năng lực khi cần thiết.",
    },
    introduction: {
      en: "The same system can start from an existing business or from a person, idea, product or opportunity. Both enter Cardbey as one economic context. Capability is then attached — presence, products, intelligence, promotion, physical surfaces, commerce — according to readiness, not as if every row were already operational.",
      vi: "Cùng một hệ thống có thể bắt đầu từ doanh nghiệp hiện tại, hoặc từ một người, ý tưởng, sản phẩm hay cơ hội. Cả hai đi vào Cardbey như một ngữ cảnh kinh tế. Năng lực được bổ sung: hiện diện, sản phẩm, trí tuệ, quảng bá, bề mặt vật lý, thương mại — theo mức sẵn sàng, không như thể mọi hàng đã vận hành.",
    },
    body: [
      {
        en: "The explorer and table below are the first connected capabilities of the Resource Aggregation Accelerator — not a product catalogue and not five startups. “New business” is shorthand for new economic activity: a company is one possible form, not the only one.",
        vi: "Phần khám phá và bảng dưới đây là các năng lực kết nối giai đoạn một của Nền tảng Tổng Hợp Gia Tốc Nguồn Lực — không phải danh mục sản phẩm và không phải năm dự án riêng lẻ. “Doanh nghiệp mới” là cách nói tắt cho hoạt động kinh tế mới: công ty là một hình thức có thể, không phải hình thức duy nhất.",
      },
    ],
    relatedCapabilityIds: [
      "cap-business-import",
      "cap-ai-storefront",
      "cap-ai-performer",
      "cap-growth-engine",
      "cap-partner-attribution",
      "cap-smart-display-runtime",
      "cap-signage-scheduling",
      "cap-commerce-ops",
      "cap-payments",
      "cap-delivery",
    ],
    ctas: [
      {
        id: "cta-v3-evidence",
        label: {
          en: "Explore product & execution evidence →",
          vi: "Khám phá bằng chứng sản phẩm & thực thi →",
        },
        href: "#diligence",
        variant: "secondary",
      },
    ],
    disclosure: {
      en: "Implementation evidence is not automatic proof of production reliability or paying demand. Performer remains development-stage and policy-bounded. Delivery / fulfilment remains directional until operationally verified.",
      vi: "Bằng chứng triển khai không tự chứng minh độ tin cậy khi vận hành thật hay nhu cầu trả phí. Performer vẫn ở giai đoạn phát triển và theo chính sách. Giao hàng / hoàn tất đơn vẫn là định hướng cho đến khi được xác minh vận hành.",
    },
    status: "draft",
  },
  {
    id: "commercial-validation",
    order: 5,
    tier: "core",
    eyebrow: { en: "First market", vi: "Thị trường đầu tiên" },
    title: {
      en: "The next stage is market execution.",
      vi: "Giai đoạn tiếp theo là thực thi thị trường.",
    },
    introduction: {
      en: "Phase 1 is a 12-month Australia and Vietnam program that aims to put the first operating capabilities into structured market execution and to measure whether the platform can scale. Existing SMEs remain the primary operating unit. Selected new-activity journeys are VALIDATING.",
      vi: "Chương trình 12 tháng tại Úc và Việt Nam nhắm mục tiêu đưa các năng lực vận hành đầu vào thực thi thị trường có cấu trúc và đo lường khả năng mở rộng nền tảng. SME hiện tại vẫn là đơn vị vận hành chính. Các hành trình hoạt động mới được chọn vẫn ĐANG KIỂM CHỨNG.",
    },
    bullets: [
      {
        en: "WHO — Existing SMEs remain the primary Phase 1 operating unit, with selected new economic activity where operationally ready, initially through a focused Australia–Vietnam corridor.",
        vi: "ĐỐI TƯỢNG — SME hiện tại vẫn là đơn vị vận hành chính của Giai đoạn 1, kèm một số hoạt động kinh tế mới khi sẵn sàng vận hành, trước hết qua hành lang Úc–Việt Nam.",
      },
      {
        en: "PAID OUTCOME — A real business result (getting established, reaching customers, promoting, selling or operating) — not payment for “Cardbey technology.”",
        vi: "KẾT QUẢ TRẢ PHÍ — một kết quả kinh doanh thật (được thành lập, tiếp cận khách, quảng bá, bán hàng hoặc vận hành) — không phải trả tiền cho “công nghệ Cardbey”.",
      },
      {
        en: "PHASE 1 TEST — Whether available capability combinations create adoption, payment, repeat activity and retention — then Scale / Change / Stop.",
        vi: "BÀI KIỂM GIAI ĐOẠN 1 — Tổ hợp năng lực sẵn có có tạo chấp nhận, thanh toán, hoạt động lặp lại và giữ chân hay không — rồi Nhân rộng / Đổi hướng / Dừng.",
      },
      {
        en: "EVIDENCE — Claim → activate → pay → repeat → add capability → retain. No public CAC, LTV or revenue targets are claimed here.",
        vi: "BẰNG CHỨNG — nhận → kích hoạt → trả phí → lặp lại → thêm năng lực → giữ chân. Trang này không công bố CAC, LTV hay mục tiêu doanh thu.",
      },
    ],
    disclosure: {
      en: "A starting hypothesis to be tested. Existing relationships may support distribution, but public acquisition, conversion and revenue metrics are not established on this page.",
      vi: "Đây là giả thuyết khởi đầu cần được kiểm. Quan hệ hiện có có thể hỗ trợ phân phối, nhưng chỉ số thu hút, chuyển đổi và doanh thu công khai chưa được thiết lập trên trang này.",
    },
    status: "draft",
  },
  {
    id: "expansion",
    order: 6,
    tier: "core",
    eyebrow: { en: "Expansion", vi: "Mở rộng" },
    title: {
      en: "If it works, the same idea can apply to more economic activity.",
      vi: "Nếu cách này hiệu lực, cùng logic đó có thể áp dụng cho thêm hoạt động kinh tế.",
    },
    introduction: {
      en: "A journey may start from a person, idea or opportunity, or from an existing business. Both converge on useful capability around economic activity — which may be a company, a one-person operation, a creator activity, an independent service or another form of participation. Cardbey does not begin by manufacturing a network. It begins by making participation useful enough that relationships and network value may emerge from real activity.",
      vi: "Hành trình có thể bắt đầu từ một người, ý tưởng hoặc cơ hội, hoặc từ doanh nghiệp hiện tại. Cả hai hội tụ vào năng lực hữu ích quanh hoạt động kinh tế — có thể là một công ty, hoạt động một người, hoạt động creator, dịch vụ độc lập hoặc hình thức tham gia khác. Cardbey không bắt đầu bằng cách dựng sẵn một mạng. Cardbey bắt đầu bằng việc làm sự tham gia đủ hữu ích để quan hệ và giá trị mạng có thể hình thành từ hoạt động thật.",
    },
    bullets: [
      {
        en: "EXISTS — Capability around one economic context, and the ability to add more capability to that same context",
        vi: "ĐÃ CÓ — Năng lực quanh một ngữ cảnh kinh tế, và khả năng thêm năng lực cho cùng ngữ cảnh đó",
      },
      {
        en: "VALIDATING — Deeper relationship: useful outcome → another capability → another economic interaction",
        vi: "ĐANG KIỂM CHỨNG — Quan hệ sâu hơn: kết quả hữu ích → năng lực khác → tương tác kinh tế khác",
      },
      {
        en: "DIRECTION — Many businesses, relationships and a network — only if usefulness repeats",
        vi: "ĐỊNH HƯỚNG — Nhiều doanh nghiệp, quan hệ và một mạng — chỉ khi sự hữu ích lặp lại",
      },
    ],
    body: [
      {
        en: "Delivery / fulfilment, finance and broader infrastructure remain directional until operationally verified. Network effects are not proven.",
        vi: "Giao hàng / hoàn tất đơn, tài chính và hạ tầng rộng hơn vẫn là định hướng cho đến khi được xác minh vận hành. Hiệu ứng mạng chưa được chứng minh.",
      },
    ],
    status: "draft",
  },
  {
    id: "growth-capital",
    order: 7,
    tier: "core",
    eyebrow: { en: "Investment", vi: "Đầu tư" },
    title: {
      en: "The seed proposition is a defined 12-month experiment.",
      vi: "Đề xuất seed là một thí nghiệm 12 tháng đã được xác định.",
    },
    introduction: {
      en: "Cardbey is proposing an A$3M seed raise on a post-money SAFE with a proposed A$12M valuation cap, to fund Phase 1: a 12-month Australia and Vietnam market-activation and validation program. Proposed terms. Subject to final legal documentation.",
      vi: "Cardbey đề xuất gọi vốn seed A$3M bằng post-money SAFE, với valuation cap đề xuất A$12M, để tài trợ Giai đoạn 1: chương trình kích hoạt và kiểm chứng thị trường 12 tháng tại Úc và Việt Nam. Đây là điều khoản đề xuất, phụ thuộc hồ sơ pháp lý cuối cùng.",
    },
    body: [
      {
        en: "The money activates the first operating capabilities in market: four quarters to learn which combinations create adoption, payment, repeat activity and retention. The next round is earned by evidence, not by time.",
        vi: "Khoản vốn này kích hoạt các năng lực vận hành đầu trên thị trường: bốn quý để học tổ hợp nào tạo chấp nhận, thanh toán, hoạt động lặp lại và giữ chân. Vòng tiếp theo phải được tạo ra bởi bằng chứng, không phải bởi thời gian.",
      },
    ],
    ctas: [
      {
        id: "cta-v3-gc-materials",
        label: { en: "Request Investor Materials", vi: "Yêu cầu tài liệu nhà đầu tư" },
        action: "scroll",
        targetSectionId: "resources",
        variant: "secondary",
      },
      {
        id: "cta-v3-gc-deep",
        label: { en: "Growth & Capital details →", vi: "Chi tiết Tăng trưởng & Vốn →" },
        href: "#diligence",
        variant: "accent",
      },
    ],
    disclosure: {
      en: "Early-stage venture risk. Proposed terms. Subject to final legal documentation. No return, IPO, acquisition or liquidity promises.",
      vi: "Rủi ro đầu tư mạo hiểm giai đoạn sớm. Điều khoản đề xuất. Phụ thuộc hồ sơ pháp lý cuối cùng. Không cam kết lợi nhuận, IPO, M&A hay thanh khoản.",
    },
    status: "draft",
  },
  {
    id: "seed-opportunity",
    order: 8,
    tier: "core",
    eyebrow: { en: "Invitation", vi: "Lời mời" },
    title: {
      en: "The next phase is market execution.",
      vi: "Giai đoạn tiếp theo là triển khai trên thị trường.",
    },
    introduction: {
      en: "Cardbey has used its foundation stage to build the first parts of the Resource Aggregation Accelerator. Phase 1 takes that mechanism into real economic activity across Australia and Vietnam.",
      vi: "Cardbey đã dùng giai đoạn nền tảng để xây những phần đầu của Nền Tảng Tổng Hợp Gia Tốc Nguồn Lực. Giai đoạn 1 đưa cơ chế đó vào hoạt động kinh tế thật tại Úc và Việt Nam.",
    },
    body: [
      {
        en: "The proposed A$3M seed round is intended to provide 12 months to consolidate the platform, activate businesses, develop the first commercial capability channels and learn which combinations create repeatable value.",
        vi: "Vòng seed đề xuất A$3M nhằm tạo 12 tháng để củng cố nền tảng, kích hoạt doanh nghiệp, phát triển các kênh năng lực thương mại đầu tiên và học tổ hợp nào tạo giá trị lặp lại được.",
      },
      {
        en: "The opportunity is larger than what has been proven today. That is the nature of a venture-stage investment.",
        vi: "Cơ hội lớn hơn những gì đã được chứng minh hôm nay. Đó là bản chất của một khoản đầu tư giai đoạn venture.",
      },
      {
        en: "The next phase is designed to turn that opportunity into evidence — and use that evidence to determine where Cardbey should concentrate resources next.",
        vi: "Giai đoạn tiếp theo nhằm biến cơ hội đó thành bằng chứng — và dùng bằng chứng đó để xác định Cardbey nên tập trung nguồn lực vào đâu tiếp theo.",
      },
      {
        en: "Over Phase 1, Cardbey will observe:",
        vi: "Trong Giai đoạn 1, Cardbey sẽ quan sát:",
      },
    ],
    bullets: [
      {
        en: "Do businesses engage, claim and activate?",
        vi: "Doanh nghiệp có tiếp cận, nhận và kích hoạt không?",
      },
      {
        en: "Which capabilities create useful and paid outcomes?",
        vi: "Năng lực nào tạo kết quả hữu ích và có trả phí?",
      },
      {
        en: "Do businesses return and add more capability?",
        vi: "Doanh nghiệp có quay lại và thêm năng lực không?",
      },
      {
        en: "Which capability combinations show evidence worth scaling?",
        vi: "Tổ hợp năng lực nào cho thấy bằng chứng đáng được nhân rộng?",
      },
    ],
    ctas: [
      {
        id: "cta-v3-fund-contact",
        label: { en: "Talk to the Founder", vi: "Nói chuyện với Founder" },
        action: "contact",
        variant: "primary",
      },
      {
        id: "cta-v3-fund-materials",
        label: { en: "Request Investor Materials", vi: "Yêu cầu tài liệu nhà đầu tư" },
        action: "scroll",
        targetSectionId: "resources",
        variant: "secondary",
      },
    ],
    disclosure: {
      en: "Early-stage venture risk. Not an offer of securities where unlawful. Proposed seed terms appear in the investment section and remain subject to final legal documentation.",
      vi: "Rủi ro đầu tư mạo hiểm giai đoạn sớm. Không phải lời chào bán chứng khoán khi việc chào bán là bất hợp pháp. Điều khoản seed đề xuất nằm ở phần đầu tư và vẫn phụ thuộc hồ sơ pháp lý cuối cùng.",
    },
    status: "draft",
  },
  {
    id: "qa",
    order: 9,
    tier: "core",
    eyebrow: { en: "Q&A", vi: "Hỏi đáp" },
    title: {
      en: "Investor Q&A",
      vi: "Hỏi & Đáp Nhà đầu tư",
    },
    introduction: {
      en: "Questions we would ask if we were evaluating Cardbey.",
      vi: "Những câu hỏi chúng tôi cũng sẽ đặt ra nếu đang đánh giá Cardbey.",
    },
    status: "draft",
  },
  {
    id: "resources",
    order: 10,
    tier: "investor",
    eyebrow: { en: "Materials", vi: "Tài liệu" },
    title: {
      en: "Want the detail?",
      vi: "Cần chi tiết?",
    },
    introduction: {
      en: "Technical evidence, financial models, legal material and deeper operating information live here — separate from the main pitch.",
      vi: "Bằng chứng kỹ thuật, mô hình tài chính, tài liệu pháp lý và thông tin vận hành sâu hơn nằm ở đây — tách khỏi pitch chính.",
    },
    status: "draft",
  },
  {
    id: "contact",
    order: 11,
    tier: "investor",
    eyebrow: { en: "Contact", vi: "Liên hệ" },
    title: {
      en: "Continue the conversation",
      vi: "Tiếp tục trao đổi",
    },
    introduction: {
      en: "Cardbey is preparing for Phase 1 market execution across Australia and Vietnam.",
      vi: "Cardbey đang chuẩn bị Giai đoạn 1 triển khai thị trường tại Úc và Việt Nam.",
    },
    body: [
      {
        en: "We welcome investors who want to examine the opportunity, the mechanism, what has already been built, the proposed seed terms and what the next 12 months are intended to test.",
        vi: "Chúng tôi chào đón nhà đầu tư muốn xem xét cơ hội, cơ chế, những gì đã được xây, điều khoản seed đề xuất, và những gì 12 tháng tới nhằm kiểm chứng.",
      },
    ],
    ctas: [
      {
        id: "cta-v3-contact",
        label: { en: "Talk to the Founder", vi: "Nói chuyện với Founder" },
        action: "contact",
        variant: "primary",
      },
      {
        id: "cta-v3-contact-materials",
        label: { en: "Request Investor Materials", vi: "Yêu cầu tài liệu nhà đầu tư" },
        action: "scroll",
        targetSectionId: "resources",
        variant: "secondary",
      },
    ],
    status: "draft",
  },
  {
    id: "footer",
    order: 12,
    tier: "investor",
    title: { en: "Legal", vi: "Pháp lý" },
    introduction: {
      en: "SIGNSCATER PTY LTD · ABN 50 685 406 697 · ACN 685 406 697",
      vi: "SIGNSCATER PTY LTD · ABN 50 685 406 697 · ACN 685 406 697",
    },
    disclosure: {
      en: "Forward-looking statements are directional and subject to change. Early-stage venture investing carries risk of loss. This page does not constitute an offer of securities where unlawful.",
      vi: "Các tuyên bố hướng tới tương lai mang tính định hướng và có thể thay đổi. Đầu tư mạo hiểm giai đoạn sớm có rủi ro mất vốn. Trang này không phải lời chào bán chứng khoán khi việc chào bán là bất hợp pháp.",
    },
    status: "draft",
  },
];

/** Sections removed from main scroll — retained IDs for deep links / archive tests */
export const V3_COMPRESSED_AWAY_IDS = [
  "human-opportunity",
  "cardbey-layer",
  "strategy",
  "why-now",
  "what-exists",
  "closing",
] as const;
