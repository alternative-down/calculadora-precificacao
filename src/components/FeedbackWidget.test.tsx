import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FeedbackWidget from './FeedbackWidget'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
vi.stubGlobal('localStorage', localStorageMock)

// Mock fetch
const fetchMock = vi.fn()
global.fetch = fetchMock

describe('FeedbackWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    fetchMock.mockResolvedValue({ ok: true, json: () => Promise.resolve({ success: true }) })
  })

  it('renders the feedback modal title', () => {
    render(<FeedbackWidget onClose={vi.fn()} />)
    expect(screen.getByText(/sua opinião importa/i)).toBeTruthy()
  })

  it('renders score buttons 1-10', () => {
    render(<FeedbackWidget onClose={vi.fn()} />)
    const scoreButtons = screen.getAllByRole('button').filter(b => {
      const n = Number(b.textContent)
      return !isNaN(n) && n >= 1 && n <= 10
    })
    expect(scoreButtons.length).toBe(10)
  })

  it('calls onClose when skip button is clicked', () => {
    const onClose = vi.fn()
    render(<FeedbackWidget onClose={onClose} />)
    const skipBtn = screen.getByRole('button', { name: /pular/i })
    fireEvent.click(skipBtn)
    expect(onClose).toHaveBeenCalled()
  })

  it('disables submit button when no score is selected', () => {
    render(<FeedbackWidget onClose={vi.fn()} />)
    const submitBtn = screen.getByRole('button', { name: /enviar feedback/i })
    expect(submitBtn).toBeDisabled()
  })

  it('enables submit button when score is selected', () => {
    render(<FeedbackWidget onClose={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: '7' }))
    const submitBtn = screen.getByRole('button', { name: /enviar feedback/i })
    expect(submitBtn).not.toBeDisabled()
  })

  it('shows success state after successful submit', async () => {
    const onClose = vi.fn()
    render(<FeedbackWidget onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: '9' }))
    fireEvent.click(screen.getByRole('button', { name: /enviar feedback/i }))
    await waitFor(() => {
      expect(screen.getByText(/obrigado pelo feedback/i)).toBeTruthy()
    })
  })

  it('logs error to console on fetch failure (no user-facing error UI)', async () => {
    const consoleError = vi.fn()
    vi.stubGlobal('console', { ...console, error: consoleError })
    fetchMock.mockRejectedValueOnce(new Error('Network error'))
    const onClose = vi.fn()
    render(<FeedbackWidget onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: '5' }))
    fireEvent.click(screen.getByRole('button', { name: /enviar feedback/i }))
    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Feedback error:', expect.any(Error))
    })
  })

  it('sets localStorage on successful submit', async () => {
    const onClose = vi.fn()
    render(<FeedbackWidget onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: '10' }))
    fireEvent.click(screen.getByRole('button', { name: /enviar feedback/i }))
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('calc_feedback_shown', 'true')
    })
  })
})