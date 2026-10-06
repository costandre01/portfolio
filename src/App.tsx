import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { useReveal } from './hooks/useReveal'
import { publishedProjects } from './data/projects'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { pageStructuredData } from './data/pages'

export default function App({ pathname = '/' }: { pathname?: string }) {
  const mainRef = useReveal()
  const project = publishedProjects.find(item => item.detail && pathname === `/projects/${item.id}`)
  const structuredData = pageStructuredData(pathname)
  const page = pathname === '/' ? <HomePage /> : pathname === '/about' ? <AboutPage /> : pathname === '/projects' ? <ProjectsPage /> : project ? <ProjectDetailPage project={project} /> : <NotFoundPage />
  return <><a className="skip-link" href="#main">Skip to content</a><Header pathname={pathname} /><main id="main" ref={mainRef}>{page}{structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />}</main><Footer /></>
}
