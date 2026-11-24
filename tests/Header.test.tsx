import { describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '../src/components/Header'

describe('Theme interaction', () => {
  it('switches themes and restores the choice on a new mount', async () => {
    const user = userEvent.setup()
    const view = render(<Header />)
    expect(document.documentElement.dataset.theme).toBe('light')

    await user.click(screen.getByRole('button', { name: 'Dark mode' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('portfolio-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: 'Dark mode' }).getAttribute('aria-pressed')).toBe('true')

    view.unmount()
    render(<Header />)
    expect(document.documentElement.dataset.theme).toBe('dark')

    await user.click(screen.getByRole('button', { name: 'Dark mode' }))
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('portfolio-theme')).toBe('light')
  })

  it('supports keyboard activation', async () => {
    const user = userEvent.setup()
    render(<Header />)
    screen.getByRole('button', { name: 'Dark mode' }).focus()
    await user.keyboard(' ')
    expect(document.documentElement.dataset.theme).toBe('dark')
    await user.keyboard('{Enter}')
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('follows system changes until the visitor chooses a theme', async () => {
    const user = userEvent.setup()
    const listeners = new Set<() => void>()
    const media = {
      matches: true,
      addEventListener: (_: string, callback: () => void) => listeners.add(callback),
      removeEventListener: (_: string, callback: () => void) => listeners.delete(callback),
    }
    vi.stubGlobal('matchMedia', vi.fn(() => media))
    const view = render(<Header />)
    expect(document.documentElement.dataset.theme).toBe('dark')
    act(() => { media.matches = false; listeners.forEach(callback => callback()) })
    expect(document.documentElement.dataset.theme).toBe('light')

    await user.click(screen.getByRole('button', { name: 'Dark mode' }))
    act(() => { listeners.forEach(callback => callback()) })
    expect(document.documentElement.dataset.theme).toBe('dark')
    view.unmount()
    expect(listeners.size).toBe(0)
  })

  it('still switches themes when storage is unavailable', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage blocked') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage blocked') })
    const user = userEvent.setup()
    render(<Header />)
    await user.click(screen.getByRole('button', { name: 'Dark mode' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(screen.getByRole('button', { name: 'Dark mode' }).getAttribute('aria-pressed')).toBe('true')
  })
})
