import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  category?: string;
  categories?: string[];
  content: string;
  excerpt?: string;
}

export interface PostWithHtml extends Post {
  contentHtml: string;
}

function getPostFilesRecursively(dir: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getPostFilesRecursively(fullPath));
    } else if (item.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractDateAndSlugFromFilename(filename: string): { date: string; slug: string } {
  // Filename format: YYYY-MM-DD-slug.md
  const basename = path.basename(filename, '.md');
  const match = basename.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);

  if (match) {
    return {
      date: match[1],
      slug: match[2],
    };
  }

  return {
    date: '',
    slug: basename,
  };
}

export function getSortedPosts(): Post[] {
  const filePaths = getPostFilesRecursively(postsDirectory);

  const posts = filePaths.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const { date, slug } = extractDateAndSlugFromFilename(filePath);

    // Get category/categories
    const category = data.category || (data.categories ? (Array.isArray(data.categories) ? data.categories[0] : data.categories) : undefined);
    const categories = data.categories
      ? (Array.isArray(data.categories) ? data.categories : data.categories.split(' '))
      : (data.category ? [data.category] : []);

    // Create excerpt from content
    const plainContent = content.replace(/[#*`\[\]]/g, '').trim();
    const excerpt = plainContent.substring(0, 160).trim() + '...';

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : date,
      category,
      categories,
      content,
      excerpt,
    };
  });

  // Sort by date descending
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(): { year: string; month: string; slug: string }[] {
  const posts = getSortedPosts();

  return posts.map((post) => {
    const [year, month] = post.date.split('-');
    return {
      year,
      month,
      slug: post.slug,
    };
  });
}

export async function getPostBySlug(year: string, month: string, slug: string): Promise<PostWithHtml | null> {
  const posts = getSortedPosts();

  const post = posts.find((p) => {
    const [postYear, postMonth] = p.date.split('-');
    return postYear === year && postMonth === month && p.slug === slug;
  });

  if (!post) {
    return null;
  }

  // Process markdown to HTML
  const processedContent = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(post.content);

  const contentHtml = processedContent.toString();

  return {
    ...post,
    contentHtml,
  };
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getSortedPosts();
  return posts.filter((post) =>
    post.categories?.includes(category) || post.category === category
  );
}

export function getAllCategories(): string[] {
  const posts = getSortedPosts();
  const categories = new Set<string>();

  posts.forEach((post) => {
    if (post.categories) {
      post.categories.forEach((cat) => categories.add(cat));
    } else if (post.category) {
      categories.add(post.category);
    }
  });

  return Array.from(categories).sort();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);
  return `${month}/${day}/${year}`;
}

export function formatDateLong(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
