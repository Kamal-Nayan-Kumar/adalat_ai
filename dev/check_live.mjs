// Verify the deployed site in a real browser: JS errors, broken images,
// unresolved icons, charts, fonts, and horizontal overflow at several widths.
const BASE = "https://adalatai.vercel.app";
const PAGES = ["", "login", "signup", "dashboard", "cases", "courtroom"];
const WIDTHS = [1440, 768, 390];

const task = await taskSpace(2);
const page = task.page("p1");
const problems = [];

for (const p of PAGES) {
  for (const w of WIDTHS) {
    await page.cdp("Runtime.enable");
    await page.cdp("Emulation.setDeviceMetricsOverride", {
      width: w, height: 900, deviceScaleFactor: 0, mobile: w < 700,
    });
    await page.events();
    await page.goto(`${BASE}/${p}`);
    await page.waitForTimeout(1600);

    for (const e of await page.events()) {
      if (e.method === "Runtime.exceptionThrown") {
        const d = e.params.exceptionDetails;
        problems.push(`${p || "index"}@${w} JS ${d.exception?.description?.split("\n")[0] || d.text}`);
      }
    }

    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const ids = new Set([...document.querySelectorAll("symbol")].map((s) => s.id));
      const start = window.scrollX;
      window.scrollTo(9999, 0);
      const scrolled = window.scrollX > start;
      window.scrollTo(0, 0);

      return {
        icons: document.querySelectorAll(".ic use").length,
        missingIcons: [...new Set(
          [...document.querySelectorAll(".ic use")]
            .map((u) => u.getAttribute("href"))
            .filter((h) => h && h.startsWith("#") && !ids.has(h.slice(1)))
        )],
        brokenImages: [...document.images]
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.getAttribute("src")),
        emptyCharts: ["chart-trend", "chart-radar", "chart-bars", "heat"]
          .map((id) => document.getElementById(id))
          .filter((s) => s && s.children.length === 0)
          .map((s) => s.id),
        // did the real webfonts load, or did it fall back to a system serif?
        fontsLoaded: document.fonts ? document.fonts.status : "n/a",
        serifIsPlayfair: (() => {
          const h = document.querySelector("h1, .h2");
          if (!h) return null;
          return getComputedStyle(h).fontFamily;
        })(),
        scrolled,
      };
    });

    for (const [k, v] of Object.entries(r)) {
      if (Array.isArray(v) && v.length) problems.push(`${p || "index"}@${w} ${k} -> ${v.join(", ")}`);
      if (v === true) problems.push(`${p || "index"}@${w} horizontally scrollable`);
    }
    console.log(`${(p || "index").padEnd(11)} ${String(w).padEnd(5)} icons=${r.icons} fonts=${r.fontsLoaded}`);
  }
}

console.log(problems.length
  ? "\nPROBLEMS:\n" + problems.join("\n")
  : "\nLIVE SITE CLEAN: no JS errors, images and icons resolve, charts draw, no overflow");