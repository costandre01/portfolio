import { useState } from 'react'
import type { Project } from '../types/project'
import { sitePath } from '../lib/urls'
import { Icon } from './Icon'

export function ProjectMedia({ project, eager = false }: { project: Project; eager?: boolean }) {
  const [failedImage, setFailedImage] = useState<string | undefined>()
  const showImage = project.image && failedImage !== project.image
  if (!project.image) return null
  return <div className={`project-visual visual-${project.id} ${showImage ? 'has-screenshot' : ''}`}>
    <div className="preview-bar" aria-hidden="true"><span className="preview-dots"><i /><i /><i /></span><span>{project.id} / preview</span><Icon name="code" /></div>
    {showImage ? <div className="project-screenshot"><img src={sitePath(project.image!)} alt={project.imageAlt ?? `${project.title} project preview`} width={project.imageWidth} height={project.imageHeight} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailedImage(project.image)} /></div> : <p className="media-unavailable">Project preview unavailable.</p>}
  </div>
}

