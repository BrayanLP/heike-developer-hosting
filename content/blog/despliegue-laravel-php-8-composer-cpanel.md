---
title: "Despliegue de Aplicaciones Laravel con PHP 8.x y Composer en Hosting Compartido"
slug: "despliegue-laravel-php-8-composer-cpanel"
date: "2026-08-28"
excerpt: "Tutorial detallado para estructurar proyectos Laravel 11 y 12 en cPanel: configuración del directorio public, variables .env, Composer, OPcache y tareas Cron Jobs."
coverImage: "/images/blog/despliegue-laravel-php-8-composer-cpanel.svg"
categories:
  - "Desarrollo"
  - "Hosting"
  - "Servidores"
tags:
  - "laravel"
  - "php 8"
  - "composer"
  - "cpanel"
  - "desarrollo web"
author: "Heike Developer Hosting"
readingTime: "6 min de lectura"
---

> **Laravel** es el framework PHP más popular del mundo gracias a su elegante sintaxis y robusto ecosistema. Aunque muchos creen que solo puede desplegarse en servidores VPS, configurarlo en un **hosting compartido cPanel con PHP 8.x** es rápido, seguro y mucho más económico.

![Portada](/images/blog/despliegue-laravel-php-8-composer-cpanel.svg)

## 1. Arquitectura de Seguridad para Laravel en Hosting

El error más grave al subir Laravel a un hosting es volcar todo el proyecto directamente dentro de `public_html`. Esto expone tu archivo `.env` con contraseñas de bases de datos y claves secretas al público.

La estructura recomendada y segura es colocar los archivos del framework **un nivel por encima de `public_html`**:

```text
/home/usuario/
  ├── laravel-app/            <-- Código fuente protegido
  │     ├── app/
  │     ├── bootstrap/
  │     ├── config/
  │     ├── database/
  │     ├── routes/
  │     ├── storage/
  │     ├── .env
  │     └── artisan
  │
  └── public_html/            <-- Contenido de /laravel-app/public
        ├── index.php
        ├── .htaccess
        ├── robots.txt
        └── build/ (Vite/Tailwind)
```

---

## 2. Paso a Paso: Despliegue en cPanel

### Paso 1: Seleccionar la Versión de PHP
1. En cPanel, ve a **Seleccionar Versión PHP** (`PHP Version Selector`).
2. Elige **PHP 8.2** o **PHP 8.3**.
3. Asegúrate de tener activadas las extensiones: `bcmath`, `ctype`, `curl`, `dom`, `fileinfo`, `mbstring`, `openssl`, `pdo_mysql`, `tokenizer`, `xml`, y `opcache`.

### Paso 2: Subir el Proyecto
1. En tu máquina local, ejecuta la compilación de assets de frontend:
   ```bash
   npm run build
   ```
2. Comprime tu proyecto en un archivo `.zip` (excluyendo `node_modules` y `vendor` para subirlo rápidamente).
3. Sube y descomprime el archivo en `/home/usuario/laravel-app/`.

### Paso 3: Mover la carpeta `public` a `public_html`
1. Mueve el contenido de `/home/usuario/laravel-app/public/` directamente a `/home/usuario/public_html/`.
2. Abre el archivo `/home/usuario/public_html/index.php` y ajusta las rutas relativas de carga:

```php
// Modificación en public_html/index.php
// Antes: require __DIR__.'/../vendor/autoload.php';
require __DIR__.'/../laravel-app/vendor/autoload.php';

// Antes: $app = require_once __DIR__.'/../bootstrap/app.php';
$app = require_once __DIR__.'/../laravel-app/bootstrap/app.php';
```

### Paso 4: Configurar el archivo `.env`
Edita `/home/usuario/laravel-app/.env` con tus datos de producción:

```dotenv
APP_NAME="Heike Developer App"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tudominio.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=usuario_basedatos
DB_USERNAME=usuario_dbuser
DB_PASSWORD=PasswordSeguro123!
```

---

## 3. Optimización para Producción en Servidores LiteSpeed

Dentro del Administrador de Archivos o mediante la Terminal SSH de cPanel, ejecuta los comandos de caché de Laravel:

```bash
# Caché de configuración y rutas
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Ejecución de migraciones
php artisan migrate --force
```

---

## 4. Configuración del Cron Job para Tareas Programadas de Laravel

Para que funcionen las tareas en segundo plano (`Schedule`), colas de correos y recordatorios automáticos:
1. En cPanel, abre la herramienta **Tareas de Cron** (`Cron Jobs`).
2. Agrega una nueva tarea con frecuencia **Cada minuto (`* * * * *`)**:

```bash
/usr/local/bin/php /home/usuario/laravel-app/artisan schedule:run >> /dev/null 2>&1
```

---

## 5. Conclusión

Con **Heike Developer Hosting**, disfrutas de la estabilidad y elegancia de Laravel con la máxima velocidad de procesamiento en PHP 8.x y discos NVMe, ahorrando costos significativos en servidores dedicados.
