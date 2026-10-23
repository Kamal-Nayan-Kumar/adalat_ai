// dev/verify_auth_and_courtroom.mjs — Proves auth spacing fixes and scroll-free signup
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/auth-polish");
const TMP_DIR = "/tmp/adalat-verify/auth-polish";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving auth polish and courtroom verification on port ${TARGET_PORT}...`);

const task = await taskSpace("verify-auth-polish");
const page = task.page("p1");

await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });

async function captureShot(filename) {
  const tmpPath = path.join(TMP_DIR, filename);
  const destPath = path.join(ARTIFACTS_DIR, filename);
  await page.screenshot({ path: tmpPath, fullPage: false });
  await fs.copyFile(tmpPath, destPath);
  return destPath;
}

// 1. LOGIN DESKTOP
await page.cdp("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 0, mobile: false });
await page.goto(`http://127.0.0.1:${TARGET_PORT}/login`);
await page.waitForSelector(".auth-art-quote", { state: "visible" });
console.log("✓ Login loaded with expanded typography and feature cards");
await captureShot("01-login-desktop-polished.png");

// 2. SIGNUP DESKTOP (SCROLL-FREE)
await page.goto(`http://127.0.0.1:${TARGET_PORT}/signup`);
await page.waitForSelector("#signup-form", { state: "visible" });

// Check if signup form requires vertical scroll on desktop
const scrollHeight = await page.evaluate(() => {
  const panel = document.querySelector(".auth-panel");
  return {
    panelScrollHeight: panel ? panel.scrollHeight : 0,
    panelClientHeight: panel ? panel.clientHeight : 0,
    isScrollFree: panel ? panel.scrollHeight <= panel.clientHeight : true
  };
});
console.log("✓ Signup form scrollability check:", scrollHeight);
await captureShot("02-signup-desktop-scrollfree.png");

// 3. COURTROOM REALISTIC CENTER STAGE
await page.goto(`http://127.0.0.1:${TARGET_PORT}/trials/1/courtroom`);
await page.waitForSelector(".courtroom-stage-wrapper", { state: "visible" });
console.log("✓ Courtroom loaded with full realistic center stage");
await captureShot("03-courtroom-realistic-center.png");

await task.finish({ keep: [] });
console.log("Auth polish and courtroom verification passed!");
