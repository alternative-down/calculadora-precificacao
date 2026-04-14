import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroVariantA, HeroVariantB } from './HeroVariant'

// Mock SocialProofCounter to avoid localStorage/timer deps in child component
vi.mock('./SocialProofCounter', () => ({
  default: () => <div data-testid="social-proof">SocialProofCounter</div>,
}))

const mockOnStart = vi.fn()

describe('HeroVariantA', () => {
  beforeEach(() => {
    mockOnStart.mockClear()
  })

  it('renders the problema awareness headline', () => {
    render(<HeroVariantA onStart={mockOnStart} />)
    expect(screen.getByText(/Quanto você deveria cobrar pelo seu trabalho/)).toBeTruthy()
  })

  it('renders the subtitle with "matemática, não chute"', () => {
    render(<HeroVariantA onStart={mockOnStart} />)
    expect(screen.getByText(/Use matemática, não chute/)).toBeTruthy()
  })

  it('renders the CTA button', () => {
    render(<HeroVariantA onStart={mockOnStart} />)
    expect(screen.getByRole('button', { name: /Calcular meu preço grátis/i })).toBeTruthy()
  })

  it('calls onStart when CTA is clicked', () => {
    render(<HeroVariantA onStart={mockOnStart} />)
    screen.getByRole('button', { name: /Calcular meu preço grátis/i }).click()
    expect(mockOnStart).toHaveBeenCalledTimes(1)
  })

  it('renders free limit note', () => {
    render(<HeroVariantA onStart={mockOnStart} />)
    expect(screen.getByText(/3 cálculos gratuitos por mês/)).toBeTruthy()
    expect(screen.getByText(/Sem cadastro/)).toBeTruthy()
  })

  it('renders SocialProofCounter', () => {
    render(<HeroVariantA onStart={mockOnStart} />)
    expect(screen.getByTestId('social-proof')).toBeTruthy()
  })
})

describe('HeroVariantB', () => {
  beforeEach(() => {
    mockOnStart.mockClear()
  })

  it('renders the resultado headline', () => {
    render(<HeroVariantB onStart={mockOnStart} />)
    expect(screen.getByText(/Descubra o preço certo do seu serviço em 3 minutos/)).toBeTruthy()
  })

  it('renders the subtitle mentioning "sem planilha"', () => {
    render(<HeroVariantB onStart={mockOnStart} />)
    expect(screen.getByText(/sem planilha/)).toBeTruthy()
  })

  it('renders the CTA button with "grátis"', () => {
    render(<HeroVariantB onStart={mockOnStart} />)
    expect(screen.getByRole('button', { name: /Calcular agora — grátis/i })).toBeTruthy()
  })

  it('calls onStart when CTA is clicked', () => {
    render(<HeroVariantB onStart={mockOnStart} />)
    screen.getByRole('button', { name: /Calcular agora — grátis/i }).click()
    expect(mockOnStart).toHaveBeenCalledTimes(1)
  })

  it('renders free limit note', () => {
    render(<HeroVariantB onStart={mockOnStart} />)
    expect(screen.getByText(/3 cálculos gratuitos por mês/)).toBeTruthy()
    expect(screen.getByText(/Sem cadastro/)).toBeTruthy()
  })

  it('renders SocialProofCounter', () => {
    render(<HeroVariantB onStart={mockOnStart} />)
    expect(screen.getByTestId('social-proof')).toBeTruthy()
  })
})
