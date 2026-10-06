import { useEffect, useId, useState } from 'react'

export interface PageSection { id: string; label: string }

export function PageSectionNav({ sections }: { sections: readonly PageSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')
  const panelId = useId()
  useEffect(() => {
    const targets = sections.map(section => document.getElementById(section.id)).filter((element): element is HTMLElement => Boolean(element))
      .sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
    const select = () => {
      const current = targets.filter(element => element.getBoundingClientRect().top <= Math.max(150, window.innerHeight * .35)).at(-1) ?? targets[0]
      if (current) setActive(current.id)
    }
    const onHashChange = () => {
      const id = window.location.hash.slice(1)
      if (sections.some(section => section.id === id)) setActive(id)
    }
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(select, { rootMargin: '-110px 0px -65% 0px', threshold: 0 }) : undefined
    targets.forEach(target => observer?.observe(target))
    window.addEventListener('hashchange', onHashChange)
    return () => { observer?.disconnect(); window.removeEventListener('hashchange', onHashChange) }
  }, [sections])
  const links = sections.map((section, index) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined} onClick={event => { setActive(section.id); event.currentTarget.closest('details')?.removeAttribute('open') }}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.label}</a>)
  return <aside className="page-section-nav">
    <nav className="section-nav-desktop" aria-label="On this page"><p className="mono">On this page</p>{links}</nav>
    <details className="section-nav-compact"><summary aria-controls={panelId}>On this page <span aria-hidden="true">+</span></summary><nav id={panelId} aria-label="On this page">{links}</nav></details>
  </aside>
}
