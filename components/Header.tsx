'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const MAIN_NAV = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/research', label: 'Research', key: 'research' },
  { href: '/members', label: 'Members', key: 'members' },
  { href: '/facilities', label: 'Facilities', key: 'facilities' },
  { href: '/publications', label: 'Publications', key: 'publications' },
  { href: '/patents', label: 'Patents', key: 'patents' },
];

const MORE_NAV = [
  { href: '/news', label: 'News', key: 'news' },
  { href: '/gallery', label: 'Gallery', key: 'gallery' },
  { href: '/research-data', label: 'Research Data', key: 'research-data' },
  { href: '/websites', label: 'Websites', key: 'websites' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const closeMenu = () => setOpen(false);
  const moreActive = MORE_NAV.some((item) => isActive(item.href));

  return (
    <header className={`topbar ${open ? 'open' : ''}`}>
      <div className="wrap nav">
        <Link className="brand" href="/" onClick={closeMenu}>
          <span className="brand-mark"></span>
          <span className="brand-text">
            BK Lab
            <small>Baek &amp; Kim Research Group</small>
          </span>
        </Link>

        <ul className="nav-links">
          {MAIN_NAV.map((item) => (
            <li key={item.key}>
              <Link href={item.href} className={isActive(item.href) ? 'active' : ''} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="more-nav">
            <button className={moreActive ? 'active' : ''} type="button" aria-haspopup="true">
              More
            </button>
            <div className="more-menu">
              {MORE_NAV.map((item) => (
                <Link key={item.key} href={item.href} className={isActive(item.href) ? 'active' : ''} onClick={closeMenu}>
                  {item.label}
                </Link>
              ))}
            </div>
          </li>
        </ul>

        <Link href="/contact" className="nav-cta" onClick={closeMenu}>
          Contact
        </Link>

        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
