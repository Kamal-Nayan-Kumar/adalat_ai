'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Icon } from '@/components/IconSprite';

export default function TrialSetupPage() {
  const router = useRouter();
  const params = useParams();
  const trialId = (params?.trialId as string) || '1';

  const [side, setSide] = useState<'defence' | 'prosecution'>('defence');
  const [duration, setDuration] = useState('20');
  const [judgeStyle, setJudgeStyle] = useState('strict');
  const [coach, setCoach] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/trials/${trialId}/courtroom?side=${side}&duration=${duration}&judge=${judgeStyle}&coach=${coach}`);
  };

  return (
    <>
      <header className="site-header">
        <div className="container-wide header-inner">
          <Link className="brand" href="/" aria-label="Adalat AI home">
            <img className="brand-mark" src="/assets/logo-mark.png" alt="" width={40} height={40} />
            <span className="brand-text">
              <span className="brand-name">Adalat AI</span>
              <span className="brand-hi">अदालत</span>
            </span>
          </Link>
          <div className="header-actions">
            <Link className="btn btn-outline btn-sm" href={`/cases/${trialId}`}>
              Back to Workspace
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '820px', margin: '32px auto', padding: '0 var(--gutter)' }} id="main">
        <div className="card" style={{ padding: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--line)', marginBottom: '28px' }}>
            <div>
              <span className="tag tag-neutral" style={{ marginBottom: '6px' }}>Trial Setup</span>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: '26px', color: 'var(--ink)' }}>State vs. Ramesh Kumar</h1>
            </div>
            <span className="tag tag-neutral" style={{ color: 'var(--maroon)' }}>Snapshot Frozen #v1</span>
          </div>

          <form onSubmit={handleSubmit}>
            {/* 1. Choose Side */}
            <div className="field">
              <label style={{ fontSize: '14.5px' }}>Select Your Side</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '10px' }}>
                <label
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '18px',
                    border: `1.5px solid ${side === 'defence' ? 'var(--maroon)' : 'var(--line)'}`,
                    borderRadius: 'var(--r-sm)',
                    background: side === 'defence' ? 'rgba(110, 18, 23, 0.035)' : '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <input type="radio" name="side" value="defence" checked={side === 'defence'} onChange={() => setSide('defence')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                  <span className="ic-slot ic-slot--48"><Icon name="i-shield" size="lg" /></span>
                  <div>
                    <b style={{ fontSize: '15px', color: 'var(--ink)', display: 'block' }}>Counsel for Defence</b>
                    <em style={{ fontSize: '12.5px', color: 'var(--muted)', fontStyle: 'normal', display: 'block', marginTop: '2px' }}>
                      Cross-examine PW1, tender Ex.2 contradictions, and raise objections.
                    </em>
                  </div>
                </label>

                <label
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '18px',
                    border: `1.5px solid ${side === 'prosecution' ? 'var(--maroon)' : 'var(--line)'}`,
                    borderRadius: 'var(--r-sm)',
                    background: side === 'prosecution' ? 'rgba(110, 18, 23, 0.035)' : '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <input type="radio" name="side" value="prosecution" checked={side === 'prosecution'} onChange={() => setSide('prosecution')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                  <span className="ic-slot ic-slot--48"><Icon name="i-scales" size="lg" /></span>
                  <div>
                    <b style={{ fontSize: '15px', color: 'var(--ink)', display: 'block' }}>Public Prosecutor</b>
                    <em style={{ fontSize: '12.5px', color: 'var(--muted)', fontStyle: 'normal', display: 'block', marginTop: '2px' }}>
                      Establish chain of evidence, examine eyewitness, and argue charges.
                    </em>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. Duration */}
            <div className="field" style={{ marginTop: '28px' }}>
              <label style={{ fontSize: '14.5px' }}>Hearing Duration</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '10px' }}>
                {[
                  { val: '10', label: '10 Minutes', sub: 'Rapid Cross-exam Drill' },
                  { val: '20', label: '20 Minutes', sub: 'Standard Court Hearing' },
                  { val: '30', label: '30 Minutes', sub: 'Full Multi-Witness Session' },
                ].map((dur) => (
                  <label
                    key={dur.val}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px 10px',
                      border: `1.5px solid ${duration === dur.val ? 'var(--maroon)' : 'var(--line)'}`,
                      borderRadius: 'var(--r-sm)',
                      background: duration === dur.val ? 'rgba(110, 18, 23, 0.04)' : '#fff',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <input type="radio" name="duration" value={dur.val} checked={duration === dur.val} onChange={() => setDuration(dur.val)} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                    <b style={{ fontSize: '16px', color: 'var(--ink)' }}>{dur.label}</b>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{dur.sub}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Judge Style */}
            <div className="field" style={{ marginTop: '28px' }}>
              <label htmlFor="judge-style" style={{ fontSize: '14.5px' }}>Presiding Judge Temperament</label>
              <select id="judge-style" className="select" style={{ width: '100%' }} value={judgeStyle} onChange={(e) => setJudgeStyle(e.target.value)}>
                <option value="strict">Strict &amp; Procedural (Demands precise statutory citations &amp; timely objections)</option>
                <option value="patient">Patient &amp; Explanatory (Provides procedural hints when counsel hesitates)</option>
                <option value="speedy">Speedy Trial Bench (Active intervention and strict time enforcement)</option>
              </select>
            </div>

            {/* 4. Coach */}
            <div className="field" style={{ marginTop: '24px', padding: '16px', background: 'rgba(110, 18, 23, 0.04)', borderRadius: 'var(--r-sm)' }}>
              <label className="check-row" style={{ margin: 0 }}>
                <input type="checkbox" name="coach" checked={coach} onChange={(e) => setCoach(e.target.checked)} />
                <span><strong>Enable Nyaya Saathi Assistant</strong> in the courtroom rail (real-time procedural suggestions)</span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
              <Link className="link" href={`/cases/${trialId}`}>
                Review Case Facts
              </Link>
              <button className="btn btn-primary btn-lg" type="submit">
                <span>Enter Live Courtroom</span>
                <Icon name="i-arrow-right" size="sm" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
