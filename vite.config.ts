import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss(), {
    name: 'static-page-preview',
    configurePreviewServer(server) {
      // Vite preview otherwise falls back to the home HTML for /about and similar paths.
      // Serve the actual pre-rendered directory document, as static hosting does.
      const root = resolve(server.config.build.outDir);
      server.middlewares.use((request, response, next) => {
        if (request.method !== 'GET' && request.method !== 'HEAD') return next();
        const pathname = (request.url || '/').split('?')[0];
        const base = server.config.base.replace(/\/$/, '');
        const relative = base && pathname.startsWith(`${base}/`) ? pathname.slice(base.length) : pathname;
        if (relative.split('/').some(part => part.includes('.'))) return next();
        const file = resolve(root, relative.replace(/^\//, ''), 'index.html');
        if (!file.startsWith(`${root}${sep}`)) return next();
        readFile(file, 'utf8').then(html => {
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(request.method === 'HEAD' ? undefined : html);
        }).catch(() => {
          readFile(resolve(root, '404.html'), 'utf8').then(html => {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.end(request.method === 'HEAD' ? undefined : html);
          }).catch(() => next());
        });
      });
    },
  }],
});
