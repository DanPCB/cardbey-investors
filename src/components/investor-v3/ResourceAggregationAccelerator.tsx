import { useEffect, useId, useRef, useState } from "react";
import type { LocaleCode } from "@/content/investor";
import { t } from "@/content/investor";
import {
  mechanismResources,
  uspCopy,
  uspOutcomes,
} from "@/content/investor/v3/resourceAggregationUsp";
import { trackInvestorEvent } from "@/lib/analytics";

type Phase = 0 | 1 | 2 | 3 | 4;

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

export function ResourceAggregationAccelerator({ locale }: { locale: LocaleCode }) {
  const reduce = useReducedMotion();
  const labelId = useId();
  const rootRef = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>(reduce ? 4 : 0);
  const [hovered, setHovered] = useState<string | "hub" | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const isTest = import.meta.env.MODE === "test";
    if (reduce || isTest) {
      setPhase(4);
      return;
    }
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setPhase(4);
      return;
    }
    let timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        timers = [
          window.setTimeout(() => setPhase(1), 400),
          window.setTimeout(() => setPhase(2), 1100),
          window.setTimeout(() => setPhase(3), 1800),
          window.setTimeout(() => setPhase(4), 2600),
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

  const onHubClick = () => {
    setPulse(true);
    trackInvestorEvent("resource_diagram_all_connect", { resourceId: "all" });
    window.setTimeout(() => setPulse(false), 700);
  };

  const resourceOn = (id: string) =>
    pulse || hovered === "hub" || hovered === id || (phase >= 2 && !hovered);

  return (
    <figure
      ref={rootRef}
      className={`iv3-raa iv3-mech iv3-raa--p${phase}${pulse ? " is-pulse" : ""}`}
      aria-labelledby={labelId}
    >
      <p className="iv2-sr-only" id={labelId}>
        {t(uspCopy.sr, locale)}
      </p>

      <p className="iv3-usp-model-from">{t(uspCopy.resourcesLabel, locale)}</p>
      <ul className="iv3-mech-resources">
        {mechanismResources.map((node, i) => (
          <li
            key={node.id}
            className={phase >= 1 ? "is-on" : ""}
            style={{ transitionDelay: `${i * 45}ms` }}
          >
            <button
              type="button"
              className={`iv3-raa-node${resourceOn(node.id) && phase >= 2 ? " is-on" : ""}`}
              onMouseEnter={() => {
                setHovered(node.id);
                trackInvestorEvent("resource_diagram_node_view", { resourceId: node.id });
              }}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(node.id)}
              onBlur={() => setHovered(null)}
              onClick={() =>
                trackInvestorEvent("resource_diagram_node_select", { resourceId: node.id })
              }
            >
              {t(node.label, locale)}
            </button>
          </li>
        ))}
      </ul>

      <div className="iv3-mech-axis" aria-hidden="true">
        <span className={phase >= 2 ? "is-on" : ""}>↓</span>
      </div>

      <button
        type="button"
        className={`iv3-raa-hub iv3-mech-hub${phase >= 3 ? " is-on" : ""}`}
        aria-label="CARDBEY"
        onMouseEnter={() => setHovered("hub")}
        onMouseLeave={() => setHovered(null)}
        onClick={onHubClick}
      >
        <strong>CARDBEY</strong>
        <span>{t(uspCopy.hubSub, locale)}</span>
      </button>

      <div className="iv3-mech-axis" aria-hidden="true">
        <span className={phase >= 4 ? "is-on" : ""}>↓</span>
      </div>

      <ol className="iv3-raa-outcomes iv3-mech-outcomes">
        {uspOutcomes.map((node, i) => (
          <li
            key={node.id}
            className={phase >= 4 ? "is-on" : ""}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            {t(node.label, locale)}
          </li>
        ))}
      </ol>

      <p className="iv3-raa-define">{t(uspCopy.definition, locale)}</p>

      <p className="iv3-raa-link">
        <a href="#start-one">{t(uspCopy.howItBegins, locale)}</a>
      </p>
    </figure>
  );
}
