import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug, formatDate } from '@/lib/posts';
import { siteConfig } from '@/lib/config';

interface Props {
  params: Promise<{
    year: string;
    month: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(({ year, month, slug }) => ({
    year,
    month,
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month, slug } = await params;
  const post = await getPostBySlug(year, month, slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const ogImageUrl = `https://mugshotbot.com/m?mode=light&color=d74824&pattern=hideout&hide_watermark=true&url=${siteConfig.url}/blog/${year}/${month}/${slug}/`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [siteConfig.author],
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { year, month, slug } = await params;
  const post = await getPostBySlug(year, month, slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="mb-6">
        <h1 className="mb-2">
          <b>{post.title}</b>
          <span className="inner-subhead">{formatDate(post.date)}</span>
        </h1>
      </header>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <div className="mt-12 pt-8 border-t border-faint-gray flex flex-wrap gap-4">
        <Link href="/blog/archive/" className="btn">
          Browse the blog archive &rarr;
        </Link>
        <a
          href="https://itunes.apple.com/us/app/long-day-day-planner/id1062689795?ls=1&mt=8&at=11l5Li"
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download my app Long Day
        </a>
      </div>
    </article>
  );
}
