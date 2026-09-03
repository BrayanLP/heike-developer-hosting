import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones Virtual | Brenda Developer Hosting",
  description:
    "Libro de Reclamaciones Virtual de Brenda Developer Hosting conforme al Código de Protección y Defensa del Consumidor de Perú.",
  alternates: {
    canonical: "https://brenda.dev/libro-de-reclamaciones",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ComplaintsBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
