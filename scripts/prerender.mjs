import { build } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const output = resolve('dist')
const serverOutput = resolve('node_modules/.cache/portfolio-prerender')
await build({ build: { ssr: 'src/entry-server.tsx', outDir: serverOutput, emptyOutDir: true, copyPublicDir: false } })
const { render, pagePaths, metadataTags, publicUrl, site } = await import(pathToFileURL(resolve(serverOutput, 'entry-server.js')).href)
if (site.url && !/^https?:\/\//.test(site.url)) throw new Error('site.url / VITE_SITE_URL must be an absolute HTTP(S) URL.')
const template = await readFile(resolve(output, 'index.html'), 'utf8')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

for (const route of [...pagePaths, '/404']) {
  const { html, metadata } = render(route)
  const extra = [
    ...metadataTags(metadata).map(({ attribute, key, content }) => `<meta ${attribute}="${escape(key)}" content="${escape(content)}" />`),
    ...(metadata.canonical ? [`<link rel="canonical" href="${escape(metadata.canonical)}" />`] : []),
  ].join('\n    ')
  const document = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(metadata.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, '')
    .replace('<!--page-meta-->', extra)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  const destination = route === '/404' ? resolve(output, '404.html') : resolve(output, route.slice(1), 'index.html')
  await mkdir(resolve(destination, '..'), { recursive: true })
  await writeFile(destination, document)
}

// Absolute search URLs require the real deployment origin. Never invent one.
const sitemapEntries = site.url ? pagePaths.map(route => `  <url><loc>${escape(publicUrl(route))}</loc></url>`).join('\n') : '  <!-- Set site.url or VITE_SITE_URL and rebuild to emit absolute public page URLs. -->'
await writeFile(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`)
await writeFile(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\n${site.url ? `Sitemap: ${publicUrl('/sitemap.xml')}\n` : '# Configure the real site URL to enable the sitemap directive.\n'}`)
await writeFile(resolve(output, '.nojekyll'), '')
console.log(`Pre-rendered ${pagePaths.length} public pages, 404, sitemap.xml and robots.txt.${site.url ? '' : ' Sitemap URLs await the real site.url.'}`)
