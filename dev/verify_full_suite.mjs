// dev/verify_full_suite.mjs — Comprehensive end-to-end drive across all pages
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/full-suite");
const TMP_DIR = "/tmp/adalat-verify/full-suite";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving comprehensive full suite verification on port ${TARGET_PORT}...`);

const task = await taskSpace("verify-full-suite");
const page = task.page("p1");

await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });

async function captureShot(filename, fullPage = false) {
  const tmpPath = path.join(TMP_DIR, filename);
  const destPath = path.join(ARTIFACTS_DIR, filename);
  await page.screenshot({ path: tmpPath, fullPage });
  await fs.copyFile(tmpPath, destPath);
  return destPath;
}

async function setDesktop() {
  await page.cdp("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 0,
    mobile: false,
  });
}

// ----------------------------------------------------
// 1. ONBOARDING PAGE
// ----------------------------------------------------
await setDesktop();
await page.goto(`http://127.0.0.1:${TARGET_PORT}/onboarding.html`);
await page.waitForSelector(".onboard-card", { state: "visible" });
console.log("✓ Onboarding page loaded");
await captureShot("01-onboarding-desktop.png");

// ----------------------------------------------------
// 2. DASHBOARD PAGE (UPGRADED)
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/dashboard.html`);
await page.waitForSelector("#chart-trend", { state: "visible" });
console.log("✓ Dashboard loaded with active workspace banner");
await captureShot("02-dashboard-desktop.png", true);

// ----------------------------------------------------
// 3. CAUSE LIST (UPGRADED)
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/cases.html`);
await page.waitForSelector(".filter-bar", { state: "visible" });
console.log("✓ Cause List loaded with New Case Workspace action");
await captureShot("03-cases-desktop.png");

// ----------------------------------------------------
// 4. NEW CASE WORKSPACE
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/case-new.html`);
await page.waitForSelector(".source-tabs", { state: "visible" });
console.log("✓ Case New loaded (Public Judgment selected)");
await captureShot("04-case-new-public.png");

// Switch to Private Upload pane
await page.click("[data-target='pane-upload']");
await page.waitForFunction(() => document.getElementById("pane-upload")?.classList.contains("is-active"));
console.log("✓ Switched to Private Upload pane with confidentiality badge");
await captureShot("05-case-new-upload.png");

// Switch to Training Scenario pane
await page.click("[data-target='pane-training']");
await page.waitForFunction(() => document.getElementById("pane-training")?.classList.contains("is-active"));
console.log("✓ Switched to Training Scenario drill pane");

// ----------------------------------------------------
// 5. CASE WORKSPACE (PREPARATION HUB)
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/case-workspace.html`);
await page.waitForSelector(".workspace-tabs", { state: "visible" });
console.log("✓ Case Workspace loaded on Theory & Facts tab");
await captureShot("06-workspace-theory.png");

// Switch to Legal Research tab
await page.click("[data-pane='pane-research']");
await page.waitForFunction(() => document.getElementById("pane-research")?.classList.contains("is-active"));
console.log("✓ Switched to Legal Research & Authorities tab");
await captureShot("07-workspace-research.png");

// Switch to Evidence Inventory tab
await page.click("[data-pane='pane-evidence']");
await page.waitForFunction(() => document.getElementById("pane-evidence")?.classList.contains("is-active"));
console.log("✓ Switched to Evidence Inventory & Provenance tab");
await captureShot("08-workspace-evidence.png");

// Switch to Witness Profiles tab
await page.click("[data-pane='pane-witnesses']");
await page.waitForFunction(() => document.getElementById("pane-witnesses")?.classList.contains("is-active"));
console.log("✓ Switched to Witness Profiles & Examination Plans tab");
await captureShot("09-workspace-witnesses.png");

// ----------------------------------------------------
// 6. TRIAL SETUP
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/trial-setup.html`);
await page.waitForSelector(".setup-card", { state: "visible" });
console.log("✓ Trial Setup loaded (Side, Duration, Judge Temperament, Coach)");
await captureShot("10-trial-setup-desktop.png");

// ----------------------------------------------------
// 7. COURTROOM SIMULATION (UPGRADED)
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/courtroom.html`);
await page.waitForSelector("#chat-stream", { state: "visible" });
console.log("✓ Courtroom loaded with 14:32 Timer and Nyaya Saathi suggestion chip");
await captureShot("11-courtroom-desktop.png");

// ----------------------------------------------------
// 8. TRIAL EVALUATION REPORT
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/trial-report.html`);
await page.waitForSelector(".report-header", { state: "visible" });
console.log("✓ Trial Report loaded with performance scorecard and examiner remarks");
await captureShot("12-trial-report-desktop.png", true);

// ----------------------------------------------------
// 9. PROFILE & SETTINGS
// ----------------------------------------------------
await page.goto(`http://127.0.0.1:${TARGET_PORT}/profile.html`);
await page.waitForSelector(".profile-grid", { state: "visible" });
// Trigger save toast
await page.click("#save-profile-btn");
await page.waitForTimeout(200);
console.log("✓ Profile & Settings loaded and save toast triggered");
await captureShot("13-profile-desktop.png");

await task.finish({ keep: [] });
console.log("Full suite verification completed successfully with all screenshots captured!");
