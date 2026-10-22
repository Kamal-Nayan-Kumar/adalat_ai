'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { Icon } from '@/components/IconSprite';

export default function CaseWorkspacePage() {
  const params = useParams();
  const caseId = (params?.caseId as string) || '1';
  const [activeTab, setActiveTab] = useState<'theory' | 'research' | 'evidence' | 'witnesses'>('theory');

  return (
    <AppShell
      activeNav="cases"
      pageTitle={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>State vs. Ramesh Kumar</span>
          <span className="tag tag-neutral">BNS 2023</span>
        </div>
      }
      topActions={
        <Link className="btn btn-primary btn-sm" href={`/trials/${caseId}/setup`}>
          <Icon name="i-lock" size="xs" />
          <span>Freeze Snapshot &amp; Enter Trial</span>
        </Link>
      }
    >
      {/* Navigation Tabs */}
      <nav
        style={{
          display: 'flex',
          gap: '4px',
          borderBottom: '1px solid var(--line)',
          marginBottom: '24px',
          background: '#fff',
          borderRadius: 'var(--r-sm) var(--r-sm) 0 0',
          padding: '4px 4px 0',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('theory')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 18px',
            border: 0,
            borderBottom: activeTab === 'theory' ? '2.5px solid var(--maroon)' : '2.5px solid transparent',
            color: activeTab === 'theory' ? 'var(--maroon)' : 'var(--muted)',
            fontWeight: 600,
            fontSize: '14px',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <Icon name="i-doc" size="xs" />
          Case Theory &amp; Facts
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('research')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 18px',
            border: 0,
            borderBottom: activeTab === 'research' ? '2.5px solid var(--maroon)' : '2.5px solid transparent',
            color: activeTab === 'research' ? 'var(--maroon)' : 'var(--muted)',
            fontWeight: 600,
            fontSize: '14px',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <Icon name="i-book" size="xs" />
          Legal Research &amp; Authorities
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('evidence')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 18px',
            border: 0,
            borderBottom: activeTab === 'evidence' ? '2.5px solid var(--maroon)' : '2.5px solid transparent',
            color: activeTab === 'evidence' ? 'var(--maroon)' : 'var(--muted)',
            fontWeight: 600,
            fontSize: '14px',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <Icon name="i-doc-lines" size="xs" />
          Evidence Inventory
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('witnesses')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 18px',
            border: 0,
            borderBottom: activeTab === 'witnesses' ? '2.5px solid var(--maroon)' : '2.5px solid transparent',
            color: activeTab === 'witnesses' ? 'var(--maroon)' : 'var(--muted)',
            fontWeight: 600,
            fontSize: '14px',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <Icon name="i-witness" size="xs" />
          Witness Profiles &amp; Plans
        </button>
      </nav>

      {/* Pane 1: Theory & Facts */}
      {activeTab === 'theory' && (
        <div className="grid-2">
          <article className="card">
            <div className="card-head">
              <h2>Case Brief &amp; Charges</h2>
            </div>
            <div className="card-body">
              <p style={{ fontSize: '14px', color: 'var(--body)', lineHeight: 1.55 }}>
                The State alleges the accused inflicted fatal knife injuries on the complainant at a roadside bus shelter near Civil Lines at approximately 9:40 pm on 14 March 2024. Charge framed under Section 302 IPC / Section 103 BNS.
              </p>
              <div style={{ marginTop: '18px' }}>
                <label style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--ink)' }}>Your Defense Strategy Theory</label>
                <textarea
                  rows={4}
                  style={{
                    width: '100%',
                    marginTop: '6px',
                    padding: '12px',
                    border: '1.5px solid var(--line)',
                    borderRadius: 'var(--r-sm)',
                    fontSize: '14px',
                  }}
                  defaultValue="Impeach PW1 on visibility and lack of immediate identification. Highlight contradiction between Ex.1 (wound dimension) and seized knife memo (Ex.2)."
                />
              </div>
            </div>
          </article>

          <article className="card">
            <div className="card-head">
              <h2>Admitted vs. Disputed Facts</h2>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', marginBottom: '10px', background: '#fff' }}>
                <span style={{ padding: '2px 8px', borderRadius: 'var(--r-xs)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', background: '#DEF7EC', color: '#03543F' }}>
                  Admitted
                </span>
                <div>
                  <b style={{ fontSize: '13.5px', color: 'var(--ink)' }}>Time and Place of Death</b>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px', margin: 0 }}>Deceased passed away at Civil Lines Hospital at 11:20 pm on 14 March 2024.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', marginBottom: '10px', background: '#fff' }}>
                <span style={{ padding: '2px 8px', borderRadius: 'var(--r-xs)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', background: '#FDE8E8', color: '#9B1C1C' }}>
                  Disputed
                </span>
                <div>
                  <b style={{ fontSize: '13.5px', color: 'var(--ink)' }}>Presence of Accused at Scene</b>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px', margin: 0 }}>Sole eyewitness statement (PW1) contradicts site map lighting conditions.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', background: '#fff' }}>
                <span style={{ padding: '2px 8px', borderRadius: 'var(--r-xs)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', background: '#FDE8E8', color: '#9B1C1C' }}>
                  Disputed
                </span>
                <div>
                  <b style={{ fontSize: '13.5px', color: 'var(--ink)' }}>Seizure of Weapon</b>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px', margin: 0 }}>Seizure memo lacks independent panch witness signatures.</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Pane 2: Legal Research */}
      {activeTab === 'research' && (
        <article className="card">
          <div className="card-head">
            <h2>Statutes &amp; Authoritative Citations</h2>
            <button className="btn btn-outline btn-sm">
              <Icon name="i-search" size="xs" />
              Search Precedents
            </button>
          </div>
          <div className="card-body">
            <div style={{ overflowX: 'auto' }}>
              <table className="data" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Statute / Citation</th>
                    <th>Core Proposition</th>
                    <th>Verification Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Section 103 BNS (2023)</strong></td>
                    <td>Punishment for murder &mdash; burden of proof remains on the prosecution throughout.</td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#059669' }}>
                        <Icon name="i-check-circle" size="xs" /> Official Gazette Verified
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Section 137 BSA (2023)</strong></td>
                    <td>Cross-examination on prior inconsistent statements and examination-in-chief limits.</td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#059669' }}>
                        <Icon name="i-check-circle" size="xs" /> Official Gazette Verified
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Sharad Birdhichand Sarda (1984) 4 SCC 116</strong></td>
                    <td>Five golden principles (Panchsheel) governing circumstantial evidence and benefit of doubt.</td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#059669' }}>
                        <Icon name="i-check-circle" size="xs" /> Supreme Court Reporter
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
      )}

      {/* Pane 3: Evidence Inventory */}
      {activeTab === 'evidence' && (
        <article className="card">
          <div className="card-head">
            <h2>Admitted Trial Exhibits &amp; Provenance</h2>
          </div>
          <div className="card-body">
            <div style={{ overflowX: 'auto' }}>
              <table className="data" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Exhibit</th>
                    <th>Description</th>
                    <th>Source Document</th>
                    <th>Tender Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Ex.1</strong></td>
                    <td>Post-mortem report by Dr. S. Rao</td>
                    <td>Hospital Medical Dossier (p. 14)</td>
                    <td><span className="tag tag-neutral">Admitted</span></td>
                  </tr>
                  <tr>
                    <td><strong>Ex.2</strong></td>
                    <td>Seizure memo of iron knife</td>
                    <td>Police Case Diary (p. 28)</td>
                    <td><span className="tag tag-neutral" style={{ color: 'var(--maroon)' }}>Contested (PW4)</span></td>
                  </tr>
                  <tr>
                    <td><strong>Ex.3</strong></td>
                    <td>Site sketch map</td>
                    <td>Investigating Officer Report (p. 4)</td>
                    <td><span className="tag tag-neutral">Admitted</span></td>
                  </tr>
                  <tr>
                    <td><strong>Ex.4</strong></td>
                    <td>Certified FIR copy</td>
                    <td>Police Station Record (p. 1)</td>
                    <td><span className="tag tag-neutral">Admitted</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
      )}

      {/* Pane 4: Witnesses */}
      {activeTab === 'witnesses' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span className="ic-slot ic-slot--40"><Icon name="i-witness" size="sm" /></span>
              <div>
                <b style={{ fontSize: '15px', color: 'var(--ink)' }}>PW1 — Eyewitness</b>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Key Prosecution Witness</p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.45 }}>Claims to have witnessed accused near bus shelter at 9:40 pm.</p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--line)', fontSize: '12.5px', color: 'var(--maroon)' }}>
              <strong>Goal:</strong> Cross-examine on visibility and poor lighting.
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span className="ic-slot ic-slot--40"><Icon name="i-doc-check" size="sm" /></span>
              <div>
                <b style={{ fontSize: '15px', color: 'var(--ink)' }}>PW2 — Dr. S. Rao</b>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Autopsy Medical Officer</p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.45 }}>Conducted post-mortem examination; documented single fatal laceration.</p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--line)', fontSize: '12.5px', color: 'var(--maroon)' }}>
              <strong>Goal:</strong> Question whether wound matches Ex.2 blade profile.
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span className="ic-slot ic-slot--40"><Icon name="i-shield" size="sm" /></span>
              <div>
                <b style={{ fontSize: '15px', color: 'var(--ink)' }}>PW4 — Investigating Officer</b>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Arresting Officer</p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.45 }}>Effected knife recovery and drafted seizure memo Ex.2.</p>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--line)', fontSize: '12.5px', color: 'var(--maroon)' }}>
              <strong>Goal:</strong> Challenge chain of custody and absent panch witnesses.
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
