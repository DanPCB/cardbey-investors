import React from "react";
import MeshBackground3D from "./MeshBackground3D";
import cardbeyLogoUrl from "../assets/cardbey-icon.png"; // PNG is fine

export default function Hero({ title, subtitle, stats, links }) {
  return (
    <section className="hero hero--with-mesh relative">
      <MeshBackground3D className="mesh3d-bg" />

      <div className="hero-foreground relative z-10">
        <div className="container mx-auto px-4 py-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={cardbeyLogoUrl}
              alt="Cardbey"
              width={32}
              height={32}
              onError={(e) => (e.currentTarget.src = "/cardbey-icon.png")}
            />
            <span className="font-semibold text-white text-lg">Cardbey</span>
            <span className="ml-2 px-3 py-1 rounded-full border border-emerald-400 text-emerald-300 text-sm font-medium">
              Investor
            </span>
          </div>
        </div>

        <div className="container content card-elevated text-center mt-8">
          {title && <h1 className="text-4xl font-bold mb-2">{title}</h1>}
          {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
