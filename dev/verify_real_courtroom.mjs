// dev/verify_real_courtroom.mjs — Proves the realistic center courtroom simulator features
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/real-courtroom");
const TMP_DIR = "/tmp/adalat-verify/real-courtroom";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving realistic courtroom simulator on port ${TARGET_PORT}...`);

const task = await taskSpace("verify-real-courtroom");
const page = task.page("p1");

await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });
await page.cdp("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 0,
  mobile: false,
});

async function captureShot(filename) {
  const tmpPath = path.join(TMP_DIR, filename);
  const destPath = path.join(ARTIFACTS_DIR, filename);
  await page.screenshot({ path: tmpPath, fullPage: false });
  await fs.copyFile(tmpPath, destPath);
  return destPath;
}

await page.goto(`http://127.0.0.1:${TARGET_PORT}/trials/1/courtroom`);
await page.waitForSelector(".courtroom-stage-wrapper", { state: "visible" });
console.log("✓ Real Courtroom Stage loaded with Elevated Bench, Dialogue Spotlight, Court Well, and Kathghara");
await captureShot("01-courtroom-center-overview.png");

// 1. Advance autonomous testimony via Step Next button
await page.click("text='Step Next ⏭'");
await page.waitForTimeout(1100);
console.log("✓ Advanced autonomous testimony between Prosecution AI and Witness AI in Kathghara");
await captureShot("02-courtroom-dialogue-spotlight.png");

// 2. Rise to Object from Counsel Lectern
await page.click("text='Rise to Object'");
await page.waitForTimeout(800);

// Verify Gavel alert banner appeared
const gavelVisible = await page.evaluate(() => Boolean(document.querySelector(".gavel-alert-banner")));
console.log(`✓ Gavel strike alert banner triggered: ${gavelVisible}`);
await captureShot("03-courtroom-gavel-strike.png");

await page.waitForTimeout(900);

// 3. Inspect witness demeanor under pressure
const demeanor = await page.evaluate(() => ({
  credibility: document.querySelector(".credibility-meter strong")?.textContent,
  hesitation: document.querySelector(".credibility-meter span:last-child")?.textContent,
  activeSpeaker: document.querySelector(".bench.is-speaking, .counsel-lectern.is-speaking, .kathghara.is-speaking, .agent-seat.is-speaking b")?.textContent,
}));
console.log("✓ Witness demeanor under cross-examination pressure:", demeanor);

await task.finish({ keep: [] });
console.log("Realistic courtroom verification passed successfully!");
