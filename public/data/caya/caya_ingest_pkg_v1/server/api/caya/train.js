// server/api/caya/train.js
// Express router to ingest all knowledge files into SQLite vector DB
import { Router } from "express";
import { ingestAll } from "../../lib/ingest.js";

const router = Router();

// POST /api/caya/train
// Body: { reindex?: boolean }
router.post("/train", async (req, res) => {
  try {
    const { reindex = false } = req.body || {};
    const summary = await ingestAll({ reindex });
    res.json({ ok: true, ...summary });
  } catch (err) {
    console.error("❌ Ingestion failed:", err);
    res.status(500).json({ ok: false, error: String(err && err.message || err) });
  }
});

export default router;
