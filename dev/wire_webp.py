"""Wire the WebP variants into the pages with <picture> + PNG fallback."""
import glob

PIC = (
    '<picture>\n'
    '    <source srcset="assets/{n}.webp" type="image/webp">\n'
    '    <img src="assets/{n}.png" alt="{alt}" width="{w}" height="{h}"{extra}>\n'
    '  </picture>'
)

# ---- index.html: hero + CTA banner get <picture>; logo mark stays a plain img ----
s = open('index.html').read()
s = s.replace(
    '<link rel="preload" as="image" href="assets/hero-courtroom.png">',
    '<link rel="preload" as="image" href="assets/hero-courtroom.webp" type="image/webp">',
)
s = s.replace(
    '      <img src="assets/hero-courtroom.png" alt="" width="1672" height="941">',
    '      <img src="assets/hero-courtroom.png" alt="" width="1200" height="675">',
)
s = s.replace(
    '  <img src="assets/banner-cta.png" alt="" aria-hidden="true" width="2171" height="724">',
    PIC.format(n='banner-cta', alt='', w=1600, h=534, extra=' aria-hidden="true"'),
)
open('index.html', 'w').write(s)

# ---- auth pages: the side panel becomes a <picture> ----
for p in ('login.html', 'signup.html'):
    s = open(p).read()
    s = s.replace(
        '<img class="auth-art-bg" src="assets/auth-panel.png" alt="" aria-hidden="true"'
        ' width="1086" height="1448">',
        '<picture>\n'
        '    <source class="auth-art-bg" srcset="assets/auth-panel.webp" type="image/webp">\n'
        '    <img class="auth-art-bg" src="assets/auth-panel.png" alt="" aria-hidden="true"'
        ' width="900" height="1200">\n'
        '  </picture>',
    )
    open(p, 'w').write(s)

for f in sorted(glob.glob('*.html')):
    print(f, open(f).read().count('<picture>'), 'picture blocks')