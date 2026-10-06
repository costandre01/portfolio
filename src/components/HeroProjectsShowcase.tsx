import { publishedProjects } from '../data/projects'
import { sitePath } from '../lib/urls'
import { Icon } from './Icon'

// Real project assets only. Frames overlap at their edges, keeping images intact.
export function HeroProjectsShowcase() {
  const featured = ['eldritch-horror', 'deskentra'].map(id => publishedProjects.find(project => project.id === id)).filter(project => project?.image)
  return <div className="hero-showcase" aria-label="Selected project interfaces">
    <p className="showcase-label mono"><span aria-hidden="true">↗</span> Built. Tested. Explore.</p>
    <div className="showcase-stack">{featured.map((project, index) => project && <a className={`showcase-project showcase-${index === 0 ? 'primary' : 'secondary'}`} key={project.id} href={sitePath(`/projects/${project.id}`)} aria-label={`Explore ${project.title}`}>
      <div className="showcase-browser" aria-hidden="true"><span className="preview-dots"><i /><i /><i /></span><span>{project.id}</span><Icon name="code" /></div>
      <img src={sitePath(project.image!)} alt={project.imageAlt ?? `${project.title} interface`} width={project.imageWidth} height={project.imageHeight} loading="eager" fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
      <div className="showcase-caption"><span><strong>{project.title}</strong><small>{project.category}</small></span><Icon /></div>
    </a>)}</div>
    <p className="showcase-note mono">Real interfaces. Explore the code.</p>
  </div>
}
