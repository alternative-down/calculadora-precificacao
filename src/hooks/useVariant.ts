"use client";

import { useState, useEffect } from "react";

type Variant = "A" | "B";

interface UseVariantReturn {
  variant: Variant;
  isLoading: boolean;
}

/**
 * A/B variant assignment via cookie.
 * - On first visit: randomly assign A or B (50/50), set cookie.
 * - On return: read existing cookie to keep consistent experience.
 */
export function useVariant(key = "calc-preco-variant"): UseVariantReturn {
  const [variant, setVariant] = useState<Variant>("A");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1] as Variant | undefined;

    if (stored === "A" || stored === "B") {
      setVariant(stored);
    } else {
      const assigned: Variant = Math.random() < 0.5 ? "A" : "B";
      // Expire in 30 days, same-site strict
      document.cookie = `${key}=${assigned}; max-age=${60 * 60 * 24 * 30}; samesite=strict`;
      setVariant(assigned);
    }
    setIsLoading(false);
  }, [key]);

  return { variant, isLoading };
}