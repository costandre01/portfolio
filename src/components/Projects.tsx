import { publishedProjects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'
import { sitePath } from '../lib/urls'
import { Icon } from './Icon'
export function Projects({ catalogue = false }: { catalogue?: boolean }) {
  const featured = publishedProjects.filter(project => project.featured)
  const more = publishedProjects.filter(project => !project.featured)
  return <section id="projects" className={`section container selected-work ${catalogue ? 'catalogue-section' : ''}`}><SectionHeading number="01" label="Selected work" title={catalogue ? 'Featured projects' : 'Real products. Real complexity.'} description="Game systems, full-stack platforms, interactive experiences and connected devices. Explore the interface, then look inside the code." />
    <div className={`featured-grid ${featured.length >= 4 ? 'featured-grid-balanced' : ''}`}>{featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index + 1} lead={index === 0} />)}</div>
    {more.length > 0 && <><div className="more-heading"><h3>{catalogue ? 'Other projects' : 'More things I’ve built'}</h3><span className="mono muted">CONTINUING TO EXPLORE</span></div><div className="more-grid">{more.map((project, index) => <ProjectCard key={project.id} project={project} index={featured.length + index + 1} />)}</div></>}
    {!catalogue && <div className="section-action"><a className="button button-secondary" href={sitePath('/projects')}>View all projects<Icon /></a></div>}
  </section>
}
