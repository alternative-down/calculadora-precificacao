"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Como a calculadora define meu preço?",
    a: "A calculadora soma seus custos fixos mensais + sua renda desejada, divide pelas horas disponíveis, aplica encargos (INSS, FGTS), nível de experiência e urgência do projeto.",
  },
  {
    q: "Preciso pagar para usar?",
    a: "Não. Você tem 3 cálculos gratuitos por mês. Após isso, pode comprar avulso (R$ 9,90) ou assinar (R$ 29/mês) para cálculos ilimitados.",
  },
  {
    q: "O preço sugerido é definitivo?",
    a: "Não. O preço é uma referência baseada nos seus dados. O mercado e sua experiência final são fatores importantes na decisão.",
  },
  {
    q: "Minhas informações ficam guardadas?",
    a: "Seus cálculos ficam no seu navegador (localStorage). Não enviamos seus dados para nenhum servidor.",
  },
  {
    q: "Funciona para qualquer tipo de trabalho?",
    a: "A calculadora foi feita para profissionais de tecnologia e serviços digitais. Para outros tipos de trabalho, ajuste as variáveis manualmente.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="faq-section">
      <h2 className="faq-title">Perguntas Frequentes</h2>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="faq-trigger"
            >
              <span>{faq.q}</span>
              <span className={`faq-chevron${open === i ? " open" : ""}`}>▾</span>
            </button>
            {open === i && <p className="faq-answer">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
