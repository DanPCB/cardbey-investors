# Cardbey Caya Ingestion (Option A – Local `/api/caya/train`)

This package gives you a **ready-to-drop-in** ingestion & retrieval path for Caya.

## What you get
- `server/api/caya/train.js` → POST `/api/caya/train` to ingest knowledge
- `server/api/caya/search.js` → GET `/api/caya/search?q=...` test retrieval
- `server/lib/ingest.js` → reads `/data/caya/knowledge`, chunks, embeds, stores
- `server/lib/chunkText.js` → ~500–800 token heuristic chunking
- `server/db/vectorStore.js` → SQLite vector store (better-sqlite3)
- `scripts/trainCaya.js` → CLI to run ingestion out of band
- `.env.example` → required env vars

## Quick start
1) Install deps (in your project root):
```bash
npm i express better-sqlite3 openai dotenv
```
*(If you use ESM already, you’re set. If not, add `"type": "module"` to your package.json.)*

2) Put this folder structure in your project:
```
server/
  api/caya/train.js
  api/caya/search.js
  lib/ingest.js
  lib/chunkText.js
  db/vectorStore.js
scripts/
  trainCaya.js
data/caya/knowledge/   # your .md files go here
```

3) Create `.env` (copy from `.env.example`) and set:
```
OPENAI_API_KEY=sk-...
CAYA_EMBED_MODEL=text-embedding-3-small
CAYA_KB_DIR=./data/caya/knowledge
CAYA_SQLITE_PATH=./data/caya/caya_vectors.sqlite
```

4) Mount the routes in your Express app:
```js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import trainRouter from "./server/api/caya/train.js";
import searchRouter from "./server/api/caya/search.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/caya", trainRouter);
app.use("/api/caya", searchRouter);

app.listen(3003, () => console.log("Server on http://localhost:3003"));
```

5) Ingest your knowledge (choose one):
```bash
# via CLI
node scripts/trainCaya.js --reindex

# via HTTP
curl -X POST http://localhost:3003/api/caya/train -H "Content-Type: application/json" -d '{"reindex":true}'
```

6) Test retrieval:
```bash
curl "http://localhost:3003/api/caya/search?q=What%20is%20Cardbey?&k=5"
```

## Notes
- Chunking target ≈ 500–800 tokens (char-heuristic with overlap).
- Vector math runs in JS for simplicity. For scale, switch to pgvector / Pinecone.
- Ensure your knowledge files live in `data/caya/knowledge`. Example file included.

## Scaling options
- Replace `vectorStore.js` with Postgres + pgvector for scalable similarity search.
- Or implement Pinecone/Weaviate driver with the same `upsert/deleteDoc/topK` interface.
- Add metadata filters (e.g., `doc_type: investor`) and pass them into `topK`.

## Safety
- Don’t ingest sensitive data without proper access control.
- Log only high-level metrics in production.
