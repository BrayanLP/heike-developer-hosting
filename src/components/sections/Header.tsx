import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-[env(safe-area-inset-top)]">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-7 w-auto md:h-8"
            />
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
          <Link href="/#inicio" className="transition-colors hover:text-primary">Inicio</Link>
          <Link href="/#planes" className="transition-colors hover:text-primary">Planes</Link>
          <Link href="/#caracteristicas" className="transition-colors hover:text-primary">Características</Link>
          <Link href="/#faq" className="transition-colors hover:text-primary">Faqs</Link>
          <Link href="/blog" className="transition-colors hover:text-primary text-primary">Blog</Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground/70 hover:text-primary transition-colors">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left mb-4">
                    <img src="/logo.png" alt="Logo" className="h-6 w-auto" />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6 text-sm font-bold uppercase tracking-wider">
                  <Link href="/#inicio" className="hover:text-primary">Inicio</Link>
                  <Link href="/#planes" className="hover:text-primary">Planes</Link>
                  <Link href="/#caracteristicas" className="hover:text-primary">Características</Link>
                  <Link href="/#faq" className="hover:text-primary">Faqs</Link>
                  <Link href="/blog" className="hover:text-primary text-primary">Blog</Link>
                  <Button asChild className="mt-4 font-bold shadow-sm">
                    <Link href="#planes">Contratar</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Button asChild variant="default" className="hidden md:inline-flex font-bold shadow-sm h-8 text-xs px-4">
            <Link href="#planes">Contratar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
