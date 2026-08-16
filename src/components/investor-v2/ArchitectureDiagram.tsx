import { useEffect, useState, type ReactNode } from "react";
import { trackInvestorEvent } from "@/lib/analytics";
import type { LocaleCode } from "@/content/investor";
import { diagramLabel, getDiagram } from "@/content/investor/shared/diagrams";

export function ArchitectureDiagram({
  diagramId,
  locale,
}: {
  diagramId?: string;
  locale: LocaleCode;
}) {
  const diagram = getDiagram(diagramId);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!diagram?.nodes?.length || reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((n) => (n + 1) % (diagram.nodes?.length || 1));
    }, 2200);
    return () => window.clearInterval(id);
  }, [diagram, reduceMotion]);

  if (!diagram) return null;

  return (
    <figure
      className={`iv2-diagram iv2-diagram--${diagram.mode}${reduceMotion ? " iv2-diagram--static" : ""}`}
      aria-label={diagramLabel(diagram.accessibleDescription, locale)}
      onFocus={() =>
        trackInvestorEvent("architecture_diagram_engaged", { diagramId: diagram.id })
      }
      tabIndex={0}
    >
      <figcaption>
        <h3 className="iv2-diagram-title">{diagramLabel(diagram.title, locale)}</h3>
        <p className="iv2-diagram-explain">{diagramLabel(diagram.explanation, locale)}</p>
      </figcaption>

      <p className="iv2-sr-only">{diagramLabel(diagram.accessibleDescription, locale)}</p>

      {diagram.mode === "hero" && diagram.heroColumns ? (
        <div className="iv2-hero-os" role="list">
          {diagram.heroColumns.map((col, index) => (
            <div className="iv2-hero-os-col" role="listitem" key={col.id}>
              <h4>{diagramLabel(col.title, locale)}</h4>
              <ul>
                {col.items.map((item) => (
                  <li key={item.en}>{diagramLabel(item, locale)}</li>
                ))}
              </ul>
              {index < diagram.heroColumns!.length - 1 ? (
                <span className="iv2-flow-conn iv2-hero-os-arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {diagram.mode === "layers" && diagram.layers ? (
        <div className="iv2-layers">
          {diagram.layers.map((layer) => (
            <div className="iv2-layer" key={layer.id}>
              <strong>{diagramLabel(layer.name, locale)}</strong>
              <span>{diagramLabel(layer.detail, locale)}</span>
            </div>
          ))}
        </div>
      ) : null}

      {diagram.mode === "flow" && diagram.nodes ? (
        <ol className="iv2-flow">
          {diagram.nodes.map((node, index) => (
            <li key={node.id} style={{ display: "contents" }}>
              <div
                className={`iv2-flow-node${active === index && !reduceMotion ? " is-active" : ""}`}
              >
                {diagramLabel(node.label, locale)}
              </div>
              {index < diagram.nodes!.length - 1 ? (
                <span className="iv2-flow-conn" aria-hidden="true">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      ) : null}
    </figure>
  );
}

export function SystemNode({ children }: { children: ReactNode }) {
  return <div className="iv2-flow-node">{children}</div>;
}

export function FlowConnector() {
  return (
    <span className="iv2-flow-conn" aria-hidden="true">
      →
    </span>
  );
}

export function HeroOperatingVisual({ locale }: { locale: LocaleCode }) {
  return <ArchitectureDiagram diagramId="hero-os" locale={locale} />;
}
