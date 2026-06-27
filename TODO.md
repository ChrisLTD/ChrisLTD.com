# Deferred modernization

Lower-priority items intentionally left for a follow-up pass. The Phase 7
SCSS modernization deliberately stopped short of these to keep the diff
contained.

## SCSS

- **`@import` → `@use` / `@forward`**: `scss/styles.scss` still uses the
  legacy `@import` form. Dart Sass deprecates it but still supports it.
  Converting requires namespacing every variable access (`$orange` →
  `vars.$orange`) across `_default.scss`, `_resume.scss`, `_grid.scss`,
  `_animation.scss`, `_helpers.scss`, etc. Large mechanical change with
  no visible payoff.

- **Float-based grid → CSS Grid**: `scss/_grid.scss` is a 12-column
  float grid. `.col-2-3`, `.col-1-3`, `.col-1-2` are used pervasively
  across templates. Rewriting requires updating every column site and
  re-checking each page at every breakpoint.

- **Mobile-first breakpoints**: `scss/_responsive.scss` is desktop-first
  (`@include respond-to("tablet") { ... }` adds wider-screen rules to
  a desktop default). Flipping to mobile-first means auditing every use
  of the mixin.

- **Normalize.css v2.0.1 (2012)**: `scss/_normalize.scss` is an old
  vendored normalize. Could be replaced with v8.x or a small modern
  reset (Andy Bell's `modern-css-reset`). Defer until ready to validate
  the resulting visual diff page by page.

## Templates / structure

- **`role="main"` on `<main>` element**: The CSS selectors in
  `scss/_default.scss`, `scss/_print.scss`, and `scss/_resume.scss` target
  `[role="main"]`. Phase 1 kept the redundant `role="main"` on the new
  `<main>` element rather than rewrite the four CSS rules. Drop the role
  attribute once those selectors are flipped to `main`.

- **Dead portfolio filter UI**: The Development / Design filter buttons
  in `portfolio.html` are wrapped in `{% comment %}`. Either build a
  vanilla-JS filter (~20 lines) or delete the dormant block and the
  `f-development` / `f-design` classes on each article.

- **Wufoo contact form**: Still hosted externally. Replacing with a
  self-hosted form or a Formspree-style alternative was explicitly
  out of scope.
