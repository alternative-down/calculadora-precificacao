"use client";

import { useEffect, useState } from "react";

interface SocialProofCounterProps {
  baseCount?: number;
  suffix?: string;
}

export default function SocialProofCounter({
  baseCount = 2400,
  suffix = "autônomos já descobriram o preço certo",
}: SocialProofCounterProps) {
  const [count, setCount] = useState(baseCount);

  useEffect(() => {
    // Subtle increment to feel live — realistic daily growth rate
    const start = baseCount;
    const target = start + Math.floor(Math.random() * 12) + 2;
    const steps = 20;
    const interval = 1000 / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCount(Math.floor(start + (target - start) * progress));
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [baseCount]);

  return (
    <div className="social-proof">
      <strong>+{count.toLocaleString("pt-BR")}</strong> {suffix}
    </div>
  );
}
