'use client'

import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <span className="text-slate-700">|</span>
          <Shield className="w-4 h-4 text-violet-400" />
          <span className="text-sm text-slate-400">Calculadora de Precificação</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-white mb-2">Termos e Condições de Uso</h1>
        <p className="text-slate-500 text-sm mb-10">Última atualização: abril de 2026</p>
        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-white mb-3">1. Aceitação</h2>
            <p>Ao criar uma conta e utilizar a Calculadora de Precificação, você declara que leu, compreendeu e aceita integralmente estes Termos de Uso. Caso não concorde com algum ponto, não utilize o serviço.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">2. Descrição do serviço</h2>
            <p>A Calculadora de Precificação é uma ferramenta online que permite calcular preços justos e lucrativos para serviços de autônomos e pequenas empresas. O serviço é fornecido &ldquo;como está&rdquo; — não garantimos resultados comerciais específicos decorrentes dos cálculos realizados.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">3. Conta do usuário</h2>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li>Conta é pessoal e intransferível</li>
              <li>Usuário é responsável por manter credenciais de acesso seguras</li>
              <li>Podemos suspender contas que violem estes termos</li>
              <li>Dados de cadastro devem ser precisos e mantidos atualizados</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">4. Planos Free vs. Pro</h2>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li><strong className="text-slate-300">Free:</strong> acesso limitado à calculadora (número de cálculos definidos por plano)</li>
              <li><strong className="text-slate-300">Pro:</strong> acesso expandido conforme descrição na página de planos</li>
              <li>Assinaturas renovam automaticamente; cancelamento a qualquer momento</li>
              <li>Política de reembolso: Não oferecemos reembolso após 7 dias da contratação. Cancelamento a qualquer momento pelo e-mail <a href="mailto:suporte@alternativedown.com.br" className="text-violet-400 hover:underline">suporte@alternativedown.com.br</a>.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">5. Uso aceitável</h2>
            <p className="mb-2"><strong className="text-white">É proibido:</strong></p>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li>Usar os cálculos para atividades ilegais</li>
              <li>Utilizar o serviço para fraudar precificações de terceiros</li>
              <li>Revender ou redistribuir o acesso ao produto</li>
              <li>Tentar acessar dados de outros usuários ou interferir na infraestrutura</li>
            </ul>
            <p className="mt-2 text-slate-300">Violações podem resultar em suspensão imediata, sem aviso prévio.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">6. Conteúdo criado pelo usuário</h2>
            <p>Todos os cálculos, dados de custos e informações inseridas na Calculadora são de responsabilidade exclusiva do usuário. A Alternative Down não é responsável por decisões comerciais tomadas com base nos resultados da ferramenta.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">7. Propriedade intelectual</h2>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li><strong className="text-slate-300">Plataforma Calculadora de Precificação:</strong> código, marca e estrutura são da Alternative Down</li>
              <li><strong className="text-slate-300">Dados inseridos pelo usuário:</strong> conteúdo inserido é de propriedade do usuário</li>
            </ul>
            <p className="mt-2">Não é permitido usar a marca &ldquo;Calculadora de Precificação&rdquo; para sugerir endosso não existente.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">8. Limitação de responsabilidade</h2>
            <p>A Alternative Down não será responsável por danos indiretos, incidentais, especiais ou consequenciais — incluindo perda de lucros, dados, oportunidades comerciais ou goodwill — decorrentes do uso ou impossibilidade de uso do serviço.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">9. Indenização</h2>
            <p>O usuário concorda em indenizar e isentar a Alternative Down, seus diretores e colaboradores de qualquer reclamação ou ação decorrente do uso do serviço, violação destes termos ou violação de direitos de terceiros.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">10. Interrupção do serviço</h2>
            <p>Podemos interromper ou descontinuar o serviço a qualquer momento, com aviso prévio razoável. Usuários Pro terão prazo para migração ou reembolso proporcional.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">11. Lei aplicável e foro</h2>
            <p>Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer conflito será resolvido no foro da comarca de São Paulo/SP, com renúncia a qualquer outro, por mais privilegiado que seja.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">12. Alterações</h2>
            <p>Podemos alterar estes termos a qualquer momento. Uso continuado após alterações constitui aceitação.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">13. Contato</h2>
            <p><strong className="text-slate-200">Alternative Down — Calculadora de Precificação</strong></p>
            <p>E-mail: <a href="mailto:suporte@alternativedown.com.br" className="text-violet-400 hover:underline">suporte@alternativedown.com.br</a></p>
          </section>
        </div>
      </main>
    </div>
  )
}
