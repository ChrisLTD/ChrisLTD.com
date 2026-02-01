'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/config';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/portfolio/', label: 'Portfolio' },
    { href: '/projects/', label: 'Projects' },
    { href: '/blog/', label: 'Blog' },
    { href: '/about/', label: 'About' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="py-8">
      <div className="container">
        <Link href="/" className="inline-block no-underline mb-2">
          <img
            src="/img/logo@2x.png"
            width={330}
            alt="Chris Johnson"
            className="max-w-full"
          />
        </Link>
        <div className="text-light-gray text-sm mb-4">{siteConfig.tagline}</div>

        <nav>
          <ul className="flex flex-wrap gap-1 list-none pl-0">
            {navItems.map((item) => (
              <li key={item.href} className="mb-0">
                <Link
                  href={item.href}
                  className={`inline-block px-3 py-2 rounded no-underline transition-colors ${
                    isActive(item.href)
                      ? 'bg-orange text-white'
                      : 'text-body-color hover:bg-gray/10'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
