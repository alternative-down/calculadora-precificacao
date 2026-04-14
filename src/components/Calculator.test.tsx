import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Calculator from "./Calculator";
import type { CalcInput, CalcResult } from "@/lib/types";

vi.mock("@/components/MetaPixel", () => ({
  trackCalculationComplete: vi.fn(),
  trackLead: vi.fn(),
  trackPageView: vi.fn(),
}));

function mockOnCalculate(_input: CalcInput): CalcResult {
  return {
    recommendedPrice: 150,
    breakdown: {
      effectiveHourlyCost: 50,
      taxRate: 0.15,
      socialCharges: 0.20,
      experienceMultiplier: 1.3,
      urgencyMultiplier: 1.15,
    },
    unitLabel: "hora",
    comparison: null,
  };
}

function renderCalc(overrides = {}) {
  return render(<Calculator onCalculate={mockOnCalculate} usageCount={0}
    utm={undefined} freeLimit={3} payPerUsePrice={9.9} monthlyPrice={29}
    {...overrides} />);
}

function click(text: string) {
  const btn = screen.getAllByRole("button").find(b => b.textContent?.includes(text));
  if (!btn) throw new Error("Button not found: " + text);
  fireEvent.click(btn);
}
function go2()  { click("Continuar"); }
function go3()  { go2(); click("Calcular Preço"); }
function goResult() { go3(); click("Ver Preço Sugerido"); }

describe("Calculator", () => {
  beforeEach(() => { localStorage.clear(); vi.clearAllMocks(); });

  // ── Step 1 ────────────────────────────────────────────────────────────
  it("renders step indicator with Custos and Mercado labels", () => {
    renderCalc();
    // StepIndicator renders "1. Custos" etc. — use fragments
    expect(screen.getByText("Custos")).toBeTruthy();
    expect(screen.getByText("Mercado")).toBeTruthy();
    expect(screen.getByText(/Seus Custos/)).toBeTruthy();
  });

  it("has 3 work type options", () => {
    renderCalc();
    // Each label may be split across <span> elements — match key words individually
    expect(screen.getByText(/^Por hora$/)).toBeTruthy();
    expect(screen.getByText(/^Por projeto$/)).toBeTruthy();
    expect(screen.getByText("Por dia")).toBeTruthy();
  });

  it("advances to step 2 (Mercado)", () => {
    renderCalc(); go2();
    expect(screen.getByText("Mercado")).toBeTruthy();
  });

  // ── Step 2 ────────────────────────────────────────────────────────────
  it("renders experience level options in step 2", () => {
    renderCalc(); go2();
    expect(screen.getByText("Pleno")).toBeTruthy();
    expect(screen.getByText("Sênior")).toBeTruthy();
  });

  it("has a back button to return to step 1 from step 2", () => {
    // "Voltar" button is in StepMercado (step 2), goes back to step 1
    renderCalc(); go2();
    const voltarBtn = screen.getAllByRole("button").find(b => b.textContent?.includes("Voltar"));
    expect(voltarBtn).toBeTruthy();
    fireEvent.click(voltarBtn!);
    expect(screen.getByText("Seus Custos")).toBeTruthy();
  });

  it("advances to step 3 (Preço)", () => {
    renderCalc(); go3();
    expect(screen.getByText("Seu Preço")).toBeTruthy();
  });

  // ── Step 3 — Free usage vs upsell ─────────────────────────────────────
  it("shows free usage message when usageCount > 0 in step 3", () => {
    renderCalc({ usageCount: 3 }); go3();
    // When usageCount=3 (>0), canUseFree=true, StepPreco shows the soft blue info box
    expect(screen.getByText(/Este cálculo usará 1 dos seus 3 gratuitos/)).toBeTruthy();
  });

  it("shows upsell message when usageCount=0 (canUse=false)", () => {
    // canUseFree = usageCount > 0. usageCount=0 → canUseFree=false → StepPreco shows red upsell
    renderCalc({ usageCount: 0 }); go3();
    const allText = document.body.textContent || "";
    expect(allText).toMatch(/Limite gratuito atingido/);
    expect(allText).toMatch(/avulso/);
    expect(allText).toMatch(/assine/);
    const btn = screen.getAllByRole("button").find(b => b.textContent?.includes("Ver Preço Sugerido"));
    expect(btn).toBeDisabled();
  });

  // ── Result screen ─────────────────────────────────────────────────────
  it("shows result price after clicking Ver Preço Sugerido", async () => {
    renderCalc({ usageCount: 1 }); goResult();
    await waitFor(() => { expect(screen.getByText(/R\$\s*150/)).toBeTruthy(); });
  });

  it("renders breakdown rows on result screen", async () => {
    renderCalc({ usageCount: 1 }); goResult();
    await waitFor(() => {
      expect(screen.getByText("Custo efetivo por hora")).toBeTruthy();
      expect(screen.getByText(/Encargos.*FGTS/)).toBeTruthy();
    });
  });

  it("shows WhatsApp share button on result screen", async () => {
    renderCalc({ usageCount: 1 }); goResult();
    await waitFor(() => { expect(screen.getByText("WhatsApp")).toBeTruthy(); });
  });

  it('shows "Novo cálculo" button on result screen', async () => {
    renderCalc({ usageCount: 1 }); goResult();
    await waitFor(() => { expect(screen.getByText(/R\$\s*150/)).toBeTruthy(); });
    const restartBtn = screen.getAllByRole("button").find(b => b.textContent?.includes("Novo cálculo"));
    expect(restartBtn).toBeTruthy();
  });

  it("shows upsell banner on result screen when usageCount >= freeLimit", () => {
    renderCalc({ usageCount: 3 }); goResult();
    const allText = document.body.textContent || "";
    expect(allText).toMatch(/Limite atingido/);
  });

  it("tracks calculation with MetaPixel on result screen", async () => {
    const { trackCalculationComplete } = vi.mocked(await import("@/components/MetaPixel"));
    renderCalc({ usageCount: 1 }); goResult();
    await waitFor(() => { expect(trackCalculationComplete).toHaveBeenCalled(); });
  });

  it('"Novo cálculo" returns to step 1', async () => {
    renderCalc({ usageCount: 1 }); goResult();
    await waitFor(() => { expect(screen.getByText(/R\$\s*150/)).toBeTruthy(); });
    // Find restart button via textContent (button contains "↻ Novo cálculo" as text nodes)
    const restartBtn = screen.getAllByRole("button").find(b => b.textContent?.includes("Novo cálculo"));
    expect(restartBtn).toBeTruthy();
    fireEvent.click(restartBtn!);
    await waitFor(() => { expect(screen.getByText("Seus Custos")).toBeTruthy(); });
  });

  it("displays monthlyPrice in upsell banner on result screen", async () => {
    renderCalc({ usageCount: 3, monthlyPrice: 49 }); goResult();
    const upsellBanner = document.querySelector(".upsell-banner");
    expect(upsellBanner).toBeTruthy();
    expect(upsellBanner!.textContent).toMatch(/49/);
  });

  it("displays payPerUsePrice in upsell banner", () => {
    renderCalc({ usageCount: 3, payPerUsePrice: 19.9 }); goResult();
    const upsellBanner = document.querySelector(".upsell-banner");
    expect(upsellBanner!.textContent).toMatch(/19/);
  });
});
