---
name: verify-adalat
description: Drive and verify the Adalat AI courtroom simulator and advocacy platform using ego-browser. Use when testing live courtroom proceedings, cause-list search and filters, dashboard metrics and charts, auth flows, and visual responsiveness.
---

# Verify Adalat AI

This skill provides an automated, reproducible way to launch, inspect, drive, and verify the user-facing behavior of Adalat AI using `dev/control-adalat` and `ego-browser`.

## Launch

Start the Adalat AI dev server in the background:

```bash
./dev/control-adalat start 4173
```

The script boots `python3 dev/serve.py 4173` with caching disabled (`Cache-Control: no-store`), saves the server PID to `.verify/serve-4173.pid`, and polls `http://127.0.0.1:4173/index.html` until it returns HTTP 200.

To teardown the server after a verification run:

```bash
./dev/control-adalat stop 4173
```

## Doctor

Before running tests, verify the instance and environment are healthy:

```bash
./dev/control-adalat doctor 4173
```

This read-only check confirms:
1. The server responds on `http://127.0.0.1:4173/courtroom.html`.
2. `ego-browser` is installed and operational.
3. All static files (`courtroom.html`, `dashboard.html`, `cases.html`, `login.html`, `signup.html`, `index.html`, `styles.css`, `app.js`, `assets/icons.svg`) exist.

Also verify baseline page integrity across all 6 pages:

```bash
./dev/control-adalat check 4173
```

This verifies 0 uncaught JavaScript runtime exceptions, 0 broken images, 0 collapsed SVGs, and that all `<use href="#id">` icons resolve against the sprite.

## Drive

Drive user actions using `ego-browser nodejs`. Always target stable ARIA roles, labels, text content, and IDs.

### 1. Courtroom simulation
- **Location:** `http://127.0.0.1:4173/courtroom.html`
- **Submission textbox:** `input#composer-input` or `loc=role:textbox[name='Your submission']`
- **Send button:** `button#composer-send` or `loc=role:button[name='Send']`
- **Pre-set chips:** `.chip-btn` with `data-say` attributes ("Objection", "Tender exhibit", "Permission gate", "Reserve")
- **Proceedings stream:** `#chat-stream` containing `.msg.is-you` and `.msg.is-judge`
- **Stage status:** `#stage-status`
- **Verdict modal:** trigger `button#open-verdict`, modal `#verdict[role='dialog']`, dismiss `[data-close]`

### 2. Cause list and filters
- **Location:** `http://127.0.0.1:4173/cases.html`
- **Search input:** `input#case-search` or `loc=role:searchbox[name='Search cases']`
- **Filter selects:** `select[data-filter='court']`, `select[data-filter='category']`, `select[data-filter='regime']`
- **Count badge:** `#case-count` (e.g. `9 cases`, `1 case`)
- **Case cards:** `article.case-card[data-case]`
- **Zero-match card:** `#case-empty`

### 3. Advocacy dashboard
- **Location:** `http://127.0.0.1:4173/dashboard.html`
- **KPIs:** `.kpi .kpi-val` (Sessions completed `23`, Average score `7.8`, Streak `9`, Cases won `11`)
- **Trend chart:** `svg#chart-trend` (contains lines, area fill, value labels)
- **Radar chart:** `svg#chart-radar` (contains polygon, axis labels for 6 skills)
- **Monthly bar chart:** `svg#chart-bars` (contains 6 bars and labels)
- **Heatmap:** `#heat i[data-l]` (119 activity tiles)

### 4. Auth & Onboarding
- **Location:** `http://127.0.0.1:4173/signup.html` & `login.html`
- **Inputs:** `#first`, `#last`, `#email`, `#password`
- **Role radios:** `input[name='role'][value='student|aspirant|advocate|academic']`
- **Form submission:** `button[type='submit']` navigates to `dashboard.html`

## Evidence

Every verification run must capture tangible proof into `artifacts/verify-adalat/<feature>/`:
1. **Visual proof:** Full or viewport screenshot via `page.screenshot({ path })` or `./dev/control-adalat shot <page> <dest> [width]`. For all frontend changes, capture screenshots of the affected pages (desktop and mobile viewports) and embed them directly in the response using Markdown with absolute file paths.
2. **Semantic proof:** ARIA or DOM snapshot via `page.snapshot()` or evaluated state.
3. **Execution proof:** Clean exit code and console transcript confirming user action and resulting DOM reaction.

Proof artifacts must persist after instance cleanup. Never store artifacts in `/tmp` without copying them to `artifacts/verify-adalat/`.

## Cleanup

Always tear down resources when verification concludes:
1. Finish the ego-browser task space: `await task.finish({ keep: [] })`.
2. Terminate the dev server: `./dev/control-adalat stop 4173`.
3. Verify the PID file `.verify/serve-4173.pid` is removed.
4. Confirm generated evidence in `artifacts/verify-adalat/` remains intact.

## Helpers

- `dev/control-adalat start [port]`: Boots server in background and awaits HTTP 200.
- `dev/control-adalat stop [port]`: Gracefully stops the background server.
- `dev/control-adalat doctor [port]`: Runs read-only environment and connectivity health checks.
- `dev/control-adalat probe [port]`: Tests server/backend HTTP status codes, no-cache headers, and 404 boundaries directly.
- `dev/control-adalat check [port]`: Runs headless page integrity check for JS errors and icon resolutions.
- `dev/control-adalat drive <script.mjs> [port]`: Executes a custom verification script via ego-browser.
- `dev/control-adalat shot <page> <dest> [width] [port]`: Captures a screenshot of a specific page.
