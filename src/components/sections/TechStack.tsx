
import { Terminal, Cpu, Box, LayoutPanelLeft } from "lucide-react";

export default function TechStack() {
  return (
    <section className="py-12 bg-zinc-950 border-y border-zinc-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-3 shrink-0">
             <Terminal className="h-5 w-5 text-primary" />
             <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Optimizado para:</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <div className="flex items-center gap-2 group">
              <Cpu className="h-5 w-5 text-white" />
              <span className="text-white text-sm font-bold tracking-tight">NodeJS</span>
            </div>
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5 text-white" />
              <span className="text-white text-sm font-bold tracking-tight">Python</span>
            </div>
            <div className="flex items-center gap-2">
              <LayoutPanelLeft className="h-5 w-5 text-white" />
              <span className="text-white text-sm font-bold tracking-tight">WordPress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 border-2 border-white rounded-sm flex items-center justify-center text-[10px] font-bold text-white leading-none">PHP</div>
              <span className="text-white text-sm font-bold tracking-tight">PHP 8.x</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
              <span className="text-white text-sm font-bold tracking-tight">React/NextJS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
