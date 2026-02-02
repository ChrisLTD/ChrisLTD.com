#!/bin/bash
set -e

echo "=== ChrisLTD.com Static Site Generator ==="
echo ""

echo "Installing npm dependencies..."
npm install

echo "Building Tailwind CSS..."
npm run build:css

echo "Building Go generator..."
go mod tidy
go build -o bin/generate ./cmd

echo "Generating static site..."
./bin/generate

echo "Copying static assets to _site..."
cp -r static/css _site/
cp -r static/js _site/
cp static/_headers _site/ 2>/dev/null || true
cp static/_redirects _site/ 2>/dev/null || true

echo ""
echo "Build complete! Output in _site/"
echo "Run './bin/generate -serve' to start a local development server."
