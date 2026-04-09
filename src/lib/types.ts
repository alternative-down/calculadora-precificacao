export interface CalcInput {
  workType: "hora" | "projeto" | "dia";
  hoursPerUnit: number;
  desiredHourlyRate: number;
  monthlyFixedCosts: number;
  workingHoursPerMonth: number;
  taxType: "isento" | "mei" | "simples" | "pf";
  marketRate: number;
  experienceLevel: "junior" | "pleno" | "senior";
  urgency: "normal" | "media" | "alta";
}

export interface CalcResult {
  recommendedPrice: number;
  priceMin: number;
  priceMax: number;
  unitLabel: string;
  breakdown: {
    hourlyTarget: number;
    monthlyFixedCosts: number;
    workingHoursPerMonth: number;
    effectiveHourlyCost: number;
    taxRate: number;
    socialCharges: number;
    experienceMultiplier: number;
    urgencyMultiplier: number;
    marketMin: number;
    marketMax: number;
  };
}

export interface Calculation extends CalcResult {
  input: CalcInput;
  timestamp: string;
}