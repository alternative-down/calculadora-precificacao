import type { Metadata } from "next";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "Calculadora de Precificação — Alternative Down",
  description: "Descubra em 2 minutos quanto cobrar pelo seu trabalho — sem planilha, sem complicação.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}