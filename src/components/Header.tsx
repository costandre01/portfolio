import { useEffect, useState } from 'react'
import { navigation, site } from '../data/site'
import { sitePath } from '../lib/urls'
import { CvButton } from './CvButton'
import { Icon } from './Icon'

const navIcons = { Home: 'home', Projects: 'projects', About: 'user', Contact: 'mail' } as const

export function Header({ pathname = '/' }: { pathname?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [contactActive, setContactActive] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      let saved: string | null = null
      try { saved = localStorage.getItem('portfolio-theme') } catch { /* Storage can be unavailable. */ }
      const next = saved === 'light' || saved === 'dark' ? saved : media.matches ? 'dark' : 'light'
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    sync()
    media.addEventListener('change', sync)
    window.addEventListener('storage', sync)
    const contact = document.getElementById('contact')
    const observer = contact ? new IntersectionObserver(([entry]) => setContactActive(entry.isIntersecting), { threshold: .2 }) : null
    if (contact) observer?.observe(contact)
    return () => { media.removeEventListener('change', sync); window.removeEventListener('storage', sync); observer?.disconnect() }
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    setTheme(next)
    try { localStorage.setItem('portfolio-theme', next) } catch { /* The toggle still works without storage. */ }
  }

  return <header className="site-header">
    <div className="sidebar-inner">
      <a href={sitePath('/')} className="wordmark" aria-label={`${site.name}, home`}>ac</a>
      <nav id="navigation" aria-label="Main navigation" className="navigation">
        {navigation.map(({ label, href }) => <a key={label} href={sitePath(href)} aria-current={(label === 'Contact' ? contactActive : label === 'Home' ? pathname === '/' && !contactActive : href === pathname || href === '/projects' && pathname.startsWith('/projects/')) ? 'page' : undefined} title={label}>
          <Icon name={navIcons[label]} /><span className="nav-label">{label}</span>
        </a>)}
        <div className="navigation-cta"><CvButton /></div>
      </nav>
      <div className="sidebar-bottom">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Dark mode" aria-pressed={theme === 'dark'} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /><span>{theme === 'dark' ? 'Light' : 'Dark'}</span></button>
        <a className="sidebar-github" href={site.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Icon name="github" /></a>
        <span className="sidebar-signature">AC / 01</span>
      </div>
    </div>
  </header>
}
