"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useVariant } from "@/hooks/useVariant";
import { HeroVariantA } from "@/components/HeroVariant";
import { HeroVariantB } from "@/components/HeroVariant";
import Calculator from "@/components/Calculator";
import type { CalcInput, CalcResult, Calculation } from "@/lib/types";
import type { UTMData } from "@/components/MetaPixel";
import { FREE_LIMIT, PAY_PER_USE_PRICE, MONTHLY_PRICE, STORAGE_KEY } from "@/lib/pricing";

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

export default function HomePage() {
  const [started, setStarted] = useState(false);
  const [usageCount, setUsageCount] = useState(FREE_LIMIT);
  const [utm, setUtm] = useState<UTMData>({});

  useEffect(() => {
    setUsageCount(Math.max(0, FREE_LIMIT - getUsageCount()));
    setUtm(parseUTMParams());
  }, [started]);

  function handleCalculate(input: CalcInput): CalcResult {
    const calcResult = calculatePrice(input);
    if (started) {
      saveCalculation(calcResult, input);
      setUsageCount(Math.max(0, usageCount - 1));
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
        isLoading ? null : variant === "B" ? (
          <HeroVariantB onStart={handleStart} />
        ) : (
          <HeroVariantA onStart={handleStart} />
        )
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
