'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { Icon } from '@/components/IconSprite';

export default function ProfilePage() {
  const [toastShown, setToastShown] = useState(false);
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [role, setRole] = useState('aspirant');
  const [goal, setGoal] = useState('Delhi Judicial Services (DJS) & Trial Advocacy');
  const [regime, setRegime] = useState('auto');
  const [difficulty, setDifficulty] = useState('standard');
  const [coach, setCoach] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastShown(true);
    setTimeout(() => setToastShown(false), 4000);
  };

  return (
    <AppShell activeNav="settings" pageTitle="Profile & Settings">
      {/* Toast Notification */}
      {toastShown && (
        <div
          role="status"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 18px',
            background: '#059669',
            color: '#fff',
            borderRadius: 'var(--r-sm)',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '20px',
          }}
        >
          <Icon name="i-check" size="sm" />
          <span>Your preferences have been saved successfully.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
        {/* Left Info Card */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--line)' }}>
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'var(--maroon)',
                color: '#fff',
                fontFamily: 'var(--serif)',
                fontSize: '32px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                boxShadow: '0 4px 12px rgba(110, 18, 23, 0.2)',
              }}
            >
              AS
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)' }}>{fullName}</h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '2px' }}>aarav@example.com</p>
            <span className="tag tag-neutral" style={{ marginTop: '10px' }}>
              Judiciary Aspirant
            </span>
          </div>

          <div style={{ display: 'grid', gap: '12px', marginTop: '20px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
              <span>Completed Trials</span>
              <strong style={{ color: 'var(--ink)' }}>23 hearings</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
              <span>Average Score</span>
              <strong style={{ color: 'var(--ink)' }}>7.8 / 10</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
              <span>Practice Streak</span>
              <strong style={{ color: 'var(--ink)' }}>9 days</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
              <span>Primary Court</span>
              <strong style={{ color: 'var(--ink)' }}>District Criminal</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
              <span>Data Isolation</span>
              <strong style={{ color: '#059669' }}>Private Tenant</strong>
            </div>
          </div>
        </div>

        {/* Right Settings Form */}
        <div className="card" style={{ padding: '24px' }}>
          <form id="profile-form" onSubmit={handleSave}>
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '14px' }}>
                Advocacy Profile
              </h3>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="prof-name">Full Name</label>
                  <input type="text" id="prof-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="prof-role">Primary Persona</label>
                  <select id="prof-role" className="select" style={{ width: '100%' }} value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="student">Law Student</option>
                    <option value="aspirant">Judiciary Aspirant</option>
                    <option value="advocate">Practicing Advocate</option>
                    <option value="college">Faculty / College</option>
                  </select>
                </div>
              </div>

              <div className="field" style={{ marginTop: '16px' }}>
                <label htmlFor="prof-goal">Target Examination / Practice Goal</label>
                <input type="text" id="prof-goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '14px' }}>
                Simulation Defaults
              </h3>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="prof-regime">Default Legal Regime</label>
                  <select id="prof-regime" className="select" style={{ width: '100%' }} value={regime} onChange={(e) => setRegime(e.target.value)}>
                    <option value="auto">Auto-detect by offence date</option>
                    <option value="bns">Always BNS 2023 / BNSS / BSA</option>
                    <option value="ipc">Always IPC 1860 / CrPC / IEA</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="prof-diff">Default Hearing Difficulty</label>
                  <select id="prof-diff" className="select" style={{ width: '100%' }} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="guided">Guided (Helpful hints &amp; lenient judge)</option>
                    <option value="standard">Realistic (Standard trial pace)</option>
                    <option value="strict">Strict (Demanding judge &amp; aggressive prosecution)</option>
                  </select>
                </div>
              </div>

              <div className="field" style={{ marginTop: '16px' }}>
                <label className="check-row" style={{ marginTop: '10px' }}>
                  <input type="checkbox" id="prof-coach" checked={coach} onChange={(e) => setCoach(e.target.checked)} />
                  <span><strong>Enable Nyaya Saathi in-trial suggestions</strong> (procedural cues &amp; statutory checks)</span>
                </label>
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
                Data &amp; Case Confidentiality
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                Case materials, drafts, and trial recordings uploaded under your account are protected by tenant-isolated access controls. Simulation agents only access materials scoped to your active hearing session.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--line)' }}>
              <Link className="btn btn-outline" href="/dashboard">
                Cancel
              </Link>
              <button className="btn btn-primary" type="submit" id="save-profile-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
