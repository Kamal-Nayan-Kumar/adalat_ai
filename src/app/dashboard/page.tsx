'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { Icon } from '@/components/IconSprite';
import { TrendChart, RadarChart, BarChart, ActivityHeatmap } from '@/components/Charts';

export default function DashboardPage() {
  return (
    <AppShell
      activeNav="dashboard"
      pageTitle="Practice overview"
      topActions={
        <>
          <button className="ic-btn" aria-label="Search">
            <Icon name="i-search" />
          </button>
          <button className="ic-btn" aria-label="Notifications">
            <Icon name="i-bell" />
          </button>
          <Link className="btn btn-outline btn-sm" href="/cases/new">
            <Icon name="i-plus" size="xs" />
            <span>New Case Workspace</span>
          </Link>
          <Link className="btn btn-primary btn-sm" href="/cases">
            <Icon name="i-gavel" size="xs" />
            <span>Cause List</span>
          </Link>
        </>
      }
    >
      {/* Active Trial Adjournment Banner */}
      <article
        className="card"
        style={{
          marginBottom: '16px',
          background: 'linear-gradient(90deg, #fff 0%, rgba(110, 18, 23, 0.03) 100%)',
          borderLeft: '4px solid var(--maroon)',
        }}
      >
        <div className="card-head" style={{ paddingBottom: '10px' }}>
          <div>
            <span className="tag tag-neutral" style={{ color: 'var(--maroon)' }}>
              Active Hearing #1 Adjourned
            </span>
            <h2 style={{ fontSize: '20px', marginTop: '6px' }}>State vs. Ramesh Kumar &mdash; Section 103 BNS</h2>
          </div>
          <span className="tag tag-neutral">Next Date: 28 Oct 2026</span>
        </div>
        <div className="card-body" style={{ paddingTop: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <p style={{ fontSize: '13.5px', color: 'var(--body)', maxWidth: '560px', margin: 0 }}>
            Adjourned for cross-examination of PW4 (Investigating Officer) regarding seized knife memo (Ex.2).
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link className="btn btn-outline btn-sm" href="/cases/1">
              <Icon name="i-doc-lines" size="xs" />
              Open Workspace
            </Link>
            <Link className="btn btn-outline btn-sm" href="/trials/1/report">
              <Icon name="i-chart-bars" size="xs" />
              View Report
            </Link>
            <Link className="btn btn-primary btn-sm" href="/trials/1/courtroom">
              <Icon name="i-play" size="xs" />
              Enter Courtroom
            </Link>
          </div>
        </div>
      </article>

      {/* KPI Row */}
      <section className="kpi-grid" aria-label="Summary">
        <article className="card kpi">
          <span className="ic-slot ic-slot--48">
            <Icon name="i-gavel-lite" size="lg" />
          </span>
          <div>
            <div className="kpi-val">23</div>
            <div className="kpi-label">Sessions completed</div>
            <span className="kpi-delta is-up">
              <Icon name="i-arrow-right" size="xs" />
              +4 this month
            </span>
          </div>
        </article>

        <article className="card kpi">
          <span className="ic-slot ic-slot--48">
            <Icon name="i-trophy" size="lg" />
          </span>
          <div>
            <div className="kpi-val">7.8</div>
            <div className="kpi-label">Average score</div>
            <span className="kpi-delta is-up">
              <Icon name="i-arrow-right" size="xs" />
              +0.6 vs last month
            </span>
          </div>
        </article>

        <article className="card kpi">
          <span className="ic-slot ic-slot--48">
            <Icon name="i-flame" size="lg" />
          </span>
          <div>
            <div className="kpi-val">9</div>
            <div className="kpi-label">Day streak</div>
            <span className="kpi-delta is-up">
              <Icon name="i-arrow-right" size="xs" />
              Personal best
            </span>
          </div>
        </article>

        <article className="card kpi">
          <span className="ic-slot ic-slot--48">
            <Icon name="i-chart-line" size="lg" />
          </span>
          <div>
            <div className="kpi-val">11</div>
            <div className="kpi-label">Cases won</div>
            <span className="kpi-delta is-down">
              <Icon name="i-arrow-right" size="xs" />
              6 argued as defence
            </span>
          </div>
        </article>
      </section>

      {/* Score Trend + Radar Profile */}
      <section className="grid-2" style={{ marginTop: '16px' }}>
        <article className="card">
          <div className="card-head">
            <h2>Score trend</h2>
            <Link className="link" href="/trials/1/report">
              Full report
            </Link>
          </div>
          <div className="card-body">
            <TrendChart />
            <ul className="legend">
              <li>
                <i style={{ background: '#6E1217' }} />
                Average score
              </li>
              <li>
                <i style={{ background: '#F1ECE4' }} />
                Last 9 sessions
              </li>
            </ul>
          </div>
        </article>

        <article className="card" id="skills">
          <div className="card-head">
            <h2>Skill profile</h2>
            <a className="link" href="#feedback">
              Remarks
            </a>
          </div>
          <div className="card-body">
            <RadarChart />
          </div>
        </article>
      </section>

      {/* Skill Breakdown + Activity Heatmap */}
      <section className="grid-2-even" style={{ marginTop: '16px' }}>
        <article className="card">
          <div className="card-head">
            <h2>Skill breakdown</h2>
          </div>
          <div className="card-body">
            <div className="bars">
              <div className="bar-row" data-skill="8.4">
                <span>Opening statement</span>
                <em>8.4/10</em>
                <i className="bar-track">
                  <b className="bar-fill is-gold" style={{ width: '84%' }} />
                </i>
              </div>
              <div className="bar-row" data-skill="8.1">
                <span>Objections</span>
                <em>8.1/10</em>
                <i className="bar-track">
                  <b className="bar-fill is-green" style={{ width: '81%' }} />
                </i>
              </div>
              <div className="bar-row" data-skill="7.6">
                <span>Examination-in-chief</span>
                <em>7.6/10</em>
                <i className="bar-track">
                  <b className="bar-fill" style={{ width: '76%' }} />
                </i>
              </div>
              <div className="bar-row" data-skill="7.2">
                <span>Use of exhibits</span>
                <em>7.2/10</em>
                <i className="bar-track">
                  <b className="bar-fill" style={{ width: '72%' }} />
                </i>
              </div>
              <div className="bar-row" data-skill="6.9">
                <span>Cross-examination</span>
                <em>6.9/10</em>
                <i className="bar-track">
                  <b className="bar-fill" style={{ width: '69%' }} />
                </i>
              </div>
              <div className="bar-row" data-skill="6.4">
                <span>Legal citations</span>
                <em>6.4/10</em>
                <i className="bar-track">
                  <b className="bar-fill" style={{ width: '64%' }} />
                </i>
              </div>
            </div>
          </div>
        </article>

        <article className="card">
          <div className="card-head">
            <h2>Activity</h2>
            <span className="link" style={{ marginLeft: 'auto' }}>
              Last 17 weeks
            </span>
          </div>
          <div className="card-body">
            <ActivityHeatmap />
            <ul className="legend">
              <li><i style={{ background: '#F1EDE6' }} />None</li>
              <li><i style={{ background: '#EBD3C4' }} />1</li>
              <li><i style={{ background: '#D9A98F' }} />2</li>
              <li><i style={{ background: '#B4714F' }} />3</li>
              <li><i style={{ background: '#6E1217' }} />4+ sessions</li>
            </ul>
          </div>
        </article>
      </section>

      {/* Monthly Volume */}
      <section className="card" style={{ marginTop: '16px' }}>
        <div className="card-head">
          <h2>Sessions per month</h2>
        </div>
        <div className="card-body">
          <BarChart />
        </div>
      </section>

      {/* Recent Sessions Table */}
      <section className="card" style={{ marginTop: '16px' }} id="report">
        <div className="card-head">
          <h2>Recent sessions</h2>
          <Link className="link" href="/cases">
            Start a new one
          </Link>
        </div>
        <div className="table-wrap">
          <table className="data">
            <caption className="sr-only">Your most recent courtroom sessions with outcome and score</caption>
            <thead>
              <tr>
                <th scope="col">Case</th>
                <th scope="col">Court</th>
                <th scope="col">Regime</th>
                <th scope="col">Side</th>
                <th scope="col">Outcome</th>
                <th scope="col">Score</th>
                <th scope="col"><span className="sr-only">Open</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="strong">State vs. Ramesh Kumar</td>
                <td>District Criminal</td>
                <td>BNS 2023</td>
                <td>Defence</td>
                <td><span className="tag tag-neutral" style={{ color: '#059669' }}>Acquitted</span></td>
                <td><strong>8.7</strong></td>
                <td>
                  <Link className="link" href="/trials/1/report">
                    Report &rsaquo;
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="strong">Sunita Devi vs. State</td>
                <td>District Criminal</td>
                <td>IPC 1860</td>
                <td>Prosecution</td>
                <td><span className="tag tag-neutral" style={{ color: '#059669' }}>Convicted</span></td>
                <td><strong>7.9</strong></td>
                <td>
                  <Link className="link" href="/trials/1/report">
                    Report &rsaquo;
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="strong">Meera Traders vs. State</td>
                <td>City Civil</td>
                <td>Contract Act</td>
                <td>Plaintiff</td>
                <td><span className="tag tag-neutral">Partly Decreed</span></td>
                <td><strong>8.2</strong></td>
                <td>
                  <Link className="link" href="/trials/1/report">
                    Report &rsaquo;
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
