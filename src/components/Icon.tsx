export function Icon({ name = 'arrow' }: { name?: 'arrow' | 'github' | 'download' | 'code' | 'home' | 'projects' | 'user' | 'mail' | 'sun' | 'moon' }) {
  const paths = {
    home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />,
    projects: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    moon: <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />,
    arrow: <path d="M7 17 17 7M7 7h10v10" />,
    download: <path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" />,
    code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" />,
    github: <path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-2-1-2.5 3-.4 6-1.5 6-6a5 5 0 0 0-1.4-3.5c.2-1 .2-2-.2-3-1.5 0-3 1-3.7 1.5a13 13 0 0 0-6.4 0C7.6 3 6.1 2 4.6 2c-.4 1-.4 2-.2 3A5 5 0 0 0 3 8.5c0 4.5 3 5.6 6 6-.7.5-1 1.5-1 2.5v5" />,
  }
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
