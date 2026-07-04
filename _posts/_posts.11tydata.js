// Directory data for blog posts: Jekyll-style permalinks
// (/blog/:year/:month/:title/) derived from the dated filename, and
// Jekyll-style excerpts used for meta descriptions.

import MarkdownIt from "markdown-it";
import { configureMarkdown } from "../_config/markdown.js";

const md = configureMarkdown(new MarkdownIt());

// Jekyll's excerpt: source up to the first blank line, plus any
// reference-style link/footnote definitions from the rest of the document,
// rendered to HTML.
function jekyllExcerpt(rawInput) {
  const raw = String(rawInput || "").replace(/^\s*\n/, "");
  const sep = raw.indexOf("\n\n");
  const head = sep === -1 ? raw : raw.slice(0, sep);
  const tail = sep === -1 ? "" : raw.slice(sep + 2);
  const refs = tail.match(/^ {0,3}\[[^\]]+\]:.+$/gm) || [];
  const source = refs.length ? `${head}\n\n${refs.join("\n")}` : head;
  // Liquid tags aren't evaluated here; drop them rather than leak them.
  const cleaned = source.replace(/\{%[\s\S]*?%\}/g, "").replace(/\{\{[\s\S]*?\}\}/g, "");
  return md.render(cleaned);
}

export default {
  eleventyComputed: {
    excerpt: (data) => data.excerpt || jekyllExcerpt(data.page.rawInput),
    permalink: (data) => {
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return false;
      }
      const date = data.page.date;
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      return `/blog/${year}/${month}/${data.page.fileSlug}/`;
    },
    eleventyExcludeFromCollections: (data) => Boolean(data.draft && !process.env.BUILD_DRAFTS),
  },
};
