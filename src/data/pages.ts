import type { Project } from '../types/project'
import { publishedProjects } from './projects'
import { profile } from './profile'
import { site } from './site'

export const pagePaths = ['/', '/about', '/projects', ...publishedProjects.filter(project => project.detail).map(project => `/projects/${project.id}`)]

// The deployment address can include a GitHub Pages repository subpath.
export function publicUrl(path = '/') {
  return site.url ? `${site.url.replace(/\/$/, '')}${path}` : ''
}

export function pageMetadata(pathname: string) {
  const project = publishedProjects.find(project => project.detail && `/projects/${project.id}` === pathname)
  const metadata = pathname === '/'
    ? { title: 'André Costa | Front-End Developer · React & TypeScript', description: 'Front-End focused Software Developer building interactive applications with React and TypeScript, with full-stack experience in C#, .NET and PostgreSQL.' }
    : pathname === '/about'
      ? { title: 'André Costa | About & CV', description: 'The professional experience, education, technical skills and CV of André Costa, a software developer with a background in CNC/CAM and industry.' }
      : pathname === '/projects'
        ? { title: 'André Costa | Software Projects', description: 'Explore André Costa’s software projects: Eldritch Horror, Deskentra and 3D Product Experience. Real interfaces, technical details, demos and GitHub repositories.' }
        : project
          ? { title: `${project.title} | André Costa`, description: project.description }
          : { title: 'Page not found | André Costa', description: 'This page could not be found. Explore André Costa’s portfolio and software projects.' }
  const socialProject = project ?? (pathname === '/' || pathname === '/projects' ? publishedProjects.find(item => item.image) : undefined)
  const image = socialProject?.image ? publicUrl(socialProject.image) : ''
  return { ...metadata, canonical: publicUrl(pathname), image, imageAlt: image ? socialProject?.imageAlt ?? socialProject?.title ?? '' : '', imageWidth: socialProject?.imageWidth, imageHeight: socialProject?.imageHeight, notFound: !pagePaths.includes(pathname) }
}

// Shared between prerender and development to prevent mismatched metadata.
export function metadataTags(metadata: ReturnType<typeof pageMetadata>) {
  const tags: { attribute: 'name' | 'property'; key: string; content: string }[] = [
    { attribute: 'name', key: 'description', content: metadata.description },
    { attribute: 'property', key: 'og:title', content: metadata.title },
    { attribute: 'property', key: 'og:description', content: metadata.description },
    { attribute: 'property', key: 'og:type', content: 'website' },
    { attribute: 'property', key: 'og:site_name', content: site.name },
    { attribute: 'name', key: 'twitter:card', content: metadata.image ? 'summary_large_image' : 'summary' },
    { attribute: 'name', key: 'twitter:title', content: metadata.title },
    { attribute: 'name', key: 'twitter:description', content: metadata.description },
  ]
  if (metadata.canonical) tags.push({ attribute: 'property', key: 'og:url', content: metadata.canonical })
  if (metadata.image) {
    tags.push({ attribute: 'property', key: 'og:image', content: metadata.image }, { attribute: 'property', key: 'og:image:alt', content: metadata.imageAlt }, { attribute: 'name', key: 'twitter:image', content: metadata.image }, { attribute: 'name', key: 'twitter:image:alt', content: metadata.imageAlt })
    if (metadata.imageWidth) tags.push({ attribute: 'property', key: 'og:image:width', content: String(metadata.imageWidth) })
    if (metadata.imageHeight) tags.push({ attribute: 'property', key: 'og:image:height', content: String(metadata.imageHeight) })
  }
  if (metadata.notFound) tags.push({ attribute: 'name', key: 'robots', content: 'noindex' })
  return tags
}

export const personData = {
  '@type': 'Person', name: site.name, jobTitle: 'Front-End Developer',
  description: profile.summary, email: site.email, sameAs: [site.githubUrl, site.linkedinUrl],
  knowsAbout: ['Software Development', 'Front-End', 'Full-Stack development', ...profile.keySkills, ...profile.ai.skills],
  affiliation: { '@type': 'CollegeOrUniversity', name: profile.education[0].institution },
  ...(site.url ? { '@id': `${publicUrl('/')}#person`, url: publicUrl('/') } : {}),
}

function projectData(project: Project) {
  return {
    '@type': 'SoftwareSourceCode', name: project.title, description: project.description,
    author: personData, codeRepository: project.githubUrl,
    programmingLanguage: project.technologies.filter(tech => ['TypeScript', 'JavaScript', 'C#', 'Java', 'PHP', 'Python', 'HTML', 'CSS'].includes(tech)),
    keywords: project.technologies.join(', '),
    ...(site.url ? { url: publicUrl(`/projects/${project.id}`) } : {}),
    ...(project.demoUrl ? { workExample: { '@type': 'CreativeWork', url: project.demoUrl, name: `${project.title} demo` } } : {}),
    ...(project.image && site.url ? { image: publicUrl(project.image) } : {}),
  }
}

export function pageStructuredData(pathname: string) {
  if (pathname === '/' || pathname === '/about') return {
    '@context': 'https://schema.org', '@type': 'ProfilePage', name: pageMetadata(pathname).title,
    mainEntity: personData,
    ...(site.url ? { url: publicUrl(pathname) } : {}),
    ...(pathname === '/about' ? { about: profile.education.map(item => ({ '@type': 'EducationalOccupationalProgram', name: item.qualification, provider: { '@type': 'EducationalOrganization', name: item.institution } })) } : {}),
  }
  const project = publishedProjects.find(item => item.detail && pathname === `/projects/${item.id}`)
  if (project) return { '@context': 'https://schema.org', ...projectData(project) }
  if (pathname === '/projects') return {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: pageMetadata(pathname).title,
    ...(site.url ? { url: publicUrl(pathname) } : {}),
    mainEntity: { '@type': 'ItemList', itemListElement: publishedProjects.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item: projectData(item) })) },
  }
  return null
}
