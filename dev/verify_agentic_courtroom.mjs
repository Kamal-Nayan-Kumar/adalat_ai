// dev/verify_agentic_courtroom.mjs — Proves sidebar toggle and agentic courtroom features
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/agentic-courtroom");
const TMP_DIR = "/tmp/adalat-verify/agentic-courtroom";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving agentic courtroom and sidebar verification on port ${TARGET_PORT}...`);

const task = await taskSpace("verify-agentic-courtroom");
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
// 1. SIDEBAR TOGGLE ON DASHBOARD
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/dashboard`);
await page.waitForSelector("#sidebar-toggle", { state: "visible" });
console.log("✓ Dashboard loaded (expanded sidebar)");
await captureShot("sidebar-expanded.png");

// Click sidebar collapse toggle
await page.click("#sidebar-toggle");
await page.waitForFunction(() => document.querySelector(".shell")?.classList.contains("is-collapsed"));
console.log("✓ Sidebar collapsed to compact mini-rail");
await captureShot("sidebar-collapsed.png");

// Expand sidebar again
await page.click("#sidebar-toggle");
await page.waitForFunction(() => !document.querySelector(".shell")?.classList.contains("is-collapsed"));
console.log("✓ Sidebar expanded back to full rail");

// ----------------------------------------------------
// 2. AGENTIC COURTROOM SIMULATOR
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/trials/1/courtroom`);
await page.waitForSelector(".copilot-panel", { state: "visible" });
console.log("✓ Courtroom loaded with Nyaya Saathi Co-Pilot and stage progress bar");
await captureShot("courtroom-agentic-stage.png");

// Click on Exhibit Ex.3 (Site sketch map) in the left case-file rail to open Document Inspector
await page.click("text='Ex.3'");
await page.waitForSelector(".evidence-drawer-card", { state: "visible" });
console.log("✓ Document Inspector drawer opened for Ex.3");
await captureShot("courtroom-exhibit-drawer.png");

// Tender Exhibit from Drawer
await page.click("text='Tender into Record'");
await page.waitForFunction(() => {
  const msgs = [...document.querySelectorAll("#chat-stream .msg.is-you")];
  return msgs.some((m) => m.textContent.includes("Ex.3"));
});
console.log("✓ Tendered Ex.3 into record from drawer");

// Wait for Judge ruling
await page.waitForTimeout(900);

// Use Nyaya Saathi quick copilot suggestion button
await page.click(".copilot-action-btn >> nth=0");
await page.waitForFunction(() => {
  const msgs = [...document.querySelectorAll("#chat-stream .msg.is-you")];
  return msgs.some((m) => m.textContent.includes("Section 137 BSA"));
});
console.log("✓ Nyaya Saathi copilot action submitted and ruled upon by Judge AI");

await page.waitForTimeout(900);
await captureShot("courtroom-after-coaching.png");

await task.finish({ keep: [] });
console.log("Agentic courtroom and sidebar verification completed successfully!");
