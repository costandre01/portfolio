// Replace public/cv/andre-costa-cv.pdf to update the CV without changing links.
export const site = {
  name: 'André Costa',
  githubUrl: 'https://github.com/costandre01',
  linkedinUrl: 'https://www.linkedin.com/in/andre-costa-/',
  linkedinLabel: 'linkedin.com/in/andre-costa',
  email: 'costandre01@gmail.com',
  // Optional absolute public URL, e.g. set your deployed domain here for canonical URLs.
  url: import.meta.env.VITE_SITE_URL?.trim() || '',
  photo: { url: '/images/andre-costa.webp', available: true, width: 308, height: 410 },
  cv: { url: '/cv/andre-costa-cv.pdf', available: true },
}
export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
] as const
