/**
 * Genera clips de retrato (sonrisa + mirada a cámara) con Runway API.
 *
 *   set RUNWAYML_API_SECRET=key_...   (PowerShell / bash)
 *   node scripts/generate-timeline-videos-runway.mjs
 *   node scripts/generate-timeline-videos-runway.mjs ohsumi-2016
 *
 * Salida: public/videos/timeline/{id}.mp4
 */

import { createWriteStream, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "videos", "timeline");

const API_BASE = "https://api.dev.runwayml.com/v1";
const RUNWAY_VERSION = "2024-11-06";
const MODEL = "gen4_turbo";
const DURATION = 5;
const RATIO = "1280:720";

const PROMPT =
  "Subject slowly turns toward the camera with a warm gentle smile, subtle natural head movement, dignified gesture toward viewer, photorealistic portrait, preserve identity, soft studio lighting, cinematic, no text";

const SLIDES = [
  { id: "hippocrates", image: "hipocrates.jpg" },
  { id: "pasteur", image: "pasteur.jpg" },
  { id: "houssay", image: "houssay.jpg" },
  { id: "leloir", image: "loloir.jpg" },
  { id: "milstein", image: "milstein.jpg" },
  { id: "marshall-2005", image: "Barry J. Marshall y J. Robin Warren.jpg" },
  { id: "edwards-2010", image: "nobel/edwards.jpg" },
  { id: "ohsumi-2016", image: "nobel/ohsumi-portrait.jpg" },
  { id: "allison-honjo-2018", image: "nobel/allison-honjo-2018.jpg" },
  { id: "hep-c-2020", image: "nobel/allison-honjo.jpg" },
  { id: "kariko-2023", image: "nobel/kariko.jpg" },
  { id: "microrna-2024", image: "nobel/microrna-2024.jpg" },
];

function getSecret() {
  const key = process.env.RUNWAYML_API_SECRET || process.env.RUNWAY_API_KEY;
  if (!key) {
    throw new Error(
      "Falta RUNWAYML_API_SECRET. Obtené una key en https://dev.runwayml.com/",
    );
  }
  return key;
}

function toDataUri(filePath) {
  const buf = readFileSync(filePath);
  const sizeMb = buf.length / (1024 * 1024);
  if (sizeMb > 4.8) {
    throw new Error(
      `Imagen demasiado grande (${sizeMb.toFixed(1)} MB). Runway acepta data URI hasta ~5 MB: ${filePath}`,
    );
  }
  const ext = filePath.split(".").pop()?.toLowerCase() ?? "jpeg";
  const mime = ext === "jpg" ? "jpeg" : ext;
  return `data:image/${mime};base64,${buf.toString("base64")}`;
}

async function runwayFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getSecret()}`,
      "X-Runway-Version": RUNWAY_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    const msg = body.error || body.message || body.detail || JSON.stringify(body);
    throw new Error(`Runway ${res.status}: ${msg}`);
  }
  return body;
}

async function waitForTask(taskId) {
  for (let i = 0; i < 180; i++) {
    const task = await runwayFetch(`/tasks/${taskId}`);
    if (task.status === "SUCCEEDED") {
      const url = task.output?.[0] ?? task.artifacts?.[0]?.url;
      if (!url) throw new Error(`Task sin URL de salida: ${JSON.stringify(task)}`);
      return url;
    }
    if (task.status === "FAILED" || task.status === "CANCELLED") {
      throw new Error(task.failure ?? task.failureCode ?? `Task ${task.status}`);
    }
    process.stdout.write(`   … ${task.status} (${i + 1}/180)\r`);
    await new Promise((r) => setTimeout(r, 5000));
  }
  throw new Error("Timeout esperando Runway");
}

async function generateOne(slide) {
  const imagePath = join(ROOT, "public", slide.image);
  if (!existsSync(imagePath)) throw new Error(`No existe: ${imagePath}`);

  const task = await runwayFetch("/image_to_video", {
    method: "POST",
    body: JSON.stringify({
      model: MODEL,
      promptImage: toDataUri(imagePath),
      promptText: PROMPT,
      ratio: RATIO,
      duration: DURATION,
    }),
  });

  const taskId = task.id;
  if (!taskId) throw new Error(`Sin task id: ${JSON.stringify(task)}`);
  console.log(`   task ${taskId}`);
  return waitForTask(taskId);
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function main() {
  const filter = process.argv.slice(2);
  const targets = filter.length ? SLIDES.filter((s) => filter.includes(s.id)) : SLIDES;

  if (!targets.length) {
    console.error("IDs:", SLIDES.map((s) => s.id).join(", "));
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Runway ${MODEL} · ${DURATION}s · ${targets.length} slide(s)\n`);

  for (const slide of targets) {
    const out = join(OUT_DIR, `${slide.id}.mp4`);
    if (existsSync(out) && statSync(out).size > 10_000) {
      console.log(`⏭  ${slide.id}`);
      continue;
    }
    console.log(`▶  ${slide.id}`);
    try {
      const url = await generateOne(slide);
      await download(url, out);
      const kb = Math.round(statSync(out).size / 1024);
      console.log(`✓  ${slide.id} (${kb} KB)`);
    } catch (err) {
      console.error(`✗  ${slide.id}: ${err.message}`);
    }
  }

  console.log("\nListo → public/videos/timeline/*.mp4");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
