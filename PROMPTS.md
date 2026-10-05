# PROMPTS.md

Every ChatGPT image generated for Adalat AI, in the order it was requested.

All from the single approved chat:
<https://chatgpt.com/c/6ac0e121-3120-83ee-a35a-b99f1d0266e8>

Rules for using that chat live in `CHATGPT_RULES.md`.

---

## 1. Hero illustration → `assets/hero-courtroom.png`

```text
Create a wide flat vector illustration for a website hero banner, 16:9 landscape aspect ratio.

Scene: a grand Indian courtroom interior seen from the front. Tall arched windows with
warm golden light, carved wooden judge's bench in the centre, the Lion Capital of Ashoka
emblem above the bench, two Indian national flags flanking the bench, stacks of leather
law books on the floor in the foreground, a wooden gavel resting on the desk, an open
paper file.

Style: flat vector illustration, clean geometric shapes, subtle warm light rays, no
gradients on the subject, no 3D, no photorealism, no drop shadows.

Palette strictly limited to: deep maroon #6E1217, ink #300C0E, gold #CE8732, warm ivory
#FEFCF7, soft peach #FDF3E4.

Composition requirement, this is very important: keep the LEFT 30 PERCENT of the image
almost empty — just a plain flat warm ivory #FEFCF7 background with nothing on it, so
text can be placed over it later. Put all the courtroom detail in the RIGHT 70 PERCENT.
No hard vertical edge separating the empty area, it must fade smoothly.

Strictly no text, no letters, no words, no numbers, no watermark, no signature, no logo,
no people, no faces, no hands.
```

Result: 1672 x 941. Output as `hero-courtroom.png`, then resized to 1200 wide
plus a WebP by `dev/optimize_assets.py`.

---

## 2. CTA banner background → `assets/banner-cta.png`

```text
Create an ultra-wide flat vector illustration for a website call-to-action banner, 5:1
aspect ratio, very wide and short.

Scene: a wide panoramic silhouette skyline of Indian judicial architecture across the
bottom half — a domed parliament-style building, a colonial-style high court with
columns, tiered temple-like court buildings. Rendered as clean flat shapes in deep
maroon silhouette over a deep maroon to dark crimson background.

Style: flat vector, geometric, monochrome tonal, no gradients on the subject, no 3D, no
photorealism, no drop shadows.

Palette strictly limited to: deep maroon #6E1217, dark crimson #531017, ink #300C0E,
with a very subtle gold #CE8732 rim light on the top edges of the domes.

Composition requirement, very important: keep the LEFT 60 PERCENT of the image almost
completely empty — plain flat deep maroon #531017 with nothing on it, so white text can
be placed over it later. All the building silhouettes must sit in the RIGHT 40 PERCENT
and along the very bottom edge. No hard vertical seam, it must fade smoothly.

Absolutely no text, no letters, no words, no numbers, no watermark, no signature, no
logo, no people, no faces, no hands.
```

Result: 2171 x 724. The headline and button are HTML over this image, not baked in.

---

## 3. Auth page side panel → `assets/auth-panel.png`

```text
Create a tall vertical flat vector illustration for a website sign-in page side panel,
3:4 portrait aspect ratio.

Scene: a calm organised study desk seen straight on. A neat stack of closed leather law
books, an open law book with visible blank pages, a wooden gavel resting on the desk, a
brass scales of justice, a closed laptop, a small Indian flag on a stand, a pen holder.

Style: flat vector illustration, clean geometric shapes, confident confident confident
simple, no gradients on the subject, no 3D, no photorealism, no drop shadows, thin
confident line work, generous empty space.

Palette strictly limited to: deep maroon #6E1217, ink #300C0E, gold #CE8732, warm ivory
#FEFCF7, soft peach #FDF3E4.

Composition requirement, very important: keep the TOP 35 PERCENT completely empty plain
flat deep maroon #6E1217, because a logo and headings will be placed there later. All
objects must sit in the BOTTOM 65 PERCENT.

Absolutely no text, no letters, no words, no numbers, no watermark, no signature, no
logo, no people, no faces, no hands.
```

Result: 1086 x 1448, resized to 900 wide plus a WebP.

Note: ChatGPT ignored the object list and returned a judicial-architecture silhouette
in the same palette. It works as the auth panel (flat maroon, empty top for the logo
and heading), so it was kept rather than spending another generation.

---

## 4. Logo mark → `assets/logo-mark.png`

Pre-existing asset, retained rather than regenerated: the scales mark in maroon and
gold already matched the palette and reads correctly down to 24 px. Resized to
160 x 129 with a WebP alongside.

## 5. Symmetric courtroom → `assets/court-front.png`

```text
Create a symmetrical flat vector illustration of an Indian courtroom, viewed straight on
from the centre, 3:2 landscape aspect ratio.

Scene: a grand courtroom with perfect left-right symmetry. A tall carved wooden judge's
bench dead centre, with a large empty blank wooden name plate on the front of the bench.
The Lion Capital of Ashoka emblem centred above the bench inside a tall arched niche. One
tall arched window on each side with warm golden light. One Indian national flag on each
side of the bench, angled symmetrically. Neat stacks of three leather law books on the
lower left and the matching three on the lower right, identical and mirrored. A single
wooden judge's gavel resting on the desk in the centre foreground. A brass scales of
justice sitting on the desk, left of centre. An open blank paper file lying flat on the
desk in the centre.

Style: flat vector illustration, clean geometric shapes, confident confident confident
simple, no gradients on the subject, no 3D, no photorealism, no drop shadows, thin
confident line work.

Palette strictly limited to: deep maroon #6E1217, dark crimson #531017, ink #300C0E, gold
#CE8732, warm ivory #FEFCF7, soft peach #FDF3E4.

Composition requirement, very important: the composition must be bilaterally symmetrical,
as if reflected down a vertical centre line. Keep the whole background a flat warm ivory
#FEFCF7 so it blends into a page. Leave clear empty ivory space along the very bottom fifth
of the image for text to be added later.

Absolutely no text, no letters, no words, no numbers, no Devanagari, no watermark, no
signature, no logo, no people, no faces, no hands.
```

Result: 1536 x 1024. Used as the backdrop of the centre stage on `courtroom.html`,
which had been a flat empty panel. Resized to 1200 wide plus a WebP.

---

## Icons — not generated

UI icons come from **Lucide** (https://lucide.dev, MIT), vendored into
`assets/icons.svg` by `dev/build_icons_from_lucide.py`.

No prompt was used for icons. AI-rendered icons never share weight, grid or
optical size with each other, which is what makes a set look like it came from
several different icon packs. Lucide is a single library on a single 24x24 grid
with a single 2px stroke, so it looks like one set by construction.

Mapping used (our id -> Lucide name):

```
i-judge -> gavel          i-scales -> scale           i-shield -> shield
i-witness -> user-round   i-cap -> graduation-cap     i-landmark -> landmark
i-chart-bars -> chart-column  i-book -> book-open     i-people -> users
i-calendar -> calendar    i-doc -> file-text         i-gavel -> gavel
i-doc-check -> file-check i-doc-lines -> files       i-chart-line -> chart-line
i-radar -> radar          i-gear -> settings          i-search -> search
i-play -> circle-play     i-check-circle -> circle-check  i-alert -> triangle-alert
i-gavel-lite -> hammer    i-home -> house             i-close -> x
```
plus the straightforward arrow/chevron/menu/check/send/download/clock/flame/
trophy/filter/mail/lock/user/bell/plus/logout/shield-check names.