'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { Icon } from '@/components/IconSprite';

interface CaseItem {
  id: string;
  title: string;
  parties: string;
  court: 'criminal' | 'civil' | 'district';
  courtLabel: string;
  category: 'cognizable' | 'bail' | 'property' | 'evidence';
  categoryLabel: string;
  regime: 'new' | 'old';
  regimeLabel: string;
  duration: string;
  difficulty: number;
  bestScore: string;
  searchTags: string;
}

const CASES_DATA: CaseItem[] = [
  {
    id: '1',
    title: 'State vs. Ramesh Kumar',
    parties: 'Murder — weapon seized from the accused, one eyewitness',
    court: 'criminal',
    courtLabel: 'District Criminal',
    category: 'cognizable',
    categoryLabel: 'Cognizable',
    regime: 'new',
    regimeLabel: 'BNS 2023',
    duration: '~35 min',
    difficulty: 4,
    bestScore: '8.7',
    searchTags: 'state vs. ramesh kumar murder weapon section 302 ipc bns 103',
  },
  {
    id: '2',
    title: 'Sunita Devi vs. State',
    parties: 'Cheating and forgery — promise of a job, forged documents',
    court: 'criminal',
    courtLabel: 'District Criminal',
    category: 'bail',
    categoryLabel: 'Bailable',
    regime: 'old',
    regimeLabel: 'IPC 1860',
    duration: '~25 min',
    difficulty: 3,
    bestScore: '7.9',
    searchTags: 'sunita devi vs. state cheating fraud section 420 ipc bns',
  },
  {
    id: '3',
    title: 'Meera Traders v. State',
    parties: 'Breach of contract damages — supply chain non-delivery',
    court: 'civil',
    courtLabel: 'City Civil',
    category: 'property',
    categoryLabel: 'Property',
    regime: 'new',
    regimeLabel: 'Contract Act',
    duration: '~40 min',
    difficulty: 4,
    bestScore: '8.2',
    searchTags: 'meera traders v. state breach of contract damages section 73 contract act',
  },
  {
    id: '4',
    title: 'Anand Kumar v. Union of India',
    parties: 'Service termination and natural justice violation',
    court: 'district',
    courtLabel: 'District Civil',
    category: 'evidence',
    categoryLabel: 'Evidence',
    regime: 'old',
    regimeLabel: 'Service Law',
    duration: '~20 min',
    difficulty: 2,
    bestScore: '8.5',
    searchTags: 'anand kumar v. union of india service termination natural justice',
  },
  {
    id: '5',
    title: 'State v. Vikas Sharma',
    parties: 'Rash and negligent driving causing grievous hurt',
    court: 'criminal',
    courtLabel: 'District Criminal',
    category: 'bail',
    categoryLabel: 'Bailable',
    regime: 'new',
    regimeLabel: 'BNS 2023',
    duration: '~20 min',
    difficulty: 2,
    bestScore: '9.1',
    searchTags: 'state v. vikas sharma rash driving section 279 338 ipc bns',
  },
  {
    id: '6',
    title: 'Pooja Rani v. Alok Verma',
    parties: 'Maintenance and custody dispute under Hindu Marriage Act',
    court: 'civil',
    courtLabel: 'Family Court',
    category: 'evidence',
    categoryLabel: 'Family',
    regime: 'new',
    regimeLabel: 'Family Law',
    duration: '~30 min',
    difficulty: 3,
    bestScore: '7.5',
    searchTags: 'pooja rani v. alok verma maintenance custody hindu marriage act',
  },
  {
    id: '7',
    title: 'Kishan Lal v. State',
    parties: 'Possession of contraband — search and seizure compliance',
    court: 'criminal',
    courtLabel: 'District Criminal',
    category: 'cognizable',
    categoryLabel: 'Special Act',
    regime: 'new',
    regimeLabel: 'NDPS Act',
    duration: '~45 min',
    difficulty: 5,
    bestScore: '6.8',
    searchTags: 'kishan lal v. state contraband ndps search seizure section 50',
  },
  {
    id: '8',
    title: 'Apex Infra v. Metro Rail Corp',
    parties: 'Arbitration award enforcement and interim relief',
    court: 'civil',
    courtLabel: 'Commercial Div',
    category: 'property',
    categoryLabel: 'Commercial',
    regime: 'old',
    regimeLabel: 'Arbitration',
    duration: '~40 min',
    difficulty: 4,
    bestScore: '8.0',
    searchTags: 'apex infra v. metro rail arbitration award section 9 section 34',
  },
  {
    id: '9',
    title: 'State v. Imran Khan',
    parties: 'Armed robbery and common intention at jewellery shop',
    court: 'criminal',
    courtLabel: 'District Criminal',
    category: 'cognizable',
    categoryLabel: 'Cognizable',
    regime: 'new',
    regimeLabel: 'BNS 2023',
    duration: '~35 min',
    difficulty: 4,
    bestScore: '7.4',
    searchTags: 'state v. imran khan armed robbery section 392 34 ipc bns',
  },
];

export function CasesPageContent() {
  const [search, setSearch] = useState('');
  const [court, setCourt] = useState('');
  const [category, setCategory] = useState('');
  const [regime, setRegime] = useState('');

  const filteredCases = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CASES_DATA.filter((c) => {
      const okQuery = !q || c.title.toLowerCase().includes(q) || c.parties.toLowerCase().includes(q) || c.searchTags.includes(q);
      const okCourt = !court || c.court === court;
      const okCategory = !category || c.category === category;
      const okRegime = !regime || c.regime === regime;
      return okQuery && okCourt && okCategory && okRegime;
    });
  }, [search, court, category, regime]);

  return (
    <AppShell
      activeNav="cases"
      pageTitle="Cause List"
      topActions={
        <Link className="btn btn-primary btn-sm" href="/cases/new">
          <Icon name="i-plus" size="xs" />
          <span>New Case Workspace</span>
        </Link>
      }
    >
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search">
          <Icon name="i-search" size="sm" />
          <input
            type="search"
            id="case-search"
            placeholder="Search parties, sections or facts"
            aria-label="Search cases"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="select"
          data-filter="court"
          aria-label="Filter by court"
          value={court}
          onChange={(e) => setCourt(e.target.value)}
        >
          <option value="">All courts</option>
          <option value="criminal">District Criminal</option>
          <option value="civil">City Civil</option>
          <option value="district">District Civil</option>
        </select>

        <select
          className="select"
          data-filter="category"
          aria-label="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          <option value="cognizable">Cognizable</option>
          <option value="bail">Bailable</option>
          <option value="evidence">Evidence</option>
          <option value="property">Property</option>
        </select>

        <select
          className="select"
          data-filter="regime"
          aria-label="Filter by legal regime"
          value={regime}
          onChange={(e) => setRegime(e.target.value)}
        >
          <option value="">Any regime</option>
          <option value="new">BNS 2023 and after</option>
          <option value="old">IPC and before</option>
        </select>

        <span className="link" id="case-count">
          {filteredCases.length} {filteredCases.length === 1 ? 'case' : 'cases'}
        </span>
      </div>

      {/* Case Grid */}
      <div className="case-grid">
        {filteredCases.map((c) => (
          <article
            key={c.id}
            className="card case-card"
            data-case={c.searchTags}
            data-meta={`court=${c.court} category=${c.category} regime=${c.regime}`}
          >
            <div className="case-top">
              <span className="case-court">{c.courtLabel}</span>
              <span className="tag tag-neutral" style={{ marginLeft: 'auto' }}>
                {c.categoryLabel}
              </span>
            </div>
            <h3>{c.title}</h3>
            <p className="case-parties">{c.parties}</p>
            <div className="case-meta">
              <span className="tag tag-neutral">
                <Icon name="i-calendar" size="xs" />
                {c.regimeLabel}
              </span>
              <span className="tag tag-neutral">
                <Icon name="i-clock" size="xs" />
                {c.duration}
              </span>
              <span className="diff" title={`Difficulty ${c.difficulty} of 5`}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <i key={level} className={level <= c.difficulty ? 'on' : ''} />
                ))}
              </span>
            </div>
            <div className="case-foot">
              <span className="link">Your best: {c.bestScore}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link className="btn btn-outline btn-sm" href={`/cases/${c.id}`}>
                  Prepare
                </Link>
                <Link className="btn btn-primary btn-sm" href={`/trials/${c.id}/setup`}>
                  Practise
                  <Icon name="i-arrow-right" size="xs" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Zero State */}
      <div
        className="card"
        id="case-empty"
        hidden={filteredCases.length > 0}
        style={{ textAlign: 'center', padding: '48px 24px', marginTop: '24px' }}
      >
        <span className="ic-slot ic-slot--48" style={{ margin: '0 auto 12px', background: 'var(--peach)', color: 'var(--maroon)' }}>
          <Icon name="i-alert" size="lg" />
        </span>
        <h3 style={{ fontSize: '18px', color: 'var(--ink)' }}>No cases matching your criteria</h3>
        <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>
          Try clearing your search query or selecting a different jurisdiction filter.
        </p>
        <button
          className="btn btn-outline btn-sm"
          type="button"
          style={{ marginTop: '14px' }}
          onClick={() => {
            setSearch('');
            setCourt('');
            setCategory('');
            setRegime('');
          }}
        >
          Reset all filters
        </button>
      </div>
    </AppShell>
  );
}

export default function CasesPage() {
  return <CasesPageContent />;
}
