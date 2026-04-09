import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Calculadora de Precificação',
  description: 'Dicas, guias e estratégias de precificação para freelancers, autônomos e MEIs brasileiros.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="header-logo flex items-center gap-2">
            <span>Alternative Down</span>
          </Link>
          <Link href="/" className="header-back">
            <ArrowLeft size={14} />
            Voltar para Calculadora
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
