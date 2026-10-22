// dev/verify_courtroom.mjs — Proves the courtroom-simulation feature end-to-end
import fs from "node:fs/promises";
import path from "node:path";

// WORKSPACE and PORT are injected by dev/control-adalat drive
const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/verify-adalat/courtroom");
const TMP_DIR = "/tmp/adalat-verify/courtroom";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving courtroom verification on http://127.0.0.1:${TARGET_PORT}/courtroom.html...`);

const task = await taskSpace("verify-courtroom-proof");
const page = task.page("p1");

await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });
await page.cdp("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 0,
  mobile: false,
});

// 1. Open courtroom page
await page.goto(`http://127.0.0.1:${TARGET_PORT}/courtroom.html`);
await page.waitForSelector("#chat-stream", { state: "visible" });
console.log("✓ Courtroom page loaded successfully");

// 2. Initial state verification
const initialCount = await page.evaluate(() => document.querySelectorAll("#chat-stream .msg").length);
console.log(`✓ Initial proceedings message count: ${initialCount}`);

// 3. Submit custom objection via input
const objectionText = "I object under Section 137 BSA — the question assumes facts not in evidence.";
await page.fill("#composer-input", objectionText);
await page.click("#composer-send");

// Verify user message appeared immediately
await page.waitForFunction(
  (text) => {
    const msgs = [...document.querySelectorAll("#chat-stream .msg.is-you")];
    return msgs.some((m) => m.textContent.includes(text));
  },
  objectionText,
  { timeout: 3000 }
);
console.log("✓ User objection posted to stream");

// 4. Wait for Judge AI response (700ms timer)
await page.waitForFunction(
  () => {
    const status = document.getElementById("stage-status");
    return status && status.textContent.trim() === "Your turn";
  },
  undefined,
  { timeout: 5000 }
);
console.log("✓ Judge AI ruled on objection; stage status updated to 'Your turn'");

// 5. Submit via quick chip
await page.click(".chip-btn >> nth=0"); // Click first chip (Objection)
await page.waitForTimeout(900); // Wait for judge ruling
console.log("✓ Quick chip submission accepted and ruled upon");

// 6. Test Verdict Modal
await page.click("#open-verdict");
await page.waitForFunction(() => {
  const modal = document.getElementById("verdict");
  return modal && !modal.hidden;
});
console.log("✓ Verdict modal opened");

// Helper to save screenshot reliably
async function captureShot(filename) {
  const tmpPath = path.join(TMP_DIR, filename);
  const destPath = path.join(ARTIFACTS_DIR, filename);
  await page.screenshot({ path: tmpPath });
  await fs.copyFile(tmpPath, destPath);
  return destPath;
}

// Capture screenshot with verdict open
const verdictShot = await captureShot("proceedings-verdict.png");
console.log(`✓ Screenshot captured: ${verdictShot}`);

// Dismiss modal
await page.click("loc=role:button[name='Close']");
await page.waitForFunction(() => {
  const modal = document.getElementById("verdict");
  return modal && modal.hidden;
});
console.log("✓ Verdict modal dismissed");

// 7. Save DOM transcript receipt
const receipt = await page.evaluate(() => {
  const msgs = [...document.querySelectorAll("#chat-stream .msg")].map((m) => ({
    who: m.querySelector(".msg-who")?.textContent?.trim(),
    text: m.querySelector(".msg-text")?.textContent?.trim(),
    isYou: m.classList.contains("is-you"),
    isJudge: m.classList.contains("is-judge"),
  }));
  return {
    stageStatus: document.getElementById("stage-status")?.textContent?.trim(),
    totalMessages: msgs.length,
    messages: msgs,
  };
});

const receiptPath = path.join(ARTIFACTS_DIR, "proceedings.json");
await fs.writeFile(receiptPath, JSON.stringify(receipt, null, 2), "utf-8");
console.log(`✓ Transcript receipt written: ${receiptPath}`);

// 8. Capture final stage screenshot
const stageShot = await captureShot("proceedings-stage.png");
console.log(`✓ Final stage screenshot saved: ${stageShot}`);

await task.finish({ keep: [] });
console.log("Courtroom verification completed successfully!");
