import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

interface FeedbackPayload {
  score: number
  comment: string | null
  source: string
}

export async function POST(request: Request) {
  try {
    const body: FeedbackPayload = await request.json()
    const { score, comment, source } = body

    if (typeof score !== 'number' || score < 0 || score > 10) {
      return NextResponse.json({ error: 'Score must be 0-10' }, { status: 400 })
    }

    const db = getDb()
    db.execute({
      sql: 'INSERT INTO feedback (score, comment, source) VALUES (?, ?, ?)',
      args: [score, comment || null, source || 'calculadora_precificacao'],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Feedback error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
