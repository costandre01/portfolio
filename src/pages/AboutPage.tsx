import { PageSectionNav } from '../components/PageSectionNav'
import { profile } from '../data/profile'
import { Experience } from '../components/Experience'
import { Skills } from '../components/Skills'
import { Contact } from '../components/Contact'
import { CvButton } from '../components/CvButton'
import { ProfilePhoto } from '../components/ProfilePhoto'
import { SectionHeading } from '../components/SectionHeading'

const sections = [
  { id: 'profile', label: 'Profile' }, { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' }, { id: 'skills', label: 'Skills' },
  { id: 'personal-skills', label: 'People & languages' }, { id: 'cv', label: 'CV' }, { id: 'contact', label: 'Contact' },
]

export function AboutPage() {
  return <>
    <header className="container page-heading"><p className="eyebrow">ABOUT / WEB CV</p><h1>Behind the code<span>.</span></h1><p>Software Developer / Front-End Developer · Computer Engineering Student · Portugal</p><div className="section-action"><CvButton /></div></header>
    <div className="contextual-page"><PageSectionNav sections={sections} /><div className="contextual-content">
    <section id="profile" tabIndex={-1} className="section container web-profile"><div><SectionHeading number="01" label="Profile" title="André Costa" /><p className="section-description">{profile.background}</p><p className="section-description">{profile.summary}</p></div><ProfilePhoto /></section>
    <Experience full />
    <section id="education" tabIndex={-1} className="section container"><SectionHeading number="03" label="Education" title="Education" /><div className="education-grid">{profile.education.map(item => <article className="education-card" data-reveal key={item.institution}><p className="eyebrow">{item.period || 'Secondary education'}</p><h3>{item.institution}</h3><p>{item.qualification}</p>{item.detail && <p className="muted">{item.detail}</p>}</article>)}</div></section>
    <Skills />
    <section id="personal-skills" tabIndex={-1} className="section container cv-extra-grid"><div data-reveal><h2>Soft skills</h2><ul className="tags">{profile.softSkills.map(skill => <li key={skill}>{skill}</li>)}</ul></div><div data-reveal><h2>Languages</h2><ul className="language-list">{profile.languages.map(language => <li key={language.name}><strong>{language.name}</strong><span>{language.level}</span></li>)}</ul></div></section>
    <section id="cv" className="container cv-section" data-reveal><div><p className="eyebrow">CURRICULUM VITAE / PDF</p><h2>Keep the complete overview.</h2><p>Open my current CV as a PDF and save a copy for later.</p></div><CvButton /></section>
    <Contact />
    </div></div>
  </>
}

