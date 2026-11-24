import { site } from '../data/site'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'
export function Contact() {
  const contacts = [
    { label: 'Email', detail: site.email || 'Email address coming soon', url: site.email ? `mailto:${site.email}` : '' },
    { label: 'LinkedIn', detail: site.linkedinUrl ? site.linkedinLabel : 'LinkedIn profile coming soon', url: site.linkedinUrl },
    { label: 'GitHub', detail: '@costandre01', url: site.githubUrl },
  ]
  return <section id="contact" className="section container contact-layout"><SectionHeading number="05" label="Contact" title="Have a front-end role in mind?" description="Send me the role and a little about the team by email." /><div className="contact-links" data-reveal>{contacts.map(contact => contact.url ? <a key={contact.label} href={contact.url} target={contact.label === 'Email' ? undefined : '_blank'} rel="noreferrer"><div><h3>{contact.label}</h3><p>{contact.detail}</p></div><Icon /></a> : <div key={contact.label} className="contact-pending"><div><h3>{contact.label}</h3><p>{contact.detail}</p></div><span className="availability">Coming soon</span></div>)}</div></section>
}
