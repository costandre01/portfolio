import { SectionHeading } from './SectionHeading'
import { sitePath } from '../lib/urls'
export function About() {
  return <section id="about" className="section container about-layout"><SectionHeading number="02" label="Quick profile" title="Front-End development. Engineering mindset." />
    <div className="about-copy" data-reveal><div className="profile-intro"><p>I’m moving into front-end development alongside my work in CAM/CNC and C# post-processors, and my Computer Engineering degree. My projects show how I apply that technical background to web interfaces.</p></div><a className="text-link" href={sitePath('/about')}>Read my profile &amp; CV ↗</a></div>
  </section>
}
