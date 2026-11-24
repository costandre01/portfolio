import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { GalleryImage } from '../src/components/GalleryImage'
import { ProjectMedia } from '../src/components/ProjectMedia'
import { publishedProjects } from '../src/data/projects'

describe('Image error feedback', () => {
  it('replaces a failed gallery image with a message and retains its caption', () => {
    const caption = 'Ticket dashboard on a narrow screen'
    render(<GalleryImage src="/unavailable.png" caption={caption} />)
    fireEvent.error(screen.getByRole('img', { name: caption }))
    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.getByText('Image unavailable')).toBeTruthy()
    expect(screen.getByText(caption).tagName).toBe('FIGCAPTION')
  })

  it('shows feedback for a failed project preview and can display another project', () => {
    const first = publishedProjects[0]
    const second = publishedProjects[1]
    const view = render(<ProjectMedia project={first} />)
    fireEvent.error(screen.getByRole('img'))
    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.getByText('Project preview unavailable.')).toBeTruthy()

    view.rerender(<ProjectMedia project={second} />)
    expect(screen.getByRole('img').getAttribute('alt')).toBe(second.imageAlt)
    expect(screen.queryByText('Project preview unavailable.')).toBeNull()
  })
})
