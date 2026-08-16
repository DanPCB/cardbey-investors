import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import { seedQuarters } from "@/content/investor/v3/seedProposition";
import {
  futureNodes,
  investorTrackItems,
  networkPoints,
  seedBandChips,
  successBranches,
  successEquationParts,
  successLiquidityOutcomes,
  successPathCopy as copy,
  todayFacts,
  type DevNodeId,
  type SuccessBranchId,
} from "@/content/investor/v3/successPath";
import { trackInvestorEvent } from "@/lib/analytics";

type Selection = DevNodeId | SuccessBranchId | null;

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

export function SuccessPathVisual({ locale }: { locale: LocaleCode }) {
  const reduce = useReducedMotion();
  const labelId = useId();
  const rootRef = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState(reduce ? 8 : 0);
  const [selected, setSelected] = useState<Selection>(null);
  const [scaleChosen, setScaleChosen] = useState(reduce);
  const [forkPulse, setForkPulse] = useState(false);

  useEffect(() => {
    const isTest = import.meta.env.MODE === "test";
    if (reduce || isTest) {
      setPhase(8);
      setScaleChosen(true);
      return;
    }
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setPhase(8);
      setScaleChosen(true);
      return;
    }
    let timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        timers = [
          window.setTimeout(() => setPhase(1), 180),
          window.setTimeout(() => setPhase(2), 640),
          window.setTimeout(() => setPhase(3), 1100),
          window.setTimeout(() => setPhase(4), 1560),
        ];
      },
      { threshold: 0.28 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [reduce]);

  const playScale = () => {
    setScaleChosen(true);
    setSelected("scale");
    trackInvestorEvent("roadmap_engaged", { stage: "success_path" });
    if (reduce) {
      setPhase(8);
      return;
    }
    setPhase(4);
    window.setTimeout(() => setPhase(5), 260);
    window.setTimeout(() => setPhase(6), 520);
    window.setTimeout(() => setPhase(7), 780);
    window.setTimeout(() => setPhase(8), 1040);
  };

  const pulseFork = () => {
    setForkPulse(true);
    window.setTimeout(() => setForkPulse(false), 1100);
  };

  const onToday = () => {
    setSelected("today");
    trackInvestorEvent("architecture_diagram_engaged", { node: "today" });
  };

  const onQuarter = (id: "q1" | "q2" | "q3" | "q4") => {
    setSelected(id);
    trackInvestorEvent("roadmap_engaged", { stage: id });
  };

  const onDecision = () => {
    setSelected("decision");
    pulseFork();
    trackInvestorEvent("architecture_diagram_engaged", { node: "decision" });
  };

  const onBranch = (id: SuccessBranchId) => {
    setSelected(id);
    if (id === "scale") playScale();
    else setScaleChosen(false);
    trackInvestorEvent("roadmap_engaged", { stage: id });
  };

  const onFuture = (id: (typeof futureNodes)[number]["id"]) => {
    setSelected(id);
    setScaleChosen(true);
    const node = futureNodes.find((n) => n.id === id);
    if (node && phase < node.phase) setPhase(node.phase);
    trackInvestorEvent("architecture_diagram_engaged", { node: id });
  };

  const visible = (need: number, afterScale = false) => {
    if (afterScale) return scaleChosen && phase >= need;
    return phase >= need;
  };

  const openSafeDrawer = () => {
    const drawer = document.getElementById("drawer-growth-capital");
    if (drawer instanceof HTMLDetailsElement) drawer.open = true;
  };

  const spineIds: DevNodeId[] = ["today", "q1", "q2", "q3", "q4", "decision"];
  const onKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const current = selected && spineIds.includes(selected as DevNodeId) ? (selected as DevNodeId) : "today";
    const i = spineIds.indexOf(current);
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const next = spineIds[Math.min(spineIds.length - 1, i + 1)];
      if (next === "today") onToday();
      else if (next === "decision") onDecision();
      else onQuarter(next as "q1" | "q2" | "q3" | "q4");
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prev = spineIds[Math.max(0, i - 1)];
      if (prev === "today") onToday();
      else if (prev === "decision") onDecision();
      else onQuarter(prev as "q1" | "q2" | "q3" | "q4");
    }
  };

  const selectedQuarter = seedQuarters.find((q) => q.id === selected);
  const selectedFuture = futureNodes.find((n) => n.id === selected);
  const selectedBranch =
    selected === "stop" || selected === "change" || selected === "scale"
      ? successBranches.find((b) => b.id === selected)
      : null;

  return (
    <figure
      ref={rootRef}
      className={`iv3-dev iv3-dev--p${phase}${scaleChosen ? " is-scale" : ""}${forkPulse ? " is-fork-pulse" : ""}`}
      aria-labelledby={labelId}
    >
      <p className="iv2-sr-only" id={labelId}>
        {t(copy.sr, locale)}
      </p>
      <h3 className="iv3-gc-h" id="iv3-dev-evidence">
        {t(copy.evidenceHeadline, locale)}
      </h3>
      <p className="iv3-gc-lead">{t(copy.programLead, locale)}</p>
      <h4 className="iv3-gc-h" id="iv3-dev-title">
        {t(copy.title, locale)}
      </h4>
      <p className="iv3-gc-lead">{t(copy.supporting, locale)}</p>

      <div className="iv3-dev-window" onKeyDown={onKey}>
        <p className="iv3-dev-track">{t(copy.companyTrack, locale)}</p>

        <div className="iv3-dev-spine" aria-label={t(copy.companyTrack, locale)}>
          <button
            type="button"
            className={`iv3-dev-node iv3-dev-node--exists${visible(1) ? " is-on" : ""}${
              selected === "today" ? " is-selected" : ""
            }`}
            aria-pressed={selected === "today"}
            aria-label={`${t(copy.todayStatus, locale)} ${t(copy.todayTitle, locale)}`}
            onClick={onToday}
          >
            <span className="iv3-dev-dot" aria-hidden="true" />
            <em>{t(copy.todayStatus, locale)}</em>
            <strong>{t(copy.todayTitle, locale)}</strong>
            <span className="iv3-dev-node-sub">{t(copy.todayLabel, locale)}</span>
          </button>

          <div className={`iv3-dev-band${visible(2) ? " is-on" : ""}`}>
            <p className="iv3-dev-band-label">{t(copy.bandLabel, locale)}</p>
            <ul className="iv3-dev-band-chips">
              {seedBandChips.map((chip) => (
                <li key={chip.en}>{t(chip, locale)}</li>
              ))}
            </ul>
            <ol className="iv3-dev-quarters">
              {seedQuarters.map((q) => (
                <li key={q.id}>
                  <button
                    type="button"
                    className={`iv3-dev-node iv3-dev-node--plan${visible(2) ? " is-on" : ""}${
                      selected === q.id ? " is-selected" : ""
                    }`}
                    aria-pressed={selected === q.id}
                    aria-label={`${t(q.label, locale)} ${t(q.title, locale)}`}
                    onClick={() => onQuarter(q.id)}
                  >
                    <span className="iv3-dev-dot" aria-hidden="true" />
                    <em>{t(q.label, locale)}</em>
                    <strong>{t(q.title, locale)}</strong>
                    <span className="iv3-dev-node-sub">{t(q.gate, locale)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <button
            type="button"
            className={`iv3-dev-node iv3-dev-node--gate${visible(3) ? " is-on" : ""}${
              selected === "decision" ? " is-selected" : ""
            }`}
            aria-pressed={selected === "decision"}
            aria-label={`${t(copy.decisionStatus, locale)} ${t(copy.decisionTitle, locale)}`}
            onClick={onDecision}
          >
            <span className="iv3-dev-dot" aria-hidden="true" />
            <em>{t(copy.decisionStatus, locale)}</em>
            <strong>{t(copy.decisionTitle, locale)}</strong>
            <span className="iv3-dev-node-sub">{t(copy.decisionKicker, locale)}</span>
          </button>
        </div>

        <div
          className={`iv3-dev-fork${visible(4) ? " is-on" : ""}`}
          aria-label={t(copy.decisionKicker, locale)}
        >
          {successBranches.map((branch) => (
            <button
              key={branch.id}
              type="button"
              className={`iv3-dev-branch${visible(4) ? " is-on" : ""}${
                selected === branch.id || (branch.id === "scale" && scaleChosen) ? " is-selected" : ""
              }`}
              data-branch={branch.id}
              aria-pressed={selected === branch.id || (branch.id === "scale" && scaleChosen)}
              onClick={() => onBranch(branch.id)}
            >
              <strong>{t(branch.title, locale)}</strong>
              <span>{t(branch.body, locale)}</span>
            </button>
          ))}
        </div>

        <div className={`iv3-dev-future${scaleChosen && phase >= 5 ? " is-on" : ""}`}>
          <p className="iv3-dev-future-label">{t(copy.futureLabel, locale)}</p>
          <ol className="iv3-dev-future-rail" aria-label={t(copy.futureLabel, locale)}>
            {futureNodes.map((node) => (
              <li key={node.id}>
                <button
                  type="button"
                  className={`iv3-dev-node iv3-dev-node--conditional${
                    visible(node.phase, true) ? " is-on" : ""
                  }${selected === node.id ? " is-selected" : ""}`}
                  aria-pressed={selected === node.id}
                  aria-label={`${t(node.status, locale)} ${t(node.title, locale)}`}
                  tabIndex={scaleChosen ? 0 : -1}
                  onClick={() => onFuture(node.id)}
                >
                  <span className="iv3-dev-dot" aria-hidden="true" />
                  <em>{t(node.status, locale)}</em>
                  <strong>{t(node.title, locale)}</strong>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="iv3-dev-explain" aria-live="polite">
        {selected === "today" ? (
          <>
            <p>{t(copy.todayBody, locale)}</p>
            <ul>
              {todayFacts.map((item) => (
                <li key={item.en}>{t(item, locale)}</li>
              ))}
            </ul>
          </>
        ) : selectedQuarter ? (
          <>
            <p>
              <strong>
                {t(selectedQuarter.label, locale)} — {t(selectedQuarter.title, locale)}
              </strong>
            </p>
            <p>{t(selectedQuarter.purpose, locale)}</p>
            <p className="iv3-dev-explain-k">{t(copy.developmentLabel, locale)}</p>
            <ul>
              {selectedQuarter.focus.map((item) => (
                <li key={item.en}>{t(item, locale)}</li>
              ))}
            </ul>
            <p className="iv3-dev-gate">
              {t(copy.outcomeLabel, locale)}: {t(selectedQuarter.gate, locale)}
            </p>
          </>
        ) : selectedBranch ? (
          <p>{t(selectedBranch.body, locale)}</p>
        ) : selectedFuture ? (
          <>
            <p>{t(selectedFuture.body, locale)}</p>
            {selectedFuture.id === "expansion" ? (
              <ul className="iv3-dev-equation" aria-label={t(copy.equationLabel, locale)}>
                {successEquationParts.map((item, index) => (
                  <li key={item.en}>
                    {index > 0 ? <span aria-hidden="true">×</span> : null}
                    {t(item, locale)}
                  </li>
                ))}
              </ul>
            ) : null}
            {selectedFuture.id === "network" ? (
              <ul className="iv3-dev-equation" aria-label={t(copy.networkPointsLabel, locale)}>
                {networkPoints.map((item) => (
                  <li key={item.en}>{t(item, locale)}</li>
                ))}
              </ul>
            ) : null}
            {selectedFuture.id === "liquidity" ? (
              <ul className="iv3-dev-liquidity">
                {successLiquidityOutcomes.map((item) => (
                  <li key={item.en}>{t(item, locale)}</li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <p>{t(copy.decisionBody, locale)}</p>
        )}
      </div>

      {scaleChosen && phase >= 5 && selected !== "expansion" ? (
        <ul className="iv3-dev-equation" aria-label={t(copy.equationLabel, locale)}>
          {successEquationParts.map((item, index) => (
            <li key={item.en}>
              {index > 0 ? <span aria-hidden="true">×</span> : null}
              {t(item, locale)}
            </li>
          ))}
        </ul>
      ) : null}

      {scaleChosen && phase >= 8 && selected !== "liquidity" ? (
        <ul className="iv3-dev-liquidity">
          {successLiquidityOutcomes.map((item) => (
            <li key={item.en}>{t(item, locale)}</li>
          ))}
        </ul>
      ) : null}

      <ol className={`iv3-dev-investor${visible(4) ? " is-on" : ""}`} aria-label={t(copy.investorTrack, locale)}>
        {investorTrackItems.map((item) => (
          <li key={item.id}>
            {item.dilution ? (
              <details className="iv3-dev-dilution">
                <summary>{t(item.label, locale)}</summary>
                <p>{t(copy.dilutionBody, locale)}</p>
              </details>
            ) : (
              <span>{t(item.label, locale)}</span>
            )}
          </li>
        ))}
      </ol>

      <p className="iv3-dev-close">{t(copy.closing, locale)}</p>
      <p className="iv2-disclosure">{t(copy.laterNote, locale)}</p>
      <p className="iv3-gc-deep-link">
        <a href="#drawer-safe" onClick={openSafeDrawer}>
          {t(copy.safeLink, locale)}
        </a>
      </p>
    </figure>
  );
}
