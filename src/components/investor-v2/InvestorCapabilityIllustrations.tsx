import type { LocaleCode } from "@/content/investor";

export type CapabilityIllustrationType =
  | "storefront"
  | "performer"
  | "growth"
  | "devices";

const LABELS: Record<
  CapabilityIllustrationType,
  { en: string; vi: string }
> = {
  storefront: {
    en: "Diagram: business information becomes a structured digital storefront",
    vi: "Sơ đồ: thông tin doanh nghiệp trở thành storefront số có cấu trúc",
  },
  performer: {
    en: "Diagram: one orchestration layer coordinating multiple business tasks",
    vi: "Sơ đồ: một lớp điều phối nhiều tác vụ kinh doanh",
  },
  growth: {
    en: "Diagram: one business reaches multiple channels and observes engagement",
    vi: "Sơ đồ: một doanh nghiệp tiếp cận nhiều kênh và quan sát tương tác",
  },
  devices: {
    en: "Diagram: shared runtime connecting content to multiple digital surfaces",
    vi: "Sơ đồ: runtime dùng chung kết nối nội dung tới nhiều bề mặt số",
  },
};

type Props = {
  type: CapabilityIllustrationType;
  locale?: LocaleCode;
  className?: string;
};

/**
 * Monotone outline illustrations for investor capability tiles.
 * Explanatory only — not product screenshots or evidence.
 */
export function InvestorCapabilityIllustration({
  type,
  locale = "en",
  className = "",
}: Props) {
  const label = locale === "vi" ? LABELS[type].vi : LABELS[type].en;
  return (
    <div
      className={`iv3-cap-illust iv3-cap-illust--${type} ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      <svg
        className="iv3-cap-illust-svg"
        viewBox="0 0 320 180"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        {type === "storefront" ? <StorefrontArt /> : null}
        {type === "performer" ? <PerformerArt /> : null}
        {type === "growth" ? <GrowthArt /> : null}
        {type === "devices" ? <DevicesArt /> : null}
      </svg>
    </div>
  );
}

function Node({
  x,
  y,
  w = 56,
  h = 22,
  label,
  className = "iv3-cap-node",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x} ${y})`}>
      <rect
        x={0}
        y={0}
        width={w}
        height={h}
        rx={4}
        ry={4}
        className="iv3-cap-node-box"
      />
      <text
        x={w / 2}
        y={h / 2 + 3.5}
        textAnchor="middle"
        className="iv3-cap-node-label"
      >
        {label}
      </text>
    </g>
  );
}

function Hub({
  x,
  y,
  w = 72,
  h = 28,
  label,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
}) {
  return (
    <g className="iv3-cap-hub" transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={w} height={h} rx={4} ry={4} className="iv3-cap-hub-box" />
      <text
        x={w / 2}
        y={h / 2 + 3.5}
        textAnchor="middle"
        className="iv3-cap-hub-label"
      >
        {label}
      </text>
    </g>
  );
}

/** Business info → Cardbey → Storefront browser */
function StorefrontArt() {
  return (
    <g className="iv3-cap-art iv3-cap-art--storefront">
      {/* Source block */}
      <g className="iv3-cap-source">
        <rect x={18} y={42} width={78} height={96} rx={4} className="iv3-cap-node-box" />
        <text x={57} y={62} textAnchor="middle" className="iv3-cap-node-label">
          Business info
        </text>
        <line x1={30} y1={78} x2={84} y2={78} className="iv3-cap-line-muted" />
        <line x1={30} y1={92} x2={78} y2={92} className="iv3-cap-line-muted" />
        <line x1={30} y1={106} x2={84} y2={106} className="iv3-cap-line-muted" />
        <text x={57} y={126} textAnchor="middle" className="iv3-cap-tiny">
          Name · Offer · Contact
        </text>
      </g>

      {/* Flow path */}
      <path
        className="iv3-cap-flow iv3-cap-flow-1"
        d="M96 90 H138"
        fill="none"
      />
      <polygon
        className="iv3-cap-arrow"
        points="136,86 146,90 136,94"
      />

      <Hub x={148} y={76} w={70} h={28} label="CARDBEY" />

      <path
        className="iv3-cap-flow iv3-cap-flow-2"
        d="M218 90 H248"
        fill="none"
      />
      <polygon
        className="iv3-cap-arrow"
        points="246,86 256,90 246,94"
      />

      {/* Browser / storefront */}
      <g className="iv3-cap-storefront">
        <rect x={256} y={36} width={48} height={108} rx={4} className="iv3-cap-node-box" />
        <rect x={256} y={36} width={48} height={14} rx={4} className="iv3-cap-chrome" />
        <circle cx={264} cy={43} r={1.5} className="iv3-cap-dot" />
        <circle cx={270} cy={43} r={1.5} className="iv3-cap-dot" />
        <rect x={262} y={58} width={36} height={18} rx={2} className="iv3-cap-fill-soft" />
        <rect x={262} y={82} width={16} height={14} rx={2} className="iv3-cap-node-box" />
        <rect x={282} y={82} width={16} height={14} rx={2} className="iv3-cap-node-box" />
        <rect x={262} y={104} width={36} height={10} rx={2} className="iv3-cap-cta" />
        <text x={280} y={156} textAnchor="middle" className="iv3-cap-tiny">
          Storefront
        </text>
      </g>
    </g>
  );
}

/** Radial orchestration around Performer */
function PerformerArt() {
  return (
    <g className="iv3-cap-art iv3-cap-art--performer">
      <line className="iv3-cap-connector" x1={160} y1={78} x2={160} y2={36} />
      <line className="iv3-cap-connector" x1={160} y1={106} x2={160} y2={148} />
      <line className="iv3-cap-connector" x1={124} y1={92} x2={62} y2={92} />
      <line className="iv3-cap-connector" x1={196} y1={92} x2={258} y2={92} />
      <line className="iv3-cap-connector iv3-cap-connector--soft" x1={130} y1={78} x2={70} y2={48} />
      <line className="iv3-cap-connector iv3-cap-connector--soft" x1={190} y1={78} x2={250} y2={48} />

      <Node x={132} y={18} w={56} h={20} label="Content" className="iv3-cap-node iv3-cap-node-a" />
      <Node x={18} y={82} w={56} h={20} label="Marketing" className="iv3-cap-node iv3-cap-node-b" />
      <Node x={246} y={82} w={56} h={20} label="Store" className="iv3-cap-node iv3-cap-node-c" />
      <Node x={18} y={36} w={56} h={20} label="Language" className="iv3-cap-node iv3-cap-node-d" />
      <Node x={246} y={36} w={56} h={20} label="Customer" className="iv3-cap-node iv3-cap-node-e" />
      <Node x={128} y={148} w={64} h={20} label="Task" className="iv3-cap-node iv3-cap-node-f" />

      <Hub x={124} y={78} w={72} h={28} label="Performer" />
    </g>
  );
}

/** Business → channels → attribution return */
function GrowthArt() {
  return (
    <g className="iv3-cap-art iv3-cap-art--growth">
      <line className="iv3-cap-connector iv3-cap-out" x1={120} y1={78} x2={160} y2={36} />
      <line className="iv3-cap-connector iv3-cap-out" x1={120} y1={92} x2={56} y2={92} />
      <line className="iv3-cap-connector iv3-cap-out" x1={144} y1={92} x2={210} y2={92} />
      <line className="iv3-cap-connector iv3-cap-out" x1={120} y1={106} x2={160} y2={148} />
      <path
        className="iv3-cap-connector iv3-cap-return"
        d="M210 112 C 210 148, 140 158, 120 118"
        fill="none"
      />

      <Hub x={84} y={78} w={60} h={28} label="Business" />
      <Node x={140} y={18} w={48} h={20} label="Social" className="iv3-cap-node iv3-cap-node-a" />
      <Node x={12} y={82} w={48} h={20} label="Partner" className="iv3-cap-node iv3-cap-node-b" />
      <Node x={210} y={82} w={40} h={20} label="QR" className="iv3-cap-node iv3-cap-node-c" />
      <Node x={140} y={148} w={52} h={20} label="Display" className="iv3-cap-node iv3-cap-node-d" />
      <Node x={248} y={128} w={60} h={20} label="Customer" className="iv3-cap-node iv3-cap-node-e" />
      <Node x={200} y={48} w={72} h={20} label="Attribution" className="iv3-cap-node iv3-cap-attr" />
    </g>
  );
}

/** Shared runtime to device surfaces */
function DevicesArt() {
  return (
    <g className="iv3-cap-art iv3-cap-art--devices">
      <line className="iv3-cap-connector" x1={160} y1={78} x2={160} y2={32} />
      <line className="iv3-cap-connector" x1={124} y1={92} x2={48} y2={92} />
      <line className="iv3-cap-connector" x1={196} y1={92} x2={272} y2={92} />
      <line className="iv3-cap-connector" x1={160} y1={106} x2={160} y2={138} />
      <line className="iv3-cap-connector iv3-cap-connector--soft" x1={148} y1={106} x2={90} y2={148} />
      <line className="iv3-cap-connector iv3-cap-connector--soft" x1={172} y1={106} x2={230} y2={148} />

      {/* TV */}
      <g className="iv3-cap-device iv3-cap-node-a" transform="translate(132 12)">
        <rect x={0} y={0} width={56} height={28} rx={3} className="iv3-cap-node-box" />
        <line x1={20} y1={28} x2={28} y2={34} className="iv3-cap-line-muted" />
        <line x1={36} y1={28} x2={28} y2={34} className="iv3-cap-line-muted" />
        <line x1={18} y1={34} x2={38} y2={34} className="iv3-cap-line-muted" />
        <text x={28} y={18} textAnchor="middle" className="iv3-cap-node-label">
          Display
        </text>
      </g>

      {/* Phone */}
      <g className="iv3-cap-device iv3-cap-node-b" transform="translate(18 72)">
        <rect x={0} y={0} width={28} height={44} rx={4} className="iv3-cap-node-box" />
        <line x1={8} y1={6} x2={20} y2={6} className="iv3-cap-line-muted" />
        <circle cx={14} cy={38} r={2} className="iv3-cap-dot" />
      </g>
      <text x={32} y={128} textAnchor="middle" className="iv3-cap-tiny">
        Phone
      </text>

      {/* Signage */}
      <g className="iv3-cap-device iv3-cap-node-c" transform="translate(274 72)">
        <rect x={0} y={0} width={34} height={44} rx={3} className="iv3-cap-node-box" />
        <rect x={4} y={6} width={26} height={18} rx={2} className="iv3-cap-fill-soft" />
        <line x1={8} y1={32} x2={26} y2={32} className="iv3-cap-line-muted" />
      </g>
      <text x={291} y={128} textAnchor="middle" className="iv3-cap-tiny">
        Signage
      </text>

      {/* Web */}
      <g className="iv3-cap-device iv3-cap-node-d" transform="translate(132 138)">
        <rect x={0} y={0} width={56} height={28} rx={3} className="iv3-cap-node-box" />
        <rect x={0} y={0} width={56} height={8} rx={3} className="iv3-cap-chrome" />
        <text x={28} y={22} textAnchor="middle" className="iv3-cap-node-label">
          Web
        </text>
      </g>

      {/* QR hint */}
      <g className="iv3-cap-device iv3-cap-node-e" transform="translate(78 142)">
        <rect x={0} y={0} width={18} height={18} rx={2} className="iv3-cap-node-box" />
        <rect x={3} y={3} width={5} height={5} className="iv3-cap-fill-soft" />
        <rect x={10} y={3} width={5} height={5} className="iv3-cap-fill-soft" />
        <rect x={3} y={10} width={5} height={5} className="iv3-cap-fill-soft" />
      </g>

      <Hub x={124} y={78} w={72} h={28} label="CARDBEY" />
    </g>
  );
}
