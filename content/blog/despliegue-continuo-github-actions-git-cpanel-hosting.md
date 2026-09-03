---
title: "Despliegue Continuo (CI/CD) en cPanel con Git y GitHub Actions: Automatiza tus Proyectos en Hosting NVMe"
slug: "despliegue-continuo-github-actions-git-cpanel-hosting"
date: "2026-09-02"
excerpt: "Automatiza el despliegue de tus aplicaciones web en cPanel con Git y GitHub Actions. Olvídate de subir archivos por FTP y despliega en segundos con SSH y rsync."
coverImage: "/images/blog/despliegue-continuo-github-actions-git-cpanel-hosting.svg"
categories:
  - "Desarrollo Web"
  - "DevOps"
  - "Hosting Perú"
tags:
  - "github actions cpanel"
  - "ci cd hosting cpanel"
  - "git version control cpanel"
  - "despliegue automatico peru"
  - "hosting desarrolladores peru"
intentStage: "CARE"
targetKeyword: "despliegue continuo github actions cpanel hosting"
author: "Brenda Developer Hosting"
readingTime: "9 min de lectura"
---

> Subir archivos comprimidos en un archivo ZIP a través del Administrador de Archivos de cPanel o usar clientes FTP tradicionales como FileZilla es una práctica obsoleta, lenta y propensa a errores humanos: sobrescritura accidental de configuraciones locales `.env`, caídas inesperadas del sitio y tiempo valioso perdido en cada actualización. En esta guía para desarrolladores aprenderás a configurar un flujo profesional de **Despliegue Continuo (CI/CD)** utilizando **GitHub Actions**, llaves SSH seguras y sincronización diferencial con `rsync` sobre servidores NVMe en **Brenda Developer Hosting**.

![Portada](/images/blog/despliegue-continuo-github-actions-git-cpanel-hosting.svg)

## 1. ¿Por qué Automatizar con CI/CD en tu Hosting cPanel?

El flujo de trabajo moderno de un desarrollador no termina cuando escribe el código; termina cuando ese código está corriendo de forma segura en producción.

Implementar CI/CD con GitHub Actions aporta ventajas determinantes:
- **Despliegues en un solo clic:** Con solo ejecutar `git push origin main`, tus cambios se compilan, se verifican y se suben al servidor automáticamente en menos de 20 segundos.
- **Cero tiempo de inactividad (Zero Downtime):** Sincronización diferencial con `rsync`, transmitiendo únicamente los archivos modificados.
- **Protección de Credenciales de Producción:** Tus variables de entorno sensibles (`.env`, llaves de API, credenciales de base de datos) permanecen intactas en el servidor y nunca viajan por el repositorio de Git.
- **Ejecución de Tareas Post-Despliegue:** Reinicio de aplicaciones Node.js/Python, ejecución de migraciones de base de datos (`php artisan migrate`) o purgado automático de la caché de LiteSpeed.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 ARQUITECTURA DEL FLUJO CI/CD CON GITHUB ACTIONS             │
├─────────────────┬─────────────────┬─────────────────┬───────────────────────┤
│   DESARROLLO    │ GITHUB ACTIONS  │  TÚNEL SSH CIF  │  cPANEL PRODUCCIÓN    │
│                 │  (CI RUNNER)    │   (PORT 22022)  │    (NVMe + LSCache)   │
├─────────────────┼─────────────────┼─────────────────┼───────────────────────┤
│ git push origin ──> npm test      ──> rsync vía SSH ──> Actualiza           │
│      main       ──> npm run build ──> Llave privada ──> /public_html        │
│                 ──> Artifacts ZIP ──> Ed25519 Segura──> touch tmp/restart   │
└─────────────────┴─────────────────┴─────────────────┴───────────────────────┘
```

---

## 2. Paso 1: Generación y Configuración de Llaves SSH en cPanel

Para que el ejecutor (Runner) de GitHub Actions pueda transferir archivos a tu cuenta de hosting sin necesidad de usar tu contraseña principal, utilizaremos un par de llaves SSH criptográficas basadas en el algoritmo moderno **Ed25519**.

### 1. Generar el par de llaves en tu terminal local:
Ejecuta el siguiente comando en tu máquina (Linux, macOS o Windows WSL):

```bash
# Generar par de llaves Ed25519 dedicado para GitHub Actions
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/cpanel_deploy_key
```

Presiona `Enter` dos veces para no asignarle *passphrase* (el runner automatizado requiere conectarse de forma no asistida). Este comando generará dos archivos:
- `cpanel_deploy_key`: Llave privada (se almacenará en GitHub Secrets).
- `cpanel_deploy_key.pub`: Llave pública (se importará en cPanel).

### 2. Importar y Autorizar la Llave Pública en cPanel:
1. Inicia sesión en tu cuenta de cPanel en Brenda Developer Hosting.
2. Dirígete a la sección **Seguridad** &rarr; **Acceso SSH (SSH Access)**.
3. Haz clic en **Importar Clave (Import Key)**.
4. Pega el contenido de tu llave pública `cpanel_deploy_key.pub` en el campo correspondiente y asígnale un nombre (ej. `github-actions`).
5. Vuelve a la lista de claves y haz clic en **Administrar (Manage)** al lado de la clave importada, luego presiona **Autorizar (Authorize)**.

> [!IMPORTANT]
> En **Brenda Developer Hosting**, el acceso SSH se habilita por solicitud de seguridad en todos los planes para desarrolladores. Si aún no tienes activo el acceso SSH en tu cPanel, solicítalo al instante por WhatsApp al +51 924 081 817 indicando tu nombre de dominio.

---

## 3. Paso 2: Configuración de Secretos en tu Repositorio de GitHub

Nunca debes subir llaves privadas ni datos de conexión a tus archivos de código fuente. Configúralos como **GitHub Actions Secrets**:

1. Ve a tu repositorio en GitHub &rarr; **Settings** &rarr; **Secrets and variables** &rarr; **Actions**.
2. Haz clic en **New repository secret** y añade las siguientes variables:

| Nombre del Secret | Descripción / Valor |
| :--- | :--- |
| `SSH_HOST` | La dirección IP de tu servidor o tu dominio (ej. `miweb.pe` o `cpanel10.brayan.pe`). |
| `SSH_USER` | Tu nombre de usuario de cPanel (ej. `brayanpe`). |
| `SSH_PORT` | El puerto SSH configurado (generalmente `22` o el puerto personalizado asignado). |
| `SSH_PRIVATE_KEY` | El contenido completo del archivo privado `~/.ssh/cpanel_deploy_key` (incluyendo cabeceras `-----BEGIN OPENSSH PRIVATE KEY-----`). |
| `TARGET_DIR` | Ruta absoluta en el servidor (ej. `/home/brayanpe/public_html/` o `/home/brayanpe/app/`). |

---

## 4. Paso 3: Creación del Workflow de GitHub Actions (`deploy.yml`)

Crea un archivo en la raíz de tu proyecto con la ruta `.github/workflows/deploy.yml`. 

A continuación tienes un workflow listo para producción compatible con sitios PHP (WordPress, Laravel), estáticos (HTML/Vite) o aplicaciones Node.js:

```yaml
name: Despliegue Continuo a cPanel Hosting NVMe

on:
  push:
    branches:
      - main # Se dispara cada vez que haces push a la rama main

jobs:
  deploy:
    name: Compilar y Desplegar vía Rsync SSH
    runs-on: ubuntu-latest

    steps:
      # 1. Descargar el código fuente del repositorio
      - name: Checkout del Repositorio
        uses: actions/checkout@v4

      # 2. Configuración de Node.js (opcional, para compilar assets o frontend)
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      # 3. Instalación de dependencias y compilación de producción
      - name: Instalar Dependencias y Build
        run: |
          npm ci
          npm run build --if-present

      # 4. Despliegue seguro mediante Rsync sobre SSH
      - name: Desplegar archivos a cPanel con Rsync
        uses: easingthemes/ssh-deploy@v5.0.3
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          ARGS: "-avz --delete --exclude-from=.deployignore"
          SERVER: ${{ secrets.SSH_HOST }}
          USERNAME: ${{ secrets.SSH_USER }}
          PORT: ${{ secrets.SSH_PORT }}
          TARGET: ${{ secrets.TARGET_DIR }}

      # 5. Ejecutar comandos post-despliegue en el servidor
      - name: Tareas Post-Despliegue en cPanel
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.SSH_PORT }}
          script: |
            cd ${{ secrets.TARGET_DIR }}
            # Reiniciar app Node.js (si usas Phusion Passenger)
            mkdir -p tmp && touch tmp/restart.txt
            # Ajustar permisos seguros de archivos y carpetas
            find . -type f -exec chmod 644 {} +
            find . -type d -exec chmod 755 {} +
            echo "¡Despliegue completado con éxito en Brenda Hosting!"
```

---

## 5. Paso 4: Configurar el Archivo `.deployignore`

Es fundamental indicarle a `rsync` qué archivos **NUNCA** deben transferirse ni borrarse en el servidor de producción:

Crea un archivo `.deployignore` en la raíz de tu proyecto con el siguiente contenido:

```gitignore
.git*
.github
node_modules
.env
.env.production
storage/logs/*
uploads/*
wp-config.php
```

> [!TIP]
> Al agregar `.env` y `uploads/*` en tu `.deployignore`, garantizas que las imágenes que suban tus clientes o administradores a la web nunca se borren durante un nuevo despliegue.

---

## 6. Paso 5: Purgado Automático de Caché LiteSpeed

Si tu sitio utiliza **LiteSpeed Web Server**, querrás que los usuarios vean los cambios inmediatamente sin tener que purgar la caché manualmente desde el panel de WordPress o cPanel.

Puedes añadir una instrucción de purgado en el script post-despliegue:

```bash
# Para sitios WordPress con WP-CLI instalado en cPanel:
wp lscache-purge all --path=/home/tu_usuario/public_html

# O si manejas headers HTTP LiteSpeed:
touch /home/tu_usuario/public_html/.lsinstall
```

---

## 7. Solución a Errores Comunes de Despliegue (Troubleshooting)

### Error: `Host key verification failed`
- **Causa:** El runner de GitHub no reconoce la huella digital (*fingerprint*) del servidor SSH la primera vez.
- **Solución:** La acción `ssh-deploy` o `appleboy/ssh-action` maneja esto automáticamente si el secret `SSH_PORT` y `SSH_HOST` son correctos. También puedes agregar un flag `-o StrictHostKeyChecking=no` en los argumentos de SSH si fuera necesario.

### Error: `Permission denied (publickey)`
- **Causa:** La clave pública no fue autorizada en cPanel o la clave privada guardada en GitHub Secrets tiene saltos de línea corruptos.
- **Solución:** Copia la llave privada asegurándote de no dejar espacios en blanco al inicio o al final. En cPanel, verifica que el estado de la clave sea **"Authorized"**.

### Error 500 tras el despliegue
- **Causa:** Permisos de archivos incorrectos (por ejemplo, carpetas con permisos `777` que CloudLinux bloquea automáticamente por seguridad).
- **Solución:** Las directivas `find . -type f -exec chmod 644 {} +` y `find . -type d -exec chmod 755 {} +` en el bloque de script corrigen los permisos de inmediato.

---

## 8. Conclusión: Trabaja como un Profesional en Servidores Optimizados

La combinación de **GitHub Actions** y **Brenda Developer Hosting** te permite alcanzar un estándar de desarrollo de clase mundial: despliegues automatizados, historial de versiones respaldado, cero errores en producción y máxima velocidad gracias a discos NVMe PCIe 4.0.

¿Eres desarrollador, freelancer o agencia y necesitas servidores con soporte SSH, Node.js, Python y LiteSpeed?

👉 **[Consulta nuestros Planes Anuales para Desarrolladores](https://brenda.dev/#planes)** o escríbenos directamente a **[WhatsApp (+51 924 081 817)](https://wa.me/51924081817?text=Hola,%20deseo%20habilitar%20acceso%20SSH%20y%20Git%20para%20despliegues%20CI/CD)** para asesorarte con la configuración de tu pipeline.
