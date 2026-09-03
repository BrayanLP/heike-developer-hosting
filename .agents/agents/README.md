# Ecosistema de Agentes Especializados - Heike Developer Hosting

Este directorio contiene las definiciones, stacks tecnológicos, responsabilidades y mejores prácticas de los agentes diseñados para operar, desarrollar y hacer crecer la plataforma **Heike Developer Hosting** (Hosting NVMe de alto rendimiento en Perú con LiteSpeed, soporte en Soles y activación por WhatsApp).

---

## 🏛️ Directorio de Agentes

| Agente | Nombre de Invocación | Especialidad Principal | Stack / Herramientas Clave |
| :--- | :--- | :--- | :--- |
| **Copy & SEO Marketer** | `copy_heike_hosting` | Redacción SEO Local Perú (24 regiones), comparativas y framework SEE-THINK-DO-CARE | Frontmatter YAML, `copy_validator.py`, SVG vector covers |
| **Hosting Infrastructure Architect** | `hosting_infrastructure_architect` | Servidores web, cPanel/WHM, LiteSpeed, CloudLinux, DNS y seguridad | LiteSpeed Enterprise, LSCache, NVMe PCIe 4.0, cPanel, Passenger, SPF/DKIM/DMARC |
| **Frontend UI Designer** | `frontend_ui_designer` | Interfaces de usuario, tablas comparativas, planes de precios y checkout | Next.js, React, Radix UI, Tailwind CSS, Lucide Icons |
| **Genkit AI Consultant** | `genkit_ai_consultant` | Asistente inteligente de recomendación de planes y búsqueda semántica de dominios | `@genkit-ai/google-genai`, Genkit Flows, Google Gemini API |
| **Conversion & Sales Strategist** | `conversion_sales_strategist` | Embudos comerciales WhatsApp, pagos en Soles (Yape/Plin) y facturación SUNAT | WhatsApp Business (+51 924 081 817), Yape, Plin, SUNAT Facturación |

---

## 🚀 Cómo Invocar un Agente

Puedes invocar cualquiera de estos agentes mediante la herramienta `invoke_subagent`:

```json
{
  "Subagents": [
    {
      "TypeName": "copy_heike_hosting",
      "Role": "Copy & SEO Marketer",
      "Prompt": "Redactar un artículo de comparativa sobre Hosting NVMe en Arequipa enfocado en agencias de turismo y comercio local."
    }
  ]
}
```

---

## 🛡️ Estándares de Calidad y Buenas Prácticas del Proyecto
1. **Transparencia en Precios:** Precios claros en Soles peruanos (PEN), sin tarifas ocultas de renovación.
2. **Máximo Rendimiento:** Todos los contenidos y despliegues destacan almacenamiento 100% NVMe PCIe 4.0 y aceleración LiteSpeed con LSCache.
3. **SEO Local Perú:** Cobertura de las 24 regiones del Perú destacando las industrias clave de cada departamento.
4. **Atención Inmediata:** Canal de venta y soporte directo por WhatsApp (`+51 924 081 817`) con activación en menos de 10 minutos.
