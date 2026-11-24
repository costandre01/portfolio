import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import './theme.css'
import App from './App.tsx'
import { pagePath } from './lib/urls'
import { applyMetadata } from './lib/metadata'

const pathname = pagePath(window.location.pathname)
applyMetadata(pathname)
const container = document.getElementById('root')!
const app = <StrictMode><App pathname={pathname} /></StrictMode>
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
