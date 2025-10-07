// server/db/vectorStore.js
// SQLite-backed vector store using better-sqlite3
// Embeddings stored as TEXT (JSON array). Cosine similarity computed in JS.
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const SQLITE_PATH = process.env.CAYA_SQLITE_PATH || path.resolve(process.cwd(), "data", "caya", "caya_vectors.sqlite");

class VectorStore {
  constructor() {
    this.db = null;
  }

  init() {
    const dir = path.dirname(SQLITE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!this.db) {
      this.db = new Database(SQLITE_PATH);
      this.db.pragma("journal_mode = WAL");
      this.db.prepare(`
        CREATE TABLE IF NOT EXISTS embeddings (
          id TEXT PRIMARY KEY,
          doc_id TEXT NOT NULL,
          chunk_index INTEGER NOT NULL,
          content TEXT NOT NULL,
          embedding TEXT NOT NULL, -- JSON string of float[]
          tokens INTEGER DEFAULT 0,
          source TEXT,
          updated_at TEXT DEFAULT (datetime('now'))
        );
      `).run();
      this.db.prepare(`CREATE INDEX IF NOT EXISTS idx_embeddings_doc ON embeddings(doc_id, chunk_index);`).run();
    }
  }

  upsert(row) {
    const stmt = this.db.prepare(`
      INSERT INTO embeddings (id, doc_id, chunk_index, content, embedding, tokens, source, updated_at)
      VALUES (@id, @doc_id, @chunk_index, @content, @embedding, @tokens, @source, datetime('now'))
      ON CONFLICT(id) DO UPDATE SET
        content=excluded.content,
        embedding=excluded.embedding,
        tokens=excluded.tokens,
        source=excluded.source,
        updated_at=datetime('now')
    `);
    const payload = {
      ...row,
      embedding: JSON.stringify(row.embedding || []),
    };
    stmt.run(payload);
  }

  deleteDoc(docId) {
    this.db.prepare(`DELETE FROM embeddings WHERE doc_id = ?`).run(docId);
  }

  // naive in-JS cosine search
  topK(queryVec, k = 5) {
    const rows = this.db.prepare(`SELECT id, doc_id, chunk_index, content, embedding, tokens, source, updated_at FROM embeddings`).all();
    const scored = rows.map(r => {
      const emb = JSON.parse(r.embedding);
      const score = cosineSim(queryVec, emb);
      return { ...r, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, k).map(({ embedding, ...rest }) => rest);
  }
}

function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const x = a[i], y = b[i];
    dot += x * y;
    na += x * x;
    nb += y * y;
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb) || 1e-9;
  return dot / denom;
}

export const vectorStore = new VectorStore();
