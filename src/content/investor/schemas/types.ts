import type {
  ContentStatus,
  MetricDisplayKind,
  ProductStatus,
} from "./status";

export type LocaleCode = "en" | "vi";

export type SectionId =
  | "hero"
  | "problem"
  | "why-now"
  | "answer"
  | "how-it-works"
  | "architecture"
  | "what-built"
  | "ai-workforce"
  | "business-graph"
  | "import-kernel"
  | "physical-digital"
  | "smart-display"
  | "growth-engine"
  | "language-intelligence"
  | "traction"
  | "market-entry"
  | "expansion"
  | "business-model"
  | "defensibility"
  | "competition"
  | "roadmap"
  | "team"
  | "funding"
  | "resources"
  | "contact"
  | "closing"
  | "footer"
  // V3 Operating Philosophy narrative
  | "world-changed"
  | "why-exists"
  | "four-pillars"
  | "platform"
  | "app-first"
  | "progressive-leverage"
  | "value-creation"
  | "technology"
  | "execution"
  | "why-invest"
  | "change"
  | "opportunity"
  | "position"
  | "start-business"
  | "revenue-layers"
  | "relationship-value"
  | "economics-improve"
  | "growth"
  | "evidence"
  | "investment"
  // V3 Opportunity-led seed pitch
  | "paradox"
  | "human-opportunity"
  | "missing-layer"
  | "cardbey-layer"
  | "strategy"
  | "start-one"
  | "seed-opportunity"
  | "growth-capital"
  | "qa"
  // Prior V3 practical commercial (retained for history / drawers)
  | "start-customer"
  | "what-sells"
  | "ai-economics"
  | "resource-thesis"
  | "what-exists"
  | "commercial-validation";

/** Visual hierarchy — not all sections are equal weight */
export type SectionTier = "core" | "supporting" | "investor";

export type LocalizedString = Record<LocaleCode, string>;

export type InvestorSource = {
  id: string;
  title: string;
  url?: string;
  publisher?: string;
  accessedAt?: string;
  notes?: string;
  status: ContentStatus;
  public: boolean;
};

export type InvestorMetric = {
  id: string;
  label: LocalizedString;
  value: string;
  unit?: string;
  period?: string;
  geography?: string;
  status: ContentStatus;
  displayKind: MetricDisplayKind;
  sourceId?: string;
  methodology?: string;
  lastVerifiedAt?: string;
  /** ISO date — expired metrics must not render publicly */
  expiresAt?: string;
  owner?: string;
  investorOnly?: boolean;
  public: boolean;
  category?:
    | "product"
    | "market"
    | "revenue"
    | "distribution"
    | "execution"
    | "funding"
    | "engagement"
    | "deployment"
    | "commercial";
  /** Traction presentation hierarchy */
  tractionTier?: "product" | "operational" | "market" | "commercial";
};

export type CapabilityCategory =
  | "experience"
  | "agents"
  | "intelligence"
  | "commerce"
  | "growth"
  | "devices"
  | "infrastructure"
  | "language"
  | "product_creation"
  | "business_intelligence"
  | "device_distribution"
  | "customer_experience";

export type ProofType =
  | "repository"
  | "test"
  | "demo"
  | "deployment"
  | "document"
  | "customer"
  | "device"
  | "commercial"
  | "manual_confirmation_required"
  | "founder_confirmation"
  | "none";

export type ProductCapability = {
  id: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  category: CapabilityCategory;
  status: ProductStatus;
  proofType: ProofType;
  evidenceLink?: string;
  /** Investor-facing proof wording (safe for UI) */
  evidenceNote?: string;
  /** Internal only — never render publicly */
  internalNotes?: string;
  public: boolean;
  roadmapPhaseId?: string;
  confirmationRequired?: boolean;
  proofGroup?:
    | "product_creation"
    | "business_intelligence"
    | "growth"
    | "device_distribution"
    | "commerce_experience";
};

export type ResourceAccessLevel =
  | "public"
  | "request"
  | "confidential"
  | "data_room";

export type InvestorResource = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  category:
    | "deck"
    | "summary"
    | "architecture"
    | "financial_model"
    | "data_room"
    | "safe"
    | "registration"
    | "contact"
    | "demo"
    | "other";
  accessLevel: ResourceAccessLevel;
  href?: string;
  fileType?: string;
  language?: LocaleCode | "both";
  lastUpdated?: string;
  confidentiality: ContentStatus;
  availability: "available" | "request_only" | "unavailable" | "placeholder";
  resourceState?: InvestorResourceState;
  public: boolean;
};

export type TeamMember = {
  id: string;
  fullName: string;
  role: LocalizedString;
  location?: string;
  biography: LocalizedString;
  expertise: LocalizedString[];
  achievements: LocalizedString[];
  linkedIn?: string;
  image?: string;
  status: ContentStatus;
  public: boolean;
};

export type RoadmapItem = {
  id: string;
  phase: LocalizedString;
  timeframe: LocalizedString;
  summary: LocalizedString;
  items: LocalizedString[];
  status: ContentStatus;
  public: boolean;
};

export type CtaDef = {
  id: string;
  label: LocalizedString;
  href?: string;
  action?:
    | "scroll"
    | "external"
    | "download"
    | "contact"
    | "request_access";
  targetSectionId?: SectionId;
  variant?: "primary" | "secondary" | "ghost" | "accent";
};

export type SectionContent = {
  id: SectionId;
  order: number;
  tier?: SectionTier;
  eyebrow?: LocalizedString;
  title: LocalizedString;
  introduction?: LocalizedString;
  body?: LocalizedString[];
  bullets?: LocalizedString[];
  ctas?: CtaDef[];
  status: ContentStatus;
  disclosure?: LocalizedString;
  relatedCapabilityIds?: string[];
  relatedMetricIds?: string[];
  relatedResourceIds?: string[];
  relatedProofIds?: string[];
  diagramId?: string;
};

export type InvestorProof = {
  id: string;
  capabilityId?: string;
  title: LocalizedString;
  description: LocalizedString;
  proofType:
    | "repository"
    | "test"
    | "deployment"
    | "customer"
    | "device"
    | "document"
    | "commercial"
    | "founder_confirmation";
  maturity: "verified" | "partially_verified" | "requires_confirmation";
  /** Internal reference only — not rendered in public UI */
  internalReference?: string;
  publicReference?: string;
  verifiedAt?: string;
  public: boolean;
  notes?: string;
  category?:
    | "product"
    | "execution"
    | "market"
    | "distribution"
    | "commercial";
};

export type MediaDisplayMode =
  | "browser-frame"
  | "mobile-frame"
  | "television-frame"
  | "dashboard-frame"
  | "full-bleed"
  | "diagram"
  | "physical-installation"
  | "before-and-after"
  | "evidence-strip";

export type MediaResourceState =
  | "available_public"
  | "available_on_request"
  | "investor_only"
  | "confidential"
  | "preparing"
  | "unavailable";

export type ProductMediaAsset = {
  id: string;
  title: LocalizedString;
  caption: LocalizedString;
  longDescription?: LocalizedString;
  assetPath?: string;
  thumbnailPath?: string;
  capabilityId?: string;
  capabilityIds?: string[];
  proofIds?: string[];
  maturity: ProductStatus;
  customerSensitive: boolean;
  customerApproval?: boolean;
  publicApproved: boolean;
  investorOnlyApproved?: boolean;
  confidentiality?: ContentStatus;
  altText: LocalizedString;
  language?: LocaleCode | "both";
  platform?: string;
  deviceType?: string;
  dateCaptured?: string;
  source?: string;
  displayOrder: number;
  status: ContentStatus;
  aspectRatio?: string;
  displayMode?: MediaDisplayMode;
  fallbackTreatment?: "hide" | "collapse_section" | "dev_marker";
};

export type InvestorResourceState =
  | "available_public"
  | "available_on_request"
  | "investor_only"
  | "confidential"
  | "preparing"
  | "unavailable";

export type InvestorContentBundle = {
  localeMeta: {
    primary: LocaleCode;
    supported: LocaleCode[];
  };
  brand: {
    name: string;
    positioning: LocalizedString;
    supporting: LocalizedString;
  };
  sections: SectionContent[];
  capabilities: ProductCapability[];
  metrics: InvestorMetric[];
  sources: InvestorSource[];
  resources: InvestorResource[];
  team: TeamMember[];
  roadmap: RoadmapItem[];
  proofs: InvestorProof[];
  media: ProductMediaAsset[];
  legal: {
    companyLine: LocalizedString;
    notes: LocalizedString[];
  };
};
