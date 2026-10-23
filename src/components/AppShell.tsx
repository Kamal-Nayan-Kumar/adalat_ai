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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`shell ${collapsed ? 'is-collapsed' : ''}`}>
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
            <span>Dashboard</span>
          </Link>
          <Link href="/cases" aria-current={activeNav === 'cases' ? 'page' : undefined}>
            <Icon name="i-doc-lines" size="sm" />
            <span>Cause List</span>
          </Link>
          <Link href="/trials/1/courtroom" aria-current={activeNav === 'courtroom' ? 'page' : undefined}>
            <Icon name="i-gavel-lite" size="sm" />
            <span>Courtroom</span>
          </Link>
          <Link href="/trials/1/report" aria-current={activeNav === 'report' ? 'page' : undefined}>
            <Icon name="i-chart-bars" size="sm" />
            <span>My Report</span>
          </Link>
          <Link href="/dashboard#skills" aria-current={activeNav === 'skills' ? 'page' : undefined}>
            <Icon name="i-radar" size="sm" />
            <span>Skill Profile</span>
          </Link>
          <Link href="/profile" aria-current={activeNav === 'settings' ? 'page' : undefined}>
            <Icon name="i-gear" size="sm" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="shell-rail-foot">
          <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', fontSize: '13px', padding: '8px 12px' }}>
            <Icon name="i-logout" size="sm" />
            <span>Log out</span>
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <div className="shell-main">
        <header className="shell-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Unified sidebar toggle for both desktop and mobile */}
            <button
              className="ic-btn"
              id="shell-toggle"
              aria-expanded={railOpen || !collapsed}
              aria-controls="shell-rail"
              aria-label="Toggle navigation sidebar"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth <= 900) {
                  setRailOpen(!railOpen);
                } else {
                  setCollapsed(!collapsed);
                }
              }}
            >
              <Icon name="i-menu" />
            </button>
            <h1>{pageTitle}</h1>
          </div>
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
