---
title: "Configuración de Correos Corporativos Profesionales con SPF, DKIM y DMARC"
slug: "configuracion-correos-corporativos-spf-dkim-dmarc"
date: "2026-08-29"
excerpt: "Evita que tus correos de empresa terminen en la carpeta de Spam: guía práctica para configurar los registros DNS de autenticación SPF, llaves DKIM y políticas DMARC."
coverImage: "/images/blog/configuracion-correos-corporativos-spf-dkim-dmarc.svg"
categories:
  - "Seguridad"
  - "Hosting"
  - "DevOps"
tags:
  - "correo corporativo"
  - "spf"
  - "dkim"
  - "dmarc"
  - "email marketing"
author: "Heike Developer Hosting"
readingTime: "5 min de lectura"
---

> En 2024 y 2026, gigantes como Google (Gmail), Microsoft (Outlook) y Yahoo implementaron políticas estrictas: cualquier dominio que envíe correos sin registros **SPF, DKIM y DMARC válidos** es bloqueado o enviado directamente a la carpeta de **Correo no deseado (Spam)**.

![Portada](/images/blog/configuracion-correos-corporativos-spf-dkim-dmarc.svg)

## 1. Los 3 Pilares de la Entregabilidad de Correo

Para que los servidores receptores confíen en tus correos (`contacto@tuempresa.com`), deben verificar tres mecanismos de autenticación en los registros DNS de tu dominio:

```text
  1. SPF   ───> "¿Tiene permiso este servidor IP para enviar correos de mi dominio?"
  2. DKIM  ───> "¿El correo fue firmado digitalmente y no fue alterado en tránsito?"
  3. DMARC ───> "¿Qué debe hacer Gmail si el SPF o DKIM fallan? (Monitorear o Rechazar)"
```

---

## 2. Configuración de SPF (Sender Policy Framework)

El registro SPF es un registro DNS de tipo **TXT** en la raíz de tu dominio (`@`).

### Formato recomendado para clientes de Heike Hosting:
```text
Tipo: TXT
Nombre: @
Valor: v=spf1 +a +mx include:_spf.brayan.pe ~all
```

- `+a`: Autoriza a la dirección IP de tu sitio web.
- `+mx`: Autoriza a los servidores de correo designados en tus registros MX.
- `~all` (SoftFail): Indica a los servidores receptores que acepten correos de estos servidores y marquen con precaución cualquier otro origen no declarado.

---

## 3. Configuración de DKIM (DomainKeys Identified Mail)

DKIM firma cada correo saliente con una clave criptográfica privada. El servidor receptor consulta la clave pública en tu DNS para verificar la autenticidad.

### En cPanel:
1. Dirígete a **Correo Electrónico > Email Deliverability**.
2. Ubica tu dominio y haz clic en **Manage**.
3. En la sección **DKIM**, haz clic en **Enable / Install**.
4. cPanel creará automáticamente el registro DNS `default._domainkey.tudominio.com` con tu clave pública RSA.

---

## 4. Configuración de DMARC (Domain-based Message Authentication)

DMARC establece una política clara sobre cómo actuar ante correos falsificados (phishing o spoofing) que intenten suplantar tu identidad.

### Registro DMARC Inicial (Modo Monitoreo):
```text
Tipo: TXT
Nombre: _dmarc
Valor: v=DMARC1; p=none; sp=none; rua=mailto:seguridad@tudominio.com
```

### Registro DMARC Estricto (Protección Total):
Una vez verificado que todos tus correos legítimos pasan SPF y DKIM:
```text
Tipo: TXT
Nombre: _dmarc
Valor: v=DMARC1; p=quarantine; pct=100; rua=mailto:seguridad@tudominio.com
```

---

## 5. Herramientas de Verificación de Entregabilidad

Antes de enviar cotizaciones o campañas comerciales, prueba tu puntuación de reputación con estas herramientas gratuitas:
1. **Mail-Tester.com:** Envía un correo de prueba a la dirección que te asignan y obtén una calificación de 10/10.
2. **MXToolbox SuperTool:** Verifica la sintaxis exacta de tus registros SPF y DMARC en segundos.

---

## 6. Conclusión

Configurar adecuadamente los registros de correo electrónico garantiza que tus comunicaciones comerciales lleguen siempre a la **Bandeja de Entrada principal** de tus clientes.

En **Heike Developer Hosting**, configuramos automáticamente estos registros en tu zona DNS desde el primer día para que tu empresa proyecte la máxima seriedad y profesionalismo.
