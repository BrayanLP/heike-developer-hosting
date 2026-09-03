"use client";

import { useState } from "react";
import { List, ChevronDown } from "lucide-react";
import type { TocItem } from "@/lib/blog";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!items || items.length < 2) return null;

  return (
    <aside className="my-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-4 sm:p-5 transition-all shadow-sm">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors w-full text-left"
          aria-expanded={isOpen}
        >
          <List className="w-4 h-4 text-primary shrink-0" />
          <span>Tabla de Contenidos</span>
          <ChevronDown
            className={`w-4 h-4 ml-auto text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <nav aria-label="Contenido del artículo" className="mt-3.5 pt-3 border-t border-border/50">
          <ul className="space-y-2 text-xs sm:text-sm">
            {items.map((item) => (
              <li
                key={item.id}
                className={item.level === 3 ? "pl-4 text-muted-foreground" : "font-medium"}
              >
                <a
                  href={`#${item.id}`}
                  className="text-muted-foreground hover:text-primary transition-colors block py-0.5"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
