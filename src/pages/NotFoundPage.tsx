import { sitePath } from '../lib/urls'
export function NotFoundPage() {
  return <section className="container page-heading"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>Page not found<span>.</span></h1><p>The page you’re looking for isn’t here. Explore the portfolio or return to the project index.</p><div className="hero-actions"><a className="button button-primary" href={sitePath('/')}>Back to home</a><a className="button button-secondary" href={sitePath('/projects')}>View projects</a></div></section>
}
