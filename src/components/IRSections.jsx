import React from "react";

/* ---------------- Row 1 — Business Model (4 tabs) ---------------- */
export function ModelTabs({ lang = "en" }) {
  const L = lang === "vi"
    ? {
        title: "Mô hình kinh doanh",
        tabs: ["AI Tạo Cửa Hàng", "Giao nhận tự động", "Mạng quảng cáo số", "CAI • tài chính nội bộ"],
        bullets: [
          ["Tạo cửa hàng trong ~60 giây", "Kéo/thả sản phẩm, đồng bộ MXH", "Tối ưu chuyển đổi theo dữ liệu"],
          ["Định tuyến + theo dõi đơn", "Đối tác giao hàng tích hợp", "SLA & thu hộ minh bạch"],
          ["Màn hình C-Net → Mua bằng QR", "Đo lường minh bạch", "Tối ưu theo vị trí & thời tiết"],
          ["Ví doanh nghiệp + hoá đơn", "Dòng tiền/đối soát tự động", "Điểm tín dụng AI cho seller"],
        ],
        metricLabel: ["Thời gian tạo", "Tỷ lệ đúng giờ", "QR→Mua", "Chu kỳ thu tiền"],
        metricVal:    ["~60s", "96–99%", "4–10%", "T-1/T-3"],
      }
    : {
        title: "Business model",
        tabs: ["AI Store Creation", "Automated Delivery", "Smart Ad Network", "CAI • internal finance"],
        bullets: [
          ["Spin up a store in ~60s", "Drag & drop products, social sync", "Data-driven conversion optimization"],
          ["Routing + order tracking", "Carrier integrations", "Clear SLAs & COD"],
          ["C-Net screens → QR purchase", "Verified attribution", "Geo/weather targeting"],
          ["Business wallet & invoicing", "Automated settlements", "AI credit line for sellers"],
        ],
        metricLabel: ["Time-to-store", "On-time rate", "QR→Purchase", "Cash cycle"],
        metricVal:    ["~60s", "96–99%", "4–10%", "T-1/T-3"],
      };

  const [i, setI] = React.useState(0);

  return (
    <section className="iv-section">
      <div className="iv-container">
        <h2 className="iv-h2">{L.title}</h2>

        <div className="iv-tabs">
          <div className="iv-tablist" role="tablist" aria-label={L.title}>
            {L.tabs.map((t, idx) => (
              <button
                key={t}
                role="tab"
                aria-selected={i === idx}
                className={`iv-tab ${i===idx ? "is-active":""}`}
                onClick={() => setI(idx)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="iv-tabpanel">
            <div className="iv-model">
              <div className="iv-model-media">
                {/* Drop your mp4/pngs in /public/media with these names, or change paths */}
                {i === 0 && (
                  <video src="/media/ai-store-demo.mp4" muted loop playsInline controls poster="/media/ai-store.png"/>
                )}
                {i === 1 && (
                  <video src="/media/delivery-demo.mp4" muted loop playsInline controls poster="/media/delivery.png"/>
                )}
                {i === 2 && (
                  <video src="/media/cnet-demo.mp4" muted loop playsInline controls poster="/media/cnet.png"/>
                )}
                {i === 3 && (
                  <video src="/media/cai-demo.mp4" muted loop playsInline controls poster="/media/cai.png"/>
                )}
              </div>

              <ul className="iv-list iv-model-bullets">
                {L.bullets[i].map((b) => <li key={b}>{b}</li>)}
              </ul>

              <div className="iv-kpi">
                <div className="iv-kpi-k">{L.metricLabel[i]}</div>
                <div className="iv-kpi-v">{L.metricVal[i]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Row 3 — Market & Opportunity ---------------- */
export function MarketSection({ lang="en" }) {
  const L = lang==="vi"
    ? { title:"Thị trường & Cơ hội", labels:["TAM","SAM","Wedge"], notes:"Giả định: DOOH+POS SEA/AU/NZ; wedge = thiết bị C-Net tại khu vực trọng điểm." }
    : { title:"Market & Opportunity", labels:["TAM","SAM","Wedge"], notes:"Assumptions: DOOH+POS SEA/AU/NZ; wedge = C-Net devices in key cities." };

  // Example values; swap for your sourced numbers
  const data = [
    { label: L.labels[0], val: 30 },  // $30B
    { label: L.labels[1], val: 6 },   // $6B
    { label: L.labels[2], val: 1.2 }, // $1.2B target wedge
  ];

  const max = Math.max(...data.map(d=>d.val));

  return (
    <section className="iv-section">
      <div className="iv-container">
        <h2 className="iv-h2">{L.title}</h2>
        <div className="iv-market-bars">
          {data.map(d=>(
            <div key={d.label} className="iv-market-row">
              <div className="iv-market-label">{d.label}</div>
              <div className="iv-market-bar">
                <div className="iv-market-fill" style={{width:`${(d.val/max)*100}%`}} />
              </div>
              <div className="iv-market-val">${d.val}B</div>
            </div>
          ))}
        </div>
        <details className="iv-assump">
          <summary>Assumptions</summary>
          <p>{L.notes}</p>
        </details>
      </div>
    </section>
  );
}

/* ---------------- Row 4 — Seed + Exit ---------------- */
export function UseOfFundsAndExit({ lang="en", safeHref="#" }) {
  const L = lang==="vi"
    ? {
        funds:"Sử dụng vốn (ước tính)",
        exit:"Mục tiêu Exit & hoàn vốn",
        sign:"Ký SAFE",
        tableHead:["Kịch bản","Năm 3","Năm 5"],
        rows:[
          ["Thấp","x1.5–2.0","x2–3"],
          ["Cơ sở","x3–5","x6–10"],
          ["Tốt","x7–10","x12–20"],
        ],
        disclaimer:"Thông tin dự phóng, có thể thay đổi. Không phải lời chào mời chứng khoán."
      }
    : {
        funds:"Use of funds (est.)",
        exit:"Exit targets & ROI",
        sign:"Sign SAFE",
        tableHead:["Scenario","Year 3","Year 5"],
        rows:[
          ["Low","x1.5–2.0","x2–3"],
          ["Base","x3–5","x6–10"],
          ["Upside","x7–10","x12–20"],
        ],
        disclaimer:"Forward-looking information; subject to change. Not an offer to sell securities."
      };

  // Pie data (edit to match your raise plan)
  const pie = [
    { k: "Devices", v: 45, c: "#60a5fa" },
    { k: "Growth",  v: 25, c: "#34d399" },
    { k: "Platform",v: 20, c: "#a78bfa" },
    { k: "Ops",     v: 10, c: "#f59e0b" },
  ];

  // Build donut segments
  const r = 54, circ = 2*Math.PI*r;
  let acc = 0;

  return (
    <section className="iv-section">
      <div className="iv-container iv-grid iv-grid-2">
        <div className="iv-card">
          <h2 className="iv-h2">{L.funds}</h2>
          <div className="iv-pie-wrap">
            <svg viewBox="0 0 140 140" className="iv-pie">
              <circle cx="70" cy="70" r={r} className="iv-pie-base"/>
              {pie.map(seg=>{
                const dash = (seg.v/100)*circ;
                const dasharray = `${dash} ${circ-dash}`;
                const el = (
                  <circle
                    key={seg.k}
                    cx="70" cy="70" r={r}
                    stroke={seg.c}
                    strokeWidth="18"
                    fill="none"
                    strokeDasharray={dasharray}
                    strokeDashoffset={-acc}
                    transform="rotate(-90 70 70)"
                  />
                );
                acc += dash;
                return el;
              })}
            </svg>
            <ul className="iv-pie-legend">
              {pie.map(p=>(
                <li key={p.k}><span style={{background:p.c}}/> {p.k} — {p.v}%</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="iv-card">
          <h2 className="iv-h2">{L.exit}</h2>
          <div className="iv-exit">
            <div className="iv-exit-timeline">
              <div className="iv-exit-node">
                <div className="iv-exit-y">3</div><div className="iv-exit-l">yrs</div>
              </div>
              <div className="iv-exit-node">
                <div className="iv-exit-y">5</div><div className="iv-exit-l">yrs</div>
              </div>
            </div>

            <table className="iv-table">
              <thead>
                <tr>
                  {L.tableHead.map(h=> <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {L.rows.map(row=>(
                  <tr key={row[0]}>
                    <td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <a className="iv-btn iv-btn-accent" href={safeHref} target="_blank" rel="noreferrer">
              {L.sign}
            </a>

            <p className="iv-disclaimer">{L.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sticky mobile CTA ---------------- */
export function StickySafeCTA({ lang="en", safeHref="#" }) {
  return (
    <a className="iv-sticky-cta" href={safeHref} target="_blank" rel="noreferrer">
      {lang==="vi" ? "Ký SAFE ngay" : "Sign SAFE now"}
    </a>
  );
}
