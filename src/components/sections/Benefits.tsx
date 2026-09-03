import { ShieldCheck, Cpu, Layout, Zap, Terminal, Box } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    title: "LiteSpeed Web Server",
    description: "Servidores ultrarrápidos con LiteSpeed y CloudLinux para un rendimiento óptimo y estable.",
    icon: Zap,
  },
  {
    title: "Selector Multi-Lenguaje",
    description: "Soporte completo para Node.JS, Python, Ruby y múltiples versiones de PHP con selector dedicado.",
    icon: Cpu,
  },
  {
    title: "Constructor SitePad",
    description: "Crea tu sitio fácilmente con cientos de plantillas profesionales adaptables a móviles.",
    icon: Layout,
  },
  {
    title: "Gestión Avanzada",
    description: "Elige entre cPanel, Webuzo, Plesk o DirectAdmin para gestionar tu hosting como prefieras.",
    icon: Terminal,
  },
];

export default function Benefits() {
  return (
    <section id="caracteristicas" className="bg-muted/10 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-2">
            Infraestructura de Élite
          </h2>
          <p className="mx-auto max-w-2xl text-xs md:text-base text-muted-foreground leading-relaxed">
            Potenciamos tus proyectos con las mejores herramientas del mercado, optimizadas para desarrolladores.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2 pt-6 px-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-sm md:text-lg font-bold">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6 px-4">
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
