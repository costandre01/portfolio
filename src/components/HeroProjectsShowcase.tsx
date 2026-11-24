import { publishedProjects } from '../data/projects'
import { sitePath } from '../lib/urls'
import { Icon } from './Icon'

// Use the same featured order as the project library, keeping real images intact.
export function HeroProjectsShowcase() {
  const featured = publishedProjects.filter(project => project.featured && project.image).slice(0, 2)
  return <div className="hero-showcase" aria-label="Selected project interfaces">
    <p className="showcase-label mono"><span aria-hidden="true">↗</span> Selected interfaces</p>
    <div className="showcase-stack">{featured.map((project, index) => project && <a className={`showcase-project showcase-${index === 0 ? 'primary' : 'secondary'}`} key={project.id} href={sitePath(`/projects/${project.id}`)} aria-label={`Explore ${project.title}`}>
      <div className="showcase-browser" aria-hidden="true"><span className="preview-dots"><i /><i /><i /></span><span>{project.id}</span><Icon name="code" /></div>
      <img src={sitePath(project.image!)} alt={project.imageAlt ?? `${project.title} interface`} width={project.imageWidth} height={project.imageHeight} loading="eager" fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
      <div className="showcase-caption"><span><strong>{project.title}</strong><small>{project.context}{project.developmentNote ? ' · In development' : ''}</small></span><Icon /></div>
    </a>)}</div>
  </div>
}
