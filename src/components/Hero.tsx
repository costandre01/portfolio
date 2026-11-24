import { site } from '../data/site'
import { profile } from '../data/profile'
import { Icon } from './Icon'
import { HeroProjectsShowcase } from './HeroProjectsShowcase'
import { sitePath } from '../lib/urls'

export function Hero() {
  return <section id="home" className="hero container">
    <div className="hero-topline"><p className="eyebrow"><span className="status-dot" />Open to front-end opportunities</p><span className="mono muted hidden sm:block">BASED IN PORTUGAL</span></div>
    <div className="hero-layout">
      <div className="hero-copy">
        <h1>André Costa</h1>
        <p className="hero-role">{profile.role}<br /><span>{profile.primaryStack}</span></p>
        <p className="hero-description">{profile.introduction}</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work<Icon /></a><a className="button button-secondary" href={sitePath('/about#cv')}>View CV<Icon /></a></div>
        <div className="hero-socials"><a href={site.githubUrl} target="_blank" rel="noopener noreferrer"><Icon name="github" />GitHub<Icon /></a>{site.linkedinUrl && <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn<Icon /></a>}</div>
      </div>
      <HeroProjectsShowcase />
    </div>
    <div className="hero-bottom"><span>Computer Engineering student <span aria-hidden="true">/</span> Practical problem solver</span><a href="#projects">Explore the projects <span aria-hidden="true">↓</span></a></div>
  </section>
}
