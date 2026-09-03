import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BlogList } from "@/components/blog/BlogList";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog & Guías Técnicas de Hosting NVMe, Servidores y Web | PROISO Tech & Software Solutions",
  description:
    "Aprende a desplegar NodeJS, Python y WordPress con LiteSpeed en servidores NVMe de alto rendimiento. Guías prácticas de DevOps, optimización web y seguridad en Perú.",
  keywords: [
    "Blog Hosting Perú",
    "Tutoriales NodeJS Hosting",
    "WordPress LiteSpeed Cache",
    "Hosting NVMe Perú",
    "DirectAdmin cPanel tutoriales",
    "PROISO Tech & Software Solutions",
  ],
  alternates: {
    canonical: "https://proiso.pe/blog",
  },
  openGraph: {
    title: "Blog & Guías de Servidores y Hosting NVMe | PROISO Tech & Software Solutions",
    description:
      "Tutoriales técnicos para desarrolladores: despliegue de NodeJS, Python, aceleración WordPress y servidores de alta velocidad.",
    url: "https://proiso.pe/blog",
    type: "website",
    locale: "es_PE",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://proiso.pe/blog#page",
        url: "https://proiso.pe/blog",
        name: "Blog & Guías Técnicas de Hosting NVMe y Servidores | PROISO Tech & Software Solutions",
        description:
          "Tutoriales y guías paso a paso para desarrolladores: NodeJS, Python, WordPress con LiteSpeed y servidores NVMe de alto rendimiento en Perú.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://proiso.pe/#website",
          name: "PROISO Tech & Software Solutions",
          url: "https://proiso.pe",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://proiso.pe/blog#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://proiso.pe",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://proiso.pe/blog",
          },
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col font-body">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 py-8 md:py-14 bg-background">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Header Section */}
          <div className="space-y-4 max-w-3xl">
            <Badge
              variant="outline"
              className="py-0.5 px-3 border-primary/20 bg-primary/5 text-primary text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full"
            >
              Recursos & Guías para Desarrolladores
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Blog de Infraestructura & <br className="hidden sm:block" />
              <span className="text-primary italic">Hosting de Alto Rendimiento</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Descubre tutoriales paso a paso, optimizaciones de velocidad con LiteSpeed y NVMe, despliegue de frameworks y mejores prácticas de seguridad para tus aplicaciones.
            </p>
          </div>

          {/* Interactive Blog List */}
          <BlogList initialPosts={posts} categories={categories} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
