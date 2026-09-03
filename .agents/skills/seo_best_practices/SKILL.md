---
name: seo_best_practices
description: >-
  Guía integral y reglas de mejores prácticas de SEO (On-Page, Técnico, Local, Schema.org de Servicios/Hosting y GEO/LLMO)
  aplicadas en Brenda Developer Hosting. Úsalo al crear nuevas secciones, páginas de aterrizaje, redactar guías y artículos,
  configurar metadatos, estructurar datos JSON-LD de planes y optimizar la indexación para buscadores y motores de IA.
---

# Guía Maestra de SEO y GEO para Brenda Developer Hosting

Esta habilidad recopila **todas las directivas, patrones de código, arquitecturas y buenas prácticas de SEO y GEO (Generative Engine Optimization)** diseñadas para posicionar a **Brenda Developer Hosting** como la opción líder de hosting anual de alto rendimiento (NVMe, LiteSpeed, Node.js, Python, PHP 8.x) en Perú y Latinoamérica.

---

## 1. Arquitectura de Metadatos en Next.js (App Router)

Cada página (`page.tsx`) o layout (`layout.tsx`) debe implementar la API de Metadatos tipada de Next.js (`import type { Metadata } from 'next'`).

### 1.1 Configuración Base Global (`src/app/layout.tsx`)
- **`metadataBase`**: Siempre debe definirse en la raíz como `new URL("https://brenda.dev")` (o el dominio principal configurado).
- **`title` con plantilla**:
  ```typescript
  title: {
    default: "Brenda Developer Hosting | Hosting NVMe Ultrarrápido en Perú",
    template: "%s | Brenda Developer Hosting",
  }
  ```
- **`description`**: Longitud recomendada entre 140 y 160 caracteres. Debe comunicar de forma clara el almacenamiento NVMe, soporte multi-lenguaje (NodeJS, Python, PHP), SSL gratuito y precio anual accesible (desde S/ 60/año).
- **`keywords`**: Términos transaccionales e informativos de alto valor:
  ```typescript
  keywords: [
    "hosting peru",
    "hosting anual",
    "hosting para desarrolladores",
    "hosting nodejs peru",
    "hosting python peru",
    "hosting nvme",
    "litespeed hosting",
    "cpanel hosting peru",
    "directadmin hosting",
    "hosting barato peru",
    "brenda developer hosting"
  ]
  ```
- **`alternates`**:
  - `canonical`: URL canónica fija de la página (`https://brenda.dev`).
  - `languages`: Mapeo de idioma (`es-PE`, `es`).
- **`robots`**:
  ```typescript
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
  ```

### 1.2 Metadatos Sociales (Open Graph y Twitter Cards)
- **OpenGraph**:
  - `type`: `"website"` para la landing y páginas de planes, o `"article"` para guías del blog.
  - `locale`: `"es_PE"`.
  - `title`: `"Brenda Developer Hosting | Hosting NVMe de Alto Rendimiento en Perú"`.
  - `description`: `"Potencia tus proyectos y aplicaciones web con almacenamiento NVMe de última generación, LiteSpeed y soporte 24/7."`.
  - `siteName`: `"Brenda Developer Hosting"`.
  - `images`: Array con imagen optimizada de portada (1200x630 o 800x600 px) y texto `alt` representativo.
- **Twitter Card**:
  - `card`: `"summary_large_image"`.
  - `title`: `"Brenda Developer Hosting | Hosting NVMe en Perú"`.
  - `description`: `"Servidores ultrarrápidos para desarrolladores y empresas peruanas."`.

### 1.3 SEO Local y Geo-Tags
Para maximizar la relevancia en búsquedas geolocalizadas en Perú:
```typescript
other: {
  "geo.region": "PE-CAL",
  "geo.placename": "Callao, Lima, Perú",
  "geo.position": "-12.056598;-77.118146",
  ICBM: "-12.056598, -77.118146",
  "DC.title": "Brenda Developer Hosting | Hosting NVMe en Perú",
  "geo.country": "PE",
}
```

---

## 2. Datos Estructurados (Schema.org / JSON-LD)

Implementar marcado semántico mediante `<script type="application/ld+json">` utilizando el patrón `@graph` para interconectar entidades de negocio, servicios, planes y preguntas frecuentes.

### 2.1 Esquema de la Entidad Principal (`ProfessionalService` / `LocalBusiness` / `HostingProvider`)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://brenda.dev/#hosting-service",
      "name": "Brenda Developer Hosting",
      "url": "https://brenda.dev",
      "telephone": "+51924081817",
      "priceRange": "PEN S/ 60 - S/ 900",
      "image": "https://brenda.dev/logo.png",
      "description": "Servicio de hosting anual de alto rendimiento con discos NVMe SSD, LiteSpeed Web Server, CloudLinux y soporte para NodeJS, Python y PHP en Perú.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Callao",
        "addressRegion": "Lima",
        "addressCountry": "PE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -12.056598,
        "longitude": -77.118146
      },
      "areaServed": [
        { "@type": "Country", "name": "Peru" },
        { "@type": "AdministrativeArea", "name": "Latinoamérica" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Planes de Hosting NVMe Anuales",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Plan Básico NVMe",
            "price": "60.00",
            "priceCurrency": "PEN",
            "description": "5 GB NVMe SSD, 2 GB RAM, 2 Core CPU, SSL Gratis, Node.js y Python"
          },
          {
            "@type": "Offer",
            "name": "Plan Pro NVMe",
            "price": "120.00",
            "priceCurrency": "PEN",
            "description": "10 GB NVMe SSD, 2 GB RAM, 2 Core CPU, LiteSpeed, SSL Gratis y soporte prioritario"
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://brenda.dev/#website",
      "url": "https://brenda.dev",
      "name": "Brenda Developer Hosting",
      "publisher": { "@id": "https://brenda.dev/#hosting-service" }
    }
  ]
}
```

### 2.2 Esquema para Preguntas Frecuentes (`FAQPage`)
Para lograr fragmentos enriquecidos (Rich Snippets) en los resultados de búsqueda de Google:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué ventajas ofrece el almacenamiento NVMe SSD en comparación con SSD tradicionales?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los discos NVMe ofrecen velocidades de lectura y escritura hasta 6 veces más rápidas que los SSD SATA tradicionales, reduciendo drásticamente el TTFB y acelerando bases de datos y sitios con alto tráfico."
      }
    },
    {
      "@type": "Question",
      "name": "¿Incluye soporte para aplicaciones en NodeJS y Python?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, todos los planes de Brenda Developer Hosting incluyen selector de versiones de NodeJS, Python, Ruby y PHP con entorno aislado CloudLinux."
      }
    }
  ]
}
```

### 2.3 Esquema para Artículos y Guías Técnicas (`BlogPosting` & `BreadcrumbList`)
- **`BlogPosting`**: Incluye `headline`, `description`, `image`, `datePublished`, `dateModified`, `author` (`Brenda Developer Hosting`), `publisher` y `mainEntityOfPage`.
- **`BreadcrumbList`**: Estructura jerárquica: `Inicio` (1) &rarr; `Blog / Guías` (2) &rarr; `Título de la Guía` (3).

---

## 3. Rastreo, Indexación y Control de Bots (`robots.ts` & `sitemap.ts`)

### 3.1 Directivas de Rastreo (`src/app/robots.ts`)
- **Directivas para Motores de Búsqueda Generales (`*`)**:
  - `allow: '/'`
  - `disallow`: Excluir rutas legales o sin intención de búsqueda (`/libro-de-reclamaciones`, `/politica-de-privacidad*`, `/terminos-y-condiciones*`).
  - Bloquear rastreo de URLs spam o endpoints obsoletos (`/wp-admin/*`, `/wp-json/*`, `*/feed`, `/*?page*`).
- **Directivas para Bots de IA y Motores Generativos (GEO)**:
  - Agentes: `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-Web`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `cohere-ai`.
  - Permitir explícitamente acceso a: `/`, `/planes`, `/caracteristicas`, `/blog`, `/llms.txt`, `/llms-full.txt`.
- **Referencia del Sitemap**: `https://brenda.dev/sitemap.xml`.

### 3.2 Generación Estática de Sitemap (`src/app/sitemap.ts`)
- Configurado con exportación estática (`export const dynamic = 'force-static'`).
- Jerarquía de prioridades:
  - Home / Planes (`/`): `1.0` (frecuencia: `weekly`).
  - Blog / Guías (`/blog`): `0.9` (frecuencia: `daily`).
  - Artículos individuales (`/blog/[slug]`): `0.8` (frecuencia: `monthly`).
  - Páginas de servicios específicos: `0.8` (frecuencia: `monthly`).

---

## 4. GEO (Generative Engine Optimization) y LLM Readiness

Para posicionar a Brenda Developer Hosting en recomendaciones y respuestas de asistentes inteligentes (ChatGPT, Perplexity, Claude, Gemini, Copilot):

### 4.1 Archivos `llms.txt` y `llms-full.txt` (`public/`)
- Ubicación: `/public/llms.txt` y `/public/llms-full.txt`.
- Estructura obligatoria:
  1. **Resumen Ejecutivo:** Presentación de Brenda Developer Hosting, foco en tecnología NVMe, LiteSpeed, soporte de NodeJS/Python/PHP y precios anuales competitivos en Perú.
  2. **Tabla de Planes y Precios:** Resumen claro de planes (Básico S/ 60, Intermedio S/ 90, Pro S/ 120, etc.) con recursos asignados (RAM, CPU, NVMe).
  3. **Stack Tecnológico y Características:** LiteSpeed, CloudLinux, cPanel/DirectAdmin, SSL gratuito, 99.9% Uptime.
  4. **Canales de Atención:** WhatsApp directo (+51 924 081 817) y soporte 24/7.
  5. **Índice de Guías Técnicas:** Enlaces a tutoriales sobre despliegue de Node.js, optimización de WordPress y configuración de DNS.

---

## 5. On-Page SEO y Experiencia de Usuario (UX)

### 5.1 Estructura Semántica del DOM
- **`<h1>` Único:** Cada página debe tener solo un `<h1>` conteniendo las palabras clave principales del servicio (ej. *"Hosting NVMe de Alto Rendimiento en Perú"*).
- **Subtítulos Semánticos:** Usar `<h2>` para secciones principales (Planes, Características, Beneficios, FAQ) y `<h3>` para nombres de planes o ítems específicos.
- **Micro-interacciones y Enlaces de Ancla:** IDs descriptivos en cada sección (`#planes`, `#caracteristicas`, `#beneficios`, `#faq`) para facilitar el salto rápido y la generación de enlaces de sitio en Google.

### 5.2 Optimización de Imágenes y Web Performance (Core Web Vitals)
- Uso del componente `<Image>` de Next.js con formatos modernos (WebP / AVIF).
- Atributos `alt` obligatorios y descriptivos con palabras clave naturales (ej. `alt="Servidores NVMe de alta velocidad para NodeJS y WordPress"`).
- Atributo `priority` en imágenes above-the-fold (Hero/Logo) para maximizar la métrica **LCP (Largest Contentful Paint)**.
- Dimensiones explícitas para evitar **CLS (Cumulative Layout Shift)**.

### 5.3 Optimización de Conversión (CRO)
- Botones de llamada a la acción (CTA) claros hacia WhatsApp (`wa.me/51924081817`) con mensajes predefinidos según el plan seleccionado.
- Selector de moneda dinámico (PEN / USD) accesible sin recargar la página.

### 5.4 Estrategia de Contenidos por Intención de Búsqueda (SEE - THINK - DO - CARE)
Agrupar y redactar artículos, guías y landing pages según el público objetivo y la etapa del usuario:
- **SEE (Descubrimiento / TOFU):** Audiencia amplia que busca conceptos, aprendizaje y diagnóstico (`¿Qué es hosting NVMe?`, `Diferencias entre Apache y LiteSpeed`). *Enfoque pedagógico, tono divulgativo y CTA suave.*
- **THINK (Consideración / MOFU):** Audiencia evaluando alternativas, especificaciones y proveedores (`Mejor hosting en Arequipa`, `GoDaddy vs Brenda Hosting`). *Enfoque comparativo, tablas directas de ventajas y CTA de cotización.*
- **DO (Conversión / BOFU):** Audiencia lista para comprar por primera vez (`Comprar hosting Perú Soles Yape`, `Contratar hosting anual NVMe`). *Enfoque transaccional, planes claros, medios de pago en Soles y Hard CTA a WhatsApp.*
- **CARE (Fidelización / Post-Venta):** Audiencia activa que busca soporte avanzado, optimización y upgrades (`Configurar Node.js 22 cPanel`, `Optimizar LiteSpeed WooCommerce`, `Registros SPF/DKIM`). *Tutoriales técnicos paso a paso con código y soporte 24/7.*

---

## 6. Checklist de Verificación SEO para Nuevas Páginas y Guías

Antes de desplegar una nueva página, sección o artículo en Brenda Developer Hosting, verificar:

- [ ] **Intención de Búsqueda Definida:** Clasificado correctamente en SEE, THINK, DO o CARE con tono y CTA coherentes.
- [ ] **Título Optimizado:** Contiene "Hosting", la tecnología específica y el ámbito geográfico (ej. "Perú").
- [ ] **Meta Descripción Atractiva:** Entre 140-160 caracteres con mención de NVMe, SSL gratis y precio o beneficio directo.
- [ ] **Canonical URL:** Definida correctamente en los metadatos.
- [ ] **Open Graph & Twitter Cards:** Configurados con imagen representativa 16:9.
- [ ] **H1 Único:** Estructurado correctamente en la jerarquía HTML.
- [ ] **Datos Estructurados (JSON-LD):** Esquema `ProfessionalService`, `OfferCatalog`, `FAQPage` o `BlogPosting` validado.
- [ ] **Imágenes Optimizadas:** Con `alt` descriptivo y formato de carga optimizado.
- [ ] **Sitemap y Robots:** Ruta accesible e incluida en `sitemap.ts` y no bloqueada por `robots.ts`.
- [ ] **Sincronización GEO/LLMs:** Si es una guía o servicio nuevo, actualizado en `public/llms.txt`.
- [ ] **Enlace a Planes / WhatsApp:** Enlace directo de conversión para contratar el plan correspondiente.

