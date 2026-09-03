import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white py-12 md:py-16 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="PROISO Tech & Software Solutions" 
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-zinc-400 max-w-xs text-xs md:text-sm leading-relaxed">
              Hosting NVMe de alto rendimiento en Perú. Servidores optimizados para aplicaciones modernas con soporte local.
            </p>
          </div>
          
          <div>
            <h4 className="text-[11px] font-bold mb-5 uppercase tracking-widest text-zinc-100">Navegación</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/#inicio" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="/#planes" className="hover:text-primary transition-colors">Planes Anuales</Link></li>
              <li><Link href="/#caracteristicas" className="hover:text-primary transition-colors">Características</Link></li>
              <li><Link href="/#faq" className="hover:text-primary transition-colors">Faqs</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & Guías</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[11px] font-bold mb-5 uppercase tracking-widest text-zinc-100">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/politica-de-privacidad" className="hover:text-primary transition-colors">Privacidad</Link></li>
              <li><Link href="/libro-de-reclamaciones" className="hover:text-primary transition-colors">Libro de Reclamaciones</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[11px] font-bold mb-5 uppercase tracking-widest text-zinc-100">Soporte</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:hosting@proiso.pe" className="hover:text-primary transition-colors">hosting@proiso.pe</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span>+51 924 081 817</span>
              </li>
              <li className="text-zinc-500 mt-2 text-xs">
                Lima, Perú
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-900 text-center">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} PROISO Tech & Software Solutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
