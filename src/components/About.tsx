import { SectionHeading } from './SectionHeading'
import { sitePath } from '../lib/urls'
export function About() {
  return <section id="about" className="section container about-layout"><SectionHeading number="02" label="Quick profile" title="Software focus. Engineering mindset." />
    <div className="about-copy" data-reveal><div className="profile-intro"><p>I’m a software developer and Computer Engineering student focused on Front-End and React, with Full-Stack capability. My engineering and industrial background brings a practical approach to solving complex problems.</p></div><a className="text-link" href={sitePath('/about')}>Read my profile &amp; CV ↗</a></div>
  </section>
}
