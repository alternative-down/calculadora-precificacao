"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Calculator from "@/components/Calculator";
import type { CalcInput, CalcResult, Calculation } from "@/lib/types";

const STORAGE_KEY = "calc_preco_history";
const FREE_LIMIT = 3;
const PAY_PER_USE_PRICE = 1.5;
const MONTHLY_PRICE = 9.9;

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

export default function HomePage() {
  const [started, setStarted] = useState(false);
  const [usageCount, setUsageCount] = useState(FREE_LIMIT);

  useEffect(() => {
    setUsageCount(Math.max(0, FREE_LIMIT - getUsageCount()));
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

  return (
    <main>
      <Header />
      {!started ? (
        <Hero onStart={handleStart} />
      ) : (
        <Calculator
          onCalculate={handleCalculate}
          usageCount={usageCount}
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

  // Tax multiplier by regime
  const taxMult: Record<string, number> = { isento: 0, mei: 0.05, simples: 0.1, pf: 0.15 };
  const taxRate = taxMult[taxType] ?? 0;
  const socialCharges = 0.2; // FGTS, INSS etc.
  const totalOverhead = taxRate + socialCharges;

  // Monthly income target from fixed costs + desired rate
  const monthlyIncomeTarget = monthlyFixedCosts + (desiredHourlyRate * workingHoursPerMonth);
  const effectiveHourlyCost = monthlyIncomeTarget / workingHoursPerMonth;

  // Price per unit type
  let basePricePerUnit = effectiveHourlyCost * hoursPerUnit;

  // Apply experience multiplier
  const expMult: Record<string, number> = { junior: 1.0, pleno: 1.5, senior: 2.2 };
  basePricePerUnit *= expMult[experienceLevel] ?? 1.5;

  // Urgency modifier
  const urgencyMult = input.urgency === "alta" ? 1.25 : input.urgency === "media" ? 1.1 : 1.0;
  basePricePerUnit *= urgencyMult;

  // Add taxes and social charges
  const totalMultiplier = 1 + totalOverhead;
  let recommendedPrice = Math.ceil(basePricePerUnit * totalMultiplier * 100) / 100;

  // Market reference
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