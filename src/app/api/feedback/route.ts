import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { score, comment, source, calculationType } = body

    if (typeof score !== 'number' || score < 0 || score > 10) {
      return NextResponse.json({ error: 'Invalid score' }, { status: 400 })
    }

    const feedback = {
      score,
      comment: comment || null,
      source: source || 'calculadora_precificacao',
      calculationType: calculationType || null,
      receivedAt: new Date().toISOString(),
    }

    console.log('[feedback]', JSON.stringify(feedback))

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
