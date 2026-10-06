import { useState } from 'react'
import { site } from '../data/site'
import { sitePath } from '../lib/urls'

export function ProfilePhoto() {
  const [failed, setFailed] = useState(false)
  if (!site.photo.available || failed) return null
  return <div className="profile-photo"><img src={sitePath(site.photo.url)} alt="André Costa" width={site.photo.width} height={site.photo.height} loading="eager" decoding="async" onError={() => setFailed(true)} /></div>
}
