import React from 'react';
import Link from 'next/link';
import { Icon } from './IconSprite';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="container-wide footer-inner">
        <Link className="brand" href="/" aria-label="Adalat AI home">
          <img className="brand-mark" src="/assets/logo-mark.png" alt="" width={36} height={36} />
          <span className="brand-text">
            <span className="brand-name">Adalat AI</span>
            <span className="brand-hi">अदालत</span>
          </span>
        </Link>

        <nav className="footer-nav" aria-label="Footer">
          <Link href="/#audience">About</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Contact</Link>
        </nav>

        <p className="disclaimer">
          <Icon name="i-alert" size="xs" />
          <span>This is a training simulator and not legal advice.</span>
        </p>
      </div>
    </footer>
  );
}
