# ChrisLTD.com

Source for [chrisltd.com](https://chrisltd.com), a personal portfolio + blog by [Chris Johnson](https://chrisltd.com/).

## Stack

- **[Eleventy](https://www.11ty.dev/) 3.x**: static site generator (Liquid templates, migrated from Jekyll with byte-level output parity).
- **[markdown-it](https://github.com/markdown-it/markdown-it)** configured for kramdown-compatible output (smart quotes, auto header IDs, kramdown-style footnotes) — see `_config/markdown.js`.
- **[Prism](https://prismjs.com/)** tokenizing into Pygments/Rouge class names so the existing `scss/_pygments.scss` theme keeps working — see `_config/highlight.js`.
- **Dart Sass** compiled by Eleventy itself (`scss/styles.scss` → `/css/styles.css`), no separate build step.
- **Zero client-side JavaScript.** No jQuery, no bundler, no minifier.

Deploys as a static site. Server-side config (redirects, cache headers, HSTS, X-Frame-Options, etc.) lives in `.htaccess`.

## Local dev

```sh
npm install
npm start                     # BUILD_DRAFTS=1 eleventy --serve --port=8080 (live reload)
```

For a one-shot production build:

```sh
npm run build                 # writes to ./_site/
```

Draft posts live in `_drafts/` and only render when `BUILD_DRAFTS` is set (which `npm start` / `start.sh` does).

## Directory layout

```
eleventy.config.js  Eleventy config: collections, Jekyll-compatible filters,
                    the {% highlight %} tag, SCSS pipeline, passthrough copies
_config/            markdown-it (kramdown-compat) + syntax highlighting setup
_data/site.js       Site-wide settings (site.title, site.url, assets hash, …)
_layouts/           Page templates (default, post, category-archive)
_includes/          Reusable partials
  icons/            Inline-SVG icon set used across templates
_posts/             Blog posts, one file per entry, organised by year
_drafts/            Unpublished posts (require BUILD_DRAFTS to render)
blog/category.liquid  Paginated /blog/category/… archives (one page per category)
scss/               SCSS partials; scss/styles.scss is the entry point that
                    Eleventy compiles to _site/css/styles.css
img/, portfolio/, projects/  Static asset directories
.htaccess           Apache redirects, cache headers, and security headers
```

## Authoring posts

Create a file at `_posts/YYYY/YYYY-MM-DD-slug.md` with front matter:

```yaml
---
layout: post
title: My Post Title
categories: tech design # optional, space separated
excerpt: Optional short summary used in the description meta tag.
---
```

Post URLs follow the `/blog/:year/:month/:title/` pattern (see `_posts/_posts.11tydata.js`). When no `excerpt` is set, the first paragraph of the post is used, matching Jekyll's excerpt behavior.

Code blocks can use standard triple-backtick markdown or the Jekyll-style `{% highlight lang %} … {% endhighlight %}` tag — both render Rouge-compatible markup styled by `scss/_pygments.scss`.

## Front matter conventions

- `class`: string appended to the `<body>` tag. Used by the default layout for menu highlighting (e.g. `class: about` marks the About nav item active).
- `title`: page title; also used in the browser tab and `<meta property="og:title">`.
- `excerpt`: used for `<meta name="description">` and OG description when set.

## Testing

Visual regression harness lives in [`tests/visual/`](./tests/visual/README.md). Short version:

```sh
npm install                    # one time
npm run visual:baseline        # capture reference PNGs against current state
# ...make changes...
npm run visual:check           # diff against the baselines; opens report.html
```

Baselines are gitignored. Generate them locally against whatever "before" state you want to compare to.

## Deployment

Deployed on [Netlify](https://www.netlify.com/) from `master`. `netlify.toml` handles build config; `_headers` sets security headers. `vercel.json` and `.do/app.yaml` are parallel stubs for Vercel and DigitalOcean App Platform, only Netlify is live. `deploy_example.sh` and `.htaccess` linger from the earlier Apache/DigitalOcean Droplet era.

## Cache busting

Stylesheet links carry a `?h=<hash>` query string computed in `_data/site.js` from the SHA-1 of every `.scss` file under `scss/`. Any SCSS edit rotates the hash and browsers refetch. No manual bumping.

## Markdown gotchas

A couple of authoring rules that catch me out often enough to be worth writing down:

- **Parentheses in link URLs**: URL-encode them as `%28` / `%29` so the markdown parser doesn't get confused.
- **Literal square brackets in body copy**: use the HTML entities `&#91;` and `&#93;` so they aren't parsed as a footnote or link reference.
- **Blank lines inside `{% highlight %}` blocks** are fine (handled via a post-render substitution), but raw block-level HTML in markdown ends at a blank line — keep hand-written HTML blocks blank-line free.
