import { publishedProjects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'
import { sitePath } from '../lib/urls'
import { Icon } from './Icon'
export function Projects({ catalogue = false }: { catalogue?: boolean }) {
  const featured = publishedProjects.filter(project => project.featured)
  const selected = catalogue ? featured : featured.slice(0, 2)
  const more = catalogue ? publishedProjects.filter(project => !project.featured) : []
  return <section id="projects" aria-label="Projects" className={`section container selected-work ${catalogue ? 'catalogue-section' : ''}`}><SectionHeading number="01" label="Personal projects" title={catalogue ? 'Main projects' : 'Support workflows & complex game state.'} description="Deskentra and Vekstoria: personal projects built with React and TypeScript, from ticket management to a custom board game engine." />
    <div className={`featured-grid ${selected.length >= 4 ? 'featured-grid-balanced' : ''}`}>{selected.map((project, index) => <ProjectCard key={project.id} project={project} index={index + 1} lead={index === 0} />)}</div>
    {more.length > 0 && <><div className="more-heading"><h2>Academic projects</h2></div><div className="more-grid">{more.map((project, index) => <ProjectCard key={project.id} project={project} index={featured.length + index + 1} />)}</div></>}
    {!catalogue && publishedProjects.length > selected.length && <div className="section-action"><a className="button button-secondary" href={sitePath('/projects')}>View all {publishedProjects.length} projects<Icon /></a></div>}
  </section>
}
