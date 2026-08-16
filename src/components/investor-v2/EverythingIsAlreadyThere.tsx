import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import type { LocaleCode } from "@/content/investor";
import { trackInvestorEvent } from "@/lib/analytics";

export type ResourceNodeId =
  | "market"
  | "intelligence"
  | "cloud"
  | "logistics"
  | "communication"
  | "platforms"
  | "payments"
  | "capital";

type ResourceDef = {
  id: ResourceNodeId;
  en: string;
  vi: string;
  explanationEn: string;
  explanationVi: string;
  /** CSS position class suffix matching existing layout */
  position: string;
};

const RESOURCES: ResourceDef[] = [
  {
    id: "market",
    en: "Global market",
    vi: "Thị trường toàn cầu",
    explanationEn:
      "Reach customers and opportunities beyond the business's local geography.",
    explanationVi:
      "Tiếp cận khách hàng và cơ hội ngoài địa lý địa phương của doanh nghiệp.",
    position: "market",
  },
  {
    id: "intelligence",
    en: "AI / Intelligence",
    vi: "AI / Trí tuệ",
    explanationEn:
      "Access increasingly powerful human and machine intelligence without having to build the underlying models.",
    explanationVi:
      "Tiếp cận trí tuệ người và máy ngày càng mạnh mà không phải xây các mô hình nền.",
    position: "ai",
  },
  {
    id: "cloud",
    en: "Cloud",
    vi: "Đám mây",
    explanationEn:
      "Use infrastructure that once required substantial internal technology investment.",
    explanationVi:
      "Dùng hạ tầng từng đòi hỏi đầu tư công nghệ nội bộ đáng kể.",
    position: "cloud",
  },
  {
    id: "logistics",
    en: "Logistics",
    vi: "Logistics",
    explanationEn:
      "Coordinate physical execution using increasingly connected external networks.",
    explanationVi:
      "Phối hợp thực thi vật lý bằng các mạng bên ngoài ngày càng kết nối.",
    position: "logistics",
  },
  {
    id: "communication",
    en: "Communication",
    vi: "Truyền thông",
    explanationEn:
      "Connect businesses, customers and partners through existing global communication infrastructure.",
    explanationVi:
      "Kết nối doanh nghiệp, khách hàng và đối tác qua hạ tầng truyền thông toàn cầu hiện có.",
    position: "comms",
  },
  {
    id: "platforms",
    en: "Platforms",
    vi: "Nền tảng",
    explanationEn:
      "Use mature digital ecosystems as resources rather than treating every platform as something Cardbey must reproduce.",
    explanationVi:
      "Dùng hệ sinh thái số chín như nguồn lực thay vì coi mọi nền tảng là thứ Cardbey phải tái tạo.",
    position: "platforms",
  },
  {
    id: "payments",
    en: "Payments",
    vi: "Thanh toán",
    explanationEn:
      "Use existing payment rails rather than rebuilding financial infrastructure.",
    explanationVi:
      "Dùng đường thanh toán hiện có thay vì xây lại hạ tầng tài chính.",
    position: "payments",
  },
  {
    id: "capital",
    en: "Capital",
    vi: "Vốn",
    explanationEn:
      "Connect growth capital and economic participation to productive business activity over time.",
    explanationVi:
      "Kết nối vốn tăng trưởng và tham gia kinh tế với hoạt động kinh doanh sản xuất theo thời gian.",
    position: "capital",
  },
];

type LineGeom = { id: ResourceNodeId; x1: number; y1: number; x2: number; y2: number; len: number };

type HubGeom = { x: number; y: number; personY: number };

function lineLength(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}

/**
 * Interactive resource orchestration diagram.
 * Thesis: resources already exist; Cardbey connects them around the person/business.
 */
export function EverythingIsAlreadyThere({ locale }: { locale: LocaleCode }) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLButtonElement>(null);
  const personRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [reduceMotion, setReduceMotion] = useState(false);
  const [hovered, setHovered] = useState<ResourceNodeId | "hub" | null>(null);
  const [selected, setSelected] = useState<ResourceNodeId | null>(null);
  const [allConnected, setAllConnected] = useState(false);
  const [lines, setLines] = useState<LineGeom[]>([]);
  const [hub, setHub] = useState<HubGeom | null>(null);
  const [drawn, setDrawn] = useState<Set<ResourceNodeId>>(new Set());
  const [personLineOn, setPersonLineOn] = useState(false);

  const titleId = useId();
  const detailId = useId();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const hubEl = hubRef.current;
    if (!stage || !hubEl) return;
    const stageBox = stage.getBoundingClientRect();
    const hubBox = hubEl.getBoundingClientRect();
    const hubCenter = {
      x: hubBox.left + hubBox.width / 2 - stageBox.left,
      y: hubBox.top + hubBox.height / 2 - stageBox.top,
    };
    const personEl = personRef.current;
    const personY = personEl
      ? personEl.getBoundingClientRect().top + personEl.getBoundingClientRect().height / 2 - stageBox.top
      : hubCenter.y + hubBox.height * 0.28;

    const next: LineGeom[] = [];
    for (const resource of RESOURCES) {
      const el = nodeRefs.current[resource.id];
      if (!el) continue;
      const box = el.getBoundingClientRect();
      const x1 = box.left + box.width / 2 - stageBox.left;
      const y1 = box.top + box.height / 2 - stageBox.top;
      next.push({
        id: resource.id,
        x1,
        y1,
        x2: hubCenter.x,
        y2: hubCenter.y,
        len: lineLength(x1, y1, hubCenter.x, hubCenter.y),
      });
    }
    setHub({ ...hubCenter, personY });
    setLines(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(() => measure());
    ro.observe(stage);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, locale]);

  const activeKey = allConnected
    ? "all"
    : selected
      ? `sel:${selected}`
      : hovered && hovered !== "hub"
        ? `hov:${hovered}`
        : "none";

  // Animate draw when active set changes
  useEffect(() => {
    const nextActive = (() => {
      if (activeKey === "all") return new Set(RESOURCES.map((r) => r.id));
      if (activeKey.startsWith("sel:")) return new Set([activeKey.slice(4) as ResourceNodeId]);
      if (activeKey.startsWith("hov:")) return new Set([activeKey.slice(4) as ResourceNodeId]);
      return new Set<ResourceNodeId>();
    })();

    if (reduceMotion) {
      setDrawn(nextActive);
      setPersonLineOn(nextActive.size > 0);
      return;
    }

    if (activeKey === "none") {
      setDrawn(new Set());
      setPersonLineOn(false);
      return;
    }

    if (activeKey === "all") {
      setDrawn(new Set());
      setPersonLineOn(false);
      const ids = RESOURCES.map((r) => r.id);
      const timers: number[] = [];
      ids.forEach((id, index) => {
        timers.push(
          window.setTimeout(() => {
            setDrawn((prev) => new Set(prev).add(id));
          }, index * 70)
        );
      });
      timers.push(
        window.setTimeout(() => setPersonLineOn(true), ids.length * 70 + 120)
      );
      return () => timers.forEach((t) => window.clearTimeout(t));
    }

    setDrawn(new Set());
    setPersonLineOn(false);
    const id = [...nextActive][0];
    const t1 = window.setTimeout(() => {
      if (id) setDrawn(new Set([id]));
    }, 30);
    const t2 = window.setTimeout(() => setPersonLineOn(true), 280);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [activeKey, reduceMotion]);

  const activeIds = (() => {
    if (allConnected) return new Set(RESOURCES.map((r) => r.id));
    if (selected) return new Set([selected]);
    if (hovered && hovered !== "hub") return new Set([hovered as ResourceNodeId]);
    return new Set<ResourceNodeId>();
  })();

  const clearSelection = useCallback(() => {
    setSelected(null);
    setAllConnected(false);
  }, []);

  useEffect(() => {
    const onDoc = (event: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (!root.contains(event.target as Node)) clearSelection();
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [clearSelection]);

  const onNodeEnter = (id: ResourceNodeId) => {
    if (allConnected) return;
    setHovered(id);
    trackInvestorEvent("resource_diagram_node_view", { resourceId: id });
  };

  const onNodeLeave = () => {
    setHovered((h) => (h === "hub" ? h : null));
  };

  const onNodeSelect = (id: ResourceNodeId) => {
    setAllConnected(false);
    setSelected((prev) => (prev === id ? null : id));
    trackInvestorEvent("resource_diagram_node_select", { resourceId: id });
  };

  const onHubClick = () => {
    setSelected(null);
    setAllConnected((prev) => {
      const next = !prev;
      if (next) trackInvestorEvent("resource_diagram_all_connect", { resourceId: "all" });
      return next;
    });
  };

  const onHubKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onHubClick();
    }
  };

  const selectedResource = RESOURCES.find((r) => r.id === selected);
  const hubHover = hovered === "hub" && !allConnected && !selected;
  const dimOthers = Boolean((hovered && hovered !== "hub") || selected) && !allConnected;

  const srSummary =
    locale === "vi"
      ? "Sơ đồ tương tác: tám nguồn lực quanh Cardbey và người/doanh nghiệp. Di chuột hoặc Tab tới từng nguồn lực để xem kết nối. Nhấn Cardbey để kết nối tất cả. Nguồn lực đã tồn tại; Cardbey kết nối chúng thành năng lực thực tế quanh doanh nghiệp."
      : "Interactive diagram: eight resources around Cardbey and the person/business. Hover or Tab to a resource to see its connection. Activate Cardbey to connect all. Resources already exist; Cardbey connects them into practical capability around the business.";

  return (
    <figure
      ref={rootRef}
      className={[
        "iv3-already-there",
        "iv3-resource-diagram",
        allConnected ? "iv3-resource-diagram--all" : "",
        hubHover ? "iv3-resource-diagram--hub-hover" : "",
        dimOthers ? "iv3-resource-diagram--focus" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={titleId}
    >
      <p className="iv2-sr-only" id={titleId}>
        {srSummary}
      </p>

      <div
        className="iv3-already-orbit iv3-resource-stage"
        ref={stageRef}
        onClick={() => clearSelection()}
      >
        <svg className="iv3-resource-svg" aria-hidden="true">
          {hub ? (
            <line
              className={`iv3-resource-person-line${personLineOn ? " is-on" : ""}`}
              x1={hub.x}
              y1={hub.y}
              x2={hub.x}
              y2={hub.personY}
            />
          ) : null}
          {lines.map((line) => {
            const isActive = activeIds.has(line.id) && drawn.has(line.id);
            const isPending = activeIds.has(line.id) && !drawn.has(line.id) && !reduceMotion;
            return (
              <line
                key={line.id}
                className={`iv3-resource-line${isActive ? " is-on" : ""}${isPending ? " is-pending" : ""}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                style={
                  reduceMotion
                    ? undefined
                    : {
                        strokeDasharray: line.len,
                        strokeDashoffset: isActive ? 0 : line.len,
                      }
                }
              />
            );
          })}
        </svg>

        {RESOURCES.map((resource) => {
          const label = locale === "vi" ? resource.vi : resource.en;
          const isActive =
            selected === resource.id ||
            hovered === resource.id ||
            allConnected ||
            hubHover;
          const isDimmed = dimOthers && selected !== resource.id && hovered !== resource.id;
          return (
            <button
              type="button"
              key={resource.id}
              ref={(el) => {
                nodeRefs.current[resource.id] = el;
              }}
              className={`iv3-orbit-node iv3-orbit-node--${resource.position}${isActive ? " is-active" : ""}${isDimmed ? " is-dimmed" : ""}`}
              aria-pressed={selected === resource.id || allConnected}
              aria-describedby={selected === resource.id ? detailId : undefined}
              onPointerEnter={() => onNodeEnter(resource.id)}
              onPointerLeave={onNodeLeave}
              onFocus={() => onNodeEnter(resource.id)}
              onBlur={onNodeLeave}
              onClick={(event: ReactMouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                onNodeSelect(resource.id);
              }}
            >
              {label}
            </button>
          );
        })}

        <button
          type="button"
          ref={hubRef}
          className={`iv3-orbit-hub${allConnected ? " is-active" : ""}${hubHover ? " is-hover" : ""}`}
          aria-pressed={allConnected}
          aria-label={
            locale === "vi"
              ? "Cardbey — nhấn để kết nối mọi nguồn lực"
              : "Cardbey — activate to connect all resources"
          }
          onPointerEnter={() => setHovered("hub")}
          onPointerLeave={() => setHovered(null)}
          onFocus={() => setHovered("hub")}
          onBlur={() => setHovered(null)}
          onClick={(event) => {
            event.stopPropagation();
            onHubClick();
          }}
          onKeyDown={onHubKey}
        >
          <span className="iv3-orbit-hub-bar">CARDBEY</span>
          <span className="iv3-orbit-hub-body">
            <strong ref={personRef}>{locale === "vi" ? "NGƯỜI" : "PERSON"}</strong>
            <span>{locale === "vi" ? "DOANH NGHIỆP" : "BUSINESS"}</span>
          </span>
        </button>
      </div>

      <div className="iv3-resource-detail" id={detailId} aria-live="polite">
        {allConnected ? (
          <>
            <p className="iv3-already-headline">
              {locale === "vi"
                ? "Nguồn lực có giá trị hơn khi làm việc cùng nhau."
                : "Resources become more valuable when they work together."}
            </p>
            <p>
              {locale === "vi"
                ? "Cardbey đang xây lớp đưa chúng vào làm việc quanh doanh nghiệp."
                : "Cardbey is building the layer that puts them to work around the business."}
            </p>
            <p className="iv3-resource-capability">
              {locale === "vi"
                ? "Năng lực kinh doanh thực tế · Tạo · Vận hành · Bán · Kết nối · Tăng trưởng"
                : "Practical business capability · Create · Operate · Sell · Connect · Grow"}
            </p>
          </>
        ) : selectedResource ? (
          <>
            <p className="iv3-resource-detail-title">
              {locale === "vi" ? selectedResource.vi : selectedResource.en}
            </p>
            <p>
              {locale === "vi"
                ? selectedResource.explanationVi
                : selectedResource.explanationEn}
            </p>
          </>
        ) : (
          <>
            <p className="iv3-already-headline">
              {locale === "vi" ? "Mọi thứ đã có sẵn." : "Everything is already there."}
            </p>
            <p>
              {locale === "vi"
                ? "Cơ hội là đưa chúng vào làm việc. Di chuột hoặc nhấn một nguồn lực — hoặc nhấn Cardbey."
                : "The opportunity is putting it to work. Hover or select a resource — or activate Cardbey."}
            </p>
          </>
        )}
      </div>
    </figure>
  );
}
