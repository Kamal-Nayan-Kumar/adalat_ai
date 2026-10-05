"""Resize and compress the raster assets for the web.

The ChatGPT downloads are 1672-2171px wide PNGs at ~2 MB each, roughly 6.5 MB of
images on the landing page alone. Each one is displayed far smaller than that, so
this writes right-sized WebP plus a PNG fallback and keeps the originals out of the
repo path used by the pages.

Run:  python3 dev/optimize_assets.py
"""
from PIL import Image
import os

# source -> (display width in CSS px, PNG fallback width, webp quality)
PLAN = {
    'hero-courtroom': (1200, 1200, 82),   # hero right-hand illustration
    'banner-cta':     (2000, 1600, 80),   # full-bleed CTA band
    'auth-panel':     (900,  900,  80),   # auth page side panel
    'court-front':    (1400, 1200, 80),   # symmetric courtroom, courtroom stage backdrop
    'logo-mark':      (160,  160,  90),   # shown at 24-44px, needs a crisp mark
}

ASSETS = 'assets'

for name, (webp_w, png_w, q) in PLAN.items():
    src = os.path.join(ASSETS, f'{name}.png')
    if not os.path.exists(src):
        print('skip (missing):', src)
        continue

    im = Image.open(src).convert('RGBA' if name == 'logo-mark' else 'RGB')

    # PNG fallback at the size actually needed
    png_out = os.path.join(ASSETS, f'{name}.png')
    out = im.copy()
    if out.width > png_w:
        h = round(out.height * png_w / out.width)
        out = out.resize((png_w, h), Image.LANCZOS)
    out.save(png_out, optimize=True)

    # WebP for browsers that support it
    w_out = im.copy()
    if w_out.width > webp_w:
        h = round(w_out.height * webp_w / w_out.width)
        w_out = w_out.resize((webp_w, h), Image.LANCZOS)
    w_out.save(os.path.join(ASSETS, f'{name}.webp'), 'WEBP', quality=q, method=6)

    print(f'{name:<16} png {out.width}x{out.height} {os.path.getsize(png_out)//1024:>5} KB'
          f'   webp {w_out.width}x{w_out.height} '
          f'{os.path.getsize(os.path.join(ASSETS, name + ".webp"))//1024:>4} KB')