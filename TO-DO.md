# TO-DO.md — Adalat AI Frontend

Status legend: `[x]` done · `[ ]` todo

Everything below is implemented and verified in the browser. The verification
commands are in `README.md`; run them after any change.

---

## Phase 0 — Rules & audit

- [x] `CHATGPT_RULES.md` — which chat, how to prompt, palette, icon policy
- [x] Audit existing `index.html` / `styles.css` against `Adalat_AI.png`
- [x] Decide asset split: ChatGPT for illustrations, hand-built SVG for icons

## Phase 1 — Assets from ChatGPT

All from `https://chatgpt.com/c/6ac0e121-3120-83ee-a35a-b99f1d0266e8`. No other
personal chat was opened. Prompts recorded in `PROMPTS.md`.

- [x] Hero courtroom illustration → `assets/hero-courtroom.png` (1200 x 675)
- [x] CTA banner background → `assets/banner-cta.png` (no baked text)
- [x] Auth page side panel → `assets/auth-panel.png`
- [x] Logo mark kept, resized to `assets/logo-mark.png` (160 x 129)
- [x] Verified real pixel dimensions of every download
- [x] `dev/optimize_assets.py` — right-sized PNG + WebP (6.5 MB → ~120 KB shipped)
- [x] `dev/wire_webp.py` — `<picture>` elements wired into the pages

## Phase 2 — Icon system (Lucide)

Reason: AI-generated and hand-drawn sets never match each other in weight, grid
or optical size, which is what makes an icon set look "forcefully made".

- [x] **Switched to Lucide** (MIT) — one library, one 24x24 grid, one 2px stroke
- [x] `dev/build_icons_from_lucide.py` vendors 43 glyphs into `assets/icons.svg`,
      keeping our `i-*` ids so no markup changed
- [x] Agents: judge, scales, shield, witness
- [x] Features: cap, landmark, chart-bars, book, people, calendar
- [x] UI: arrows, chevrons, play, checks, send, doc, chart, radar, gear, search,
      bell, logout, plus, download, clock, flame, trophy, alert, menu, close,
      filter, mail, lock, user, home, shield-check
- [x] `stroke-width` stripped from every symbol; one value in `.ic` in CSS
- [x] Colour stays ours via `currentColor`; size via the `.ic` scale
- [x] Sprite inlined per page by `dev/inject_sprite.py` (external `<use>` refs do
      not render in the verification browser)
- [x] All 30+ duplicated inline path blobs removed
- [x] Dropped the hand-drawn set and its optical-normalisation tooling
- [x] Verified visually at 16 / 24 / 32 px on every page

## Phase 3 — Landing page fixes

- [x] **Header/hero alignment** — the hero grid was full-bleed, so the copy sat
      at the viewport edge while the header was centred. The band now uses the
      same `--container-wide`, so logo and headline share a left edge at every
      width (verified 1280 / 1440 / 1920)
- [x] **Signup role icons overlapped the text** — `.field label` and `.field .ic`
      both out-specified `.role-opt`, making it `display:block` and pulling the
      icon to `position:absolute`. Scoped to `.field > label` and
      `.field .input-wrap > .ic`
- [x] **Removed the Google / Microsoft block** from `login.html` (and its now
      dead `.auth-divider` CSS)

- [x] **Hero image overflow** — clipped inside the band, right-anchored, no longer
      widens the page at any width
- [x] **Hero row alignment** — single grid row, no magic offsets; the old
      `width:1368px; left:24px` hack is gone
- [x] **Agent card icons** — all four optically identical in a 56 px slot
- [x] **Audience card icons** — same 56 px slot, centred, text cannot overflow
- [x] **Hero points** — fixed 34 px icon slots, kept on one row from 768 px up
- [x] **Step connectors** — centred in the gap, no `left:100%` overflow
- [x] **Regime band** — equal 48 px icon slots, baseline-aligned text
- [x] **CTA banner rebuilt** — HTML headline + button over the generated
      background, nothing baked into the image
- [x] **Skills tracker** — label and score on one row, bar beneath (markup order bug)
- [x] Footer on one baseline

## Phase 4 — Responsive

- [x] Audited at 1920 / 1600 / 1500 / 1440 / 1400 / 1366 / 1300 / 1280 / 1240 /
      1201 / 1180 / 1150 / 1024 / 900 / 768 / 700 / 520 / 430 / 415 / 360 / 320
- [x] Zero horizontal scroll and zero overflow on all 6 pages at all widths
- [x] Mobile nav drawer; mobile shell rail; courtroom tab switcher
- [x] Fixed bare `1fr` tracks → `minmax(0,1fr)` (bare `1fr` kept a min-content
      floor and pushed two dashboard cards 9 px past the viewport at 320 px)
- [x] Fixed header actions overflowing at 360 px and below

## Phase 5 — Auth pages

- [x] `login.html` — split layout, generated panel left, form right
- [x] `signup.html` — name row, role selection (student / aspirant / college)
- [x] Field states: default, focus ring, invalid, hint
- [x] Google / Microsoft split, forgot-password, remember-me
- [x] Scrim so the panel copy stays legible over the illustration
- [x] Mobile: panel collapses to a band above the form

## Phase 6 — Dashboard

- [x] `dashboard.html` — app shell, rail + sticky topbar
- [x] KPI row: sessions, average score, streak, cases won
- [x] Score trend line + area chart (inline SVG, 9 sessions)
- [x] Skill radar chart, 6 axes, labels inside the viewBox
- [x] Sessions-per-month bar chart
- [x] Activity heatmap, 17 weeks, deterministic
- [x] Recent sessions table with outcome tags and scores
- [x] Examiner remarks list
- [x] Skill breakdown bars with computed values
- [x] Responsive: 4 → 2 → 1 columns, rail becomes a drawer

## Phase 7 — Cases

- [x] `cases.html` — 9 curated cases
- [x] Search across parties, sections and facts
- [x] Filters: court, category, regime — combinable
- [x] Live result count
- [x] Empty state with working "Clear filters"
- [x] Responsive grid 3 → 2 → 1
- [x] Fixed `[hidden]` being outranked by `.empty{display:grid}`

## Phase 8 — Courtroom simulator

- [x] `courtroom.html` — left case file, centre court stage, right proceedings
- [x] Judge bench with live turn indicator
- [x] Three agent seats with role tags
- [x] Chat stream with role-coloured messages and timestamps
- [x] Left column: registry, facts, exhibits, skill tracker
- [x] Composer with quick-action chips (objection, tender, permission, reserve)
- [x] Verdict modal, opened from the trophy, closable three ways
- [x] Mobile: Case / Court / Chat tabs; tab bar moved out of the stage column so
      it survives switching, and the `data-show` bug where a shadowed loop
      variable always selected the last tab

## Phase 9 — Clean up

- [x] Deleted 34 dead files: scratch scripts, reference screenshots, unused and
      duplicate assets
- [x] `.vercelignore` updated
- [x] `README.md` — run, page map, design system, icon maintenance, checks
- [x] `PROMPTS.md` — every generation prompt
- [x] `dev/` holds only documented, runnable tooling
- [x] No dead CSS

## Phase 10 — Verification

- [x] `dev/check.mjs` — no JS errors, no broken images, every `<use>` resolves,
      all charts drew. Caught the heatmap loop condition `i = 119`, which had
      turned into an infinite loop and left the chart blank.
- [x] `dev/responsive.mjs` — 6 pages x 10 widths clean
- [x] `dev/shots.mjs` — screenshots reviewed at each breakpoint
- [x] Interactions exercised in the browser: nav drawer, filters, empty state,
      courtroom tabs, chips, verdict modal, radar and charts

---

## Known limitations

- Data is static sample data held in `app.js` and the page markup; there is no
  backend yet.
- Forms `GET` to `dashboard.html`; no auth is wired up.
- The courtroom exchanges canned replies rather than calling a model.