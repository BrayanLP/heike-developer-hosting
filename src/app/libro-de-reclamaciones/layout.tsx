import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones Virtual | PROISO Tech & Software Solutions",
  description:
    "Libro de Reclamaciones Virtual de PROISO Tech & Software Solutions conforme al Código de Protección y Defensa del Consumidor de Perú.",
  alternates: {
    canonical: "https://proiso.pe/libro-de-reclamaciones",
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
