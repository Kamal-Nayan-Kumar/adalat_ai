'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Icon } from '@/components/IconSprite';

export default function TrialReportPage() {
  const params = useParams();
  const trialId = (params?.trialId as string) || '1';

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
            <Link className="btn btn-outline btn-sm" href={`/trials/${trialId}/courtroom`}>
              Replay Hearing
            </Link>
            <Link className="btn btn-primary btn-sm" href="/dashboard">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '960px', margin: '28px auto', padding: '0 var(--gutter)' }} id="main">
        {/* Header Summary */}
        <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="tag tag-neutral">Hearing Session #1 Evaluation</span>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: 'var(--ink)', marginTop: '8px' }}>
                State vs. Ramesh Kumar
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>
                District Criminal Court &bull; Presided by Hon&rsquo;ble Judge AI &bull; BNS 2023
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="tag tag-neutral" style={{ color: '#059669' }}>
                Acquittal &bull; Contradiction Landed
              </span>
              <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '4px' }}>Next Hearing: 28 October 2026</p>
            </div>
          </div>

          {/* Score Callout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px',
              background: 'linear-gradient(135deg, var(--maroon-3), var(--maroon))',
              color: '#fff',
              borderRadius: 'var(--r-md)',
              marginTop: '20px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <span style={{ padding: '4px 12px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: 'var(--r-xs)', fontSize: '13px', fontWeight: 600 }}>
                Performance Verdict
              </span>
              <h2 style={{ fontSize: '22px', marginTop: '8px', color: '#fff' }}>Strong Cross-Examination with Timely Objections</h2>
              <p style={{ fontSize: '14px', color: '#EBD3C7', marginTop: '4px' }}>You impeached PW1 effectively using the lighting facts in Ex.3.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '48px', fontWeight: 800, color: '#FEE4D2', lineHeight: 1 }}>
                7.8<span style={{ fontSize: '24px', color: '#EBD3C7' }}>/10</span>
              </div>
              <span style={{ fontSize: '12.5px', color: '#EBD3C7' }}>Advocacy Composite</span>
            </div>
          </div>
        </div>

        {/* Skill Breakdown & Timeline */}
        <div className="grid-2" style={{ marginBottom: '24px' }}>
          <article className="card">
            <div className="card-head">
              <h2>Advocacy Rubric Scores</h2>
            </div>
            <div className="card-body">
              <div className="bars">
                <div className="bar-row" data-skill="8.4">
                  <span>Opening statement</span><em>8.4/10</em>
                  <i className="bar-track"><b className="bar-fill is-gold" style={{ width: '84%' }} /></i>
                </div>
                <div className="bar-row" data-skill="7.6">
                  <span>Examination-in-chief</span><em>7.6/10</em>
                  <i className="bar-track"><b className="bar-fill" style={{ width: '76%' }} /></i>
                </div>
                <div className="bar-row" data-skill="6.9">
                  <span>Cross-examination</span><em>6.9/10</em>
                  <i className="bar-track"><b className="bar-fill" style={{ width: '69%' }} /></i>
                </div>
                <div className="bar-row" data-skill="8.1">
                  <span>Objections &amp; timing</span><em>8.1/10</em>
                  <i className="bar-track"><b className="bar-fill is-green" style={{ width: '81%' }} /></i>
                </div>
                <div className="bar-row" data-skill="7.2">
                  <span>Use of exhibits</span><em>7.2/10</em>
                  <i className="bar-track"><b className="bar-fill" style={{ width: '72%' }} /></i>
                </div>
                <div className="bar-row" data-skill="6.4">
                  <span>Legal citations</span><em>6.4/10</em>
                  <i className="bar-track"><b className="bar-fill" style={{ width: '64%' }} /></i>
                </div>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="card-head">
              <h2>Procedural Timeline</h2>
            </div>
            <div className="card-body">
              <ul className="court-list">
                <li><Icon name="i-check" size="xs" />10:32 &mdash; Matter called; State opened prosecution case</li>
                <li><Icon name="i-check" size="xs" />10:33 &mdash; PW1 examined by Public Prosecutor</li>
                <li><Icon name="i-check" size="xs" />10:34 &mdash; Defence raised objection to leading questions (sustained)</li>
                <li><Icon name="i-check" size="xs" />10:35 &mdash; Cross-examination commenced; Ex.3 site map tendered</li>
                <li><Icon name="i-trophy" size="xs" />10:36 &mdash; Adjournment disposition recorded; hearing concluded</li>
              </ul>
            </div>
          </article>
        </div>

        {/* Examiner Feedback */}
        <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', marginBottom: '16px' }}>
            Examiner Remarks &amp; Actionable Feedback
          </h2>

          <div style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
            <div style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '50%', background: '#DEF7EC', color: '#03543F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="i-check" size="xs" />
            </div>
            <div>
              <b style={{ fontSize: '14.5px', color: 'var(--ink)' }}>Precise Objection Timing (Section 137 BSA)</b>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>
                You intervened promptly when the Prosecutor posed leading questions during examination-in-chief, protecting the record effectively.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
            <div style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '50%', background: '#FEF08A', color: '#854D0E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="i-alert" size="xs" />
            </div>
            <div>
              <b style={{ fontSize: '14.5px', color: 'var(--ink)' }}>Follow Through on Witness Pauses</b>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>
                When PW1 hesitated regarding ambient bus shelter lighting, you moved to the next question rather than pinning down the exact distance of the street lamp.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', padding: '14px 0' }}>
            <div style={{ flex: 'none', width: '32px', height: '32px', borderRadius: '50%', background: '#FEF08A', color: '#854D0E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="i-book" size="xs" />
            </div>
            <div>
              <b style={{ fontSize: '14.5px', color: 'var(--ink)' }}>Ground Seizure Arguments in Specific Precedent</b>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '4px', margin: 0 }}>
                When challenging Ex.2 knife seizure, cite <em>State of Rajasthan vs. Raja Ram</em> regarding absent independent panch witnesses.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <Link className="btn btn-outline" href="/cases">
            <Icon name="i-arrow-left" size="xs" />
            All Cases
          </Link>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-outline" type="button" onClick={() => window.print()}>
              <Icon name="i-download" size="xs" />
              Print Certified Report
            </button>
            <Link className="btn btn-primary" href={`/trials/${trialId}/courtroom`}>
              Continue Next Hearing Session
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
