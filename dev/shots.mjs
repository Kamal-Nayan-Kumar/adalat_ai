// Screenshot each page at given widths for visual review.
const shots = [
  ["index.html", 1440],
  ["dashboard.html", 1440],
  ["courtroom.html", 1440],
  ["login.html", 1440],
  ["index.html", 360],
];

const task = await taskSpace(2);
const page = task.page("p1");
await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });

for (const [p, w] of shots) {
  await page.cdp("Emulation.setDeviceMetricsOverride", {
    width: w, height: 1000, deviceScaleFactor: 0, mobile: w < 700,
  });
  await page.goto(`http://localhost:4174/${p}`);
  await page.waitForTimeout(1100);
  const tag = p.replace(".html", "");
  const path = `/tmp/shot/${tag}-${w}.png`;
  await page.screenshot({ path, fullPage: w > 700 });
  console.log(path);
}