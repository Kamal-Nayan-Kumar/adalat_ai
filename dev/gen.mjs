// Generate one asset in the approved ChatGPT chat.
// Edit PROMPT and OUT, then run:  ego-browser nodejs < dev/gen.mjs
import { writeFileSync } from "node:fs";

const SPACE = 2;
const CHAT = "https://chatgpt.com/c/6ac0e121-3120-83ee-a35a-b99f1d0266e8";

const PROMPT = `Create a symmetrical flat vector illustration of an Indian courtroom, viewed straight on from the centre, 3:2 landscape aspect ratio.

Scene: a grand courtroom with perfect left-right symmetry. A tall carved wooden judge's bench dead centre, with a large empty blank wooden name plate on the front of the bench. The Lion Capital of Ashoka emblem centred above the bench inside a tall arched niche. One tall arched window on each side with warm golden light. One Indian national flag on each side of the bench, angled symmetrically. Neat stacks of three leather law books on the lower left and the matching three on the lower right, identical and mirrored. A single wooden judge's gavel resting on the desk in the centre foreground. A brass scales of justice sitting on the desk, left of centre. An open blank paper file lying flat on the desk in the centre.

Style: flat vector illustration, clean geometric shapes, confident confident confident simple, no gradients on the subject, no 3D, no photorealism, no drop shadows, thin confident line work.

Palette strictly limited to: deep maroon #6E1217, dark crimson #531017, ink #300C0E, gold #CE8732, warm ivory #FEFCF7, soft peach #FDF3E4.

Composition requirement, very important: the composition must be bilaterally symmetrical, as if reflected down a vertical centre line. Keep the whole background a flat warm ivory #FEFCF7 so it blends into a page. Leave clear empty ivory space along the very bottom fifth of the image for text to be added later.

Absolutely no text, no letters, no words, no numbers, no Devanagari, no watermark, no signature, no logo, no people, no faces, no hands.`;
const OUT = "/tmp/dl/court-front.png";

const task = await taskSpace(SPACE);
const page = task.page("p1");
await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });
await page.goto(CHAT);
await page.waitForTimeout(5000);

await page.click("css=.ProseMirror", { label: "focus chat composer" });
await page.waitForTimeout(500);
await page.keyboard.type(PROMPT, { delay: 1 });
await page.waitForTimeout(600);
await page.keyboard.press("Enter");

const before = await page.evaluate(
  () =>
    [...document.querySelectorAll("img")].filter(
      (i) => i.naturalWidth > 900 && i.naturalHeight > 300,
    ).length,
);
console.log("images before:", before);

let src = null;
for (let i = 0; i < 90; i++) {
  await page.waitForTimeout(3000);
  const r = await page.evaluate((b) => {
    const imgs = [...document.querySelectorAll("img")].filter(
      (i) => i.naturalWidth > 900 && i.naturalHeight > 300,
    );
    const im = imgs[imgs.length - 1];
    return { n: imgs.length, src: im ? im.src : null };
  }, before);
  if (r.n > before && r.src) {
    src = r.src;
    console.log("new image at poll", i);
    break;
  }
}
if (!src) {
  console.error("no image generated");
  process.exit(1);
}

const dataUrl = await page.evaluate(async (s) => {
  const im = new Image();
  im.crossOrigin = "anonymous";
  im.src = s;
  await im.decode();
  const c = document.createElement("canvas");
  c.width = im.naturalWidth;
  c.height = im.naturalHeight;
  c.getContext("2d").drawImage(im, 0, 0);
  return c.toDataURL("image/png");
}, src);

writeFileSync(OUT, Buffer.from(dataUrl.split(",")[1], "base64"));
console.log("ok", OUT);