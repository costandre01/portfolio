import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectGallery } from '../src/components/ProjectGallery'

const images = ['/one.webp', '/two.webp', '/three.webp']
const captions = ['Board', 'Character', 'Card']

beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() })
})

function renderGallery() {
  render(<ProjectGallery title="Game" images={images} captions={captions} />)
  const viewport = screen.getByLabelText('Images — swipe, drag or use the arrow keys')
  Object.defineProperty(viewport, 'clientWidth', { configurable: true, value: 600 })
  return viewport
}

describe('Project gallery interactions', () => {
  it('moves with the arrows and disables navigation at either end', async () => {
    const user = userEvent.setup()
    renderGallery()
    const previous = screen.getByRole('button', { name: 'Previous image' }) as HTMLButtonElement
    const next = screen.getByRole('button', { name: 'Next image' }) as HTMLButtonElement
    expect(previous.disabled).toBe(true)
    await user.click(next)
    expect(screen.getByText('Image 2 of 3')).toBeTruthy()
    expect(previous.disabled).toBe(false)
    await user.click(next)
    expect(next.disabled).toBe(true)
    await user.click(previous)
    expect(screen.getByText('Image 2 of 3')).toBeTruthy()
  })

  it('jumps to a thumbnail and identifies the selected image', async () => {
    const user = userEvent.setup()
    const viewport = renderGallery()
    const thumbnail = screen.getByRole('button', { name: 'Show image 3: Card' })
    await user.click(thumbnail)
    expect(thumbnail.getAttribute('aria-current')).toBe('true')
    expect(screen.getByRole('button', { name: 'Show image 1: Board' }).getAttribute('aria-current')).toBeNull()
    expect(viewport.scrollTo).toHaveBeenCalledWith({ left: 1200, behavior: 'smooth' })
  })

  it('supports arrow keys and Home/End when the viewport is focused', async () => {
    const user = userEvent.setup()
    const viewport = renderGallery()
    viewport.focus()
    await user.keyboard('{End}')
    expect(screen.getByText('Image 3 of 3')).toBeTruthy()
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByText('Image 2 of 3')).toBeTruthy()
    await user.keyboard('{Home}{ArrowRight}')
    expect(screen.getByText('Image 2 of 3')).toBeTruthy()
  })

  it('updates the counter and thumbnail after native horizontal scrolling', () => {
    const viewport = renderGallery()
    viewport.scrollLeft = 1200
    fireEvent.scroll(viewport)
    expect(screen.getByText('Image 3 of 3')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Show image 3: Card' }).getAttribute('aria-current')).toBe('true')
  })

  it('respects reduced motion when navigating', async () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    const user = userEvent.setup()
    const viewport = renderGallery()
    await user.click(screen.getByRole('button', { name: 'Next image' }))
    expect(viewport.scrollTo).toHaveBeenCalledWith({ left: 600, behavior: 'instant' })
  })

  it('drags with the mouse and snaps to the nearest image on release', async () => {
    const user = userEvent.setup()
    const viewport = renderGallery()
    Object.defineProperties(viewport, {
      setPointerCapture: { value: vi.fn() },
      hasPointerCapture: { value: () => true },
      releasePointerCapture: { value: vi.fn() },
    })
    await user.pointer([
      { keys: '[MouseLeft>]', target: viewport, coords: { clientX: 500 } },
      { target: viewport, coords: { clientX: 100 } },
      { keys: '[/MouseLeft]', target: viewport },
    ])
    expect(viewport.scrollLeft).toBe(400)
    expect(viewport.scrollTo).toHaveBeenCalledWith({ left: 600, behavior: 'smooth' })
    expect(screen.getByText('Image 2 of 3')).toBeTruthy()
  })

  it('keeps the selected image when the viewport width changes', async () => {
    let resize = () => {}
    const disconnect = vi.fn()
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback: () => void) { resize = callback }
      observe() {}
      disconnect = disconnect
    })
    const user = userEvent.setup()
    const viewport = renderGallery()
    resize()
    await user.click(screen.getByRole('button', { name: 'Show image 3: Card' }))
    Object.defineProperty(viewport, 'clientWidth', { configurable: true, value: 300 })
    fireEvent.scroll(viewport)
    resize()
    expect(screen.getByText('Image 3 of 3')).toBeTruthy()
    expect(viewport.scrollTo).toHaveBeenCalledWith({ left: 600, behavior: 'instant' })
  })
})
