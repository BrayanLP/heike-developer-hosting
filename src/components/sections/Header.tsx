import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="PROISO Tech & Software Solutions" 
              className="h-7 w-auto md:h-8"
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
          <Link href="/#inicio" className="transition-colors hover:text-primary">Inicio</Link>
          <Link href="/#planes" className="transition-colors hover:text-primary">Planes</Link>
          <Link href="/#caracteristicas" className="transition-colors hover:text-primary">Características</Link>
          <Link href="/#faq" className="transition-colors hover:text-primary">Faqs</Link>
          <Link href="/blog" className="transition-colors hover:text-primary text-primary">Blog</Link>
        </nav>
        <div className="flex items-center">
          <Button asChild variant="default" className="font-bold shadow-sm h-8 text-xs px-4">
            <Link href="#planes">Contratar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
