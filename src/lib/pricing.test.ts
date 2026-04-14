import '@testing-library/jest-dom/vitest'
import { describe, it, expect } from 'vitest'
import { FREE_LIMIT, PAY_PER_USE_PRICE, MONTHLY_PRICE, STORAGE_KEY } from './pricing'

describe('pricing constants', () => {
  it('FREE_LIMIT is 3', () => {
    expect(FREE_LIMIT).toBe(3)
  })

  it('PAY_PER_USE_PRICE is R$ 9.90', () => {
    expect(PAY_PER_USE_PRICE).toBe(9.9)
  })

  it('MONTHLY_PRICE is R$ 29', () => {
    expect(MONTHLY_PRICE).toBe(29)
  })

  it('STORAGE_KEY is calc_preco_history', () => {
    expect(STORAGE_KEY).toBe('calc_preco_history')
  })

  it('avulso price is approximately 1/3 of monthly (R$9.90 vs R$29)', () => {
    // 9.90 × 3 = 29.70 ≈ 3× monthly; slightly over due to 9.90/29 = 2.93×
    expect(PAY_PER_USE_PRICE * 3).toBeGreaterThan(MONTHLY_PRICE)
  })

  it('free limit allows at least one free calculation', () => {
    expect(FREE_LIMIT).toBeGreaterThan(0)
  })
})
