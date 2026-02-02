# ChrisLTD.com

### Version 3.0 | By [Chris Johnson](http://chrisltd.com)

A Go-based static site generator with Tailwind CSS, designed for hosting on Cloudflare Pages.

## Technology Stack

- **Static Site Generator**: Custom Go-based generator
- **Styling**: Tailwind CSS
- **Markdown Processing**: Goldmark with syntax highlighting
- **Hosting**: Cloudflare Pages

## Prerequisites

- Go 1.21 or later
- Node.js 18 or later
- npm

## Quick Start

```bash
# Install dependencies and build the site
./build.sh

# Or run commands separately:
npm install                    # Install npm dependencies
npm run build:css              # Build Tailwind CSS
go build -o bin/generate ./cmd # Build Go generator
./bin/generate                 # Generate static site
```

## Development

Start a local development server:

```bash
./bin/generate -serve -port 8080
```

Watch for CSS changes (in a separate terminal):

```bash
npm run watch:css
```

## Project Structure

```
├── _posts/           # Blog posts in Markdown (YYYY-MM-DD-title.md format)
├── cmd/              # Go entry point
├── generator/        # Go static site generator code
├── templates/        # HTML templates with Go template syntax
├── static/
│   ├── css/          # Tailwind CSS input and output
│   └── js/           # JavaScript files
├── img/              # Site images
├── portfolio/        # Portfolio images
├── projects/         # Project images
├── fonts/            # Icon fonts
└── _site/            # Generated output (gitignored)
```

## Blog Posts

Create new blog posts in `_posts/YYYY/YYYY-MM-DD-title.md` with front matter:

```yaml
---
layout: post
title: Your Post Title
category: optional-category
---

Your content in Markdown...
```

## Cloudflare Pages Deployment

The site is configured for Cloudflare Pages with:

- `_headers` - Cache control and security headers
- `_redirects` - URL redirects for legacy URLs

### Build Configuration

- **Build command**: `./build.sh`
- **Build output directory**: `_site`

## Templates

Templates use Go's `html/template` package with custom functions:

- `formatDate` - Format dates
- `formatDateShort` - Short date format (M/D/YY)
- `formatDateLong` - Long date format (M/D/YYYY)
- `truncateWords` - Truncate text to word count
- `stripHTML` - Remove HTML tags
- `limit` - Limit slice length
- `safeHTML` - Render raw HTML

## Code Highlighting

Code highlighting is handled by the Goldmark Markdown processor with the Chroma highlighter. Use standard Markdown code fences:

````markdown
```go
func main() {
    fmt.Println("Hello, World!")
}
```
````

## Migrating from Jekyll

This site was migrated from Jekyll. The blog post format remains compatible:
- Posts use the same `YYYY-MM-DD-title.md` naming convention
- Front matter syntax is preserved
- Markdown content works the same way

## License

Content and design copyright Chris Johnson. Code structure available for reference.
