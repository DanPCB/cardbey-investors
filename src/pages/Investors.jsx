import React from "react";
import HeaderBar from "@/components/HeaderBar";
import Hero from "@/components/Hero";
import MeshBackground3D from "../components/MeshBackground3D";
import "../styles/investors.css";


import AnimatedRevenueCard from "../components/AnimatedRevenueCard";
import MarketOverviewInline from "../components/MarketOverviewInline";
import RoadmapFullWidth from "../components/RoadmapFullWidth";
import chipImage from "../assets/chip.png";
import FundraisingJourneyInteractive from "../components/FundraisingJourneyInteractive";
import HumanIcon from "../icons/Human.png";
import GPTIcon from "../icons/GPT.png";
import GROKIcon from "../icons/GROK.png";
import GitIcon from "../icons/Git.png";
import GlowCard from "../components/GlowCard";
import heroShot from "../assets/chip.png";
import NewsVideoSection from "../components/NewsVideoSection";
import CursorLogo from "../icons/cursor.png";
import ContactFounderModal from "../components/ContactFounderModal";
import "../styles/contact-founder.css";





<GlowCard>
  <img src={heroShot} alt="AI Chip" style={{ width: "100%", borderRadius: 14 }} />
</GlowCard>
function forceDownload(url, filename) {
  fetch(url).then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.blob();
  }).then(blob => {
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = filename || url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  }).catch(() => { window.location.href = url; });
}


function ModelTabs({ lang = "en" }) {
  const [tab, setTab] = React.useState(0);

  const TABS = [
    {
      label: lang === "vi" ? "Tạo Cửa Hàng AI" : "AI Store Creation",
      kpiLabel: lang === "vi" ? "Thời gian tạo" : "Time-to-store",
      kpiValue: "~60s",
      bullets:
        lang === "vi"
          ? ["Tạo cửa hàng trong vài phút", "Kéo thả sản phẩm, đồng bộ mạng xã hội", "Tối ưu chuyển đổi bằng dữ liệu"]
          : ["Spin up a store in minutes", "Drag & drop products, social sync", "Data-driven conversion optimization"],
    },
    {
      label: lang === "vi" ? "Giao Nhận Tự Động" : "Automated Delivery",
      kpiLabel: lang === "vi" ? "Thời gian giao" : "Avg delivery",
      kpiValue: "30–45m",
      bullets:
        lang === "vi"
          ? ["Tự động hóa điều phối", "Realtime tracking", "Chi phí/km tối ưu"]
          : ["Automated dispatching", "Realtime tracking", "Optimized cost per km"],
    },
    {
      label: lang === "vi" ? "Mạng Quảng Cáo Thông Minh" : "Smart Ad Network",
      kpiLabel: lang === "vi" ? "Tỷ lệ quét" : "QR scan→buy",
      kpiValue: "↑ conv",
      bullets:
        lang === "vi"
          ? ["QR mua ngay trên màn hình C-Net", "Đo lường chuyển đổi end-to-end", "Mua hàng tại điểm chạm"]
          : ["QR buy-now on C-Net screens", "End-to-end conversion measurement", "Purchase at the point of impression"],
    },
    {
      label: "CAI • " + (lang === "vi" ? "tài chính nội bộ" : "internal finance"),
      kpiLabel: lang === "vi" ? "Chu kỳ tiền" : "Cash cycle",
      kpiValue: "faster",
      bullets:
        lang === "vi"
          ? ["Đối soát tự động", "Thanh toán/FX tối ưu", "Tài trợ vận hành (tương lai)"]
          : ["Automated reconciliation", "Optimized payments/FX", "Ops financing (future)"],
    },
  ];

  const active = TABS[tab];

  return (
  <div className="iso-wrap">
    <div className="iso-tabs">
      {TABS.map((t, i) => (
        <button
          key={t.label}
          className={`iso-tab ${i === tab ? "active" : ""}`}
          onClick={() => setTab(i)}
        >
          {t.label}
        </button>
      ))}
    </div>


    <div className="iso-left iso-demo"
  style={{
    '--iso-img-scale': '1.40',
    '--iso-img-x': '-50%',
    '--iso-img-y': '30%',
  }}
>
        <img
    src={chipImage}
    alt="AI Chip"
    className="chip-img"
  />
</div>

      <div className="iso-right">
        <ul className="iso-points">
          {active.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div className="iso-kpi" aria-label="KPI">
          <div className="iso-kpi-label">{active.kpiLabel}</div>
          <div className="iso-kpi-value">{active.kpiValue}</div>
        </div>
      </div>
    </div>
  );

}

// --- YTD / Latest Snapshot (with sources in comments) ---
const ytd = {
  asOf: "YTD 2025", // label only
  ecommerce: {
    // SEA 2024 GMV (US$145.2B) + AU 2024 online spend (A$69B ≈ US$46B @ 0.67)
    ytdGMV: 145_200_000_000 + 46_000_000_000,   // ≈ US$191.2B (SEA + AU)
    yoy: 0.12, // SEA YoY +12% (Momentum Works)
    monthly: [
      { m: "Jan", v: 24_000_000_000 },
      { m: "Feb", v: 25_000_000_000 },
      { m: "Mar", v: 30_000_000_000 },
      { m: "Apr", v: 32_000_000_000 },
      { m: "May", v: 35_000_000_000 },
      { m: "Jun", v: 45_200_000_000 },
    ],
  },
  ads: {
    // Global digital ad spend headline 2024 ≈ US$1.04T (GroupM)
    ytdSpend: 1_040_000_000_000,
    yoy: 0.095, // ~9.5% growth context
    monthly: [
      { m: "Jan", v: 140_000_000_000 },
      { m: "Feb", v: 155_000_000_000 },
      { m: "Mar", v: 170_000_000_000 },
      { m: "Apr", v: 175_000_000_000 },
      { m: "May", v: 195_000_000_000 },
      { m: "Jun", v: 205_000_000_000 },
    ],
  },
  delivery: {
    // Global last-mile market ~US$175.3B (2023 base), use as rolling market size
    ytdOrders: 175_300_000_000, // treat as market revenue size (label accordingly)
    yoy: 0.07, // mid single-digit-to-high single-digit CAGR proxy
    weekly: [
      { w: "W1", v: 26_000_000_000 },
      { w: "W2", v: 27_500_000_000 },
      { w: "W3", v: 28_600_000_000 },
      { w: "W4", v: 29_200_000_000 },
      { w: "W5", v: 31_200_000_000 },
      { w: "W6", v: 32_800_000_000 },
    ],
  },
};

function MarketSection({ lang = "en" }) {
  const items =
    lang === "vi"
      ? [
          "500k+ màn hình DOOH/POS (SEA + AU/NZ).",
          "Mục tiêu 10% → 50k thiết bị.",
          "Doanh thu 3 năm: A$36M → A$216M → A$900M.",
        ]
      : [
          "500k+ DOOH/POS screens (SEA + AU/NZ).",
          "Target 10% share → 50k devices.",
          "3-yr revenue path: A$36M → A$216M → A$900M.",
        ];

  return (
    <section className="container mx-auto px-4 md:px-8 max-w-6xl">
  <div className="iv-card">
    <h2 className="iv-h2">{lang === "vi" ? "Thị trường & Cơ hội" : "Market & Opportunity"}</h2>

    <div className="grid md:grid-cols-2 gap-6 mt-4">
      <ul className="iv-list space-y-2">
        {items.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>

      <AnimatedRevenueCard /> {/* now just the chart + numbers */}
    </div>
  </div>
</section>

  );
}


function UseOfFundsAndExit({ lang = "en", safeHref = "#" }) {
  const title = lang === "vi" ? "Đề Xuất Đầu Tư" : "Investment Offer";
  const copyL = lang === "vi"
    ? ["Gọi vốn: A$1–3M (Seed).", "Công cụ: SAFE (AU) — Cap A$1M, chiết khấu 15%.", "UUse of funds: devices, AU & VN rollout, delivery infra, seller growth."]
    : ["Raise: A$1–3M (Seed).", "Instrument: SAFE (AU) — Cap A$18M, 15% discount.", "Seller growth"];
  const exitCopy = lang === "vi"
    ? ["Mục tiêu exit 3–5 năm", "Kịch bản IPO/M&A", "Ước tính ROI dựa trên tăng trưởng thiết bị & GMV"]
    : ["Target exit 3–5 years", "IPO/M&A scenarios", "ROI modeled on device & GMV growth"];

  return (
    <div className="iv-grid iv-grid-2">
      <div className="iv-card">
        <h2 className="iv-h2">{title}</h2>
        <ul className="iv-list">{copyL.map((x, i) => <li key={i}>{x}</li>)}</ul>
        <a className="iv-btn iv-btn-accent" href={safeHref} target="_blank" rel="noreferrer">
          {lang === "vi" ? "Xem điều khoản SAFE" : "View SAFE terms"}
        </a>
      </div>
      <div className="iv-card">
        <h3 className="iv-h3">{lang === "vi" ? "Kế hoạch Exit & ROI" : "Exit plan & ROI"}</h3>
        <ul className="iv-list">{exitCopy.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </div>
    </div>
  );
}

function StickySafeCTA({ lang = "en", safeHref = "#" }) {
  return (
    <div className="iv-sticky-cta">
      <a className="iv-btn iv-btn-accent" href={safeHref} target="_blank" rel="noreferrer">
        {lang === "vi" ? "Ký SAFE" : "Sign SAFE"}
      </a>
    </div>
  );
}

/* -------------------------------------------------------
   Investors page
-------------------------------------------------------- */
function FundraisingJourney({ lang = "en" }) {
  const L = lang === "vi";

    return (
  <section className="iv-section">
    <div className="iv-container">
      <div className="iv-card iv-card-tight">
        <h2 className="iv-h2 neon-title">
          {L
            ? "Hành trình Gọi vốn (Nguồn vốn  cho từng giai đoạn)"
            : "Fundraising Journey (Fund raised for Each Phase)"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Phase 1 */}
          <div
            className="glow-card spotlight p-4"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.removeProperty("--mx");
              e.currentTarget.style.removeProperty("--my");
            }}
          >
            <div className="text-sm uppercase tracking-wide text-gray-300 mb-1">
              {L ? "Giai đoạn 1 (0–12m)" : "Phase 1 (0–12m)"}
            </div>
            <div className="font-semibold text-green-300">
              💰 $3M — 🇦🇺 AU SPV (200 × $15k)
            </div>
            <div className="text-gray-400 mt-1 text-sm">
              {L
                ? "Nguồn vốn từ nhà đầu tư sớm & angels nội địa"
                : "Fund raised from early believers & local angels"}
            </div>
          </div>

          {/* Phase 2 */}
          <div
            className="glow-card spotlight p-4"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.removeProperty("--mx");
              e.currentTarget.style.removeProperty("--my");
            }}
          >
            <div className="text-sm uppercase tracking-wide text-gray-300 mb-1">
              {L ? "Giai đoạn 2 (12–24m)" : "Phase 2 (12–24m)"}
            </div>
            <div className="font-semibold text-green-300">
              💰 $5M–$10M — 🇸🇬 SG (Accredited & diaspora)
            </div>
            <div className="font-semibold text-green-300">
              💰 $5M — 🇺🇸 Reg CF (Republic/Wefunder)
            </div>
            <div className="text-gray-400 mt-1 text-sm">
              {L
                ? "Nguồn vốn  từ mạng lưới SEA & micro-investors toàn cầu"
                : "Fund raised from SEA networks & global micro-investors"}
            </div>
          </div>

          {/* Phase 3 */}
          <div
            className="glow-card spotlight p-4"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.removeProperty("--mx");
              e.currentTarget.style.removeProperty("--my");
            }}
          >
            <div className="text-sm uppercase tracking-wide text-gray-300 mb-1">
              {L ? "Giai đoạn 3 (24–36m)" : "Phase 3 (24–36m)"}
            </div>
            <div className="font-semibold text-green-300">
              💰 $20M–$30M — 🇦🇪 UAE (FOs + tokenized CAI)
            </div>
            <div className="font-semibold text-green-300">
              💰 $50M–$100M — 🇺🇸 Reg A+ + 🇦🇪 tokenized
            </div>
            <div className="text-gray-400 mt-1 text-sm">
              {L
                ? "Nguồn vốn  từ retail toàn cầu & tổ chức"
                : "Fund raised from global retail & institutional partners"}
            </div>
          </div>
        </div>

        {/* optional thin divider “pipeline” */}
        <div className="mt-6 h-px bg-[rgba(255,255,255,0.08)] rounded-full" />
        
      </div>
    </div>
  </section>
);

}

export default function Investors(props = {}) {
  const { homeHref = "/" } = props;

  const t = useI18n();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activePhase, setActivePhase] = React.useState(0);
const [openContact, setOpenContact] = React.useState(false);
  // IR assets
  const IR = {
    packEn: import.meta.env.VITE_IR_PACK_EN || "/files/Cardbey_Investor_Pitch_Pack_English.docx",
  packVi: import.meta.env.VITE_IR_PACK_VI || "/files/Cardbey_Investor_Pitch_Pack_Vietnamese.docx",
    safeEn:  import.meta.env.VITE_IR_SAFE_EN  || "/files/SAFE_Agreement_Cardbey.docx",
    safeVi:  import.meta.env.VITE_IR_SAFE_VI  || "/files/SAFE_Agreement_Cardbey_Vietnamese.docx",
    founder: "founder@cardbey.com",
    calendly:"https://calendly.com/cardbey/founder",
  };

  const lang = t?.code || t?.lang || (t?.langLabel === "VI" ? "vi" : "en");
  const isVI = lang === "vi";
  const packHref = isVI ? IR.packVi : IR.packEn;
  const safeHref = isVI ? IR.safeVi : IR.safeEn;
  const contactHref = `mailto:${IR.founder}`;
  

  return (
    
    <div className="iv-wrap">
      {/* Background */}
      <div className="iv-bg" aria-hidden="true">
  <div className="iv-bg-gradient" />
  <MeshBackground3D
  className="iv-bg-canvas"
  density={180}
  globalOpacity={0.7}
  fadeOnScroll
  fadeStartVH={45}
  fadeEndVH={12}
  minOpacity={0}
/>
<section id="market-overview" className="iv-section iv-no-shell">…</section>

</div>

    
      
      {/* Skip link */}
      <a href="#iv-main" className="iv-skip">Skip to content</a>

      {/* Header */}
      <header className="iv-header">
        <div className="iv-container iv-header-inner">
          <a href={homeHref} className="iv-brand">
            <img
  className="iv-logo-img"
  src="/cardbey-icon.png"
  alt="Cardbey"
  width="28"
  height="28"
/>
            <span className="iv-brand-name">Cardbey</span>
            <span className="iv-badge">{t.investor}</span>
          </a>

          <nav className="iv-nav">
            <a
  className="iv-btn iv-btn-primary"
  href={packHref}
  download={isVI ? "Cardbey_Investor_Pack_VI.docx" : "Cardbey_Investor_Pack_EN.docx"}
  rel="noopener noreferrer"
>
  {t.downloadPack}
</a>

            <a className="iv-btn iv-btn-accent" href={safeHref} target="_blank" rel="noreferrer">
              {t.signSafe}
            </a>
            <button className="iv-btn iv-btn-ghost" onClick={() => setOpenContact(true)}>
  {t.contactFounder}
</button>

            <button className="iv-btn iv-btn-ghost" onClick={t.toggle} aria-label="Toggle language">
              {t.langLabel}
            </button>
            <button className="iv-menu" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu">
              <span/><span/><span/>
            </button>
          </nav>
        </div>

        {mobileOpen && (
  <div className="iv-mobile-nav iv-container">
    <button
  className="iv-btn iv-btn-primary"
  onClick={(e) => {
    e.preventDefault(); e.stopPropagation();
    forceDownload(packHref, isVI ? "Cardbey_Investor_Pack_VI.pdf" : "Cardbey_Investor_Pack_EN.pdf");
  }}
>
  {t.downloadPack}
</button>


    <button
      className="iv-btn iv-btn-accent"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        forceDownload(safeHref, "SAFE_Agreement_Cardbey.docx");
      }}
    >
      {t.signSafe}
    </button>

    <button className="iv-btn iv-btn-ghost" onClick={() => setOpenContact(true)}>
      {t.contactFounder}
    </button>
  </div>
)}


      </header>
      <div className="iv-header-spacer" aria-hidden="true" />
      <ContactFounderModal
  open={openContact}
  onClose={() => setOpenContact(false)}
  founderName="Danh Pham"
  email={IR.founder}
  phone="+61 451 867 365"
  deckUrl={packHref}
  lang={lang}
  apiPath="/api/contact"   // or "https://api.cardbey.com/api/contact"
/>


      
      {/* HERO */}
<section className="iv-section iv-hero iv-hero--tight aurora-wrap aurora" style={{position:'relative'}}>
  {/* tiny stars overlay */}
  <div className="stars" />

  <div className="iv-container iv-hero-inner">
    <div className="iv-hero-left">
      <h1 className="iv-h1 neon-title text-3xl md:text-5xl font-extrabold">
        {t.heroTitle}
      </h1>

      <p className="iv-sub text-base md:text-lg" style={{color:'var(--neo-muted)', maxWidth:680}}>
        {t.heroSubtitle}
      </p>

      </div>
  </div>
</section>


      <main id="iv-main">
        {/* ROW 1 — Business model (tabs + KPI) */}
        <section className="iv-section iv-bm iv-compact">
  <div className="iv-container">
    <ModelTabs lang={t.lang} />
  </div>
</section>

        {/* ROW 2 — Problem / Solution */}
        <section className="iv-section iv-probsol">
  <div className="iv-container iv-grid iv-grid-2">
            <div className="iv-card iv-danger">
              <h3 className="iv-h3">{t.problemTitle}</h3>
              <ul className="iv-list">{t.problem.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </div>
            <div className="iv-card iv-success">
              <h3 className="iv-h3">{t.solutionTitle}</h3>
              <ul className="iv-list">{t.solution.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </div>
          </div>
        </section>

<section id="market-overview" className="iv-section iv-no-shell">
  <div className="iv-container">
    <div className="iv-card iv-card-tight">
      <MarketOverviewInline lang={lang} data={ytd} />
    </div>
  </div>
</section>

        

<section className="iv-section">
  <div className="iv-container">
    <MarketSection lang={lang} />
  </div>
</section>

{/* --- ROADMAP (full width) --- */}

<RoadmapFullWidth
  lang={lang}
  activePhase={activePhase}
  onPhaseChange={setActivePhase}
/>

<FundraisingJourneyInteractive
  lang={lang}
  activePhase={activePhase}
  onPhaseChange={setActivePhase}
/>

        {/* ROW 4 — Seed & Exit */}
        <section className="iv-section">
          <div className="iv-container">
            <UseOfFundsAndExit lang={lang} safeHref={safeHref} />
          </div>
        </section>

        
        {/* ROW 6 — Offer & CTA */}
       <div className="cta-row">
  <a
  href="/files/Cardbey_Investor_Pitch_Pack_English.docx"
  download="Cardbey_Investor_Pack_EN.docx"
  className="iv-btn iv-btn-green"
  rel="noopener noreferrer"
>
  Tải Investor Pack
</a>


  <a
    href="/files/SAFE_Agreement_Cardbey.docx"
    download="SAFE_Agreement_Cardbey.docx"
    rel="noopener noreferrer"
    className="iv-btn iv-btn-purple"
  >
    Sign the SAFE Note
  </a>
</div>



        {/* TEAM */}
<section className="iv-section">
  <div className="iv-container">
    <h2 className="iv-h2">Team</h2>

    {/* Top row — 3 compact cards */}
    <div className="team-grid">
      <div className="team-card">
        <div className="team-k">Founder</div>
        <div className="team-v">Vision, product, partnerships.</div>
      </div>

      <div className="team-card">
        <div className="team-k">Ops/Market</div>
        <div className="team-v">Rollout AU &amp; SEA, logistics.</div>
      </div>

      <div className="team-card">
        <div className="team-k">Advisor</div>
        <div className="team-v">Growth, strategy, capital.</div>
      </div>
    </div>

    {/* Full-width Tech Lead bubble */}
    <div className="tech-lead-card">
      <h3 className="tech-lead-title">Tech Lead</h3>

      {/* Icon row (use any emojis/SVGs you like) */}
      <div className="tech-icon-row">
  <img src={HumanIcon} alt="Developer" />
  <img src={GPTIcon} alt="AI/ML" />
  <img src={CursorLogo} alt="Cursor" />
  <img src={GROKIcon} alt="Devices" />
  <img src={GitIcon} alt="Automation" />
  

</div>

      <p className="tech-lead-sub">AI/ML, platform &amp; devices.</p>
    </div>
  </div>
</section>

      </main>

      {/* Sticky CTA (mobile) */}
      <StickySafeCTA lang={lang} safeHref={safeHref} />

      {/* Footer */}
      <footer className="iv-footer">
        <div className="iv-container">{t.footer}</div>
      </footer>
    </div>
  );
}

/* ----------------------------- i18n ----------------------------- */
function useI18n() {
  const [lang, setLang] = React.useState(
    (typeof window !== "undefined" && localStorage.getItem("cb_lang")) || "en"
  );

  const dict = {
    en: {
      investor: "Investor",
      downloadPack: "Download Investor Pack",
      signSafe: "Sign the SAFE Note",
      contactFounder: "Contact Founder",
      heroTitle: "Own the Machine That Builds & Runs Businesses 24/7",
      heroSubtitle:
        "Cardbey is an AI-powered ecosystem: build online store → advertise → deliver → pay — on autopilot.",
      pills: [
        { title: "AI Store Creation", sub: "Live MVP" },
        { title: "C-Net Devices", sub: "Deployed in Melbourne" },
        { title: "Seed: A$1–3M", sub: "Founder-Friendly SAFE" },
        { title: "IPO Target", sub: "Within 5 Years" },
      ],
      problemTitle: "The Problem",
      problem: [
        "Hard & costly for SMEs to set up, market, and deliver.",
        "Physical ads rarely convert to transactions.",
        "Fragmented tools; no unified growth engine.",
      ],
      solutionTitle: "Our Solution",
      solution: [
        "AI builds stores in seconds (Social-Ecommerce).",
        "C-Net smart displays turn ads into instant QR purchases.",
        "Automated delivery + future financial layer (AIcoin).",
      ],
      marketTitle: "Market & Opportunity",
      market: [
        "500k+ DOOH/POS screens (SEA + AU/NZ).",
        "Target 10% share → 50k devices.",
        "3-yr revenue path: A$36M → A$216M → A$900M.",
      ],
      tractionTitle: "Traction",
      traction: [
        "AI store creation live & working.",
        "C-Net devices piloted in Melbourne.",
        "Packaging division supports sellers.",
      ],
      roadmapTitle: "Roadmap (36 Months)",
      roadmap: [
        ["Phase 1 (0–12m)", "1,500 devices in Melbourne + 2 SEA capitals; seller onboarding."],
        ["Phase 2 (12–24m)", "10,000 devices across 6 countries; scale delivery automation."],
        ["Phase 3 (24–36m)", "50,000 premium devices; AIcoin expansion; IPO prep."],
      ],
      offerTitle: "Investment Offer",
      offer: [
        "Raise: A$1–3M (Seed).",
        "Instrument: SAFE (AU) — Cap A$18M, 15% discount.",
        "Use of funds: devices, AU & VN rollout, delivery infra, seller growth.",
        "Limited allocation for first investors.",
      ],
      actionTitle: "Take Action",
      actionSub: "Download the investor pack or sign the SAFE now.",
      teamTitle: "Team",
      team: [
        ["Founder", "Vision, product, partnerships."],
        ["Tech Lead", "AI/ML, platform & devices."],
        ["Ops/Market", "Rollout AU & SEA, logistics."],
      ],
      footer: `© ${new Date().getFullYear()} Cardbey — SIGNSCATER PTY LTD • ABN 50 685 406 697 • ACN 685 406 697 • Victoria, Australia`,
      langLabel: "EN",
    },
    vi: {
      investor: "Nhà đầu tư",
      downloadPack: "Tải Investor Pack",
      signSafe: "Ký SAFE Note",
      contactFounder: "Liên hệ Founder",
      heroTitle: "Sở hữu Cỗ Máy Xây Dựng & Vận Hành Doanh Nghiệp 24/7",
      heroSubtitle:
        "Cardbey là hệ sinh thái công nghệ AI, tự động xây dựng: Cửa hàng online  → Quảng cáo → Giao nhận → Thanh toán.",
      pills: [
        { title: "Tạo Cửa Hàng AI", sub: "MVP đang chạy" },
        { title: "Thiết bị C-Net", sub: "Đã triển khai tại Melbourne" },
        { title: "Seed: A$1–3M", sub: "SAFE thân thiện Founder" },
        { title: "Mục tiêu IPO", sub: "Trong 5 năm" },
      ],
      problemTitle: "Vấn đề",
      problem: [
        "SME khó & tốn kém để thiết lập, marketing, giao nhận.",
        "Quảng cáo truyền thống ít chuyển đổi thành giao dịch.",
        "Công cụ rời rạc; thiếu động cơ tăng trưởng thống nhất.",
      ],
      solutionTitle: "Giải pháp",
      solution: [
        "AI tạo cửa hàng trong vài phút (Social-Ecommerce).",
        "Màn hình C-Net biến quảng cáo thành mua hàng QR tức thì.",
        "Giao nhận tự động + lớp tài chính tương lai (AIcoin).",
      ],
      marketTitle: "Thị trường & Cơ hội",
      market: [
        "500k+ màn hình DOOH/POS (SEA + AU/NZ).",
        "Mục tiêu 10% → 50k thiết bị.",
        "Doanh thu 3 năm: A$36M → A$216M → A$900M.",
      ],
      tractionTitle: "Traction",
      traction: [
        "Tạo cửa hàng bằng AI đã chạy.",
        "C-Net thử nghiệm tại Melbourne.",
        "Bộ phận packaging hỗ trợ seller.",
      ],
      roadmapTitle: "Lộ trình (36 tháng)",
      roadmap: [
        ["Giai đoạn 1 (0–12m)", "1.500 thiết bị ở Melbourne + 2 thủ phủ SEA; onboard seller."],
        ["Giai đoạn 2 (12–24m)", "10.000 thiết bị ở 6 quốc gia; mở rộng tự động giao nhận."],
        ["Giai đoạn 3 (24–36m)", "50.000 thiết bị premium; mở rộng AIcoin; chuẩn bị IPO."],
      ],
      offerTitle: "Gói đầu tư",
      offer: [
        "Gọi vốn: A$1–3M (Seed).",
        "Công cụ: SAFE (AU) — Cap A$18M, chiết khấu 15%.",
        "Dùng vốn: thiết bị, rollout AU & VN, hạ tầng giao nhận, tăng trưởng seller.",
        "Số lượng ưu tiên cho nhà đầu tư đầu tiên.",
      ],
      actionTitle: "Hành động",
      actionSub: "Tải pack nhà đầu tư hoặc ký SAFE ngay.",
      teamTitle: "Đội ngũ",
      team: [
        ["Founder", "Tầm nhìn, sản phẩm, đối tác."],
        ["Tech Lead", "AI/ML, nền tảng & thiết bị."],
        ["Ops/Market", "Triển khai AU & SEA, logistics."],
      ],
      footer: `© ${new Date().getFullYear()} Cardbey — SIGNSCATER PTY LTD • ABN 50 685 406 697 • ACN 685 406 697 • Victoria, Australia`,
      langLabel: "VI",
    },
  };
  

  const value = {
    ...dict[lang],
    code: lang,
    lang,
    toggle: () => {
      const n = lang === "en" ? "vi" : "en";
      setLang(n);
      if (typeof window !== "undefined") localStorage.setItem("cb_lang", n);
    },
  };

  return value;
}
