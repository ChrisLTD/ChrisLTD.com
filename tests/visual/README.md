# Visual regression harness

Small Playwright-based snapshot diff used during the modernization to flag unexpected visual changes.

## Workflow

```sh
# One-time: install dev deps (Playwright Chromium is already on this machine at /opt/pw-browsers)
npm install

# Phase 0 — capture baselines on the untouched branch BEFORE any code changes
bundle exec jekyll serve --port=8080 &
npm run visual:baseline

# After each modernization phase
npm run visual:check
open tests/visual/report.html
```

## What gets snapshotted

`pages.json` lists the URLs + viewports. Current set covers homepage, portfolio, projects, about, resume, blog index/archive/category/post-with-footnotes/post-with-iframe, styles guide, and 404, at mobile (375), tablet (768), and desktop (1280) viewports.

## Reading the report

- **Green sections** — diff ≤ 1% of pixels. No action.
- **Red sections** — diff > 1%. Open the side-by-side baseline / current / diff PNGs and judge whether the change is intended.
- **Orange sections** — no baseline existed. Likely a newly added page.

The tool flags; the human judges. Some phases (carousel → static stack, icon font → SVG) produce intended diffs.

## Files

- `snap.mjs` — entrypoint; supports `--mode=baseline` and `--mode=check`.
- `pages.json` — page + viewport config.
- `baselines/` — committed PNGs. Re-capture only when you've deliberately changed the visual.
- `current/`, `diff/`, `report.html` — generated, gitignored.

## Updating baselines

After a phase where the visual change is intended and approved, re-run `npm run visual:baseline` to refresh the baselines for the affected pages and commit.
