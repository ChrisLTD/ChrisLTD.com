import path from "node:path";
import crypto from "node:crypto";
import * as sass from "sass";

import { configureMarkdown } from "./_config/markdown.js";
import { highlightCode } from "./_config/highlight.js";

// Categories for a post, Jekyll-style: `category: name` or a
// space-separated `categories: a b` list (arrays also accepted).
function postCategories(post) {
  const names = [];
  for (const key of ["category", "categories"]) {
    const value = post.data[key];
    if (Array.isArray(value)) {
      names.push(...value);
    } else if (typeof value === "string") {
      names.push(...value.split(/\s+/));
    }
  }
  return names.filter(Boolean);
}

export default function (eleventyConfig) {
  // Jekyll-compatible Liquid: `{% include file.html %}` syntax and
  // UTC date rendering regardless of the build machine's timezone.
  eleventyConfig.setLiquidOptions({
    jekyllInclude: true,
    timezoneOffset: 0,
  });

  eleventyConfig.amendLibrary("md", (md) => configureMarkdown(md));

  // --- Collections -------------------------------------------------------

  const POST_GLOBS = ["_posts/**/*.md", "_drafts/*.md"];

  // Newest-first, like Jekyll's site.posts.
  eleventyConfig.addCollection("posts", (api) => api.getFilteredByGlob(POST_GLOBS).reverse());

  // One entry per category, used to paginate /blog/category/:name/ pages
  // (replaces the jekyll-archives plugin).
  eleventyConfig.addCollection("categoryList", (api) => {
    const posts = api.getFilteredByGlob(POST_GLOBS).reverse();
    const byName = new Map();
    for (const post of posts) {
      for (const name of postCategories(post)) {
        if (!byName.has(name)) {
          byName.set(name, { name, posts: [] });
        }
        byName.get(name).posts.push(post);
      }
    }
    return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
  });

  // --- Filters ported from _plugins/*.rb ---------------------------------

  // Prefixes footnote ids/refs with a stable per-post token so multiple
  // posts on the same rendered page can't collide (footnotes.rb).
  eleventyConfig.addLiquidFilter("rename_footnote_link", (input, token) => {
    const str = String(input);
    token = token || crypto.createHash("sha1").update(str).digest("hex").slice(0, 8);
    return str.replace(/fn:/g, `fn:${token}-`).replace(/fnref:/g, `fnref:-${token}-`);
  });

  // Strips footnote anchor links and back-arrows so they don't break in
  // environments without in-page anchors, e.g. feed readers (footnotes.rb).
  eleventyConfig.addLiquidFilter("remove_footnote_link", (input) =>
    String(input)
      .replace(/ href=("|')#(fn|fnref):\S+\1/g, "")
      .replace(/&#8617;/g, ""),
  );

  // Rewrites root-relative src/href attributes to absolute URLs for the
  // RSS feed (rss_url_filter.rb).
  eleventyConfig.addLiquidFilter("relative_urls_to_absolute", (content) => {
    const url = "https://chrisltd.com/";
    return String(content)
      .replaceAll("src='/", `src='${url}`)
      .replaceAll('src="/', `src="${url}`)
      .replaceAll("href='/", `href='${url}`)
      .replaceAll('href="/', `href="${url}`);
  });

  // --- Jekyll built-in filters not in LiquidJS ---------------------------

  // truncatewords matching the Ruby Liquid (4.x) semantics Jekyll used:
  // ASCII-whitespace word splitting (non-breaking spaces glue words
  // together, as in kramdown's footnote backlinks), the ellipsis appended
  // whenever the input reaches the limit, and the input returned untouched
  // otherwise.
  eleventyConfig.addLiquidFilter("truncatewords", (input, words = 15, ellipsis = "...") => {
    const str = String(input ?? "");
    const wordlist = str.split(/[\t\n\v\f\r ]+/).filter((w) => w !== "");
    const last = Math.max(words - 1, 0);
    if (wordlist.length > last) {
      return wordlist.slice(0, last + 1).join(" ") + ellipsis;
    }
    return str;
  });

  eleventyConfig.addLiquidFilter("date_to_rfc822", (date) => {
    const d = new Date(date);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const pad = (n) => String(n).padStart(2, "0");
    return (
      `${days[d.getUTCDay()]}, ${pad(d.getUTCDate())} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()} ` +
      `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} +0000`
    );
  });

  eleventyConfig.addLiquidFilter("xml_escape", (input) =>
    String(input ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;"),
  );

  // --- {% highlight %} tag (Rouge-compatible markup) ---------------------
  //
  // The shortcode emits an HTML-comment placeholder and the real markup is
  // substituted after rendering. Swapping in the <figure> directly would
  // break under markdown-it: raw HTML blocks end at the first blank line,
  // and many snippets contain blank lines.
  const highlightStore = new Map();
  let highlightCount = 0;

  // Jekyll writes `{% highlight php %}` with a bare-word argument; Liquid
  // would evaluate that as an (undefined) variable, so quote it before the
  // template is parsed.
  eleventyConfig.addPreprocessor("quote-highlight-lang", "md,html,liquid", (data, content) =>
    content.replace(/\{%\s*highlight\s+([\w-]+)\s*%\}/g, '{% highlight "$1" %}'),
  );

  eleventyConfig.addPairedShortcode("highlight", (content, lang) => {
    const code = String(content)
      .replace(/^[\n\r]+/, "")
      .replace(/[\n\r]+$/, "");
    const html =
      `<figure class="highlight"><pre><code class="language-${lang}" data-lang="${lang}">` +
      `${highlightCode(code, lang)}</code></pre></figure>`;
    const key = `eleventy-hl-${highlightCount++}`;
    highlightStore.set(key, html);
    return `<!--${key}-->`;
  });

  eleventyConfig.addTransform("resolve-highlight-placeholders", (content) => {
    if (typeof content !== "string" || !content.includes("<!--eleventy-hl-")) {
      return content;
    }
    return content.replace(/<!--(eleventy-hl-\d+)-->/g, (m, key) => highlightStore.get(key) ?? m);
  });

  // --- SCSS -> /css/styles.css -------------------------------------------
  // scss/styles.scss carries `permalink: /css/styles.css` front matter;
  // underscore-prefixed files are treated as partials and skipped.
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    useLayouts: false,
    compile: function (inputContent, inputPath) {
      if (path.basename(inputPath).startsWith("_")) {
        return;
      }
      const result = sass.compileString(inputContent, {
        loadPaths: [path.dirname(inputPath)],
        style: "compressed",
        sourceMap: false,
      });
      this.addDependencies(inputPath, result.loadedUrls);
      return () => result.css;
    },
  });

  // --- Static files -------------------------------------------------------

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("blog/images");
  eleventyConfig.addPassthroughCopy("portfolio");
  eleventyConfig.addPassthroughCopy("projects");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("_headers"); // Cloudflare Pages / Netlify headers

  // Repo housekeeping files that would otherwise be treated as templates
  // or copied into the build.
  eleventyConfig.ignores.add("readme.md");
  eleventyConfig.ignores.add("TODO.md");
  eleventyConfig.ignores.add("tests/**");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
  };
}
