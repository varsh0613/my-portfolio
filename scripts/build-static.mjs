import fs from "node:fs"
import path from "node:path"

const rootDir = process.cwd()
const srcHtmlPath = path.join(rootDir, "app", "varshitha_portfolio_v3_full.html")
const distDir = path.join(rootDir, "dist")

function ensureEmptyDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true })
  fs.mkdirSync(dirPath, { recursive: true })
}

function copyDirIfExists(from, to) {
  if (!fs.existsSync(from)) return
  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.cpSync(from, to, { recursive: true })
}

function copyFileIfExists(from, to) {
  if (!fs.existsSync(from)) return
  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.copyFileSync(from, to)
}

  function buildClientScript() {
  // Keep it tiny + dependency-free; run after DOM is ready.
  return String.raw`(() => {
  function hashString(input) {
    let hash = 2166136261;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
      a += 0x6d2b79f5;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function randFrom(rng, min, max) {
    return rng() * (max - min) + min;
  }

  function layoutEventStack(stack) {
    const cards = Array.from(stack.querySelectorAll("[data-polaroid]"));
    const total = cards.length;
    if (total === 0) return;
    const seedKey = stack.getAttribute("data-event") || stack.id || "event-stack";
    const rng = mulberry32((hashString(seedKey) ^ total) >>> 0);

    cards.forEach((card, index) => {
      const isTop = index === 0;
      const offset = index * 8;
      const rotation = randFrom(rng, -5.5, 5.5);
      const shiftX = isTop ? 0 : randFrom(rng, -12, 12);
      const shiftY = isTop ? 0 : randFrom(rng, -10, 10);

      card.style.zIndex = String(100 - index);
      card.style.setProperty("--x", String(Math.round(shiftX)) + "px");
      card.style.setProperty("--y", String(Math.round(offset + shiftY)) + "px");
      card.style.setProperty("--r", String(rotation.toFixed(2)) + "deg");
      card.style.opacity = isTop ? "1" : "0.7";
    });
  }

  function layoutMyselfStack(stack) {
    const cards = Array.from(stack.querySelectorAll("[data-polaroid]"));
    const total = cards.length;
    cards.forEach((card, index) => {
      const depth = total - index;
      const x = Math.round((Math.random() * 12 - 6) + (depth - 1) * 2);
      const y = Math.round((Math.random() * 12 - 6) + (depth - 1) * 2);
      const r = (Math.random() * 12 - 6).toFixed(2);
      card.style.zIndex = String(10 + index);
      card.style.setProperty("--x", String(x) + "px");
      card.style.setProperty("--y", String(y) + "px");
      card.style.setProperty("--r", String(r) + "deg");
    });
  }

  function init() {
    const myselfDeck = document.getElementById("myselfDeck");
    if (myselfDeck) layoutMyselfStack(myselfDeck);

    document.querySelectorAll(".event-stack").forEach((stack) => layoutEventStack(stack));

    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      if (target.closest('[data-action="shuffle"]')) {
        if (!myselfDeck) return;
        const last = myselfDeck.lastElementChild;
        const first = myselfDeck.firstElementChild;
        if (!last || !first || last === first) return;
        myselfDeck.insertBefore(last, first);
        layoutMyselfStack(myselfDeck);
        return;
      }

      const clickedStack = target.closest(".event-stack");
      if (clickedStack) {
        const clickedCard = target.closest("[data-polaroid]");
        if (!clickedCard) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        const first = clickedStack.firstElementChild;
        if (first) clickedStack.appendChild(first);
        layoutEventStack(clickedStack);
        return;
      }

      if (myselfDeck) {
        const card = target.closest("[data-polaroid]");
        if (!card || !myselfDeck.contains(card)) return;
        e.preventDefault();
        myselfDeck.appendChild(card);
        layoutMyselfStack(myselfDeck);
      }
    });

    window.addEventListener("resize", () => {
      if (myselfDeck) layoutMyselfStack(myselfDeck);
      document.querySelectorAll(".event-stack").forEach((stack) => layoutEventStack(stack));
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();`
}

function buildIndexHtml() {
  const fragment = fs.readFileSync(srcHtmlPath, "utf8")
  const rewritten = fragment.replaceAll("/api/assets/", "assets/")

  const doc = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sirigiri Varshitha — Portfolio</title>
</head>
<body>
${rewritten}
<script>
${buildClientScript()}
</script>
</body>
</html>
`

  fs.writeFileSync(path.join(distDir, "index.html"), doc, "utf8")
}

function main() {
  if (!fs.existsSync(srcHtmlPath)) {
    throw new Error(`Missing source HTML: ${srcHtmlPath}`)
  }

  ensureEmptyDir(distDir)

  // Copy public files (icons, etc.) to dist root
  copyDirIfExists(path.join(rootDir, "public"), distDir)

  // Copy assets into dist/assets/<category>
  const assetsDir = path.join(distDir, "assets")
  fs.mkdirSync(assetsDir, { recursive: true })

  for (const category of ["certificates", "dashboards", "designs", "personal", "resume"]) {
    copyDirIfExists(path.join(rootDir, category), path.join(assetsDir, category))
  }

  // If you keep the resume file at repo root, include it too (optional).
  copyFileIfExists(
    path.join(rootDir, "Varshitha_Sirigiri_Resume.docx"),
    path.join(assetsDir, "resume", "Varshitha_Sirigiri_Resume.docx"),
  )

  buildIndexHtml()
  console.log("Static site built to dist/")
}

main()
