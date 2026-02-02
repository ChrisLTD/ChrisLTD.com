package generator

import (
	"html/template"
	"time"
)

// Site represents the global site configuration
type Site struct {
	URL           string
	Title         string
	Description   string
	Tagline       string
	Author        string
	FeedURL       string
	FeedTitle     string
	AssetsVersion string
	BaseURL       string
	Year          int
}

// Post represents a blog post
type Post struct {
	Title       string
	Date        time.Time
	Category    string
	Layout      string
	Draft       bool
	URL         string
	Slug        string
	Content     template.HTML
	RawContent  string
	Excerpt     string
	FilePath    string
	Year        int
	Month       int
}

// Page represents a static page
type Page struct {
	Title    string
	Class    string
	Layout   string
	URL      string
	Content  template.HTML
	FilePath string
}

// Category represents a blog category with its posts
type Category struct {
	Name  string
	Title string
	URL   string
	Posts []*Post
}

// TemplateData is passed to templates for rendering
type TemplateData struct {
	Site       Site
	Page       *Page
	Post       *Post
	Posts      []*Post
	Categories map[string]*Category
	Category   *Category
	Content    template.HTML
	IsHome     bool
	IsBlog     bool
	IsPost     bool
	PageClass  string
	PageTitle  string
	PageURL    string
}
