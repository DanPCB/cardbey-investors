import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import { allFounderInput } from "@/content/investor/founder-input";
import type { FounderInputRecord } from "@/content/investor/schemas/approvals";
import { growthCapitalCopy as copy } from "@/content/investor/v3/growthCapital";
import { seedPropositionCopy } from "@/content/investor/v3/seedProposition";
import {
  formatPublicFigure,
  getInvestorFigure,
  growthScenarios,
  listPublicInvestorFigures,
  scenarioDrivers,
  type ScenarioId,
} from "@/content/investor/v3/financialFigures";
import { trackInvestorEvent } from "@/lib/analytics";
import { SeedPropositionPanel } from "./SeedPropositionPanel";

function resolvePublicFundingField(id: string): string | null {
  const record = allFounderInput.find((r: FounderInputRecord) => r.id === id);
  if (!record) return null;
  if (record.confidential) return null;
  if (!record.approvedForPublic || record.status !== "confirmed") return null;
  const value = String(record.value || "").trim();
  if (!value || value.includes("[") || /REQUIRED/i.test(value)) return null;
  return value;
}

function useInViewOnce<T extends HTMLElement>(rootMargin = "-12% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduce;
}

/** Compact snapshot: what exists before capital enters */
function CardbeyTodaySnapshot({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-gc-today" aria-label={t(copy.todayTitle, locale)}>
      <figcaption className="iv3-visual-kicker">{t(copy.todayTitle, locale)}</figcaption>
      <p className="iv3-gc-lead">{t(copy.todayLead, locale)}</p>
      <ul className="iv3-gc-today-layers">
        {copy.todayLayers.map((layer) => (
          <li key={layer.en}>{t(layer, locale)}</li>
        ))}
      </ul>
      <p className="iv3-gc-today-arrow" aria-hidden="true">
        + {t(copy.seedThenMarket, locale)}
      </p>
      <p>
        <a className="iv3-gc-link" href="#what-exists">
          {t(copy.todayCta, locale)}
        </a>
      </p>
    </figure>
  );
}

/** Animated capital → destinations → market activity → evidence */
function SeedCapitalFlow({ locale }: { locale: LocaleCode }) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const reduceMotion = useReducedMotion();
  const active = inView || reduceMotion;

  return (
    <figure
      ref={ref}
      className={`iv3-gc-flow${active ? " is-active" : ""}`}
      aria-label={t(copy.capitalFlowTitle, locale)}
    >
      <figcaption className="iv3-visual-kicker">{t(copy.capitalFlowTitle, locale)}</figcaption>
      <p className="iv3-gc-lead">{t(copy.capitalFlowLead, locale)}</p>
      <div className="iv3-gc-flow-diagram">
        <div className="iv3-gc-flow-hub">{t(copy.capitalHub, locale)}</div>
        <div className="iv3-gc-flow-destinations" role="list">
          {copy.capitalDestinations.map((dest, index) => (
            <div
              key={dest.id}
              className="iv3-gc-flow-dest"
              role="listitem"
              style={{ transitionDelay: reduceMotion ? "0ms" : `${120 + index * 140}ms` }}
            >
              <strong>{t(dest.title, locale)}</strong>
              <span>{t(dest.outcome, locale)}</span>
            </div>
          ))}
        </div>
        <div
          className="iv3-gc-flow-converge"
          style={{ transitionDelay: reduceMotion ? "0ms" : "520ms" }}
        >
          <strong>{t(copy.marketActivity, locale)}</strong>
          <span>↓</span>
          <strong>{t(copy.evidenceNode, locale)}</strong>
        </div>
      </div>
    </figure>
  );
}

type TimelineNodeId = (typeof copy.timelineNodes)[number]["id"];

const HIGHLIGHT_PATHS: Record<string, TimelineNodeId[]> = {
  today: ["today", "seed"],
  seed: ["seed", "evidence"],
  evidence: ["evidence", "next"],
  next: ["evidence", "next", "growth"],
  growth: ["next", "growth"],
};

function CompanyStageTimeline({ locale }: { locale: LocaleCode }) {
  const [selected, setSelected] = useState<TimelineNodeId | null>(null);
  const detailStage =
    selected === "seed"
      ? copy.stages[0]
      : selected === "growth"
        ? copy.stages[2]
        : selected === "next"
          ? copy.stages[1]
          : null;
  const highlighted = selected ? HIGHLIGHT_PATHS[selected] || [selected] : [];

  const onKey = (id: TimelineNodeId) => (event: ReactKeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelected((prev) => (prev === id ? null : id));
      trackInvestorEvent("roadmap_engaged", { stage: id });
    }
  };

  return (
    <div className="iv3-gc-timeline-wrap">
      <h3 className="iv3-gc-h">{t(copy.stagesTitle, locale)}</h3>
      <p className="iv3-gc-lead">{t(copy.stagesLead, locale)}</p>

      <div className="iv3-gc-stages" role="list">
        {copy.stages.map((s) => (
          <article key={s.id} role="listitem" className="iv3-gc-stage-card">
            <h4>{t(s.short, locale)}</h4>
            <p>
              <strong>{locale === "vi" ? "Mục tiêu: " : "Objective: "}</strong>
              {t(s.objective, locale)}
            </p>
            <p>
              <strong>{locale === "vi" ? "Vai trò vốn: " : "Capital role: "}</strong>
              {t(s.capitalRole, locale)}
            </p>
            <p>
              <strong>{locale === "vi" ? "Bằng chứng mục tiêu: " : "Target evidence: "}</strong>
              {t(s.evidence, locale)}
            </p>
            <p className="iv3-gc-muted">
              <strong>{locale === "vi" ? "Mở khóa: " : "Unlocks: "}</strong>
              {t(s.unlocks, locale)}
            </p>
          </article>
        ))}
      </div>

      <ol className="iv3-gc-rail" aria-label={t(copy.stagesTitle, locale)}>
        {copy.timelineNodes.map((node) => {
          const isOn = highlighted.includes(node.id);
          return (
            <li key={node.id} className={isOn ? "is-on" : undefined}>
              <button
                type="button"
                className={`iv3-gc-rail-node${selected === node.id ? " is-selected" : ""}`}
                aria-pressed={selected === node.id}
                onClick={() => {
                  setSelected((prev) => (prev === node.id ? null : node.id));
                  trackInvestorEvent("roadmap_engaged", { stage: node.id });
                }}
                onKeyDown={onKey(node.id)}
              >
                <span className="iv3-gc-rail-dot" aria-hidden="true" />
                <span>{t(node.label, locale)}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <EvidenceGate locale={locale} emphasized={selected === "evidence" || selected === "seed"} />

      {detailStage || selected === "evidence" || selected === "today" ? (
        <div className="iv3-gc-stage-detail" aria-live="polite">
          {selected === "today" ? (
            <p>{t(copy.todayLead, locale)}</p>
          ) : selected === "evidence" ? (
            <p>{t(copy.evidenceGateLead, locale)}</p>
          ) : detailStage ? (
            <>
              <h4>{t(detailStage.short, locale)}</h4>
              <p>{t(detailStage.objective, locale)}</p>
              <p className="iv3-gc-muted">{t(detailStage.unlocks, locale)}</p>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function EvidenceGate({
  locale,
  emphasized,
}: {
  locale: LocaleCode;
  emphasized?: boolean;
}) {
  return (
    <aside
      className={`iv3-gc-evidence-gate${emphasized ? " is-emphasized" : ""}`}
      aria-label={t(copy.evidenceGateTitle, locale)}
    >
      <h4>{t(copy.evidenceGateTitle, locale)}</h4>
      <p>{t(copy.evidenceGateLead, locale)}</p>
      <ul>
        {copy.evidenceCategories.map((c) => (
          <li key={c.en}>{t(c, locale)}</li>
        ))}
      </ul>
    </aside>
  );
}

function FinancialScenarioExplorer({
  locale,
  isDev,
}: {
  locale: LocaleCode;
  isDev: boolean;
}) {
  const [scenario, setScenario] = useState<ScenarioId>("base");
  const tabId = useId();
  const active = growthScenarios.find((s) => s.id === scenario)!;

  return (
    <section className="iv3-gc-scenarios" aria-labelledby={`${tabId}-title`}>
      <h3 className="iv3-gc-h" id={`${tabId}-title`}>
        {t(copy.scenariosTitle, locale)}
      </h3>
      <p className="iv3-gc-lead">{t(copy.scenariosSubtitle, locale)}</p>
      <p className="iv2-disclosure">{t(copy.formulaLead, locale)}</p>

      <div className="iv3-gc-scenario-tabs" role="tablist" aria-label={t(copy.scenariosTitle, locale)}>
        {growthScenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`${tabId}-${s.id}`}
            aria-selected={scenario === s.id}
            className={scenario === s.id ? "is-active" : undefined}
            onClick={() => {
              setScenario(s.id);
              trackInvestorEvent("architecture_diagram_engaged", { scenario: s.id });
            }}
          >
            {t(s.title, locale)}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        aria-labelledby={`${tabId}-${scenario}`}
        className="iv3-gc-scenario-panel"
      >
        <p className="iv3-gc-scenario-summary">{t(active.summary, locale)}</p>
        <p className="iv2-disclosure">{t(copy.chartLegendIllustrative, locale)}</p>

        <dl className="iv3-gc-driver-grid">
          {scenarioDrivers.map((driver) => {
            const figId = driver.figureIds[scenario];
            const figure = figId ? getInvestorFigure(figId) : undefined;
            const formatted = formatPublicFigure(figure, locale, copy.founderInputRequired);
            return (
              <div key={driver.id}>
                <dt>
                  {t(driver.label, locale)}
                  {driver.status === "future" ? (
                    <span className="iv3-gc-pill">
                      {locale === "vi" ? "Tương lai" : "Future"}
                    </span>
                  ) : null}
                </dt>
                <dd>
                  <span data-figure-kind={formatted.kind}>{formatted.text}</span>
                  {formatted.showKindLabel ? (
                    <span className="iv3-gc-pill">{t(copy.chartLegendIllustrative, locale)}</span>
                  ) : null}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="iv3-gc-chart" role="img" aria-label={t(copy.chartEmpty, locale)}>
          <svg viewBox="0 0 320 120" className="iv3-gc-chart-svg" aria-hidden="true">
            <line x1="24" y1="100" x2="300" y2="100" className="iv3-gc-chart-axis" />
            <line x1="24" y1="16" x2="24" y2="100" className="iv3-gc-chart-axis" />
            <path
              className={`iv3-gc-chart-curve iv3-gc-chart-curve--${scenario}`}
              d={
                scenario === "foundation"
                  ? "M24 92 C 80 88, 140 82, 200 74 C 240 68, 280 62, 300 58"
                  : scenario === "opportunity"
                    ? "M24 92 C 70 80, 120 55, 180 40 C 230 28, 270 22, 300 16"
                    : "M24 92 C 80 84, 140 70, 200 55 C 240 46, 280 38, 300 32"
              }
            />
            <text x="28" y="14" className="iv3-gc-chart-label">
              {t(copy.chartLegendIllustrative, locale)}
            </text>
          </svg>
          <p className="iv3-gc-chart-empty">{t(copy.chartEmpty, locale)}</p>
        </div>

        {isDev ? (
          <p className="iv2-placeholder-note" data-dev-only="true">
            DEV: numeric drivers remain gated — do not publish invented values.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function ValueCreationLadder({ locale }: { locale: LocaleCode }) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const reduceMotion = useReducedMotion();
  return (
    <figure
      ref={ref}
      className={`iv3-gc-ladder${inView || reduceMotion ? " is-active" : ""}`}
      aria-label={t(copy.valueLadderTitle, locale)}
    >
      <figcaption className="iv3-gc-h">{t(copy.valueLadderTitle, locale)}</figcaption>
      <p className="iv3-gc-lead">{t(copy.valueLadderLead, locale)}</p>
      <ol className="iv3-gc-ladder-steps">
        {copy.valueLadderSteps.map((step, index) => (
          <li
            key={step.en}
            style={{ transitionDelay: reduceMotion ? "0ms" : `${index * 60}ms` }}
          >
            {t(step, locale)}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function FundraisingJourney({ locale }: { locale: LocaleCode }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="iv3-gc-fundraising" aria-label={t(copy.fundraisingTitle, locale)}>
      <h3 className="iv3-gc-h">{t(copy.fundraisingTitle, locale)}</h3>
      <p className="iv3-gc-lead">{t(copy.fundraisingLead, locale)}</p>
      <ol className="iv3-gc-fund-list">
        {copy.fundraisingStages.map((stage) => {
          const expanded = open === stage.id;
          return (
            <li key={stage.id}>
              <button
                type="button"
                className={`iv3-gc-fund-btn${expanded ? " is-open" : ""}`}
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : stage.id)}
              >
                {t(stage.title, locale)}
              </button>
              {expanded ? (
                <div className="iv3-gc-fund-detail">
                  <p>
                    <strong>{locale === "vi" ? "Mục đích: " : "Purpose: "}</strong>
                    {t(stage.purpose, locale)}
                  </p>
                  <p>
                    <strong>{locale === "vi" ? "Vốn khuếch đại: " : "Capital amplifies: "}</strong>
                    {t(stage.amplifies, locale)}
                  </p>
                  <p>
                    <strong>
                      {locale === "vi" ? "Bằng chứng trước khi tiến: " : "Evidence before proceeding: "}
                    </strong>
                    {t(stage.evidenceBefore, locale)}
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function SeedProposalCard({
  locale,
  isDev,
  onMaterials,
  onContact,
}: {
  locale: LocaleCode;
  isDev: boolean;
  onMaterials?: () => void;
  onContact?: () => void;
}) {
  const amount = resolvePublicFundingField("funding-target-amount");
  const instrument = resolvePublicFundingField("funding-round-type");
  const cap = resolvePublicFundingField("funding-valuation-cap");
  const runway = resolvePublicFundingField("funding-target-runway");
  const close = resolvePublicFundingField("funding-target-close");
  const hasAny = Boolean(amount || instrument || cap || runway || close);

  return (
    <aside className="iv3-gc-proposal" aria-label={t(copy.proposalTitle, locale)}>
      <h3 className="iv3-gc-h">{t(copy.proposalTitle, locale)}</h3>
      {hasAny ? (
        <div className="iv3-seed-terms">
          {amount ? (
            <div>
              <span>{locale === "vi" ? "Vòng seed" : "Seed round"}</span>
              <strong>{amount}</strong>
            </div>
          ) : null}
          {instrument ? (
            <div>
              <span>{locale === "vi" ? "Công cụ" : "Instrument"}</span>
              <strong>{instrument}</strong>
            </div>
          ) : null}
          {runway ? (
            <div>
              <span>{locale === "vi" ? "Runway mục tiêu" : "Target runway"}</span>
              <strong>{runway}</strong>
            </div>
          ) : null}
          {close ? (
            <div>
              <span>{locale === "vi" ? "Mục tiêu đóng" : "Target close"}</span>
              <strong>{close}</strong>
            </div>
          ) : null}
          {cap ? (
            <div>
              <span>Valuation / cap</span>
              <strong>{cap}</strong>
            </div>
          ) : null}
        </div>
      ) : (
        <p>
          {isDev
            ? "DEV: seed terms remain founder-gated — not shown as public facts."
            : t(copy.viaMaterials, locale)}
        </p>
      )}
      <p className="iv2-disclosure">{t(copy.disclosure, locale)}</p>
      <div className="iv3-gc-proposal-ctas">
        <a
          className="iv2-btn iv2-btn--primary"
          href="#resources"
          onClick={() => {
            onMaterials?.();
            trackInvestorEvent("investor_materials_cta", { source: "seed_proposal" });
          }}
        >
          {t(copy.proposalCtaMaterials, locale)}
        </a>
        <button
          type="button"
          className="iv2-btn iv2-btn--secondary"
          onClick={() => {
            onContact?.();
            trackInvestorEvent("founder_contact_clicked", { source: "seed_proposal" });
          }}
        >
          {t(copy.proposalCtaFounder, locale)}
        </button>
      </div>
    </aside>
  );
}

function PotentialInvestorOutcomes({ locale }: { locale: LocaleCode }) {
  return (
    <section className="iv3-gc-outcomes" aria-label={t(copy.outcomesTitle, locale)}>
      <h3 className="iv3-gc-h">{t(copy.outcomesTitle, locale)}</h3>
      <p className="iv2-disclosure">{t(copy.outcomesLead, locale)}</p>
      <ul className="iv3-gc-outcome-list">
        {copy.outcomes.map((o) => (
          <li key={o.id}>
            <strong>{t(o.title, locale)}</strong>
            <p>{t(o.body, locale)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function InvestmentSummaryJourney({
  locale,
  compact,
}: {
  locale: LocaleCode;
  compact?: boolean;
}) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const reduceMotion = useReducedMotion();
  const steps = compact ? copy.pitchJourneySteps : copy.summarySteps;
  const title = compact ? copy.pitchJourneyTitle : copy.summaryJourneyTitle;
  return (
    <figure
      ref={ref}
      className={`iv3-gc-summary${compact ? " iv3-gc-summary--pitch" : ""}${inView || reduceMotion ? " is-active" : ""}`}
      aria-label={t(title, locale)}
    >
      <figcaption className="iv3-gc-h">{t(title, locale)}</figcaption>
      <ol className="iv3-gc-summary-steps">
        {steps.map((step, index) => (
          <li
            key={step.en}
            style={{ transitionDelay: reduceMotion ? "0ms" : `${index * 70}ms` }}
          >
            {t(step, locale)}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function LeverageMirror({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-gc-leverage" aria-label={t(copy.leverageMirrorTitle, locale)}>
      <figcaption className="iv3-visual-kicker">{t(copy.leverageMirrorTitle, locale)}</figcaption>
      <p>{t(copy.leverageMirrorLead, locale)}</p>
    </figure>
  );
}

/**
 * Pitch-surface Growth & Capital Journey — one principal mechanism.
 * Full scenario/fundraising/outcome detail stays in DEV or diligence.
 */
export function GrowthCapitalJourney({
  locale,
  isDev,
  onContact,
  variant = "pitch",
}: {
  locale: LocaleCode;
  isDev: boolean;
  onContact?: () => void;
  /** pitch = public compressed; full = DEV / diligence */
  variant?: "pitch" | "full";
}) {
  const openContact = useCallback(() => {
    onContact?.();
  }, [onContact]);
  const showDeep = variant === "full";

  return (
    <div
      className={`iv3-gc${variant === "pitch" ? " iv3-gc--pitch" : ""}`}
      aria-label={t(copy.sectionEyebrow, locale)}
    >
      {variant === "pitch" ? <SeedPropositionPanel locale={locale} /> : <InvestmentSummaryJourney locale={locale} />}
      {variant === "full" ? <SeedCapitalFlowCompact locale={locale} /> : null}
      {variant === "full" ? <EvidenceRow locale={locale} /> : null}
      {showDeep ? (
        <>
          <CardbeyTodaySnapshot locale={locale} />
          <LeverageMirror locale={locale} />
          <SeedCapitalFlow locale={locale} />
          <CompanyStageTimeline locale={locale} />
          <ValueCreationLadder locale={locale} />
          {(listPublicInvestorFigures().length > 0) ? (
            <FinancialScenarioExplorer locale={locale} isDev={isDev} />
          ) : isDev ? (
            <p className="iv2-placeholder-note" data-dev-only="true">
              DEV: illustrative scenario numbers stay gated until founder-approved public figures exist.
            </p>
          ) : null}
          <FundraisingJourney locale={locale} />
          <SeedProposalCard locale={locale} isDev={isDev} onContact={openContact} />
          <PotentialInvestorOutcomes locale={locale} />
        </>
      ) : (
        <p className="iv3-gc-deep-link">
          <a href="#diligence">{t(seedPropositionCopy.diligenceLink, locale)}</a>
        </p>
      )}
      <p className="iv2-disclosure">{t(copy.disclosure, locale)}</p>
    </div>
  );
}

function SeedCapitalFlowCompact({ locale }: { locale: LocaleCode }) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const reduceMotion = useReducedMotion();
  const active = inView || reduceMotion;
  const destinations =
    locale === "vi"
      ? [
          { title: "Người / Thực thi", outcome: "Năng lực giao" },
          { title: "Thị trường / Chấp nhận", outcome: "Doanh nghiệp thật" },
          { title: "Nền tảng / Năng lực", outcome: "Đường lặp lại" },
        ]
      : [
          { title: "People / Execution", outcome: "Delivery capacity" },
          { title: "Market / Adoption", outcome: "Real businesses" },
          { title: "Platform / Capability", outcome: "Repeatable pathways" },
        ];

  return (
    <figure
      ref={ref}
      className={`iv3-gc-flow iv3-gc-flow--compact${active ? " is-active" : ""}`}
      aria-label={t(copy.capitalFlowTitle, locale)}
    >
      <figcaption className="iv3-visual-kicker">
        {locale === "vi" ? "Vốn seed nhằm làm gì" : "What seed capital is for"}
      </figcaption>
      <div className="iv3-gc-flow-diagram">
        <div className="iv3-gc-flow-hub">{t(copy.capitalHub, locale)}</div>
        <div className="iv3-gc-flow-destinations" role="list">
          {destinations.map((dest, index) => (
            <div
              key={dest.title}
              className="iv3-gc-flow-dest"
              role="listitem"
              style={{ transitionDelay: reduceMotion ? "0ms" : `${100 + index * 120}ms` }}
            >
              <strong>{dest.title}</strong>
              <span>{dest.outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

function EvidenceRow({ locale }: { locale: LocaleCode }) {
  return (
    <aside className="iv3-gc-evidence-row" aria-label={t(copy.evidenceGateTitle, locale)}>
      <h3 className="iv3-gc-h">{t(copy.evidenceGateTitle, locale)}</h3>
      <p className="iv3-gc-lead">{t(copy.evidenceGateLead, locale)}</p>
      <ul className="iv3-gc-evidence-pills">
        {copy.evidenceCategories.map((c) => (
          <li key={c.en}>{t(c, locale)}</li>
        ))}
      </ul>
    </aside>
  );
}

export {
  CardbeyTodaySnapshot,
  SeedCapitalFlow,
  CompanyStageTimeline,
  EvidenceGate,
  FinancialScenarioExplorer,
  ValueCreationLadder,
  FundraisingJourney,
  SeedProposalCard,
  PotentialInvestorOutcomes,
  InvestmentSummaryJourney,
};
