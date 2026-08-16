import type { LocalizedString } from "../schemas/types";

/**
 * Investor challenge / answer layer for V3.
 * Answers stay short and must not invent traction, revenue, customers,
 * valuations, market share, partnerships, forecasts or investment terms.
 *
 * Conceptual order in the first cluster:
 * opportunity → thesis → mechanism → execution → competition → possible defensibility.
 * Overlap (do not auto-delete; candidates to compress later):
 * - Q1/Q6 ↔ missing-layer / EverythingIsAlreadyThere
 * - Q4/Q5 ↔ paradox / WhyNowStrip
 * - Q9 ↔ diligence Business & Economics (monetisation + value capture merged)
 * - Q10 ↔ start-one / Technology & Evidence drawer
 * - Q12/Q13 ↔ growth-capital / SeedOpportunityPanel
 */

export type InvestorQaCategory =
  | "thesis"
  | "defensibility"
  | "evidence"
  | "scale";

export type InvestorQaLink = {
  href: string;
  label: LocalizedString;
  contact?: boolean;
};

export type InvestorQaItem = {
  id: string;
  n: number;
  category: InvestorQaCategory;
  question: LocalizedString;
  answer: LocalizedString;
  links?: InvestorQaLink[];
};

export const investorQaCopy = {
  frameLabel: {
    en: "Investment challenge",
    vi: "Thách thức đầu tư",
  },
  closingTitle: {
    en: "Still have a question?",
    vi: "Vẫn còn câu hỏi?",
  },
  closingBody: {
    en: "Good investment decisions come from challenging the thesis. If something important is missing, ask us directly.",
    vi: "Quyết định đầu tư tốt đến từ việc thách thức luận điểm. Nếu thiếu điều quan trọng, hãy hỏi trực tiếp.",
  },
  askFounder: {
    en: "Ask the Founder",
    vi: "Hỏi Founder",
  },
  requestMaterials: {
    en: "Request Investor Materials",
    vi: "Yêu cầu tài liệu nhà đầu tư",
  },
  categories: {
    thesis: {
      en: "Opportunity, thesis & competition",
      vi: "Cơ hội, luận điểm & cạnh tranh",
    },
    defensibility: {
      en: "Defensibility & business model",
      vi: "Lợi thế & mô hình kinh doanh",
    },
    evidence: { en: "Evidence & execution", vi: "Bằng chứng & thực thi" },
    scale: {
      en: "Scale, risk & investor outcome",
      vi: "Quy mô, rủi ro & kết quả nhà đầu tư",
    },
  } satisfies Record<InvestorQaCategory, LocalizedString>,
} as const;

export const investorQaItems: InvestorQaItem[] = [
  {
    id: "competition",
    n: 1,
    category: "thesis",
    question: {
      en: "Why invest in Cardbey when Amazon, eBay, Shopify and other platforms already exist?",
      vi: "Tại sao đầu tư vào Cardbey khi đã có Amazon, eBay, Shopify và nhiều nền tảng khác?",
    },
    answer: {
      en: "Their existence demonstrates that large amounts of useful infrastructure, distribution, software, intelligence and marketplaces already exist. Cardbey’s thesis does not depend on those resources disappearing. It depends on the possibility that continuous technological and market change creates new opportunities to combine existing and newly accessible resources around economic needs. Amazon, Shopify, Meta and Google are therefore part of the opportunity, not merely competitors to defeat. Cardbey is developing a Resource Aggregation Accelerator: coordinating those resources around a business so they become usable capability. Their scale is evidence that enormous resources already exist. Cardbey’s bet is not that those resources disappear. It is that continuous market change creates new opportunities to combine them.",
      vi: "Sự tồn tại của họ cho thấy hạ tầng, phân phối, phần mềm, trí tuệ và marketplace hữu ích đã có ở quy mô lớn. Luận điểm của Cardbey không phụ thuộc vào việc những nguồn lực đó biến mất. Nó phụ thuộc vào khả năng rằng thay đổi công nghệ và thị trường liên tục tạo ra cơ hội mới để kết hợp nguồn lực sẵn có và nguồn lực mới tiếp cận được quanh nhu cầu kinh tế. Amazon, Shopify, Meta và Google vì thế là một phần của cơ hội, không chỉ là đối thủ phải đánh bại. Cardbey đang phát triển Nền Tảng Tổng Hợp Gia Tốc Nguồn Lực: điều phối những nguồn lực đó quanh một doanh nghiệp để chúng thành năng lực dùng được. Quy mô của họ là bằng chứng rằng nguồn lực khổng lồ đã tồn tại. Cardbey không đặt cược rằng những nguồn lực đó biến mất, mà vào việc thay đổi thị trường liên tục tạo ra cơ hội mới để kết hợp chúng.",
    },
    links: [
      {
        href: "#missing-layer",
        label: {
          en: "See the Cardbey USP →",
          vi: "Xem USP của Cardbey →",
        },
      },
      {
        href: "#start-one",
        label: {
          en: "Explore the capability model →",
          vi: "Khám phá mô hình năng lực →",
        },
      },
    ],
  },
  {
    id: "opportunity",
    n: 2,
    category: "thesis",
    question: {
      en: "If large platforms have more capital, technology and distribution, where is Cardbey's opportunity?",
      vi: "Nếu các nền tảng lớn có nhiều vốn, công nghệ và khả năng phân phối hơn, cơ hội của Cardbey nằm ở đâu?",
    },
    answer: {
      en: "Markets continuously move. Technology, costs, behaviour, access to intelligence, infrastructure and distribution all change. Capabilities that were previously expensive or specialised become available to smaller participants. Those shifts can make existing businesses more capable and make new economic activity possible. Cardbey’s opportunity is not simply more features. It is to recognise movement, coordinate relevant resources, act, observe, learn and repeat. Australia and Vietnam are where Cardbey intends to TEST this with real economic activity: VALIDATING, not captured opportunity.",
      vi: "Thị trường liên tục chuyển động. Công nghệ, chi phí, hành vi, khả năng tiếp cận trí tuệ, hạ tầng và phân phối đều thay đổi. Năng lực từng đắt đỏ hoặc chuyên biệt trở nên khả dụng với bên tham gia nhỏ hơn. Những thay đổi đó có thể làm doanh nghiệp hiện tại có năng lực hơn và làm hoạt động kinh tế mới khả thi. Cơ hội của Cardbey không chỉ là thêm tính năng, mà là nhận ra chuyển động, điều phối nguồn lực phù hợp, hành động, quan sát, học và lặp lại. Úc và Việt Nam là nơi Cardbey dự định kiểm chứng với hoạt động kinh tế thật: ĐANG KIỂM CHỨNG, chưa phải cơ hội đã nắm.",
    },
    links: [
      {
        href: "#commercial-validation",
        label: {
          en: "See Phase 1 →",
          vi: "Xem Giai đoạn 1 →",
        },
      },
      {
        href: "#start-one",
        label: {
          en: "Explore the capability model →",
          vi: "Khám phá mô hình năng lực →",
        },
      },
    ],
  },
  {
    id: "what-is",
    n: 3,
    category: "thesis",
    question: {
      en: "What exactly is Cardbey?",
      vi: "Cardbey chính xác là gì?",
    },
    answer: {
      en: "Cardbey is developing a Resource Aggregation Accelerator. Technology — AI, storefront, devices, automation, APIs — is the enabling layer, not the investment thesis. The thesis is coordinating distributed resources around economic activity so they become usable capability. That activity may start from an existing business, a new venture, a product, a capability or an opportunity. Phase 1 may focus heavily on SMEs, but the thesis is not limited to businesses that already exist. Cardbey is not simply another AI, ecommerce or store-creation platform. EXISTS: the first operating path, shown in the explorer. Broader reusable coordination remains DIRECTION. Cardbey does not currently found legal entities, finance startups, or operate globally by default.",
      vi: "Cardbey đang phát triển Nền Tảng Tổng Hợp Gia Tốc Nguồn Lực. Công nghệ — AI, storefront, thiết bị, tự động hóa, API — là lớp hỗ trợ, không phải luận điểm đầu tư. Luận điểm là điều phối nguồn lực phân tán quanh hoạt động kinh tế để chúng thành năng lực dùng được. Hoạt động đó có thể bắt đầu từ doanh nghiệp hiện tại, nhà khởi nghiệp, sản phẩm, năng lực hoặc cơ hội. Giai đoạn 1 có thể tập trung nhiều vào SME, nhưng luận điểm không giới hạn ở doanh nghiệp đã tồn tại. Cardbey không chỉ là nền tảng AI, thương mại điện tử hay tạo cửa hàng. ĐÃ CÓ: đường vận hành đầu, hiện trên phần khám phá. Điều phối tái sử dụng rộng hơn vẫn là ĐỊNH HƯỚNG. Cardbey hiện không tự lập pháp nhân, tài trợ startup, hay vận hành toàn cầu theo mặc định.",
    },
    links: [
      {
        href: "#start-one",
        label: {
          en: "Explore the capability model →",
          vi: "Khám phá mô hình năng lực →",
        },
      },
    ],
  },
  {
    id: "problem",
    n: 4,
    category: "thesis",
    question: {
      en: "What problem is Cardbey solving that existing platforms do not solve?",
      vi: "Cardbey giải bài toán nào mà các nền tảng hiện có chưa giải?",
    },
    answer: {
      en: "The problem is not a lack of software. Access is not the same as capability. Existing businesses and new ventures can increasingly reach intelligence, infrastructure and markets. What they often lack is a way to discover, connect, coordinate and reuse those fragments toward a useful economic outcome. Cardbey is targeting that coordination gap. The question is how the right resources work together, in the right context — whether that means adding capability to an operating business or assembling what a new one needs to become operational.",
      vi: "Vấn đề không phải thiếu phần mềm. Tiếp cận không phải là năng lực. Doanh nghiệp hiện tại và nhà khởi nghiệp ngày càng tiếp cận được trí tuệ, hạ tầng và thị trường. Điều họ thường thiếu là cách khám phá, kết nối, điều phối và tái sử dụng những mảnh đó hướng tới kết quả kinh tế hữu ích. Cardbey nhắm khoảng trống điều phối đó. Câu hỏi là làm sao nguồn lực đúng làm việc cùng nhau, trong cùng một ngữ cảnh — dù đó là thêm năng lực cho doanh nghiệp đang vận hành hay tập hợp những gì nhà khởi nghiệp cần để bắt đầu vận hành.",
    },
    links: [
      {
        href: "#paradox",
        label: { en: "See the thesis →", vi: "Xem luận điểm →" },
      },
    ],
  },
  {
    id: "why-now",
    n: 5,
    category: "thesis",
    question: {
      en: "Why now?",
      vi: "Vì sao là bây giờ?",
    },
    answer: {
      en: "The thesis is testable now because several conditions have converged: AI capability, lower software and content-creation cost, global digital infrastructure, existing platforms, and a growing ability for individuals and small organisations to access resources once reserved for larger firms. That can make existing businesses more capable and make new businesses easier to form. None of this guarantees Cardbey’s success. It is the condition that makes a coordination layer worth testing at seed stage — rather than waiting for a later cycle.",
      vi: "Luận điểm có thể kiểm chứng ngay vì vài điều kiện đã hội tụ: năng lực AI, chi phí tạo phần mềm và nội dung giảm, hạ tầng số toàn cầu, nền tảng sẵn có, cùng khả năng ngày càng lớn để cá nhân và tổ chức nhỏ tiếp cận nguồn lực từng dành cho tổ chức lớn hơn. Điều đó có thể làm doanh nghiệp hiện tại có năng lực hơn và làm hoạt động mới dễ hình thành hơn. Không điều nào bảo đảm Cardbey thành công. Đó là điều kiện khiến lớp điều phối đáng được kiểm ở giai đoạn seed — thay vì chờ chu kỳ sau.",
    },
    links: [
      {
        href: "#expansion",
        label: { en: "See expansion strategy →", vi: "Xem chiến lược mở rộng →" },
      },
    ],
  },
  {
    id: "incumbents",
    n: 6,
    category: "thesis",
    question: {
      en: "Why can't Shopify, Amazon, Meta, Google or an AI company simply build this?",
      vi: "Vì sao Shopify, Amazon, Meta, Google hoặc một công ty AI không thể tự xây điều này?",
    },
    answer: {
      en: "Large companies can build many of the individual capabilities Cardbey uses. That is not the core investment question. They naturally optimise around their own marketplace, commerce stack, ads, cloud or social graph. Cardbey is not trying to replace them; those remain valuable resources. The question is whether Cardbey can develop a repeatable ability to recognise economic needs, assemble distributed resources around them, execute in context, learn from the activity and reuse that learning. Individual components may be reproducible. Coordination capability and accumulated context MAY become harder to reproduce if Cardbey achieves repeated real-world use. That is a HYPOTHESIS — not an established moat, unique AI, first-mover advantage or existing switching cost.",
      vi: "Công ty lớn có thể xây nhiều năng lực đơn lẻ mà Cardbey dùng. Đó không phải câu hỏi đầu tư cốt lõi. Họ tự nhiên tối ưu quanh marketplace, stack thương mại, quảng cáo, cloud hoặc đồ thị xã hội của chính họ. Cardbey không nhằm thay thế họ; những thứ đó vẫn là nguồn lực giá trị. Câu hỏi là Cardbey có phát triển được năng lực lặp lại: nhận ra nhu cầu kinh tế, tập hợp nguồn lực phân tán quanh chúng, thực thi trong ngữ cảnh, học từ hoạt động và tái sử dụng điều đã học. Thành phần đơn lẻ có thể sao chép được. Năng lực điều phối và ngữ cảnh tích lũy CÓ THỂ khó tái tạo hơn nếu Cardbey đạt được sử dụng thực tế lặp lại. Đó là GIẢ THUYẾT — không phải moat đã lập, AI độc quyền, lợi thế người đi trước hay chi phí chuyển đổi hiện có.",
    },
    links: [
      {
        href: "#missing-layer",
        label: { en: "See how Cardbey sits in between →", vi: "Xem Cardbey đứng ở giữa thế nào →" },
      },
    ],
  },
  {
    id: "moat",
    n: 7,
    category: "defensibility",
    question: {
      en: "What is Cardbey's defensible advantage or moat?",
      vi: "Lợi thế phòng thủ hay moat của Cardbey là gì?",
    },
    answer: {
      en: "At this stage, opportunity recognition and execution are more immediate questions than claiming a moat. Cardbey does not have a proven moat. Generic AI is not one, and neither is the USP label. Moat protects captured value. Opportunity creates the possibility of value in the first place. Useful speed — see, coordinate, act, learn, repeat — is an execution property, not a moat. The HYPOTHESIS is that if Cardbey repeatedly recognises opportunities, coordinates resources, acts, observes evidence and reuses what was learned, then context, relationships, evidence and reusable capability may accumulate. THAT accumulation may contribute to future defensibility. It is TO PROVE. Seed tests whether useful, paid, repeatable activity starts — not whether a moat already exists.",
      vi: "Ở giai đoạn này, nhận ra cơ hội và thực thi là câu hỏi trực tiếp hơn việc tuyên bố moat. Cardbey không có moat đã chứng minh. AI chung không phải moat, và nhãn USP cũng không. Moat bảo vệ giá trị đã tạo được. Cơ hội tạo ra khả năng để giá trị xuất hiện ngay từ đầu. Tốc độ hữu ích — thấy, điều phối, hành động, học, lặp lại — là thuộc tính thực thi, không phải moat. GIẢ THUYẾT là nếu Cardbey lặp lại việc nhận ra cơ hội, điều phối nguồn lực, hành động, quan sát bằng chứng và tái sử dụng điều đã học, thì ngữ cảnh, quan hệ, bằng chứng và năng lực tái sử dụng có thể tích lũy. Sự tích lũy ĐÓ có thể góp phần vào lợi thế phòng thủ sau này. Điều đó CẦN CHỨNG MINH. Seed kiểm xem hoạt động kinh tế hữu ích, trả phí, lặp lại có bắt đầu không — không phải moat đã tồn tại.",
    },
  },
  {
    id: "first-market",
    n: 8,
    category: "defensibility",
    question: {
      en: "Who is Cardbey initially for, and how will it acquire businesses?",
      vi: "Cardbey ban đầu dành cho ai, và sẽ thu hút doanh nghiệp thế nào?",
    },
    answer: {
      en: "Phase 1 begins with existing SMEs in Australia and Vietnam, plus selected new economic activity where operationally ready. Existing SMEs remain the primary operating unit because they let Cardbey test capability aggregation against observable activity. Selected new-activity journeys are VALIDATING — not proven formation economics, and not every idea needs to become a conventional company. Can Cardbey add capability that existing businesses will activate, pay, return and expand? Can it reduce the distance from idea or opportunity to operational economic activity? Existing relationships may support distribution. Public acquisition metrics are not established here.",
      vi: "Giai đoạn 1 bắt đầu với SME hiện tại tại Úc và Việt Nam, kèm một số hoạt động kinh tế mới khi sẵn sàng vận hành. SME hiện tại vẫn là đơn vị vận hành chính vì giúp Cardbey kiểm tổng hợp năng lực trên hoạt động quan sát được. Các hành trình hoạt động mới được chọn vẫn ĐANG KIỂM CHỨNG — chưa phải kinh tế hình thành đã chứng minh, và không phải mọi ý tưởng đều cần trở thành công ty thông thường. Cardbey có thêm được năng lực để doanh nghiệp hiện tại kích hoạt, trả phí, quay lại và mở rộng? Có rút ngắn được khoảng cách từ ý tưởng hoặc cơ hội tới hoạt động kinh tế vận hành được? Quan hệ hiện có có thể hỗ trợ phân phối. Chỉ số thu hút công khai chưa được thiết lập ở đây.",
    },
    links: [
      {
        href: "#commercial-validation",
        label: { en: "See Phase 1 →", vi: "Xem Giai đoạn 1 →" },
      },
      {
        href: "#expansion",
        label: { en: "If it works →", vi: "Nếu hiệu lực →" },
      },
    ],
  },
  {
    id: "make-money",
    n: 9,
    category: "defensibility",
    question: {
      en: "How does Cardbey make money, and where does it capture value if existing platforms already hold the storefront?",
      vi: "Cardbey kiếm tiền thế nào, và nắm giá trị ở đâu nếu nền tảng hiện có đã giữ storefront?",
    },
    answer: {
      en: "Monetisation is modular — not a proven P&L and not one SaaS subscription. Possible Cardbey economics on this page: NOW / INITIAL — implementation and services where actually offered. TO VALIDATE — software/AI, media/advertising, transactions, distribution and attribution. FUTURE — marketplace, advertising network, logistics, financial and agent layers, DIRECTION until activity justifies them. Mix and pricing are not published. Value is captured only if economic activity keeps operating through the coordination layer, even when the storefront or device belongs elsewhere.",
      vi: "Kiếm tiền theo module — không phải P&L đã chứng minh và không phải một gói SaaS. Kinh tế Cardbey có thể có trên trang này: NGAY / BAN ĐẦU — triển khai và dịch vụ nơi thực sự được cung cấp. CẦN KIỂM — phần mềm/AI, truyền thông/quảng cáo, giao dịch, phân phối và ghi nhận nguồn. TƯƠNG LAI — marketplace, mạng quảng cáo, logistics, tài chính và agent, ĐỊNH HƯỚNG cho đến khi hoạt động biện minh. Cơ cấu và giá không được công bố. Giá trị chỉ được nắm nếu hoạt động kinh tế tiếp tục vận hành qua lớp điều phối, ngay cả khi storefront hay thiết bị thuộc nơi khác.",
    },
    links: [
      {
        href: "#operating-layer",
        label: {
          en: "See where value can enter →",
          vi: "Xem giá trị có thể vào đâu →",
        },
      },
      {
        href: "#diligence",
        label: {
          en: "View product evidence →",
          vi: "Xem bằng chứng sản phẩm →",
        },
      },
    ],
  },
  {
    id: "what-exists",
    n: 10,
    category: "evidence",
    question: {
      en: "What has actually been built today versus what remains vision?",
      vi: "Điều gì đã được xây hôm nay, và điều gì vẫn là tầm nhìn?",
    },
    answer: {
      en: "Work has already begun. EXISTS: storefront presence and business import/context around one business. EXISTS / VALIDATING: promotion and displays. VALIDATING: Performer, products/services, orders/commerce, partner/attribution. DIRECTION: packaging/physical surfaces, live engagement, delivery/fulfilment, then network and finance. These are functions of one business context, not separate Cardbey companies. Implementation is not proof of production reliability or paying demand. See the operating layer on the Practice chapter.",
      vi: "Công việc đã bắt đầu. ĐÃ CÓ: hiện diện storefront và nhập/ngữ cảnh doanh nghiệp quanh một doanh nghiệp. ĐÃ CÓ / ĐANG KIỂM CHỨNG: quảng bá và màn hình. ĐANG KIỂM CHỨNG: Performer, sản phẩm/dịch vụ, đơn hàng/thương mại, đối tác/ghi nhận nguồn. ĐỊNH HƯỚNG: bao bì/bề mặt vật lý, tương tác livestream, giao hàng/hoàn tất đơn, rồi mạng và tài chính. Đây là chức năng của một ngữ cảnh doanh nghiệp, không phải các công ty Cardbey tách rời. Triển khai không chứng minh độ tin cậy vận hành hay nhu cầu trả phí. Xem lớp vận hành.",
    },
    links: [
      {
        href: "#operating-layer",
        label: {
          en: "See the operating capabilities →",
          vi: "Xem năng lực vận hành →",
        },
      },
      {
        href: "#diligence",
        label: {
          en: "View product & execution evidence →",
          vi: "Xem bằng chứng sản phẩm & thực thi →",
        },
      },
    ],
  },
  {
    id: "market-evidence",
    n: 11,
    category: "evidence",
    question: {
      en: "What evidence is there that businesses will use or pay for Cardbey?",
      vi: "Có bằng chứng nào cho thấy doanh nghiệp sẽ dùng hoặc trả tiền cho Cardbey?",
    },
    answer: {
      en: "Public paying-customer, CAC, LTV and revenue metrics are not established on this page. Cardbey is still at seed: the investment case is not based on mature operating metrics. What exists today is product and execution evidence, a defined Australia/Vietnam pathway, and a commercial model still being validated. Seed-stage market participation is intended to test whether businesses use Cardbey, whether they pay, and whether that repeats. Until that evidence is earned, demand remains a thesis, not a result.",
      vi: "Chỉ số khách hàng trả phí, CAC, LTV và doanh thu công khai chưa được thiết lập trên trang này. Cardbey vẫn ở giai đoạn seed: luận điểm đầu tư không dựa trên chỉ số vận hành chín. Điều tồn tại hôm nay là bằng chứng sản phẩm và thực thi, đường đi Úc/Việt Nam đã xác định, và mô hình thương mại vẫn đang được kiểm chứng. Tham gia thị trường giai đoạn seed nhằm kiểm xem doanh nghiệp có dùng Cardbey, có trả tiền, và điều đó có lặp lại. Cho đến khi bằng chứng đó được tạo ra, nhu cầu vẫn là luận điểm, chưa phải kết quả.",
    },
    links: [
      {
        href: "#growth-capital",
        label: {
          en: "See Growth & Capital Journey →",
          vi: "Xem Hành trình Tăng trưởng & Vốn →",
        },
      },
    ],
  },
  {
    id: "why-capital",
    n: 12,
    category: "evidence",
    question: {
      en: "Why does Cardbey need investment if AI makes software much cheaper to build?",
      vi: "Vì sao Cardbey cần vốn nếu AI làm phần mềm rẻ hơn nhiều để xây?",
    },
    answer: {
      en: "AI can make building cheaper. It does not make distribution, trust, adoption or market learning free. Software cost is only one part of creating a market. Seed capital is intended to accelerate market entry, business acquisition, distribution, operational capability, commercial experimentation, partnerships, infrastructure and evidence generation — not to rebuild what the world has already built. The scarce work at this stage is putting capability in front of real businesses and measuring what happens.",
      vi: "AI có thể làm việc xây rẻ hơn. Nó không làm phân phối, niềm tin, chấp nhận hay học thị trường trở nên miễn phí. Chi phí phần mềm chỉ là một phần của việc tạo thị trường. Vốn seed nhằm tăng tốc vào thị trường, thu hút doanh nghiệp, phân phối, năng lực vận hành, thử nghiệm thương mại, đối tác, hạ tầng và tạo bằng chứng — không phải xây lại những gì thế giới đã xây. Việc khan hiếm ở giai đoạn này là đưa năng lực trước doanh nghiệp thật và đo điều gì xảy ra.",
    },
    links: [
      {
        href: "#growth-capital",
        label: {
          en: "See Growth & Capital Journey →",
          vi: "Xem Hành trình Tăng trưởng & Vốn →",
        },
      },
    ],
  },
  {
    id: "use-of-seed",
    n: 13,
    category: "evidence",
    question: {
      en: "What will seed capital actually accomplish?",
      vi: "Vốn seed thực sự nhằm hoàn thành điều gì?",
    },
    answer: {
      en: "The proposed seed is A$3 million, intended to fund Phase 1: a 12-month Australia and Vietnam market-activation and validation program. That capital is meant to buy four operating quarters — consolidate + launch, activate, expand + validate, then concentrate — so Cardbey can decide Scale / Change / Stop. Use of funds is strategic rather than a published pie chart: technology consolidation, regional operations, SME activation, and repeatable distribution. A later financing round would be considered only if evidence supports a larger deployment. Proposed SAFE terms appear on the investment section and remain subject to legal documentation. Time passing is not itself a success metric.",
      vi: "Seed đề xuất là A$3 triệu, nhằm tài trợ Giai đoạn 1: chương trình kích hoạt và kiểm chứng thị trường 12 tháng tại Úc và Việt Nam. Khoản vốn đó để mua bốn quý vận hành — củng cố + mở, kích hoạt, mở rộng + kiểm chứng, rồi tập trung — để Cardbey quyết định Nhân rộng / Đổi hướng / Dừng. Cách dùng vốn mang tính chiến lược, không phải biểu đồ chi phí công khai: củng cố công nghệ, vận hành khu vực, kích hoạt SME, và phân phối có thể lặp lại. Vòng tài trợ sau chỉ được xem xét nếu bằng chứng hỗ trợ triển khai lớn hơn. Điều khoản SAFE đề xuất nằm ở phần đầu tư và vẫn phụ thuộc hồ sơ pháp lý. Thời gian trôi qua tự nó không phải chỉ số thành công.",
    },
    links: [
      {
        href: "#growth-capital",
        label: {
          en: "See Growth & Capital Journey →",
          vi: "Xem Hành trình Tăng trưởng & Vốn →",
        },
      },
      {
        href: "#resources",
        label: {
          en: "View investor materials →",
          vi: "Xem tài liệu nhà đầu tư →",
        },
      },
    ],
  },
  {
    id: "global-scale",
    n: 14,
    category: "scale",
    question: {
      en: "How can Cardbey grow from its initial Australia/Vietnam pathways into a global platform?",
      vi: "Cardbey có thể lớn từ đường đi Úc/Việt Nam ban đầu thành nền tảng toàn cầu thế nào?",
    },
    answer: {
      en: "Australia and Vietnam are initial pathways, not the total addressable market. The architecture is intended to be progressively reusable across languages, business categories, regions, channels, partners and infrastructure. Later expansion into broader SME categories, Southeast Asia and international networks is a staged plan subject to learning and capital — not a global promise. Global scale is not proven. It becomes credible only if the first pathways produce repeatable acquisition, activation and economic activity.",
      vi: "Úc và Việt Nam là đường đi ban đầu, không phải toàn bộ thị trường có thể phục vụ. Kiến trúc được dự kiến tái sử dụng dần qua ngôn ngữ, nhóm ngành, vùng, kênh, đối tác và hạ tầng. Mở rộng sau vào nhóm SME rộng hơn, Đông Nam Á và mạng quốc tế là kế hoạch theo giai đoạn, phụ thuộc học hỏi và vốn — không phải lời hứa toàn cầu. Quy mô toàn cầu chưa được chứng minh. Nó chỉ trở nên đáng tin nếu đường đi đầu tạo ra thu hút, kích hoạt và hoạt động kinh tế lặp lại được.",
    },
    links: [
      {
        href: "#expansion",
        label: { en: "See expansion strategy →", vi: "Xem chiến lược mở rộng →" },
      },
    ],
  },
  {
    id: "risk-return",
    n: 15,
    category: "scale",
    question: {
      en: "What are the major risks, and how could an early investor ultimately generate a return?",
      vi: "Rủi ro chính là gì, và nhà đầu tư sớm có thể nhận lợi nhuận như thế nào?",
    },
    answer: {
      en: "Major risks include adoption, execution, competition, technology change, business-model validation, capital availability, regulatory complexity and timing. Large platforms can build overlapping capabilities. An early investor benefits only if Cardbey creates substantially more economic value over time and a valid liquidity event eventually exists — follow-on financing, a strategic transaction, a public listing, or a substantial independent company. None of those outcomes is promised. There is no guaranteed return, valuation increase, financing, IPO or acquisition.",
      vi: "Rủi ro chính gồm chấp nhận, thực thi, cạnh tranh, thay đổi công nghệ, kiểm chứng mô hình kinh doanh, khả năng có vốn, phức tạp pháp lý và thời điểm. Nền tảng lớn có thể xây năng lực chồng lấn. Nhà đầu tư sớm chỉ hưởng lợi nếu Cardbey tạo ra nhiều giá trị kinh tế hơn theo thời gian và cuối cùng có sự kiện thanh khoản hợp lệ — tài trợ follow-on, giao dịch chiến lược, niêm yết, hoặc công ty độc lập đáng kể. Không kết quả nào được hứa. Không có lợi nhuận, tăng định giá, tài trợ, IPO hay mua lại được bảo đảm.",
    },
    links: [
      {
        href: "#resources",
        label: {
          en: "View investor materials →",
          vi: "Xem tài liệu nhà đầu tư →",
        },
      },
      {
        href: "#contact",
        label: { en: "Talk to the Founder →", vi: "Nói chuyện với Founder →" },
        contact: true,
      },
    ],
  },
];

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
