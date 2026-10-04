# Adalat AI — frontend

Static frontend for a multi-agent AI courtroom simulator for Indian law students
and judiciary aspirants. No build step, no framework, no dependencies: plain
HTML, CSS and one small JS file, served as-is.

## Run it

```bash
python3 dev/serve.py 4173      # http://localhost:4173
```

Use `dev/serve.py` rather than `python3 -m http.server` — it sends
`Cache-Control: no-store`, so style edits show up on reload instead of being
served from the browser cache.

## Pages

| File | What it is |
|---|---|
| `index.html` | Landing page |
| `login.html` | Log in, split layout |
| `signup.html` | Create account, with role selection |
| `dashboard.html` | Practice overview: KPIs, charts, heatmap, sessions table, examiner remarks |
| `cases.html` | Cause list with search and filters |
| `courtroom.html` | Courtroom simulator: case file, court stage, live proceedings |

Shared files: `styles.css` (design system), `app.js` (behaviour), `assets/icons.svg`
(icon sprite), `assets/fonts`.

## Design system

Everything is driven by the custom properties at the top of `styles.css`:
colour, type scale, radii, shadows and the container widths. Change a token
there rather than editing a component.

### Icons

`assets/icons.svg` is the single source of truth for all 43 UI icons. The glyphs
come from **Lucide** (https://lucide.dev, MIT). Every Lucide icon sits on the
same 24x24 grid with the same 2px round-capped stroke, so the set is consistent
by construction — which hand-drawn or AI-generated sets never are.

What stays ours:

- the `i-*` id names, so no page markup had to change
- colour, via `currentColor`
- size, via the CSS `.ic` scale

Usage:

```html
<svg class="ic is-md"><use href="#i-scale"/></svg>
```

Size always comes from CSS (`.ic`, `.is-xs` … `.is-2xl`, or a `.ic-slot--*`
wrapper). Never put `width`/`height` on the `<svg>` tag.

The sprite is inlined into each page by `dev/inject_sprite.py` between the
`<!--sprite:start-->` / `<!--sprite:end-->` markers, because external
`<use href="…#id">` references do not render in the Chromium build used to
verify this project.

### Icon maintenance

```bash
# 1. change the id -> lucide-name mapping in dev/build_icons_from_lucide.py
python3 dev/build_icons_from_lucide.py   # rebuild assets/icons.svg
python3 dev/inject_sprite.py             # push into the pages
```

No normalisation step is needed — Lucide is already uniform.

### Images

Illustrations come from ChatGPT — see `CHATGPT_RULES.md` and `PROMPTS.md`.
`dev/optimize_assets.py` right-sizes them and writes WebP alongside the PNG;
`dev/wire_webp.py` wires the `<picture>` elements into the pages.

Text is never baked into an image. The CTA banner and hero copy are real HTML
layered over a generated background, so they stay aligned and responsive.

## Checks

```bash
ego-browser nodejs < dev/check.mjs        # JS errors, broken images, unresolved icons
ego-browser nodejs < dev/responsive.mjs   # every page at 10 widths: overflow + charts
ego-browser nodejs < dev/check_live.mjs   # the same checks against the deployed URL
ego-browser nodejs < dev/shots.mjs        # screenshots for visual review
```

`check.mjs` and `responsive.mjs` are the gate: run both after any change.
`check_live.mjs` points at https://adalatai.vercel.app — run it after deploying.

Note: the browser sandbox cannot write into the project directory, so scripts that
need to save output write to `/tmp` and the caller moves it into place.

## Layout rules worth keeping

- **Grid tracks use `minmax(0, 1fr)`, never bare `1fr`.** A bare `1fr` still
  has an auto (min-content) minimum, so one long child can push a track wider
  than the viewport and create a horizontal scrollbar.
- **Playfair and the Devanagari face need line-height above 1.** At `1` their
  descenders and matras are clipped.
- Icons sit in fixed `.ic-slot--*` boxes so a row of them optically aligns.
- **Scope rules by child, not by descendant.** `.field label` and `.field .ic`
  both matched the signup role pickers (which are `<label>` elements inside
  `.field`) and silently beat `.role-opt` on specificity — the icon went
  `position:absolute` and sat on top of the text. Use `.field > label` and
  `.field .input-wrap > .ic`.
- **Sections share one container width.** The header, hero and card grids all
  use `--container-wide`, so the logo and the headline share a left edge at
  every viewport width.

## Deployment

`vercel.json` serves the repo root as static output with clean URLs.
`dev/`, the reference screenshot and `*.raw` are excluded in `.vercelignore`.