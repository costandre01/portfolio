import type { Project } from '../types/project'
import { Icon } from './Icon'
import { sitePath } from '../lib/urls'

export function ProjectLinks({ project, includeDetail = false, highlightDemo = false }: { project: Project; includeDetail?: boolean; highlightDemo?: boolean }) {
  return <div className="project-links">
    {includeDetail && project.detail && <a className="project-detail-link" href={sitePath(`/projects/${project.id}`)} aria-label={`View Project: ${project.title}`}>View Project<Icon /></a>}
    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}><Icon name="github" />GitHub<Icon /></a>}
    {project.demoUrl && <a className={highlightDemo ? 'project-demo-primary' : undefined} href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.demoLabel ?? 'Live Demo'}: ${project.title}`}>{project.demoLabel ?? 'Live Demo'}<Icon /></a>}
  </div>
}
