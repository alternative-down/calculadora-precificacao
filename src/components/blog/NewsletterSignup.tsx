'use client';

import { useState } from 'react';
import { Mail, Loader2, CheckCircle } from 'lucide-react';

interface NewsletterSignupProps {
  source?: string;
}

export function NewsletterSignup({ source = 'blog' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
      setEmail('');
    } catch {
      setError('Erro ao se inscrever. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 text-center border border-green-100">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">
          Inscrição confirmada! 🎉
        </h3>
        <p className="text-stone-600">
          Você receberá dicas de precificação e precificação no seu email.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Mail className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold">
          Receba dicas de precificação
        </h3>
      </div>
      <p className="text-blue-100 mb-6 text-sm">
        Junte-se a +1.500 empreendedores que recebem estratégias de precificação toda semana.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Inscrever'
          )}
        </button>
      </form>
      {error && (
        <p className="text-red-200 text-sm mt-3">{error}</p>
      )}
    </div>
  );
}
