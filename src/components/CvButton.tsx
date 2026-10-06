import { site } from '../data/site'
import { Icon } from './Icon'
import { sitePath } from '../lib/urls'
export function CvButton({ onClick }: { onClick?: () => void } = {}) {
  return site.cv.available
    ? <a className="button button-secondary" href={sitePath(site.cv.url)} target="_blank" rel="noopener noreferrer" onClick={onClick} aria-label="Download CV (opens PDF in a new tab)"><Icon name="download" />Download CV</a>
    : <span className="cv-action"><button className="button button-secondary" disabled><Icon name="download" />Download CV</button><span className="availability">CV coming soon</span></span>
}
