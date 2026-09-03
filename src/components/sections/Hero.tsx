import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section id="inicio" className="relative pt-8 pb-6 md:pt-16 md:pb-12 overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ff990005_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent(1px)),linear-gradient(to_bottom,#80808003_1px,transparent(1px))] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-3 md:space-y-6">
          <Badge variant="outline" className="py-0.5 px-3 border-primary/20 bg-primary/5 text-primary text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full">
            Cloud, Hosting & Software • Liderado por Brenda Developer
          </Badge>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Potencia tus Proyectos con <br className="hidden sm:block" />
            <span className="text-primary italic">PROISO Tech & Software Solutions</span>
          </h1>
          
          <p className="text-sm md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Infraestructura cloud de alto rendimiento y desarrollo de software a medida en Perú. 
            Servidores NVMe PCIe 4.0, LiteSpeed Enterprise y soporte directo por WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
            <Button size="default" className="font-bold rounded-lg shadow-md transition-all group w-full sm:w-auto" asChild>
              <Link href="#planes">
                Ver Planes <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="default" variant="ghost" className="font-bold rounded-lg w-full sm:w-auto" asChild>
              <Link href="#caracteristicas">Características</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 pt-4 opacity-70">
            <div className="flex items-center gap-1.5 text-xs md:text-sm font-medium">
              <Zap className="h-4 w-4 text-primary" />
              <span>NVMe SSD</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm font-medium">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>SSL Gratis</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm font-medium">
              <Globe className="h-4 w-4 text-primary" />
              <span>Uptime 99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
