import type { Project } from '../types/project'

type Details = NonNullable<NonNullable<Project['detail']>['interfaceDetails']>

export function InterfaceDetails({ details }: { details: Details }) {
  return <section id="interface-details" tabIndex={-1} className="interface-details" aria-labelledby="interface-details-heading">
    <h3 id="interface-details-heading">Interface in practice</h3>
    <p className="section-description">Examples from the ticket workflow: responsive forms, accessible field feedback and clear interface states.</p>
    <div className="interface-detail-list">{details.map(detail => <article className="interface-detail-item" key={detail.title}>
      <h4>{detail.title}</h4>
      <p>{detail.behavior}</p>
      <p className="implementation-reference"><span>Implementation</span>{detail.implementation.map(file => <code key={file}>{file}</code>)}</p>
    </article>)}</div>
  </section>
}
