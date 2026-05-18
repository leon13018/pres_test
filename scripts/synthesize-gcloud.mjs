/**
 * synthesize-gcloud.mjs
 * Google Cloud Text-to-Speech synthesis for all segments in audio-segments.json.
 *
 * Usage:  node scripts/synthesize-gcloud.mjs
 * Or:     npm run synthesize-gcloud
 *
 * API key is read at runtime from the .env file one directory above the
 * presentation/ folder (C:\Users\LIN HONG\Desktop\pres\.env).
 * It is never embedded in this file or logged to console.
 *
 * Long sentences (>= 80 chars) are automatically split at 。！？ boundaries
 * and the resulting MP3 chunks are concatenated into one file.
 *
 * Output: public/audio/<chapter-id>/<step>.mp3
 * Skips files that already exist (incremental).
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");          // presentation/
const ENV_PATH = resolve(ROOT, "..", ".env");   // pres/.env

// ── Load API key ────────────────────────────────────────────────────────────
if (!existsSync(ENV_PATH)) {
  console.error(`ERROR: .env not found at ${ENV_PATH}`);
  process.exit(1);
}
const apiKey = readFileSync(ENV_PATH, "utf-8").trim();
if (!apiKey) {
  console.error("ERROR: .env is empty.");
  process.exit(1);
}

// ── Load segments ───────────────────────────────────────────────────────────
const segmentsPath = join(ROOT, "audio-segments.json");
if (!existsSync(segmentsPath)) {
  console.error("ERROR: audio-segments.json not found. Run: npm run extract-narrations");
  process.exit(1);
}
const segments = JSON.parse(readFileSync(segmentsPath, "utf-8"));
const total = segments.length;
console.log(`Synthesizing ${total} segments with Google Cloud TTS (cmn-CN-Chirp3-HD-Achird)...\n`);

const OUT_BASE = join(ROOT, "public", "audio");
const TTS_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Split text at Chinese sentence-ending punctuation. */
function splitAtSentences(text) {
  const parts = text.split(/(?<=[。！？])/);
  return parts.map((p) => p.trim()).filter((p) => p.length > 0);
}

/** Strip ID3v2 header from an MP3 buffer so chunks can be concatenated. */
function stripID3(buf) {
  if (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) {
    const size =
      ((buf[6] & 0x7f) << 21) |
      ((buf[7] & 0x7f) << 14) |
      ((buf[8] & 0x7f) << 7) |
      (buf[9] & 0x7f);
    return buf.slice(10 + size);
  }
  return buf;
}

/** Single TTS API call. Returns MP3 Buffer or throws. */
async function callTTS(text) {
  let res;
  try {
    res = await fetch(TTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: "cmn-CN", name: "cmn-CN-Chirp3-HD-Achird" },
        audioConfig: { audioEncoding: "MP3" },
      }),
    });
  } catch (netErr) {
    throw new Error(`Network error: ${netErr.message}`);
  }

  if (!res.ok) {
    const errBody = await res.text();
    let message = errBody.slice(0, 400);
    try {
      message = JSON.parse(errBody)?.error?.message ?? message;
    } catch {
      /* ignore */
    }
    const err = new Error(`HTTP ${res.status}: ${message}`);
    err.tooLong = message.includes("too long");
    throw err;
  }

  const json = await res.json();
  return Buffer.from(json.audioContent, "base64");
}

/**
 * Synthesize text, auto-splitting at sentence boundaries if the API reports
 * the input is too long. Concatenates MP3 chunks into one buffer.
 */
async function synthesize(text) {
  // Pre-emptively split if text is long to avoid the API error round-trip
  const chunks = text.length >= 80 ? splitAtSentences(text) : [text];

  if (chunks.length === 1) {
    try {
      return await callTTS(chunks[0]);
    } catch (err) {
      if (err.tooLong) {
        // Last resort: split even further
        const subChunks = splitAtSentences(chunks[0]);
        if (subChunks.length <= 1) throw err;
        const bufs = await Promise.all(subChunks.map((c) => callTTS(c)));
        return Buffer.concat(bufs.map((b, i) => (i === 0 ? b : stripID3(b))));
      }
      throw err;
    }
  }

  const bufs = [];
  for (let i = 0; i < chunks.length; i++) {
    const buf = await callTTS(chunks[i]);
    bufs.push(i === 0 ? buf : stripID3(buf));
  }
  return Buffer.concat(bufs);
}

// ── Main loop ───────────────────────────────────────────────────────────────
let synthesized = 0;
let skipped = 0;

for (let i = 0; i < segments.length; i++) {
  const seg = segments[i];
  const outPath = join(OUT_BASE, seg.audio);
  const tag = `[${String(i + 1).padStart(2)}/${total}]`;

  if (existsSync(outPath)) {
    console.log(`${tag} ${seg.audio}  — already exists, skip`);
    skipped++;
    continue;
  }

  mkdirSync(dirname(outPath), { recursive: true });

  try {
    const mp3 = await synthesize(seg.text);
    writeFileSync(outPath, mp3);
    synthesized++;
    console.log(`${tag} ${seg.audio}  ✓  ${(mp3.length / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error(`${tag} ✗ ${seg.audio}: ${err.message}`);
    process.exit(1);
  }
}

console.log(`\nDone: ${synthesized} synthesized, ${skipped} skipped, ${total} total.`);
if (synthesized > 0) {
  console.log(`Output: ${OUT_BASE}`);
}
