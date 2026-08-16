import type { InvestorSource } from "../schemas/types";

export const investorSources: InvestorSource[] = [
  {
    id: "src-wef-future-of-jobs-2025",
    title: "World Economic Forum — Future of Jobs Report 2025",
    url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
    publisher: "World Economic Forum",
    accessedAt: "2026-08-15",
    notes:
      "Projects ~170M jobs created and ~92M displaced by 2030 from structural labour-market transformation (macrotrends), with ~78M net growth; combined with ILO employment data. Not an AI-only causation claim.",
    status: "verified",
    public: true,
  },
  {
    id: "src-wef-future-of-jobs-2025-press",
    title: "WEF press release — Future of Jobs Report 2025",
    url: "https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/",
    publisher: "World Economic Forum",
    accessedAt: "2026-08-15",
    notes: "Public summary of 170M created / 92M displaced / 78M net by 2030.",
    status: "verified",
    public: true,
  },
  {
    id: "src-un-world-population-8-billion",
    title: "United Nations — World population reaches 8 billion (15 November 2022)",
    url: "https://www.un.org/en/desa/world-population-reach-8-billion-15-november-2022",
    publisher: "United Nations / DESA",
    accessedAt: "2026-08-15",
    notes:
      "World Population Prospects 2022 milestone. Use only as scale of human participation — never as Cardbey TAM.",
    status: "verified",
    public: true,
  },
  {
    id: "src-ilo-genai-jobs-2025",
    title: "ILO–NASK — Generative AI and Jobs (2025 update)",
    url: "https://www.ilo.org/resource/news/one-four-jobs-risk-being-transformed-genai-new-ilo%E2%80%93nask-global-index-shows",
    publisher: "International Labour Organization / NASK",
    accessedAt: "2026-08-15",
    notes:
      "One in four workers globally in occupations with some GenAI exposure; transformation more likely than wholesale replacement. Potential exposure — not realised job losses.",
    status: "verified",
    public: true,
  },
  {
    id: "src-repo-device-engine",
    title: "Cardbey device engine (adjacent server codebase)",
    notes:
      "Pairing, heartbeat, playlist lifecycle, repair evidence in adjacent server/engines/device (outside this git remote).",
    status: "draft",
    public: true,
  },
  {
    id: "src-repo-performer",
    title: "Performer routes (adjacent server)",
    notes: "Command/chat/share execution surface in adjacent server/routes/performer.js.",
    status: "draft",
    public: true,
  },
  {
    id: "src-repo-storefront",
    title: "Storefront API (adjacent server)",
    notes: "Frontscreen/storefront routes in adjacent server/routes/storefront.js.",
    status: "draft",
    public: true,
  },
  {
    id: "src-repo-rewards",
    title: "Rewards service (adjacent server)",
    notes: "Rewards/behaviour endpoints — growth infrastructure signal, not Partner Pass launch proof.",
    status: "draft",
    public: true,
  },
  {
    id: "src-public-files-safe",
    title: "SAFE agreement files in public/files",
    notes: "Binary legal documents — do not alter; terms require founder/counsel confirmation before citing figures.",
    status: "needs_source",
    public: false,
  },
  {
    id: "src-market-sea-gmv",
    title: "[VERIFIED MARKET SOURCE REQUIRED]",
    notes: "Legacy page cited third-party market figures in comments — not promoted to verified.",
    status: "needs_source",
    public: false,
  },
];
