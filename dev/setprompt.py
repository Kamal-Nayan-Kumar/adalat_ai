import re

PROMPT = """Create a symmetrical flat vector illustration of an Indian courtroom, viewed straight on from the centre, 3:2 landscape aspect ratio.

Scene: a grand courtroom with perfect left-right symmetry. A tall carved wooden judge's bench dead centre, with a large empty blank wooden name plate on the front of the bench. The Lion Capital of Ashoka emblem centred above the bench inside a tall arched niche. One tall arched window on each side with warm golden light. One Indian national flag on each side of the bench, angled symmetrically. Neat stacks of three leather law books on the lower left and the matching three on the lower right, identical and mirrored. A single wooden judge's gavel resting on the desk in the centre foreground. A brass scales of justice sitting on the desk, left of centre. An open blank paper file lying flat on the desk in the centre.

Style: flat vector illustration, clean geometric shapes, confident confident confident simple, no gradients on the subject, no 3D, no photorealism, no drop shadows, thin confident line work.

Palette strictly limited to: deep maroon #6E1217, dark crimson #531017, ink #300C0E, gold #CE8732, warm ivory #FEFCF7, soft peach #FDF3E4.

Composition requirement, very important: the composition must be bilaterally symmetrical, as if reflected down a vertical centre line. Keep the whole background a flat warm ivory #FEFCF7 so it blends into a page. Leave clear empty ivory space along the very bottom fifth of the image for text to be added later.

Absolutely no text, no letters, no words, no numbers, no Devanagari, no watermark, no signature, no logo, no people, no faces, no hands."""

s = open('dev/gen.mjs').read()
s = re.sub(r'const PROMPT = `.*?`;', 'const PROMPT = `' + PROMPT + '`;', s, flags=re.S)
s = s.replace('/tmp/dl/out.png', '/tmp/dl/court-front.png')
open('dev/gen.mjs', 'w').write(s)
print('prompt injected')