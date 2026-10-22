# Adalat AI verification map

This directory is the maintained source for verifying user-facing behavior in Adalat AI. Read this index before driving the app, then use the matching feature file as the verification recipe.

## Baseline preconditions

- Start the Adalat AI server at `http://127.0.0.1:4173`:
  ```bash
  ./dev/control-adalat start 4173
  ```
- Run the health check before any test run:
  ```bash
  ./dev/control-adalat doctor 4173
  ```
- Ensure `ego-browser` is available in PATH.
- Save proof artifacts under `artifacts/verify-adalat/<feature>/`.
- Always stop the server at the end of the test run:
  ```bash
  ./dev/control-adalat stop 4173
  ```

## Driving conventions

- Run browser automation via `ego-browser nodejs`.
- Target stable handles: ARIA roles, accessible names, text substrings, and data attributes over fragile CSS coordinates.
- Verify side-effects and resulting states (DOM updates, state flags, dialog visibility), not merely the click dispatch.
- Preserve all proof artifacts during cleanup.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior, followed by four mandatory H2 sections:
1. `Sub-features` — short IDs with a one-line description for each behavior.
2. `How to get to it (user POV)` — user entry points from pages, menus, or URLs.
3. `Driving it with control-adalat` — starts with `Preconditions:` and pairs each user step with an exact script action and observable outcome.
4. `Gotchas` — pitfalls, timing requirements, or browser constraints.

## Features

- [Courtroom simulation](./courtroom-simulation.md) covers courtroom dialogue, objection chips, judge rulings, and verdict dialogs.
- [Cause list and filters](./cause-list-filters.md) covers keyword search, court/category/regime filters, counter updates, and zero states.
- [Advocacy dashboard](./advocacy-dashboard.md) covers KPI cards, inline SVG charts (trend, radar, bars), heatmap, and skill breakdowns.
- [Auth and role onboarding](./auth-and-role-onboarding.md) covers signup role selection, field entry, login submission, and dashboard navigation.
- [Backend and HTTP verification surface](./backend-and-http-surface.md) covers HTTP routes, no-cache headers, MIME types, and 404 boundaries.
