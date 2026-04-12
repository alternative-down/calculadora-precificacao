'use client'

import { useState } from 'react'

interface FeedbackWidgetProps {
  onClose: () => void
  calculationType?: string
}

function getScoreTone(score: number) {
  if (score <= 3) return 'bg-red-500 text-white shadow-lg scale-105'
  if (score <= 6) return 'bg-yellow-500 text-white shadow-lg scale-105'
  return 'bg-green-500 text-white shadow-lg scale-105'
}

function getEmoji(score: number) {
  if (score <= 3) return '😞'
  if (score <= 6) return '😐'
  if (score <= 8) return '😊'
  return '🤩'
}

export default function FeedbackWidget({ onClose, calculationType }: FeedbackWidgetProps) {
  const [score, setScore] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (score === null || submitting || submitted) return

    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score,
          comment: comment.trim() || null,
          source: 'calculadora_precificacao',
          calculationType: calculationType ?? undefined,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      setSubmitted(true)
      localStorage.setItem('calc_feedback_shown', 'true')
      setTimeout(onClose, 2000)
    } catch (submitError) {
      console.error('Failed to submit feedback:', submitError)
      setError('Não foi possível enviar seu feedback. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSkip = () => {
    localStorage.setItem('calc_feedback_shown', 'true')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleSkip}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Sua opinião importa ✨
              </h3>
              <p className="mt-1 text-sm text-emerald-100">
                Como foi sua experiência com a Calculadora?
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="text-2xl leading-none text-white/70 hover:text-white"
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {!submitted ? (
            <>
              <div className="mb-6">
                <p className="mb-3 text-center text-sm text-gray-500">
                  De 0 a 10, o quanto você recomendaria a Calculadora de Precificação?
                </p>
                <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
                  {Array.from({ length: 11 }, (_, index) => index).map((value) => (
                    <button
                      key={value}
                      onClick={() => setScore(value)}
                      className={`h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                        score === value
                          ? getScoreTone(value)
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                {score !== null && (
                  <p className="mt-3 text-center text-lg">
                    {getEmoji(score)} {score}/10
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm text-gray-600">
                  Algum comentário? <span className="text-gray-400">(opcional)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Nos conte o que você achou..."
                />
              </div>

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleSkip}
                  className="flex-1 rounded-lg py-2.5 font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                >
                  Pular
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={score === null || submitting}
                  className="flex-1 rounded-lg bg-emerald-600 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? 'Enviando...' : 'Enviar feedback'}
                </button>
              </div>
            </>
          ) : (
            <div className="py-4 text-center">
              <div className="mb-3 text-4xl">🎉</div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900">
                Obrigado pelo feedback!
              </h4>
              <p className="text-sm text-gray-500">
                Sua opinião nos ajuda a melhorar a Calculadora.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
