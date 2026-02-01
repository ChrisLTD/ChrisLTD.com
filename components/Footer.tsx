import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 mt-12 border-t border-faint-gray">
      <div className="container">
        <ul className="flex gap-6 list-none pl-0 mb-4">
          <li className="mb-0">
            <Link
              href={siteConfig.feedUrl}
              className="text-light-gray hover:text-orange no-underline flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20 5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
              </svg>
              <span className="sr-only">RSS</span>
            </Link>
          </li>
          <li className="mb-0">
            <a
              href={`https://pinboard.in/u:${siteConfig.social.pinboard}`}
              className="text-light-gray hover:text-orange no-underline flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.14 2c4.89 0 8.86 3.17 8.86 7.08 0 3.12-2.89 6.11-6.06 6.48l-.72 6.44-2.32-4.37c-.73-.15-1.42-.4-2.06-.73l-4.79 2.95 2.05-4.45C5.21 14.05 4 12.03 4 9.08 4 5.17 7.25 2 12.14 2z" />
              </svg>
              <span className="sr-only">Pinboard</span>
            </a>
          </li>
          <li className="mb-0">
            <a
              href={`https://github.com/${siteConfig.social.github}`}
              className="text-light-gray hover:text-orange no-underline flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
          </li>
        </ul>

        <div className="text-sm text-light-gray flex flex-wrap gap-4">
          <span>
            Hosted by{' '}
            <a
              href="https://pages.cloudflare.com/"
              className="hover:text-orange"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare Pages
            </a>
          </span>
          <span>&copy; {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}
