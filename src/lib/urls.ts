// Respect Vite's deployment base for pages and all files in public/.
export function sitePath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function pagePath(pathname: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const local = base && (pathname === base || pathname.startsWith(`${base}/`))
    ? pathname.slice(base.length) : pathname
  return local.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/'
}
