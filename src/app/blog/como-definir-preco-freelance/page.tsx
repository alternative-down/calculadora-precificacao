'use client';

import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { SocialShare } from '@/components/blog/SocialShare';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { NewsletterSignup } from '@/components/blog/NewsletterSignup';

const post = {
  title: 'Como Definir Preço de Freelance em 2026 (Guia Completo)',
  date: '2026-04-07',
  readTime: '6 min',
  category: 'Precificação',
  excerpt: 'Aprenda a metodologia correta para definir seus preços como freelancer ou autônomo. Sem chutes, sem vergonha — com números reais.',
};

export default function BlogPost() {
  const content = `
# Como Definir Preço de Freelance em 2026 (Guia Completo)

A maior reclamação de freelancers e autônomos brasileiros não é falta de cliente. É cobrar pouco.

Você termina o mês com mais trabalho do que imaginou, mas o dinheiro não fecha. O problema quase sempre é o mesmo: preço definido no feeling, não nos números.

Neste guia, você vai aprender a metodologia que funciona — sem planilha complexa, sem MBA em finanças.

---

## Por Que "Cobrar o Justo" Não Funciona

A maioria dos freelancers erra por um motivo específico: tenta adivinhar o preço.

Olha o concorrente, reduz o valor, coloca medo de perder o cliente, e no final trabalha 60 horas por semana por um salário de estágio.

**Cobrar barato não atrai cliente bom.** Atrai quem só quer pagar pouco. E esses clientes dão mais trabalho, pedem mais revisions, demoram mais para pagar.

A alternativa é simples: **cobre o que cobre seus custos + margem justa + valor do seu tempo.**

---

## A Fórmula Real do Preço

Antes de qualquer coisa, você precisa saber dois números:

### 1. Seu custo/hora real

Pense em todos os custos que você tem para operar:
- Custos fixos mensais (internet, software, coworking, celular)
- Custos variáveis (transporte, insumos)
- Impostos (MEI, Simples, PF)
- Benefícios (previdência, plano de saúde, férias)

Some tudo e divida pelas horas que você realmente fatura por mês (não as que você trabalha — as que você cobra de cliente).

\`\`\`
Custo mensal total = R$ 3.500
Horas faturáveis por mês = 120
Custo/hora = R$ 29,17
\`\`\`

### 2. O valor de mercado

Pesquise o que profissionais com seu nível de experiência cobram. Não para copiar — para entender o range.

- Júnior (0-2 anos): R$ 25-60/hora
- Pleno (2-5 anos): R$ 60-120/hora
- Sênior (5+ anos): R$ 120-250/hora

Esses números variam por região e área, mas dão um referencial.

---

## A Fórmula em 3 Passos

### Passo 1: Calcule seu custo/hora

\`\`\`
Custo mensal ÷ Horas faturáveis = Preço mínimo/hora
\`\`\`

Exemplo: R$ 3.500 ÷ 120h = R$ 29,17/hora

### Passo 2: Aplique o multiplicador de experiência

- **Júnior (0-2 anos):** custo × 1,2 a 1,5
- **Pleno (2-5 anos):** custo × 1,5 a 2,0
- **Sênior (5+ anos):** custo × 2,0 a 2,5

Exemplo pleno: R$ 29,17 × 1,8 = **R$ 52,50/hora**

### Passo 3: Ajuste por urgência e complexidade

- Urgência alta (entrega em menos de 48h): +25%
- Projeto complexo (requer pesquisa/experimento: +15%
- Cliente recorrente: pode aplicar desconto de 10-15% (é mais barato reter do que captar)

---

## Exemplo Prático: Designer Freelancer

Vamos supor:
- Custos mensais: R$ 2.800 (MEI, internet, laptop, ferramentas)
- Horas faturáveis: 100h/mês
- Nível: Pleno (3 anos de experiência)
- Tipo de projeto: Logo completo

\`\`\`
Custo/hora base: R$ 2.800 ÷ 100 = R$ 28/hora
Multiplicador pleno: R$ 28 × 1,6 = R$ 44,80/hora
Projeto de logo (média 20h): R$ 44,80 × 20 = R$ 896
\`\`\`

Com ajustes (briefing complexo +1h de revisions): **R$ 1.200**

Esse é um preço que cobre custos, dá margem, e ainda assim é competitivo no mercado.

---

## Como Não Perder Clientes Cobrando Caro

Cobrar o preço certo não significa perder cliente. Significa perder cliente errado.

Estratégias que funcionam:

1. **Mostre valor antes do preço.** A maioria dos freelancers mostra o preço antes de demonstrar o valor. Isso mata a venda.

2. **Pergunte o orçamento do cliente.** "Qual sua faixa de investimento?" te dá informação antes de dar o número.

3. **Divida em pacotes.** Cliente não tem R$ 1.200? Oferece R$ 600 com menos entregas. Você fatura, ele compra.

4. **Negocie escopo, não preço.** "Esse valor inclui 2 revisions. Mais do que isso, é +R$ 150 por revision extra." Não reduz o preço — limita o escopo.

---

## Calculadora: Seu Melhor Amigo

Fazer essas contas na mão toda vez é demorado. Por isso criamos a [Calculadora de Precificação](/) — você insere seus custos, regime tributário, horas trabalhadas, e ela te dá o preço sugerido automaticamente.

Levanta os números uma vez. Usa para sempre.

---

## Conclusão

Cobrar o preço certo é uma habilidade, não um talento. Você pode aprender.

Os passos são simples:
1. Some seus custos mensais
2. Divida pelas horas faturáveis
3. Aplique o multiplicador de experiência
4. Ajuste por urgência e complexidade
5. Apresenta com confiança

Não é sobre ser caro ou barato. É sobre ser justo — para você.

Comece hoje. Seus preços provavelmente precisam subir.
`;

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '32px 16px 80px' }}>

        {/* Back link */}
        <Link
          href="/blog"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#78716c', fontSize: '14px', marginBottom: '32px', textDecoration: 'none' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Blog
        </Link>

        {/* Category + Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{ display: 'inline-block', padding: '4px 10px', background: '#f0fdf4', color: '#16a34a', borderRadius: '9999px', fontSize: '12px', fontWeight: '500' }}>
            {post.category}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#a8a29e', fontSize: '13px' }}>
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString('pt-BR')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#a8a29e', fontSize: '13px' }}>
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1c1917', lineHeight: '1.2', marginBottom: '24px' }}>
          {post.title}
        </h1>

        {/* Content */}
        <article style={{ color: '#44403c', lineHeight: '1.8', fontSize: '16px' }}>
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#1c1917', marginTop: '40px', marginBottom: '16px' }}>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1c1917', marginTop: '28px', marginBottom: '12px' }}>
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p style={{ marginBottom: '16px' }}>{children}</p>
              ),
              strong: ({ children }) => (
                <strong style={{ fontWeight: '600', color: '#1c1917' }}>{children}</strong>
              ),
              ul: ({ children }) => (
                <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol style={{ marginBottom: '16px', paddingLeft: '20px' }}>{children}</ol>
              ),
              li: ({ children }) => (
                <li style={{ marginBottom: '8px' }}>{children}</li>
              ),
              code: ({ children }) => (
                <code style={{ background: '#f5f5f4', padding: '2px 6px', borderRadius: '4px', fontSize: '14px', fontFamily: 'monospace' }}>
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre style={{ background: '#f5f5f4', padding: '16px', borderRadius: '8px', overflowX: 'auto', marginBottom: '16px', fontSize: '14px' }}>
                  {children}
                </pre>
              ),
              hr: () => <hr style={{ border: 'none', borderTop: '1px solid #e7e5e4', margin: '32px 0' }} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        {/* Social Share */}
        <SocialShare title={post.title} url={pageUrl} />

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)', borderRadius: '16px', padding: '28px', margin: '32px 0', color: 'white' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
            Calcule seu preço em 2 minutos
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '16px', fontSize: '14px' }}>
            Use nossa calculadora gratuita para descobrir exatamente quanto cobrar.
          </p>
          <Link
            href="/"
            style={{ display: 'inline-flex', padding: '10px 20px', background: 'white', color: '#2563eb', borderRadius: '8px', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}
          >
            Abrir Calculadora →
          </Link>
        </div>

        {/* Related Posts */}
        <RelatedPosts currentSlug="como-definir-preco-freelance" currentCategory="Precificação" />

        {/* Newsletter */}
        <div style={{ marginTop: '32px' }}>
          <NewsletterSignup source="blog-post" />
        </div>
      </div>
    </div>
  );
}
