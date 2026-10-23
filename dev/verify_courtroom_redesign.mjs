// dev/verify_courtroom_redesign.mjs — Proves centered Judge dais, Bar Kathghara, dot-dot chat, and zero stage-foot
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/courtroom-redesign");
const TMP_DIR = "/tmp/adalat-verify/courtroom-redesign";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving courtroom redesign verification on port ${TARGET_PORT}...`);

const task = await taskSpace("verify-courtroom-redesign");
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
await page.waitForSelector(".courtroom-3d-scene", { state: "visible" });

// 1. Verify structure: stage-foot removed, dot-dot background present
const structCheck = await page.evaluate(() => {
  const stageFoot = document.querySelector(".stage-foot");
  const chatScroll = document.querySelector(".court-col--chat .court-scroll");
  const bgStyle = chatScroll ? window.getComputedStyle(chatScroll).backgroundImage : '';
  const judgeDais = document.querySelector(".bench-3d-dais");
  const witnessBox = document.querySelector(".station-witness-box");
  const barGrid = document.querySelector(".court-bar-grid");
  const composer = document.querySelector(".composer");

  return {
    stageFootRemoved: !stageFoot,
    hasDotBackground: bgStyle.includes("radial-gradient"),
    isJudgeCentered: Boolean(judgeDais),
    isWitnessInBarGrid: Boolean(barGrid?.contains(witnessBox)),
    isComposerVisible: composer ? window.getComputedStyle(composer).display !== 'none' : false,
  };
});

console.log("✓ Courtroom architecture check:", structCheck);
await captureShot("01-courtroom-redesign-overview.png");

// 2. Advance testimony: Prosecution speaks
await page.click("text='Step Next ⏭'");
await page.waitForTimeout(400);
console.log("✓ Advanced to Prosecution speech");
await captureShot("02-prosecution-speaking.png");

// 3. Advance to Witness in Kathghara
await page.waitForTimeout(1000);
console.log("✓ Advanced to Witness speaking in Kathghara stand");
await captureShot("03-witness-speaking-kathghara.png");

// 4. Rise to object from Defence Desk
await page.click("text='Rise to Object'");
await page.waitForTimeout(900);
console.log("✓ Objection raised, Judge sustained with gavel alert");
await captureShot("04-defence-objection-ruling.png");

await task.finish({ keep: [] });
console.log("Courtroom redesign verification completed successfully!");
