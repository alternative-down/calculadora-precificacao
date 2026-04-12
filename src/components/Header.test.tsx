import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders the logo text', () => {
    render(<Header />)
    expect(screen.getByText('Alternative Down')).toBeTruthy()
  })

  it('renders the Suporte link', () => {
    render(<Header />)
    expect(screen.getByText('Suporte')).toBeTruthy()
  })

  it('renders the Voltar link', () => {
    render(<Header />)
    expect(screen.getByText('Voltar')).toBeTruthy()
  })

  it('renders all links as anchor tags', () => {
    render(<Header />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(2)
  })
})