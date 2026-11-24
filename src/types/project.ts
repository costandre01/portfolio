export interface Project {
  id: string
  title: string
  description: string
  summary?: string
  developmentNote?: string
  published: boolean
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  gallery?: string[]
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  demoLabel?: string
  featured: boolean
  category: string
  context?: 'Personal project' | 'Academic project'
  detail?: {
    challenge?: string
    overviewTitle?: string
    contribution?: string
    publicDemo?: string
    facts?: { label: string; value: string }[]
    demoFeatured?: boolean
    overview: string
    features: string[]
    technicalTitle: string
    architecture?: { label: string; technologies: string[] }[]
    technicalPoints: string[]
    frontendDecisions?: { title: string; decision: string; effect: string; tradeoff?: string }[]
    interfaceDetails?: { title: string; behavior: string; implementation: string[] }[]
    galleryCaptions?: string[]
  }
}
