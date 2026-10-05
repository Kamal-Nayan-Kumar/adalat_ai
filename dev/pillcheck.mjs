// Pixel test: nothing from the hero illustration may show behind the pills.
const WIDTHS = [1920, 1600, 1440, 1366, 1280, 1100, 1024];
const task = await taskSpace(2);
const page = task.page("p1");
await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });

for (const w of WIDTHS) {
  await page.cdp("Emulation.setDeviceMetricsOverride", {
    width: w, height: 900, deviceScaleFactor: 0, mobile: false,
  });
  await page.goto("http://localhost:4174/index.html");
  await page.waitForTimeout(1100);
  const box = await page.evaluate(() => {
    const b = document.querySelector(".hero-points").getBoundingClientRect();
    return { x: Math.max(0, b.x), y: Math.round(b.y), width: Math.round(b.width), height: Math.round(b.height) };
  });
  const path = `/tmp/shot/pillrow-${w}.png`;
  await page.screenshot({ path, clip: box });
  console.log(path, JSON.stringify(box));
}
