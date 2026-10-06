import { useMemo } from 'react'
import { PageSectionNav } from '../components/PageSectionNav'
import type { Project } from '../types/project'
import { ProjectLinks } from '../components/ProjectLinks'
import { ProjectMedia } from '../components/ProjectMedia'
import { GalleryImage } from '../components/GalleryImage'
import { sitePath } from '../lib/urls'
import { publishedProjects } from '../data/projects'

export function ProjectDetailPage({ project }: { project: Project }) {
  const detail = project.detail!
  const sections = useMemo(() => [
    ...(detail.challenge ? [{ id: 'challenge', label: 'The Challenge' }] : []),
    { id: 'overview', label: detail.overviewTitle ?? 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'engineering', label: 'Engineering' },
    ...(project.gallery?.length ? [{ id: 'gallery', label: 'Gallery' }] : []),
    { id: 'stack', label: 'Stack' },
    { id: 'links', label: 'Links' },
  ], [project.gallery, detail.challenge, detail.overviewTitle])
  const sectionNumber = (number: number) => String(number + (detail.challenge ? 1 : 0)).padStart(2, '0')
  const related = publishedProjects.filter(item => item.detail && item.id !== project.id)
  return <article className="project-detail">
    <header className="container page-heading"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href={sitePath('/')}>Home</a><span aria-hidden="true">/</span><a href={sitePath('/projects')}>Projects</a><span aria-hidden="true">/</span><span aria-current="page">{project.title}</span></nav><p className="eyebrow">{project.category}</p><h1>{project.title}<span>.</span></h1><p>{project.description}</p>{detail.facts && <dl className="project-architecture project-facts">{detail.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}<ul id="stack" tabIndex={-1} className="tags" aria-label="Project technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul><div id="links" tabIndex={-1}><ProjectLinks project={project} highlightDemo={detail.demoFeatured} /></div></header>
    {project.image && <div className="container detail-media"><ProjectMedia project={project} eager /></div>}
    <div className="contextual-page"><PageSectionNav sections={sections} /><div className="contextual-content detail-sections">
      {detail.challenge && <section id="challenge" tabIndex={-1} className="detail-section" data-reveal><p className="eyebrow">01 / CHALLENGE</p><h2>The Challenge</h2><p>{detail.challenge}</p></section>}
      <section id="overview" tabIndex={-1} className="detail-section" data-reveal><p className="eyebrow">{sectionNumber(1) + ' / CONTEXT'}</p><h2>{detail.overviewTitle ?? 'Overview'}</h2>{detail.contribution && <p>{detail.contribution}</p>}<p>{detail.overview}</p></section>
      <section id="features" tabIndex={-1} className="detail-section" data-reveal><p className="eyebrow">{sectionNumber(2) + ' / CAPABILITIES'}</p><h2>Key features</h2><ul className="content-list feature-list">{detail.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>
      <section id="engineering" tabIndex={-1} className="detail-section" data-reveal><p className="eyebrow">{sectionNumber(3) + ' / ENGINEERING'}</p><h2>{detail.technicalTitle}</h2>{detail.architecture && <dl className="project-architecture">{detail.architecture.map(layer => <div key={layer.label}><dt>{layer.label}</dt><dd>{layer.technologies.join(' + ')}</dd></div>)}</dl>}<ul className="content-list">{detail.technicalPoints.map(point => <li key={point}>{point}</li>)}</ul>{detail.publicDemo && <aside className="additional-experience"><h3 className="eyebrow">Public demo</h3><p className="section-description">{detail.publicDemo}</p></aside>}</section>
      {project.gallery && project.gallery.length > 0 && <section id="gallery" tabIndex={-1} className="detail-section"><p className="eyebrow">{sectionNumber(4) + ' / IN DETAIL'}</p><h2>Project gallery</h2><div className="project-gallery">{project.gallery.map((src, index) => <GalleryImage key={src} src={src} caption={detail.galleryCaptions?.[index] ?? `${project.title} screenshot ${index + 1}`} />)}</div></section>}
      <nav className="detail-section related-projects" aria-label="More projects"><h2>Explore another project</h2>{related.map(item => <a key={item.id} href={sitePath(`/projects/${item.id}`)}>{item.title}<span aria-hidden="true">↗</span></a>)}<a href={sitePath('/projects')}>View all projects<span aria-hidden="true">↗</span></a></nav>
    </div></div>
  </article>
}

