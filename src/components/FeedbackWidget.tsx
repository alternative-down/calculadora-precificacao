'use client'

import { useState } from 'react'

interface FeedbackWidgetProps {
  onClose: () => void
  source?: string
}

export default function FeedbackWidget({ onClose, source = 'calculadora_precificacao' }: FeedbackWidgetProps) {
  const [score, setScore] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit() {
    if (score === null || submitting || submitted) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, comment: comment.trim() || null, source }),
      })
      if (res.ok) {
        setSubmitted(true)
        localStorage.setItem('calc_feedback_shown', 'true')
        setTimeout(onClose, 2000)
      }
    } catch (e) {
      console.error('Feedback error:', e)
    } finally {
      setSubmitting(false)
    }
  }

  function handleSkip() {
    localStorage.setItem('calc_feedback_shown', 'true')
    onClose()
  }

  function getEmoji(s: number) {
    if (s <= 3) return '😞'
    if (s <= 6) return '😐'
    if (s <= 8) return '😊'
    return '🤩'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleSkip} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg">Sua opinião importa ✨</h3>
              <p className="text-blue-100 text-sm mt-1">Como foi usar a Calculadora de Precificação?</p>
            </div>
            <button onClick={handleSkip} className="text-white/70 hover:text-white text-2xl leading-none" aria-label="Fechar">×</button>
          </div>
        </div>
        <div className="p-6">
          {!submitted ? (
            <>
              <div className="mb-6">
                <p className="text-sm text-gray-500 text-center mb-3">De 0 a 10, o quanto você recomendaria a calculadora?</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <button
                      key={n}
                      onClick={() => setScore(n)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm transition-all duration-200 ${
                        score === n
                          ? n <= 3 ? 'bg-red-500 text-white shadow-lg scale-105'
                          : n <= 6 ? 'bg-yellow-500 text-white shadow-lg scale-105'
                          : 'bg-green-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >{n}</button>
                  ))}
                </div>
                {score !== null && (
                  <p className="text-center mt-3 text-lg">{getEmoji(score)} {score}/10</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-2">
                  Algum comentário? <span className="text-gray-400">(opcional)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-700"
                  placeholder="Nos conte o que você achou..."
                />
              </div>
              <div className="flex gap-3">
                <button onClick={handleSkip} className="flex-1 py-2.5 text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">Pular</button>
                <button onClick={handleSubmit} disabled={score === null || submitting}
                  className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {submitting ? 'Enviando...' : 'Enviar feedback'}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🎉</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Obrigado pelo feedback!</h4>
              <p className="text-gray-500 text-sm">Sua opinião nos ajuda a melhorar a calculadora.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
