import Link from 'next/link';
import type { Metadata } from 'next';
import { getSortedPosts, formatDateLong } from '@/lib/posts';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Blog Archive',
};

export default function BlogArchivePage() {
  const posts = getSortedPosts();

  return (
    <>
      <h1>Blog Archive</h1>

      <form
        action="https://duckduckgo.com/"
        method="get"
        className="search-form max-w-md mb-8"
      >
        <input type="hidden" name="sites" value="chrisltd.com" />
        <input
          type="text"
          name="q"
          placeholder="Search the blog..."
          className="flex-1 border border-faint-gray rounded px-3 py-2 focus:outline-none focus:border-orange"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>

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

      <div className="mt-8">
        <Link href={siteConfig.feedUrl} className="btn">
          Subscribe via RSS
        </Link>
      </div>
    </>
  );
}
