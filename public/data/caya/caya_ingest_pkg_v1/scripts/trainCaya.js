// scripts/trainCaya.js
// CLI runner to ingest all knowledge without hitting HTTP
import "dotenv/config.js";
import { ingestAll } from "../server/lib/ingest.js";

const reindex = process.argv.includes("--reindex");

(async () => {
  try {
    const summary = await ingestAll({ reindex });
    console.log("✅ Ingestion complete:", summary);
    process.exit(0);
  } catch (e) {
    console.error("❌ Ingestion failed:", e);
    process.exit(1);
  }
})();
