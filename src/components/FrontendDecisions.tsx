import type { Project } from '../types/project'

type Decisions = NonNullable<NonNullable<Project['detail']>['frontendDecisions']>

export function FrontendDecisions({ decisions }: { decisions: Decisions }) {
  return <section id="frontend-decisions" tabIndex={-1} className="frontend-decisions" aria-labelledby="frontend-decisions-heading">
    <h3 id="frontend-decisions-heading">Front-end decisions</h3>
    <div className="decision-list">{decisions.map(decision => <article className="decision-item" key={decision.title}>
      <h4>{decision.title}</h4>
      <dl>
        <div><dt>Approach</dt><dd>{decision.decision}</dd></div>
        <div><dt>In practice</dt><dd>{decision.effect}</dd></div>
        {decision.tradeoff && <div><dt>Trade-off</dt><dd>{decision.tradeoff}</dd></div>}
      </dl>
    </article>)}</div>
  </section>
}
