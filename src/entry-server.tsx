import { renderToString } from 'react-dom/server'
import App from './App'
import { pageMetadata, pagePaths } from './data/pages'
export { pagePaths }
export { metadataTags, publicUrl } from './data/pages'
export { projects } from './data/projects'
export { site } from './data/site'
export function render(pathname: string) {
  return { html: renderToString(<App pathname={pathname} />), metadata: pageMetadata(pathname) }
}
