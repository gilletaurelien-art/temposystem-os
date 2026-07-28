// Prérendu statique de la SPA (build local, puis rsync du dist/ vers le VPS Caddy
// → volumes/www-temposystem). Sert dist/ avec fallback SPA, rend chaque route dans
// un vrai navigateur (Playwright), puis réécrit le HTML rendu par-dessus dist/<route>/
// index.html → les crawlers (Facebook, Bing, LinkedIn… et Google plus vite)
// reçoivent un vrai contenu au lieu d'une coquille <div id="root"></div> vide.
//
// main.tsx utilise createRoot (pas d'hydratation) : le client efface le prérendu
// et rend proprement → aucun risque de mismatch d'hydratation. Le prérendu ne sert
// QUE les robots.
//
// Se DÉSACTIVE proprement (exit 0) si Playwright/son navigateur est absent → un
// `npm run build` sans navigateur ne casse jamais le build.

import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIST = 'dist';
const PORT = 45681;
const SEED = ['/'];
const EXCLUDE = new Set(); // routes non-SPA à ne jamais prérendre (aucune ici)

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml',
};

function startServer() {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = join(DIST, path);
    try {
      const s = await stat(file);
      if (s.isDirectory()) file = join(file, 'index.html');
    } catch {
      if (!extname(path)) file = join(DIST, 'index.html');
    }
    try {
      const buf = await readFile(file);
      res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
      res.end(buf);
    } catch {
      res.writeHead(404); res.end('not found');
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

let chromium;
try { ({ chromium } = await import('playwright')); }
catch { console.log('prerender: playwright absent → prérendu ignoré (SPA normale)'); process.exit(0); }

// Sur macOS 12, Playwright ne fournit plus de chromium bundlé : on tente d'abord
// le Chrome système (channel:'chrome'), puis le chromium bundlé (Linux/CI), sinon
// on se désactive proprement.
let browser;
for (const opts of [{ channel: 'chrome' }, {}]) {
  try { browser = await chromium.launch(opts); break; }
  catch { /* essai suivant */ }
}
if (!browser) { console.log('prerender: aucun navigateur Chromium/Chrome lançable → prérendu ignoré (SPA normale)'); process.exit(0); }

const server = await startServer();
const page = await browser.newPage();
const base = `http://localhost:${PORT}`;
const seen = new Set();
const queue = [...SEED];

while (queue.length) {
  const route = queue.shift();
  if (seen.has(route) || EXCLUDE.has(route)) continue;
  seen.add(route);

  try {
    await page.goto(base + route, { waitUntil: 'networkidle', timeout: 20_000 });
  } catch {
    await page.waitForTimeout(1500);
  }
  await page.waitForTimeout(300);

  const links = await page.$$eval('a[href]', (as) =>
    as.map((a) => a.getAttribute('href')).filter(Boolean)
  );
  for (const href of links) {
    if (/^https?:\/\//.test(href) || href.startsWith('#') || href.startsWith('mailto:')) continue;
    const clean = ('/' + href.replace(/^\//, '')).split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
    if (!extname(clean) && !seen.has(clean)) queue.push(clean);
  }

  const html = await page.content();
  const outDir = route === '/' ? DIST : join(DIST, route);
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, 'index.html'), html);
  console.log('prerender:', route, `(${html.length} car.)`);
}

await browser.close();
server.close();
console.log('prerender: terminé —', seen.size, 'route(s)');
