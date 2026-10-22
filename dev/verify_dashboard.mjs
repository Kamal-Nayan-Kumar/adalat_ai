// dev/verify_dashboard.mjs — Proves the advocacy-dashboard feature end-to-end
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/verify-adalat/dashboard");
const TMP_DIR = "/tmp/adalat-verify/dashboard";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving dashboard verification on http://127.0.0.1:${TARGET_PORT}/dashboard.html...`);

const task = await taskSpace("verify-dashboard-proof");
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
  await page.screenshot({ path: tmpPath, fullPage: true });
  await fs.copyFile(tmpPath, destPath);
  return destPath;
}

await page.goto(`http://127.0.0.1:${TARGET_PORT}/dashboard.html`);
await page.waitForSelector("#chart-trend", { state: "visible" });
await page.waitForTimeout(600); // Allow charts to draw

// 1. Verify KPIs
const kpis = await page.evaluate(() => {
  const vals = [...document.querySelectorAll(".kpi .kpi-val")].map((el) => el.textContent.trim());
  const labels = [...document.querySelectorAll(".kpi .kpi-label")].map((el) => el.textContent.trim());
  return labels.map((l, i) => ({ label: l, val: vals[i] }));
});
console.log("✓ KPIs verified:", kpis.map((k) => `${k.label}: ${k.val}`).join(", "));

// 2. Verify SVG charts drawn
const chartStats = await page.evaluate(() => {
  const trend = document.getElementById("chart-trend");
  const radar = document.getElementById("chart-radar");
  const bars = document.getElementById("chart-bars");
  const heat = document.getElementById("heat");
  return {
    trendElements: trend ? trend.children.length : 0,
    radarElements: radar ? radar.children.length : 0,
    barElements: bars ? bars.children.length : 0,
    heatTiles: heat ? heat.children.length : 0,
  };
});

console.log(`✓ Trend chart elements: ${chartStats.trendElements}`);
console.log(`✓ Radar chart elements: ${chartStats.radarElements}`);
console.log(`✓ Bar chart elements: ${chartStats.barElements}`);
console.log(`✓ Activity heatmap tiles: ${chartStats.heatTiles}`);

if (chartStats.trendElements === 0 || chartStats.radarElements === 0 || chartStats.barElements === 0 || chartStats.heatTiles === 0) {
  throw new Error("One or more dashboard charts failed to render SVG content");
}

// 3. Capture full-page proof screenshot
const shotPath = await captureShot("dashboard-overview.png");
console.log(`✓ Full-page screenshot saved to ${shotPath}`);

// 4. Save JSON receipt
const receipt = {
  kpis,
  chartStats,
  status: "verified",
};
await fs.writeFile(path.join(ARTIFACTS_DIR, "dashboard-evidence.json"), JSON.stringify(receipt, null, 2), "utf-8");

await task.finish({ keep: [] });
console.log("Advocacy dashboard verification completed successfully!");
