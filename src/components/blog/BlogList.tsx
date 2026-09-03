"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/blog";

interface BlogListProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export function BlogList({ initialPosts, categories }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.categories.includes(selectedCategory);

      const matchesSearch =
        searchTerm.trim() === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchTerm]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8">
      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card/60 p-4 rounded-2xl border border-border">
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por tema, tecnología..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 text-xs sm:text-sm h-10 rounded-xl bg-background"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            Todos ({initialPosts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 px-4 bg-muted/20 rounded-3xl border border-dashed border-border space-y-3">
          <BookOpen className="h-10 w-10 text-muted-foreground/60 mx-auto" />
          <h3 className="text-lg font-bold text-foreground">No encontramos artículos</h3>
          <p className="text-xs md:text-sm text-muted-foreground max-w-sm mx-auto">
            Intenta buscando con otros términos como &quot;NodeJS&quot;, &quot;WordPress&quot;, &quot;NVMe&quot; o &quot;DirectAdmin&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="group block focus:outline-none"
            >
              <Card className="h-full border border-border bg-card/80 hover:bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl rounded-2xl">
                <div>
                  {/* Cover Image */}
                  <div className="aspect-[16/9] relative bg-muted/40 overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-card to-background text-muted-foreground">
                        <BookOpen className="w-10 h-10 opacity-30 text-primary" />
                      </div>
                    )}
                    {post.categories[0] && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-background/90 backdrop-blur-md text-foreground border border-border/80 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 shadow-sm">
                          {post.categories[0]}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>

                    <h2 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </div>

                {/* Footer Link & Tags */}
                <div className="px-5 pb-5 pt-2 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                    <Tag className="w-3 h-3 text-primary/80" />
                    <span className="truncate max-w-[140px]">{post.tags[0] || "Hosting"}</span>
                  </div>
                  <span className="text-xs font-bold text-primary inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Leer más <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
