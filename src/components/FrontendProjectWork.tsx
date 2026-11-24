import { publishedProjects } from '../data/projects'
import { sitePath } from '../lib/urls'
import { Icon } from './Icon'

const contributions = [
  { id: 'deskentra', description: 'React and TypeScript ticket workflows, reusable forms, server-data queries and integration with a C#/.NET API.' },
  { id: 'vekstoria', description: 'Solo development of a React and TypeScript game interface connected to a custom rules engine and multi-step player decisions.' },
]

export function FrontendProjectWork() {
  return <div className="frontend-project-work">
    <h3>Front-end project work</h3>
    <p className="section-description">Implementation examples are documented in the project case studies, separately from my employment history.</p>
    <div>{contributions.map(contribution => {
      const project = publishedProjects.find(item => item.id === contribution.id)
      return project && <a key={project.id} href={sitePath(`/projects/${project.id}`)}><span><strong>{project.title}</strong><span>{contribution.description}</span></span><Icon /></a>
    })}</div>
    <p className="section-description">The IoT Smart Home Platform is an academic project connecting a web dashboard to physical devices. Its public demo simulates the hardware.</p>
    <p className="section-description">3D Product Experience is also an academic project, built individually with JavaScript and Three.js to explore product customization, animation and audio controls.</p>
  </div>
}
