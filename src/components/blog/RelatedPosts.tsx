import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const allBlogPosts: BlogPost[] = [
  {
    slug: 'como-definir-preco-freelance',
    title: 'Como Definir Preço de Freelance em 2026 (Guia Completo)',
    excerpt: 'Aprenda a metodologia correta para definir seus preços como freelancer ou autônomo. Sem chutes, sem vergonha — com números reais.',
    date: '2026-04-07',
    readTime: '6 min',
    category: 'Precificação',
  },
];

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
  limit?: number;
}

export function RelatedPosts({ currentSlug, currentCategory, limit = 3 }: RelatedPostsProps) {
  const related = allBlogPosts
    .filter(p => p.slug !== currentSlug && p.category === currentCategory)
    .slice(0, limit);

  if (related.length < limit) {
    const additional = allBlogPosts
      .filter(p => p.slug !== currentSlug && !related.some(r => r.slug === p.slug))
      .slice(0, limit - related.length);
    related.push(...additional);
  }

  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-stone-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-stone-900">Continue lendo</h3>
        <Link
          href="/blog"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          Ver todos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-5 bg-white rounded-xl border border-stone-200 hover:border-blue-200 hover:shadow-sm transition-all"
          >
            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full mb-3">
              {post.category}
            </span>
            <h4 className="font-semibold text-stone-900 text-sm leading-snug mb-2 line-clamp-2">
              {post.title}
            </h4>
            <p className="text-stone-500 text-xs line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center gap-3 mt-3 text-stone-400 text-xs">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString('pt-BR')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
