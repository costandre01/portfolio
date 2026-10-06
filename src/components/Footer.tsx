import { site } from '../data/site'
import { Icon } from './Icon'
export function Footer() {
  return <footer className="container footer"><p>© {new Date().getFullYear()} André Costa<span className="footer-caption">Built with React &amp; TypeScript.</span></p><a href={site.githubUrl} target="_blank" rel="noreferrer">GitHub<Icon /></a><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn<Icon /></a><a href="#main">Back to top ↑</a></footer>
}
