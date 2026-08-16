import type { LocalizedString } from "../schemas/types";
import { getPublicMedia } from "../shared/media";

/**
 * Compact proof of the Resource Aggregation Accelerator.
 * The prebuilt store is one demonstration — not the definition of Cardbey.
 */

export const prebuiltProofCopy = {
  kicker: {
    en: "What does this mean in practice?",
    vi: "MỘT VÍ DỤ trong thực tế.",
  } satisfies LocalizedString,
  resources: {
    en: "A real business may already have useful resources distributed across public information, products, physical locations, social channels, content and existing infrastructure.",
    vi: "Một doanh nghiệp thật có thể đã có nguồn lực hữu ích phân tán trên thông tin công khai, sản phẩm, địa điểm vật lý, kênh xã hội, nội dung và hạ tầng sẵn có.",
  } satisfies LocalizedString,
  gap: {
    en: "Those resources do not automatically become useful business capability.",
    vi: "Những nguồn lực đó không tự trở thành năng lực kinh doanh hữu ích.",
  } satisfies LocalizedString,
  mechanism: {
    en: "Cardbey can discover and coordinate available information into a private, prebuilt business presence before asking the owner to construct everything from scratch. The owner can then claim it, verify it and continue building from there.",
    vi: "Cardbey có thể khám phá và điều phối thông tin sẵn có thành một hiện diện kinh doanh được dựng sẵn, ở trạng thái riêng, trước khi yêu cầu chủ doanh nghiệp tự xây từ đầu. Chủ doanh nghiệp sau đó có thể nhận, xác minh và tiếp tục xây từ đó.",
  } satisfies LocalizedString,
  distinction: {
    en: "The prebuilt store is not the thesis. It is one demonstration of the thesis.",
    vi: "Cửa hàng dựng sẵn không phải luận điểm. Đó là một cách chứng minh luận điểm.",
  } satisfies LocalizedString,
  existsLabel: {
    en: "EXISTS — one implementation of the mechanism",
    vi: "“ĐÃ CÓ — một cách hiện thực hóa cơ chế”",
  } satisfies LocalizedString,
  notMoat: {
    en: "The opportunity is not that competitors cannot copy a storefront feature. The question is whether Cardbey can recognise changing market structure, coordinate resources, act, learn from real use and accumulate useful capability as the opportunity moves.",
    vi: "Cơ hội không nằm ở chỗ đối thủ không sao chép được một tính năng storefront. Câu hỏi là Cardbey có nhận ra cấu trúc thị trường đang đổi, điều phối nguồn lực, hành động, học từ sử dụng thật và tích lũy năng lực hữu ích khi cơ hội dịch chuyển hay không.",
  } satisfies LocalizedString,
  exampleCaption: {
    en: "PREBUILT BUSINESS PRESENCE — AWAITING OWNER CLAIM",
    vi: "HIỆN DIỆN KINH DOANH DỰNG SẴN — CHỜ CHỦ DOANH NGHIỆP NHẬN",
  } satisfies LocalizedString,
  exampleNote: {
    en: "Created from available business resources. Private/non-indexed until the appropriate claim and verification process. No owner endorsement implied.",
    vi: "Được tạo từ nguồn lực kinh doanh sẵn có. Ở trạng thái riêng / không được lập chỉ mục cho đến khi có quy trình nhận và xác minh phù hợp. Không hàm ý chủ doanh nghiệp đã xác nhận hay tán thành.",
  } satisfies LocalizedString,
} as const;

export const prebuiltProofSteps: LocalizedString[] = [
  { en: "Discover", vi: "Khám phá" },
  { en: "Coordinate", vi: "Điều phối" },
  { en: "Create useful capability", vi: "Tạo năng lực hữu ích" },
  { en: "Claim", vi: "Nhận" },
  { en: "Verify", vi: "Xác minh" },
  { en: "Activate", vi: "Kích hoạt" },
  { en: "Learn", vi: "Học" },
];

/** No public-approved prebuilt-store screenshot currently exists. */
export function getPublicPrebuiltExample() {
  const approved = getPublicMedia().filter((m) =>
    m.capabilityIds?.includes("cap-ai-storefront")
  );
  const withSrc = approved.find((m) => Boolean(m.assetPath));
  return withSrc ?? null;
}
