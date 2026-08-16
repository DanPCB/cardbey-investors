import type { InvestorMetric } from "../schemas/types";

/**
 * Only verified (or carefully marked product/execution) metrics may render publicly.
 * Market/revenue/distribution placeholders stay non-public.
 */
export const investorMetrics: InvestorMetric[] = [
  {
    id: "metric-customer-count",
    label: {
      en: "Live customer count",
      vi: "Số khách hàng đang hoạt động",
    },
    value: "[LIVE CUSTOMER COUNT REQUIRED]",
    status: "placeholder",
    displayKind: "placeholder",
    public: false,
    category: "market",
  },
  {
    id: "metric-current-round",
    label: {
      en: "Current round terms",
      vi: "Điều khoản vòng gọi vốn hiện tại",
    },
    value: "[CURRENT ROUND TERMS REQUIRED]",
    status: "placeholder",
    displayKind: "placeholder",
    public: false,
    category: "funding",
  },
  {
    id: "metric-device-runtime-modules",
    label: {
      en: "Device runtime modules evidenced in codebase",
      vi: "Mô-đun runtime thiết bị có bằng chứng trong mã nguồn",
    },
    value: "pairing · heartbeat · playlist · repair",
    unit: "modules",
    status: "draft",
    displayKind: "historical",
    sourceId: "src-repo-device-engine",
    methodology:
      "Counted from adjacent server device-engine tool surface; product proof only — not a commercial KPI.",
    lastVerifiedAt: "2026-08-02",
    owner: "product",
    public: true,
    category: "product",
    tractionTier: "product",
  },
  {
    id: "metric-platform-surfaces",
    label: {
      en: "Platform surfaces with repository evidence",
      vi: "Bề mặt nền tảng có bằng chứng trong mã nguồn",
    },
    value: "storefront · performer · devices · rewards · signage",
    status: "draft",
    displayKind: "historical",
    sourceId: "src-repo-device-engine",
    methodology: "Named route/engine surfaces observed in adjacent server; execution proof, not revenue.",
    lastVerifiedAt: "2026-08-02",
    owner: "product",
    public: true,
    category: "execution",
    tractionTier: "product",
  },
  {
    id: "metric-revenue",
    label: { en: "Commercial revenue", vi: "Doanh thu thương mại" },
    value: "[COMMERCIAL REVENUE REQUIRED]",
    status: "placeholder",
    displayKind: "placeholder",
    public: false,
    category: "revenue",
  },
];

function isMetricExpired(metric: InvestorMetric): boolean {
  if (!metric.expiresAt) return false;
  const ts = Date.parse(metric.expiresAt);
  return Number.isFinite(ts) && ts < Date.now();
}

/** Metrics safe for public production UI */
export function getPublicMetrics(metrics: InvestorMetric[] = investorMetrics) {
  return metrics.filter(
    (m) =>
      m.public &&
      !m.investorOnly &&
      !isMetricExpired(m) &&
      m.status !== "confidential" &&
      m.status !== "not_for_public_site" &&
      m.status !== "placeholder" &&
      (m.category === "product" || m.category === "execution") &&
      (m.status === "verified" || m.status === "draft") &&
      (m.tractionTier == null || m.tractionTier === "product" || m.tractionTier === "operational")
  );
}

export function getPublicMetricsByTractionTier(
  metrics: InvestorMetric[] = investorMetrics
): Record<"product" | "operational" | "market" | "commercial", InvestorMetric[]> {
  const publicOnes = getPublicMetrics(metrics);
  return {
    product: publicOnes.filter((m) => (m.tractionTier || "product") === "product"),
    operational: publicOnes.filter((m) => m.tractionTier === "operational"),
    market: [],
    commercial: [],
  };
}

export function getDisplayableMetrics(
  metrics: InvestorMetric[] = investorMetrics,
  opts: { allowDevPlaceholders?: boolean } = {}
) {
  const publicOnes = getPublicMetrics(metrics);
  if (!opts.allowDevPlaceholders) return publicOnes;
  return [
    ...publicOnes,
    ...metrics.filter((m) => !m.public && m.status === "placeholder"),
  ];
}

export function canShowMetricPublicly(metric: InvestorMetric): boolean {
  return getPublicMetrics([metric]).length === 1;
}
