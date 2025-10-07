// src/components/MarketOverviewInline.jsx
import React from "react";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";

const CYAN = "var(--neo-cyan)";
const PURP = "var(--neo-accent)";
const INDG = "var(--neo-accent-2)";

function k(n) {
  if (n == null) return "—";
  if (n >= 1_000_000_000_000) return (n / 1_000_000_000_000).toFixed(1) + "T";
  if (n >= 1_000_000_000)     return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000)         return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)             return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

function Tile({ title, tag, kpi, kpiLabel, yoy, hint, color, data }) {
  return (
    <div
      className="rounded-2xl flex flex-col"
      style={{
        background: "var(--neo-card)",
        border: "1px solid var(--neo-border)",
        minHeight: 150,
        padding: "14px 16px", // spacing around letters
      }}
    >
      {/* Header */}
<div className="flex items-center justify-between mb-2">
  <div
    style={{
      color: "var(--neo-text)",
      fontWeight: 600,       // force extra bold
      fontSize: "1.00rem",   // slightly larger than normal text
      letterSpacing: "0.3px" // subtle spacing to make strokes stand out
    }}
  >
    {title}
  </div>
  <div style={{ fontSize: "8px", opacity: 0.7 }}>{tag}</div>
</div>

      {/* KPI */}
<div className="flex items-baseline gap-2 mb-2">
  <div
    style={{
      color: "var(--neo-text)",
      fontWeight: 800,      // heaviest stroke
      fontSize: "1.0rem",   // larger
      lineHeight: 1.2
    }}
  >
    {kpi}
  </div>
  <div style={{ fontSize: "10px", opacity: 0.75 }}>{kpiLabel}</div>
  <div
    style={{
      marginLeft: "auto",
      fontSize: "16px",
      padding: "2px 6px",
      border: "1px solid var(--neo-border)",
      background: "rgba(255,255,255,0.04)",
      borderRadius: "999px",
    }}
  >
    {yoy ?? "—"} YoY
  </div>
</div>



      {/* Sparkline */}
      <div style={{ height: 56, padding: "0 8px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`g-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                background: "var(--neo-bg)",
                border: "1px solid var(--neo-border)",
                borderRadius: 12,
                color: "var(--neo-text)",
              }}
              formatter={(v) => [k(v), ""]}
              labelFormatter={() => ""}
            />
            <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#g-${title})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Hint */}
      <div className="px-4 pb-3 text-[12px] opacity-85" style={{ color: "var(--neo-text)" }}>
        {hint}
      </div>
    </div>
  );
}

export default function MarketOverviewInline({ lang = "en", data }) {
  const t = (en, vi) => (lang === "vi" ? vi : en);
  const tag = data?.asOf || t("YTD", "Lũy kế năm");

  return (
    <>
      <h2 className="iv-h2" style={{ marginBottom: 12 }}>
        {t("Market Overview", "Toàn cảnh thị trường")}
      </h2>

      {/* 3 compact tiles, no outer rectangle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
        <Tile
          title={t("E-commerce", "TMĐT")}
          tag={tag}
          kpi={`A$${k(data.ecommerce.ytdGMV)}`}
          kpiLabel="GMV"
          yoy={data.ecommerce.yoy != null ? `${(data.ecommerce.yoy * 100).toFixed(0)}%` : "—"}
          hint={t("AI stores + QR reduce setup & checkout friction.", "AI + QR giảm ma sát tạo lập & thanh toán.")}
          color={CYAN}
          data={data.ecommerce.monthly}
        />
        <Tile
          title={t("Digital Ads", "Quảng cáo số")}
          tag={tag}
          kpi={`A$${k(data.ads.ytdSpend)}`}
          kpiLabel={t("ad spend", "chi tiêu QC")}
          yoy={data.ads.yoy != null ? `${(data.ads.yoy * 100).toFixed(0)}%` : "—"}
          hint={t("DOOH + live QR turns attention into purchases.", "DOOH + QR trực tiếp biến chú ý thành mua hàng.")}
          color={PURP}
          data={data.ads.monthly}
        />
        <Tile
          title={t("Delivery & Logistics", "Giao hàng & Hậu cần")}
          tag={tag}
          kpi={`${k(data.delivery.ytdOrders)}`}
          kpiLabel={t("market size (A$)", "quy mô thị trường (A$)")}
          yoy={data.delivery.yoy != null ? `${(data.delivery.yoy * 100).toFixed(0)}%` : "—"}
          hint={t("Nearest-hub routing + SmartBox expand fulfillment.", "Định tuyến gần nhất + SmartBox mở rộng giao nhận.")}
          color={INDG}
          data={data.delivery.weekly}
        />
      </div>

      <p className="mt-3 text-[11px] opacity-70">
        Sources: Momentum Works; Australia Post; GroupM; GMI / Grand View Research.
      </p>
    </>
  );
}
