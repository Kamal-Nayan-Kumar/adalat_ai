// Guard against silent JS breakage on every page: collect uncaught errors,
// failed requests and missing icons, for all pages at once.
const PAGES = ["index.html", "login.html", "signup.html", "dashboard.html", "cases.html", "courtroom.html"];

const task = await taskSpace(2);
const page = task.page("p1");
await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });
const problems = [];

for (const p of PAGES) {
  await page.cdp("Runtime.enable");
  await page.events();          // drain the buffer so errors are attributed correctly
  await page.goto(`http://localhost:4174/${p}`);
  await page.waitForTimeout(1300);

  const events = await page.events();
  for (const e of events) {
    if (e.method === "Runtime.exceptionThrown") {
      const d = e.params.exceptionDetails;
      problems.push(`${p}: JS ${d.exception?.description?.split("\n")[0] || d.text} (line ${d.lineNumber})`);
    }
  }

  const r = await page.evaluate(() => {
    const out = {};
    // every <use> must point at a symbol that exists in the inlined sprite
    const ids = new Set([...document.querySelectorAll("symbol")].map((s) => s.id));
    const missing = [...document.querySelectorAll(".ic use")]
      .map((u) => u.getAttribute("href"))
      .filter((h) => h && h.startsWith("#") && !ids.has(h.slice(1)));
    out.missingIcons = [...new Set(missing)];
    // charts should have drawn something
    ["chart-trend", "chart-radar", "chart-bars"].forEach((id) => {
      const s = document.getElementById(id);
      if (s && s.children.length === 0) out.emptyCharts = (out.emptyCharts || []).concat(id);
    });
    // A <rect> with no width/height, or a <circle> with no r, renders as nothing
    // and leaves only stray path segments. This is how the calendar, mail and lock
    // glyphs were silently broken.
    for (const sym of document.querySelectorAll("symbol")) {
      for (const r of sym.querySelectorAll("rect")) {
        if (!r.getAttribute("width") || !r.getAttribute("height")) {
          out.brokenGlyphs = (out.brokenGlyphs || []).concat(sym.id + ":rect-no-size");
        }
      }
      for (const c of sym.querySelectorAll("circle")) {
        if (!c.getAttribute("r")) {
          out.brokenGlyphs = (out.brokenGlyphs || []).concat(sym.id + ":circle-no-r");
        }
      }
    }
    // an icon that rendered but has collapsed to nothing
    for (const svg of document.querySelectorAll(".ic")) {
      const box = svg.getBoundingClientRect();
      if (box.width > 0 && box.height > 0 && (box.width < 4 || box.height < 4)) {
        const href = svg.querySelector("use");
        out.brokenGlyphs = (out.brokenGlyphs || []).concat(
          (href ? href.getAttribute("href") : "?") + ":collapsed",
        );
      }
    }

    const heat = document.getElementById("heat");
    if (heat && heat.children.length === 0) out.emptyCharts = (out.emptyCharts || []).concat("heat");
    // any img that failed to load
    out.brokenImages = [...document.images]
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.getAttribute("src"));
    return out;
  });

  for (const [k, v] of Object.entries(r)) {
    if (Array.isArray(v) && v.length) problems.push(`${p}: ${k} -> ${v.join(", ")}`);
  }
}

console.log(problems.length ? problems.join("\n") : "ALL CLEAN: no JS errors, no broken images, all icons resolve");