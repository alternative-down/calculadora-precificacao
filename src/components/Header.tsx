import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="header-logo">Alternative Down</span>
        <div className="header-links">
          <Link href="/support" className="header-support">
            Suporte
          </Link>
          <Link href="https://alternativedown.com.br/orcamento" className="header-back">
            <ArrowLeft size={14} />
            Voltar
          </Link>
        </div>
      </div>
    </header>
  );
}