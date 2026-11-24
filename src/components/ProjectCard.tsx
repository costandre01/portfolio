import type { Project } from '../types/project'
import { Icon } from './Icon'
import { ProjectLinks } from './ProjectLinks'
import { ProjectMedia } from './ProjectMedia'
import { ProjectStatus } from './ProjectStatus'
import { sitePath } from '../lib/urls'
export function ProjectCard({ project, index, lead = false }: { project: Project; index: number; lead?: boolean }) {
  return <article data-reveal className={`project-card ${lead ? 'project-lead' : ''} ${project.featured ? 'project-featured' : 'project-small'} ${project.featured && index % 2 === 0 ? 'project-reversed' : ''} ${project.image ? '' : 'project-without-media'}`}>
    {project.image && (project.detail ? <a className="project-preview-link" href={sitePath(`/projects/${project.id}`)} aria-label={`View project: ${project.title}`}><ProjectMedia project={project} /></a> : <ProjectMedia project={project} />)}
    <div className="project-body"><div className="project-meta"><span className="mono">{String(index).padStart(2, '0')} / {project.category}</span>{project.context && <span className="project-context">{project.context}</span>}{!project.featured && <Icon name="code" />}</div>
      <h3>{project.title}</h3><p>{project.summary ?? project.description}</p>
      <ProjectStatus note={project.developmentNote} />
      {project.technologies.length > 0 && <ul className="tags" aria-label={`${project.title} technologies`}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>}
      <ProjectLinks project={project} includeDetail />
    </div>
  </article>
}
