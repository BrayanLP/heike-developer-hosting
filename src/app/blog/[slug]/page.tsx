import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Tag, BookOpen, Zap, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado | PROISO Tech & Software Solutions",
    };
  }

  const postUrl = `https://proiso.pe/blog/${post.slug}`;

  return {
    title: `${post.title} | PROISO Tech & Software Solutions`,
    description: post.excerpt,
    keywords: [
      ...post.categories,
      ...post.tags,
      "PROISO Tech & Software Solutions",
      "Hosting NVMe",
      "Hosting Perú",
    ],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      locale: "es_PE",
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      siteName: "PROISO Tech & Software Solutions",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aMatches = a.categories.some((c) => post.categories.includes(c)) ? 1 : 0;
      const bMatches = b.categories.some((c) => post.categories.includes(c)) ? 1 : 0;
      return bMatches - aMatches;
    })
    .slice(0, 3);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const postUrl = `https://proiso.pe/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://proiso.pe/#website",
          "name": "PROISO Tech & Software Solutions",
          "url": "https://proiso.pe"
        },
        "headline": post.title,
        "description": post.excerpt,
        "url": postUrl,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": postUrl
        },
        "datePublished": post.date,
        "dateModified": post.modified || post.date,
        "author": {
          "@type": "Organization",
          "name": post.author || "PROISO Tech & Software Solutions",
          "url": "https://proiso.pe"
        },
        "publisher": {
          "@type": "Organization",
          "name": "PROISO Tech & Software Solutions",
          "url": "https://proiso.pe",
          "logo": {
            "@type": "ImageObject",
            "url": "https://proiso.pe/logo.png"
          }
        },
        "image": post.coverImage ? [post.coverImage] : [],
        "articleSection": post.categories,
        "keywords": post.tags.join(", ")
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://proiso.pe"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://proiso.pe/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": postUrl
          }
        ]
      }
    ]
  };

  const whatsappMessage = encodeURIComponent(
    `Hola PROISO Tech & Software Solutions, leí su artículo "${post.title}" y deseo consultar sobre sus planes de hosting NVMe.`
  );

  return (
    <div className="flex min-h-screen flex-col font-body">
      <Header />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 py-8 md:py-14 bg-background">
        <article className="container mx-auto px-4 max-w-4xl space-y-8">
          {/* Top Bar Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors group font-medium"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Volver a todos los artículos
            </Link>
            <Breadcrumbs currentTitle={post.title} />
          </div>

          {/* Header Info */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground border-y border-border py-3">
              <div className="flex items-center gap-1.5 text-foreground font-medium">
                <User className="w-4 h-4 text-primary" />
                <span>{post.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </header>

          {/* Featured Cover Image */}
          {post.coverImage && (
            <div className="aspect-[16/9] relative rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-xl bg-muted/40">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {/* Lead / Excerpt */}
          {post.excerpt && (
            <div className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal bg-card p-5 sm:p-6 rounded-2xl border-l-4 border-primary shadow-sm">
              {post.excerpt}
            </div>
          )}

          {/* Table of Contents */}
          {post.toc && post.toc.length > 1 && (
            <TableOfContents items={post.toc} />
          )}

          {/* Main Article Content */}
          <div
            className="blog-prose space-y-5 text-foreground/90 leading-relaxed text-sm sm:text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="pt-6 border-t border-border space-y-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Tecnologías y Temas Relacionados
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs bg-muted/80 hover:bg-muted text-muted-foreground px-3 py-1 rounded-lg border border-border transition-colors font-medium"
                  >
                    <Tag className="w-3 h-3 text-primary/80" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Share Bar */}
          <div className="p-4 sm:p-6 bg-card rounded-2xl border border-border shadow-sm">
            <ShareButtons title={post.title} url={postUrl} />
          </div>

          {/* High Conversion CTA Box */}
          <div className="relative overflow-hidden rounded-3xl bg-zinc-950 text-white p-6 sm:p-8 border border-zinc-800 shadow-2xl">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-primary" />
                  Hosting Anual de Alta Velocidad
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  ¿Listo para potenciar tus aplicaciones con discos NVMe?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Servidores optimizados para NodeJS, Python y WordPress con LiteSpeed. Planes anuales desde S/ 60/año con SSL gratis y soporte directo 24/7 en Perú.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <Button
                  asChild
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold h-11 px-5 rounded-xl shadow-lg gap-2 text-xs sm:text-sm"
                >
                  <a
                    href={`https://wa.me/51924081817?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Consultar por WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-white font-bold h-11 px-5 rounded-xl text-xs sm:text-sm"
                >
                  <Link href="/#planes">Ver Planes</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="pt-10 border-t border-border space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Artículos Recomendados
                </h3>
                <Link
                  href="/blog"
                  className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  Ver todos <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${encodeURIComponent(rel.slug)}`}
                    className="group block"
                  >
                    <Card className="h-full border border-border bg-card/80 hover:bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col justify-between rounded-2xl shadow-sm hover:shadow-lg">
                      <div className="aspect-[16/9] relative bg-muted/40 overflow-hidden">
                        {rel.coverImage ? (
                          <Image
                            src={rel.coverImage}
                            alt={rel.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-card to-background text-muted-foreground">
                            <BookOpen className="w-8 h-8 opacity-30 text-primary" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4 space-y-2">
                        <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block">
                          {rel.categories[0] || "Hosting"}
                        </span>
                        <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
