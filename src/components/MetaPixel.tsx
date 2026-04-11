"use client";
import Script from "next/script";

const PIXEL_ID =
  typeof process !== "undefined"
    ? (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "PLACEHOLDER")
    : "PLACEHOLDER";

declare global {
  interface Window {
    fbq: (
      action: string,
      event: string,
      options?: Record<string, string | number | null | undefined>
    ) => void;
  }
}

export interface UTMData {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
}

function buildEventData(utm?: UTMData): Record<string, string | number | null | undefined> {
  if (!utm) return {};
  return {
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_content: utm.utm_content,
    utm_term: utm.utm_term,
  };
}

export function trackPageView(utm?: UTMData) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "PageView", buildEventData(utm));
}

export function trackCalculationComplete(price: number, utm?: UTMData) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "CalculationComplete", {
    currency: "BRL",
    value: price,
    ...buildEventData(utm),
  });
}

export function trackLead(utm?: UTMData) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "Lead", {
    currency: "BRL",
    ...buildEventData(utm),
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
