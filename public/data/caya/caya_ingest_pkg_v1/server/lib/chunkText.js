// server/lib/chunkText.js
// Heuristic chunker: ~500–800 tokens by character count with sentence-ish boundaries
export function chunkTextByHeuristic(text, opts = {}) {
  const minChars = opts.minChars ?? 1200; // ≈500 tokens
  const maxChars = opts.maxChars ?? 2000; // ≈800 tokens
  const overlap = opts.overlap ?? 200;

  const sentences = splitIntoSentences(text);
  const chunks = [];
  let buf = "";
  let index = 0;

  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const candidate = (buf + s).trim();
    const len = candidate.length;

    if (len < minChars) {
      buf = candidate + " ";
      continue;
    }
    if (len <= maxChars) {
      buf = candidate + " ";
      continue;
    }
    // overflow: push current, then start fresh with s (and overlap)
    if (buf.trim()) {
      const chunkText = buf.trim();
      chunks.push({ text: chunkText, index });
      index++;
      // set overlap seed
      const tail = chunkText.slice(-overlap);
      buf = (tail + " " + s).trim() + " ";
    } else {
      // single very long "sentence": hard split
      const hard = hardSplit(s, minChars, maxChars);
      for (const h of hard) {
        chunks.push({ text: h.trim(), index });
        index++;
      }
      buf = "";
    }
  }

  if (buf.trim()) {
    chunks.push({ text: buf.trim(), index });
  }
  return chunks;
}

function splitIntoSentences(text) {
  return text
    .replace(/\r\n/g, "\n")
    .split(/(?<=\.)\s+|(?<=\?)\s+|(?<=!)\s+|\n{2,}/);
}

function hardSplit(s, minChars, maxChars) {
  const parts = [];
  for (let i = 0; i < s.length; i += maxChars) {
    parts.push(s.slice(i, i + maxChars));
  }
  return parts;
}
