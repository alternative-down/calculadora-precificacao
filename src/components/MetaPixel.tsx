"use client";
import Script from "next/script";

// Pixel ID injected at runtime via NEXT_PUBLIC_META_PIXEL_ID env var
// Falls back to placeholder so code doesn't break in dev
const PIXEL_ID =
  typeof process !== "undefined"
    ? (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "PLACEHOLDER")
    : "PLACEHOLDER";

declare global {
  interface Window {
    fbq: (
      action: string,
      event: string,
      options?: Record<string, unknown>
    ) => void;
  }
}

export function trackPageView() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "PageView");
}

export function trackCalculationComplete(price: number) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "CalculationComplete", {
    currency: "BRL",
    value: price,
  });
}

export function trackLead() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "Lead", {
    currency: "BRL",
  });
}

export default function MetaPixel() {
  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  );
}
