# 🚀 Heike Developer Hosting

**Heike Developer Hosting** es una plataforma web moderna para servicios de alojamiento de alto rendimiento en Perú y Latinoamérica, optimizada con discos NVMe PCIe 4.0, servidores web LiteSpeed Enterprise, integración de pagos en Soles (Yape, Plin, BCP) y facturación electrónica SUNAT.

---

## 🌟 Características Principales

- **Arquitectura Web:** Next.js 15 (App Router, Turbopack, Tailwind CSS, Radix UI).
- **Almacenamiento Ultrarrápido:** Discos 100% NVMe PCIe 4.0 con velocidades de lectura superiores a 3,500 MB/s.
- **Servidor Web LiteSpeed:** Compatibilidad nativa con LSCache y HTTP/3 / QUIC.
- **Asistente de IA (Google Genkit):** Recomendador interactivo de planes de hosting adaptado a las necesidades de cada usuario.
- **Ecosistema de Contenidos & Blog:** 56 artículos técnicos y guías de SEO local para las 24 regiones del Perú.
- **Dominio Oficial:** [brenda.dev](https://brenda.dev)
- **Atención y Ventas:** WhatsApp directo [+51 924 081 817](https://wa.me/51924081817)

---

## 📦 Estructura del Proyecto

```text
heike-developer-hosting/
├── .agents/                    # Subagentes y skills especializados de desarrollo y copy
├── content/blog/               # Artículos del blog en Markdown optimizados para SEO
├── public/                     # Activos estáticos, imágenes de blog SVG y llms.txt
├── src/
│   ├── ai/                     # Flujos conversacionales con Google Genkit
│   ├── app/                    # Rutas y páginas de Next.js (App Router)
│   ├── components/             # Componentes de UI, secciones y módulos del blog
│   └── lib/                    # Utilidades y procesador de Markdown
└── package.json
```

---

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias (si es necesario)
npm install

# Iniciar servidor de desarrollo en puerto 9008
npm run dev

# Iniciar entorno de Genkit AI
npm run genkit:dev

# Compilar para producción
npm run build
```

---

## 🌿 Repositorio Oficial
- GitHub: [https://github.com/BrayanLP/heike-developer-hosting](https://github.com/BrayanLP/heike-developer-hosting)