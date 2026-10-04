// Responsive audit: every page at every target width.
//
// Measures whether the user can ACTUALLY scroll horizontally, and ignores
// nodes injected by browser extensions (e.g. password managers add a
// fixed-position element that widens documentElement.scrollWidth).
// Also ignores elements inside a clipping ancestor, since those scroll
// intentionally (wide data tables).
const PAGES = ["index.html", "login.html", "signup.html", "dashboard.html", "cases.html", "courtroom.html"];
const WIDTHS = [1920, 1440, 1280, 1024, 768, 520, 430, 415, 360, 320];

const task = await taskSpace(2);
const page = task.page("p1");
await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });
const report = [];

async function viewport(width, height) {
  await page.cdp("Emulation.setDeviceMetricsOverride", {
    width, height, deviceScaleFactor: 0, mobile: width < 700,
  });
}

for (const p of PAGES) {
  for (const w of WIDTHS) {
    await viewport(w, 900);
    await page.goto(`http://localhost:4174/${p}`);
    await page.waitForTimeout(800);

    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const vw = de.clientWidth;

      // real scrollability is the thing a user would notice
      const start = window.scrollX;
      window.scrollTo(9999, 0);
      const scrolled = window.scrollX > start;
      window.scrollTo(0, 0);

      const clipping = (el) => {
        for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
          const ox = getComputedStyle(n).overflowX;
          if (ox === "auto" || ox === "scroll" || ox === "hidden") return true;
        }
        return false;
      };

      const bad = [...document.querySelectorAll("body *")]
        .filter((e) => !/^protonpass/i.test(e.tagName))
        .map((e) => ({ e, r: e.getBoundingClientRect() }))
        .filter((o) => o.r.right > vw + 2 && !clipping(o.e))
        .map((o) => ({
          t: o.e.tagName.toLowerCase() +
             (typeof o.e.className === "string" && o.e.className
               ? "." + o.e.className.trim().split(/\s+/).join(".") : ""),
          over: Math.round(o.r.right - vw),
        }))
        .slice(0, 5);

      const charts = ["chart-trend", "chart-radar", "chart-bars", "heat"]
        .map((id) => document.getElementById(id))
        .filter((s) => s && s.children.length === 0)
        .map((s) => s.id);

      return { scrollable: scrolled, bad, charts, ics: document.querySelectorAll(".ic use").length };
    });

    report.push({ page: p, w, ...r });
  }
}

const fail = report.filter((r) => r.scrollable || r.bad.length || r.charts.length);
console.log(fail.length
  ? "=== FAILURES ===\n" + JSON.stringify(fail, null, 1)
  : `ALL CLEAN: ${PAGES.length} pages x ${WIDTHS.length} widths — no horizontal scroll, no overflow, charts drawn`);