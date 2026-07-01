#!/usr/bin/env node
// Visual regression harness for chrisltd.com.
//
// Modes:
//   --mode=baseline   Capture screenshots and write to tests/visual/baselines/.
//   --mode=check      Capture screenshots to tests/visual/current/ and diff against baselines/.
//                     Writes diff PNGs to tests/visual/diff/ and an HTML report to tests/visual/report.html.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname);
const config = JSON.parse(fs.readFileSync(path.join(ROOT, "pages.json"), "utf8"));

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const mode = args.mode === "baseline" ? "baseline" : "check";

const baselineDir = path.join(ROOT, "baselines");
const currentDir = path.join(ROOT, "current");
const diffDir = path.join(ROOT, "diff");
const reportPath = path.join(ROOT, "report.html");

const outDir = mode === "baseline" ? baselineDir : currentDir;
fs.mkdirSync(outDir, { recursive: true });
if (mode === "check") {
  fs.rmSync(diffDir, { recursive: true, force: true });
  fs.mkdirSync(diffDir, { recursive: true });
}

const DIFF_THRESHOLD_PCT = 1.0; // flag pages where >1% pixels changed

async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok || res.status === 404) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not respond within ${timeoutMs}ms`);
}

function fileForPage(dir, page, viewport) {
  return path.join(dir, `${page.name}__${viewport.name}.png`);
}

function pct(num, total) {
  return total === 0 ? 0 : (num / total) * 100;
}

const results = []; // { page, viewport, status, diffPct, baselineExists }

await waitForServer(config.baseUrl);

// Use the pre-installed Chromium when present (overrides Playwright's bundled-version check).
const preInstalledChrome = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const launchOpts = fs.existsSync(preInstalledChrome) ? { executablePath: preInstalledChrome } : {};
const browser = await chromium.launch(launchOpts);
try {
  for (const viewport of config.viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const p of config.pages) {
      const url = config.baseUrl + p.path;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
      } catch (err) {
        console.warn(`! navigation issue on ${url}: ${err.message} — continuing`);
      }
      // scroll to bottom to trigger lazy images, then back to top
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = () => {
            window.scrollBy(0, 600);
            y += 600;
            if (y < document.body.scrollHeight) requestAnimationFrame(step);
            else resolve();
          };
          step();
        });
      });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const outFile = fileForPage(outDir, p, viewport);
      const currentBuf = await page.screenshot({ fullPage: true });
      fs.writeFileSync(outFile, currentBuf);

      if (mode === "check") {
        const baselineFile = fileForPage(baselineDir, p, viewport);
        if (!fs.existsSync(baselineFile)) {
          results.push({
            page: p.name,
            viewport: viewport.name,
            status: "no-baseline",
            diffPct: 0,
            baselineExists: false,
          });
          console.log(`?  ${p.name} ${viewport.name} — no baseline`);
          continue;
        }
        const baselinePng = PNG.sync.read(fs.readFileSync(baselineFile));
        const currentPng = PNG.sync.read(currentBuf);
        const w = Math.min(baselinePng.width, currentPng.width);
        const h = Math.min(baselinePng.height, currentPng.height);
        const diffPng = new PNG({ width: w, height: h });
        // pad/crop the inputs to a common size for fair diff
        const padded = (src) => {
          if (src.width === w && src.height === h) return src.data;
          const out = new PNG({ width: w, height: h });
          PNG.bitblt(src, out, 0, 0, Math.min(w, src.width), Math.min(h, src.height), 0, 0);
          return out.data;
        };
        const numDiff = pixelmatch(padded(baselinePng), padded(currentPng), diffPng.data, w, h, { threshold: 0.1 });
        const sizeDelta =
          Math.abs(baselinePng.width - currentPng.width) + Math.abs(baselinePng.height - currentPng.height);
        const total = w * h;
        const diffPctValue = pct(numDiff, total);
        const diffFile = fileForPage(diffDir, p, viewport);
        fs.writeFileSync(diffFile, PNG.sync.write(diffPng));
        const flagged = diffPctValue > DIFF_THRESHOLD_PCT;
        results.push({
          page: p.name,
          viewport: viewport.name,
          status: flagged ? "flagged" : "ok",
          diffPct: diffPctValue,
          baselineExists: true,
          baselineSize: `${baselinePng.width}×${baselinePng.height}`,
          currentSize: `${currentPng.width}×${currentPng.height}`,
          sizeDelta,
        });
        const marker = flagged ? "✗" : "✓";
        console.log(
          `${marker}  ${p.name} ${viewport.name} — ${diffPctValue.toFixed(3)}% diff${sizeDelta ? ` (size Δ ${sizeDelta}px)` : ""}`,
        );
      } else {
        console.log(`captured ${p.name} ${viewport.name}`);
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}

if (mode === "check") {
  results.sort((a, b) => b.diffPct - a.diffPct);
  const rel = (file) => path.relative(ROOT, file).split(path.sep).join("/");
  const rows = results
    .map((r) => {
      const base = rel(path.join(baselineDir, `${r.page}__${r.viewport}.png`));
      const curr = rel(path.join(currentDir, `${r.page}__${r.viewport}.png`));
      const diff = rel(path.join(diffDir, `${r.page}__${r.viewport}.png`));
      const cls = r.status === "flagged" ? "flagged" : r.status === "no-baseline" ? "nobase" : "ok";
      const sizeNote = r.baselineExists ? ` <small>${r.baselineSize} → ${r.currentSize}</small>` : "";
      return `<section class="${cls}">
      <h2>${r.page} <small>${r.viewport}</small></h2>
      <p class="pct">${r.baselineExists ? r.diffPct.toFixed(3) + "% diff" : "no baseline"}${sizeNote}</p>
      ${
        r.baselineExists
          ? `
      <div class="row">
        <figure><figcaption>baseline</figcaption><img src="${base}" loading="lazy"></figure>
        <figure><figcaption>current</figcaption><img src="${curr}" loading="lazy"></figure>
        <figure><figcaption>diff</figcaption><img src="${diff}" loading="lazy"></figure>
      </div>`
          : `<p>Captured at <a href="${curr}">${curr}</a></p>`
      }
    </section>`;
    })
    .join("\n");
  const flaggedCount = results.filter((r) => r.status === "flagged").length;
  const noBaseCount = results.filter((r) => r.status === "no-baseline").length;
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Visual regression report</title>
<style>
body { font-family: -apple-system, system-ui, sans-serif; margin: 2rem; max-width: 1600px; background: #f7f7f7; color: #222; }
h1 { margin-top: 0; }
.summary { padding: 1rem; background: #fff; border-radius: 4px; margin-bottom: 1rem; }
.summary strong.flag { color: #c0392b; }
.summary strong.ok { color: #16a085; }
section { background: #fff; padding: 1rem; margin-bottom: 1rem; border-radius: 4px; border-left: 6px solid #ccc; }
section.flagged { border-left-color: #c0392b; }
section.ok { border-left-color: #16a085; }
section.nobase { border-left-color: #f39c12; }
h2 { margin: 0 0 0.5rem; }
h2 small { font-weight: normal; color: #888; }
.pct { margin: 0 0 0.75rem; font-family: monospace; }
.row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
figure { margin: 0; }
figcaption { font-size: 0.8rem; color: #666; margin-bottom: 0.25rem; }
img { width: 100%; border: 1px solid #ddd; background: #eee; }
</style></head><body>
<h1>Visual regression report</h1>
<div class="summary">
  <p>${results.length} screenshots compared. <strong class="flag">${flaggedCount} flagged</strong> (&gt;${DIFF_THRESHOLD_PCT}% pixels changed). <strong class="ok">${results.length - flaggedCount - noBaseCount} ok</strong>. ${noBaseCount} without baseline.</p>
  <p>Sorted by diff percentage, descending. <em>The tool flags; the human judges</em> — some diffs are intentional (carousel replacement, icon swaps).</p>
</div>
${rows}
</body></html>`;
  fs.writeFileSync(reportPath, html);
  console.log(`\nReport: ${reportPath}`);
  console.log(`${flaggedCount} flagged, ${results.length - flaggedCount - noBaseCount} ok, ${noBaseCount} no-baseline`);
}
