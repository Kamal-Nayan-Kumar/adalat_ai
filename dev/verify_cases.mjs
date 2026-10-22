// dev/verify_cases.mjs — Proves the cause-list-filters feature end-to-end
import fs from "node:fs/promises";
import path from "node:path";

const TARGET_PORT = typeof PORT !== "undefined" ? PORT : 4173;
const BASE_DIR = typeof WORKSPACE !== "undefined" ? WORKSPACE : process.cwd();
const ARTIFACTS_DIR = path.join(BASE_DIR, "artifacts/verify-adalat/cases");
const TMP_DIR = "/tmp/adalat-verify/cases";

await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
await fs.mkdir(TMP_DIR, { recursive: true });

console.log(`Driving cause list verification on http://127.0.0.1:${TARGET_PORT}/cases...`);

const task = await taskSpace("verify-cases-proof");
const page = task.page("p1");

await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });
await page.cdp("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 0,
  mobile: false,
});

// Helper to save screenshot reliably
async function captureShot(filename) {
  const tmpPath = path.join(TMP_DIR, filename);
  const destPath = path.join(ARTIFACTS_DIR, filename);
  await page.screenshot({ path: tmpPath });
  await fs.copyFile(tmpPath, destPath);
  return destPath;
}

// 1. Open cause list
await page.goto(`http://127.0.0.1:${TARGET_PORT}/cases`);
await page.waitForSelector(".case-grid", { state: "visible" });

const initialCount = await page.evaluate(() => {
  const cards = document.querySelectorAll(".case-card");
  const count = document.getElementById("case-count")?.textContent?.trim();
  return { cardsCount: cards.length, countText: count };
});
console.log(`✓ Initial cause list loaded with ${initialCount.cardsCount} cards (${initialCount.countText})`);

// 2. Keyword search: "murder"
await page.fill("#case-search", "murder");
await page.waitForFunction(() => {
  const visible = [...document.querySelectorAll(".case-card")].filter((c) => !c.hidden);
  return visible.length === 1;
});

const filteredText = await page.evaluate(() => document.getElementById("case-count")?.textContent?.trim());
console.log(`✓ Keyword search 'murder' filtered to: ${filteredText}`);

await captureShot("cases-filtered-keyword.png");

// 3. Clear search and test dropdown filters
await page.fill("#case-search", "");
await page.selectOption("select[data-filter='court']", { value: "criminal" });
await page.selectOption("select[data-filter='regime']", { value: "new" });

const criminalCount = await page.evaluate(() => {
  const visible = [...document.querySelectorAll(".case-card")].filter((c) => !c.hidden);
  return visible.length;
});
console.log(`✓ Court 'criminal' + Regime 'new' filtered to ${criminalCount} matching cases`);

// 4. Test Zero State with impossible query
await page.fill("#case-search", "nonexistentquery_xyz");
await page.waitForFunction(() => {
  const empty = document.getElementById("case-empty");
  return empty && !empty.hidden;
});

const emptyStateText = await page.evaluate(() => ({
  emptyVisible: !document.getElementById("case-empty")?.hidden,
  countText: document.getElementById("case-count")?.textContent?.trim(),
}));
console.log(`✓ Empty state triggered: count=${emptyStateText.countText}, emptyVisible=${emptyStateText.emptyVisible}`);

await captureShot("cases-empty-state.png");

// 5. Reset filters and verify restoration
await page.fill("#case-search", "");
await page.selectOption("select[data-filter='court']", { value: "" });
await page.selectOption("select[data-filter='regime']", { value: "" });
await page.waitForFunction(() => {
  const visible = [...document.querySelectorAll(".case-card")].filter((c) => !c.hidden);
  return visible.length === 9;
});
console.log("✓ Reset restored all 9 cases");

// Write JSON evidence receipt
const casesReceipt = {
  totalCases: 9,
  searchTested: "murder",
  zeroStateVerified: true,
  filtersTested: ["court=criminal", "regime=new"],
};
await fs.writeFile(path.join(ARTIFACTS_DIR, "cases-evidence.json"), JSON.stringify(casesReceipt, null, 2), "utf-8");

await task.finish({ keep: [] });
console.log("Cause list verification completed successfully!");
