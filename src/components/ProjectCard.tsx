import type { Project } from '../types/project'
import { Icon } from './Icon'
import { ProjectLinks } from './ProjectLinks'
import { ProjectMedia } from './ProjectMedia'
export function ProjectCard({ project, index, lead = false }: { project: Project; index: number; lead?: boolean }) {
  return <article data-reveal className={`project-card ${lead ? 'project-lead' : ''} ${project.featured ? 'project-featured' : 'project-small'} ${project.featured && index % 2 === 0 ? 'project-reversed' : ''} ${project.image ? '' : 'project-without-media'}`}>
    {project.image && <ProjectMedia project={project} />}
    <div className="project-body"><div className="project-meta"><span className="mono">{String(index).padStart(2, '0')} / {project.category}</span>{lead && <span className="featured-label">Featured project</span>}{!project.featured && <Icon name="code" />}</div>
      <h3>{project.title}</h3><p>{project.summary ?? project.description}</p>
      {project.technologies.length > 0 && <ul className="tags" aria-label={`${project.title} technologies`}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>}
      <ProjectLinks project={project} includeDetail />
    </div>
  </article>
}
