import { site } from '../data/site'
import { Icon } from './Icon'
import { HeroProjectsShowcase } from './HeroProjectsShowcase'
import { sitePath } from '../lib/urls'

export function Hero() {
  return <section id="home" className="hero container">
    <div className="hero-topline"><p className="eyebrow"><span className="status-dot" />Available for software opportunities</p><span className="mono muted hidden sm:block">PORTUGAL / FRONT-END & SOFTWARE</span></div>
    <div className="hero-layout">
      <div className="hero-copy">
        <h1 aria-label="André Costa"><span className="hero-name-line">André</span>{' '}<span className="hero-name-line">Costa<span className="accent">.</span></span></h1>
        <p className="hero-role">Software Developer<br /><span>Front-End focused.<br />Full-Stack capable.</span></p>
        <p className="hero-description">I build interactive interfaces, full-stack applications and complex software systems.</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work<Icon /></a><a className="button button-secondary" href={sitePath('/about#cv')}>View CV<Icon /></a></div>
        <div className="hero-socials"><a href={site.githubUrl} target="_blank" rel="noopener noreferrer"><Icon name="github" />GitHub<Icon /></a>{site.linkedinUrl && <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn<Icon /></a>}</div>
      </div>
      <HeroProjectsShowcase />
    </div>
    <div className="hero-bottom"><span>Computer Engineering student <span aria-hidden="true">/</span> Practical problem solver</span><a href="#projects">Explore the projects <span aria-hidden="true">↓</span></a></div>
  </section>
}
