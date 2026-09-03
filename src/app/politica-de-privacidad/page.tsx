import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad | Brenda Developer Hosting",
  description:
    "Conoce cómo Brenda Developer Hosting protege y gestiona tus datos personales y privacidad con total transparencia y seguridad.",
  alternates: {
    canonical: "https://brenda.dev/politica-de-privacidad",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col font-body">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
        
        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            En <strong>Brenda Developer Hosting</strong>, valoramos su privacidad y estamos comprometidos con la protección de sus datos personales. Esta política describe cómo recopilamos, utilizamos y protegemos su información.
          </p>

          <h2 className="text-xl font-bold text-foreground">1. Información que recopilamos</h2>
          <p>
            Recopilamos información que usted nos proporciona directamente al solicitar una cotización o contratar un servicio a través de nuestro formulario de contacto o WhatsApp (Nombre, correo electrónico y plan de interés).
          </p>

          <h2 className="text-xl font-bold text-foreground">2. Uso de la información</h2>
          <p>
            Utilizamos su información únicamente para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Procesar sus solicitudes de servicio.</li>
            <li>Brindarle soporte técnico y atención al cliente.</li>
            <li>Enviarle información relevante sobre su cuenta o actualizaciones de servicio.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground">3. Protección de datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas para proteger sus datos personales contra el acceso no autorizado o la alteración. No compartimos sus datos con terceros bajo ninguna circunstancia, excepto por requerimientos legales.
          </p>

          <h2 className="text-xl font-bold text-foreground">4. Sus derechos</h2>
          <p>
            Usted tiene derecho a acceder, rectificar o solicitar la eliminación de sus datos personales de nuestra base de datos enviando un correo a <strong>hosting@brenda.dev</strong>.
          </p>

          <h2 className="text-xl font-bold text-foreground">5. Cambios en esta política</h2>
          <p>
            Nos reservamos el derecho de actualizar esta política en cualquier momento. Los cambios serán publicados en esta misma sección.
          </p>
          
          <p className="pt-4 text-sm">Última actualización: Mayo 2024.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
