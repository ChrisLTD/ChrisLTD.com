// markdown-it configuration replicating the kramdown output the Jekyll
// site produced: smart quotes, kramdown-style auto header IDs, kramdown's
// footnote markup (including named footnote labels like `fn:ds`), and
// Rouge-style markup for fenced code blocks.

import markdownItFootnote from "markdown-it-footnote";
import markdownItAnchor from "markdown-it-anchor";
import { highlightCode, escapeHtml } from "./highlight.js";

// kramdown's basic_generate_id: drop everything but alphanumerics, spaces
// and hyphens, spaces to hyphens, downcase.
export function kramdownSlug(text) {
  const id = text
    .replace(/[^a-zA-Z0-9 -]/g, "")
    .replace(/ /g, "-")
    .toLowerCase();
  return id.length > 0 ? id : "section";
}

// Footnote label as kramdown renders it: the author-supplied name from
// `[^name]`, falling back to the footnote number.
function footnoteLabel(tokens, idx, env) {
  const meta = tokens[idx].meta;
  const list = env.footnotes && env.footnotes.list;
  const byId = list && meta && list[meta.id];
  return (meta && meta.label) || (byId && byId.label) || (meta ? meta.id + 1 : "");
}

export function configureMarkdown(md) {
  // xhtmlOut matches kramdown's XHTML-style void elements (<img />, <hr />).
  md.set({ html: true, typographer: true, xhtmlOut: true });

  md.use(markdownItFootnote);
  md.use(markdownItAnchor, {
    slugify: kramdownSlug,
    tabIndex: false,
    uniqueSlugStartIndex: 1,
  });

  // kramdown-compatible footnote markup.
  md.renderer.rules.footnote_ref = (tokens, idx, options, env) => {
    const label = footnoteLabel(tokens, idx, env);
    const n = tokens[idx].meta.id + 1;
    return (
      `<sup id="fnref:${label}" role="doc-noteref">` +
      `<a href="#fn:${label}" class="footnote" rel="footnote">${n}</a></sup>`
    );
  };
  md.renderer.rules.footnote_block_open = () => '<div class="footnotes" role="doc-endnotes">\n  <ol>\n';
  md.renderer.rules.footnote_block_close = () => "</ol>\n</div>\n";
  md.renderer.rules.footnote_open = (tokens, idx, options, env) =>
    `<li id="fn:${footnoteLabel(tokens, idx, env)}" role="doc-endnote">`;
  md.renderer.rules.footnote_close = () => "</li>\n";
  md.renderer.rules.footnote_anchor = (tokens, idx, options, env) => {
    const label = footnoteLabel(tokens, idx, env);
    // kramdown separates the backlink with a literal non-breaking space.
    return ` <a href="#fnref:${label}" class="reversefootnote" role="doc-backlink">&#8617;</a>`;
  };

  // Jekyll's kramdown config tags inline code spans with these classes.
  md.renderer.rules.code_inline = (tokens, idx, options, env, slf) =>
    `<code class="language-plaintext highlighter-rouge"${slf.renderAttrs(tokens[idx])}>` +
    `${escapeHtml(tokens[idx].content)}</code>`;

  // Rouge-style markup for fenced code blocks (``` lang):
  // <div class="language-x highlighter-rouge"><div class="highlight">
  //   <pre class="highlight"><code>...</code></pre></div></div>
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const lang = (token.info || "").trim().split(/\s+/)[0];
    const code = token.content.replace(/\n$/, "");
    if (!lang) {
      return `<pre><code>${escapeHtml(token.content)}</code></pre>\n`;
    }
    const html = highlightCode(code, lang);
    return (
      `<div class="language-${lang} highlighter-rouge"><div class="highlight">` +
      `<pre class="highlight"><code>${html}\n</code></pre></div></div>\n`
    );
  };

  return md;
}
