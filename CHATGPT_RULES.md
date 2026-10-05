# CHATGPT_RULES.md

Rules for generating every visual asset for Adalat AI.

ChatGPT chat used for all generation (do NOT open any other personal chat):

    https://chatgpt.com/c/6ac0e121-3120-83ee-a35a-b99f1d0266e8

---

## 1. Which chat

- Use **only** the "Landing Page Design" chat above.
- Never click "New chat". Never open the sidebar history.
- All generations go at the bottom of that one conversation, in order.

## 2. How to ask

- Type the instruction, then a line break, then the literal trigger `@create image`, then the prompt.
- One asset per message. Wait for the image to finish rendering before sending the next message.
- Never send two prompts in the same message.
- Keep prompts in English only.

## 3. Brand constants (always repeat these in every prompt)

| Token | Value |
|---|---|
| Deep maroon | `#6E1217` |
| Ink / near black | `#300C0E` |
| Gold / amber | `#CE8732` |
| Brick / muted red | `#A85D4E` |
| Ivory background | `#FEFCF7` |
| Peach tint | `#FDF3E4` |

Rules that always go in the prompt:

- "flat vector illustration, **no text, no letters, no words, no watermark, no signature**"
- "**no people, no faces, no hands**"
- "consistent style: single flat-colour style, no gradients on the subject, no 3D, no photorealism, no drop shadows"
- "palette strictly limited to deep maroon #6E1217, ink #300C0E, gold #CE8732, ivory #FEFCF7"

## 4. What ChatGPT generates vs. what is hand-built

| Asset | Source | Reason |
|---|---|---|
| Logo mark (scales) | ChatGPT image | Needs illustration quality |
| Hero courtroom illustration | ChatGPT image | Needs illustration quality |
| CTA banner background | ChatGPT image | Needs illustration quality |
| Symmetric courtroom (courtroom stage) | ChatGPT image | Needs illustration quality |
| Auth page side illustration | ChatGPT image | Needs illustration quality |
| Empty-state illustrations | ChatGPT image | Needs illustration quality |
| **All UI icons** | **Lucide icon set** | Icons must match in weight and grid. Lucide is one library on one 24x24 grid with one 2px stroke, so it is consistent by construction. AI-rendered and hand-drawn sets never are. See `assets/icons.svg` and `dev/build_icons_from_lucide.py`. |
| **All text in UI** | **HTML/CSS** | Text baked into an image cannot be aligned, localised or made responsive. |
| **All charts** | **Inline SVG** | Needs real data and responsive sizing. |

Never paste text into a generated image. The CTA banner and hero copy are HTML layered
on top of the image.

## 5. Icon system (Lucide, non-negotiable)

**Do not generate icons. Do not draw them. Use Lucide.**

Every UI icon in `assets/icons.svg` is a Lucide glyph, kept as a `<symbol>` with
our `i-*` id. Lucide is one library on one 24x24 grid with one 2px round-capped
stroke, which is what makes a set look consistent.

Rules:

- Never hand-draw or AI-generate an icon. Pick the closest Lucide name and add
  it to `MAPPING` in `dev/build_icons_from_lucide.py`, then run:
  ```bash
  python3 dev/build_icons_from_lucide.py
  python3 dev/inject_sprite.py
  ```
- Grid and stroke are the library's. Do not add `stroke-width` to a symbol —
  the single value lives in `.ic` in `styles.css`.
- Colour: `currentColor`. Never hard-code a hex inside a symbol.
- Size comes from CSS (`.ic`, `.is-xs` … `.is-2xl`), never from a `width` or
  `height` attribute on `<svg>`.
- Usage: `<svg class="ic is-md"><use href="#i-scale"/></svg>`

## 6. Asset file rules

- Output format: PNG with transparency for icons/marks, PNG or WebP for illustrations.
- Name: kebab-case, prefixed by role — `logo-`, `hero-`, `banner-`, `empty-`.
- Save under `assets/`.
- Record the exact prompt in `PROMPTS.md`.
- After downloading, verify the real dimensions with `sips` before using it.