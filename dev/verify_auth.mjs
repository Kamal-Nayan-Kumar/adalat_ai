// dev/verify_auth.mjs — Proves the auth-and-role-onboarding feature end-to-end
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/verify-adalat/auth");
const TMP_DIR = "/tmp/adalat-verify/auth";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving auth onboarding verification on http://127.0.0.1:${TARGET_PORT}/signup...`);

const task = await taskSpace("verify-auth-proof");
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
  await page.screenshot({ path: tmpPath });
  await fs.copyFile(tmpPath, destPath);
  return destPath;
}

// 1. Open signup page
await page.goto(`http://127.0.0.1:${TARGET_PORT}/signup`);
await page.waitForSelector(".auth-form", { state: "visible" });

// 2. Select Judiciary Aspirant role
await page.click("text='Judiciary aspirant'");
await page.waitForFunction(() => {
  const aspirant = document.querySelector("input[value='aspirant']");
  return aspirant && aspirant.checked;
});
console.log("✓ Judiciary Aspirant role selected");

// 3. Fill registration inputs
await page.fill("#first", "Aarav");
await page.fill("#last", "Sharma");
await page.fill("#email", "aarav@example.com");
await page.fill("#password", "Practice2026!");
await page.click("#terms");

await captureShot("signup-form-filled.png");
console.log("✓ Registration fields filled");

// 4. Submit form and verify navigation to onboarding
await page.click("button[type='submit']");
await page.waitForURL("**/onboarding*");
console.log(`✓ Navigation to onboarding succeeded: ${await page.url()}`);

// 5. Test login page flow
await page.goto(`http://127.0.0.1:${TARGET_PORT}/login`);
await page.waitForSelector(".auth-form", { state: "visible" });
await page.fill("#email", "aarav@example.com");
await page.fill("#password", "Practice2026!");
await page.click("button[type='submit']");
await page.waitForURL("**/dashboard*");
console.log(`✓ Login flow submission navigated to: ${await page.url()}`);

// Save JSON evidence receipt
const authReceipt = {
  signupFlow: "verified",
  roleSelection: "aspirant",
  loginFlow: "verified",
  destinationUrl: "dashboard.html",
};
await fs.writeFile(path.join(ARTIFACTS_DIR, "auth-evidence.json"), JSON.stringify(authReceipt, null, 2), "utf-8");

await task.finish({ keep: [] });
console.log("Auth and onboarding verification completed successfully!");
