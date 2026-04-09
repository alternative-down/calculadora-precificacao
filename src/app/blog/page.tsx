import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Calculadora de Precificação | Alternative Down',
  description: 'Dicas, guias e estratégias de precificação para freelancers, autônomos e MEIs brasileiros.',
};

const posts = [
  {
    slug: 'como-definir-preco-freelance',
    title: 'Como Definir Preço de Freelance em 2026 (Guia Completo)',
    excerpt: 'Aprenda a metodologia correta para definir seus preços como freelancer ou autônomo. Sem chutes, sem vergonha — com números reais.',
    date: '2026-04-07',
    readTime: '6 min',
    category: 'Precificação',
  },
];

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '48px 16px' }}>
        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <span style={{ display: 'inline-block', padding: '4px 12px', background: '#eff6ff', color: '#2563eb', borderRadius: '9999px', fontSize: '13px', fontWeight: '500', marginBottom: '16px' }}>
            Blog
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1c1917', marginBottom: '12px', lineHeight: '1.2' }}>
            Dicas de Precificação para Freelancers
          </h1>
          <p style={{ fontSize: '18px', color: '#78716c', maxWidth: '540px' }}>
            Estratégias, fórmulas e guias práticos para você nunca mais cobrar menos do que vale.
          </p>
        </div>

        {/* CTA to tool */}
        <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)', borderRadius: '16px', padding: '32px', marginBottom: '48px', color: 'white' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
            Calcule seu preço em 2 minutos
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px', fontSize: '15px' }}>
            Nossa calculadora considera todos os custos, impostos e margem para você cobrar o preço justo.
          </p>
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'white', color: '#2563eb', borderRadius: '10px', fontWeight: '600', fontSize: '15px' }}
          >
            Abrir Calculadora <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ display: 'block', padding: '24px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', textDecoration: 'none' }}
            >
              <span style={{ display: 'inline-block', padding: '4px 10px', background: '#f0fdf4', color: '#16a34a', borderRadius: '9999px', fontSize: '12px', fontWeight: '500', marginBottom: '12px' }}>
                {post.category}
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1c1917', marginBottom: '8px', lineHeight: '1.3' }}>
                {post.title}
              </h2>
              <p style={{ fontSize: '15px', color: '#78716c', marginBottom: '16px', lineHeight: '1.6' }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#a8a29e', fontSize: '13px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state if no posts */}
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: '#78716c' }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>Nenhum post ainda.</p>
            <p style={{ fontSize: '14px' }}>Novos artigos serão publicados em breve.</p>
          </div>
        )}
      </div>
    </div>
  );
}
