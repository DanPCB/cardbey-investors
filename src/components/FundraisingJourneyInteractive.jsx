import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

export default function FundraisingJourneyInteractive({
  lang = "en",
  activePhase = 0,
  onPhaseChange,
}) {
  const L = lang === "vi";

  const slides = [
    {
      phase: L ? "Giai đoạn 1 (0–12m)" : "Phase 1 (0–12m)",
      title: L ? "Vốn Huy Động Giai đoạn 1" : "Phase 1 Funding",
      items: [
        "💰 $3M — 🇦🇺 AU SPV (200 × $15k)",
        L ? "Vốn Huy Động từ các Đối tác Chiến lược, các nhà đầu tư sớm & nhà đầu tư Thiên thần nội địa"
          : "Funding from Strategic Business Partners, early believers & local angels",
      ],
    },
    {
      phase: L ? "Giai đoạn 2 (12–24m)" : "Phase 2 (12–24m)",
      title: L ? "Vốn Huy Động Giai đoạn 2" : "Phase 2 Funding",
      items: [
        "💰 $5M–$10M — 🇸🇬 SG (Accredited & diaspora)",
        "💰 $5M — 🇺🇸 Reg CF (Republic/Wefunder)",
        L ? "Vốn Huy Động từ mạng lưới Đầu tư Đông Nam Á và nhà đầu tư nhỏ toàn cầu"
          : "Funding from SEA networks & global micro-investors",
      ],
    },
    {
      phase: L ? "Giai đoạn 3 (24–36m)" : "Phase 3 (24–36m)",
      title: L ? "Vốn Huy Động Giai đoạn 3" : "Phase 3 Funding",
      items: [
        "💰 $20M–$30M — 🇦🇪 UAE (FOs + tokenized CAI)",
        "💰 $50M–$100M — 🇺🇸 Reg A+ + 🇦🇪 tokenized",
        L ? "Vốn Huy Động từ các cá nhân và quỹ đầu tư toàn cầu"
          : "Funding from global retail & institutional partners",
      ],
    },
  ];

  // ----- Refs & State
  const [idx, setIdx] = useState(activePhase);
  useEffect(() => setIdx(activePhase), [activePhase]); // sync from roadmap

  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = [];
  const addItemRef = (el) => { if (el && !itemRefs.current.includes(el)) itemRefs.current.push(el); };

  // animation + debounce
  const animRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const idleTimerRef = useRef(null);
  const rafStyleRef = useRef(null);

  // ----- Animation
  const easeInOut = (t) => 0.5 - Math.cos(Math.PI * t) / 2; // pleasant ease
  const cancelAnim = () => { if (animRef.current) cancelAnimationFrame(animRef.current); isAnimatingRef.current = false; };

  const animateScrollTo = (container, targetLeft, duration = 480) => {
    cancelAnim();
    const start = container.scrollLeft;
    const delta = targetLeft - start;
    if (Math.abs(delta) < 1) { container.scrollLeft = targetLeft; return; }

    const t0 = performance.now();
    isAnimatingRef.current = true;

    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = easeInOut(p);
      container.scrollLeft = start + delta * eased;
      if (p < 1 && isAnimatingRef.current) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        isAnimatingRef.current = false;
      }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const centerOf = (el, container) => {
    const box = el.getBoundingClientRect();
    const cont = container.getBoundingClientRect();
    // element center position in scrollLeft space
    return box.left - cont.left + box.width / 2 + container.scrollLeft;
  };

  const leftForCenter = (el, container) =>
    el.offsetLeft - (container.clientWidth - el.clientWidth) / 2;

  // ----- Go to a specific index (click / keyboard / roadmap)
  const goTo = (i, animate = true) => {
    const c = trackRef.current; const el = itemRefs.current[i];
    if (!c || !el) return;
    const left = leftForCenter(el, c);
    if (animate) animateScrollTo(c, left);
    else c.scrollLeft = left;
    setIdx(i);
    onPhaseChange?.(i);
  };

  // ----- Scroll visuals (scale/opacity), no index change here
  const onScrollVisuals = () => {
    const c = trackRef.current; if (!c) return;
    const mid = c.scrollLeft + c.clientWidth / 2;

    if (rafStyleRef.current) cancelAnimationFrame(rafStyleRef.current);
    rafStyleRef.current = requestAnimationFrame(() => {
      itemRefs.current.forEach((el) => {
        const center = centerOf(el, c);
        const dist = Math.abs(center - mid);
        const n = Math.min(1, dist / (c.clientWidth * 0.5));
        const scale = Math.min(1, 0.94 + (1 - n) * 0.06);
        const opacity = 0.55 + (1 - n) * 0.45;
        el.style.transform = `scale(${scale})`;
        el.style.opacity = String(opacity);
      });
    });
  };

  // ----- Debounced snap after user stops scrolling
  const scheduleIdleSnap = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (isAnimatingRef.current) return; // already animating
      const c = trackRef.current; if (!c) return;
      const mid = c.scrollLeft + c.clientWidth / 2;

      // find nearest card
      let nearest = 0, best = Infinity;
      itemRefs.current.forEach((el, i) => {
        const center = centerOf(el, c);
        const dist = Math.abs(center - mid);
        if (dist < best) { best = dist; nearest = i; }
      });

      // snap and set idx once
      goTo(nearest, true);
    }, 150); // 150ms after last wheel/touch/mouse scroll
  };

  // ----- Events
  const onScroll = () => {
    // any user scroll cancels program animation
    if (!isAnimatingRef.current) cancelAnim();
    onScrollVisuals();
    scheduleIdleSnap();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") goTo(Math.max(0, idx - 1), true);
    if (e.key === "ArrowRight") goTo(Math.min(slides.length - 1, idx + 1), true);
  };

  // ----- Mount / resize: equalize heights + initial center
  useLayoutEffect(() => {
    const c = trackRef.current;
    if (!c) return;

    // equalize heights via CSS var
    const measure = () => {
      let max = 0;
      itemRefs.current.forEach((el) => {
        const prev = el.style.minHeight;
        el.style.minHeight = "";
        const h = el.getBoundingClientRect().height;
        el.style.minHeight = prev;
        if (h > max) max = h;
      });
      c.style.setProperty("--fj-card-minh", `${Math.ceil(max)}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    itemRefs.current.forEach((el) => ro.observe(el));
    window.addEventListener("resize", measure);

    // initial center instantly, then draw visuals
    goTo(idx, false);
    onScrollVisuals();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update if parent changes activePhase
  useEffect(() => { goTo(activePhase, true); /* eslint-disable-next-line */ }, [activePhase]);

  // ----- Render
  return (
    <section className="iv-section">
      <div className="iv-container">
        <div className="iv-card iv-card-tight relative">
          <h2 className="iv-h2">{L ? "Kế Hoạch Huy Động Vốn" : "Fundraising Journey"}</h2>

          <div
            ref={trackRef}
            className="fj-track no-scrollbar"
            onScroll={onScroll}
            onWheel={() => cancelAnim()}
            onTouchStart={() => cancelAnim()}
            onMouseDown={() => cancelAnim()}
            onKeyDown={onKeyDown}
            tabIndex={0}
            aria-label={L ? "Cuộn để xem các giai đoạn gọi vốn" : "Scroll to see funding stages"}
            style={{
              // JS controls all snapping → keep native snapping OFF
              scrollSnapType: "none",
              scrollBehavior: "auto",
              touchAction: "pan-x",
              overscrollBehaviorX: "contain",
            }}
          >
            <span className="fj-spacer" />
            {slides.map((s, i) => (
              <div key={i} ref={addItemRef} onClick={() => goTo(i, true)} className="fj-slide">
                <div className={`fj-card ${i === idx ? "is-active" : ""}`}>
                  <div className="fj-phase">{s.phase}</div>
                  <div className="fj-title">{s.title}</div>
                  <ul className="fj-list">
                    {s.items.map((l, k) => <li key={k}>{l}</li>)}
                  </ul>
                </div>
              </div>
            ))}
            <span className="fj-spacer" />
          </div>
        </div>
      </div>
    </section>
  );
}
