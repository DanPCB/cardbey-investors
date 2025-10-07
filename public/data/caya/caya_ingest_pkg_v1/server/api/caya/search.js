// server/api/caya/search.js
// Minimal retrieval endpoint to sanity-check your embeddings
import { Router } from "express";
import { vectorStore } from "../../db/vectorStore.js";
import { embed } from "../../lib/ingest.js"; // reuse same embed function

const router = Router();

// GET /api/caya/search?q=...&k=5
router.get("/search", async (req, res) => {
  try {
    const q = String(req.query.q || "").trim();
    if (!q) return res.status(400).json({ ok: false, error: "Missing q" });

    const qVec = await embed(q);
    const topK = Number(req.query.k || 5);
    const rows = vectorStore.topK(qVec, topK);

    res.json({ ok: true, q, results: rows });
  } catch (err) {
    console.error("❌ Search failed:", err);
    res.status(500).json({ ok: false, error: String(err && err.message || err) });
  }
});

export default router;
