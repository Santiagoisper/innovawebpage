/**
 * Genera clips ~3s (sonrisa + mirada a cámara) para el carrusel History.
 *
 * Requiere cuenta en https://replicate.com y token:
 *   set REPLICATE_API_TOKEN=r8_...   (PowerShell)
 *   export REPLICATE_API_TOKEN=r8_... (bash)
 *
 * Uso:
 *   node scripts/generate-timeline-videos.mjs
 *   node scripts/generate-timeline-videos.mjs hippocrates ohsumi-2016
 *
 * Salida: public/videos/timeline/{id}.mp4
 */

import { createWriteStream, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "videos", "timeline");

const PROMPT =
  "Professional historical portrait, subject slowly turns toward the camera with a warm gentle smile, subtle natural head movement, dignified gesture, photorealistic, preserve face identity, soft lighting, no text, no watermark";

/** Replicate model: image-to-video with prompt (Kling 1.6 Standard). */
const MODEL_OWNER = "kwaivgi";
const MODEL_NAME = "kling-v1.6-standard";

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

function toDataUri(filePath) {
  const buf = readFileSync(filePath);
  const ext = filePath.split(".").pop()?.toLowerCase() ?? "jpeg";
  const mime = ext === "jpg" ? "jpeg" : ext;
  return `data:image/${mime};base64,${buf.toString("base64")}`;
}

async function replicateFetch(path, options = {}) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    throw new Error(
      "Falta REPLICATE_API_TOKEN. Creá una API key en https://replicate.com/account/api-tokens",
    );
  }
  const res = await fetch(`https://api.replicate.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.detail || body.error || res.statusText);
  }
  return body;
}

async function getModelVersion() {
  const model = await replicateFetch(`/models/${MODEL_OWNER}/${MODEL_NAME}`);
  const version = model.latest_version?.id;
  if (!version) throw new Error(`No version for ${MODEL_OWNER}/${MODEL_NAME}`);
  return version;
}

async function waitForPrediction(id) {
  for (let i = 0; i < 120; i++) {
    const pred = await replicateFetch(`/predictions/${id}`);
    if (pred.status === "succeeded") return pred.output;
    if (pred.status === "failed" || pred.status === "canceled") {
      throw new Error(pred.error || `Prediction ${pred.status}`);
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
  throw new Error("Timeout esperando el video en Replicate");
}

async function generateOne(slide, version) {
  const imagePath = join(ROOT, "public", slide.image);
  if (!existsSync(imagePath)) {
    throw new Error(`No existe la imagen: ${imagePath}`);
  }

  const prediction = await replicateFetch("/predictions", {
    method: "POST",
    body: JSON.stringify({
      version,
      input: {
        prompt: PROMPT,
        start_image: toDataUri(imagePath),
        duration: 5,
        aspect_ratio: "16:9",
        negative_prompt: "blurry, distorted face, extra limbs, text, logo, cartoon",
      },
    }),
  });

  const output = await waitForPrediction(prediction.id);
  const url = Array.isArray(output) ? output[0] : output;
  if (!url || typeof url !== "string") {
    throw new Error(`Salida inesperada: ${JSON.stringify(output)}`);
  }
  return url;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function main() {
  const filter = process.argv.slice(2);
  const targets = filter.length
    ? SLIDES.filter((s) => filter.includes(s.id))
    : SLIDES;

  if (!targets.length) {
    console.error("IDs válidos:", SLIDES.map((s) => s.id).join(", "));
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const version = await getModelVersion();
  console.log(`Modelo: ${MODEL_OWNER}/${MODEL_NAME} (${version})`);
  console.log(`Generando ${targets.length} clip(s) → ${OUT_DIR}\n`);

  for (const slide of targets) {
    const out = join(OUT_DIR, `${slide.id}.mp4`);
    if (existsSync(out)) {
      console.log(`⏭  ${slide.id} (ya existe)`);
      continue;
    }
    console.log(`▶  ${slide.id}…`);
    try {
      const url = await generateOne(slide, version);
      await download(url, out);
      console.log(`✓  ${slide.id} → ${out}`);
    } catch (err) {
      console.error(`✗  ${slide.id}:`, err.message);
    }
  }

  console.log("\nListo. Recargá /history — el carrusel usa /videos/timeline/{id}.mp4 automáticamente.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
