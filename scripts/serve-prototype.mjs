// Prototipi karşılaştırma için yerelde sunar: http://localhost:4400 (yalnızca geliştirme amaçlı)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
const root = 'reference/prototype';
const types = { '.html': 'text/html; charset=utf-8', '.webp': 'image/webp' };
createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  try {
    const body = await readFile(join(root, path === '/' ? 'index.html' : path));
    res.writeHead(200, { 'Content-Type': types[extname(path) || '.html'] || 'application/octet-stream' }).end(body);
  } catch { res.writeHead(404).end(); }
}).listen(4400, () => console.log('Prototip: http://localhost:4400'));
