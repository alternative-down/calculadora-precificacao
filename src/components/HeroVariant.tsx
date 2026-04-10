import { Calculator, Sparkles } from "lucide-react";


interface HeroProps {
  onStart: () => void;
}

/**
 * Variant A — Problema (copy spec: dd0ac17)
 * Headline: problema awareness, urgência emocional
 * Subtitle: dor + problema
 * CTA: ação simples
 */
export function HeroVariantA({ onStart }: HeroProps) {
  return (
    <div className="container">
      <div className="hero">
        <h1 className="hero-title">Quanto você deveria cobrar pelo seu trabalho?</h1>
        <p className="hero-subtitle">
          A maioria dos freelancers cobra menos do que deveria.
          <br />
          Use matemática, não chute.
        </p>
        <button className="hero-cta" onClick={onStart}>
          <Calculator size={18} />
          Calcular meu preço grátis
        </button>
        <p className="hero-cta-secondary">
          3 cálculos gratuitos por mês · Sem cadastro
        </p>
      </div>
    </div>
  );
}

/**
 * Variant B — Resultado (copy spec: dd0ac17)
 * Headline: resultado direto, promessa clara
 */
export function HeroVariantB({ onStart }: HeroProps) {
  return (
    <div className="container">
      <div className="hero">
        <h1 className="hero-title">Descubra o preço certo do seu serviço em 3 minutos</h1>
        <p className="hero-subtitle">
          Entrada de custos, taxa horária, margem de lucro — sem planilha.
        </p>
        <button className="hero-cta" onClick={onStart}>
          <Sparkles size={18} />
          Calcular agora — grátis
        </button>
        <p className="hero-cta-secondary">
          3 cálculos gratuitos por mês · Sem cadastro
        </p>
      </div>
    </div>
  );
}
