'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from './IconSprite';

export function SiteHeader({ activeRoute = 'home' }: { activeRoute?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container-wide header-inner">
        <Link className="brand" href="/" aria-label="Adalat AI home">
          <img className="brand-mark" src="/assets/logo-mark.png" alt="" width={44} height={44} />
          <span className="brand-text">
            <span className="brand-name">Adalat AI</span>
            <span className="brand-hi">अदालत</span>
          </span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} id="main-nav" aria-label="Main">
          <Link href="/" aria-current={activeRoute === 'home' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/#features" onClick={() => setMenuOpen(false)}>
            Features
          </Link>
          <Link href="/#how" onClick={() => setMenuOpen(false)}>
            How it works
          </Link>
          <Link href="/cases" aria-current={activeRoute === 'cases' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
            Cause List
          </Link>
          <Link href="/#audience" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </nav>

        <div className="header-actions">
          <Link className="btn btn-outline btn-sm" href="/login">
            Log in
          </Link>
          <Link className="btn btn-primary btn-sm" href="/signup">
            <span>Try Adalat AI</span>
            <Icon name="i-arrow-right" size="xs" />
          </Link>
          <button
            className="nav-toggle"
            id="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'i-close' : 'i-menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
