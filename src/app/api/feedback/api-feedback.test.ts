import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'

// Create the mock function in module scope (vitest hoists vi.mock to the top of the file)
const executeMock = vi.fn()

vi.mock('@/lib/db', () => ({
  getDb: () => ({ execute: executeMock }),
}))

describe('POST /api/feedback', () => {
  beforeEach(() => {
    executeMock.mockReset()
    executeMock.mockResolvedValue({ rows: [], columns: [] })
  })

  it('returns 200 when score is valid (5)', async () => {
    const request = new Request('http://localhost/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 5 }),
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true })
  })

  it('returns 200 with score, comment, and source', async () => {
    const request = new Request('http://localhost/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: 8,
        comment: 'Excelente!',
        source: 'calculadora_precificacao',
      }),
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true })
    expect(executeMock).toHaveBeenCalledOnce()
    expect(executeMock).toHaveBeenCalledWith({
      sql: expect.stringContaining('INSERT INTO feedback'),
      args: [8, 'Excelente!', 'calculadora_precificacao'],
    })
  })

  it('returns 400 when score is missing', async () => {
    const request = new Request('http://localhost/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    expect((await response.json()).error).toContain('Score must be 0-10')
  })

  it('returns 400 when score is below 0', async () => {
    const request = new Request('http://localhost/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: -1 }),
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    expect((await response.json()).error).toContain('Score must be 0-10')
  })

  it('returns 400 when score is above 10', async () => {
    const request = new Request('http://localhost/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 11 }),
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
    expect((await response.json()).error).toContain('Score must be 0-10')
  })

  it('returns 400 when score is not a number', async () => {
    const request = new Request('http://localhost/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 'nine' }),
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})