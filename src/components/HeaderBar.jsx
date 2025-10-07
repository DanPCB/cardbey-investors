import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // or <a> if not using RR
import logoUrl from "@/assets/cardbey-icon.png";

export default function HeaderBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        // translucent glass
        "backdrop-blur-md bg-[rgba(7,12,25,0.35)]",
        // hairline + shadow only after scroll
        scrolled ? "border-b border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.25)]" : "border-b border-transparent",
        // safe areas + spacing
        "supports-[padding:max(0px)]:pt-[max(env(safe-area-inset-top),0px)]",
      ].join(" ")}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="h-14 flex items-center justify-between">
          {/* Left: brand */}
          <div className="flex items-center gap-2 min-w-0">
            <img src={logoUrl} alt="Cardbey" width={28} height={28} className="rounded-full" />
            <span className="font-semibold text-white text-lg truncate">Cardbey</span>
            <span className="ml-2 px-2.5 py-1 rounded-full border border-emerald-400/60 text-emerald-300 text-xs md:text-sm font-medium">
              Investor
            </span>
          </div>

          {/* Right: actions */}
          <nav className="flex items-center gap-2 md:gap-3">
            <a href="#deck" className="hidden sm:inline-block text-white/80 hover:text-white text-sm">
              Pitch Deck
            </a>
            <a href="#metrics" className="hidden sm:inline-block text-white/80 hover:text-white text-sm">
              Metrics
            </a>
            <a
              href="/files/Cardbey-Investor-Pack.pdf"
              className="rounded-xl px-3 py-2 bg-emerald-500/90 hover:bg-emerald-500 text-white text-sm font-medium transition"
            >
              Download Investor Pack
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
