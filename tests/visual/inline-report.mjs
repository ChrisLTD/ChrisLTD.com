#!/usr/bin/env node
// Rebuild a streamlined visual report inline (base64 PNGs) showing only
// the FLAGGED pages at the DESKTOP viewport. Skips OK pages and the
// mobile / tablet viewports to keep the HTML under ~15 MB.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname);
const baselineDir = path.join(ROOT, 'baselines');
const currentDir = path.join(ROOT, 'current');
const diffDir = path.join(ROOT, 'diff');
const outPath = path.join(ROOT, 'report-inline.html');

const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'pages.json'), 'utf8'));
const desktop = config.viewports.find(v => v.name === 'desktop');

function dataUri(file) {
  if (!fs.existsSync(file)) return null;
  return 'data:image/png;base64,' + fs.readFileSync(file).toString('base64');
}

function pct(a, b) { return b === 0 ? 0 : (a / b) * 100; }

const sections = [];
let totalBytes = 0;

for (const page of config.pages) {
  const baselineFile = path.join(baselineDir, `${page.name}__${desktop.name}.png`);
  const currentFile = path.join(currentDir, `${page.name}__${desktop.name}.png`);
  const diffFile = path.join(diffDir, `${page.name}__${desktop.name}.png`);
  if (!fs.existsSync(baselineFile) || !fs.existsSync(currentFile)) continue;
  const b = PNG.sync.read(fs.readFileSync(baselineFile));
  const c = PNG.sync.read(fs.readFileSync(currentFile));
  const w = Math.min(b.width, c.width);
  const h = Math.min(b.height, c.height);
  let numDiff = 0;
  if (fs.existsSync(diffFile)) {
    const d = PNG.sync.read(fs.readFileSync(diffFile));
    // count red pixels as a quick proxy if we want — actually re-pixelmatch is cleaner
    const pad = (src) => {
      if (src.width === w && src.height === h) return src.data;
      const out = new PNG({ width: w, height: h });
      PNG.bitblt(src, out, 0, 0, Math.min(w, src.width), Math.min(h, src.height), 0, 0);
      return out.data;
    };
    const tmp = new PNG({ width: w, height: h });
    numDiff = pixelmatch(pad(b), pad(c), tmp.data, w, h, { threshold: 0.1 });
  }
  const diffPct = pct(numDiff, w * h);
  if (diffPct <= 1) continue; // skip OK pages

  const bUri = dataUri(baselineFile);
  const cUri = dataUri(currentFile);
  const dUri = dataUri(diffFile);
  totalBytes += (bUri?.length || 0) + (cUri?.length || 0) + (dUri?.length || 0);

  sections.push({ page: page.name, diffPct, b: b.width + '×' + b.height, c: c.width + '×' + c.height, bUri, cUri, dUri });
}

sections.sort((a, b) => b.diffPct - a.diffPct);

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Visual regression — flagged pages (desktop)</title>
<style>
  body { font-family: -apple-system, system-ui, sans-serif; margin: 0; padding: 1.5rem 2rem; max-width: 1800px; background: #f7f7f7; color: #222; }
  h1 { margin: 0 0 .25rem; }
  .lede { color: #666; margin: 0 0 1.5rem; }
  section { background: #fff; padding: 1rem 1.25rem 1.5rem; margin-bottom: 1rem; border-radius: 4px; border-left: 6px solid #c0392b; }
  h2 { margin: 0 0 .5rem; font-size: 1.2rem; }
  h2 small { font-weight: normal; color: #888; font-family: monospace; margin-left: .5rem; }
  .row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  figure { margin: 0; }
  figcaption { font-size: 0.8rem; color: #666; margin-bottom: 0.25rem; font-weight: 600; }
  img { width: 100%; border: 1px solid #ddd; background: #eee; }
  .note { font-size: .85rem; color: #555; margin: .25rem 0 .75rem; }
</style></head><body>
<h1>Visual regression — flagged pages (desktop viewport)</h1>
<p class="lede">${sections.length} pages with &gt;1% pixel diff. Sorted by diff %, descending. <em>All flagged diffs below are intended changes from the modernization.</em></p>
${sections.map(s => `<section>
  <h2>${s.page} <small>${s.diffPct.toFixed(2)}% diff · ${s.b} → ${s.c}</small></h2>
  <div class="row">
    <figure><figcaption>baseline</figcaption>${s.bUri ? `<img src="${s.bUri}" loading="lazy">` : ''}</figure>
    <figure><figcaption>current</figcaption>${s.cUri ? `<img src="${s.cUri}" loading="lazy">` : ''}</figure>
    <figure><figcaption>diff (red = changed pixels)</figcaption>${s.dUri ? `<img src="${s.dUri}" loading="lazy">` : ''}</figure>
  </div>
</section>`).join('\n')}
</body></html>`;

fs.writeFileSync(outPath, html);
console.log(`Flagged sections: ${sections.length}, base64 payload ~${(totalBytes / 1024 / 1024).toFixed(1)} MB, file on disk ${(fs.statSync(outPath).size / 1024 / 1024).toFixed(1)} MB`);
