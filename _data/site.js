// Site-wide settings, exposed to templates as `site.*` (matching the
// variable names the Jekyll _config.yml provided).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// Cache-busting hash for /css/styles.css: SHA-1 of the SCSS source tree,
// same scheme the Jekyll _plugins/assets_hash.rb generator used. Templates
// append it as a query string so browsers refetch styles only when the
// styles actually change.
function assetsHash() {
  const dir = path.join(root, "scss");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".scss"))
    .sort()
    .map((f) => path.join(dir, f));
  const digest = crypto.createHash("sha1");
  for (const file of files) {
    digest.update(fs.readFileSync(file));
  }
  return digest.digest("hex").slice(0, 8);
}

export default {
  url: "https://chrisltd.com",
  title: "Chris Johnson - Frontend Engineer in NYC",
  description: "Chris Johnson is a Frontend Engineer in NYC. This is his portfolio and blog.",
  tagline: "Engineer in NYC",
  author: "Chris Johnson",
  feed_url: "/blog/feed.xml",
  feed_title: "Chris Johnson's Blog",
  time: new Date(),
  assets_hash: assetsHash(),
};
