---
title: Cómo Instalar y Configurar Certificados SSL Wildcard Gratuitos con AutoSSL
  en cPanel
slug: como-configurar-certificados-ssl-wildcard-gratis-cpanel
date: '2026-09-03'
excerpt: Tutorial para habilitar certificados SSL HTTPS gratuitos e ilimitados para
  tu dominio principal y todos sus subdominios con AutoSSL en cPanel.
coverImage: /images/blog/como-configurar-certificados-ssl-wildcard-gratis-cpanel.svg
categories:
- Seguridad
- cPanel
- Tutoriales
tags:
- ssl wildcard gratis cpanel
- autossl let encrypt peru
- https gratis hosting
- configurar certificado ssl
- brenda developer hosting
author: Brenda Developer Hosting
readingTime: 7 min de lectura
intentStage: CARE
targetKeyword: configurar ssl wildcard gratis cpanel
---

> Mantener un sitio web seguro con el candado verde HTTPS es indispensable no solo para proteger los datos de tus usuarios, sino para evitar advertencias de *'Sitio no seguro'* en Google Chrome y caídas en el posicionamiento SEO. **En los servidores de Brenda Developer Hosting, el protocolo AutoSSL instala y renueva automáticamente certificados SSL de por vida sin costo extra.**

![Configurar Certificados SSL en cPanel](/images/blog/como-configurar-certificados-ssl-wildcard-gratis-cpanel.svg)

En esta guía técnica aprenderás cómo forzar HTTPS y verificar la correcta instalación de certificados SSL en tu dominio y subdominios.

---

## 1. ¿Qué es un Certificado SSL Wildcard?

Un certificado SSL convencional protege únicamente un dominio específico (ej. `tudominio.pe` y `www.tudominio.pe`). Un certificado **Wildcard (`*.tudominio.pe`)** protege automáticamente:
- Tu dominio raíz (`tudominio.pe`).
- La tienda online (`tienda.tudominio.pe`).
- El portal de clientes o intranet (`clientes.tudominio.pe`).
- El servicio de correo web (`webmail.tudominio.pe`).
- Cualquier subdominio futuro sin necesidad de solicitar un nuevo certificado.

---

## 2. Activación en 1 Clic con AutoSSL en cPanel

En nuestra plataforma, el proceso es 100% automático:
1. Accede a tu cPanel.
2. En la sección **Seguridad**, haz clic en **Estado de SSL/TLS (SSL/TLS Status)**.
3. Selecciona tu dominio y haz clic en el botón azul **Ejecutar AutoSSL (Run AutoSSL)**.
4. El servidor se comunicará con la autoridad emisora (Let's Encrypt / Sectigo), validará los registros DNS y en menos de 3 minutos tu certificado estará activo.

---

## 3. Cómo Forzar la Redirección Automática a HTTPS

Una vez instalado el certificado, debes asegurarte de que ningún usuario acceda a la versión insegura `http://`:

### Opción A: Desde cPanel (Sin tocar código)
1. Ve a **Dominios** en cPanel.
2. Activa el interruptor **Force HTTPS Redirect** correspondiente a tu dominio.

### Opción B: Mediante archivo `.htaccess` en LiteSpeed
Agrega las siguientes líneas al inicio de tu archivo `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 4. Diagnóstico de Errores Comunes de Contenido Mixto (Mixed Content)

Si el candado de seguridad aparece con un triángulo amarillo, significa que tu sitio web carga imágenes o scripts mediante `http://` en lugar de `https://`:
* **En WordPress:** Usa el plugin gratuito *Really Simple SSL* o reemplaza las URLs absolutas con *Better Search Replace*.
* **En Aplicaciones a Medida:** Asegúrate de usar rutas relativas (`/images/logo.png`) o variables de entorno con `https://`.

---

## 5. Seguridad de Grado Bancario Incluida en tu Hosting

Olvídate de pagar suscripciones anuales de $50 o $100 dólares por certificados SSL que deberían ser un estándar gratuito.

**Aloja tus proyectos en [hosting.brayan.es](https://brenda.dev) y disfruta de SSL de alta seguridad y renovaciones automáticas garantizadas**.
