import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCategories, getPostsByCategory, formatDateLong } from '@/lib/posts';

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const formattedCategory = category.replace(/-/g, ' ');

  return {
    title: `Posts in "${formattedCategory}"`,
  };
}

export default async function CategoryArchivePage({ params }: Props) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const formattedCategory = category.replace(/-/g, ' ');

  return (
    <>
      <h1>Posts in &ldquo;{formattedCategory}&rdquo;</h1>

      <ul className="link-list">
        {posts.map((post) => {
          const [year, month] = post.date.split('-');
          return (
            <li key={`${post.date}-${post.slug}`}>
              <Link href={`/blog/${year}/${month}/${post.slug}/`}>
                <h3>
                  <b>{post.title}</b>
                  <span className="inner-subhead">{formatDateLong(post.date)}</span>
                </h3>
              </Link>
            </li>
          );
        })}
      </ul>

      {posts.length === 0 && (
        <p className="text-light-gray">No posts found in this category.</p>
      )}

      <div className="mt-8">
        <Link href="/blog/archive/" className="btn">
          View all posts &rarr;
        </Link>
      </div>
    </>
  );
}
