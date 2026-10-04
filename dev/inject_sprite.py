"""Inject the icon sprite into every page between the sprite markers.

Why inline instead of <use href="assets/icons.svg#id">: external SVG references do
not render in the Chromium build used for verification, and inlining removes a
network request on every page. assets/icons.svg stays the single source of truth.

Run:  python3 dev/inject_sprite.py
"""
import glob
import re
import xml.dom.minidom

START = '<!--sprite:start-->'
END = '<!--sprite:end-->'

sprite = open('assets/icons.svg').read()
# Validate before injecting so a broken sprite never lands in a page.
xml.dom.minidom.parseString(sprite)
clean = re.sub(r'<!--.*?-->', '', sprite, flags=re.S)
inner = re.search(r'<svg[^>]*>(.*)</svg>\s*$', clean, flags=re.S).group(1)

block = (
    START + '\n'
    '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;'
    'height:0;overflow:hidden" aria-hidden="true" focusable="false">'
    + inner.strip() + '</svg>\n' + END
)

pages = sorted(p for p in glob.glob('*.html'))
for page in pages:
    html = open(page).read()
    if START not in html:
        print('skip (no marker):', page)
        continue
    new = re.sub(re.escape(START) + '.*?' + re.escape(END), block, html, flags=re.S)
    if new != html:
        open(page, 'w').write(new)
        print('injected:', page)
    else:
        print('already current:', page)