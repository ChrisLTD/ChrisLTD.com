# Visual regression harness

Small Playwright-based snapshot diff. Useful when you're about to change
templates or SCSS and want to know which pages moved a pixel.

## Workflow

```sh
# One-time: install dev deps (Playwright Chromium is already on the machine
# at /opt/pw-browsers — no browser download needed)
npm install

# 1. Establish a baseline from the current site. Do this on a clean branch
#    (usually master) BEFORE the changes you want to inspect.
bundle exec jekyll serve --port=8080 &
npm run visual:baseline

# 2. Apply your changes, rebuild, then diff:
npm run visual:check
open tests/visual/report.html
```

## What gets snapshotted

`pages.json` lists the URLs + viewports. Current set covers homepage,
portfolio, projects, about, resume, blog index/archive/category/post-with-
footnotes/post-with-iframe, styles guide, and 404, at mobile (375),
tablet (768), and desktop (1280) viewports.

## Reading the report

- **Green sections** — diff ≤ 1% of pixels. No action.
- **Red sections** — diff > 1%. Open the side-by-side baseline / current
  / diff PNGs and judge whether the change is intended.
- **Orange sections** — no baseline existed. Likely a newly added page.

The tool flags; the human judges.

## Baselines are not committed

`tests/visual/baselines/` is gitignored. Baselines are a per-machine
diagnostic artifact, not source truth — you generate them once against
whatever "before" state you want to compare against, then work locally.

That means the first thing to do on a fresh clone is `npm run
visual:baseline` on `master` (or wherever you want your reference point).
Everything else (`current/`, `diff/`, `report.html`) is also gitignored.

## Files

- `snap.mjs` — entrypoint; supports `--mode=baseline` and `--mode=check`.
- `pages.json` — page + viewport config.
- `inline-report.mjs` — rebuild `report.html` with the flagged screenshots
  base64-inlined so a single HTML file can be shared without the PNG
  sidecars. Writes `report-inline.html`.
- `baselines/`, `current/`, `diff/`, `report.html`, `report-inline.html` —
  all local, all gitignored.
