import { SectionHeading } from './SectionHeading'
import { Icon } from './Icon'
import { profile } from '../data/profile'
const groups = [
  { title: 'Frontend', label: 'Interfaces & experiences', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { title: 'Backend & Data', label: 'Logic & data', items: ['C#', '.NET', 'REST APIs', 'PostgreSQL', 'SQL'] },
  { title: 'Engineering', label: 'Build, test & structure', items: ['Git', 'Testing (Vitest)', 'Software Architecture', 'State Management'] },
  { title: 'Tools & Other', label: 'Tools & complementary experience', items: ['Java', 'Vite', 'GitHub', 'Blender', 'Three.js', 'IoT'] },
]
export function Skills() {
  return <section id="skills" className="section container"><SectionHeading number="04" label="Technology stack" title="The right tools. Well applied." description="The technologies I use across interfaces, application logic and development workflows." />
    <div className="skills-grid">{groups.map((group, index) => <article className="skill-group" data-reveal key={group.title}><div className="skill-header"><span className="skill-number mono">0{index + 1} /</span><Icon name="code" /></div><h3>{group.title}</h3><p>{group.label}</p><ul className="tags">{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
    <details className="additional-experience" data-reveal><summary>{profile.ai.title}</summary><p>{profile.ai.summary}</p><ul className="tags">{profile.ai.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></details>
  </section>
}
