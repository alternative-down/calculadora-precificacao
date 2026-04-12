import Link from "next/link";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suporte — Calculadora de Precificação",
  description: "Precisa de ajuda com a calculadora? Entre em contato conosco.",
};

export default function SupportPage() {
  return (
    <main>
      <Header />
      <div className="support-page">
        <h1 className="support-title">Suporte</h1>
        <p className="support-subtitle">
          Precisa de ajuda? Estamos aqui para ajudar.
        </p>

        {/* FAQ shortcut */}
        <div className="support-card">
          <h2 className="support-card-title">
            <span>📖</span>Tire suas dúvidas
          </h2>
          <p className="support-card-text">
            A maioria das perguntas já está respondida na nossa FAQ.
          </p>
          <Link href="/" className="support-link">
            Ver FAQ da calculadora →
          </Link>
        </div>

        {/* Contact */}
        <div className="support-card">
          <h2 className="support-card-title">
            <span>💬</span>Fale conosco
          </h2>
          <p className="support-card-text">
            Envie um e-mail para o nosso suporte. Respondemos em até 24 horas úteis.
          </p>
          <a
            href="mailto:suporte@alternativedown.com.br"
            className="support-btn"
          >
            Enviar e-mail para suporte
          </a>
        </div>

        {/* Other products */}
        <div className="support-card">
          <h2 className="support-card-title">
            <span>🛠️</span>Outros produtos
          </h2>
          <p className="support-card-text">
            Precisa de ajuda com outro produto da Alternative Down?
          </p>
          <div className="support-badge-row">
            <a href="https://ai-copy.alternativedown.com.br/support" className="support-badge">
              AI Copy Studio
            </a>
            <a href="https://lgpd.alternativedown.com.br/support" className="support-badge">
              LGPD Checker
            </a>
            <a href="https://contrato.alternativedown.com.br/support" className="support-badge">
              Contrato Express
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
