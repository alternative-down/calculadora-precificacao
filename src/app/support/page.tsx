import Link from 'next/link'
import { LifeBuoy, Mail, ArrowLeft, HelpCircle, Calculator } from 'lucide-react'

const SUPPORT_EMAIL = 'suporte@alternativedown.com.br'

const faqItems = [
  {
    question: 'Como funciona a Calculadora de Precificação?',
    answer:
      'Você insere seus custos fixos mensais, quantas horas trabalha, quanto quer ganhar por hora, seu nível de experiência e urgência do projeto. A calculadora faz a matemática e te dá um preço justo por hora, projeto ou dia.',
  },
  {
    question: 'Preciso pagar para usar?',
    answer:
      'Não. Você tem 3 cálculos gratuitos por mês sem cadastro. Se precisar de mais, pode assinar o plano mensal ou pagar por uso avulso.',
  },
  {
    question: 'O cálculo serve para qualquer tipo de serviço?',
    answer:
      'A calculadora é otimizada para trabalho por hora ou por projeto. Se você cobra por diária ou por empreitada, pode adaptar os valores de entrada para refletir sua realidade.',
  },
  {
    question: 'Como a calculadora considera o mercado?',
    answer:
      'Você pode inserir uma referência de preço de mercado. A calculadora ajusta o preço recomendado para ficar competitivo sem subsídio — nem abaixo do seu custo, nem tão acima do mercado que afaste clientes.',
  },
  {
    question: 'O suporte responde por onde?',
    answer:
      'O contato é feito por email. Envie sua dúvida para suporte@alternativedown.com.br e a equipe retorna no canal informado.',
  },
]

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a calculadora
        </Link>

        <div className="rounded-3xl border border-slate-700 bg-slate-800/70 p-8 shadow-2xl backdrop-blur">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-200">
            <LifeBuoy className="h-4 w-4" />
            Canal de suporte
          </div>

          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Precisa de ajuda com a Calculadora?
          </h1>
          <p className="mb-8 text-slate-300">
            Se surgir alguma dúvida durante o cálculo ou depois, fale com a equipe pelo canal abaixo.
          </p>

          <div className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-sm uppercase tracking-wide text-emerald-200">Email de suporte</p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="mt-1 inline-block text-lg font-semibold text-white underline-offset-4 hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>
                <p className="mt-2 text-sm text-slate-300">
                  Use este canal para dúvidas sobre cálculo, planos, acesso e cobranças.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-10">
            <div className="mb-4 flex items-center gap-2 text-white">
              <HelpCircle className="h-5 w-5 text-emerald-300" />
              <h2 className="text-xl font-semibold">Perguntas frequentes</h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-slate-700 bg-slate-900/40 p-5"
                >
                  <h3 className="mb-2 font-medium text-white">{item.question}</h3>
                  <p className="text-sm leading-6 text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-700 bg-slate-900/40 p-5 text-sm text-slate-300">
            <div className="mb-2 flex items-center gap-2 text-white">
              <Calculator className="h-4 w-4 text-emerald-300" />
              <h2 className="font-semibold">Antes de enviar</h2>
            </div>
            <p>
              Se tiver dúvidas sobre precificação estratégica ou quanto cobrar em casos específicos,
              nossa equipe pode orientar — mas não substitui consultoria financeira personalizada.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
