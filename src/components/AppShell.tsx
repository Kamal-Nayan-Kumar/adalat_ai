'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from './IconSprite';

interface AppShellProps {
  children: React.ReactNode;
  activeNav?: 'dashboard' | 'cases' | 'courtroom' | 'report' | 'skills' | 'settings';
  pageTitle: React.ReactNode;
  topActions?: React.ReactNode;
}

export function AppShell({ children, activeNav = 'dashboard', pageTitle, topActions }: AppShellProps) {
  const [railOpen, setRailOpen] = useState(false);

  return (
    <div className="shell">
      {/* Sidebar Rail */}
      <aside className={`shell-rail ${railOpen ? 'is-open' : ''}`} id="shell-rail">
        <Link className="brand" href="/" aria-label="Adalat AI home">
          <img className="brand-mark" src="/assets/logo-mark.png" alt="" width={36} height={36} />
          <span className="brand-text">
            <span className="brand-name">Adalat AI</span>
            <span className="brand-hi">अदालत</span>
          </span>
        </Link>

        <nav className="shell-nav" aria-label="App">
          <Link href="/dashboard" aria-current={activeNav === 'dashboard' ? 'page' : undefined}>
            <Icon name="i-home" size="sm" />
            Dashboard
          </Link>
          <Link href="/cases" aria-current={activeNav === 'cases' ? 'page' : undefined}>
            <Icon name="i-doc-lines" size="sm" />
            Cause List
          </Link>
          <Link href="/trials/1/courtroom" aria-current={activeNav === 'courtroom' ? 'page' : undefined}>
            <Icon name="i-gavel-lite" size="sm" />
            Courtroom
          </Link>
          <Link href="/trials/1/report" aria-current={activeNav === 'report' ? 'page' : undefined}>
            <Icon name="i-chart-bars" size="sm" />
            My Report
          </Link>
          <Link href="/dashboard#skills" aria-current={activeNav === 'skills' ? 'page' : undefined}>
            <Icon name="i-radar" size="sm" />
            Skill Profile
          </Link>
          <Link href="/profile" aria-current={activeNav === 'settings' ? 'page' : undefined}>
            <Icon name="i-gear" size="sm" />
            Settings
          </Link>
        </nav>

        <div className="shell-rail-foot">
          <Link className="btn btn-outline btn-sm" href="/">
            <Icon name="i-arrow-left" size="xs" />
            Back to site
          </Link>
          <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', fontSize: '13px' }}>
            <Icon name="i-logout" size="sm" />
            Log out
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <div className="shell-main">
        <header className="shell-topbar">
          <button
            className="ic-btn"
            id="shell-toggle"
            aria-expanded={railOpen}
            aria-controls="shell-rail"
            aria-label="Open navigation"
            onClick={() => setRailOpen(!railOpen)}
          >
            <Icon name="i-menu" />
          </button>
          <h1>{pageTitle}</h1>
          <div className="shell-actions">
            {topActions}
            <Link className="avatar" href="/profile" title="Aarav Sharma — Profile & Settings">
              AS
            </Link>
          </div>
        </header>

        <div className="shell-body">{children}</div>
      </div>
    </div>
  );
}
