# ChrisLTD.com

Source for [chrisltd.com](https://chrisltd.com) — a personal portfolio + blog by [Chris Johnson](https://chrisltd.com/).

## Stack

- **[Jekyll](https://jekyllrb.com/) 4.3.x** — static site generator.
- **[kramdown](https://kramdown.gettalong.org/)** with **[Rouge](https://rouge.jneen.net/)** — Markdown + syntax highlighting.
- **[jekyll-archives](https://github.com/jekyll/jekyll-archives)** — powers `/blog/category/…` pages.
- **Dart Sass** via `jekyll-sass-converter` — no separate build step.
- **Zero client-side JavaScript.** No jQuery, no bundler, no minifier.

Deploys as a static site. Server-side config (redirects, cache headers, HSTS, X-Frame-Options, etc.) lives in `.htaccess`.

## Local dev

```sh
bundle install
bash start.sh                 # bundle exec jekyll serve --drafts --port=8080 --livereload
```

For a one-shot production build:

```sh
bundle exec jekyll build      # writes to ./_site/
```

Draft posts live in `_drafts/` and only render when the server is started with `--drafts` (which `start.sh` does).

## Directory layout

```
_layouts/       Page templates (default, post, category-archive)
_includes/      Reusable partials
  icons/        Inline-SVG icon set used across templates
_posts/         Blog posts, one file per entry, organised by year
_drafts/        Unpublished posts (require --drafts to render)
_plugins/       Ruby Jekyll plugins (footnote helpers, RSS URL rewriter)
scss/           SCSS partials; scss/styles.scss is the entry point that
                Jekyll compiles to _site/css/styles.css
img/, portfolio/, projects/, fonts/  Static asset directories
_config.yml     Jekyll config (permalinks, sass, jekyll-archives, …)
.htaccess       Apache redirects, cache headers, and security headers
```

## Authoring posts

Create a file at `_posts/YYYY/YYYY-MM-DD-slug.md` with front matter:

```yaml
---
layout: post
title: My Post Title
date: 2026-06-28 11:00:00 -04:00     # optional; defaults to 11:00am
categories: [tech, design]           # optional
excerpt: Optional short summary used in the description meta tag.
---
```

Post URLs follow the `permalink: /blog/:year/:month/:title/` pattern set in `_config.yml`.

Fenced code blocks use standard triple-backtick markdown:

<pre>```ruby
puts "hello"
```</pre>

## Front matter conventions

- `class` — string appended to the `<body>` tag. Used by the default layout for menu highlighting (e.g. `class: about` marks the About nav item active).
- `title` — page title; also used in the browser tab and `<meta property="og:title">`.
- `excerpt` — used for `<meta name="description">` and OG description when set.

## Testing

Visual regression harness lives in [`tests/visual/`](./tests/visual/README.md). Short version:

```sh
npm install                    # one time
npm run visual:baseline        # capture reference PNGs against current state
# ...make changes...
npm run visual:check           # diff against the baselines; opens report.html
```

Baselines are gitignored — generate them locally against whatever "before" state you want to compare to.

## Deployment

Auto-deploys via Cloudflare Pages / Vercel from `master` (build settings are managed in the respective dashboards). `deploy_example.sh` in the repo is a historical rsync recipe kept for reference.

## Deferred modernization

The 2026 modernization (jQuery removed, Symbolset icons swapped for inline SVG, packr/Ruby-Sass dropped, security headers added, etc.) deliberately left a few items for later. See [`TODO.md`](./TODO.md) for the list — float grid → CSS Grid, `@import` → `@use`, Normalize v2 → modern reset, etc.

## Markdown gotchas

A couple of authoring rules that catch me out often enough to be worth writing down:

- **Parentheses in link URLs** — URL-encode them as `%28` / `%29` so kramdown doesn't get confused.
- **Literal square brackets in body copy** — use the HTML entities `&#91;` and `&#93;` so kramdown doesn't try to parse them as a footnote reference.
