import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders the hero title', () => {
    render(<Hero onStart={vi.fn()} />)
    expect(screen.getByText(/quanto você deveria cobrar/i)).toBeTruthy()
  })

  it('renders the CTA button', () => {
    render(<Hero onStart={vi.fn()} />)
    expect(screen.getByRole('button', { name: /descubra seu preço real/i })).toBeTruthy()
  })

  it('renders the free tier subtitle', () => {
    render(<Hero onStart={vi.fn()} />)
    expect(screen.getByText(/3 cálculos gratuitos/i)).toBeTruthy()
  })

  it('calls onStart when CTA is clicked', () => {
    const onStart = vi.fn()
    render(<Hero onStart={onStart} />)
    const cta = screen.getByRole('button', { name: /descubra seu preço real/i })
    cta.click()
    expect(onStart).toHaveBeenCalledOnce()
  })
})