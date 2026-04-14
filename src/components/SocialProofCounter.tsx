"use client";

import { useEffect, useState } from "react";

interface SocialProofCounterProps {
  endpoint?: string;
  fallbackCount?: number;
  suffix?: string;
}

export default function SocialProofCounter({
  endpoint = "/api/analytics/price-count",
  fallbackCount = 2400,
  suffix = "autônomos já descobriram o preço certo",
}: SocialProofCounterProps) {
  const [count, setCount] = useState(fallbackCount);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("fetch failed");
        const data = (await res.json()) as { count: number };
        if (data.count && data.count > 0) {
          setCount(data.count);
        }
      } catch {
        // Keep fallback on error
      }
    }

    fetchCount();

    // Subtle increment to feel live — realistic daily growth rate
    const start = fallbackCount;
    const target = start + Math.floor(Math.random() * 12) + 2;
    const steps = 20;
    const interval = 1000 / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCount((prev) => Math.floor(start + (target - start) * progress));
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [endpoint, fallbackCount]);

  return (
    <div className="social-proof">
      <strong>+{count.toLocaleString("pt-BR")}</strong> {suffix}
    </div>
  );
}
