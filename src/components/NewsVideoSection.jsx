import React from "react";

const CACHE_KEY = "yt_live_cache";
const QUOTA_LOCK_KEY = "yt_quota_lock_until"; // ISO date string until when to avoid live

export default function NewsVideoSection({
  title = "AI News & Investment Videos",
  playlistId = "PLiCvVJzBupKnGwSthdJ8YI8k1L7Vt0m7j",
  queries = ["AI development", "AI investment", "machine learning funding", "LLM research"],
  refreshMinutes = 60,     // reduce default refresh to cut quota
  maxResults = 12,
  listMax = 20
}) {
  const apiKey = import.meta.env.VITE_YT_API_KEY?.trim();
  const [videos, setVideos] = React.useState([]);
  const [activeVideoId, setActiveVideoId] = React.useState(null);
  const [error, setError] = React.useState("");
  const [mode, setMode] = React.useState(apiKey ? "live" : "playlist"); // "live" | "playlist"
  const [playerNonce, setPlayerNonce] = React.useState(0);

  const hasApi = Boolean(apiKey);

  // Helpers
  const isQuotaLocked = () => {
    const until = localStorage.getItem(QUOTA_LOCK_KEY);
    return until ? new Date(until).getTime() > Date.now() : false;
  };
  const lockQuotaUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 999);
    localStorage.setItem(QUOTA_LOCK_KEY, midnight.toISOString());
  };

  const timeAgo = (iso) => {
    const t = new Date(iso).getTime();
    if (!t) return "";
    const diff = Math.max(0, Date.now() - t) / 1000;
    const units = [["y",31536000],["mo",2592000],["d",86400],["h",3600],["m",60],["s",1]];
    for (const [l,s] of units) { const v = Math.floor(diff/s); if (v>=1) return `${v}${l} ago`; }
    return "just now";
  };

  const deriveTags = (sn) => {
    const title = (sn?.title || "").toLowerCase();
    const tags = new Set();
    if (/\b(funding|investment|investors?|vc|valuation|earnings|market)\b/.test(title)) tags.add("Investment");
    if (/\b(llm|research|arxiv|fine-?tuning|benchmark)\b/.test(title)) tags.add("Research");
    if (/\bkeynote|launch|announcement|dev day\b/.test(title)) tags.add("Launch");
    if (/\binterview|panel|podcast\b/.test(title)) tags.add("Interview");
    if (tags.size === 0) tags.add("AI News");
    return Array.from(tags).slice(0,3);
  };

  const readCache = () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const { data, ts, ttlMs } = JSON.parse(raw);
      if (!data || !ts || !ttlMs) return null;
      if (Date.now() - ts > ttlMs) return null;
      return data;
    } catch { return null; }
  };

  const writeCache = (items, ttlHours = 6) => {
    try {
      const payload = { data: items, ts: Date.now(), ttlMs: ttlHours * 3600 * 1000 };
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch {}
  };

  const fetchVideos = React.useCallback(async () => {
    if (!hasApi) return;
    if (isQuotaLocked()) { setMode("playlist"); return; }

    // Try cache first
    const cached = readCache();
    if (cached && cached.length) {
      setVideos(cached);
      if (!activeVideoId && cached[0]?.id?.videoId) setActiveVideoId(cached[0].id.videoId);
      setMode("live");
      setError("");
      return;
    }

    try {
      // Combine queries to ONE call to save quota (OR semantics)
      const q = queries.join(" OR ");
      const url = new URL("https://www.googleapis.com/youtube/v3/search");
      url.searchParams.set("part", "snippet");
      url.searchParams.set("type", "video");
      url.searchParams.set("q", q);
      url.searchParams.set("maxResults", Math.min(maxResults, 20).toString());
      url.searchParams.set("order", "date");
      url.searchParams.set("videoEmbeddable", "true");
      url.searchParams.set("relevanceLanguage", "en");
      url.searchParams.set("key", apiKey);

      const res = await fetch(url);
      if (!res.ok) {
        // Try to extract message
        let msg = `YouTube API ${res.status}`;
        let text = "";
        try {
          const j = await res.json();
          text = j?.error?.message || j?.message || "";
          if (text) msg += `: ${text}`;
        } catch {}
        // Quota-specific handling
        if (/quota/i.test(text)) {
          lockQuotaUntilMidnight();
          setMode("playlist");
        }
        throw new Error(msg);
      }

      const data = await res.json();
      const items = (data?.items || []).filter(Boolean);

      // De-dup by videoId
      const byId = new Map();
      for (const it of items) {
        const vid = it?.id?.videoId;
        if (vid && !byId.has(vid)) byId.set(vid, it);
      }
      const unique = Array.from(byId.values()).sort((a,b) => {
        const da = new Date(a.snippet?.publishTime || a.snippet?.publishedAt || 0).getTime();
        const db = new Date(b.snippet?.publishTime || b.snippet?.publishedAt || 0).getTime();
        return db - da;
      });

      writeCache(unique, 6); // cache for 6 hours
      setVideos(unique);
      if (!activeVideoId && unique[0]?.id?.videoId) setActiveVideoId(unique[0].id.videoId);
      setError("");
      setMode("live");
    } catch (e) {
      console.error(e);
      setError(String(e?.message || "Could not fetch live videos. Showing playlist."));
      setVideos([]);
      setActiveVideoId(null);
      setMode("playlist");
    }
  }, [apiKey, queries, hasApi, maxResults, activeVideoId]);

  React.useEffect(() => {
    if (!hasApi) return;
    fetchVideos();
    const ms = Math.max(10, refreshMinutes) * 60 * 1000; // never <10m
    const id = setInterval(fetchVideos, ms);
    return () => clearInterval(id);
  }, [hasApi, fetchVideos, refreshMinutes]);

  const playerSrc = React.useMemo(() => {
  if (mode === "live" && activeVideoId) {
    return `https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`;
  }
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&playsinline=1`;
}, [mode, activeVideoId, playlistId, playerNonce]);


  // --- UI (same two-column layout you have) ---
  // (left player + right small list)
  // ... keep your current JSX/CSS from the previous step ...
  // For brevity, only the player piece is included here:

  return (
    <section className="ai-news-video-section" aria-label="AI News Video Section">
      <div className="aiv-header">
        <h2>{title}</h2>
        {mode === "live" ? <span className="aiv-badge">Live</span> : <span className="aiv-badge aiv-badge--muted">Playlist</span>}
      </div>

      <div className="aiv-layout">
        <div className="aiv-player">
          <div className="aiv-aspect">
            <iframe
  key={playerNonce}
  title="AI News Player"
  src={playerSrc}                    
  frameBorder="0"
  allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
/>
          </div>
          {error && (
            <div className="aiv-error" role="status">
              {error}
              {hasApi && !isQuotaLocked() && (
                <button onClick={() => { setError(""); setMode("live"); fetchVideos(); }} style={{ marginLeft: 8 }}>
                  Retry live
                </button>
              )}
            </div>
          )}
        </div>

        {mode === "live" && videos.length > 0 && (
          <aside className="aiv-side">
            <div className="aiv-list">
              {videos.slice(0, listMax).map((v) => {
                const vid = v?.id?.videoId;
                const sn = v?.snippet || {};
                const thumb = sn.thumbnails?.default?.url || sn.thumbnails?.medium?.url;
                const when = sn.publishTime || sn.publishedAt;
                const active = activeVideoId === vid;
                return (
                  <button
                    key={vid}
                    className={`aiv-row ${active ? "aiv-row--active" : ""}`}
                    onClick={() => { setActiveVideoId(vid); setPlayerNonce(n => n+1); }}
                    title={sn.title}
                  >
                    <img className="aiv-thumb" src={thumb} alt={sn.title || "Video thumbnail"} loading="lazy" />
                    <div className="aiv-col">
                      <div className="aiv-title-text">{sn.title}</div>
                      <div className="aiv-meta-line">
                        <span className="aiv-channel">{sn.channelTitle}</span>
                        <span className="aiv-dot">•</span>
                        <span className="aiv-ago">{timeAgo(when)}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
