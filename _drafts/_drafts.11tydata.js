// Drafts build only when BUILD_DRAFTS is set (npm run start), mirroring
// `jekyll serve --drafts`. They inherit the post permalink logic via the
// shared `draft` flag handled in _posts/_posts.11tydata.js-equivalent
// computed data below.

export default {
  layout: "post",
  draft: true,
  eleventyComputed: {
    title: (data) => data.title || data.page.fileSlug,
    permalink: (data) => {
      if (!process.env.BUILD_DRAFTS) {
        return false;
      }
      const date = data.page.date;
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      return `/blog/${year}/${month}/${data.page.fileSlug}/`;
    },
    eleventyExcludeFromCollections: (data) => !process.env.BUILD_DRAFTS,
  },
};
