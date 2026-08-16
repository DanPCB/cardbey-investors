import type { SectionContent } from "../schemas/types";

/** Phase 2 narrative — core / supporting / investor hierarchy */
export const investorSections: SectionContent[] = [
  {
    id: "hero",
    order: 1,
    tier: "core",
    eyebrow: { en: "Cardbey Investor Platform", vi: "Nền tảng Nhà đầu tư Cardbey" },
    title: {
      en: "The AI Operating System for Small Businesses",
      vi: "Hệ Điều Hành AI cho Doanh Nghiệp Nhỏ",
    },
    introduction: {
      en: "Cardbey is building an integrated platform that helps small businesses create their digital presence, operate through AI-assisted workflows, connect physical and digital commerce, and grow across markets.",
      vi: "Cardbey đang xây dựng nền tảng tích hợp giúp doanh nghiệp nhỏ tạo hiện diện số, vận hành qua quy trình có hỗ trợ AI, kết nối thương mại vật lý và kỹ thuật số, và tăng trưởng đa thị trường.",
    },
    body: [
      {
        en: "From business information to a structured, operating business system.",
        vi: "Từ thông tin doanh nghiệp đến một hệ thống doanh nghiệp có cấu trúc và biết vận hành.",
      },
    ],
    diagramId: "hero-os",
    ctas: [
      {
        id: "cta-explore",
        label: { en: "Explore Cardbey", vi: "Khám phá Cardbey" },
        action: "scroll",
        targetSectionId: "answer",
        variant: "primary",
      },
      {
        id: "cta-built",
        label: { en: "View What We Have Built", vi: "Xem những gì đã xây" },
        action: "scroll",
        targetSectionId: "what-built",
        variant: "secondary",
      },
      {
        id: "cta-materials",
        label: { en: "Request Investor Materials", vi: "Yêu cầu tài liệu nhà đầu tư" },
        action: "scroll",
        targetSectionId: "resources",
        variant: "accent",
      },
    ],
    status: "draft",
  },
  {
    id: "problem",
    order: 2,
    tier: "core",
    eyebrow: { en: "The operating gap", vi: "Khoảng trống vận hành" },
    title: {
      en: "Small businesses are expected to operate like enterprises — on fragmented tools",
      vi: "Doanh nghiệp nhỏ bị đòi hỏi vận hành như doanh nghiệp lớn — trên công cụ rời rạc",
    },
    introduction: {
      en: "Owners often manage business identity, websites and storefronts, products and services, social media, customer communication, marketing, payments, delivery, physical signage, records and AI tools across disconnected systems.",
      vi: "Chủ doanh nghiệp thường phải quản lý định danh, website và storefront, sản phẩm và dịch vụ, mạng xã hội, giao tiếp khách hàng, marketing, thanh toán, giao nhận, biển hiệu vật lý, hồ sơ và công cụ AI trên các hệ thống không kết nối.",
    },
    bullets: [
      {
        en: "Work is duplicated and business information becomes inconsistent.",
        vi: "Công việc bị trùng lặp và thông tin doanh nghiệp trở nên không nhất quán.",
      },
      {
        en: "Physical promotion rarely connects cleanly to digital action and lasting business memory.",
        vi: "Quảng bá vật lý ít khi kết nối sạch với hành động số và bộ nhớ doanh nghiệp bền vững.",
      },
      {
        en: "AI tools stay isolated from the operating context that would make them useful day to day.",
        vi: "Công cụ AI vẫn tách rời khỏi ngữ cảnh vận hành vốn làm chúng hữu ích mỗi ngày.",
      },
    ],
    body: [
      {
        en: "Cardbey’s opportunity is to provide a shared business operating layer — not another disconnected point solution.",
        vi: "Cơ hội của Cardbey là cung cấp một lớp vận hành doanh nghiệp dùng chung — không phải thêm một giải pháp rời.",
      },
    ],
    status: "draft",
  },
  {
    id: "why-now",
    order: 3,
    tier: "core",
    eyebrow: { en: "Why now", vi: "Vì sao bây giờ" },
    title: {
      en: "Several shifts are converging at once",
      vi: "Nhiều thay đổi đang hội tụ cùng lúc",
    },
    introduction: {
      en: "The timing is strategic — without relying on unverified market statistics.",
      vi: "Thời điểm mang tính chiến lược — không dựa vào thống kê thị trường chưa xác minh.",
    },
    bullets: [
      {
        en: "Generative AI makes business setup and content creation more accessible.",
        vi: "AI tạo sinh giúp thiết lập doanh nghiệp và tạo nội dung dễ tiếp cận hơn.",
      },
      {
        en: "AI agents can increasingly support structured workflows when permissions and readiness checks exist.",
        vi: "Agent AI ngày càng có thể hỗ trợ quy trình có cấu trúc khi có phân quyền và kiểm tra sẵn sàng.",
      },
      {
        en: "Social commerce and conversational discovery are changing how customers find and buy.",
        vi: "Thương mại xã hội và khám phá qua hội thoại đang đổi cách khách hàng tìm và mua.",
      },
      {
        en: "QR codes and smart displays connect physical surfaces with digital transactions.",
        vi: "Mã QR và màn hình thông minh kết nối bề mặt vật lý với giao dịch số.",
      },
      {
        en: "More small businesses need multilingual and cross-border capability.",
        vi: "Ngày càng nhiều doanh nghiệp nhỏ cần năng lực đa ngôn ngữ và xuyên biên giới.",
      },
      {
        en: "Fragmented point solutions increase demand for a shared intelligence layer.",
        vi: "Các giải pháp rời càng làm tăng nhu cầu về lớp trí tuệ dùng chung.",
      },
    ],
    status: "draft",
  },
  {
    id: "answer",
    order: 4,
    tier: "core",
    eyebrow: { en: "Cardbey’s answer", vi: "Câu trả lời của Cardbey" },
    title: {
      en: "An AI operating system for small businesses",
      vi: "Một hệ điều hành AI cho doanh nghiệp nhỏ",
    },
    introduction: {
      en: "Cardbey helps a business move from unstructured information to a structured digital presence, AI-assisted operations, connected commerce and long-term growth.",
      vi: "Cardbey giúp doanh nghiệp đi từ thông tin chưa cấu trúc đến hiện diện số có cấu trúc, vận hành có hỗ trợ AI, thương mại kết nối và tăng trưởng dài hạn.",
    },
    body: [
      {
        en: "Business information → AI understanding → structured business knowledge → digital business creation → AI-assisted operation → physical and digital distribution → growth and attribution → continuous learning → cross-border participation.",
        vi: "Thông tin doanh nghiệp → hiểu bằng AI → tri thức doanh nghiệp có cấu trúc → tạo lập doanh nghiệp số → vận hành có hỗ trợ AI → phân phối vật lý và số → tăng trưởng và ghi nhận nguồn → học liên tục → tham gia xuyên biên giới.",
      },
    ],
    status: "draft",
  },
  {
    id: "how-it-works",
    order: 5,
    tier: "core",
    eyebrow: { en: "How Cardbey works", vi: "Cách Cardbey vận hành" },
    title: {
      en: "One continuous operating loop",
      vi: "Một vòng vận hành liên tục",
    },
    introduction: {
      en: "Capabilities reinforce a single system — not a pile of unrelated AI tools.",
      vi: "Các năng lực củng cố một hệ thống duy nhất — không phải tập hợp công cụ AI rời rạc.",
    },
    diagramId: "lifecycle",
    status: "draft",
  },
  {
    id: "architecture",
    order: 6,
    tier: "core",
    eyebrow: { en: "The Cardbey platform", vi: "Nền tảng Cardbey" },
    title: {
      en: "Layers of a business operating system",
      vi: "Các lớp của một hệ điều hành doanh nghiệp",
    },
    introduction: {
      en: "Experience, agents, business intelligence, commerce, growth, devices and infrastructure are designed to share context.",
      vi: "Trải nghiệm, agent, trí tuệ doanh nghiệp, thương mại, tăng trưởng, thiết bị và hạ tầng được thiết kế để chia sẻ ngữ cảnh.",
    },
    diagramId: "platform-layers",
    status: "draft",
  },
  {
    id: "what-built",
    order: 7,
    tier: "core",
    eyebrow: { en: "What exists today", vi: "Những gì đã có hôm nay" },
    title: {
      en: "What Cardbey has built",
      vi: "Những gì Cardbey đã xây",
    },
    introduction: {
      en: "Evidence-led product progress, organised by operating layer. Maturity labels separate development, pilot, planned and vision — code existence alone is not treated as commercial launch.",
      vi: "Tiến độ sản phẩm dựa trên bằng chứng, sắp xếp theo lớp vận hành. Nhãn mức độ chín tách biệt đang phát triển, thử nghiệm, kế hoạch và tầm nhìn — có mã nguồn không đồng nghĩa đã thương mại hóa.",
    },
    relatedProofIds: [
      "proof-device-runtime",
      "proof-storefront-api",
      "proof-performer",
      "proof-signage-screens",
      "proof-rewards",
    ],
    status: "draft",
    disclosure: {
      en: "Public proof focuses on product and execution evidence. Customer, distribution and commercial traction require founder confirmation.",
      vi: "Bằng chứng công khai tập trung vào sản phẩm và thực thi. Traction khách hàng, phân phối và thương mại cần founder xác nhận.",
    },
  },
  {
    id: "ai-workforce",
    order: 8,
    tier: "supporting",
    eyebrow: { en: "AI business workforce", vi: "Lực lượng AI" },
    title: {
      en: "Permissioned assistants, not unsupervised automation",
      vi: "Trợ lý có phân quyền, không phải tự động hóa thiếu kiểm soát",
    },
    introduction: {
      en: "Role-based agents may assist with administration, CRM, marketing, customer communication, operations, growth and localization — inside boundaries set by the business owner.",
      vi: "Agent theo vai trò có thể hỗ trợ quản trị, CRM, marketing, giao tiếp khách hàng, vận hành, tăng trưởng và bản địa hóa — trong phạm vi chủ doanh nghiệp đặt ra.",
    },
    diagramId: "ai-workforce",
    relatedCapabilityIds: ["cap-ai-performer", "cap-readiness-preflight", "cap-admin-agent", "cap-crm-agent"],
    status: "draft",
  },
  {
    id: "business-graph",
    order: 9,
    tier: "supporting",
    eyebrow: { en: "Business knowledge", vi: "Tri thức doanh nghiệp" },
    title: {
      en: "Business knowledge and memory",
      vi: "Tri thức và bộ nhớ doanh nghiệp",
    },
    introduction: {
      en: "Cardbey is developing durable preferences, relationships and reusable context. A fully autonomous universal business graph is not claimed.",
      vi: "Cardbey đang phát triển tùy chọn, quan hệ và ngữ cảnh tái sử dụng bền vững. Không tuyên bố đồ thị doanh nghiệp phổ quát hoàn toàn tự trị.",
    },
    relatedCapabilityIds: ["cap-business-memory", "cap-business-graph"],
    status: "draft",
  },
  {
    id: "import-kernel",
    order: 10,
    tier: "supporting",
    eyebrow: { en: "Business Import Kernel", vi: "Business Import Kernel" },
    title: {
      en: "From raw business information to usable structure",
      vi: "Từ thông tin thô đến cấu trúc sử dụng được",
    },
    introduction: {
      en: "Business Import Kernel is a structured system for acquiring, interpreting and preparing business information — including extraction, identity, reconciliation, projection and runtime pathways.",
      vi: "Business Import Kernel là hệ thống có cấu trúc để thu thập, diễn giải và chuẩn bị thông tin doanh nghiệp — gồm trích xuất, định danh, đối soát, chiếu dữ liệu và runtime.",
    },
    relatedCapabilityIds: ["cap-business-import", "cap-structured-drafts"],
    status: "draft",
  },
  {
    id: "physical-digital",
    order: 11,
    tier: "supporting",
    eyebrow: { en: "Physical × digital", vi: "Vật lý × kỹ thuật số" },
    title: {
      en: "Physical-to-digital commerce",
      vi: "Thương mại kết nối vật lý và kỹ thuật số",
    },
    introduction: {
      en: "Signage, printing, packaging, vehicle graphics, QR codes and smart displays can connect physical presence with digital interaction, offers and lasting business context.",
      vi: "Biển hiệu, in ấn, bao bì, dán xe, mã QR và màn hình thông minh có thể kết nối hiện diện vật lý với tương tác số, ưu đãi và ngữ cảnh doanh nghiệp bền vững.",
    },
    diagramId: "physical-digital",
    status: "draft",
  },
  {
    id: "smart-display",
    order: 12,
    tier: "supporting",
    eyebrow: { en: "Smart displays", vi: "Màn hình thông minh" },
    title: {
      en: "Smart display platform",
      vi: "Nền tảng màn hình thông minh",
    },
    introduction: {
      en: "Multi-platform direction includes Android player, LG webOS application, shared runtime, pairing, heartbeat, playlist synchronization, scheduling, diagnostics, media recovery and planned Tizen support. Physically validated deployments require confirmation.",
      vi: "Hướng đa nền tảng gồm trình phát Android, ứng dụng LG webOS, runtime dùng chung, ghép nối, heartbeat, đồng bộ playlist, lập lịch, chẩn đoán, phục hồi media và hỗ trợ Tizen dự kiến. Triển khai đã xác thực vật lý cần xác nhận.",
    },
    relatedCapabilityIds: [
      "cap-smart-display-runtime",
      "cap-android-player",
      "cap-webos",
      "cap-tizen",
      "cap-device-pairing",
      "cap-playlist",
      "cap-signage-scheduling",
      "cap-diagnostics",
    ],
    status: "draft",
  },
  {
    id: "growth-engine",
    order: 13,
    tier: "supporting",
    eyebrow: { en: "Growth Engine", vi: "Growth Engine" },
    title: {
      en: "Growth and attribution infrastructure",
      vi: "Hạ tầng tăng trưởng và ghi nhận nguồn",
    },
    introduction: {
      en: "Growth Engine is infrastructure for attribution, partner participation and value allocation. Current application includes Partner Capital Recovery and Partner Pass concepts — not MLM, affiliate spam or guaranteed recovery.",
      vi: "Growth Engine là hạ tầng ghi nhận nguồn, tham gia đối tác và phân bổ giá trị. Ứng dụng hiện tại gồm các khái niệm Partner Capital Recovery và Partner Pass — không phải MLM, spam affiliate hay bảo đảm thu hồi.",
    },
    diagramId: "growth-network",
    relatedCapabilityIds: ["cap-growth-engine", "cap-partner-pass", "cap-partner-attribution"],
    status: "draft",
  },
  {
    id: "language-intelligence",
    order: 14,
    tier: "supporting",
    eyebrow: { en: "Language Intelligence", vi: "Language Intelligence" },
    title: {
      en: "AI-assisted localization as infrastructure",
      vi: "Bản địa hóa có hỗ trợ AI như hạ tầng",
    },
    introduction: {
      en: "Language Intelligence covers conversation and storefront localization, durable language preferences, cultural and tone adaptation, and glossary learning. This is AI-assisted localization — not certified translation unless separately applicable.",
      vi: "Language Intelligence gồm bản địa hóa hội thoại và storefront, tùy chọn ngôn ngữ bền vững, thích ứng văn hóa và giọng điệu, cùng học thuật ngữ. Đây là bản địa hóa có hỗ trợ AI — không phải dịch thuật chứng nhận trừ khi áp dụng riêng.",
    },
    diagramId: "language-intelligence",
    relatedCapabilityIds: [
      "cap-storefront-localization",
      "cap-conversation-localization",
      "cap-cultural-tone",
      "cap-glossary-learning",
    ],
    status: "draft",
  },
  {
    id: "traction",
    order: 15,
    tier: "investor",
    eyebrow: { en: "Proof", vi: "Bằng chứng" },
    title: {
      en: "Product and execution proof",
      vi: "Bằng chứng sản phẩm và thực thi",
    },
    introduction: {
      en: "Traction is separated into product, execution, market, distribution and commercial proof. Only product and execution proof from repository evidence is shown publicly here.",
      vi: "Traction được tách thành bằng chứng sản phẩm, thực thi, thị trường, phân phối và thương mại. Chỉ bằng chứng sản phẩm và thực thi từ mã nguồn được hiển thị công khai tại đây.",
    },
    relatedProofIds: [
      "proof-device-runtime",
      "proof-device-pairing",
      "proof-playlist",
      "proof-storefront-api",
      "proof-performer",
      "proof-signage-screens",
      "proof-rewards",
    ],
    relatedMetricIds: ["metric-device-runtime-modules"],
    bullets: [
      {
        en: "Market proof: [TRACTION METRIC REQUIRED]",
        vi: "Bằng chứng thị trường: [CẦN CHỈ SỐ TRACTION]",
      },
      {
        en: "Distribution proof: [DEVICE / CHANNEL EVIDENCE REQUIRED]",
        vi: "Bằng chứng phân phối: [CẦN BẰNG CHỨNG THIẾT BỊ / KÊNH]",
      },
      {
        en: "Commercial proof: [REVENUE / AGREEMENT EVIDENCE REQUIRED]",
        vi: "Bằng chứng thương mại: [CẦN BẰNG CHỨNG DOANH THU / HỢP ĐỒNG]",
      },
    ],
    status: "draft",
    disclosure: {
      en: "Placeholder market, distribution and commercial lines are development markers only and are hidden from production public rendering for metrics.",
      vi: "Các dòng chỗ trống về thị trường, phân phối và thương mại chỉ là dấu mốc phát triển và bị ẩn khỏi hiển thị công khai production cho metrics.",
    },
  },
  {
    id: "market-entry",
    order: 16,
    tier: "investor",
    eyebrow: { en: "Initial market wedge", vi: "Phân khúc đầu vào" },
    title: {
      en: "Start where digital presence and physical infrastructure already meet",
      vi: "Bắt đầu nơi hiện diện số và hạ tầng vật lý đã giao nhau",
    },
    introduction: {
      en: "Cardbey does not claim to attack every SME segment at once. The initial wedge focuses on small businesses that already need both digital presence and physical business infrastructure.",
      vi: "Cardbey không tuyên bố tấn công mọi phân khúc SME cùng lúc. Phân khúc đầu vào tập trung vào doanh nghiệp nhỏ đã cần cả hiện diện số và hạ tầng kinh doanh vật lý.",
    },
    bullets: [
      {
        en: "Service businesses, hospitality and local retail.",
        vi: "Doanh nghiệp dịch vụ, F&B/khách sạn và bán lẻ địa phương.",
      },
      {
        en: "Businesses using signage, packaging or displays.",
        vi: "Doanh nghiệp dùng biển hiệu, bao bì hoặc màn hình.",
      },
      {
        en: "Social-commerce-led merchants and multilingual / cross-border sellers.",
        vi: "Người bán theo thương mại xã hội và doanh nghiệp đa ngôn ngữ / xuyên biên giới.",
      },
      {
        en: "Existing physical-business relationships may support distribution — partner counts require founder verification before publication.",
        vi: "Quan hệ kinh doanh vật lý hiện có có thể hỗ trợ phân phối — số lượng đối tác cần founder xác minh trước khi công bố.",
      },
    ],
    status: "draft",
  },
  {
    id: "expansion",
    order: 17,
    tier: "investor",
    eyebrow: { en: "Expansion strategy", vi: "Chiến lược mở rộng" },
    title: {
      en: "Staged expansion — strategy, not achieved traction",
      vi: "Mở rộng theo giai đoạn — chiến lược, không phải traction đã đạt",
    },
    introduction: {
      en: "Expansion is presented as a working plan subject to learning and capital — not a global promise.",
      vi: "Mở rộng được trình bày như kế hoạch làm việc phụ thuộc học hỏi và vốn — không phải lời hứa toàn cầu.",
    },
    bullets: [
      {
        en: "Stage 1 — Validate integrated business-creation and operation with existing relationships in Australia and Vietnamese-linked SME communities.",
        vi: "Giai đoạn 1 — Xác thực mô hình tạo lập và vận hành tích hợp với quan hệ hiện có tại Úc và cộng đồng SME gắn kết Việt Nam.",
      },
      {
        en: "Stage 2 — Expand repeatable workflows across selected SME categories; strengthen AI-assisted administration, commerce and growth.",
        vi: "Giai đoạn 2 — Mở rộng quy trình lặp lại trên các nhóm SME chọn lọc; củng cố quản trị, thương mại và tăng trưởng có hỗ trợ AI.",
      },
      {
        en: "Stage 3 — Extend multilingual and cross-border capability into Southeast Asian markets and international SME networks.",
        vi: "Giai đoạn 3 — Mở rộng năng lực đa ngôn ngữ và xuyên biên giới sang thị trường Đông Nam Á và mạng SME quốc tế.",
      },
      {
        en: "Stage 4 — Develop a broader business-agent and distribution ecosystem.",
        vi: "Giai đoạn 4 — Phát triển hệ sinh thái agent doanh nghiệp và phân phối rộng hơn.",
      },
    ],
    status: "draft",
  },
  {
    id: "business-model",
    order: 18,
    tier: "investor",
    eyebrow: { en: "Business model", vi: "Mô hình kinh doanh" },
    title: {
      en: "Modular monetization — labelled by horizon",
      vi: "Kiếm tiền theo module — gắn nhãn theo thời hạn",
    },
    introduction: {
      en: "Framework only. Items are directional unless founder-confirmed for public use. No percentages or revenue contribution claims.",
      vi: "Chỉ là khung. Các mục mang tính định hướng trừ khi founder xác nhận công bố. Không có tỷ trọng hay tuyên bố đóng góp doanh thu.",
    },
    bullets: [
      {
        en: "Current — physical business services, managed implementation and related projects (confirm before treating as active mix).",
        vi: "Hiện tại — dịch vụ kinh doanh vật lý, triển khai có quản lý và dự án liên quan (cần xác nhận trước khi coi là cơ cấu đang chạy).",
      },
      {
        en: "Near-term — software subscriptions, AI usage, device/display services, commerce-related fees.",
        vi: "Gần hạn — đăng ký phần mềm, sử dụng AI, dịch vụ thiết bị/màn hình, phí gắn thương mại.",
      },
      {
        en: "Long-term — agent services, advertising infrastructure, enterprise programs, partner ecosystem, marketplace participation.",
        vi: "Dài hạn — dịch vụ agent, hạ tầng quảng cáo, chương trình doanh nghiệp, hệ sinh thái đối tác, tham gia marketplace.",
      },
    ],
    status: "draft",
    disclosure: {
      en: "Not all models are active. Pricing and mix require confirmation.",
      vi: "Không phải mọi mô hình đều đang hoạt động. Giá và cơ cấu cần xác nhận.",
    },
  },
  {
    id: "defensibility",
    order: 19,
    tier: "investor",
    eyebrow: { en: "Defensibility", vi: "Lợi thế phòng thủ" },
    title: {
      en: "Compounding platform advantage — not impossibility to copy",
      vi: "Lợi thế nền tảng cộng dồn — không phải không thể sao chép",
    },
    introduction: {
      en: "Defensibility is framed as integration depth and reusable operating context that may strengthen switching costs as usage grows.",
      vi: "Lợi thế phòng thủ được định khung là độ sâu tích hợp và ngữ cảnh vận hành tái sử dụng, có thể tăng chi phí chuyển đổi khi mức sử dụng tăng.",
    },
    bullets: [
      {
        en: "Structured business context — information, preferences, products, operations and relationships become reusable across workflows.",
        vi: "Ngữ cảnh doanh nghiệp có cấu trúc — thông tin, tùy chọn, sản phẩm, vận hành và quan hệ trở nên tái sử dụng xuyên quy trình.",
      },
      {
        en: "Integrated execution — creation, operation, communication, commerce, growth and distribution share one system.",
        vi: "Thực thi tích hợp — tạo lập, vận hành, giao tiếp, thương mại, tăng trưởng và phân phối chung một hệ thống.",
      },
      {
        en: "Physical-to-digital network — signs, packaging, vehicles, displays and QR interactions can connect to digital actions.",
        vi: "Mạng vật lý–số — biển hiệu, bao bì, xe, màn hình và tương tác QR có thể kết nối hành động số.",
      },
      {
        en: "Multi-platform runtime — operational infrastructure across web, mobile and smart-display environments.",
        vi: "Runtime đa nền tảng — hạ tầng vận hành trên web, mobile và màn hình thông minh.",
      },
      {
        en: "Workflow-specific AI — agents and orchestration around roles, permissions, readiness and task boundaries.",
        vi: "AI theo quy trình — agent và điều phối quanh vai trò, phân quyền, sẵn sàng và ranh giới tác vụ.",
      },
      {
        en: "Growth and attribution infrastructure — reusable mechanisms for recognizing and allocating network value.",
        vi: "Hạ tầng tăng trưởng và ghi nhận nguồn — cơ chế tái sử dụng để ghi nhận và phân bổ giá trị mạng.",
      },
      {
        en: "Language and cultural context — ongoing preferences that support market adaptation.",
        vi: "Ngữ cảnh ngôn ngữ và văn hóa — tùy chọn liên tục hỗ trợ thích ứng thị trường.",
      },
    ],
    status: "draft",
  },
  {
    id: "competition",
    order: 20,
    tier: "investor",
    eyebrow: { en: "Alternatives", vi: "Lựa chọn thay thế" },
    title: {
      en: "Competitive alternatives by category",
      vi: "Các lựa chọn cạnh tranh theo nhóm",
    },
    introduction: {
      en: "Cardbey’s differentiation is integration around a persistent business operating context — not an unsupported claim of superiority over named vendors.",
      vi: "Điểm khác biệt của Cardbey là tích hợp quanh ngữ cảnh vận hành doanh nghiệp bền vững — không phải tuyên bố vượt trội không có tiêu chí so với các nhà cung cấp cụ thể.",
    },
    bullets: [
      {
        en: "Website and store builders; general AI assistants; CRM and business software.",
        vi: "Công cụ dựng website/cửa hàng; trợ lý AI tổng quát; CRM và phần mềm doanh nghiệp.",
      },
      {
        en: "Marketing platforms; delivery and payment providers; digital-signage tools.",
        vi: "Nền tảng marketing; nhà cung cấp giao nhận và thanh toán; công cụ biển hiệu số.",
      },
      {
        en: "Agencies and managed services that assemble the stack manually.",
        vi: "Agency và dịch vụ quản lý lắp ráp stack thủ công.",
      },
    ],
    status: "draft",
  },
  {
    id: "roadmap",
    order: 21,
    tier: "investor",
    eyebrow: { en: "Roadmap", vi: "Lộ trình" },
    title: {
      en: "Capability maturity roadmap — not calendar promises",
      vi: "Lộ trình theo mức độ chín năng lực — không phải lời hứa lịch",
    },
    introduction: {
      en: "Sequencing by foundation, assisted operation, connected network and long-term direction. No IPO or acquisition targets.",
      vi: "Thứ tự theo nền tảng, vận hành có hỗ trợ, mạng kết nối và hướng dài hạn. Không có mục tiêu IPO hay mua bán.",
    },
    status: "draft",
  },
  {
    id: "team",
    order: 22,
    tier: "investor",
    eyebrow: { en: "Team", vi: "Đội ngũ" },
    title: {
      en: "Who is building Cardbey",
      vi: "Ai đang xây dựng Cardbey",
    },
    introduction: {
      en: "Named profiles publish only when identity, role and biography are confirmed and approved.",
      vi: "Hồ sơ có tên chỉ công bố khi danh tính, vai trò và tiểu sử đã xác nhận và được duyệt.",
    },
    status: "draft",
  },
  {
    id: "funding",
    order: 23,
    tier: "investor",
    eyebrow: { en: "Investor discussions", vi: "Trao đổi nhà đầu tư" },
    title: {
      en: "Investor Discussions",
      vi: "Trao đổi với nhà đầu tư",
    },
    introduction: {
      en: "Cardbey is preparing its next stage of product validation, commercial deployment and platform development. Detailed funding information is available through direct investor discussion.",
      vi: "Cardbey đang chuẩn bị giai đoạn tiếp theo về xác thực sản phẩm, triển khai thương mại và phát triển nền tảng. Chi tiết gọi vốn có qua trao đổi trực tiếp với nhà đầu tư.",
    },
    bullets: [
      {
        en: "Request investor materials or contact the founder. Numerical round terms are not published here.",
        vi: "Yêu cầu tài liệu nhà đầu tư hoặc liên hệ founder. Điều khoản số học của vòng gọi vốn không công bố tại đây.",
      },
    ],
    ctas: [
      {
        id: "cta-fund-materials",
        label: { en: "Request Investor Materials", vi: "Yêu cầu tài liệu nhà đầu tư" },
        action: "scroll",
        targetSectionId: "resources",
        variant: "primary",
      },
      {
        id: "cta-fund-contact",
        label: { en: "Contact the Founder", vi: "Liên hệ Founder" },
        action: "contact",
        variant: "secondary",
      },
    ],
    status: "draft",
    disclosure: {
      en: "This page does not constitute an offer of securities where such an offer would be unlawful. No guarantee of returns.",
      vi: "Trang này không cấu thành lời chào bán chứng khoán nơi việc chào bán là bất hợp pháp. Không bảo đảm lợi nhuận.",
    },
  },
  {
    id: "resources",
    order: 24,
    tier: "investor",
    eyebrow: { en: "Resources", vi: "Tài nguyên" },
    title: {
      en: "Investor resources",
      vi: "Tài nguyên nhà đầu tư",
    },
    introduction: {
      en: "Public packs may be listed when available. Confidential materials and data-room items require a request — no fake authentication in this phase.",
      vi: "Các pack công khai có thể liệt kê khi sẵn có. Tài liệu bảo mật và data room cần yêu cầu — chưa có xác thực giả trong giai đoạn này.",
    },
    relatedResourceIds: [
      "res-pack-en",
      "res-pack-vi",
      "res-request-access",
      "res-contact-founder",
      "res-data-room-request",
    ],
    status: "draft",
  },
  {
    id: "contact",
    order: 25,
    tier: "investor",
    eyebrow: { en: "Contact", vi: "Liên hệ" },
    title: {
      en: "Talk with the founding team",
      vi: "Trao đổi với đội ngũ sáng lập",
    },
    introduction: {
      en: "Request materials, clarify product status, or open a conversation about partnership and investment fit.",
      vi: "Yêu cầu tài liệu, làm rõ trạng thái sản phẩm, hoặc mở trao đổi về phù hợp đối tác và đầu tư.",
    },
    ctas: [
      {
        id: "cta-contact",
        label: { en: "Contact founder", vi: "Liên hệ founder" },
        action: "contact",
        variant: "primary",
      },
    ],
    status: "draft",
  },
  {
    id: "closing",
    order: 26,
    tier: "core",
    eyebrow: { en: "Closing vision", vi: "Tầm nhìn kết" },
    title: {
      en: "From business information to an operating business system",
      vi: "Từ thông tin doanh nghiệp đến hệ thống doanh nghiệp biết vận hành",
    },
    introduction: {
      en: "Cardbey’s direction is an AI operating system that helps small businesses create, operate, grow and participate across languages and channels — with clear maturity and honest evidence.",
      vi: "Hướng đi của Cardbey là hệ điều hành AI giúp doanh nghiệp nhỏ tạo lập, vận hành, tăng trưởng và tham gia đa ngôn ngữ, đa kênh — với mức độ chín rõ ràng và bằng chứng trung thực.",
    },
    status: "draft",
  },
  {
    id: "footer",
    order: 27,
    tier: "investor",
    title: { en: "Legal", vi: "Pháp lý" },
    introduction: {
      en: "SIGNSCATER PTY LTD · ABN 50 685 406 697 · ACN 685 406 697",
      vi: "SIGNSCATER PTY LTD · ABN 50 685 406 697 · ACN 685 406 697",
    },
    status: "draft",
  },
];
