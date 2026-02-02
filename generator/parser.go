package generator

import (
	"bufio"
	"bytes"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"time"

	"github.com/yuin/goldmark"
	highlighting "github.com/yuin/goldmark-highlighting/v2"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
)

var md goldmark.Markdown

func init() {
	md = goldmark.New(
		goldmark.WithExtensions(
			extension.GFM,
			extension.Footnote,
			extension.Typographer,
			highlighting.NewHighlighting(
				highlighting.WithStyle("monokai"),
			),
		),
		goldmark.WithParserOptions(
			parser.WithAutoHeadingID(),
		),
		goldmark.WithRendererOptions(
			html.WithUnsafe(),
		),
	)
}

// ParseFrontMatter extracts YAML-like front matter from content
func ParseFrontMatter(content string) (map[string]string, string) {
	frontMatter := make(map[string]string)
	lines := strings.Split(content, "\n")

	if len(lines) < 2 || strings.TrimSpace(lines[0]) != "---" {
		return frontMatter, content
	}

	endIdx := -1
	for i := 1; i < len(lines); i++ {
		if strings.TrimSpace(lines[i]) == "---" {
			endIdx = i
			break
		}
	}

	if endIdx == -1 {
		return frontMatter, content
	}

	// Parse front matter
	for i := 1; i < endIdx; i++ {
		line := lines[i]
		colonIdx := strings.Index(line, ":")
		if colonIdx > 0 {
			key := strings.TrimSpace(line[:colonIdx])
			value := strings.TrimSpace(line[colonIdx+1:])
			frontMatter[key] = value
		}
	}

	// Return body content
	body := strings.Join(lines[endIdx+1:], "\n")
	return frontMatter, strings.TrimSpace(body)
}

// RenderMarkdown converts markdown to HTML
func RenderMarkdown(content string) template.HTML {
	var buf bytes.Buffer
	if err := md.Convert([]byte(content), &buf); err != nil {
		return template.HTML("")
	}
	return template.HTML(buf.String())
}

// ExtractExcerpt creates a text excerpt from HTML content
func ExtractExcerpt(htmlContent string, wordCount int) string {
	// Remove HTML tags
	re := regexp.MustCompile(`<[^>]*>`)
	text := re.ReplaceAllString(htmlContent, "")

	// Clean up whitespace
	text = strings.Join(strings.Fields(text), " ")

	words := strings.Fields(text)
	if len(words) > wordCount {
		return strings.Join(words[:wordCount], " ") + "..."
	}
	return text
}

// ParsePost parses a markdown file into a Post struct
func ParsePost(filePath string, baseDir string) (*Post, error) {
	content, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	frontMatter, body := ParseFrontMatter(string(content))

	// Parse date from filename: YYYY-MM-DD-title.md
	filename := filepath.Base(filePath)
	dateMatch := regexp.MustCompile(`^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$`).FindStringSubmatch(filename)
	if dateMatch == nil {
		return nil, fmt.Errorf("invalid post filename format: %s", filename)
	}

	dateStr := fmt.Sprintf("%s-%s-%s", dateMatch[1], dateMatch[2], dateMatch[3])
	date, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return nil, err
	}

	slug := dateMatch[4]

	// Generate URL: /blog/YYYY/MM/title/
	url := fmt.Sprintf("/blog/%04d/%02d/%s/", date.Year(), int(date.Month()), slug)

	htmlContent := RenderMarkdown(body)
	excerpt := ExtractExcerpt(string(htmlContent), 40)

	post := &Post{
		Title:      frontMatter["title"],
		Date:       date,
		Category:   frontMatter["category"],
		Layout:     frontMatter["layout"],
		Draft:      frontMatter["draft"] == "true",
		URL:        url,
		Slug:       slug,
		Content:    htmlContent,
		RawContent: body,
		Excerpt:    excerpt,
		FilePath:   filePath,
		Year:       date.Year(),
		Month:      int(date.Month()),
	}

	if post.Layout == "" {
		post.Layout = "post"
	}

	return post, nil
}

// LoadPosts loads all posts from the _posts directory
func LoadPosts(postsDir string) ([]*Post, error) {
	var posts []*Post

	err := filepath.Walk(postsDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() || !strings.HasSuffix(path, ".md") {
			return nil
		}

		post, err := ParsePost(path, postsDir)
		if err != nil {
			fmt.Printf("Warning: Could not parse post %s: %v\n", path, err)
			return nil
		}

		if !post.Draft {
			posts = append(posts, post)
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	// Sort posts by date (newest first)
	sort.Slice(posts, func(i, j int) bool {
		return posts[i].Date.After(posts[j].Date)
	})

	return posts, nil
}

// ParsePage parses an HTML page file
func ParsePage(filePath string) (*Page, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var frontMatter = make(map[string]string)
	var bodyLines []string
	inFrontMatter := false
	frontMatterDone := false

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		if !frontMatterDone && strings.TrimSpace(line) == "---" {
			if !inFrontMatter {
				inFrontMatter = true
				continue
			} else {
				inFrontMatter = false
				frontMatterDone = true
				continue
			}
		}

		if inFrontMatter {
			colonIdx := strings.Index(line, ":")
			if colonIdx > 0 {
				key := strings.TrimSpace(line[:colonIdx])
				value := strings.TrimSpace(line[colonIdx+1:])
				frontMatter[key] = value
			}
		} else if frontMatterDone {
			bodyLines = append(bodyLines, line)
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	// Determine URL from filename
	baseName := filepath.Base(filePath)
	ext := filepath.Ext(baseName)
	name := baseName[:len(baseName)-len(ext)]

	url := "/" + name
	if name == "index" {
		url = "/"
	}

	page := &Page{
		Title:    frontMatter["title"],
		Class:    frontMatter["class"],
		Layout:   frontMatter["layout"],
		URL:      url,
		Content:  template.HTML(strings.Join(bodyLines, "\n")),
		FilePath: filePath,
	}

	if page.Layout == "" {
		page.Layout = "default"
	}

	return page, nil
}

// GroupPostsByCategory organizes posts into categories
func GroupPostsByCategory(posts []*Post) map[string]*Category {
	categories := make(map[string]*Category)

	for _, post := range posts {
		if post.Category == "" {
			continue
		}

		cat, exists := categories[post.Category]
		if !exists {
			cat = &Category{
				Name:  post.Category,
				Title: strings.Title(strings.ReplaceAll(post.Category, "-", " ")),
				URL:   "/blog/category/" + post.Category + "/",
			}
			categories[post.Category] = cat
		}
		cat.Posts = append(cat.Posts, post)
	}

	return categories
}
