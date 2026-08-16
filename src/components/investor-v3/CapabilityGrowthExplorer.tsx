import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { LocaleCode, ProductCapability } from "@/content/investor";
import { t } from "@/content/investor";
import { ProductStatusBadge } from "@/components/investor-v2/badges";
import {
  capabilityGrowthBranches,
  capabilityGrowthCopy as copy,
  capabilityGrowthSpine,
  findBranch,
  findNode,
  type CapabilityTreeNode,
} from "@/content/investor/v3/capabilityGrowthTree";
import { trackInvestorEvent } from "@/lib/analytics";

export type CameraView =
  | "start"
  | "expanded"
  | "performer"
  | "promotion"
  | "devices"
  | "structure"
  | "full";

const BRANCH_VIEWS: CameraView[] = [
  "performer",
  "promotion",
  "devices",
  "structure",
];

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

function useDesktopLayout() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);
  return desktop;
}

function stepFromView(view: CameraView): 1 | 2 | 3 | 4 {
  if (view === "start") return 1;
  if (view === "expanded") return 2;
  if (view === "full") return 4;
  return 3;
}

function slideIndex(view: CameraView): number {
  if (view === "start") return 0;
  if (view === "expanded") return 1;
  if (view === "full") return 3;
  return 2;
}

type Props = {
  locale: LocaleCode;
  capabilities: ProductCapability[];
};

/**
 * Fixed-viewport capability explorer.
 * One connected world; camera slides horizontally through progressive states.
 */
export function CapabilityGrowthExplorer({ locale, capabilities }: Props) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useDesktopLayout();
  const titleId = useId();
  const panelId = useId();
  const byId = useMemo(
    () => new Map(capabilities.map((c) => [c.id, c])),
    [capabilities]
  );

  const [view, setView] = useState<CameraView>("start");
  const [selectedId, setSelectedId] = useState<string>("storefront");
  const [focusBranch, setFocusBranch] = useState<string>("performer");
  const [dragPx, setDragPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    lastX: number;
    axis: "undecided" | "x" | "y";
    fromUi: boolean;
  } | null>(null);

  const step = stepFromView(view);
  const isFull = view === "full";
  const isFocus = BRANCH_VIEWS.includes(view);
  const activeBranchId = isFocus ? view : focusBranch;
  const slide = slideIndex(view);

  const goView = useCallback(
    (next: CameraView, opts?: { select?: string }) => {
      setDragPx(0);
      setDragging(false);
      setView(next);
      trackInvestorEvent("capability_tree_step", { step: stepFromView(next) });
      if (next === "start") {
        setSelectedId(opts?.select ?? "storefront");
        return;
      }
      if (next === "expanded") {
        setSelectedId(opts?.select ?? "cardbey");
        return;
      }
      if (next === "full") {
        setSelectedId(opts?.select ?? "cardbey");
        trackInvestorEvent("capability_tree_view_all", { step: 4 });
        return;
      }
      setFocusBranch(next);
      setSelectedId(opts?.select ?? next);
      trackInvestorEvent("capability_tree_expand", { nodeId: next });
    },
    []
  );

  const goStep = (n: 1 | 2 | 3 | 4) => {
    if (n === 1) goView("start");
    else if (n === 2) goView("expanded");
    else if (n === 3)
      goView((BRANCH_VIEWS.includes(view) ? view : focusBranch) as CameraView);
    else goView("full");
  };

  const canPrev = view !== "start";
  const canNext = view !== "full";

  const goPrev = useCallback(() => {
    if (view === "full") goView(focusBranch as CameraView);
    else if (BRANCH_VIEWS.includes(view)) goView("expanded");
    else if (view === "expanded") goView("start");
  }, [view, focusBranch, goView]);

  const goNext = useCallback(() => {
    if (view === "start") goView("expanded");
    else if (view === "expanded") goView(focusBranch as CameraView);
    else if (BRANCH_VIEWS.includes(view)) goView("full");
  }, [view, focusBranch, goView]);

  const reset = () => goView("start");

  const toggleFull = () => {
    if (isFull) goView(focusBranch as CameraView);
    else goView("full");
  };

  const enterBranch = (id: string) => {
    if (!BRANCH_VIEWS.includes(id as CameraView)) return;
    goView(id as CameraView);
    trackInvestorEvent("capability_tree_select", { nodeId: id });
  };

  const selectNode = (id: string) => {
    // On start, Storefront continues the carousel to the right.
    if (view === "start" && id === "storefront") {
      goView("expanded", { select: "storefront" });
      trackInvestorEvent("capability_tree_select", { nodeId: id });
      return;
    }
    setSelectedId(id);
    trackInvestorEvent("capability_tree_select", { nodeId: id });
    const found = findNode(id);
    if (found?.parentId && BRANCH_VIEWS.includes(found.parentId as CameraView)) {
      setFocusBranch(found.parentId);
      if (view === "expanded" || view === "start") {
        goView(found.parentId as CameraView, { select: id });
      }
    } else if (BRANCH_VIEWS.includes(id as CameraView)) {
      enterBranch(id);
    }
  };

  const lineage = lineageFor(selectedId);
  const selectedMeta = resolveSelection(selectedId, byId, locale);

  const onKeyNav = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowRight" && canNext) {
      event.preventDefault();
      goNext();
    }
    if (event.key === "ArrowLeft" && canPrev) {
      event.preventDefault();
      goPrev();
    }
  };

  const endDrag = (clientX: number) => {
    const state = dragRef.current;
    dragRef.current = null;
    if (!state || state.fromUi || state.axis === "y") {
      setDragging(false);
      setDragPx(0);
      return;
    }
    const dx = clientX - state.startX;
    const width = viewportRef.current?.clientWidth || 1;
    const threshold = Math.min(72, width * 0.14);
    setDragging(false);
    setDragPx(0);
    if (dx <= -threshold && canNext) goNext();
    else if (dx >= threshold && canPrev) goPrev();
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement | null;
    const fromUi = Boolean(
      target?.closest(
        "button, a, input, textarea, select, label, .iv3-cge-edge, .iv3-cge-detail"
      )
    );
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      axis: "undecided",
      fromUi,
    };
    if (!fromUi) {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragRef.current;
    if (!state || state.pointerId !== e.pointerId || state.fromUi) return;
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    if (state.axis === "undecided") {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      state.axis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
      if (state.axis === "y") return;
      setDragging(true);
    }
    if (state.axis !== "x") return;
    e.preventDefault();
    state.lastX = e.clientX;
    const width = viewportRef.current?.clientWidth || 1;
    let next = dx;
    if (!canPrev && next > 0) next *= 0.28;
    if (!canNext && next < 0) next *= 0.28;
    next = Math.max(-width * 0.45, Math.min(width * 0.45, next));
    setDragPx(next);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== e.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      /* ignore */
    }
    endDrag(e.clientX);
  };

  const onPointerCancel = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    setDragPx(0);
  };

  const worldTransform =
    dragPx !== 0
      ? `translate3d(calc(-${slide * 25}% + ${dragPx}px), 0, 0)`
      : `translate3d(-${slide * 25}%, 0, 0)`;

  const rail = [
    { id: 1 as const, label: t(copy.railStart, locale) },
    { id: 2 as const, label: t(copy.railExpand, locale) },
    { id: 3 as const, label: t(copy.railExplore, locale) },
    { id: 4 as const, label: t(copy.railSystem, locale) },
  ];

  return (
    <>
      <p className="iv3-real-evidence-headline" style={{ marginBottom: "0.35rem" }}>
        {locale === "vi"
          ? "Tầm nhìn đã có điểm khởi đầu."
          : "The vision already has a starting point."}
      </p>
      <p className="iv3-cge-bridge">
        {t(copy.uspBridge, locale)}{" "}
        <a href="#missing-layer">{t(copy.uspLink, locale)}</a>
      </p>
      <section
        className={`iv3-cge${reduceMotion ? " iv3-cge--reduced" : ""} iv3-cge--view-${view}`}
        aria-labelledby={titleId}
        onKeyDown={onKeyNav}
      >
        <p className="iv2-sr-only" id={titleId}>
          {t(copy.srSummary, locale)}
        </p>

        <div className="iv3-cge-frame">
          <header className="iv3-cge-header">
            <div>
              <h3 className="iv3-cge-title">{t(copy.frameTitle, locale)}</h3>
              <p className="iv3-cge-subtitle">{t(copy.frameSubtitle, locale)}</p>
            </div>
            <div className="iv3-cge-toolbar">
              <button type="button" className="iv3-cge-tool" onClick={reset}>
                {t(copy.reset, locale)}
              </button>
              <button type="button" className="iv3-cge-tool" onClick={toggleFull}>
                {isFull ? t(copy.collapse, locale) : t(copy.viewAll, locale)}
              </button>
            </div>
          </header>

          <p className="iv3-cge-entry-kicker">{t(copy.entryKicker, locale)}</p>
          <ul className="iv3-cge-entries">
            <li>
              <strong>{t(copy.entryATitle, locale)}</strong>
              <span>{t(copy.entryABody, locale)}</span>
            </li>
            <li>
              <strong>{t(copy.entryBTitle, locale)}</strong>
              <span>{t(copy.entryBBody, locale)}</span>
            </li>
          </ul>
          <p className="iv3-cge-converge">{t(copy.entryConverge, locale)}</p>

          <nav className="iv3-cge-rail" aria-label={t(copy.frameTitle, locale)}>
            <div className="iv3-cge-rail-track" aria-hidden="true">
              <span
                className="iv3-cge-rail-fill"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
            <ol className="iv3-cge-rail-steps">
              {rail.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    className={`iv3-cge-rail-step${step === r.id ? " is-current" : ""}${step > r.id ? " is-done" : ""}`}
                    aria-current={step === r.id ? "step" : undefined}
                    onClick={() => goStep(r.id)}
                  >
                    <span className="iv3-cge-rail-dot" aria-hidden="true" />
                    {r.label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          {/* Desktop: fixed viewport + horizontal world */}
          <div
            ref={viewportRef}
            className={`iv3-cge-viewport iv3-cge-viewport--desktop${dragging ? " is-dragging" : ""}`}
            hidden={!isDesktop}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            <button
              type="button"
              className="iv3-cge-edge iv3-cge-edge--prev"
              aria-label={t(copy.previous, locale)}
              disabled={!canPrev}
              onClick={goPrev}
            >
              ‹
            </button>
            <button
              type="button"
              className="iv3-cge-edge iv3-cge-edge--next"
              aria-label={t(copy.next, locale)}
              disabled={!canNext}
              onClick={goNext}
            >
              ›
            </button>

            <div className="iv3-cge-mask" aria-hidden="true" />

            <div
              className="iv3-cge-world"
              data-slide={slide}
              style={{
                transform: worldTransform,
                transition: dragging || reduceMotion ? "none" : undefined,
              }}
            >
              {/* Slide 0 — Start */}
              <div
                className="iv3-cge-slide"
                data-slide="start"
                aria-hidden={slide !== 0}
              >
                <div className="iv3-cge-panel iv3-cge-panel--start">
                  <SpineRow
                    locale={locale}
                    lineage={lineage}
                    selectedId={selectedId}
                    onSelect={selectNode}
                    growLabel={t(copy.growCta, locale)}
                    onGrow={() => goView("expanded")}
                    showGrow
                  />
                </div>
              </div>

              {/* Slide 1 — Expand */}
              <div
                className="iv3-cge-slide"
                data-slide="expanded"
                aria-hidden={slide !== 1}
              >
                <div className="iv3-cge-panel iv3-cge-panel--expand">
                  <div className="iv3-cge-expand-spine">
                    <SpineRow
                      locale={locale}
                      lineage={lineage}
                      selectedId={selectedId}
                      onSelect={selectNode}
                      compact
                    />
                  </div>
                  <svg className="iv3-cge-expand-join" viewBox="0 0 48 200" aria-hidden="true">
                    <path
                      className={`iv3-cge-path${view === "expanded" || isFocus || isFull ? " is-on" : ""}`}
                      d="M8 100 H28 M28 40 V160 M28 40 H44 M28 80 H44 M28 120 H44 M28 160 H44"
                    />
                  </svg>
                  <div className="iv3-cge-branch-stack" role="group">
                    {capabilityGrowthBranches.map((branch, index) => {
                      const cap = branch.capabilityId
                        ? byId.get(branch.capabilityId)
                        : undefined;
                      const onPath = lineage.has(branch.id);
                      return (
                        <button
                          key={branch.id}
                          type="button"
                          className={`iv3-cge-cap${selectedId === branch.id || activeBranchId === branch.id ? " is-active" : ""}${onPath ? " is-line" : ""}`}
                          style={{
                            transitionDelay: reduceMotion ? "0ms" : `${index * 70}ms`,
                          }}
                          onClick={() => enterBranch(branch.id)}
                        >
                          <strong>{t(branch.label, locale)}</strong>
                          {branch.purpose ? (
                            <span>{t(branch.purpose, locale)}</span>
                          ) : null}
                          {cap ? (
                            <ProductStatusBadge status={cap.status} locale={locale} />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Slide 2 — Branch focus */}
              <div
                className="iv3-cge-slide"
                data-slide="focus"
                aria-hidden={slide !== 2}
              >
                <FocusPanel
                  locale={locale}
                  branchId={activeBranchId}
                  byId={byId}
                  selectedId={selectedId}
                  lineage={lineage}
                  onSelect={selectNode}
                  onHub={() => goView("expanded")}
                  reduceMotion={reduceMotion}
                />
              </div>

              {/* Slide 3 — Full system */}
              <div
                className="iv3-cge-slide"
                data-slide="full"
                aria-hidden={slide !== 3}
              >
                <FullSystemPanel
                  locale={locale}
                  selectedId={selectedId}
                  lineage={lineage}
                  onSelect={selectNode}
                  reduceMotion={reduceMotion}
                />
              </div>
            </div>

            <aside
              className={`iv3-cge-detail${selectedMeta ? " is-open" : ""}`}
              id={panelId}
              aria-live="polite"
            >
              {selectedMeta ? (
                <>
                  <div className="iv3-cge-detail-head">
                    <h4>{selectedMeta.title}</h4>
                    {selectedMeta.status ? (
                      <ProductStatusBadge status={selectedMeta.status} locale={locale} />
                    ) : null}
                  </div>
                  {selectedMeta.description ? <p>{selectedMeta.description}</p> : null}
                  <p className="iv3-cge-why">
                    <strong>{t(copy.whyItMatters, locale)}</strong>
                    {" — "}
                    {t(copy.whyDefault, locale)}
                  </p>
                  {selectedMeta.evidenceHref ? (
                    <a
                      className="iv3-cge-evidence"
                      href={selectedMeta.evidenceHref}
                      onClick={() =>
                        trackInvestorEvent("capability_tree_evidence_open", {
                          nodeId: selectedId,
                        })
                      }
                    >
                      {t(copy.viewEvidence, locale)}
                    </a>
                  ) : null}
                </>
              ) : null}
            </aside>
          </div>

          {/* Mobile: vertical progression */}
          <div className="iv3-cge-viewport iv3-cge-viewport--mobile" hidden={isDesktop}>
            <MobileProgression
              locale={locale}
              view={view}
              step={step}
              byId={byId}
              selectedId={selectedId}
              focusBranch={activeBranchId}
              onGrow={() => goView("expanded")}
              onEnterBranch={enterBranch}
              onSelect={selectNode}
              onStep={goStep}
              selectedMeta={selectedMeta}
              panelId={panelId}
            />
          </div>
        </div>

        <p className="iv3-cge-closing">{t(copy.closing, locale)}</p>
      </section>
    </>
  );
}

function SpineRow({
  locale,
  lineage,
  selectedId,
  onSelect,
  growLabel,
  onGrow,
  showGrow,
  compact,
}: {
  locale: LocaleCode;
  lineage: Set<string>;
  selectedId: string;
  onSelect: (id: string) => void;
  growLabel?: string;
  onGrow?: () => void;
  showGrow?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`iv3-cge-spine${compact ? " is-compact" : ""}`}>
      <NodeChip
        level="root"
        label={t(capabilityGrowthSpine.business.label, locale)}
        hint={compact ? undefined : t(copy.businessHint, locale)}
        active={lineage.has("business") || selectedId === "business"}
        onClick={() => onSelect("business")}
      />
      <Arrow active={lineage.has("cardbey")} />
      <div className="iv3-cge-hub">
        <NodeChip
          level="root"
          hub
          label={t(capabilityGrowthSpine.cardbey.label, locale)}
          hint={compact ? undefined : t(copy.cardbeyHint, locale)}
          active={lineage.has("cardbey") || selectedId === "cardbey"}
          onClick={() => onSelect("cardbey")}
        />
        {showGrow && growLabel && onGrow ? (
          <button type="button" className="iv3-cge-grow" onClick={onGrow}>
            + {growLabel}
          </button>
        ) : null}
      </div>
      <Arrow active={lineage.has("storefront")} />
      <NodeChip
        level="root"
        label={t(capabilityGrowthSpine.storefront.label, locale)}
        hint={compact ? undefined : t(copy.storefrontHint, locale)}
        active={lineage.has("storefront") || selectedId === "storefront"}
        onClick={() => onSelect("storefront")}
      />
    </div>
  );
}

function FocusPanel({
  locale,
  branchId,
  byId,
  selectedId,
  lineage,
  onSelect,
  onHub,
  reduceMotion,
}: {
  locale: LocaleCode;
  branchId: string;
  byId: Map<string, ProductCapability>;
  selectedId: string;
  lineage: Set<string>;
  onSelect: (id: string) => void;
  onHub: () => void;
  reduceMotion: boolean;
}) {
  const branch = findBranch(branchId) || capabilityGrowthBranches[0];
  const cap = branch.capabilityId ? byId.get(branch.capabilityId) : undefined;

  return (
    <div className="iv3-cge-panel iv3-cge-panel--focus">
      <button type="button" className="iv3-cge-peek-hub" onClick={onHub}>
        <span>{t(capabilityGrowthSpine.cardbey.label, locale)}</span>
      </button>
      <svg className="iv3-cge-focus-link" viewBox="0 0 64 24" aria-hidden="true">
        <path className="iv3-cge-path is-on" d="M2 12 H50" />
        <polygon className="is-on" points="48,7 58,12 48,17" />
      </svg>
      <div className="iv3-cge-focus-main">
        <button
          type="button"
          className={`iv3-cge-cap iv3-cge-cap--lg is-active${lineage.has(branch.id) ? " is-line" : ""}`}
          onClick={() => onSelect(branch.id)}
        >
          <strong>{t(branch.label, locale)}</strong>
          {branch.purpose ? <span>{t(branch.purpose, locale)}</span> : null}
          {cap ? <ProductStatusBadge status={cap.status} locale={locale} /> : null}
        </button>
        <svg className="iv3-cge-child-join" viewBox="0 0 40 160" aria-hidden="true">
          <path
            className="iv3-cge-path is-on"
            d="M8 80 H22 M22 24 V136 M22 24 H36 M22 56 H36 M22 104 H36 M22 136 H36"
          />
        </svg>
        <ul className="iv3-cge-child-col">
          {(branch.children || []).map((child, i) => (
            <li
              key={child.id}
              style={{
                transitionDelay: reduceMotion ? "0ms" : `${80 + i * 70}ms`,
              }}
            >
              <button
                type="button"
                className={`iv3-cge-child${selectedId === child.id ? " is-selected" : ""}${lineage.has(child.id) ? " is-line" : ""}`}
                onClick={() => onSelect(child.id)}
              >
                {t(child.label, locale)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FullSystemPanel({
  locale,
  selectedId,
  lineage,
  onSelect,
  reduceMotion,
}: {
  locale: LocaleCode;
  selectedId: string;
  lineage: Set<string>;
  onSelect: (id: string) => void;
  reduceMotion: boolean;
}) {
  return (
    <div className="iv3-cge-panel iv3-cge-panel--full">
      <div className="iv3-cge-full-spine">
        <NodeChip
          level="root"
          compact
          label={t(capabilityGrowthSpine.business.label, locale)}
          active={lineage.has("business")}
          onClick={() => onSelect("business")}
        />
        <Arrow active />
        <NodeChip
          level="root"
          compact
          hub
          label={t(capabilityGrowthSpine.cardbey.label, locale)}
          active={lineage.has("cardbey")}
          onClick={() => onSelect("cardbey")}
        />
        <Arrow active={lineage.has("storefront")} />
        <NodeChip
          level="root"
          compact
          label={t(capabilityGrowthSpine.storefront.label, locale)}
          active={lineage.has("storefront")}
          onClick={() => onSelect("storefront")}
        />
      </div>
      <div className="iv3-cge-full-grid">
        {capabilityGrowthBranches.map((branch, bi) => {
          const onPath = lineage.has(branch.id);
          return (
            <div
              key={branch.id}
              className={`iv3-cge-full-branch${onPath ? " is-line" : ""}`}
              style={{
                transitionDelay: reduceMotion ? "0ms" : `${bi * 60}ms`,
              }}
            >
              <button
                type="button"
                className={`iv3-cge-cap iv3-cge-cap--sm${selectedId === branch.id ? " is-active" : ""}${onPath ? " is-line" : ""}`}
                onClick={() => onSelect(branch.id)}
              >
                <strong>{t(branch.label, locale)}</strong>
              </button>
              <ul>
                {(branch.children || []).map((child) => (
                  <li key={child.id}>
                    <button
                      type="button"
                      className={`iv3-cge-child iv3-cge-child--sm${selectedId === child.id ? " is-selected" : ""}${lineage.has(child.id) ? " is-line" : ""}`}
                      onClick={() => onSelect(child.id)}
                    >
                      {t(child.label, locale)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileProgression({
  locale,
  view,
  step,
  byId,
  selectedId,
  focusBranch,
  onGrow,
  onEnterBranch,
  onSelect,
  onStep,
  selectedMeta,
  panelId,
}: {
  locale: LocaleCode;
  view: CameraView;
  step: number;
  byId: Map<string, ProductCapability>;
  selectedId: string;
  focusBranch: string;
  onGrow: () => void;
  onEnterBranch: (id: string) => void;
  onSelect: (id: string) => void;
  onStep: (n: 1 | 2 | 3 | 4) => void;
  selectedMeta: ReturnType<typeof resolveSelection>;
  panelId: string;
}) {
  const branch = findBranch(focusBranch);
  const showBranches = step >= 2;
  const showFocus = step === 3 && branch;
  const showFull = step === 4;

  return (
    <div className="iv3-cge-mobile">
      <ol className="iv3-cge-mobile-spine">
        <li>
          <button type="button" className="iv3-cge-cap" onClick={() => onSelect("business")}>
            <strong>{t(capabilityGrowthSpine.business.label, locale)}</strong>
          </button>
        </li>
        <li className="iv3-cge-mobile-arrow" aria-hidden="true">
          ↓
        </li>
        <li>
          <button
            type="button"
            className="iv3-cge-cap is-hub"
            onClick={() => {
              onSelect("cardbey");
              if (view === "start") onGrow();
            }}
          >
            <strong>{t(capabilityGrowthSpine.cardbey.label, locale)}</strong>
          </button>
          {step === 1 ? (
            <button type="button" className="iv3-cge-grow" onClick={onGrow}>
              + {t(copy.growCta, locale)}
            </button>
          ) : null}
        </li>
        <li className="iv3-cge-mobile-arrow" aria-hidden="true">
          ↓
        </li>
        <li>
          <button type="button" className="iv3-cge-cap" onClick={() => onSelect("storefront")}>
            <strong>{t(capabilityGrowthSpine.storefront.label, locale)}</strong>
          </button>
        </li>
      </ol>

      {showBranches && !showFocus && !showFull ? (
        <ul className="iv3-cge-mobile-branches">
          {capabilityGrowthBranches.map((b) => {
            const cap = b.capabilityId ? byId.get(b.capabilityId) : undefined;
            return (
              <li key={b.id}>
                <button type="button" className="iv3-cge-cap" onClick={() => onEnterBranch(b.id)}>
                  <strong>{t(b.label, locale)}</strong>
                  {cap ? <ProductStatusBadge status={cap.status} locale={locale} /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {showFocus && branch ? (
        <div className="iv3-cge-mobile-focus">
          <button type="button" className="iv3-cge-cap is-active" onClick={() => onSelect(branch.id)}>
            <strong>{t(branch.label, locale)}</strong>
          </button>
          <ul>
            {(branch.children || []).map((child) => (
              <li key={child.id}>
                <button
                  type="button"
                  className={`iv3-cge-child${selectedId === child.id ? " is-selected" : ""}`}
                  onClick={() => onSelect(child.id)}
                >
                  {t(child.label, locale)}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="iv3-cge-tool" onClick={() => onStep(2)}>
            {t(copy.previous, locale)}
          </button>
        </div>
      ) : null}

      {showFull ? (
        <div className="iv3-cge-mobile-full">
          {capabilityGrowthBranches.map((b) => (
            <div key={b.id}>
              <button type="button" className="iv3-cge-cap iv3-cge-cap--sm" onClick={() => onSelect(b.id)}>
                <strong>{t(b.label, locale)}</strong>
              </button>
              <ul>
                {(b.children || []).map((c) => (
                  <li key={c.id}>
                    <button type="button" className="iv3-cge-child iv3-cge-child--sm" onClick={() => onSelect(c.id)}>
                      {t(c.label, locale)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      {selectedMeta ? (
        <aside className="iv3-cge-detail is-open" id={panelId} aria-live="polite">
          <div className="iv3-cge-detail-head">
            <h4>{selectedMeta.title}</h4>
            {selectedMeta.status ? (
              <ProductStatusBadge status={selectedMeta.status} locale={locale} />
            ) : null}
          </div>
          {selectedMeta.description ? <p>{selectedMeta.description}</p> : null}
          {selectedMeta.evidenceHref ? (
            <a className="iv3-cge-evidence" href={selectedMeta.evidenceHref}>
              {t(copy.viewEvidence, locale)}
            </a>
          ) : null}
        </aside>
      ) : null}
    </div>
  );
}

function NodeChip({
  label,
  hint,
  level,
  hub,
  active,
  compact,
  onClick,
}: {
  label: string;
  hint?: string;
  level: "root" | "primary" | "child";
  hub?: boolean;
  active?: boolean;
  compact?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`iv3-cge-node iv3-cge-node--${level}${hub ? " is-hub" : ""}${active ? " is-active" : ""}${compact ? " is-compact" : ""}`}
      onClick={onClick}
    >
      <strong>{label}</strong>
      {hint ? <span>{hint}</span> : null}
    </button>
  );
}

function Arrow({ active }: { active?: boolean }) {
  return (
    <svg className="iv3-cge-arrow" viewBox="0 0 40 20" aria-hidden="true" focusable="false">
      <path className={active ? "is-on" : undefined} d="M2 10 H30" />
      <polygon className={active ? "is-on" : undefined} points="28,5 38,10 28,15" />
    </svg>
  );
}

function lineageFor(id: string | null): Set<string> {
  const set = new Set<string>(["business", "cardbey"]);
  if (!id) {
    set.add("storefront");
    return set;
  }
  if (id === "business" || id === "cardbey") {
    set.add(id);
    set.add("storefront");
    return set;
  }
  if (id === "storefront") {
    set.add("storefront");
    return set;
  }
  const found = findNode(id);
  if (!found) return set;
  if (found.parentId) {
    set.add(found.parentId);
    set.add(id);
  } else {
    set.add(id);
  }
  set.add("storefront");
  return set;
}

function resolveSelection(
  selectedId: string | null,
  byId: Map<string, ProductCapability>,
  locale: LocaleCode
): {
  title: string;
  description?: string;
  status?: ProductCapability["status"];
  evidenceHref?: string;
} | null {
  if (!selectedId) return null;
  if (selectedId === "business") {
    return {
      title: t(capabilityGrowthSpine.business.label, locale),
      description: t(copy.businessHint, locale),
    };
  }
  if (selectedId === "cardbey") {
    return {
      title: t(capabilityGrowthSpine.cardbey.label, locale),
      description: t(copy.cardbeyHint, locale),
      evidenceHref: "#diligence",
    };
  }
  const found = findNode(selectedId);
  if (!found) return null;
  const cap = found.node.capabilityId ? byId.get(found.node.capabilityId) : undefined;
  return {
    title: t(found.node.label, locale),
    description: cap
      ? t(cap.shortDescription, locale)
      : found.node.purpose
        ? t(found.node.purpose, locale)
        : undefined,
    status: cap?.status,
    evidenceHref: found.node.evidenceHref || "#diligence",
  };
}

export type { CapabilityTreeNode };
