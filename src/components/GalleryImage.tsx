import { useState } from 'react'
import { sitePath } from '../lib/urls'

export function GalleryImage({ src, caption }: { src: string; caption: string }) {
  const [failed, setFailed] = useState(false)
  return <figure className="gallery-item" data-reveal><div className="gallery-frame">{failed ? <p>Image unavailable</p> : <img src={sitePath(src)} alt={caption} loading="lazy" decoding="async" onError={() => setFailed(true)} />}</div><figcaption>{caption}</figcaption></figure>
}
