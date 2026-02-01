import Link from 'next/link';
import { getSortedPosts, formatDate } from '@/lib/posts';

const portfolioItems = [
  {
    image: '/portfolio/sbe.jpg',
    title: 'sbe.com',
    description:
      'Type: Website | Role: Developer of responsive HTML/CSS templates, JavaScript modules and WordPress back-end functionality',
  },
  {
    image: '/portfolio/novella.jpg',
    title: 'Novella Clinical',
    description:
      'Type: Website | Role: Developer of responsive WordPress theme and JavaScript interactions',
  },
  {
    image: '/portfolio/justworks.jpg',
    title: 'Justworks',
    description: 'Type: Website | Role: Rails and React developer',
  },
  {
    image: '/portfolio/integral.jpg',
    title: 'Integral',
    description:
      'Type: Website | Role: WordPress developer, and information architect',
  },
];

export default function Home() {
  const posts = getSortedPosts().slice(0, 4);

  return (
    <>
      <div className="py-8 border-y border-faint-gray my-8">
        <p className="text-lg mb-0">
          Hello! My name is Chris Johnson and I&apos;m a frontend engineer with
          a passion for building user experiences through the intersection of
          web technology and design. I&apos;ve led high-performing teams in
          delivering scalable, user-centric applications. I mentor engineers to
          think beyond code, considering the broader user experience while
          maintaining high standards for performance and accessibility. If
          you&apos;d like to work together,{' '}
          <Link href="/about/">please get in touch</Link>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1>
            <Link href="/portfolio/" className="text-body-color no-underline hover:text-orange">
              Featured work
            </Link>
          </h1>

          <div className="featured-work">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className={`slide ${index === 0 ? 'block' : 'hidden'}`}
              >
                <img src={item.image} alt={item.title} className="rounded mb-2" />
                <b className="text-lg">{item.title}</b>
                <div className="text-sm text-light-gray">{item.description}</div>
              </div>
            ))}
          </div>

          <p className="mt-4">
            <Link href="/portfolio/" className="btn btn-small">
              See more work &rarr;
            </Link>
          </p>
        </div>

        <aside>
          <h1>
            <Link href="/blog/" className="text-body-color no-underline hover:text-orange">
              Blog posts
            </Link>
          </h1>

          <ul className="link-list">
            {posts.map((post) => {
              const [year, month] = post.date.split('-');
              return (
                <li key={post.slug}>
                  <Link href={`/blog/${year}/${month}/${post.slug}/`}>
                    <h3>
                      <b>{post.title}</b>
                      <span className="inner-subhead">{formatDate(post.date)}</span>
                    </h3>
                    <p>{post.excerpt}</p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href="/blog/" className="btn btn-small">
            Read more blog posts &rarr;
          </Link>
        </aside>
      </div>
    </>
  );
}
