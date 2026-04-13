'use client'

import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPage() {
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
        <h1 className="text-2xl font-bold text-white mb-2">Sua privacidade é prioridade</h1>
        <p className="text-slate-500 text-sm mb-10">Última atualização: abril de 2026</p>
        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-white mb-3">1. Quem somos</h2>
            <p>A <strong className="text-slate-200">Calculadora de Precificação</strong> é uma ferramenta online para autônomos e pequenas empresas calcularem preços justos e lucrativos para seus serviços. Desenvolvida pela <strong className="text-slate-200">Alternative Down</strong>, empresa brasileira de tecnologia focada em soluções digitais acessíveis para pequenos empreendedores, autônomos e PMEs brasileiras.</p>
            <p className="mt-2">Ao utilizar nossos serviços, você concorda com esta Política de Privacidade.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">2. Quais dados coletamos</h2>
            <ul className="space-y-2 text-slate-400 list-disc list-inside">
              <li><strong className="text-slate-300">Dados de cadastro:</strong> nome, e-mail, empresa (se informado)</li>
              <li><strong className="text-slate-300">Dados de cálculo:</strong> custos, horas trabalhadas, margem de lucro e parâmetros inseridos na calculadora</li>
              <li><strong className="text-slate-300">Dados de uso:</strong> cálculos realizados, preferências de configuração</li>
              <li><strong className="text-slate-300">Dados de navegação:</strong> páginas visitadas, dispositivo e navegador</li>
              <li><strong className="text-slate-300">Dados de pagamento (plano Pro):</strong> processados via Asaas — a Alternative Down não armazena dados de cartão</li>
            </ul>
            <p className="mt-2">Não coletamos dados sensíveis (biométricos, saúde, orientação política ou religiosa).</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">3. Por que coletamos</h2>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li>Prestação do serviço de cálculo de preços</li>
              <li>Melhoria contínua do produto</li>
              <li>Comunicação sobre sua conta</li>
              <li>Cobrança e gestão de assinaturas (plano Pro)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">4. Base legal (LGPD)</h2>
            <p>Todas as operações de tratamento seguem as bases da Lei Geral de Proteção de Dados (Lei nº 13.709/2018):</p>
            <ul className="mt-2 space-y-1 text-slate-400 list-disc list-inside">
              <li><strong className="text-slate-300">Execução de contrato</strong> — prestação do serviço solicitado</li>
              <li><strong className="text-slate-300">Legítimo interesse</strong> — melhoria e segurança do produto</li>
              <li><strong className="text-slate-300">Consentimento</strong> — comunicações de marketing (opcional, revogável a qualquer momento)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">5. Com quem compartilhamos</h2>
            <ul className="space-y-2 text-slate-400 list-disc list-inside">
              <li><strong className="text-slate-300">Hospedagem (infra):</strong> dados armazenados em servidores seguros no Brasil</li>
              <li><strong className="text-slate-300">Processamento de pagamento (Asaas):</strong> para assinaturas Pro — processador externo, dados criptografados</li>
              <li><strong className="text-slate-300">Ferramentas analíticas:</strong> dados anonimizados/agregados para análise de uso</li>
            </ul>
            <p className="mt-2">Não vendemos dados pessoais para fins de publicidade de terceiros.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">6. Seus direitos (LGPD Art. 18)</h2>
            <p>Você pode, a qualquer momento, mediante solicitação por e-mail:</p>
            <ul className="mt-2 space-y-1 text-slate-400 list-disc list-inside">
              <li>Confirmar existência de tratamento dos seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar anonimização ou exclusão de dados</li>
              <li>Revogar consentimento</li>
            </ul>
            <p className="mt-2">E-mail: <a href="mailto:suporte@alternativedown.com.br" className="text-violet-400 hover:underline">suporte@alternativedown.com.br</a></p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">7. Retenção de dados</h2>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li><strong className="text-slate-300">Dados de cadastro:</strong> mantidos enquanto conta ativa + 5 anos após exclusão (obrigação legal)</li>
              <li><strong className="text-slate-300">Dados de orçamentos:</strong> mantidos enquanto conta ativa; exportação disponível antes da exclusão</li>
              <li><strong className="text-slate-300">Dados de pagamento:</strong> retidos por 5 anos (obrigação fiscal)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">8. Segurança</h2>
            <p>Utilizamos medidas técnicas e administrativas reconhecidas (criptografia em trânsito e em repouso, controle de acesso interno) para proteger seus dados. Em caso de incidentes de segurança, comprometeremos a notificar os afetados em tempo razoável.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">9. Cookies</h2>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li><strong className="text-slate-300">Session cookies:</strong> essenciais para funcionamento do produto</li>
              <li><strong className="text-slate-300">Analytics cookies:</strong> dados agregados, sem identificação individual</li>
              <li><strong className="text-slate-300">Cookie de preferências:</strong> salvar preferências de idioma e modelo de orçamento</li>
            </ul>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">10. Alterações nesta política</h2>
            <p>Reservamos o direito de atualizar esta política. Alterações significativas serão comunicadas por e-mail ou aviso no produto.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-3">11. Contato</h2>
            <p><strong className="text-slate-200">Alternative Down — Gerador de Orçamentos</strong></p>
            <p>E-mail: <a href="mailto:suporte@alternativedown.com.br" className="text-violet-400 hover:underline">suporte@alternativedown.com.br</a></p>
          </section>
        </div>
      </main>
    </div>
  )
}
