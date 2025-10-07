// src/components/MarketOverviewSection.jsx
import React from "react";
import {
  ResponsiveContainer,
  AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

/* ---------- helpers ---------- */
function kFormat(n, suffix = "") {
  if (n === null || n === undefined) return "—";
  if (n >= 1_000_000_000) return `${(n/1_000_000_000).toFixed(1)}B${suffix}`;
  if (n >= 1_000_000)     return `${(n/1_000_000).toFixed(1)}M${suffix}`;
  if (n >= 1_000)         return `${(n/1_000).toFixed(1)}K${suffix}`;
  return `${n}${suffix}`;
}
const CYAN = "var(--neo-cyan)";
const PURP = "var(--neo-accent)";
const INDG = "var(--neo-accent-2)";

/* ---------- default (placeholder) data – replace with real numbers later ---------- */
const defaultData = {
  asOf: "YTD 2025", // update freely
  ecommerce: {
    ytdGMV: null,          // e.g., 6_200_000_000  (A$)
    yoy: null,             // e.g., +0.12 (12%)
    monthly: [             // sparkline (GMV by month)
      { m: "Jan", v: 0 }, { m: "Feb", v: 0 }, { m: "Mar", v: 0 },
      { m: "Apr", v: 0 }, { m: "May", v: 0 }, { m: "Jun", v: 0 }
    ],
    bullets: [
      "AI-assisted store creation compresses setup from days to minutes.",
      "Social + QR commerce reduces checkout friction (scan → pay).",
      "SMEs monetize catalogs across screens & channels."
    ]
  },
  ads: {
    ytdSpend: null,        // e.g., 1_450_000_000 (A$ DOOH+social in focus regions)
    yoy: null,             // e.g., +0.09
    channelMix: [          // split used for donut
      { name: "DOOH", value: 0 },
      { name: "Social", value: 0 },
      { name: "Search", value: 0 },
    ],
    bullets: [
      "Digital ads shift from awareness → instant QR purchases.",
      "DOOH with live QR bridges offline attention to online orders.",
      "Attribution improves via scan-to-purchase events."
    ]
  },
  delivery: {
    ytdOrders: null,       // e.g., 18_200_000 (orders)
    yoy: null,             // e.g., +0.07
    weekly: [
      { w: "W1", v: 0 }, { w: "W2", v: 0 }, { w: "W3", v: 0 }, { w: "W4", v: 0 },
      { w: "W5", v: 0 }, { w: "W6", v: 0 }
    ],
    bullets: [
      "Local last-mile partners + SmartBox expand fulfillment options.",
      "Routing picks nearest store/hub to cut cost & ETA.",
      "Every delivery feeds loyalty (CAI credits)."
    ]
  }
};

/* ---------- card shell ---------- */
function Card({ children, title, subtitle, right }) {
  return (
    <div
      className="rounded-2xl p-5 md:p-6"
      style={{
        position: "relative",
        background: "var(--neo-card)",
        border: "1px solid var(--neo-border)",
        color: "var(--neo-text)"
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
          {subtitle && <div className="text-sm opacity-75">{subtitle}</div>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

export default function MarketOverviewSection({ lang = "en", data = defaultData }) {
  const t = (en, vi) => (lang === "vi" ? vi : en);
  const tag = data.asOf || t("YTD", "Lũy kế năm");

  return (
    <section className="container mx-auto px-4 md:px-8 max-w-6xl" style={{ marginTop: 24 }}>
      <div className="iv-card">
        <h2 className="iv-h2">
          {t("Market Overview", "Toàn cảnh thị trường")}
        </h2>

        {/* 3-card grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {/* 1) E-commerce */}
          <Card
            title={t("E-commerce", "Thương mại điện tử")}
            subtitle={tag}
            right={<span className="text-xs px-2 py-1 rounded-full"
              style={{ background: "rgba(34,211,238,0.15)", border: "1px solid var(--neo-border)" }}>
              {data.ecommerce.yoy != null ? `${(data.ecommerce.yoy * 100).toFixed(0)}% YoY` : "—"}
            </span>}
          >
            <div className="text-2xl font-semibold mb-2">
              {kFormat(data.ecommerce.ytdGMV, " GMV")}
            </div>
            <div style={{ height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.ecommerce.monthly} margin={{ top: 5, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ecFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CYAN} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--neo-border)" vertical={false} />
                  <XAxis dataKey="m" stroke="var(--neo-muted)" />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "var(--neo-bg)",
                      border: "1px solid var(--neo-border)",
                      borderRadius: 12,
                      color: "var(--neo-text)"
                    }}
                    formatter={(v) => [kFormat(v, ""), t("GMV", "GMV")]}
                  />
                  <Area type="monotone" dataKey="v" stroke={CYAN} fill="url(#ecFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <ul className="iv-list mt-3">
              {data.ecommerce.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </Card>

          {/* 2) Digital Ads */}
          <Card
            title={t("Digital Advertising", "Quảng cáo số")}
            subtitle={tag}
            right={<span className="text-xs px-2 py-1 rounded-full"
              style={{ background: "rgba(124,58,237,0.15)", border: "1px solid var(--neo-border)" }}>
              {data.ads.yoy != null ? `${(data.ads.yoy * 100).toFixed(0)}% YoY` : "—"}
            </span>}
          >
            <div className="text-2xl font-semibold mb-2">
              {kFormat(data.ads.ytdSpend, " ad spend")}
            </div>
            <div style={{ height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.ads.channelMix}
                    dataKey="value" nameKey="name"
                    innerRadius={38} outerRadius={60} paddingAngle={3}
                  >
                    {data.ads.channelMix.map((_, i) => (
                      <Cell key={i} fill={[PURP, INDG, CYAN][i % 3]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--neo-bg)",
                      border: "1px solid var(--neo-border)",
                      borderRadius: 12,
                      color: "var(--neo-text)"
                    }}
                    formatter={(v, n) => [kFormat(v, ""), n]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="iv-list mt-3">
              {data.ads.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </Card>

          {/* 3) Delivery / Logistics */}
          <Card
            title={t("Delivery & Logistics", "Giao hàng & Hậu cần")}
            subtitle={tag}
            right={<span className="text-xs px-2 py-1 rounded-full"
              style={{ background: "rgba(79,70,229,0.15)", border: "1px solid var(--neo-border)" }}>
              {data.delivery.yoy != null ? `${(data.delivery.yoy * 100).toFixed(0)}% YoY` : "—"}
            </span>}
          >
            <div className="text-2xl font-semibold mb-2">
              {data.delivery.ytdOrders != null ? `${kFormat(data.delivery.ytdOrders)} orders` : "—"}
            </div>
            <div style={{ height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.delivery.weekly} margin={{ top: 5, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke="var(--neo-border)" vertical={false} />
                  <XAxis dataKey="w" stroke="var(--neo-muted)" />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "var(--neo-bg)",
                      border: "1px solid var(--neo-border)",
                      borderRadius: 12,
                      color: "var(--neo-text)"
                    }}
                    formatter={(v) => [kFormat(v, ""), t("Orders", "Đơn")] }
                  />
                  <Bar dataKey="v" fill={INDG} radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <ul className="iv-list mt-3">
              {data.delivery.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
