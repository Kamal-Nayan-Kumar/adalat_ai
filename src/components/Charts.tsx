'use client';

import React from 'react';

const TREND_DATA = [
  { d: '2026-01-14', s: 6.2 }, { d: '2026-01-21', s: 6.8 }, { d: '2026-01-28', s: 6.5 },
  { d: '2026-02-04', s: 7.4 }, { d: '2026-02-11', s: 7.1 }, { d: '2026-02-18', s: 7.9 },
  { d: '2026-02-25', s: 8.3 }, { d: '2026-03-04', s: 8.0 }, { d: '2026-03-11', s: 8.7 }
];

const SKILLS_DATA = [
  { n: 'Opening', v: 8.4 },
  { n: 'Examination', v: 7.6 },
  { n: 'Cross-exam', v: 6.9 },
  { n: 'Objections', v: 8.1 },
  { n: 'Exhibits', v: 7.2 },
  { n: 'Citations', v: 6.4 },
];

const MONTHS_DATA = [
  { n: 'Oct', v: 4 }, { n: 'Nov', v: 9 }, { n: 'Dec', v: 6 },
  { n: 'Jan', v: 14 }, { n: 'Feb', v: 19 }, { n: 'Mar', v: 23 }
];

export function TrendChart() {
  const W = 640;
  const H = 260;
  const P = { t: 16, r: 16, b: 34, l: 34 };
  const iw = W - P.l - P.r;
  const ih = H - P.t - P.b;
  const min = 5;
  const max = 9;

  const x = (i: number) => P.l + (iw * i) / (TREND_DATA.length - 1);
  const y = (v: number) => P.t + ih - ((v - min) / (max - min)) * ih;

  const dLine = TREND_DATA.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p.s).toFixed(1)}`).join(' ');
  const dArea = `${dLine} L${x(TREND_DATA.length - 1).toFixed(1)} ${P.t + ih} L${P.l} ${P.t + ih} Z`;
  const last = TREND_DATA[TREND_DATA.length - 1];

  return (
    <svg className="chart" id="chart-trend" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Average score rising from 6.2 to 8.7 over nine sessions">
      <defs>
        <linearGradient id="adalatFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6E1217" stopOpacity=".18" />
          <stop offset="100%" stopColor="#6E1217" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[5, 6, 7, 8, 9].map((v) => (
        <g key={v}>
          <line className="grid-line" x1={P.l} y1={y(v)} x2={W - P.r} y2={y(v)} />
          <text className="lbl" x={P.l - 8} y={y(v) + 4} textAnchor="end">
            {v.toFixed(1)}
          </text>
        </g>
      ))}
      <path className="area" d={dArea} />
      <path className="line" d={dLine} />
      {TREND_DATA.map((p, i) => (
        <circle key={p.d} className="dot" cx={x(i)} cy={y(p.s)} r={3.6} />
      ))}
      <text className="val" x={x(TREND_DATA.length - 1)} y={y(last.s) - 12} textAnchor="middle">
        {last.s.toFixed(1)}
      </text>
      {TREND_DATA.map((p, i) => {
        if (i % 2 === 0 || i === TREND_DATA.length - 1) {
          return (
            <text key={p.d} className="lbl" x={x(i)} y={H - 12} textAnchor="middle">
              {p.d.slice(5).replace('-', '/')}
            </text>
          );
        }
        return null;
      })}
    </svg>
  );
}

export function RadarChart() {
  const size = 380;
  const c = size / 2;
  const R = 95;
  const n = SKILLS_DATA.length;

  const pts = SKILLS_DATA.map((s, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    const r = (s.v / 10) * R;
    return `${(c + Math.cos(a) * r).toFixed(1)} ${(c + Math.sin(a) * r).toFixed(1)}`;
  }).join(' ');

  return (
    <svg className="chart" id="chart-radar" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Radar chart of advocacy skills">
      {[0.25, 0.5, 0.75, 1].map((ring) => {
        const ringPts = SKILLS_DATA.map((_, i) => {
          const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
          return `${(c + Math.cos(a) * R * ring).toFixed(1)} ${(c + Math.sin(a) * R * ring).toFixed(1)}`;
        }).join(' ');
        return <polygon key={ring} points={ringPts} fill="none" stroke="#F1ECE4" strokeWidth="1" />;
      })}
      {SKILLS_DATA.map((_, i) => {
        const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
        return <line key={i} x1={c} y1={c} x2={c + Math.cos(a) * R} y2={c + Math.sin(a) * R} stroke="#F1ECE4" strokeWidth="1" />;
      })}
      <polygon points={pts} fill="rgba(110,18,23,.16)" stroke="#6E1217" strokeWidth="2.25" strokeLinejoin="round" />
      {SKILLS_DATA.map((s, i) => {
        const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
        const r = (s.v / 10) * R;
        const lx = c + Math.cos(a) * (R + 24);
        const ly = c + Math.sin(a) * (R + 24);
        const anchor = Math.abs(Math.cos(a)) < 0.35 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end';
        return (
          <g key={s.n}>
            <circle cx={c + Math.cos(a) * r} cy={c + Math.sin(a) * r} r={3.4} fill="#fff" stroke="#6E1217" strokeWidth="2.25" />
            <text className="lbl" x={lx} y={ly + 4} textAnchor={anchor}>
              {s.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function BarChart() {
  const W = 640;
  const H = 220;
  const P = { t: 14, r: 12, b: 30, l: 32 };
  const iw = W - P.l - P.r;
  const ih = H - P.t - P.b;
  const max = Math.max(...MONTHS_DATA.map((m) => m.v));
  const step = iw / MONTHS_DATA.length;
  const bw = step * 0.52;

  return (
    <svg className="chart" id="chart-bars" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Sessions per month">
      {[0, 10, 20].map((v) => {
        const y = P.t + ih - (v / 24) * ih;
        return (
          <g key={v}>
            <line className="grid-line" x1={P.l} y1={y} x2={W - P.r} y2={y} />
            <text className="lbl" x={P.l - 8} y={y + 4} textAnchor="end">
              {v}
            </text>
          </g>
        );
      })}
      {MONTHS_DATA.map((m, i) => {
        const h = (m.v / 24) * ih;
        const x = P.l + step * i + (step - bw) / 2;
        const isBest = m.v === max;
        return (
          <g key={m.n}>
            <rect className={isBest ? 'bar-hi' : 'bar'} x={x} y={P.t + ih - h} width={bw} height={h} rx={4} />
            <text className="lbl" x={x + bw / 2} y={H - 10} textAnchor="middle">
              {m.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ActivityHeatmap() {
  // Deterministic pseudo-random sequence for 119 tiles
  const tiles: number[] = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  for (let i = 0; i < 119; i++) {
    const r = rnd();
    const lvl = r > 0.93 ? 4 : r > 0.82 ? 3 : r > 0.68 ? 2 : r > 0.5 ? 1 : 0;
    tiles.push(lvl);
  }

  return (
    <div className="heat" id="heat" role="img" aria-label="Practice activity heatmap">
      {tiles.map((lvl, i) => (
        <i key={i} data-l={lvl} title={`day ${i}`} />
      ))}
    </div>
  );
}
