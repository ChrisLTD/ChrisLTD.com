import Link from 'next/link';
import type { Metadata } from 'next';
import { getSortedPosts, formatDate } from '@/lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

export const metadata: Metadata = {
  title: 'Blog',
};

async function processMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(content);
  return result.toString();
}

export default async function BlogPage() {
  const posts = getSortedPosts().slice(0, 10);

  const postsWithHtml = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      contentHtml: await processMarkdown(post.content),
    }))
  );

  return (
    <>
      {postsWithHtml.map((post) => {
        const [year, month] = post.date.split('-');
        return (
          <article key={post.slug} className="mb-12 pb-8 border-b border-faint-gray last:border-b-0">
            <header className="mb-4">
              <h1 className="mb-2">
                <Link
                  href={`/blog/${year}/${month}/${post.slug}/`}
                  className="text-body-color no-underline hover:text-orange"
                >
                  <b>{post.title}</b>
                </Link>
                <span className="inner-subhead">{formatDate(post.date)}</span>
              </h1>
            </header>

            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>
        );
      })}

      <div className="mt-8">
        <Link href="/blog/archive/" className="btn">
          Browse the blog archive &rarr;
        </Link>
      </div>
    </>
  );
}
