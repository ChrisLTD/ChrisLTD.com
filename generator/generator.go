package generator

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"strings"
	texttemplate "text/template"
	"time"
)

// Generator handles static site generation
type Generator struct {
	Site          Site
	Posts         []*Post
	Categories    map[string]*Category
	Templates     *template.Template
	TextTemplates *texttemplate.Template
	OutputDir     string
	SourceDir     string
}

// NewGenerator creates a new site generator
func NewGenerator(sourceDir, outputDir string) *Generator {
	return &Generator{
		Site: Site{
			URL:           "https://chrisltd.com",
			Title:         "Chris Johnson - Frontend Engineer in NYC",
			Description:   "Chris Johnson is a Frontend Engineer in NYC. This is his portfolio and blog.",
			Tagline:       "Engineer in NYC",
			Author:        "Chris Johnson",
			FeedURL:       "/blog/feed.xml",
			FeedTitle:     "Chris Johnson's Blog",
			AssetsVersion: "1",
			Year:          time.Now().Year(),
		},
		OutputDir: outputDir,
		SourceDir: sourceDir,
	}
}

// LoadTemplates loads all templates from the templates directory
func (g *Generator) LoadTemplates(templatesDir string) error {
	funcMap := template.FuncMap{
		"safeHTML": func(s string) template.HTML {
			return template.HTML(s)
		},
		"formatDate": func(t time.Time, format string) string {
			return t.Format(format)
		},
		"formatDateShort": func(t time.Time) string {
			return fmt.Sprintf("%d/%d/%02d", int(t.Month()), t.Day(), t.Year()%100)
		},
		"formatDateLong": func(t time.Time) string {
			return fmt.Sprintf("%d/%d/%d", int(t.Month()), t.Day(), t.Year())
		},
		"xmlEscape": func(s string) string {
			var buf bytes.Buffer
			xml.EscapeText(&buf, []byte(s))
			return buf.String()
		},
		"rfc822Date": func(t time.Time) string {
			return t.Format(time.RFC1123Z)
		},
		"rfc3339Date": func(t time.Time) string {
			return t.Format(time.RFC3339)
		},
		"truncateWords": func(s string, n int) string {
			words := strings.Fields(s)
			if len(words) > n {
				return strings.Join(words[:n], " ") + "..."
			}
			return s
		},
		"stripHTML": func(s string) string {
			// Simple HTML stripping
			result := s
			for strings.Contains(result, "<") && strings.Contains(result, ">") {
				start := strings.Index(result, "<")
				end := strings.Index(result, ">")
				if start < end {
					result = result[:start] + result[end+1:]
				} else {
					break
				}
			}
			return result
		},
		"limit": func(posts []*Post, n int) []*Post {
			if len(posts) > n {
				return posts[:n]
			}
			return posts
		},
		"add": func(a, b int) int {
			return a + b
		},
		"sub": func(a, b int) int {
			return a - b
		},
		"seq": func(n int) []int {
			result := make([]int, n)
			for i := range result {
				result[i] = i
			}
			return result
		},
	}

	tmpl, err := template.New("").Funcs(funcMap).ParseGlob(filepath.Join(templatesDir, "*.html"))
	if err != nil {
		return fmt.Errorf("failed to parse templates: %w", err)
	}
	g.Templates = tmpl

	// Load text templates for XML files
	textFuncMap := texttemplate.FuncMap{
		"formatDate": func(t time.Time, format string) string {
			return t.Format(format)
		},
		"xmlEscape": func(s string) string {
			var buf bytes.Buffer
			xml.EscapeText(&buf, []byte(s))
			return buf.String()
		},
		"rfc822Date": func(t time.Time) string {
			return t.Format(time.RFC1123Z)
		},
		"limit": func(posts []*Post, n int) []*Post {
			if len(posts) > n {
				return posts[:n]
			}
			return posts
		},
	}

	textTmpl, err := texttemplate.New("").Funcs(textFuncMap).ParseGlob(filepath.Join(templatesDir, "*.xml"))
	if err != nil {
		return fmt.Errorf("failed to parse text templates: %w", err)
	}
	g.TextTemplates = textTmpl

	return nil
}

// LoadContent loads all posts and pages
func (g *Generator) LoadContent() error {
	postsDir := filepath.Join(g.SourceDir, "_posts")
	posts, err := LoadPosts(postsDir)
	if err != nil {
		return fmt.Errorf("failed to load posts: %w", err)
	}
	g.Posts = posts
	g.Categories = GroupPostsByCategory(posts)

	fmt.Printf("Loaded %d posts\n", len(posts))
	fmt.Printf("Found %d categories\n", len(g.Categories))

	return nil
}

// RenderTemplate renders a template with the given data
func (g *Generator) RenderTemplate(templateName string, data TemplateData) (string, error) {
	var buf bytes.Buffer
	err := g.Templates.ExecuteTemplate(&buf, templateName, data)
	if err != nil {
		return "", fmt.Errorf("failed to execute template %s: %w", templateName, err)
	}
	return buf.String(), nil
}

// WriteFile writes content to a file, creating directories as needed
func (g *Generator) WriteFile(relativePath string, content string) error {
	fullPath := filepath.Join(g.OutputDir, relativePath)
	dir := filepath.Dir(fullPath)

	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}

	return os.WriteFile(fullPath, []byte(content), 0644)
}

// GeneratePosts generates all blog post pages
func (g *Generator) GeneratePosts() error {
	for _, post := range g.Posts {
		data := TemplateData{
			Site:      g.Site,
			Post:      post,
			Posts:     g.Posts,
			IsPost:    true,
			PageClass: "blog",
			PageTitle: post.Title,
			PageURL:   post.URL,
			Content:   post.Content,
		}

		content, err := g.RenderTemplate("post.html", data)
		if err != nil {
			return fmt.Errorf("failed to render post %s: %w", post.Title, err)
		}

		// Write to /blog/YYYY/MM/title/index.html
		outputPath := filepath.Join(post.URL, "index.html")
		if err := g.WriteFile(outputPath, content); err != nil {
			return fmt.Errorf("failed to write post %s: %w", post.Title, err)
		}
	}

	fmt.Printf("Generated %d posts\n", len(g.Posts))
	return nil
}

// GenerateBlogIndex generates the main blog listing page
func (g *Generator) GenerateBlogIndex() error {
	// Get first 10 posts for the main blog page
	postsToShow := g.Posts
	if len(postsToShow) > 10 {
		postsToShow = postsToShow[:10]
	}

	data := TemplateData{
		Site:      g.Site,
		Posts:     postsToShow,
		IsBlog:    true,
		PageClass: "blog",
		PageTitle: "Blog",
		PageURL:   "/blog",
	}

	content, err := g.RenderTemplate("blog.html", data)
	if err != nil {
		return err
	}

	return g.WriteFile("blog/index.html", content)
}

// GenerateBlogArchive generates the blog archive page
func (g *Generator) GenerateBlogArchive() error {
	data := TemplateData{
		Site:      g.Site,
		Posts:     g.Posts,
		IsBlog:    true,
		PageClass: "blog",
		PageTitle: "Blog Archive",
		PageURL:   "/blog/archive",
	}

	content, err := g.RenderTemplate("archive.html", data)
	if err != nil {
		return err
	}

	return g.WriteFile("blog/archive/index.html", content)
}

// GenerateCategoryPages generates category archive pages
func (g *Generator) GenerateCategoryPages() error {
	for _, cat := range g.Categories {
		data := TemplateData{
			Site:      g.Site,
			Category:  cat,
			Posts:     cat.Posts,
			IsBlog:    true,
			PageClass: "blog",
			PageTitle: cat.Title,
			PageURL:   cat.URL,
		}

		content, err := g.RenderTemplate("category.html", data)
		if err != nil {
			return fmt.Errorf("failed to render category %s: %w", cat.Name, err)
		}

		outputPath := filepath.Join("blog/category", cat.Name, "index.html")
		if err := g.WriteFile(outputPath, content); err != nil {
			return err
		}
	}

	fmt.Printf("Generated %d category pages\n", len(g.Categories))
	return nil
}

// GenerateRSSFeed generates the RSS feed
func (g *Generator) GenerateRSSFeed() error {
	data := TemplateData{
		Site:  g.Site,
		Posts: g.Posts,
	}

	var buf bytes.Buffer
	err := g.TextTemplates.ExecuteTemplate(&buf, "feed.xml", data)
	if err != nil {
		return fmt.Errorf("failed to execute RSS template: %w", err)
	}

	return g.WriteFile("blog/feed.xml", buf.String())
}

// GeneratePages generates static pages
func (g *Generator) GeneratePages() error {
	pages := []struct {
		template  string
		output    string
		title     string
		pageClass string
		isHome    bool
	}{
		{"index.html", "index.html", "", "home", true},
		{"about.html", "about/index.html", "About", "about", false},
		{"portfolio.html", "portfolio/index.html", "Portfolio", "portfolio", false},
		{"projects.html", "projects/index.html", "Projects", "projects", false},
		{"resume.html", "resume/index.html", "Resume", "resume", false},
		{"404.html", "404.html", "Page Not Found", "", false},
	}

	for _, p := range pages {
		// Get first 4 posts for homepage
		postsToShow := g.Posts
		if p.isHome && len(postsToShow) > 4 {
			postsToShow = postsToShow[:4]
		}

		data := TemplateData{
			Site:      g.Site,
			Posts:     postsToShow,
			IsHome:    p.isHome,
			PageClass: p.pageClass,
			PageTitle: p.title,
		}

		content, err := g.RenderTemplate(p.template, data)
		if err != nil {
			return fmt.Errorf("failed to render page %s: %w", p.template, err)
		}

		if err := g.WriteFile(p.output, content); err != nil {
			return fmt.Errorf("failed to write page %s: %w", p.output, err)
		}
	}

	fmt.Println("Generated static pages")
	return nil
}

// CopyStaticAssets copies static files to the output directory
func (g *Generator) CopyStaticAssets() error {
	staticDirs := []string{"img", "portfolio", "projects", "fonts", "blog/images"}

	for _, dir := range staticDirs {
		srcDir := filepath.Join(g.SourceDir, dir)
		if _, err := os.Stat(srcDir); os.IsNotExist(err) {
			continue
		}

		err := filepath.Walk(srcDir, func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}

			relPath, _ := filepath.Rel(g.SourceDir, path)
			destPath := filepath.Join(g.OutputDir, relPath)

			if info.IsDir() {
				return os.MkdirAll(destPath, 0755)
			}

			data, err := os.ReadFile(path)
			if err != nil {
				return err
			}

			return os.WriteFile(destPath, data, 0644)
		})

		if err != nil {
			return fmt.Errorf("failed to copy %s: %w", dir, err)
		}
	}

	// Copy favicon
	faviconSrc := filepath.Join(g.SourceDir, "favicon.ico")
	if _, err := os.Stat(faviconSrc); err == nil {
		data, _ := os.ReadFile(faviconSrc)
		g.WriteFile("favicon.ico", string(data))
	}

	// Copy robots.txt
	robotsSrc := filepath.Join(g.SourceDir, "robots.txt")
	if _, err := os.Stat(robotsSrc); err == nil {
		data, _ := os.ReadFile(robotsSrc)
		g.WriteFile("robots.txt", string(data))
	}

	fmt.Println("Copied static assets")
	return nil
}

// Build generates the entire site
func (g *Generator) Build() error {
	// Clean output directory
	if err := os.RemoveAll(g.OutputDir); err != nil {
		return fmt.Errorf("failed to clean output directory: %w", err)
	}

	if err := os.MkdirAll(g.OutputDir, 0755); err != nil {
		return fmt.Errorf("failed to create output directory: %w", err)
	}

	// Load templates
	templatesDir := filepath.Join(g.SourceDir, "templates")
	if err := g.LoadTemplates(templatesDir); err != nil {
		return err
	}

	// Load content
	if err := g.LoadContent(); err != nil {
		return err
	}

	// Generate content
	if err := g.GeneratePages(); err != nil {
		return err
	}

	if err := g.GeneratePosts(); err != nil {
		return err
	}

	if err := g.GenerateBlogIndex(); err != nil {
		return err
	}

	if err := g.GenerateBlogArchive(); err != nil {
		return err
	}

	if err := g.GenerateCategoryPages(); err != nil {
		return err
	}

	if err := g.GenerateRSSFeed(); err != nil {
		return err
	}

	// Copy static assets
	if err := g.CopyStaticAssets(); err != nil {
		return err
	}

	fmt.Println("Build complete!")
	return nil
}
