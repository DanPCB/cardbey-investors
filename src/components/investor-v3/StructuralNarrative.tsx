import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { LocaleCode, LocalizedString } from "@/content/investor";
import { t } from "@/content/investor";
import {
  abundantResources,
  accumulationSteps,
  expansionLadder,
  fragmentedResources,
  realityCheck,
  structuralCopy as copy,
  structuralTransitions,
  uspTransformSteps,
  valueCirculation,
} from "@/content/investor/v3/structuralNarrative";

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

/** Horizontal thesis flow: all steps visible on desktop; one-step snap + prev/next on overflow. */
export function StepFlow({
  items,
  locale,
  ariaLabel,
  className,
}: {
  items: LocalizedString[];
  locale: LocaleCode;
  ariaLabel: string;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [overflow, setOverflow] = useState(false);
  const [index, setIndex] = useState(0);
  const labelPrev = locale === "vi" ? "Bước trước" : "Previous step";
  const labelNext = locale === "vi" ? "Bước tiếp" : "Next step";

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 8;
    setOverflow(hasOverflow);
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    children.forEach((child, i) => {
      const center = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    setIndex(nearest);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    sync();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(sync) : null;
    ro?.observe(el);
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      ro?.disconnect();
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync, items.length]);

  const go = (nextIndex: number) => {
    const el = scrollerRef.current;
    const child = el?.children[nextIndex] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollTo({
      left: child.offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(Math.min(items.length - 1, index + 1));
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(Math.max(0, index - 1));
    }
  };

  return (
    <div className={`iv3-step-flow-wrap${overflow ? " has-overflow" : ""}`}>
      <ol
        ref={scrollerRef}
        className={`iv3-step-flow${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        tabIndex={overflow ? 0 : undefined}
        onKeyDown={onKeyDown}
      >
        {items.map((step) => (
          <li key={step.en}>{t(step, locale)}</li>
        ))}
      </ol>
      {overflow ? (
        <div className="iv3-step-flow-nav">
          <button
            type="button"
            className="iv3-step-flow-btn"
            onClick={() => go(Math.max(0, index - 1))}
            disabled={index <= 0}
            aria-label={labelPrev}
          >
            ‹
          </button>
          <span className="iv3-step-flow-count" aria-live="polite">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            className="iv3-step-flow-btn"
            onClick={() => go(Math.min(items.length - 1, index + 1))}
            disabled={index >= items.length - 1}
            aria-label={labelNext}
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function StructuralShiftVisual({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-shift" aria-label={t(copy.shiftCaption, locale)}>
      <figcaption className="iv3-visual-kicker">{t(copy.shiftCaption, locale)}</figcaption>
      <ul className="iv3-shift-list">
        {structuralTransitions.map((row) => (
          <li key={row.id}>
            <span>{t(row.from, locale)}</span>
            <em aria-hidden="true">→</em>
            <strong>{t(row.to, locale)}</strong>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function EconomicPathways({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-paths" aria-label={t(copy.pathKicker, locale)}>
      <figcaption className="iv3-visual-kicker">{t(copy.pathKicker, locale)}</figcaption>
      <ul className="iv3-paths-grid">
        <li>
          <strong>{t(copy.pathATitle, locale)}</strong>
          <span className="iv3-paths-arrow">{t(copy.pathAArrow, locale)}</span>
          <p>{t(copy.pathABody, locale)}</p>
        </li>
        <li>
          <strong>{t(copy.pathBTitle, locale)}</strong>
          <span className="iv3-paths-arrow">{t(copy.pathBArrow, locale)}</span>
          <p>{t(copy.pathBBody, locale)}</p>
        </li>
      </ul>
      <p className="iv3-paths-transition">{t(copy.pathTransition, locale)}</p>
    </figure>
  );
}

export function CoordinationBottleneck({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-bottle" aria-label={t(copy.bottleneckTitle, locale)}>
      <ul className="iv3-bottle-chips">
        {abundantResources.map((item) => (
          <li key={item.en}>{t(item, locale)}</li>
        ))}
      </ul>
      <p className="iv3-bottle-lead">{t(copy.bottleneckQuestion, locale)}</p>
      <p className="iv3-bottle-bridge">{t(copy.bottleneckBridge, locale)}</p>
    </figure>
  );
}

export function InvestorRealityCheck({ locale }: { locale: LocaleCode }) {
  return (
    <aside className="iv3-reality" aria-label={t(copy.realityKicker, locale)}>
      <p className="iv3-visual-kicker">{t(copy.realityKicker, locale)}</p>
      <ul>
        {realityCheck.map((item) => (
          <li key={item.id}>
            <strong>{t(item.label, locale)}</strong>
            <span>{t(item.body, locale)}</span>
          </li>
        ))}
      </ul>
      <p className="iv3-reality-ask">{t(copy.realityAsk, locale)}</p>
    </aside>
  );
}

export function UspTransformationModel({ locale }: { locale: LocaleCode }) {
  const titleId = useId();
  return (
    <figure className="iv3-usp-model" aria-labelledby={titleId}>
      <p className="iv3-visual-kicker" id={titleId}>
        {t(copy.uspModelKicker, locale)}
      </p>
      <p className="iv3-usp-model-from">{t(copy.uspModelFrom, locale)}</p>
      <ul className="iv3-bottle-chips">
        {fragmentedResources.map((item) => (
          <li key={item.en}>{t(item, locale)}</li>
        ))}
      </ul>
      <p className="iv3-usp-model-hub" aria-hidden="true">
        ↓ {t(copy.uspModelThrough, locale)} ↓
      </p>
      <StepFlow
        items={uspTransformSteps}
        locale={locale}
        ariaLabel={locale === "vi" ? "Chuỗi tổng hợp nguồn lực" : "Resource aggregation sequence"}
        className="iv3-usp-model-steps"
      />
      <p className="iv3-usp-model-to">{t(copy.uspModelTo, locale)}</p>
      <p className="iv3-bottle-bridge">{t(copy.uspModelNote, locale)}</p>
    </figure>
  );
}

export function ExpansionLadder({ locale }: { locale: LocaleCode }) {
  return (
    <StepFlow
      items={expansionLadder}
      locale={locale}
      ariaLabel={locale === "vi" ? "Thang mở rộng" : "Expansion ladder"}
      className="iv3-exp-ladder"
    />
  );
}

export function AccumulationHypothesis({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-accum" aria-labelledby="iv3-accum-title">
      <p className="iv3-visual-kicker">{t(copy.accumulationLabel, locale)}</p>
      <h3 id="iv3-accum-title">{t(copy.accumulationKicker, locale)}</h3>
      <p className="iv3-accum-lead">{t(copy.accumulationLead, locale)}</p>
      <StepFlow
        items={accumulationSteps}
        locale={locale}
        ariaLabel={locale === "vi" ? "Vòng tích lũy" : "Accumulation loop"}
        className="iv3-accum-steps"
      />
    </figure>
  );
}

export function ValueCirculation({ locale }: { locale: LocaleCode }) {
  return (
    <figure className="iv3-accum" aria-label={t(copy.valueKicker, locale)}>
      <p className="iv3-visual-kicker">{t(copy.valueKicker, locale)}</p>
      <p className="iv3-accum-lead">{t(copy.valueLead, locale)}</p>
      <StepFlow
        items={valueCirculation}
        locale={locale}
        ariaLabel={locale === "vi" ? "Tuần hoàn giá trị" : "Value circulation"}
      />
    </figure>
  );
}
