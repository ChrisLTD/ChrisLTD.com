// Rouge-compatible syntax highlighting for Eleventy.
//
// The Jekyll site highlighted code with Rouge, which emits Pygments-style
// class names (`.highlight .k`, `.highlight .s1`, ...) that scss/_pygments.scss
// styles. Rouge has no JavaScript equivalent, so we tokenize with Prism and
// map Prism token types onto the Pygments class vocabulary. Tokenization
// boundaries differ slightly from Rouge's, but the markup shape and the
// stylesheet stay unchanged.

import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";

loadLanguages(["php", "swift", "scss", "typescript", "ruby", "applescript", "c", "json", "bash"]);

const LANG_ALIASES = {
  html: "markup",
  xml: "markup",
  js: "javascript",
  rb: "ruby",
  ts: "typescript",
};

// Prism token type -> Pygments (Rouge) short class name.
const TOKEN_MAP = {
  comment: "c",
  prolog: "c",
  cdata: "c",
  doctype: "cp",
  keyword: "k",
  atrule: "k",
  rule: "k",
  important: "k",
  boolean: "kc",
  builtin: "nb",
  "class-name": "nc",
  function: "nf",
  number: "mi",
  string: "s1",
  char: "s1",
  "template-string": "s1",
  "attr-value": "s1",
  url: "s1",
  regex: "sr",
  operator: "o",
  punctuation: "p",
  property: "nl",
  tag: "nt",
  "attr-name": "na",
  selector: "nc",
  variable: "nv",
  symbol: "ss",
  entity: "ni",
  delimiter: "cp",
  constant: "no",
  deleted: "gd",
  inserted: "gi",
};

function escapeHtml(str) {
  // Rouge escapes only &, < and > inside code blocks; quotes stay literal.
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function stringifyToken(token) {
  if (typeof token === "string") {
    return escapeHtml(token);
  }
  if (Array.isArray(token)) {
    return token.map(stringifyToken).join("");
  }
  const inner = stringifyToken(token.content);
  const cls = TOKEN_MAP[token.type] || (token.alias && TOKEN_MAP[token.alias]);
  return cls ? `<span class="${cls}">${inner}</span>` : inner;
}

// Returns highlighted code as HTML with Pygments-style span classes.
// Unknown languages (and `text`) come back escaped but un-highlighted,
// matching Rouge's plaintext lexer.
export function highlightCode(code, lang) {
  const resolved = LANG_ALIASES[lang] || lang;
  const grammar = Prism.languages[resolved];
  if (!grammar) {
    return escapeHtml(code);
  }
  return stringifyToken(Prism.tokenize(code, grammar));
}

export { escapeHtml };
