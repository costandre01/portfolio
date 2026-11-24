import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { sitePath } from '../lib/urls'
import { GalleryImage } from './GalleryImage'

function centerThumbnail(rail: HTMLDivElement | null, index: number, behavior: ScrollBehavior) {
  const thumbnail = rail?.children[index] as HTMLElement | undefined
  if (rail && thumbnail) rail.scrollTo({ left: thumbnail.offsetLeft - (rail.clientWidth - thumbnail.clientWidth) / 2, behavior })
}

export function ProjectGallery({ images, captions = [], title }: { images: string[]; captions?: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const viewport = useRef<HTMLDivElement>(null)
  const thumbnails = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointer: number; start: number; scroll: number } | null>(null)
  const selectedIndex = useRef(0)
  const viewportWidth = useRef(0)
  const id = useId()
  const caption = (index: number) => captions[index] ?? `${title} image ${index + 1}`

  useEffect(() => {
    const element = viewport.current
    if (!element || typeof ResizeObserver === 'undefined') return
    viewportWidth.current = element.clientWidth
    const observer = new ResizeObserver(() => {
      if (viewportWidth.current === element.clientWidth) return
      viewportWidth.current = element.clientWidth
      element.scrollTo({ left: selectedIndex.current * element.clientWidth, behavior: 'instant' })
      centerThumbnail(thumbnails.current, selectedIndex.current, 'instant')
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    centerThumbnail(thumbnails.current, active, reduced ? 'instant' : 'smooth')
  }, [active])

  function select(index: number) {
    const next = Math.max(0, Math.min(images.length - 1, index))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    selectedIndex.current = next
    setActive(next)
    viewport.current?.scrollTo({ left: next * viewport.current.clientWidth, behavior: reduced ? 'instant' : 'smooth' })
  }

  function keyDown(event: KeyboardEvent<HTMLDivElement>) {
    const destinations: Record<string, number> = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: images.length - 1 }
    if (!(event.key in destinations)) return
    event.preventDefault()
    select(destinations[event.key])
  }

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    event.preventDefault()
    event.currentTarget.focus({ preventScroll: true })
    drag.current = { pointer: event.pointerId, start: event.clientX, scroll: event.currentTarget.scrollLeft }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.pointer !== event.pointerId) return
    drag.current = null
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    const width = event.currentTarget.clientWidth
    if (width) select(Math.round(event.currentTarget.scrollLeft / width))
  }

  if (!images.length) return null
  return <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label={`${title} gallery`}>
    <div className="carousel-toolbar">
      <p className="carousel-count" aria-live="polite" aria-atomic="true">Image {active + 1} of {images.length}</p>
      <div className="carousel-arrows">
        <button type="button" aria-label="Previous image" aria-controls={id} disabled={active === 0} onClick={() => select(active - 1)}><span aria-hidden="true">←</span></button>
        <button type="button" aria-label="Next image" aria-controls={id} disabled={active === images.length - 1} onClick={() => select(active + 1)}><span aria-hidden="true">→</span></button>
      </div>
    </div>
    <div ref={viewport} id={id} className={`carousel-viewport${dragging ? ' is-dragging' : ''}`} tabIndex={0} aria-label="Images — swipe, drag or use the arrow keys" onKeyDown={keyDown}
      onScroll={event => {
        const element = event.currentTarget
        if (!element.clientWidth || viewportWidth.current && viewportWidth.current !== element.clientWidth) return
        const index = Math.min(images.length - 1, Math.max(0, Math.round(element.scrollLeft / element.clientWidth)))
        selectedIndex.current = index
        setActive(index)
      }}
      onPointerDown={pointerDown} onPointerMove={event => { if (drag.current?.pointer === event.pointerId) event.currentTarget.scrollLeft = drag.current.scroll - (event.clientX - drag.current.start) }}
      onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { drag.current = null; setDragging(false) }} onDragStart={event => event.preventDefault()}>
      {images.map((src, index) => <div className="carousel-slide" key={src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${images.length}`}><GalleryImage src={src} caption={caption(index)} /></div>)}
    </div>
    <div ref={thumbnails} className="carousel-thumbnails" role="group" aria-label="Choose an image">{images.map((src, index) => <button type="button" key={src} className="carousel-thumbnail" aria-label={`Show image ${index + 1}: ${caption(index)}`} aria-current={active === index ? 'true' : undefined} aria-controls={id} onClick={() => select(index)}>
      <img src={sitePath(src)} alt="" loading="lazy" draggable={false} /><span>{String(index + 1).padStart(2, '0')}</span>
    </button>)}</div>
  </div>
}
