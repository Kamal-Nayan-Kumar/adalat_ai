'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icon } from '@/components/IconSprite';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'student';

  const [role, setRole] = useState(initialRole);
  const [regime, setRegime] = useState('new');
  const [coachEnabled, setCoachEnabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
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
            <span className="tag tag-neutral">Guided Setup</span>
          </div>
        </div>
      </header>

      <main className="onboard-wrap" id="main" style={{ maxWidth: '760px', margin: '40px auto', padding: '0 var(--gutter)' }}>
        <div className="onboard-card" style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 'var(--r-md)', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
          <div className="onboard-step" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span className="step-num" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'var(--maroon)', color: '#fff', fontWeight: 700, fontSize: '14px' }}>
              1
            </span>
            <span className="step-title" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Personalize Experience
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.24 }}>
            Shape your courtroom simulation
          </h1>
          <p className="sub" style={{ marginTop: '8px', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Tell us your legal background and goals so Judge AI and opposing counsel adapt to your skill level.
          </p>

          <form id="onboard-form" onSubmit={handleSubmit}>
            {/* Primary Role */}
            <div className="field" style={{ marginTop: '28px' }}>
              <label style={{ fontSize: '15px' }}>Primary Role</label>
              <div className="choice-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '14px' }}>
                <label className="choice-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px', border: '1.5px solid var(--line)', borderRadius: 'var(--r-sm)', cursor: 'pointer', background: '#fff' }}>
                  <input type="radio" name="onboard_role" value="student" checked={role === 'student'} onChange={() => setRole('student')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                  <div className="card-head" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="ic-slot ic-slot--40"><Icon name="i-cap" size="sm" /></span>
                    <b>Law Student</b>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45, margin: 0 }}>Focus on moot court advocacy, witness cross-examination, and fundamental objections.</p>
                </label>

                <label className="choice-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px', border: '1.5px solid var(--line)', borderRadius: 'var(--r-sm)', cursor: 'pointer', background: '#fff' }}>
                  <input type="radio" name="onboard_role" value="aspirant" checked={role === 'aspirant'} onChange={() => setRole('aspirant')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                  <div className="card-head" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="ic-slot ic-slot--40"><Icon name="i-landmark" size="sm" /></span>
                    <b>Judiciary Aspirant</b>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45, margin: 0 }}>Prepare for civil services and judicial services exams (PCS-J, DJS) with statutory precision.</p>
                </label>

                <label className="choice-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px', border: '1.5px solid var(--line)', borderRadius: 'var(--r-sm)', cursor: 'pointer', background: '#fff' }}>
                  <input type="radio" name="onboard_role" value="advocate" checked={role === 'advocate'} onChange={() => setRole('advocate')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                  <div className="card-head" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="ic-slot ic-slot--40"><Icon name="i-shield" size="sm" /></span>
                    <b>Practicing Advocate</b>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45, margin: 0 }}>Rehearse case theories, stress-test trial strategies, and anticipate adverse witnesses.</p>
                </label>

                <label className="choice-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px', border: '1.5px solid var(--line)', borderRadius: 'var(--r-sm)', cursor: 'pointer', background: '#fff' }}>
                  <input type="radio" name="onboard_role" value="college" checked={role === 'college'} onChange={() => setRole('college')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                  <div className="card-head" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="ic-slot ic-slot--40"><Icon name="i-people" size="sm" /></span>
                    <b>Faculty / Institution</b>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45, margin: 0 }}>Run simulated court drills and benchmark student performance against objective rubrics.</p>
                </label>
              </div>
            </div>

            {/* Legal Framework */}
            <div className="field" style={{ marginTop: '32px' }}>
              <label style={{ fontSize: '15px' }}>Preferred Legal Framework</label>
              <div className="choice-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '14px' }}>
                <label className="choice-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px', border: '1.5px solid var(--line)', borderRadius: 'var(--r-sm)', cursor: 'pointer', background: '#fff' }}>
                  <input type="radio" name="regime_pref" value="new" checked={regime === 'new'} onChange={() => setRegime('new')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                  <div className="card-head" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="ic-slot ic-slot--40"><Icon name="i-calendar" size="sm" /></span>
                    <b>BNS / BNSS / BSA (2023)</b>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45, margin: 0 }}>Modern statutory regime applicable for all offences on or after 1 July 2024.</p>
                </label>

                <label className="choice-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px', border: '1.5px solid var(--line)', borderRadius: 'var(--r-sm)', cursor: 'pointer', background: '#fff' }}>
                  <input type="radio" name="regime_pref" value="both" checked={regime === 'both'} onChange={() => setRegime('both')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                  <div className="card-head" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="ic-slot ic-slot--40"><Icon name="i-arrow-swap" size="sm" /></span>
                    <b>Both Regimes by Offence Date</b>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45, margin: 0 }}>Automatically select IPC/CrPC or BNS based on the specific case file date.</p>
                </label>
              </div>
            </div>

            {/* Nyaya Saathi Coach */}
            <div className="coach-banner" style={{ display: 'flex', gap: '16px', padding: '18px', background: 'var(--rose)', border: '1px solid rgba(110,18,23,.12)', borderRadius: 'var(--r-sm)', marginTop: '24px', alignItems: 'flex-start' }}>
              <span className="ic-slot ic-slot--48" style={{ background: '#fff', color: 'var(--maroon)' }}>
                <Icon name="i-trophy" size="lg" />
              </span>
              <div style={{ flex: 1 }}>
                <b style={{ color: 'var(--maroon)', fontSize: '14.5px', display: 'block' }}>Nyaya Saathi — Opt-in Real-time AI Coach</b>
                <p style={{ fontSize: '13.5px', color: 'var(--ink)', marginTop: '4px', lineHeight: 1.45 }}>
                  An in-hearing assistant that suggests valid statutory objections, procedural cues, and exhibit handling without speaking for you.
                </p>
                <label className="check-row" style={{ marginTop: '10px' }}>
                  <input type="checkbox" name="coach_enabled" checked={coachEnabled} onChange={(e) => setCoachEnabled(e.target.checked)} />
                  <span><strong>Enable Nyaya Saathi hints</strong> during simulated trial proceedings</span>
                </label>
              </div>
            </div>

            <div className="onboard-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
              <Link className="link" href="/dashboard">
                Skip for now
              </Link>
              <button className="btn btn-primary btn-lg" type="submit">
                <span>Complete setup &amp; launch</span>
                <Icon name="i-arrow-right" size="sm" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading setup...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
