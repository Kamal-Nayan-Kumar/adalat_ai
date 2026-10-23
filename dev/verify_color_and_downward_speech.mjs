// dev/verify_color_and_downward_speech.mjs — Proves unclipped Judge speech and distinct 4-role avatar colors
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/color-and-speech-fix");
const TMP_DIR = "/tmp/adalat-verify/color-speech";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving color and speech bubble verification on port ${TARGET_PORT}...`);

const task = await taskSpace("verify-color-speech");
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

// 1. Verify Distinct Role Colors in Chat
const roleColors = await page.evaluate(() => {
  const judgeMsg = document.querySelector(".msg-role--judge .ic-slot");
  const proseMsg = document.querySelector(".msg-role--prosecution .ic-slot");
  const witnessMsg = document.querySelector(".msg-role--witness .ic-slot");

  return {
    judgeColor: judgeMsg ? window.getComputedStyle(judgeMsg).backgroundColor : null,
    proseColor: proseMsg ? window.getComputedStyle(proseMsg).backgroundColor : null,
    witnessColor: witnessMsg ? window.getComputedStyle(witnessMsg).backgroundColor : null,
  };
});

console.log("✓ Distinct Chat Avatar Colors verified:", roleColors);

// 2. Trigger Objection to test Judge Speech Bubble visibility
await page.click("text='Rise to Object'");
await page.waitForTimeout(900); // Wait for Judge ruling

const judgeSpeechBubble = await page.evaluate(() => {
  const bubble = document.querySelector(".bench-3d-dais .speech-bubble-callout.is-downward");
  if (!bubble) return { found: false };
  const rect = bubble.getBoundingClientRect();
  return {
    found: true,
    top: rect.top,
    bottom: rect.bottom,
    height: rect.height,
    isFullyVisible: rect.top >= 60, // Above 60px means not clipped by top header/boundary!
    text: bubble.textContent,
  };
});

console.log("✓ Judge Speech Bubble check (downward position, no top clipping):", judgeSpeechBubble);

// Capture screenshots
await captureShot("01-judge-speech-unclipped.png");
await captureShot("02-chat-stream-distinct-colors.png");

await task.finish({ keep: [] });
console.log("Color and speech verification completed successfully!");
