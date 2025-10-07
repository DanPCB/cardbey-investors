// server/lib/ingest.js
// Core ingestion logic: read files, chunk, embed, store
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { vectorStore } from "../db/vectorStore.js";
import { chunkTextByHeuristic } from "./chunkText.js";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.CAYA_EMBED_MODEL || "text-embedding-3-small";
const KB_DIR = process.env.CAYA_KB_DIR || path.resolve(process.cwd(), "data", "caya", "knowledge");

if (!OPENAI_API_KEY) {
  console.warn("⚠️ OPENAI_API_KEY is not set — embeddings will fail. Set it in your environment.");
}

const client = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function embed(input) {
  const inputs = Array.isArray(input) ? input : [input];
  const resp = await client.embeddings.create({
    model: MODEL,
    input: inputs
  });
  return Array.isArray(input) ? resp.data.map(d => d.embedding) : resp.data[0].embedding;
}

function listTextFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const acc = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) acc.push(...listTextFiles(full));
    else if (entry.isFile() && /\.(md|mdx|txt)$/i.test(entry.name)) acc.push(full);
  }
  return acc;
}

function docIdFromPath(p) {
  const rel = path.relative(KB_DIR, p).replace(/\\/g, "/").replace(/\\/g, "/");
  return rel;
}

export async function ingestAll({ reindex = false } = {}) {
  const dir = KB_DIR;
  if (!fs.existsSync(dir)) {
    throw new Error(`Knowledge directory not found: ${dir}`);
  }

  vectorStore.init();
  const files = listTextFiles(dir);
  let totalChunks = 0;
  let embedded = 0;

  for (const f of files) {
    const docId = docIdFromPath(f);
    const content = fs.readFileSync(f, "utf-8");
    const chunks = chunkTextByHeuristic(content, {
      minChars: 1200, // ≈ 500 tokens
      maxChars: 2000, // ≈ 800 tokens
      overlap: 200
    });

    if (reindex) vectorStore.deleteDoc(docId);

    // embed in batches
    const batchSize = 64;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const slice = chunks.slice(i, i + batchSize);
      const vecs = await embed(slice.map(c => c.text));
      for (let j = 0; j < slice.length; j++) {
        const { text, index } = slice[j];
        const id = `${docId}::${index}`;
        vectorStore.upsert({
          id,
          doc_id: docId,
          chunk_index: index,
          content: text,
          embedding: vecs[j],
          tokens: Math.round(text.length / 4),
          source: f,
        });
        embedded += 1;
      }
    }

    totalChunks += chunks.length;
  }

  return { files: files.length, totalChunks, embedded, kbDir: dir, model: MODEL };
}
