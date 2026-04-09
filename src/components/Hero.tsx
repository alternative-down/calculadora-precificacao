import { Calculator } from "lucide-react";
import SocialProofCounter from "./SocialProofCounter";

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
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
          Descubra seu preço real — grátis
        </button>
        <p className="hero-cta-secondary">
          3 cálculos gratuitos por mês · Sem cadastro
        </p>
        <SocialProofCounter />
      </div>
    </div>
  );
}