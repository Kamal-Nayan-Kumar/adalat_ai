# Advocacy dashboard

Advocacy dashboard provides performance analytics on simulated courtroom sessions, rendering KPI metrics, an interactive score trend line, a six-axis advocacy skill radar, monthly session distributions, and an activity heatmap.

## Sub-features

- `dash-kpis` displays summary statistics for sessions, scores, streak, and wins.
- `dash-chart-trend` renders an inline SVG score progression across recent sessions.
- `dash-chart-radar` renders a multi-skill radar chart evaluating six core advocacy competencies.
- `dash-chart-bars` renders monthly session volume bars with highest-month highlighting.
- `dash-activity-heat` populates 119 daily activity tiles with calculated intensity levels.

## How to get to it (user POV)

- Open `http://127.0.0.1:4173/dashboard.html`.
- Choose the `Dashboard` link in the sidebar or main navigation.
- Submit the signup or login forms on `signup.html` / `login.html`.

## Driving it with control-adalat

Preconditions:
- Adalat AI server is running and healthy at `http://127.0.0.1:4173`.
- `artifacts/verify-adalat/dashboard/` directory exists.

- **Open dashboard.** Navigate to `http://127.0.0.1:4173/dashboard.html`.
- **Inspect KPIs.** Verify the four summary cards in `.kpi-grid`: Sessions completed displays `23`, Average score displays `7.8`, Day streak displays `9`, and Cases won displays `11`.
- **Verify trend chart.** Inspect `svg#chart-trend`. The SVG contains a `<defs>` gradient, 5 horizontal grid lines with labels (5.0 to 9.0), a path for the area fill, a line path, 9 circular dots, and a final score callout `8.7`.
- **Verify skill radar.** Inspect `svg#chart-radar`. The SVG contains 4 concentric polygon rings, 6 radial axes, a filled skill polygon, and labels for the six skills (Opening, Examination, Cross-exam, Objections, Exhibits, Citations).
- **Verify monthly bars.** Inspect `svg#chart-bars`. The chart renders 6 monthly bars (Oct to Mar), where the peak month `Mar` (23 sessions) bears the active class `.bar-hi`.
- **Verify activity heat map.** Inspect `#heat`. Exactly 119 `<i>` tiles exist, each having a `data-l` attribute ranging from 0 to 4.
- **Proof.** Capture a full-page screenshot of the rendered charts and metrics to `artifacts/verify-adalat/dashboard/dashboard-overview.png`, and evaluate SVG element child counts into `artifacts/verify-adalat/dashboard/charts.json`.

## Gotchas

- Charts are drawn client-side by `app.js` using SVG DOM APIs; they require JavaScript execution and will be empty if scripts fail.
- The radar chart labels use two-line wrapping for long names (e.g. `Opening statement` wraps or shortens to `Opening`) to prevent clipping.
- The heatmap relies on a seeded PRNG (`seed = 7`) to remain deterministic across page reloads.
