import React from "react";

/**
 * RoadmapMilestone — 36-month milestone map with targets
 * Drop into Investors.jsx: <RoadmapMilestone />
 */
export default function RoadmapMilestone({ lang = "en" }) {
  const t = (en, vi) => (lang === "vi" ? vi : en);

  const phases = [
    {
      tag: t("Phase 1", "Giai đoạn 1"),
      span: "0–12m",
      highlights: [
        t("Software & devices", "Phần mềm & thiết bị") + ": 10,000 business users • 500,000 end-users",
        t("Hardware footprint", "Thiết bị") + ": 5,000 smart displays • 1,000 SmartBoxes",
        t("Delivery service launch (EoP)", "Ra mắt dịch vụ giao nhận (cuối giai đoạn)"),
        t("Pilot markets: Australia & Vietnam", "Thị trường thí điểm: Úc & Việt Nam"),
      ],
      chips: [
        "10k biz users",
        "500k end-users",
        "5k screens",
        "1k SmartBoxes",
      ],
    },
    {
      tag: t("Phase 2", "Giai đoạn 2"),
      span: "12–24m",
      highlights: [
        t("Autonomous delivery (ground & air) with drone partner", "Giao nhận tự động (mặt đất & trên không) cùng đối tác drone"),
        t("Hardware footprint", "Thiết bị") + ": 30,000 smart screens • 10,000 SmartBoxes",
        t("Market expansion: +2 SEA capitals", "Mở rộng: thêm 2 thủ phủ Đông Nam Á"),
        t("Deep e-commerce integrations", "Tích hợp TMĐT chuyên sâu"),
      ],
      chips: [
        "Autonomous delivery",
        "30k screens",
        "10k SmartBoxes",
        "+2 SEA capitals",
      ],
    },
    {
      tag: t("Phase 3", "Giai đoạn 3"),
      span: "24–36m",
      highlights: [
        t("Full SEA + Australia + Vietnam coverage", "Phủ sóng toàn SEA + Úc + Việt Nam"),
        t("Plan US & EU expansion", "Kế hoạch mở rộng sang Mỹ & Châu Âu"),
        t("IPO prep target: Year 4/5", "Chuẩn bị IPO: năm 4/5"),
      ],
      chips: [
        "SEA/AU/VN full",
        "US/EU plan",
        "IPO prep Y4/5",
      ],
    },
  ];

  const markers = [
    { at: 0,   label: "0m" },
    { at: 12,  label: "12m", note: t("Delivery launch", "Ra mắt giao nhận") },
    { at: 18,  label: "18m", note: t("Drone partnership", "Đối tác drone") },
    { at: 24,  label: "24m", note: t("Autonomous live", "Giao nhận tự động") },
    { at: 36,  label: "36m", note: t("SEA full", "Phủ sóng SEA") },
  ];

  return (
    <section className="iv-section">
      <div className="iv-container">
        <h2 className="iv-h2">{t("Roadmap (36 Months)", "Lộ trình (36 tháng)")}</h2>

        {/* Timeline rail */}
        <div className="rm-rail">
          <div className="rm-line" />
          {markers.map((m) => (
            <div
              key={m.at}
              className="rm-mark"
              style={{ left: `calc(${(m.at / 36) * 100}% - 8px)` }}
              aria-label={m.label}
              title={m.note ? `${m.label} • ${m.note}` : m.label}
            >
              <div className="rm-dot" />
              <div className="rm-label">{m.label}</div>
              {m.note && <div className="rm-note">{m.note}</div>}
            </div>
          ))}
        </div>

        {/* Phase targets */}
        <div className="iv-grid iv-grid-3 iv-mt">
          {phases.map((p) => (
            <div key={p.span} className="iv-card rm-card">
              <div className="rm-head">
                <span className="rm-tag">{p.tag}</span>
                <span className="rm-span">{p.span}</span>
              </div>

              <ul className="iv-list rm-list">
                {p.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              <div className="rm-chips">
                {p.chips.map((c) => (
                  <span key={c} className="rm-chip">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Launching targets summary */}
        <div className="iv-card rm-summary">
          <div className="rm-summary-grid">
            <div>
              <div className="rm-k">10k</div>
              <div className="rm-v">{t("business users", "doanh nghiệp")}</div>
            </div>
            <div>
              <div className="rm-k">500k</div>
              <div className="rm-v">{t("end-users", "người dùng")}</div>
            </div>
            <div>
              <div className="rm-k">30k</div>
              <div className="rm-v">{t("smart screens (P2)", "màn hình thông minh (GĐ2)")}</div>
            </div>
            <div>
              <div className="rm-k">10k</div>
              <div className="rm-v">{t("SmartBoxes (P2)", "SmartBox (GĐ2)")}</div>
            </div>
            <div>
              <div className="rm-k">Y4/5</div>
              <div className="rm-v">{t("IPO preparation", "Chuẩn bị IPO")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
