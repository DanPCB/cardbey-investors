import type { DiagramDefinition } from "../shared/diagrams";

/** V3 opportunity-led surface diagrams + retained deeper diagrams */
export const investorV3Diagrams: DiagramDefinition[] = [
  {
    id: "v3-paradox",
    title: {
      en: "Both sides of the equation",
      vi: "Cả hai phía phương trình",
    },
    explanation: {
      en: "Existing businesses can access more capability. New economic activity can become possible. Neither happens automatically.",
      vi: "Doanh nghiệp hiện tại có thể tiếp cận thêm năng lực. Hoạt động kinh tế mới có thể trở nên khả thi. Không điều nào tự xảy ra.",
    },
    accessibleDescription: {
      en: "Two pathways: existing business to more capability; person, idea or opportunity to new business.",
      vi: "Hai đường: doanh nghiệp hiện tại tới thêm năng lực; cá nhân, ý tưởng hoặc cơ hội tới hoạt động kinh doanh mới.",
    },
    mode: "hero",
    heroColumns: [
      {
        id: "existing",
        title: { en: "Existing business", vi: "Doanh nghiệp hiện tại" },
        items: [
          { en: "Capabilities once reserved for larger organisations become more reachable", vi: "Năng lực từng dành cho tổ chức lớn trở nên dễ tiếp cận hơn" },
          { en: "Access still does not coordinate those resources into an outcome", vi: "Tiếp cận vẫn không tự điều phối nguồn lực thành kết quả" },
        ],
      },
      {
        id: "new",
        title: { en: "Person / idea / opportunity", vi: "Cá nhân / ý tưởng / cơ hội" },
        items: [
          { en: "Individuals and small teams can assemble more resources around an idea", vi: "Cá nhân và nhóm nhỏ có thể tập hợp thêm nguồn lực quanh một ý tưởng" },
          { en: "A new business still needs those resources to work together", vi: "Hoạt động mới vẫn cần những nguồn lực đó làm việc cùng nhau" },
        ],
      },
    ],
  },
  {
    id: "v3-human-models",
    title: {
      en: "Old path vs emerging possibility",
      vi: "Đường cũ và khả năng mới",
    },
    explanation: {
      en: "Employment remains a valid path. The emerging possibility is that economic capability can also be assembled around an existing business or a new one — if resources can be coordinated.",
      vi: "Việc làm vẫn là đường hợp lệ. Khả năng mới là năng lực kinh tế cũng có thể được lắp quanh doanh nghiệp hiện tại hoặc hoạt động mới — nếu nguồn lực được điều phối.",
    },
    accessibleDescription: {
      en: "Two columns: familiar path via job and organisation; emerging path via assembling distributed resources around economic activity.",
      vi: "Hai cột: đường quen qua việc làm và tổ chức; đường mới qua lắp nguồn lực phân tán quanh hoạt động kinh tế.",
    },
    mode: "hero",
    heroColumns: [
      {
        id: "old",
        title: { en: "Familiar path", vi: "Đường quen thuộc" },
        items: [
          { en: "Individual → Job → Organization", vi: "Cá nhân → Việc làm → Tổ chức" },
          { en: "Tools · Knowledge · Infrastructure · Market · Capital", vi: "Công cụ · Tri thức · Hạ tầng · Thị trường · Vốn" },
          { en: "→ Economic capability", vi: "→ Năng lực kinh tế" },
        ],
      },
      {
        id: "new",
        title: { en: "Emerging possibility", vi: "Khả năng đang mở" },
        items: [
          { en: "Individual + AI + Global market", vi: "Cá nhân + AI + Thị trường toàn cầu" },
          { en: "+ Infrastructure + Capital", vi: "+ Hạ tầng + Vốn" },
          { en: "→ More independent economic capability", vi: "→ Năng lực kinh tế độc lập hơn" },
        ],
      },
    ],
  },
  {
    id: "v3-missing-layer",
    title: {
      en: "Access is not capability",
      vi: "Tiếp cận không phải năng lực",
    },
    explanation: {
      en: "Resources exist. Usable structure around economic activity often does not.",
      vi: "Nguồn lực tồn tại. Cấu trúc hữu dụng quanh hoạt động kinh tế thường chưa có.",
    },
    accessibleDescription: {
      en: "Resources available versus missing usable structure, then the opportunity of connecting people and resources.",
      vi: "Nguồn lực sẵn có so với cấu trúc hữu dụng còn thiếu, rồi cơ hội kết nối người và nguồn lực.",
    },
    mode: "hero",
    heroColumns: [
      {
        id: "have",
        title: { en: "Already there", vi: "Đã có sẵn" },
        items: [
          { en: "People · Intelligence · Market", vi: "Con người · Trí tuệ · Thị trường" },
          { en: "Infrastructure · Capital", vi: "Hạ tầng · Vốn" },
        ],
      },
      {
        id: "gap",
        title: { en: "Often missing", vi: "Thường còn thiếu" },
        items: [
          { en: "Usable business structure", vi: "Cấu trúc kinh doanh hữu dụng" },
          { en: "Practical coordination around the person", vi: "Phối hợp thực tế quanh người" },
        ],
      },
      {
        id: "opp",
        title: { en: "The opportunity", vi: "Cơ hội" },
        items: [
          { en: "Connect resources to people", vi: "Kết nối nguồn lực với con người" },
          { en: "Turn access into capability", vi: "Biến tiếp cận thành năng lực" },
        ],
      },
    ],
  },
  {
    id: "v3-layer-between",
    title: {
      en: "The layer in between",
      vi: "Lớp ở giữa",
    },
    explanation: {
      en: "Global resources flow through Cardbey to the individual or business, producing practical economic capability.",
      vi: "Nguồn lực toàn cầu đi qua Cardbey tới cá nhân hoặc doanh nghiệp, tạo năng lực kinh tế thực tế.",
    },
    accessibleDescription: {
      en: "Flow: global resources into Cardbey, then individual or business, then economic capability and create operate sell grow.",
      vi: "Luồng: nguồn lực toàn cầu vào Cardbey, rồi cá nhân hoặc doanh nghiệp, rồi năng lực kinh tế và tạo vận hành bán tăng trưởng.",
    },
    mode: "flow",
    nodes: [
      { id: "resources", label: { en: "Global resources", vi: "Nguồn lực toàn cầu" } },
      { id: "cardbey", label: { en: "Cardbey", vi: "Cardbey" } },
      { id: "person", label: { en: "Individual / Business", vi: "Cá nhân / Doanh nghiệp" } },
      { id: "capability", label: { en: "Economic capability", vi: "Năng lực kinh tế" } },
      { id: "actions", label: { en: "Create · Operate · Sell · Grow", vi: "Tạo · Vận hành · Bán · Tăng trưởng" } },
    ],
  },
  {
    id: "v3-start-one",
    title: {
      en: "Start with one business",
      vi: "Bắt đầu với một doanh nghiệp",
    },
    explanation: {
      en: "Person or business enters through the Cardbey App, gains practical capability, then expands.",
      vi: "Người hoặc doanh nghiệp vào qua Cardbey App, có năng lực thực tế, rồi mở rộng.",
    },
    accessibleDescription: {
      en: "Flow from person or business through Cardbey App to create operate promote sell, then more capability and connections.",
      vi: "Luồng từ người hoặc doanh nghiệp qua Cardbey App tới tạo vận hành quảng bá bán, rồi thêm năng lực và kết nối.",
    },
    mode: "flow",
    nodes: [
      { id: "person", label: { en: "Person / Business", vi: "Người / Doanh nghiệp" } },
      { id: "app", label: { en: "Cardbey App", vi: "Cardbey App" } },
      { id: "do", label: { en: "Create · Operate · Promote · Sell", vi: "Tạo · Vận hành · Quảng bá · Bán" } },
      { id: "more", label: { en: "More capability", vi: "Thêm năng lực" } },
      { id: "network", label: { en: "More businesses & connections", vi: "Thêm DN & kết nối" } },
    ],
  },
  {
    id: "v3-economic-expansion",
    title: {
      en: "Follow the economic activity",
      vi: "Theo hoạt động kinh tế",
    },
    explanation: {
      en: "Each later layer becomes useful because earlier layers create relationships and activity.",
      vi: "Mỗi lớp sau trở nên hữu dụng vì lớp trước tạo quan hệ và hoạt động.",
    },
    accessibleDescription: {
      en: "Layers from business capability through digital network and logistics to financial capability.",
      vi: "Các lớp từ năng lực kinh doanh qua mạng số và logistics tới năng lực tài chính.",
    },
    mode: "layers",
    layers: [
      {
        id: "app",
        name: { en: "Business capability — CURRENT FOCUS", vi: "Năng lực kinh doanh — TRỌNG TÂM HIỆN TẠI" },
        detail: { en: "Cardbey App", vi: "Cardbey App" },
      },
      {
        id: "network",
        name: { en: "Digital network — FUTURE", vi: "Mạng số — TƯƠNG LAI" },
        detail: { en: "Connections between participants", vi: "Kết nối giữa các bên" },
      },
      {
        id: "logistics",
        name: { en: "Logistics — FUTURE", vi: "Logistics — TƯƠNG LAI" },
        detail: { en: "Physical economic activity", vi: "Hoạt động kinh tế vật lý" },
      },
      {
        id: "finance",
        name: { en: "Financial capability — FUTURE", vi: "Năng lực tài chính — TƯƠNG LAI" },
        detail: { en: "Capital around established activity", vi: "Vốn quanh hoạt động đã hình thành" },
      },
    ],
  },
  {
    id: "v3-why-now",
    title: {
      en: "Feasibility unlocked",
      vi: "Tính khả thi được mở",
    },
    explanation: {
      en: "AI, cloud, platforms and automation made an earlier vision newly practical — alongside accumulated Cardbey work.",
      vi: "AI, đám mây, nền tảng và tự động hóa làm tầm nhìn sớm trở nên thực tế — cùng công việc Cardbey đã tích lũy.",
    },
    accessibleDescription: {
      en: "Five enablers: AI, cloud and APIs, global platforms, automation, and Cardbey accumulated work.",
      vi: "Năm yếu tố kích hoạt: AI, đám mây và API, nền tảng toàn cầu, tự động hóa, và công việc Cardbey tích lũy.",
    },
    mode: "layers",
    layers: [
      {
        id: "ai",
        name: { en: "AI", vi: "AI" },
        detail: { en: "More accessible intelligence", vi: "Trí tuệ dễ tiếp cận hơn" },
      },
      {
        id: "cloud",
        name: { en: "Cloud + APIs", vi: "Đám mây + API" },
        detail: { en: "Reusable infrastructure", vi: "Hạ tầng tái sử dụng" },
      },
      {
        id: "platforms",
        name: { en: "Global platforms", vi: "Nền tảng toàn cầu" },
        detail: { en: "Market access", vi: "Tiếp cận thị trường" },
      },
      {
        id: "automation",
        name: { en: "Automation", vi: "Tự động hóa" },
        detail: { en: "Greater execution capacity", vi: "Năng lực thực thi lớn hơn" },
      },
      {
        id: "foundation",
        name: { en: "Cardbey’s accumulated work", vi: "Công việc tích lũy của Cardbey" },
        detail: { en: "A starting foundation", vi: "Nền tảng khởi đầu" },
      },
    ],
  },
  {
    id: "v3-seed-meet-market",
    title: {
      en: "Vision meets more resources",
      vi: "Tầm nhìn gặp thêm nguồn lực",
    },
    explanation: {
      en: "Cardbey today plus seed capital meets the real market. The outcome remains open — that uncertainty is part of seed investing.",
      vi: "Cardbey hôm nay cộng vốn seed gặp thị trường thật. Kết quả vẫn mở — bất định đó là một phần đầu tư seed.",
    },
    accessibleDescription: {
      en: "Flow from Cardbey today and seed capital into the real market, ending in an open question.",
      vi: "Luồng từ Cardbey hôm nay và vốn seed vào thị trường thật, kết thúc bằng câu hỏi mở.",
    },
    mode: "flow",
    nodes: [
      { id: "today", label: { en: "Cardbey today", vi: "Cardbey hôm nay" } },
      { id: "seed", label: { en: "Seed capital & partners", vi: "Vốn seed & đối tác" } },
      { id: "market", label: { en: "Real market", vi: "Thị trường thật" } },
      { id: "open", label: { en: "How large can it become?", vi: "Có thể lớn đến đâu?" } },
    ],
  },
  {
    id: "v3-hero-progression",
    title: {
      en: "Capability progression",
      vi: "Tiến triển năng lực",
    },
    explanation: {
      en: "Start with the Cardbey App. Expand through digital networks, commerce, logistics and financial capabilities as the business grows — later layers remain future options.",
      vi: "Bắt đầu với Cardbey App. Mở rộng qua mạng số, thương mại, logistics và năng lực tài chính khi DN lớn lên — lớp sau vẫn là lựa chọn tương lai.",
    },
    accessibleDescription: {
      en: "Sequence: Cardbey App, digital network, commerce, logistics, financial capability.",
      vi: "Trình tự: Cardbey App, mạng số, thương mại, logistics, năng lực tài chính.",
    },
    mode: "layers",
    layers: [
      {
        id: "app",
        name: { en: "Cardbey App — CURRENT FOCUS", vi: "Cardbey App — TRỌNG TÂM HIỆN TẠI" },
        detail: {
          en: "Create, operate, promote and grow the first digital business relationship",
          vi: "Tạo, vận hành, quảng bá và tăng trưởng quan hệ DN số đầu tiên",
        },
      },
      {
        id: "network",
        name: { en: "Digital network — FUTURE", vi: "Mạng số — TƯƠNG LAI" },
        detail: {
          en: "Connections between structured businesses, partners and customers",
          vi: "Kết nối giữa DN có cấu trúc, đối tác và khách hàng",
        },
      },
      {
        id: "commerce",
        name: { en: "Commerce & distribution — VALIDATING / FUTURE", vi: "Thương mại & phân phối — ĐANG KIỂM CHỨNG / TƯƠNG LAI" },
        detail: {
          en: "Activity where validated — not assumed as current revenue",
          vi: "Hoạt động khi đã kiểm chứng — không giả định là doanh thu hiện tại",
        },
      },
      {
        id: "logistics",
        name: { en: "Logistics — FUTURE", vi: "Logistics — TƯƠNG LAI" },
        detail: {
          en: "Intended after structured commerce and relationships exist",
          vi: "Dự kiến sau khi thương mại và quan hệ có cấu trúc tồn tại",
        },
      },
      {
        id: "finance",
        name: { en: "Financial capability — FUTURE", vi: "Năng lực tài chính — TƯƠNG LAI" },
        detail: {
          en: "Directional — attaches to real business structure and activity",
          vi: "Định hướng — gắn vào cấu trúc và hoạt động DN thật",
        },
      },
    ],
  },
  {
    id: "v3-ai-economics",
    title: {
      en: "Before vs now — delivery economics",
      vi: "Trước và nay — kinh tế giao hàng",
    },
    explanation: {
      en: "High human coordination cost versus AI, APIs, cloud and global platforms coordinated by Cardbey. Structural argument only.",
      vi: "Chi phí phối hợp người cao so với AI, API, đám mây và nền tảng toàn cầu do Cardbey điều phối. Chỉ luận điểm cấu trúc.",
    },
    accessibleDescription: {
      en: "Two columns: before — design, development, marketing, content, operations, integration, support with high coordination cost; now — AI, APIs, cloud, global platforms, Cardbey orchestration toward faster execution and reusable capability.",
      vi: "Hai cột: trước — thiết kế, phát triển, marketing, nội dung, vận hành, tích hợp, hỗ trợ với chi phí phối hợp cao; nay — AI, API, đám mây, nền tảng toàn cầu, điều phối Cardbey hướng thực thi nhanh và năng lực tái sử dụng.",
    },
    mode: "hero",
    heroColumns: [
      {
        id: "before",
        title: { en: "Before", vi: "Trước đây" },
        items: [
          { en: "Design · Development · Marketing", vi: "Thiết kế · Phát triển · Marketing" },
          { en: "Content · Operations · Integration · Support", vi: "Nội dung · Vận hành · Tích hợp · Hỗ trợ" },
          { en: "High human coordination cost", vi: "Chi phí phối hợp người cao" },
        ],
      },
      {
        id: "now",
        title: { en: "Now", vi: "Bây giờ" },
        items: [
          { en: "AI + APIs + Cloud + Global platforms", vi: "AI + API + Đám mây + Nền tảng toàn cầu" },
          { en: "Cardbey orchestration", vi: "Điều phối Cardbey" },
          { en: "Faster execution · Reusable capability · Serve more businesses", vi: "Thực thi nhanh hơn · Năng lực tái sử dụng · Phục vụ nhiều DN hơn" },
        ],
      },
    ],
  },
  {
    id: "v3-four-resource",
    title: {
      en: "Four resources → business capability",
      vi: "Bốn nguồn lực → năng lực kinh doanh",
    },
    explanation: {
      en: "Market, intelligence, infrastructure and capital coordinated around businesses.",
      vi: "Thị trường, trí tuệ, hạ tầng và vốn được phối hợp quanh doanh nghiệp.",
    },
    accessibleDescription: {
      en: "Market and intelligence above Cardbey; infrastructure and capital below; output is business capability.",
      vi: "Thị trường và trí tuệ phía trên Cardbey; hạ tầng và vốn phía dưới; đầu ra là năng lực DN.",
    },
    mode: "hero",
    heroColumns: [
      {
        id: "top",
        title: { en: "Inputs", vi: "Đầu vào" },
        items: [
          { en: "Market", vi: "Thị trường" },
          { en: "Intelligence", vi: "Trí tuệ" },
          { en: "Infrastructure", vi: "Hạ tầng" },
          { en: "Capital", vi: "Vốn" },
        ],
      },
      {
        id: "center",
        title: { en: "Cardbey", vi: "Cardbey" },
        items: [
          { en: "Coordinate around the business", vi: "Phối hợp quanh doanh nghiệp" },
          { en: "Apply what already exists", vi: "Áp dụng những gì đã có" },
        ],
      },
      {
        id: "out",
        title: { en: "Outcome", vi: "Kết quả" },
        items: [
          { en: "Business capability", vi: "Năng lực kinh doanh" },
          { en: "Create · Operate · Promote · Grow", vi: "Tạo · Vận hành · Quảng bá · Tăng trưởng" },
        ],
      },
    ],
  },
  {
    id: "v3-world-opening",
    title: {
      en: "The world is opening",
      vi: "Thế giới đang mở ra",
    },
    explanation: {
      en: "Four resources become more accessible. Coordination into practical capability remains scarce.",
      vi: "Bốn nguồn lực ngày càng dễ tiếp cận. Việc phối hợp thành năng lực thực tế vẫn khan hiếm.",
    },
    accessibleDescription: {
      en: "Four nodes — Market, Intelligence, Infrastructure, Capital — converging toward a coordination bottleneck.",
      vi: "Bốn nút — Thị trường, Trí tuệ, Hạ tầng, Vốn — hội tụ về nút thắt phối hợp.",
    },
    mode: "hero",
    heroColumns: [
      {
        id: "abundant",
        title: { en: "Becoming accessible", vi: "Đang dễ tiếp cận" },
        items: [
          { en: "Global market", vi: "Thị trường toàn cầu" },
          { en: "Abundant intelligence", vi: "Trí tuệ dồi dào" },
          { en: "Programmable infrastructure", vi: "Hạ tầng lập trình được" },
          { en: "Connected capital", vi: "Vốn kết nối" },
        ],
      },
      {
        id: "gap",
        title: { en: "Still scarce", vi: "Vẫn khan hiếm" },
        items: [
          { en: "Coordination", vi: "Phối hợp" },
          { en: "Practical application", vi: "Áp dụng thực tế" },
          { en: "Day-to-day capability", vi: "Năng lực hàng ngày" },
        ],
      },
      {
        id: "response",
        title: { en: "Cardbey’s answer", vi: "Câu trả lời của Cardbey" },
        items: [
          { en: "Orchestrate resources", vi: "Điều phối nguồn lực" },
          { en: "Into business capability", vi: "Thành năng lực DN" },
          { en: "Without owning every layer", vi: "Không sở hữu mọi lớp" },
        ],
      },
    ],
  },
  {
    id: "v3-four-pillars",
    title: {
      en: "Four foundations — one reinforcing system",
      vi: "Bốn nền tảng — một hệ thống củng cố lẫn nhau",
    },
    explanation: {
      en: "Market, Intelligence, Infrastructure and Capital amplify each other. They are not four separate products.",
      vi: "Thị trường, Trí tuệ, Hạ tầng và Vốn khuếch đại lẫn nhau. Không phải bốn sản phẩm tách rời.",
    },
    accessibleDescription: {
      en: "Four connected foundations: Market, Intelligence, Infrastructure and Capital.",
      vi: "Bốn nền tảng kết nối: Thị trường, Trí tuệ, Hạ tầng và Vốn.",
    },
    mode: "flow",
    nodes: [
      { id: "market", label: { en: "Market", vi: "Thị trường" } },
      { id: "intelligence", label: { en: "Intelligence", vi: "Trí tuệ" } },
      { id: "infrastructure", label: { en: "Infrastructure", vi: "Hạ tầng" } },
      { id: "capital", label: { en: "Capital", vi: "Vốn" } },
      { id: "capability", label: { en: "Business capability", vi: "Năng lực DN" } },
    ],
  },
  {
    id: "v3-platform-modules",
    title: {
      en: "Platform modules",
      vi: "Các mô-đun nền tảng",
    },
    explanation: {
      en: "Business Operating Module is current. Network, Logistics and Financial Layer are future — each must increase the usefulness of what already exists.",
      vi: "Mô-đun Vận hành là hiện tại. Mạng, Logistics và Lớp Tài chính là tương lai — mỗi cái phải tăng tính hữu dụng của những gì đã có.",
    },
    accessibleDescription: {
      en: "Sequence: Business Operating Module, Digital Network, Logistics, Financial Layer.",
      vi: "Trình tự: Vận hành Doanh nghiệp, Mạng số, Logistics, Lớp Tài chính.",
    },
    mode: "layers",
    layers: [
      {
        id: "ops",
        name: { en: "Business Operating Module", vi: "Mô-đun Vận hành DN" },
        detail: { en: "Current execution focus", vi: "Trọng tâm thực thi hiện tại" },
      },
      {
        id: "network",
        name: { en: "Digital Network", vi: "Mạng số" },
        detail: { en: "Future — requires operable businesses", vi: "Tương lai — cần DN vận hành được" },
      },
      {
        id: "logistics",
        name: { en: "Logistics", vi: "Logistics" },
        detail: { en: "Future — grounded in structured commerce", vi: "Tương lai — dựa trên thương mại có cấu trúc" },
      },
      {
        id: "finance",
        name: { en: "Financial Layer", vi: "Lớp Tài chính" },
        detail: { en: "Future — attaches to real business structure", vi: "Tương lai — gắn vào cấu trúc DN thật" },
      },
    ],
  },
  {
    id: "v3-app-first",
    title: {
      en: "Why the App comes first",
      vi: "Vì sao App đi trước",
    },
    explanation: {
      en: "Structure and digital operability are prerequisites before later modules can amplify a business.",
      vi: "Cấu trúc và khả năng vận hành số là điều kiện tiên quyết trước khi mô-đun sau khuếch đại doanh nghiệp.",
    },
    accessibleDescription: {
      en: "Flow from unstructured business to structured knowledge, operability, then platform readiness.",
      vi: "Luồng từ doanh nghiệp chưa cấu trúc đến tri thức có cấu trúc, vận hành được, rồi sẵn sàng nền tảng.",
    },
    mode: "flow",
    nodes: [
      { id: "unstructured", label: { en: "Unstructured business", vi: "DN chưa cấu trúc" } },
      { id: "structured", label: { en: "Structured knowledge", vi: "Tri thức có cấu trúc" } },
      { id: "operable", label: { en: "Digitally operable", vi: "Vận hành số được" } },
      { id: "ready", label: { en: "Platform-ready", vi: "Sẵn sàng nền tảng" } },
      { id: "later", label: { en: "Later modules", vi: "Mô-đun sau" } },
    ],
  },
  {
    id: "v3-progressive-capability",
    title: {
      en: "How capability compounds",
      vi: "Cách năng lực được cộng dồn",
    },
    explanation: {
      en: "A solved problem builds trust, structure and knowledge — making further platform capability newly valuable. Not a guarantee of outcomes.",
      vi: "Một vấn đề được giải tạo niềm tin, cấu trúc và tri thức — làm năng lực nền tảng tiếp theo trở nên có giá trị. Không bảo đảm kết quả.",
    },
    accessibleDescription: {
      en: "Flow from problem solved through trust, relationship, knowledge, capability, recurring relationship and network readiness.",
      vi: "Luồng từ vấn đề được giải qua niềm tin, quan hệ, tri thức, năng lực, quan hệ định kỳ và sẵn sàng mạng.",
    },
    mode: "flow",
    nodes: [
      { id: "problem", label: { en: "Problem solved", vi: "Vấn đề được giải" } },
      { id: "trust", label: { en: "Trust", vi: "Niềm tin" } },
      { id: "relationship", label: { en: "Relationship", vi: "Quan hệ" } },
      { id: "knowledge", label: { en: "Business knowledge", vi: "Tri thức DN" } },
      { id: "capability", label: { en: "More capability", vi: "Năng lực nhiều hơn" } },
      { id: "recurring", label: { en: "Recurring relationship", vi: "Quan hệ định kỳ" } },
      { id: "network", label: { en: "Network readiness", vi: "Sẵn sàng mạng" } },
    ],
  },
  {
    id: "v3-value-creation",
    title: {
      en: "Value creation inputs",
      vi: "Đầu vào tạo giá trị",
    },
    explanation: {
      en: "Capital, partners, technology and distribution strengthen orchestration capacity — an architectural principle, not a return promise.",
      vi: "Vốn, đối tác, công nghệ và phân phối củng cố năng lực điều phối — nguyên lý kiến trúc, không phải lời hứa lợi nhuận.",
    },
    accessibleDescription: {
      en: "Flow from external inputs through orchestration capacity to business capability and platform relevance.",
      vi: "Luồng từ đầu vào bên ngoài qua năng lực điều phối đến năng lực DN và sự liên quan của nền tảng.",
    },
    mode: "flow",
    nodes: [
      { id: "inputs", label: { en: "External inputs", vi: "Đầu vào ngoài" } },
      { id: "orchestrate", label: { en: "Orchestration capacity", vi: "Năng lực điều phối" } },
      { id: "capability", label: { en: "Business capability", vi: "Năng lực DN" } },
      { id: "relevance", label: { en: "Platform relevance", vi: "Liên quan nền tảng" } },
    ],
  },
  {
    id: "v3-value-system",
    title: {
      en: "Value-creation system",
      vi: "Hệ thống tạo giá trị",
    },
    explanation: {
      en: "Global resources flow through Cardbey into business capability, activity and economic value.",
      vi: "Nguồn lực toàn cầu đi qua Cardbey thành năng lực, hoạt động và giá trị kinh tế.",
    },
    accessibleDescription: {
      en: "Flow: global resources, Cardbey orchestration, business capability, activity, economic value.",
      vi: "Luồng: nguồn lực toàn cầu, điều phối Cardbey, năng lực DN, hoạt động, giá trị kinh tế.",
    },
    mode: "flow",
    nodes: [
      { id: "resources", label: { en: "Global resources", vi: "Nguồn lực toàn cầu" } },
      { id: "aggregate", label: { en: "Aggregate", vi: "Tổng hợp" } },
      { id: "coordinate", label: { en: "Coordinate", vi: "Điều phối" } },
      { id: "apply", label: { en: "Apply", vi: "Áp dụng" } },
      { id: "amplify", label: { en: "Amplify", vi: "Khuếch đại" } },
      { id: "capability", label: { en: "Business capability", vi: "Năng lực DN" } },
      { id: "value", label: { en: "Economic value", vi: "Giá trị kinh tế" } },
    ],
  },
  {
    id: "v3-coordination-gap",
    title: {
      en: "The coordination gap",
      vi: "Khoảng trống phối hợp",
    },
    explanation: {
      en: "Abundant resources meet a coordination gap before becoming practical business capability.",
      vi: "Nguồn lực dư dả gặp khoảng trống phối hợp trước khi thành năng lực kinh doanh thực tế.",
    },
    accessibleDescription: {
      en: "Three stages: abundant resources, coordination gap, business capability.",
      vi: "Ba giai đoạn: nguồn lực dư dả, khoảng trống phối hợp, năng lực DN.",
    },
    mode: "flow",
    nodes: [
      { id: "abundant", label: { en: "Abundant resources", vi: "Nguồn lực dư dả" } },
      { id: "gap", label: { en: "Coordination gap", vi: "Khoảng trống phối hợp" } },
      { id: "capability", label: { en: "Business capability", vi: "Năng lực DN" } },
    ],
  },
  {
    id: "v3-orchestrate-position",
    title: {
      en: "Orchestration position",
      vi: "Vị thế điều phối",
    },
    explanation: {
      en: "Market, intelligence, infrastructure and capital meet at Cardbey; output is business capability.",
      vi: "Thị trường, trí tuệ, hạ tầng và vốn gặp nhau tại Cardbey; đầu ra là năng lực DN.",
    },
    accessibleDescription: {
      en: "Four resource inputs into Cardbey, then business capability.",
      vi: "Bốn đầu vào nguồn lực vào Cardbey, rồi năng lực DN.",
    },
    mode: "hero",
    heroColumns: [
      {
        id: "inputs",
        title: { en: "Resources", vi: "Nguồn lực" },
        items: [
          { en: "Market", vi: "Thị trường" },
          { en: "Intelligence", vi: "Trí tuệ" },
          { en: "Infrastructure", vi: "Hạ tầng" },
          { en: "Capital", vi: "Vốn" },
        ],
      },
      {
        id: "cardbey",
        title: { en: "Cardbey", vi: "Cardbey" },
        items: [
          { en: "Aggregate", vi: "Tổng hợp" },
          { en: "Coordinate", vi: "Điều phối" },
          { en: "Apply", vi: "Áp dụng" },
          { en: "Amplify", vi: "Khuếch đại" },
        ],
      },
      {
        id: "out",
        title: { en: "Outcome", vi: "Kết quả" },
        items: [
          { en: "Business capability", vi: "Năng lực DN" },
          { en: "Operate · communicate", vi: "Vận hành · giao tiếp" },
          { en: "Transact · grow", vi: "Giao dịch · tăng trưởng" },
        ],
      },
    ],
  },
  {
    id: "v3-start-business",
    title: {
      en: "Start with one business",
      vi: "Bắt đầu với một doanh nghiệp",
    },
    explanation: {
      en: "Need → solve → structure → relationship → context → more capability.",
      vi: "Nhu cầu → giải → cấu trúc → quan hệ → ngữ cảnh → thêm năng lực.",
    },
    accessibleDescription: {
      en: "Flow from business need through solve, structure, relationship, context and expanded capability.",
      vi: "Luồng từ nhu cầu DN qua giải, cấu trúc, quan hệ, ngữ cảnh và năng lực mở rộng.",
    },
    mode: "flow",
    nodes: [
      { id: "need", label: { en: "Business need", vi: "Nhu cầu DN" } },
      { id: "solve", label: { en: "First solve", vi: "Giải lần đầu" } },
      { id: "structure", label: { en: "Structured", vi: "Có cấu trúc" } },
      { id: "relationship", label: { en: "Digital relationship", vi: "Quan hệ số" } },
      { id: "context", label: { en: "Context accumulates", vi: "Ngữ cảnh tích lũy" } },
      { id: "more", label: { en: "More capability useful", vi: "Thêm năng lực hữu dụng" } },
    ],
  },
  {
    id: "v3-revenue-ladder",
    title: {
      en: "Revenue layers around one business",
      vi: "Các lớp doanh thu quanh một DN",
    },
    explanation: {
      en: "Entry, recurring, activity, network and future platform economics — classified by maturity.",
      vi: "Đầu vào, định kỳ, hoạt động, mạng và kinh tế nền tảng tương lai — phân loại theo mức chín.",
    },
    accessibleDescription: {
      en: "Ladder from entry revenue through recurring, activity, network to future platform economics.",
      vi: "Thang từ doanh thu đầu vào qua định kỳ, hoạt động, mạng đến kinh tế nền tảng tương lai.",
    },
    mode: "layers",
    layers: [
      {
        id: "entry",
        name: { en: "Entry revenue — CURRENT / VALIDATING", vi: "Doanh thu đầu vào — HIỆN TẠI / ĐANG KIỂM CHỨNG" },
        detail: {
          en: "Project, setup, implementation where offered",
          vi: "Dự án, thiết lập, triển khai khi được cung cấp",
        },
      },
      {
        id: "recurring",
        name: { en: "Recurring — VALIDATING / NEAR TERM", vi: "Định kỳ — ĐANG KIỂM CHỨNG / GẦN HẠN" },
        detail: {
          en: "Software, AI usage, management, devices",
          vi: "Phần mềm, dùng AI, quản lý, thiết bị",
        },
      },
      {
        id: "activity",
        name: { en: "Activity — NEAR TERM / FUTURE", vi: "Hoạt động — GẦN HẠN / TƯƠNG LAI" },
        detail: {
          en: "Commerce, promotion, transactions",
          vi: "Thương mại, khuyến mãi, giao dịch",
        },
      },
      {
        id: "network",
        name: { en: "Network — FUTURE OPTION", vi: "Mạng — LỰA CHỌN TƯƠNG LAI" },
        detail: {
          en: "Partners, distribution, marketplace participation",
          vi: "Đối tác, phân phối, tham gia marketplace",
        },
      },
      {
        id: "platform",
        name: { en: "Platform economics — FUTURE OPTION", vi: "Kinh tế nền tảng — LỰA CHỌN TƯƠNG LAI" },
        detail: {
          en: "Logistics and financial layer options",
          vi: "Lựa chọn logistics và lớp tài chính",
        },
      },
    ],
  },
  {
    id: "v3-relationship-deepen",
    title: {
      en: "Deepening commercial relationship",
      vi: "Làm sâu quan hệ thương mại",
    },
    explanation: {
      en: "Solve → value → trust → understand → add capability → activity → revenue opportunity → deeper relationship.",
      vi: "Giải → giá trị → tin → hiểu → thêm năng lực → hoạt động → cơ hội doanh thu → quan hệ sâu hơn.",
    },
    accessibleDescription: {
      en: "Commercial deepening flow from first solve to deeper relationship and network readiness.",
      vi: "Luồng làm sâu thương mại từ giải lần đầu đến quan hệ sâu hơn và sẵn sàng mạng.",
    },
    mode: "flow",
    nodes: [
      { id: "solve", label: { en: "Solve one problem", vi: "Giải một vấn đề" } },
      { id: "value", label: { en: "Create value", vi: "Tạo giá trị" } },
      { id: "trust", label: { en: "Earn trust", vi: "Tạo niềm tin" } },
      { id: "understand", label: { en: "Understand business", vi: "Hiểu DN" } },
      { id: "add", label: { en: "Add capability", vi: "Thêm năng lực" } },
      { id: "activity", label: { en: "More activity", vi: "Thêm hoạt động" } },
      { id: "deeper", label: { en: "Deeper relationship", vi: "Quan hệ sâu hơn" } },
    ],
  },
  {
    id: "v3-economics-progression",
    title: {
      en: "Cost-structure progression",
      vi: "Tiến triển cấu trúc chi phí",
    },
    explanation: {
      en: "Early service-heavy delivery toward reusable platform and network participation.",
      vi: "Từ giao nặng dịch vụ sớm hướng tới nền tảng tái sử dụng và tham gia mạng.",
    },
    accessibleDescription: {
      en: "Four stages: early, transition, platform, network.",
      vi: "Bốn giai đoạn: sớm, chuyển tiếp, nền tảng, mạng.",
    },
    mode: "layers",
    layers: [
      {
        id: "early",
        name: { en: "Early", vi: "Sớm" },
        detail: {
          en: "Service-heavy · human execution · project revenue",
          vi: "Nặng dịch vụ · thực thi thủ công · doanh thu dự án",
        },
      },
      {
        id: "transition",
        name: { en: "Transition", vi: "Chuyển tiếp" },
        detail: {
          en: "AI-assisted delivery · shared capability · recurring services",
          vi: "Giao có AI · năng lực dùng chung · dịch vụ định kỳ",
        },
      },
      {
        id: "platform",
        name: { en: "Platform", vi: "Nền tảng" },
        detail: {
          en: "Reusable software · automation · many businesses on common capability",
          vi: "Phần mềm tái sử dụng · tự động hóa · nhiều DN trên năng lực chung",
        },
      },
      {
        id: "network",
        name: { en: "Network", vi: "Mạng" },
        detail: {
          en: "Activity between participants · transactions · distribution",
          vi: "Hoạt động giữa các bên · giao dịch · phân phối",
        },
      },
    ],
  },
  {
    id: "v3-growth-dimensions",
    title: {
      en: "Three growth dimensions",
      vi: "Ba chiều tăng trưởng",
    },
    explanation: {
      en: "More businesses × more capability per business × more connections — conceptual, not a valuation formula.",
      vi: "Thêm DN × thêm năng lực mỗi DN × thêm kết nối — khái niệm, không phải công thức định giá.",
    },
    accessibleDescription: {
      en: "Three dimensions: businesses, capability per business, connections between participants.",
      vi: "Ba chiều: doanh nghiệp, năng lực mỗi DN, kết nối giữa các bên.",
    },
    mode: "hero",
    heroColumns: [
      {
        id: "horizontal",
        title: { en: "A · More businesses", vi: "A · Thêm doanh nghiệp" },
        items: [
          { en: "Horizontal growth", vi: "Tăng trưởng ngang" },
          { en: "Acquire and serve", vi: "Thu hút và phục vụ" },
        ],
      },
      {
        id: "vertical",
        title: { en: "B · More capability / business", vi: "B · Thêm năng lực / DN" },
        items: [
          { en: "Vertical growth", vi: "Tăng trưởng dọc" },
          { en: "Deepen each relationship", vi: "Làm sâu mỗi quan hệ" },
        ],
      },
      {
        id: "network",
        title: { en: "C · More connections", vi: "C · Thêm kết nối" },
        items: [
          { en: "Network growth", vi: "Tăng trưởng mạng" },
          { en: "Participants interact", vi: "Các bên tương tác" },
        ],
      },
    ],
  },
  {
    id: "v3-capital-acceleration",
    title: {
      en: "What seed capital is intended to prove",
      vi: "Vốn seed nhằm chứng minh điều gì",
    },
    explanation: {
      en: "Platform capability → customer validation → repeatable commercial model → stronger unit economics → scalable distribution → network opportunity. Next valuation should rest on evidence from this path — not feature volume alone.",
      vi: "Năng lực nền tảng → kiểm chứng khách hàng → mô hình thương mại lặp lại được → đơn vị kinh tế mạnh hơn → phân phối mở rộng được → cơ hội mạng. Định giá tiếp theo nên dựa bằng chứng từ đường này — không chỉ khối lượng tính năng.",
    },
    accessibleDescription: {
      en: "Flow from platform capability through customer validation, repeatable commercial model, unit economics, distribution and network opportunity.",
      vi: "Luồng từ năng lực nền tảng qua kiểm chứng khách hàng, mô hình thương mại lặp lại, đơn vị kinh tế, phân phối và cơ hội mạng.",
    },
    mode: "flow",
    nodes: [
      { id: "capability", label: { en: "Platform capability", vi: "Năng lực nền tảng" } },
      { id: "validation", label: { en: "Customer validation", vi: "Kiểm chứng khách hàng" } },
      { id: "repeatable", label: { en: "Repeatable model", vi: "Mô hình lặp lại được" } },
      { id: "unit", label: { en: "Stronger unit economics", vi: "Đơn vị kinh tế mạnh hơn" } },
      { id: "distribution", label: { en: "Scalable distribution", vi: "Phân phối mở rộng được" } },
      { id: "network", label: { en: "Network opportunity", vi: "Cơ hội mạng" } },
    ],
  },
  {
    id: "v3-seed-assumption-model",
    title: {
      en: "Transparent assumption model",
      vi: "Mô hình giả định tường minh",
    },
    explanation: {
      en: "Potential outcomes from explicit assumptions investors can challenge — not Year 1–3 revenue presented as certainty. Numeric inputs stay in confirmed materials only.",
      vi: "Kết quả tiềm năng từ giả định tường minh mà nhà đầu tư có thể thách thức — không phải doanh thu năm 1–3 trình bày như chắc chắn. Đầu vào số chỉ trong tài liệu đã xác nhận.",
    },
    accessibleDescription: {
      en: "Multiplicative factors: businesses acquired, average initial revenue, recurring capability adoption, additional activity per business, network participation.",
      vi: "Các thừa số nhân: doanh nghiệp thu hút, doanh thu ban đầu trung bình, chấp nhận năng lực định kỳ, hoạt động bổ sung mỗi DN, tham gia mạng.",
    },
    mode: "layers",
    layers: [
      {
        id: "acquired",
        name: { en: "Businesses acquired", vi: "Doanh nghiệp thu hút" },
        detail: {
          en: "Assumption — investor-adjustable",
          vi: "Giả định — nhà đầu tư điều chỉnh được",
        },
      },
      {
        id: "initial",
        name: { en: "× Average initial revenue", vi: "× Doanh thu ban đầu trung bình" },
        detail: {
          en: "Assumption — not a public confirmed figure",
          vi: "Giả định — không phải số công khai đã xác nhận",
        },
      },
      {
        id: "recurring",
        name: { en: "× Recurring capability adoption", vi: "× Chấp nhận năng lực định kỳ" },
        detail: {
          en: "Assumption — thesis under validation",
          vi: "Giả định — luận điểm đang kiểm chứng",
        },
      },
      {
        id: "activity",
        name: { en: "× Additional activity per business", vi: "× Hoạt động bổ sung mỗi DN" },
        detail: {
          en: "Assumption — where validated over time",
          vi: "Giả định — khi được kiểm chứng theo thời gian",
        },
      },
      {
        id: "network",
        name: { en: "× Network participation", vi: "× Tham gia mạng" },
        detail: {
          en: "Assumption — future option, not current fact",
          vi: "Giả định — lựa chọn tương lai, không phải sự kiện hiện tại",
        },
      },
    ],
  },
];
