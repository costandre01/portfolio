import { useEffect, useRef, useState } from 'react'
import { navigation, site } from '../data/site'
import { sitePath } from '../lib/urls'
import { CvButton } from './CvButton'

export function Header({ pathname = '/' }: { pathname?: string }) {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', outside)
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside) }
  }, [open])
  return <header ref={header} className="site-header"><div className="container flex items-center justify-between gap-6">
    <a href={sitePath('/')} className="wordmark" aria-label={`${site.name}, home`} onClick={() => setOpen(false)}>ac<span>.</span><span className="wordmark-name">André Costa</span></a>
    <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button>
    <nav id="navigation" aria-label="Main navigation" className={`navigation ${open ? 'is-open' : ''}`}>
      {navigation.map(({ label, href }) => <a key={label} href={sitePath(href)} aria-current={href === pathname ? 'page' : undefined} onClick={() => setOpen(false)}>{label}{label === 'Contact' && <span aria-hidden="true"> ↗</span>}</a>)}
      <div className="navigation-cta"><CvButton onClick={() => setOpen(false)} /></div>
    </nav>
  </div></header>
}
