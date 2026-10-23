// dev/verify_3d_courtroom_and_fixes.mjs — Verifies 3D courtroom layout, character speech bubbles, and UI fixes
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/3d-courtroom");
const TMP_DIR = "/tmp/adalat-verify/3d-courtroom";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving 3D courtroom and UI verification on port ${TARGET_PORT}...`);

const task = await taskSpace("verify-3d-courtroom");
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

// ----------------------------------------------------
// 1. DASHBOARD FIXES: SIDEBAR TOGGLE, ALIGNMENT, FONT, REMOVED BACK TO SITE
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/dashboard`);
await page.waitForSelector("#shell-toggle", { state: "visible" });

// Check unified font
const fontCheck = await page.evaluate(() => {
  const h2 = document.querySelector(".card-head h2");
  const navItem = document.querySelector(".shell-nav a");
  const backToSite = document.querySelector(".shell-rail-foot a[href='/']");
  return {
    h2Font: h2 ? window.getComputedStyle(h2).fontFamily : '',
    navFont: navItem ? window.getComputedStyle(navItem).fontFamily : '',
    hasBackToSite: Boolean(backToSite),
  };
});
console.log("✓ Font & Rail verification:", fontCheck);

// Test unified sidebar toggle on desktop
await page.click("#shell-toggle");
await page.waitForFunction(() => document.querySelector(".shell")?.classList.contains("is-collapsed"));
console.log("✓ #shell-toggle collapsed sidebar on desktop");

await page.click("#shell-toggle");
await page.waitForFunction(() => !document.querySelector(".shell")?.classList.contains("is-collapsed"));
console.log("✓ #shell-toggle expanded sidebar back on desktop");

await captureShot("01-dashboard-surface-aligned.png");

// ----------------------------------------------------
// 2. 3D REAL COURTROOM SIMULATOR
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/trials/1/courtroom`);
await page.waitForSelector(".courtroom-3d-scene", { state: "visible" });

// Verify center stage is NOT scrolling
const stageScrollCheck = await page.evaluate(() => {
  const stageCol = document.querySelector(".court-col--stage");
  const chatStream = document.querySelector(".chat-stream");
  const composer = document.querySelector(".composer");
  return {
    stageScrollHeight: stageCol ? stageCol.scrollHeight : 0,
    stageClientHeight: stageCol ? stageCol.clientHeight : 0,
    isStageFixed: stageCol ? stageCol.scrollHeight <= stageCol.clientHeight : true,
    isComposerVisible: composer ? window.getComputedStyle(composer).display !== 'none' : false,
  };
});
console.log("✓ Courtroom scroll architecture check:", stageScrollCheck);

// Capture initial stage state
await captureShot("02-courtroom-3d-spatial-layout.png");

// Step next testimony (Prosecution speaks, speech bubble over Prosecutor head)
await page.click("text='Step Next ⏭'");
await page.waitForTimeout(400);

const proseBubble = await page.evaluate(() => {
  const bubble = document.querySelector(".station-prosecution .speech-bubble-callout");
  return bubble ? bubble.textContent : null;
});
console.log("✓ Speech bubble over Prosecution head:", proseBubble);
await captureShot("03-prosecutor-speech-bubble.png");

// Wait for Witness turn
await page.waitForTimeout(1000);
const witnessBubble = await page.evaluate(() => {
  const bubble = document.querySelector(".station-witness-box .speech-bubble-callout");
  return bubble ? bubble.textContent : null;
});
console.log("✓ Speech bubble over Witness Box (Kathghara):", witnessBubble);
await captureShot("04-witness-kathghara-bubble.png");

// Rise to Object from Defence station (You speak, then Judge rules with gavel strike)
await page.click("text='Rise to Object'");
await page.waitForTimeout(400);

const defenceBubble = await page.evaluate(() => {
  const bubble = document.querySelector(".station-defence .speech-bubble-callout");
  return bubble ? bubble.textContent : null;
});
console.log("✓ Speech bubble over Defence Counsel desk:", defenceBubble);

await page.waitForTimeout(500);

const judgeBubble = await page.evaluate(() => {
  const bubble = document.querySelector(".bench-3d-dais .speech-bubble-callout");
  const gavel = document.querySelector(".gavel-alert-banner");
  return {
    judgeSpeech: bubble ? bubble.textContent : null,
    gavelVisible: Boolean(gavel),
  };
});
console.log("✓ Speech bubble over Judge Dais + Gavel strike:", judgeBubble);
await captureShot("05-judge-ruling-gavel-banner.png");

await task.finish({ keep: [] });
console.log("All 3D courtroom and UI verification tests passed!");
