'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { Icon } from '@/components/IconSprite';

export default function NewCasePage() {
  const router = useRouter();
  const [source, setSource] = useState<'public' | 'upload' | 'training'>('public');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/cases/1');
  };

  return (
    <AppShell
      activeNav="cases"
      pageTitle="Create Case Workspace"
      topActions={
        <Link className="btn btn-outline btn-sm" href="/cases">
          Back to Cause List
        </Link>
      }
    >
      <div style={{ maxWidth: '880px', margin: '24px auto', padding: '0 var(--gutter)' }}>
        {/* Source Selector Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '28px' }}>
          <label
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '20px',
              background: '#fff',
              border: `1.5px solid ${source === 'public' ? 'var(--maroon)' : 'var(--line)'}`,
              backgroundColor: source === 'public' ? 'rgba(110, 18, 23, 0.035)' : '#fff',
              borderRadius: 'var(--r-md)',
              cursor: 'pointer',
            }}
          >
            <input type="radio" name="case_source" value="public" checked={source === 'public'} onChange={() => setSource('public')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            <b style={{ fontSize: '16px', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="i-landmark" size="sm" />
              Public Judgment
            </b>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45, margin: 0 }}>
              Select from verified Indian Supreme Court, High Court, and District trial records.
            </p>
          </label>

          <label
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '20px',
              background: '#fff',
              border: `1.5px solid ${source === 'upload' ? 'var(--maroon)' : 'var(--line)'}`,
              backgroundColor: source === 'upload' ? 'rgba(110, 18, 23, 0.035)' : '#fff',
              borderRadius: 'var(--r-md)',
              cursor: 'pointer',
            }}
          >
            <input type="radio" name="case_source" value="upload" checked={source === 'upload'} onChange={() => setSource('upload')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            <b style={{ fontSize: '16px', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="i-doc" size="sm" />
              Private Upload
            </b>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45, margin: 0 }}>
              Upload case documents (FIR, seizure memo, statements) with tenant isolation.
            </p>
          </label>

          <label
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '20px',
              background: '#fff',
              border: `1.5px solid ${source === 'training' ? 'var(--maroon)' : 'var(--line)'}`,
              backgroundColor: source === 'training' ? 'rgba(110, 18, 23, 0.035)' : '#fff',
              borderRadius: 'var(--r-md)',
              cursor: 'pointer',
            }}
          >
            <input type="radio" name="case_source" value="training" checked={source === 'training'} onChange={() => setSource('training')} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            <b style={{ fontSize: '16px', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="i-shield" size="sm" />
              Training Scenario
            </b>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45, margin: 0 }}>
              Choose a curated fictional moot problem targeting specific evidentiary issues.
            </p>
          </label>
        </div>

        {/* Pane A: Public Judgment */}
        {source === 'public' && (
          <div className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)' }}>Select Public Indian Case</h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>Ground your simulation in admitted judicial records and cited statutes.</p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="pub-case">Pre-configured Case File</label>
                <select id="pub-case" className="select" style={{ width: '100%' }}>
                  <option value="state-vs-ramesh">State vs. Ramesh Kumar (Section 302 IPC / BNS 103 — Murder &amp; Seized Weapon)</option>
                  <option value="sunita-vs-state">Sunita Devi vs. State (Section 420 IPC — Forgery &amp; Document Cheating)</option>
                  <option value="meera-traders">Meera Traders vs. State (Section 73 Contract Act — Commercial Damages)</option>
                  <option value="anand-vs-state">Anand Kumar vs. State (Section 138 NI Act — Cheque Dishonour &amp; Notice)</option>
                </select>
              </div>

              <div className="field-row" style={{ marginTop: '16px' }}>
                <div className="field">
                  <label htmlFor="pub-court">Jurisdiction</label>
                  <input type="text" id="pub-court" defaultValue="District Criminal Court, Sessions Division" readOnly />
                </div>
                <div className="field">
                  <label htmlFor="pub-regime">Applicable Law</label>
                  <input type="text" id="pub-regime" defaultValue="BNS / BNSS / BSA (2023)" readOnly />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px' }}>
                <button className="btn btn-primary" type="submit">
                  <span>Create Workspace</span>
                  <Icon name="i-arrow-right" size="sm" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Pane B: Private Upload */}
        {source === 'upload' && (
          <div className="card" style={{ padding: '32px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: 'rgba(5, 150, 105, 0.08)',
                color: '#059669',
                fontSize: '12.5px',
                fontWeight: 600,
                borderRadius: 'var(--r-xs)',
                marginBottom: '18px',
              }}
            >
              <Icon name="i-shield-check" size="xs" />
              <span>Confidential &amp; Tenant-Isolated (Not used for AI training)</span>
            </div>

            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)' }}>Upload Case Documents</h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>
              Upload PDFs or scanned files. Our OCR pipeline extracts passages and builds an evidence index.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="upload-title">Case Title</label>
                <input type="text" id="upload-title" placeholder="e.g. State vs. Verma — Criminal Appeal No. 412/2025" required />
              </div>

              <div className="field" style={{ marginTop: '18px' }}>
                <label>Pleadings &amp; Exhibits</label>
                <div
                  style={{
                    border: '2px dashed var(--line)',
                    borderRadius: 'var(--r-md)',
                    padding: '36px',
                    textAlign: 'center',
                    background: 'rgba(0, 0, 0, 0.01)',
                    cursor: 'pointer',
                  }}
                >
                  <span className="ic-slot ic-slot--48" style={{ margin: '0 auto 12px', background: 'var(--rose)', color: 'var(--maroon)' }}>
                    <Icon name="i-doc-lines" size="lg" />
                  </span>
                  <p style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 600 }}>Drag &amp; drop case briefs, FIR, or depositions here</p>
                  <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '4px' }}>PDF, DOCX up to 25MB. Text extraction and OCR run automatically.</p>
                  <button type="button" className="btn btn-outline btn-sm" style={{ marginTop: '14px' }}>
                    Browse Files
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px' }}>
                <button className="btn btn-primary" type="submit">
                  <span>Create &amp; Ingest Workspace</span>
                  <Icon name="i-arrow-right" size="sm" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Pane C: Training Scenario */}
        {source === 'training' && (
          <div className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)' }}>Curated Training Scenarios</h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>Practice specific trial drills designed to sharpen single skills.</p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="train-scenario">Scenario Drill</label>
                <select id="train-scenario" className="select" style={{ width: '100%' }}>
                  <option value="drill-cross">Hostile Witness Cross-Examination (Section 142 BSA)</option>
                  <option value="drill-exhibit">Tendering Contested Electronic Records (Section 63 BSA)</option>
                  <option value="drill-bail">Urgent Bail Hearing on Medical Grounds (Section 480 BNSS)</option>
                  <option value="drill-opening">Opening Statement under Time Pressure (5 Minutes)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px' }}>
                <button className="btn btn-primary" type="submit">
                  <span>Launch Scenario Workspace</span>
                  <Icon name="i-arrow-right" size="sm" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AppShell>
  );
}
