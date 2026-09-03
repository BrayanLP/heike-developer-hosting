import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import PricingPlans from "@/components/sections/PricingPlans";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://brenda.dev/#hosting-service",
        name: "Heike Developer Hosting",
        url: "https://brenda.dev",
        telephone: "+51924081817",
        priceRange: "PEN S/ 60 - S/ 900",
        image: "https://brenda.dev/logo.png",
        description:
          "Servicio de hosting anual de alto rendimiento con discos NVMe SSD, LiteSpeed Web Server, CloudLinux y soporte para NodeJS, Python y PHP en Perú.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Callao",
          addressRegion: "Lima",
          addressCountry: "PE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -12.056598,
          longitude: -77.118146,
        },
        areaServed: [
          { "@type": "Country", name: "Peru" },
          { "@type": "AdministrativeArea", name: "Latinoamérica" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Planes de Hosting NVMe Anuales",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Plan Básico NVMe",
              price: "60.00",
              priceCurrency: "PEN",
              description: "5 GB NVMe SSD, 2 GB RAM, 2 Core CPU, SSL Gratis, Node.js y Python",
              url: "https://brenda.dev/#planes",
            },
            {
              "@type": "Offer",
              name: "Plan Intermedio NVMe",
              price: "90.00",
              priceCurrency: "PEN",
              description: "7 GB NVMe SSD, 2 GB RAM, 2 Core CPU, SSL Gratis, Node.js y Python",
              url: "https://brenda.dev/#planes",
            },
            {
              "@type": "Offer",
              name: "Plan Pro NVMe",
              price: "120.00",
              priceCurrency: "PEN",
              description: "10 GB NVMe SSD, 2 GB RAM, 2 Core CPU, LiteSpeed, SSL Gratis y soporte prioritario",
              url: "https://brenda.dev/#planes",
            },
            {
              "@type": "Offer",
              name: "Plan Plus NVMe",
              price: "180.00",
              priceCurrency: "PEN",
              description: "20 GB NVMe SSD, 2 GB RAM, 2 Core CPU, LiteSpeed, SSL Gratis",
              url: "https://brenda.dev/#planes",
            },
            {
              "@type": "Offer",
              name: "Plan Business NVMe",
              price: "300.00",
              priceCurrency: "PEN",
              description: "50 GB NVMe SSD, 2 GB RAM, 2 Core CPU, LiteSpeed, soporte empresarial",
              url: "https://brenda.dev/#planes",
            },
            {
              "@type": "Offer",
              name: "Plan Enterprise NVMe",
              price: "500.00",
              priceCurrency: "PEN",
              description: "100 GB NVMe SSD, 2 GB RAM, 2 Core CPU, LiteSpeed y recursos dedicados",
              url: "https://brenda.dev/#planes",
            },
            {
              "@type": "Offer",
              name: "Plan Ultra NVMe",
              price: "750.00",
              priceCurrency: "PEN",
              description: "150 GB NVMe SSD, 3 GB RAM, 3 Core CPU, LiteSpeed y máximo rendimiento",
              url: "https://brenda.dev/#planes",
            },
            {
              "@type": "Offer",
              name: "Plan Ultimate NVMe",
              price: "900.00",
              priceCurrency: "PEN",
              description: "200 GB NVMe SSD, 3 GB RAM, 3 Core CPU, LiteSpeed y capacidad premium",
              url: "https://brenda.dev/#planes",
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://brenda.dev/#website",
        url: "https://brenda.dev",
        name: "Heike Developer Hosting",
        description: "Hosting anual ultrarrápido con tecnología NVMe SSD en Perú",
        publisher: { "@id": "https://brenda.dev/#hosting-service" },
        inLanguage: "es-PE",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cómo funciona el hosting anual?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nuestros planes de hosting se pagan una vez al año. Esto te permite ahorrar significativamente comparado con el pago mensual y garantiza que tu sitio web esté activo durante 365 días sin interrupciones por pagos vencidos.",
            },
          },
          {
            "@type": "Question",
            name: "¿Incluye SSL gratis?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí, todos nuestros planes incluyen certificados SSL gratuitos de Let's Encrypt que se renuevan automáticamente. Esto garantiza que tu sitio web muestre el candado de seguridad HTTPS.",
            },
          },
          {
            "@type": "Question",
            name: "¿Puedo migrar mi página actual?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "¡Por supuesto! Ofrecemos migración gratuita para todos los clientes nuevos. Nuestro equipo técnico se encarga de mover tus archivos y bases de datos sin pérdida de información.",
            },
          },
          {
            "@type": "Question",
            name: "¿Puedo actualizar mi plan en el futuro?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí, puedes escalar tu plan en cualquier momento. Solo pagas la diferencia proporcional del tiempo restante de tu contrato anual.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué ventajas ofrece el almacenamiento NVMe SSD en comparación con SSD tradicionales?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Los discos NVMe ofrecen velocidades de lectura y escritura hasta 6 veces más rápidas que los SSD SATA tradicionales, reduciendo drásticamente el TTFB y acelerando bases de datos y sitios con alto tráfico.",
            },
          },
          {
            "@type": "Question",
            name: "¿Incluye soporte para aplicaciones en NodeJS y Python?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí, todos los planes de Heike Developer Hosting incluyen selector de versiones de NodeJS, Python, Ruby y PHP con entorno aislado CloudLinux.",
            },
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
      <main className="flex-1">
        <Hero />
        <Benefits />
        <PricingPlans />
        <WhyChooseUs />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
