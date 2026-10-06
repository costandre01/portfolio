import { profile } from '../data/profile'
export function KeySkills() {
  return <section className="container key-skills" aria-labelledby="key-skills-heading"><h2 id="key-skills-heading" className="eyebrow">Core technologies</h2><ul className="tags">{profile.keySkills.map(skill => <li key={skill}>{skill}</li>)}</ul></section>
}
