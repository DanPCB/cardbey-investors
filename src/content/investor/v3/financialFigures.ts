import type { LocalizedString } from "../schemas/types";

/**
 * Financial / growth figure discipline for V3.
 * Public UI must never present legacy_unverified or placeholder as facts.
 */
export type InvestorFigureKind =
  | "actual"
  | "founder_confirmed"
  | "management_assumption"
  | "illustrative_scenario"
  | "legacy_unverified"
  | "placeholder";

export type ScenarioDriverStatus =
  | "current"
  | "testing"
  | "future"
  | "founder_confirmation_required";

export type InvestorFigure = {
  id: string;
  value?: number;
  display?: string;
  currency?: "AUD" | "USD";
  unit?: string;
  kind: InvestorFigureKind;
  asOf?: string;
  sourceId?: string;
  public: boolean;
  note?: LocalizedString;
};

export type ScenarioId = "foundation" | "base" | "opportunity";

export type ScenarioDriver = {
  id: string;
  label: LocalizedString;
  status: ScenarioDriverStatus;
  /** Per-scenario figure ids — resolved via registry */
  figureIds: Partial<Record<ScenarioId, string>>;
};

export type GrowthScenario = {
  id: ScenarioId;
  title: LocalizedString;
  summary: LocalizedString;
};

/** Figures that must never render as public facts */
const BLOCKED_PUBLIC_KINDS: InvestorFigureKind[] = [
  "legacy_unverified",
  "placeholder",
];

export function isFigureSafeForPublic(figure: InvestorFigure): boolean {
  if (!figure.public) return false;
  if (BLOCKED_PUBLIC_KINDS.includes(figure.kind)) return false;
  if (figure.kind === "illustrative_scenario" || figure.kind === "management_assumption") {
    // Allowed only when an explicit display value exists and public flag is true
    return Boolean(figure.display || typeof figure.value === "number");
  }
  return figure.kind === "actual" || figure.kind === "founder_confirmed";
}

export function formatPublicFigure(
  figure: InvestorFigure | undefined,
  locale: "en" | "vi",
  emptyLabel: LocalizedString
): { text: string; kind: InvestorFigureKind | "missing"; showKindLabel: boolean } {
  if (!figure || !isFigureSafeForPublic(figure)) {
    return {
      text: emptyLabel[locale] || emptyLabel.en,
      kind: "missing",
      showKindLabel: false,
    };
  }
  const text =
    figure.display ||
    (typeof figure.value === "number"
      ? figure.currency
        ? `${figure.currency === "AUD" ? "A$" : "US$"}${figure.value.toLocaleString()}${figure.unit ? ` ${figure.unit}` : ""}`
        : `${figure.value.toLocaleString()}${figure.unit ? ` ${figure.unit}` : ""}`
      : emptyLabel[locale] || emptyLabel.en);
  return {
    text,
    kind: figure.kind,
    showKindLabel:
      figure.kind === "illustrative_scenario" || figure.kind === "management_assumption",
  };
}

/** Explicit legacy figures — registered only to block accidental reuse */
export const legacyBlockedFigures: InvestorFigure[] = [
  {
    id: "legacy-revenue-y1",
    value: 36_000_000,
    currency: "AUD",
    kind: "legacy_unverified",
    public: false,
    note: {
      en: "Legacy V1 Year-1 revenue path — not for V3 public use.",
      vi: "Đường doanh thu năm 1 legacy V1 — không dùng công khai trên V3.",
    },
  },
  {
    id: "legacy-revenue-y2",
    value: 216_000_000,
    currency: "AUD",
    kind: "legacy_unverified",
    public: false,
  },
  {
    id: "legacy-revenue-y3",
    value: 900_000_000,
    currency: "AUD",
    kind: "legacy_unverified",
    public: false,
  },
  {
    id: "legacy-safe-cap",
    value: 18_000_000,
    currency: "AUD",
    kind: "legacy_unverified",
    public: false,
  },
  {
    id: "legacy-users-500k",
    value: 500_000,
    kind: "legacy_unverified",
    public: false,
  },
  {
    id: "legacy-devices-50k",
    value: 50_000,
    kind: "legacy_unverified",
    public: false,
  },
];

/** Placeholder driver figures — DEV may show labels; production shows gated empty */
export const scenarioDriverFigures: InvestorFigure[] = [
  {
    id: "fig-participating-businesses",
    kind: "placeholder",
    public: false,
    note: {
      en: "Participating businesses — founder confirmation required.",
      vi: "Doanh nghiệp tham gia — cần xác nhận founder.",
    },
  },
  {
    id: "fig-paying-businesses",
    kind: "placeholder",
    public: false,
  },
  {
    id: "fig-initial-value",
    kind: "placeholder",
    public: false,
    currency: "AUD",
  },
  {
    id: "fig-recurring-rate",
    kind: "placeholder",
    public: false,
  },
  {
    id: "fig-recurring-value",
    kind: "placeholder",
    public: false,
    currency: "AUD",
  },
  {
    id: "fig-platform-activity",
    kind: "placeholder",
    public: false,
  },
  {
    id: "fig-illustrative-revenue",
    kind: "placeholder",
    public: false,
    currency: "AUD",
  },
];

export const growthScenarios: GrowthScenario[] = [
  {
    id: "foundation",
    title: { en: "Foundation", vi: "Foundation" },
    summary: {
      en: "Slower adoption and a longer validation period — illustrate runway needs and downside survivability.",
      vi: "Chấp nhận chậm hơn và thời gian kiểm chứng dài hơn — minh họa nhu cầu runway và khả năng chịu downside.",
    },
  },
  {
    id: "base",
    title: { en: "Base", vi: "Base" },
    summary: {
      en: "A commercially useful entry segment and growing recurring participation — illustrate a successful seed commercial transition.",
      vi: "Phân khúc đầu vào hữu dụng thương mại và tham gia định kỳ tăng — minh họa chuyển dịch thương mại seed thành công.",
    },
  },
  {
    id: "opportunity",
    title: { en: "Opportunity", vi: "Opportunity" },
    summary: {
      en: "Stronger adoption, repeatable distribution and rising value per business — illustrate upside if the capability / network thesis begins working.",
      vi: "Chấp nhận mạnh hơn, phân phối lặp lại và giá trị mỗi DN tăng — minh họa upside nếu luận điểm năng lực / mạng bắt đầu hoạt động.",
    },
  },
];

export const scenarioDrivers: ScenarioDriver[] = [
  {
    id: "participating",
    label: { en: "Participating businesses", vi: "Doanh nghiệp tham gia" },
    status: "founder_confirmation_required",
    figureIds: {
      foundation: "fig-participating-businesses",
      base: "fig-participating-businesses",
      opportunity: "fig-participating-businesses",
    },
  },
  {
    id: "paying",
    label: { en: "Paying businesses", vi: "Doanh nghiệp trả phí" },
    status: "founder_confirmation_required",
    figureIds: {
      foundation: "fig-paying-businesses",
      base: "fig-paying-businesses",
      opportunity: "fig-paying-businesses",
    },
  },
  {
    id: "initial-value",
    label: { en: "Average initial value", vi: "Giá trị ban đầu trung bình" },
    status: "founder_confirmation_required",
    figureIds: {
      foundation: "fig-initial-value",
      base: "fig-initial-value",
      opportunity: "fig-initial-value",
    },
  },
  {
    id: "recurring-rate",
    label: { en: "Recurring participation", vi: "Tham gia định kỳ" },
    status: "founder_confirmation_required",
    figureIds: {
      foundation: "fig-recurring-rate",
      base: "fig-recurring-rate",
      opportunity: "fig-recurring-rate",
    },
  },
  {
    id: "recurring-value",
    label: { en: "Average recurring value", vi: "Giá trị định kỳ trung bình" },
    status: "founder_confirmation_required",
    figureIds: {
      foundation: "fig-recurring-value",
      base: "fig-recurring-value",
      opportunity: "fig-recurring-value",
    },
  },
  {
    id: "platform",
    label: { en: "Platform / commercial activity", vi: "Hoạt động nền tảng / thương mại" },
    status: "future",
    figureIds: {
      foundation: "fig-platform-activity",
      base: "fig-platform-activity",
      opportunity: "fig-platform-activity",
    },
  },
  {
    id: "revenue",
    label: { en: "Illustrative annual revenue", vi: "Doanh thu năm minh họa" },
    status: "founder_confirmation_required",
    figureIds: {
      foundation: "fig-illustrative-revenue",
      base: "fig-illustrative-revenue",
      opportunity: "fig-illustrative-revenue",
    },
  },
];

const figureIndex = new Map<string, InvestorFigure>(
  [...legacyBlockedFigures, ...scenarioDriverFigures].map((f) => [f.id, f])
);

export function getInvestorFigure(id: string): InvestorFigure | undefined {
  return figureIndex.get(id);
}

export function listPublicInvestorFigures(): InvestorFigure[] {
  return [...figureIndex.values()].filter(isFigureSafeForPublic);
}

export function assertNoLegacyLeakage(renderedText: string): boolean {
  const banned = [
    /A\$?\s*36\s*M/i,
    /A\$?\s*216\s*M/i,
    /A\$?\s*900\s*M/i,
    /500\s*,?\s*000\s*(users|end-users)/i,
    /50\s*,?\s*000\s*(devices|screens)/i,
    /Cap\s*A\$?\s*18\s*M/i,
    /IPO.{0,40}(4\s*\/\s*5|year\s*4)/i,
    /Sign\s+SAFE/i,
  ];
  return !banned.some((re) => re.test(renderedText));
}
