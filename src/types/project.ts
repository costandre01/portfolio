export interface Project {
  id: string
  title: string
  description: string
  summary?: string
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
    galleryCaptions?: string[]
  }
}
