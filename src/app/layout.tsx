import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://brenda.dev'),
  title: {
    default: 'Brenda Developer Hosting | Hosting NVMe Ultrarrápido en Perú',
    template: '%s | Brenda Developer Hosting',
  },
  description:
    'Hosting anual de alto rendimiento para desarrolladores en Perú. Servidores con tecnología NVMe SSD, NodeJS, Python, PHP 8.x, LiteSpeed, SSL Gratis y soporte 24/7. ¡Desde S/ 60 al año!',
  keywords: [
    'hosting peru',
    'hosting anual',
    'hosting para desarrolladores',
    'hosting nodejs peru',
    'hosting python peru',
    'hosting nvme',
    'litespeed hosting',
    'cpanel hosting peru',
    'directadmin hosting',
    'hosting barato peru',
    'brenda developer hosting',
    'hosting rapido peru',
  ],
  authors: [{ name: 'Brenda Developer Hosting', url: 'https://brenda.dev' }],
  creator: 'Brenda Developer Hosting',
  publisher: 'Brenda Developer Hosting',
  alternates: {
    canonical: 'https://brenda.dev',
    languages: {
      'es-PE': 'https://brenda.dev',
      'es': 'https://brenda.dev',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://brenda.dev',
    title: 'Brenda Developer Hosting | Hosting NVMe Ultrarrápido en Perú',
    description:
      'Potencia tus proyectos y aplicaciones web con almacenamiento NVMe de última generación, LiteSpeed, NodeJS, Python y soporte 24/7.',
    siteName: 'Brenda Developer Hosting',
    images: [
      {
        url: 'https://brenda.dev/logo.png',
        width: 1200,
        height: 630,
        alt: 'Brenda Developer Hosting - Servidores NVMe y Hosting Anual en Perú',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brenda Developer Hosting | Hosting NVMe en Perú',
    description:
      'Servidores ultrarrápidos con almacenamiento NVMe para desarrolladores y empresas en Perú.',
    images: ['https://brenda.dev/logo.png'],
  },
  other: {
    'geo.region': 'PE-CAL',
    'geo.placename': 'Callao, Lima, Perú',
    'geo.position': '-12.056598;-77.118146',
    ICBM: '-12.056598, -77.118146',
    'DC.title': 'Brenda Developer Hosting | Hosting NVMe en Perú',
    'geo.country': 'PE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {/* Microsoft Clarity Analytics */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "yaalzbdfsg");
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
