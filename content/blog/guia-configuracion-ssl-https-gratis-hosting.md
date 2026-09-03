---
title: "Guía de Configuración de Certificados SSL HTTPS Gratis y Renovación Automática"
slug: "guia-configuracion-ssl-https-gratis-hosting"
date: "2026-08-27"
excerpt: "Aprende a instalar certificados de seguridad SSL gratuitos en cPanel y DirectAdmin, forzar HTTPS mediante .htaccess y solucionar problemas de contenido mixto."
coverImage: "/images/blog/guia-configuracion-ssl-https-gratis-hosting.svg"
categories:
  - "Seguridad"
  - "Hosting"
  - "DevOps"
tags:
  - "ssl gratis"
  - "https"
  - "lets encrypt"
  - "autossl"
  - "seguridad web"
author: "PROISO Tech & Software Solutions"
readingTime: "5 min de lectura"
---

> Contar con un certificado SSL y navegar a través de **HTTPS** no solo es indispensable para proteger las contraseñas y datos bancarios de tus usuarios, sino que es un factor de clasificación obligatorio en Google y los navegadores modernos.

![Portada](/images/blog/guia-configuracion-ssl-https-gratis-hosting.svg)

## 1. ¿Por qué el certificado SSL es obligatorio en 2026?

Cuando un sitio web no tiene SSL activo:
- Google Chrome y Safari muestran la advertencia roja de **"Sitio No Seguro"**, espantando al 80% de los visitantes.
- El algoritmo de Google degrada el posicionamiento en los resultados de búsqueda.
- La información viaja en texto plano y puede ser interceptada en redes Wi-Fi públicas.

En **PROISO Tech & Software Solutions**, todos los dominios y subdominios incluyen **certificados SSL gratuitos e ilimitados de por vida** a través de AutoSSL y Let's Encrypt.

---

## 2. Emisión Automática de SSL en cPanel y DirectAdmin

### En cPanel con AutoSSL:
1. Una vez que tu dominio apunta a los DNS de tu cuenta de hosting, el servicio **AutoSSL** se ejecuta automáticamente en segundo plano.
2. Si deseas forzar la emisión inmediata:
   - Ve a la sección **Seguridad > Estado de SSL/TLS** en cPanel.
   - Selecciona los dominios deseados y presiona **Ejecutar AutoSSL**.
   - En menos de 2 minutos, el candado verde estará activo.

### En DirectAdmin con Let's Encrypt:
1. Dirígete a **Gestión de Cuentas > Certificados SSL**.
2. Selecciona la opción **Obtener un certificado automático de Let's Encrypt**.
3. Marca las casillas de tu dominio principal, `www` y `mail`.
4. Haz clic en **Guardar**.

---

## 3. Cómo Forzar la Redirección a HTTPS vía `.htaccess`

Para asegurar que cualquier usuario que escriba `http://tudominio.com` sea redirigido de inmediato a `https://tudominio.com`, agrega estas líneas al inicio de tu archivo `.htaccess` en `public_html`:

```apache
# Forzar HTTPS en todo el sitio web
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Cabeceras de Seguridad Recomendadas (HSTS):
Para una seguridad bancaria óptima, agrega también la cabecera HSTS:

```apache
# Habilitar HSTS (HTTP Strict Transport Security)
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>
```

---

## 4. Solución al Error de "Contenido Mixto" (Mixed Content)

Si tu sitio muestra advertencias de candado amarillo o roto, se debe a que algunos recursos (imágenes, scripts o fuentes) siguen cargándose mediante enlaces `http://`.

### Solución en WordPress:
1. Ve a **Ajustes > Generales** y verifica que tanto la *Dirección de WordPress* como la *Dirección del sitio* comiencen con `https://`.
2. Utiliza el plugin **Better Search Replace** para reemplazar todas las instancias de `http://tudominio.com` por `https://tudominio.com` en tu base de datos.

### Solución en Aplicaciones Web (HTML / Next.js):
Asegúrate de usar URLs relativas (`/images/logo.png`) o enlaces seguros con `https://` en tus etiquetas `<img>` y `<script>`.

---

## 5. Conclusión

Proteger la identidad digital de tu proyecto es rápido, seguro y totalmente gratuito con la infraestructura automatizada de **PROISO Tech & Software Solutions**.
