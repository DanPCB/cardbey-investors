import type { InvestorContentBundle } from "../schemas/types";
import { productCapabilities } from "../shared/capabilities";
import { investorResources } from "../shared/documents";
import { investorMetrics } from "../shared/metrics";
import { productMedia } from "../shared/media";
import { investorProofs } from "../shared/proof";
import { investorSources } from "../shared/sources";
import { investorTeam } from "../shared/team";
import { registerDiagrams } from "../shared/diagrams";
import { investorV3Diagrams } from "./diagrams";
import { investorV3Roadmap } from "./roadmap";
import { investorV3Sections } from "./sections";

registerDiagrams(investorV3Diagrams);

/** V3 bundle — new narrative, same V2 evidence registries */
export const investorV3Content: InvestorContentBundle = {
  localeMeta: {
    primary: "en",
    supported: ["en", "vi"],
  },
  brand: {
    name: "Cardbey",
    positioning: {
      en: "The resources already exist. Cardbey brings them together around economic activity — turning access into capability and capability into action.",
      vi: "Các nguồn lực đã tồn tại. Cardbey kết nối và phối hợp chúng quanh hoạt động kinh tế, biến khả năng tiếp cận thành năng lực và năng lực thành hành động.",
    },
    supporting: {
      en: "Technology is making powerful resources available to smaller economic actors. Access is not the same as capability.",
      vi: "Công nghệ đang làm nguồn lực mạnh trở nên khả dụng với bên tham gia kinh tế nhỏ hơn. Tiếp cận không phải là năng lực.",
    },
  },
  sections: investorV3Sections,
  capabilities: productCapabilities,
  metrics: investorMetrics,
  sources: investorSources,
  resources: investorResources,
  team: investorTeam,
  roadmap: investorV3Roadmap,
  proofs: investorProofs,
  media: productMedia,
  legal: {
    companyLine: {
      en: "SIGNSCATER PTY LTD · ABN 50 685 406 697 · ACN 685 406 697",
      vi: "SIGNSCATER PTY LTD · ABN 50 685 406 697 · ACN 685 406 697",
    },
    notes: [
      {
        en: "This page does not constitute an offer of securities where such an offer would be unlawful.",
        vi: "Trang này không phải lời chào bán chứng khoán khi việc chào bán là bất hợp pháp.",
      },
      {
        en: "Forward-looking statements are directional and subject to change. Later platform modules are not presented as completed products.",
        vi: "Các tuyên bố hướng tới tương lai mang tính định hướng và có thể thay đổi. Các mô-đun nền tảng sau không được trình bày như sản phẩm đã hoàn thành.",
      },
    ],
  },
};

export { investorV3Sections } from "./sections";
export { investorV3Diagrams } from "./diagrams";
export { investorV3Roadmap } from "./roadmap";
export { growthCapitalCopy } from "./growthCapital";
export * from "./financialFigures";
export * from "./capabilityGrowthTree";
export * from "./investorQa";
export * from "./resourceAggregationUsp";
export * from "./structuralNarrative";
