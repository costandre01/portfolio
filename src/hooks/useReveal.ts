import { useEffect, useRef } from 'react'

// Content stays visible if motion is reduced or IntersectionObserver is unavailable.
export function useReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches || !('IntersectionObserver' in window)) return
    const elements = Array.from(ref.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [])
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.remove('reveal-pending')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08 })
    elements.forEach(element => { element.classList.add('reveal-pending'); observer.observe(element) })
    const clear = () => {
      observer.disconnect()
      elements.forEach(element => element.classList.remove('reveal-pending'))
    }
    const onMotionChange = () => { if (motion.matches) clear() }
    motion.addEventListener('change', onMotionChange)
    return () => { clear(); motion.removeEventListener('change', onMotionChange) }
  }, [])
  return ref
}
