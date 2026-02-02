package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"chrisltd.com/generator"
)

func main() {
	// Parse flags
	serve := flag.Bool("serve", false, "Start a development server after building")
	port := flag.String("port", "8080", "Port for the development server")
	watch := flag.Bool("watch", false, "Watch for changes and rebuild (use with -serve)")
	flag.Parse()

	// Determine source directory (current working directory)
	sourceDir, err := os.Getwd()
	if err != nil {
		log.Fatalf("Failed to get working directory: %v", err)
	}

	outputDir := filepath.Join(sourceDir, "_site")

	// Create and run generator
	gen := generator.NewGenerator(sourceDir, outputDir)

	fmt.Println("Building site...")
	if err := gen.Build(); err != nil {
		log.Fatalf("Build failed: %v", err)
	}

	if *serve {
		fmt.Printf("\nStarting development server at http://localhost:%s\n", *port)
		fmt.Println("Press Ctrl+C to stop")

		if *watch {
			fmt.Println("Watching for changes...")
			// In a real implementation, we'd add file watching here
		}

		// Serve the output directory
		fs := http.FileServer(http.Dir(outputDir))

		// Custom handler to support clean URLs
		http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			path := r.URL.Path

			// Try to serve the file directly
			fullPath := filepath.Join(outputDir, path)
			if info, err := os.Stat(fullPath); err == nil && !info.IsDir() {
				fs.ServeHTTP(w, r)
				return
			}

			// Try adding index.html for directories
			if info, err := os.Stat(filepath.Join(fullPath, "index.html")); err == nil && !info.IsDir() {
				r.URL.Path = path + "/index.html"
				fs.ServeHTTP(w, r)
				return
			}

			// Try adding .html extension
			if info, err := os.Stat(fullPath + ".html"); err == nil && !info.IsDir() {
				r.URL.Path = path + ".html"
				fs.ServeHTTP(w, r)
				return
			}

			// Serve 404
			http.ServeFile(w, r, filepath.Join(outputDir, "404.html"))
		})

		log.Fatal(http.ListenAndServe(":"+*port, nil))
	}
}
