import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  currentTitle?: string;
}

export function Breadcrumbs({ currentTitle }: BreadcrumbsProps) {
  return (
    <nav aria-label="Migas de pan" className="flex items-center space-x-1 text-xs text-muted-foreground">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-primary transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Inicio</span>
      </Link>
      <ChevronRight className="w-3 h-3 text-muted-foreground/60" />
      <Link
        href="/blog"
        className={`hover:text-primary transition-colors ${!currentTitle ? "text-foreground font-semibold" : ""}`}
      >
        Blog
      </Link>
      {currentTitle && (
        <>
          <ChevronRight className="w-3 h-3 text-muted-foreground/60" />
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-[320px]">
            {currentTitle}
          </span>
        </>
      )}
    </nav>
  );
}
