// src/components/RoadmapFullWidth.jsx
import React from "react";

/**
 * Full-width roadmap with 3 clickable phases.
 * Props:
 *  - lang: "en" | "vi"
 *  - activePhase?: number   // optional, highlight a phase (0..2)
 *  - onPhaseChange?: (idx:number) => void
 */
export default function RoadmapFullWidth({ lang = "en", activePhase = -1, onPhaseChange }) {
  const L = lang === "vi";
  const t = (en, vi) => (L ? vi : en);

  const phases = [
    {
      id: 0,
      title: t("Phase 1", "Giai đoạn 1"),
      range: "0–12m",
      bullets: [
        t("Software & devices: 10,000 business users + 500,000 end-users.", "Phần mềm & thiết bị: 10,000 biz users + 500,000 end-users."),
        t("Devices: 5,000 smart displays + 1,000 SmartBoxes.", "Thiết bị: 5,000 smart displays + 1,000 SmartBoxes."),
        t("Launch delivery service (end of phase). Pilot: AU & VN.", "Ra mắt dịch vụ giao nhận (cuối giai đoạn). Thí điểm: Úc & Việt Nam."),
      ],
      chips: ["10k biz users", "500k end-users", "5k screens", "1k SmartBoxes"],
    },
    {
      id: 1,
      title: t("Phase 2", "Giai đoạn 2"),
      range: "12–24m",
      bullets: [
        t("Autonomous delivery (ground & air) with drone partner.", "Giao nhận tự động (mặt đất & trên không) cùng đối tác drone."),
        t("Devices: 30,000 smart screens + 10,000 SmartBoxes.", "Thiết bị: 30,000 smart screens + 10,000 SmartBoxes."),
        t("Market expansion: +2 SEA capitals.", "Mở rộng: thêm 2 thủ phủ Đông Nam Á."),
        t("Deep e-commerce integrations.", "Tích hợp TMĐT chuyên sâu."),
      ],
      chips: ["Autonomous delivery", "30k screens", "10k SmartBoxes", "+2 SEA capitals"],
    },
    {
      id: 2,
      title: t("Phase 3", "Giai đoạn 3"),
      range: "24–36m",
      bullets: [
        t("Full coverage: SEA + Australia + Vietnam.", "Phủ sóng toàn SEA + Úc + Việt Nam."),
        t("Plan expansion to US & EU.", "Kế hoạch mở rộng sang Mỹ & Châu Âu."),
        t("IPO preparation: year 4/5.", "Chuẩn bị IPO: năm 4/5."),
      ],
      chips: ["SEA/AU/VN full", "US/EU plan", "IPO prep Y4/5"],
    },
  ];

  const handlePhase = (idx) => onPhaseChange?.(idx);

  return (
    <section
      className="iv-section iv-roadmap-full"
      aria-label={t("Roadmap (36 months)", "Lộ trình (36 tháng)")}
    >
      <div className="iv-roadmap-rail">
        {/* header */}
        <div className="iv-roadmap-head">
          <h2 className="iv-h2">{t("Roadmap (36 months)", "Lộ trình (36 tháng)")}</h2>
          <div className="iv-roadmap-scale">
            <span>0m</span><span>12m</span><span>24m</span><span>36m</span>
          </div>
        </div>

        {/* timeline markers */}
        <div className="iv-roadmap-line" aria-hidden="true">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>

        {/* 3 phases */}
        <div className="iv-roadmap-grid">
          {phases.map((p, idx) => (
            <div key={p.id} className="iv-roadmap-card">
              <div
                className={`iv-phase roadmap-phase transition ${idx === activePhase ? "ring-2 ring-green-300/30" : ""}`}
                data-phase={idx}
                role="button"
                tabIndex={0}
                onMouseEnter={() => handlePhase(idx)}
                onClick={() => handlePhase(idx)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handlePhase(idx)}
              >
                <div className="iv-phase-title">
                  {p.title} <small>({p.range})</small>
                </div>

                <ul className="iv-list iv-list-dots">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>

                <div className="iv-chips">
                  {p.chips.map((c, i) => <span key={i} className="chip">{c}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* targets strip */}
        <div className="iv-roadmap-targets">
          <div className="t">
            <div className="k">10k</div><div className="v">{t("businesses", "doanh nghiệp")}</div>
          </div>
          <div className="t">
            <div className="k">500k</div><div className="v">{t("users", "người dùng")}</div>
          </div>
          <div className="t">
            <div className="k">30k</div><div className="v">{t("smart screens", "màn hình thông minh")}</div>
          </div>
          <div className="t">
            <div className="k">10k</div><div className="v">SmartBoxes</div>
          </div>
          <div className="t">
            <div className="k">Y4/5</div><div className="v">{t("IPO prep", "Chuẩn bị IPO")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
