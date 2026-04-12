"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useVariant } from "@/hooks/useVariant";
import { HeroVariantA } from "@/components/HeroVariant";
import { HeroVariantB } from "@/components/HeroVariant";
import Calculator from "@/components/Calculator";
import FeedbackWidget from "@/components/FeedbackWidget";
import type { CalcInput, CalcResult, Calculation } from "@/lib/types";
import type { UTMData } from "@/components/MetaPixel";
import { FREE_LIMIT, PAY_PER_USE_PRICE, MONTHLY_PRICE, STORAGE_KEY } from "@/lib/pricing";
import { HelpCircle, Calculator as CalcIcon } from "lucide-react";

function getUsageCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const history: Calculation[] = JSON.parse(raw);
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    return history.filter((c) => c.timestamp >= monthStart).length;
  } catch {
    return 0;
  }
}

function saveCalculation(calc: CalcResult, input: CalcInput) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const history: Calculation[] = raw ? JSON.parse(raw) : [];
    history.unshift({ ...calc, input, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
  } catch {}
}

function parseUTMParams(): UTMData {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
  };
}

const faqItems = [
  {
    question: "Quanto custa usar a Calculadora?",
    answer: "Você tem 3 cálculos gratuitos por mês, sem cadastro. Acima disso, assine o plano mensal ou pague R$9,90 por uso extra.",
  },
  {
    question: "A calculadora serve para qualquer profissão?",
    answer: "Funciona melhor para quem cobra por hora, projeto ou diária — designers, desenvolvedores, redactores, consultores, tradutores, etc.",
  },
  {
    question: "Como funciona o regime tributário (MEI, Simples, PF)?",
    answer: "Cada regime tem uma alíquota diferente. MEI cobra 5% sobre o faturamento, Simples 10%, PF 15% e isento não cobra nada. A calculadora soma isso ao seu custo total.",
  },
  {
    question: "O preço sugerido é o que devo cobrar?",
    answer: "É um ponto de partida com margem segura. Se você já cobra mais caro e tem clientes, está ok. Se está começando, use o valor sugerido e ajuste com o tempo.",
  },
  {
    question: "O que é o multiplicador de urgência?",
    answer: "Trabalhos com prazo curto exigem mais. Urgência alta (+25%) ou média (+10%) são adicionados ao preço para compensar o esforço extra.",
  },
];

export default function HomePage() {
  const [started, setStarted] = useState(false);
  const [usageCount, setUsageCount] = useState(FREE_LIMIT);
  const [utm, setUtm] = useState<UTMData>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackKey, setFeedbackKey] = useState(0);

  useEffect(() => {
    setUsageCount(Math.max(0, FREE_LIMIT - getUsageCount()));
    setUtm(parseUTMParams());
  }, [started]);

  function handleCalculate(input: CalcInput): CalcResult {
    const calcResult = calculatePrice(input);
    if (started) {
      saveCalculation(calcResult, input);
      setUsageCount(Math.max(0, usageCount - 1));

      // Show feedback widget after first successful calculation in session
      const alreadyShown = localStorage.getItem("calc_feedback_shown");
      if (!alreadyShown) {
        setFeedbackKey((k) => k + 1);
        setShowFeedback(true);
      }
    }
    return calcResult;
  }

  function handleStart() {
    setStarted(true);
  }

  const { variant, isLoading } = useVariant();

  return (
    <main>
      <Header />
      {!started ? (
        <>
          {isLoading ? null : variant === "B" ? (
            <HeroVariantB onStart={handleStart} />
          ) : (
            <HeroVariantA onStart={handleStart} />
          )}

          {/* FAQ Section */}
          <section className="container py-16">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">
                  Perguntas frequentes
                </h2>
              </div>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur"
                  >
                    <h3 className="mb-2 font-medium text-white">{item.question}</h3>
                    <p className="text-sm leading-6 text-slate-300">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <Calculator
          onCalculate={handleCalculate}
          usageCount={usageCount}
          utm={utm}
          freeLimit={FREE_LIMIT}
          payPerUsePrice={PAY_PER_USE_PRICE}
          monthlyPrice={MONTHLY_PRICE}
        />
      )}

      {showFeedback && (
        <FeedbackWidget
          key={feedbackKey}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </main>
  );
}

function calculatePrice(input: CalcInput): CalcResult {
  const {
    workType,
    hoursPerUnit,
    desiredHourlyRate,
    monthlyFixedCosts,
    workingHoursPerMonth,
    taxType,
    marketRate,
    experienceLevel,
  } = input;

  const taxMult: Record<string, number> = { isento: 0, mei: 0.05, simples: 0.1, pf: 0.15 };
  const taxRate = taxMult[taxType] ?? 0;
  const socialCharges = 0.2;
  const totalOverhead = taxRate + socialCharges;

  const monthlyIncomeTarget = monthlyFixedCosts + (desiredHourlyRate * workingHoursPerMonth);
  const effectiveHourlyCost = monthlyIncomeTarget / workingHoursPerMonth;

  let basePricePerUnit = effectiveHourlyCost * hoursPerUnit;

  const expMult: Record<string, number> = { junior: 1.0, pleno: 1.5, senior: 2.2 };
  basePricePerUnit *= expMult[experienceLevel] ?? 1.5;

  const urgencyMult = input.urgency === "alta" ? 1.25 : input.urgency === "media" ? 1.1 : 1.0;
  basePricePerUnit *= urgencyMult;

  const totalMultiplier = 1 + totalOverhead;
  let recommendedPrice = Math.ceil(basePricePerUnit * totalMultiplier * 100) / 100;

  let marketMin = recommendedPrice * 0.7;
  let marketMax = recommendedPrice * 1.3;
  if (marketRate > 0) {
    const avgMarket = (recommendedPrice + marketRate) / 2;
    marketMin = avgMarket * 0.75;
    marketMax = avgMarket * 1.25;
    recommendedPrice = Math.max(recommendedPrice, marketRate * 0.85);
  }

  const unitLabel = workType === "hora" ? "hora" : workType === "projeto" ? "projeto" : "dia";
  const breakdown = {
    hourlyTarget: desiredHourlyRate,
    monthlyFixedCosts,
    workingHoursPerMonth,
    effectiveHourlyCost: Math.ceil(effectiveHourlyCost * 100) / 100,
    taxRate,
    socialCharges,
    experienceMultiplier: expMult[experienceLevel] ?? 1.5,
    urgencyMultiplier: urgencyMult,
    marketMin: Math.round(marketMin * 100) / 100,
    marketMax: Math.round(marketMax * 100) / 100,
  };

  return {
    recommendedPrice,
    priceMin: Math.round(marketMin * 100) / 100,
    priceMax: Math.round(marketMax * 100) / 100,
    unitLabel,
    breakdown,
  };
}
