import Link from "next/link";
import { ArrowLeft, LifeBuoy } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="header-logo">Alternative Down</span>
        <div className="header-nav">
          <Link href="/support" className="header-support">
            <LifeBuoy size={14} />
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
