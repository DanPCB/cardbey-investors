// src/components/AnimatedRevenueCard.jsx
import React from "react";
import {
  ResponsiveContainer,
  AreaChart, Area,
  LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

const DATA = [
  { year: "Year 1", revenue: 36 },
  { year: "Year 2", revenue: 216 },
  { year: "Year 3", revenue: 900 },
];

/* -------------------- Utilities -------------------- */
function useInViewOnce(ref, options = { root: null, rootMargin: "-20% 0px", threshold: 0.15 }) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, inView]);
  return inView;
}

function useCountUp(target = 0, { duration = 1400, start = false } = {}) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    let raf, t0;
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min(1, (ts - t0) / duration);
      setVal(target * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return Math.round(val);
}

/* -------------------- Badge -------------------- */
function AIBadge() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, opacity: 0.75 }}
    >
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--neo-cyan)" />
          <stop offset="100%" stopColor="var(--neo-accent)" />
        </linearGradient>
        <filter id="chipGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="40" stroke="url(#grad)" strokeWidth="3" fill="none">
        <animate attributeName="stroke-width" values="2;4;2" dur="3s" repeatCount="indefinite" />
      </circle>
      <rect x="33" y="33" width="34" height="34" rx="6" stroke="url(#grad)" strokeWidth="2" fill="none" filter="url(#chipGlow)" />
      <text x="50" y="56" textAnchor="middle" fontSize="22" fill="var(--neo-text)" style={{ fontWeight: 700 }}>
        AI
      </text>
    </svg>
  );
}

/* -------------------- Main -------------------- */
export default function AnimatedRevenueCard() {
  const rootRef = React.useRef(null);
  const inView = useInViewOnce(rootRef);

  const y1 = useCountUp(36,  { start: inView, duration: 900  });
  const y2 = useCountUp(216, { start: inView, duration: 1100 });
  const y3 = useCountUp(900, { start: inView, duration: 1300 });

  const cardStyle = {
    position: "relative",
    background: "var(--neo-card)",
    border: "1px solid var(--neo-border)",
    color: "var(--neo-text)",
    borderRadius: "16px",
    padding: "16px",
  };

  const chartWrapStyle = { width: "100%", height: "260px", marginTop: "8px" };
  const rowStyle = {
    display: "flex", justifyContent: "space-between", gap: "12px",
    marginTop: "12px", textAlign: "center",
  };

  return (
    <div ref={rootRef} style={cardStyle}>
      <AIBadge />

      <div style={chartWrapStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--neo-cyan)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--neo-cyan)" stopOpacity={0} />
              </linearGradient>
              <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="g" />
                <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <CartesianGrid stroke="var(--neo-border)" vertical={false} />
            <XAxis dataKey="year" stroke="var(--neo-muted)" />
            <YAxis stroke="var(--neo-muted)" tickFormatter={(v) => `${v}M`} domain={[0, 950]} />
            <Tooltip
              contentStyle={{
                background: "var(--neo-bg)",
                border: "1px solid var(--neo-border)",
                borderRadius: 12,
                color: "var(--neo-text)",
              }}
              formatter={(v) => [`${v}M`, "Revenue"]}
            />
            <Area type="monotone" dataKey="revenue" stroke="none" fill="url(#revFill)" />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--neo-cyan)"
              strokeWidth={3}
              dot={{ r: 5, stroke: "var(--neo-bg)", strokeWidth: 2 }}
              style={{ filter: "url(#lineGlow)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Milestones (count-up) */}
      <div style={rowStyle}>
        {[{ label: "Year 1", val: y1 }, { label: "Year 2", val: y2 }, { label: "Year 3", val: y3 }].map((m) => (
          <div key={m.label} style={{ flex: 1 }}>
            <div style={{ opacity: 0.8, fontSize: 14 }}>{m.label}</div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>
              A${m.val.toLocaleString()}M
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
