import { profile } from '../data/profile'
import { SectionHeading } from './SectionHeading'
import { sitePath } from '../lib/urls'
import { Icon } from './Icon'

export function Experience({ full = false }: { full?: boolean }) {
  return <section id="experience" className="section container"><SectionHeading number={full ? '02' : '03'} label="Professional experience" title={full ? 'Professional experience' : 'Experience beyond the code.'} description={full ? undefined : 'A practical background in technical environments, industrial workflows and team leadership.'} />
    <div className={`experience-list ${full ? 'experience-full' : ''}`}>{profile.experience.map(job => <article key={job.company} data-reveal className="experience-item"><p className="experience-period mono">{full ? (job.fullPeriod ?? job.period) : job.period}</p><div><h3>{full ? job.company : (job.shortCompany ?? job.company)}</h3><p className="experience-role">{job.role}</p>{!full && job.summary && <p className="experience-summary">{job.summary}</p>}{full && <ul className="content-list">{job.points.map(point => <li key={point}>{point}</li>)}</ul>}</div></article>)}</div>
    {!full && <div className="section-action"><a className="button button-secondary" href={sitePath('/about#experience')}>View full experience<Icon /></a></div>}
  </section>
}
