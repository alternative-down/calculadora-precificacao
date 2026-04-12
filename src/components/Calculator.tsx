"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { trackCalculationComplete, trackLead, type UTMData } from "@/components/MetaPixel";
import type { CalcInput, CalcResult } from "@/lib/types";

interface CalculatorProps {
  onCalculate: (input: CalcInput) => CalcResult;
  usageCount: number;
  utm?: UTMData;
  freeLimit: number;
  payPerUsePrice: number;
  monthlyPrice: number;
}

export default function Calculator({
  onCalculate,
  usageCount,
  utm,
  freeLimit,
  payPerUsePrice,
  monthlyPrice,
}: CalculatorProps) {
  const [step, setStep] = useState<1 | 2 | 3 | "result">(1);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState<CalcInput>({
    workType: "hora",
    hoursPerUnit: 1,
    desiredHourlyRate: 50,
    monthlyFixedCosts: 0,
    workingHoursPerMonth: 160,
    taxType: "mei",
    marketRate: 0,
    experienceLevel: "pleno",
    urgency: "normal",
  });
  const [result, setResult] = useState<CalcResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Mark as mounted (client-side only) to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track Lead event when result screen renders
  useEffect(() => {
    if (step === "result" && result && mounted) {
      trackLead(utm);
    }
  }, [step, result, mounted, utm]);

  // Share handlers
  function handleWhatsAppShare() {
    if (!result) return;
    const price = result.recommendedPrice;
    const text = encodeURIComponent(
      `💰 Descobri quanto cobrar pelo meu trabalho: R$ ${price.toFixed(2).replace(".", ",")}/${result.unitLabel}.\n\n` +
      `Calculadora gratuita da Alternative Down → ${typeof window !== "undefined" ? window.location.href : "https://calculadora.alternativedown.com.br"}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  // Rehydrate from localStorage so page refresh doesn't show empty result step
  useEffect(() => {
    if (step === "result" && !result) {
      const raw = localStorage.getItem("calc_preco_history");
      if (!raw) {
        setStep(1);
      }
    }
  }, [step, result]);

  const canUseFree = usageCount > 0;
  const usageText =
    usageCount === 0
      ? "Limite gratuito atingido este mês"
      : usageCount === freeLimit
      ? "Você tem 3 cálculos gratuitos este mês"
      : `Você tem ${usageCount} de ${freeLimit} cálculos gratuitos`;

  function handleSubmit() {
    if (!canUseFree) return;
    const r = onCalculate(input);
    setResult(r);
    setStep("result");
    // Meta Pixel — fire events after state is set so tracking is tied to result
    trackCalculationComplete(r.recommendedPrice, utm);
    trackLead(utm);
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  }

  if (step === "result" && mounted) {
    if (!result) {
      setStep(1);
      return null;
    }
    return (
      <div className="container">
        <div className="steps-container">
          <StepIndicator activeStep={result ? 3 : 1} />
          <div className="result-card">
            <p className="result-label">Preço sugerido por {result.unitLabel}</p>
            <p className="result-price">{formatCurrency(result.recommendedPrice)}</p>
            <p className="result-sub">
              Faixa de mercado: {formatCurrency(result.priceMin)} — {formatCurrency(result.priceMax)}
            </p>
          </div>

          <div className="result-breakdown">
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "var(--text)" }}>
              Como esse preço foi calculado
            </p>
            <div className="breakdown-row">
              <span className="breakdown-label">Sua hora desejada</span>
              <span className="breakdown-value">{formatCurrency(input.desiredHourlyRate)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Custos fixos mensais</span>
              <span className="breakdown-value">{formatCurrency(input.monthlyFixedCosts)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Horas trabalhadas/mês</span>
              <span className="breakdown-value">{input.workingHoursPerMonth}h</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Custo efetivo por hora</span>
              <span className="breakdown-value">{formatCurrency(result.breakdown.effectiveHourlyCost)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Impostos ({input.taxType.toUpperCase()})</span>
              <span className="breakdown-value">+{(result.breakdown.taxRate * 100).toFixed(0)}%</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Encargos (FGTS/INSS)</span>
              <span className="breakdown-value">+{(result.breakdown.socialCharges * 100).toFixed(0)}%</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Nível ({input.experienceLevel})</span>
              <span className="breakdown-value positive">×{result.breakdown.experienceMultiplier}</span>
            </div>
            {result.breakdown.urgencyMultiplier > 1 && (
              <div className="breakdown-row">
                <span className="breakdown-label">Urgência ({input.urgency})</span>
                <span className="breakdown-value positive">+{((result.breakdown.urgencyMultiplier - 1) * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>

          {usageCount > 0 && (
            <p className={usageCount === 0 ? "usage-counter used" : "usage-counter"}>
              {usageCount === freeLimit ? "✅ Você tem 3 cálculos gratuitos este mês" : `📊 ${freeLimit - usageCount} de ${freeLimit} cálculos usados`}
            </p>
          )}

          {usageCount === 0 && (
            <div className="upsell-banner">
              <p className="upsell-title">Limite atingido —continue calculando!</p>
              <p className="upsell-text">
                Assine por <strong>R$ {monthlyPrice.toFixed(2).replace(".", ",")}/mês</strong> e use ilimitado — ou compre avulso por R$ {payPerUsePrice.toFixed(2).replace(".", ",")}.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <Link href="https://alternativedown.com.br/orcamento" className="upsell-btn">
                  📄 Gerar Orçamento →
                </Link>
                <button className="upsell-btn" style={{ background: "var(--btn-primary-bg)" }}>
                  Assinar R$ {monthlyPrice.toFixed(2).replace(".", ",")}/mês
                </button>
              </div>
            </div>
          )}

          <div className="share-row">
            <button className="share-btn share-btn--whatsapp" onClick={handleWhatsAppShare}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.067 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </button>
            <button className="share-btn share-btn--copy" onClick={handleCopyLink}>
              {copied ? "✓ Copiado!" : "📋 Copiar link"}
            </button>
          </div>

          <div className="result-actions">
            <button
              className="result-action primary"
              onClick={() => {
                setStep(1);
                setResult(null);
              }}
            >
              ↻ Novo cálculo
            </button>
            <Link href="https://ai-copy.alternativedown.com.br" className="result-action">
              ⚡ Gerar Copy →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="steps-container">
        <StepIndicator activeStep={step === 1 ? 1 : step === 2 ? 2 : 3} />

        {step === 1 && (
          <StepCustos
            input={input}
            onChange={(updates) => setInput((prev) => ({ ...prev, ...updates }))}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepMercado
            input={input}
            onChange={(updates) => setInput((prev) => ({ ...prev, ...updates }))}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepPreco
            onCalculate={handleSubmit}
            canUse={canUseFree}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </div>
  );
}

function StepIndicator({ activeStep }: { activeStep: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Custos" },
    { n: 2, label: "Mercado" },
    { n: 3, label: "Preço" },
  ];
  return (
    <div className="step-indicator">
      {steps.map((s, i) => (
        <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
          <div className={`step-item ${activeStep === s.n ? "active" : activeStep > s.n ? "done" : ""}`}>
            <div className="step-circle">
              {activeStep > s.n ? <Check size={13} /> : s.n}
            </div>
            <span>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`step-line ${activeStep > s.n ? "done" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function StepCustos({
  input,
  onChange,
  onNext,
}: {
  input: CalcInput;
  onChange: (u: Partial<CalcInput>) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="step-title">Seus Custos</h2>
      <p className="step-subtitle">Defina sua realidade financeira para calcular o preço justo.</p>

      <div className="form-group">
        <label className="form-label">Tipo de trabalho</label>
        <div className="tier-selector">
          {(["hora", "projeto", "dia"] as const).map((t) => (
            <button
              key={t}
              type="button"
              className={`tier-btn ${input.workType === t ? "selected" : ""}`}
              onClick={() => onChange({ workType: t, hoursPerUnit: t === "hora" ? 1 : t === "projeto" ? 4 : 8 })}
            >
              <div className="tier-name">{t === "hora" ? "Por hora" : t === "projeto" ? "Por projeto" : "Por dia"}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Valor da hora desejada (líquido)
          </label>
          <input
            type="number"
            className="form-input"
            value={input.desiredHourlyRate || ""}
            onChange={(e) => onChange({ desiredHourlyRate: Number(e.target.value) })}
            placeholder="ex: 80"
            min="1"
          />
          <p className="form-hint">Quanto você quer receber por hora de trabalho?</p>
        </div>
        <div className="form-group">
          <label className="form-label">Horas por {input.workType === "hora" ? "hora" : input.workType === "projeto" ? "projeto" : "dia"}</label>
          <input
            type="number"
            className="form-input"
            value={input.hoursPerUnit}
            onChange={(e) => onChange({ hoursPerUnit: Number(e.target.value) })}
            placeholder="Ex: 1"
            min="0.5"
            step="0.5"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Custos fixos mensais (R$)</label>
          <input
            type="number"
            className="form-input"
            value={input.monthlyFixedCosts || ""}
            onChange={(e) => onChange({ monthlyFixedCosts: Number(e.target.value) })}
            placeholder="ex: 1500"
            min="0"
          />
          <p className="form-hint">Internet, celular, equipamento, ferramenta...</p>
        </div>
        <div className="form-group">
          <label className="form-label">Horas trabalháveis/mês</label>
          <input
            type="number"
            className="form-input"
            value={input.workingHoursPerMonth}
            onChange={(e) => onChange({ workingHoursPerMonth: Number(e.target.value) })}
            placeholder="Ex: 160"
            min="1"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Regime tributário</label>
        <select
          className="form-input"
          value={input.taxType}
          onChange={(e) => onChange({ taxType: e.target.value as CalcInput["taxType"] })}
        >
          <option value="isento">Isento</option>
          <option value="mei">MEI</option>
          <option value="simples">Simples Nacional</option>
          <option value="pf">Pessoa Física (PF)</option>
        </select>
      </div>

      <div className="btn-row">
        <button className="btn-primary" onClick={onNext}>
          Continuar
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function StepMercado({
  input,
  onChange,
  onNext,
  onBack,
}: {
  input: CalcInput;
  onChange: (u: Partial<CalcInput>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <h2 className="step-title">Seu Mercado</h2>
      <p className="step-subtitle">Ajuste o preço com base no mercado — opcional mas recomendado.</p>

      <div className="form-group">
        <label className="form-label">Quanto cobram concorrentes (opcional)</label>
        <input
          type="number"
          className="form-input"
          value={input.marketRate || ""}
          onChange={(e) => onChange({ marketRate: Number(e.target.value) })}
          placeholder="Deixe vazio se não souber"
          min="0"
        />
        <p className="form-hint">Pequena variação ajusta a faixa de mercado automaticamente.</p>
      </div>

      <div className="form-group">
        <label className="form-label">Nível de experiência</label>
        <div className="tier-selector">
          {(["junior", "pleno", "senior"] as const).map((level) => (
            <button
              key={level}
              type="button"
              className={`tier-btn ${input.experienceLevel === level ? "selected" : ""}`}
              onClick={() => onChange({ experienceLevel: level })}
            >
              <div className="tier-name">
                {level === "junior" ? "Júnior" : level === "pleno" ? "Pleno" : "Sênior"}
              </div>
              <div className="tier-desc">
                {level === "junior" ? "0-2 anos" : level === "pleno" ? "3-5 anos" : "5+ anos"}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Urgência do cliente</label>
        <div className="tier-selector">
          {(["normal", "media", "alta"] as const).map((urg) => (
            <button
              key={urg}
              type="button"
              className={`tier-btn ${input.urgency === urg ? "selected" : ""}`}
              onClick={() => onChange({ urgency: urg })}
            >
              <div className="tier-name">
                {urg === "normal" ? "Normal" : urg === "media" ? "Média" : "Alta"}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="btn-row">
        <button className="btn-secondary" onClick={onBack}>
          ← Voltar
        </button>
        <button className="btn-primary" onClick={onNext}>
          Calcular Preço →
        </button>
      </div>
    </div>
  );
}

function StepPreco({
  onCalculate,
  canUse,
  onBack,
}: {
  onCalculate: () => void;
  canUse: boolean;
  onBack: () => void;
}) {
  return (
    <div>
      <h2 className="step-title">Seu Preço</h2>
      <p className="step-subtitle">
        Revise suas informações e veja o preço sugerido.
      </p>

      <div
        style={{
          background: "var(--accent-light)",
          border: "1.5px solid #bfdbfe",
          borderRadius: 10,
          padding: 16,
          marginBottom: 20,
          fontSize: 13,
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: 8 }}>📊 Pronto para calcular!</p>
        {canUse ? (
          <p style={{ color: "var(--text-muted)" }}>Este cálculo usará 1 dos seus 3 gratuitos deste mês.</p>
        ) : (
          <p style={{ color: "#dc2626" }}>Limite gratuito atingido. Compre avulso (R$ 1,50) ou assine (R$ 9,90/mês) para continuar.</p>
        )}
      </div>

      <div className="btn-row">
        <button className="btn-secondary" onClick={onBack}>
          ← Ajustar dados
        </button>
        <button
          className="btn-primary"
          onClick={onCalculate}
          disabled={!canUse}
          style={{ opacity: canUse ? 1 : 0.5 }}
        >
          💰 Ver Preço Sugerido
        </button>
      </div>
    </div>
  );
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}