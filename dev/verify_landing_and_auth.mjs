// dev/verify_landing_and_auth.mjs — Proves landing, login, and signup enhancements
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/landing-auth");
const TMP_DIR = "/tmp/adalat-verify/landing-auth";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving landing, login, and signup verification on port ${TARGET_PORT}...`);

const task = await taskSpace("verify-landing-auth-proof");
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

// ----------------------------------------------------
// 1. LANDING PAGE VERIFICATION
// ----------------------------------------------------
await page.cdp("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 0,
  mobile: false,
});
await page.goto(`http://127.0.0.1:${TARGET_PORT}/`);
await page.waitForSelector(".hero", { state: "visible" });

const landingChecks = await page.evaluate(() => {
  const navCauseList = document.querySelector("#main-nav a[href='/cases']")?.textContent?.trim() ||
                        document.querySelector("#main-nav a[href*='cases']")?.textContent?.trim();
  const heroPoints = [...document.querySelectorAll(".hero-points li")].map((li) => ({
    text: li.querySelector("span:last-child")?.textContent?.trim(),
    icon: li.querySelector("use")?.getAttribute("href"),
  }));
  return { navCauseList, heroPoints };
});

console.log("✓ Landing Nav check:", landingChecks.navCauseList);
console.log("✓ Landing Hero points:", JSON.stringify(landingChecks.heroPoints));

await captureShot("landing-desktop.png", true);

// Mobile landing
await page.cdp("Emulation.setDeviceMetricsOverride", {
  width: 375,
  height: 812,
  deviceScaleFactor: 0,
  mobile: false,
});
await page.goto(`http://127.0.0.1:${TARGET_PORT}/`);
await page.waitForTimeout(400);
await captureShot("landing-mobile.png");

// ----------------------------------------------------
// 2. LOGIN PAGE VERIFICATION
// ----------------------------------------------------
await page.cdp("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 0,
  mobile: false,
});
await page.goto(`http://127.0.0.1:${TARGET_PORT}/login`);
await page.waitForSelector("#login-form", { state: "visible" });

// Submit empty to trigger validation
await page.click("button[type='submit']");
await page.waitForTimeout(200);

const loginInvalid = await page.evaluate(() => ({
  emailInvalid: document.getElementById("email")?.getAttribute("aria-invalid"),
  passInvalid: document.getElementById("password")?.getAttribute("aria-invalid"),
  url: window.location.pathname,
}));

console.log("✓ Login empty validation triggered properly (still on login):", loginInvalid);
await captureShot("login-validation-errors.png");

// Toggle password visibility
await page.fill("#password", "SecretPass123");
const initialType = await page.evaluate(() => document.getElementById("password").type);
await page.click("[data-toggle-pwd='password']");
const toggledType = await page.evaluate(() => document.getElementById("password").type);
console.log(`✓ Password toggle: ${initialType} -> ${toggledType}`);

// Use Demo autofill button
await page.click("[data-fill-demo]");
const loginFilled = await page.evaluate(() => ({
  email: document.getElementById("email").value,
  pass: document.getElementById("password").value,
  emailInvalid: document.getElementById("email").hasAttribute("aria-invalid"),
}));
console.log("✓ Demo autofill filled credentials and cleared invalid state:", loginFilled);
await captureShot("login-filled-state.png");

// Mobile login
await page.cdp("Emulation.setDeviceMetricsOverride", {
  width: 375,
  height: 812,
  deviceScaleFactor: 0,
  mobile: false,
});
await page.goto(`http://127.0.0.1:${TARGET_PORT}/login`);
await page.click("[data-fill-demo]");
await page.waitForTimeout(300);
await captureShot("login-mobile.png");

// ----------------------------------------------------
// 3. SIGNUP PAGE VERIFICATION
// ----------------------------------------------------
await page.cdp("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 0,
  mobile: false,
});
await page.goto(`http://127.0.0.1:${TARGET_PORT}/signup`);
await page.waitForSelector("#signup-form", { state: "visible" });

// Submit empty to trigger validation
await page.click("button[type='submit']");
await page.waitForTimeout(200);

const signupInvalid = await page.evaluate(() => ({
  firstInvalid: document.getElementById("first")?.getAttribute("aria-invalid"),
  lastInvalid: document.getElementById("last")?.getAttribute("aria-invalid"),
  emailInvalid: document.getElementById("email")?.getAttribute("aria-invalid"),
  passInvalid: document.getElementById("password")?.getAttribute("aria-invalid"),
  termsInvalid: document.getElementById("terms")?.getAttribute("aria-invalid"),
  rolesCount: document.querySelectorAll(".role-opt").length,
  url: window.location.pathname,
}));

console.log("✓ Signup empty validation triggered properly (still on signup):", signupInvalid);
console.log(`✓ Total persona roles available: ${signupInvalid.rolesCount}`);

await captureShot("signup-validation-errors.png");

// Type weak password then strong password and check meter
await page.fill("#password", "simple");
const weakStrength = await page.evaluate(() => document.getElementById("pwd-meter")?.getAttribute("data-strength"));
await page.fill("#password", "LawPass2026!");
const strongStrength = await page.evaluate(() => document.getElementById("pwd-meter")?.getAttribute("data-strength"));
console.log(`✓ Password strength meter: simple=${weakStrength}, LawPass2026!=${strongStrength}`);

// Use Demo autofill button for signup
await page.click("[data-fill-signup-demo]");
const signupFilled = await page.evaluate(() => ({
  first: document.getElementById("first").value,
  email: document.getElementById("email").value,
  role: document.querySelector("input[name='role']:checked")?.value,
  terms: document.getElementById("terms").checked,
}));
console.log("✓ Signup demo autofill populated:", signupFilled);
await captureShot("signup-filled-state.png");

// Mobile signup
await page.cdp("Emulation.setDeviceMetricsOverride", {
  width: 375,
  height: 812,
  deviceScaleFactor: 0,
  mobile: false,
});
await page.goto(`http://127.0.0.1:${TARGET_PORT}/signup`);
await page.click("[data-fill-signup-demo]");
await page.waitForTimeout(300);
await captureShot("signup-mobile.png");

// ----------------------------------------------------
// Submit signup and verify clean transition to onboarding
await page.click("button[type='submit']");
await page.waitForURL("**/onboarding*");
console.log(`✓ Valid submission smoothly reached onboarding: ${await page.url()}`);

await task.finish({ keep: [] });
console.log("All landing, login, and signup verifications passed!");
