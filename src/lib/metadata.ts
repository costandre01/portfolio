import { metadataTags, pageMetadata } from '../data/pages'

export function applyMetadata(pathname: string) {
  const metadata = pageMetadata(pathname)
  document.title = metadata.title
  for (const { attribute, key, content } of metadataTags(metadata)) {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
    if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.append(element) }
    element.content = content
  }
  if (metadata.canonical) {
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
    canonical.href = metadata.canonical
  }
}
