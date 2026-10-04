// gen.mjs — generate one asset in the approved ChatGPT chat, save it locally.
// Edit PROMPT and OUT, then run:  ego-browser nodejs dev/gen.mjs
import { writeFileSync } from "node:fs";

const SPACE = 2;
const CHAT = "https://chatgpt.com/c/6ac0e121-3120-83ee-a35a-b99f1d0266e8";

const PROMPT = `Create a tall vertical flat vector illustration for a website sign-in page side panel, 3:4 portrait aspect ratio.

Scene: a calm organised study desk seen straight on. A neat stack of closed leather law books, an open law book with visible blank pages, a wooden gavel resting on the desk, a brass scales of justice, a closed laptop, a small Indian flag on a stand, a pen holder.

Style: flat vector illustration, clean geometric shapes, confident confident confident simple, no gradients on the subject, no 3D, no photorealism, no drop shadows, thin confident line work, generous empty space.

Palette strictly limited to: deep maroon #6E1217, ink #300C0E, gold #CE8732, warm ivory #FEFCF7, soft peach #FDF3E4.

Composition requirement, very important: keep the TOP 35 PERCENT completely empty plain flat deep maroon #6E1217, because a logo and headings will be placed there later. All objects must sit in the BOTTOM 65 PERCENT.

Absolutely no text, no letters, no words, no numbers, no watermark, no signature, no logo, no people, no faces, no hands.`;
const OUT = "/tmp/dl/auth.png";

const task = await taskSpace(SPACE);
const page = task.page("p1");
await page.goto(CHAT);
await page.waitForTimeout(4000);

await page.click("css=.ProseMirror", { label: "focus chat composer" });
await page.waitForTimeout(400);
await page.keyboard.type(PROMPT, { delay: 1 });
await page.waitForTimeout(500);
await page.keyboard.press("Enter");

const base = await page.evaluate(
  () =>
    [...document.querySelectorAll("img")].filter(
      (i) => i.naturalWidth > 900 && i.naturalHeight > 300,
    ).length,
);
console.log("images before:", base);

let src = null;
for (let i = 0; i < 80; i++) {
  await page.waitForTimeout(3000);
  const r = await page.evaluate((b) => {
    const imgs = [...document.querySelectorAll("img")].filter(
      (i) => i.naturalWidth > 900 && i.naturalHeight > 300,
    );
    const im = imgs[imgs.length - 1];
    return { n: imgs.length, src: im ? im.src : null };
  }, base);
  if (r.n > base && r.src) {
    src = r.src;
    console.log("new image at poll", i);
    break;
  }
}
if (!src) {
  console.error("no image");
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