import { Feed } from 'feed';
import { getSortedPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/config';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

async function processMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(content);
  return result.toString();
}

function makeAbsoluteUrls(html: string, baseUrl: string): string {
  // Convert relative URLs to absolute
  return html
    .replace(/href="\/([^"]*)"/g, `href="${baseUrl}/$1"`)
    .replace(/src="\/([^"]*)"/g, `src="${baseUrl}/$1"`);
}

export async function GET() {
  const posts = getSortedPosts().slice(0, 20);

  const feed = new Feed({
    title: siteConfig.feedTitle,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'en',
    image: `${siteConfig.url}/img/favicons/apple-touch-icon-144x144.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author}`,
    feedLinks: {
      rss2: `${siteConfig.url}/blog/feed.xml`,
    },
    author: {
      name: siteConfig.author,
      link: siteConfig.url,
    },
  });

  for (const post of posts) {
    const [year, month] = post.date.split('-');
    const postUrl = `${siteConfig.url}/blog/${year}/${month}/${post.slug}/`;

    let contentHtml = await processMarkdown(post.content);
    contentHtml = makeAbsoluteUrls(contentHtml, siteConfig.url);

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt,
      content: contentHtml,
      author: [
        {
          name: siteConfig.author,
          link: siteConfig.url,
        },
      ],
      date: new Date(post.date),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
