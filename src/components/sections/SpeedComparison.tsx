
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Clock, ShieldCheck, Play } from "lucide-react";

export default function SpeedComparison() {
  const [loading, setLoading] = useState(false);
  const [brendaProgress, setBrendaProgress] = useState(0);
  const [oldProgress, setOldProgress] = useState(0);

  const startTest = () => {
    setLoading(true);
    setBrendaProgress(0);
    setOldProgress(0);
  };

  useEffect(() => {
    if (loading) {
      const brayanInterval = setInterval(() => {
        setBrendaProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 5;
        });
      }, 40);

      const oldInterval = setInterval(() => {
        setOldProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 1.2;
        });
      }, 40);

      if (brendaProgress >= 100 && oldProgress >= 100) {
        setLoading(false);
        clearInterval(brayanInterval);
        clearInterval(oldInterval);
      }

      return () => {
        clearInterval(brayanInterval);
        clearInterval(oldInterval);
      };
    }
  }, [loading, brendaProgress, oldProgress]);

  return (
    <section className="py-24 bg-foreground text-white overflow-hidden border-y border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 tracking-tight sm:text-4xl">Siente la potencia del almacenamiento NVMe</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Comparamos el tiempo de carga promedio de un sitio web complejo entre un hosting tradicional y la infraestructura de Brenda Developer Hosting.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-12 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 shadow-2xl">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Hosting Tradicional (SSD/HDD)</span>
              <span className="text-sm font-mono text-zinc-400">{Math.floor(oldProgress)}%</span>
            </div>
            <Progress value={oldProgress} className="h-3 bg-zinc-800" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-widest">
                <Zap className="h-4 w-4 fill-primary animate-pulse" /> Brenda Developer Hosting (NVMe Gen4)
              </span>
              <span className="text-sm font-mono text-primary font-bold">{Math.floor(brendaProgress)}%</span>
            </div>
            <Progress value={brendaProgress} className="h-4 bg-zinc-800" />
          </div>

          <div className="flex flex-col items-center gap-4 pt-8">
            <Button 
              size="lg" 
              onClick={startTest} 
              disabled={loading}
              className="px-12 py-8 text-xl font-bold shadow-[0_0_20px_rgba(255,165,0,0.3)] hover:shadow-[0_0_30px_rgba(255,165,0,0.5)] transition-all active:scale-95 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? (
                "Simulando carga real..."
              ) : (
                <span className="flex items-center gap-3">
                  <Play className="h-5 w-5 fill-current" /> ¡Probar Velocidad!
                </span>
              )}
            </Button>
            <p className="text-xs text-zinc-500 italic">Simulación basada en pruebas reales de IOPS sobre discos NVMe.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-zinc-800">
             <div className="text-center group">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold mb-1 text-sm">0.2s TTFB</h4>
                <p className="text-[11px] text-zinc-500 leading-tight">Tiempo de respuesta inicial instantáneo para tus apps.</p>
             </div>
             <div className="text-center group">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold mb-1 text-sm">20x IOPS</h4>
                <p className="text-[11px] text-zinc-500 leading-tight">Mayor capacidad de entrada/salida para bases de datos pesadas.</p>
             </div>
             <div className="text-center group">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold mb-1 text-sm">Escalabilidad</h4>
                <p className="text-[11px] text-zinc-500 leading-tight">Soporta picos de tráfico sin degradar el rendimiento.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
