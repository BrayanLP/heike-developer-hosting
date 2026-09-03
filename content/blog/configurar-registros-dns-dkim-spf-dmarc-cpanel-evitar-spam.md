---
title: Configuración de Registros DNS, DKIM, SPF y DMARC en cPanel para Evitar Spam
slug: configurar-registros-dns-dkim-spf-dmarc-cpanel-evitar-spam
date: '2026-09-03'
excerpt: Tutorial avanzado para asegurar la entregabilidad de correos corporativos
  en cPanel. Cómo configurar SPF, DKIM y DMARC para llegar a la bandeja de entrada
  de Gmail y Outlook.
coverImage: /images/blog/configurar-registros-dns-dkim-spf-dmarc-cpanel-evitar-spam.svg
categories:
- Hosting Perú
- Soporte Técnico
- Seguridad
tags:
- configurar dkim cpanel
- registro spf cpanel
- dmarc correo corporativo
- evitar spam hosting
- dns cpanel peru
author: PROISO Tech & Software Solutions
readingTime: 9 min de lectura
intentStage: CARE
targetKeyword: configurar dkim spf dmarc cpanel
---

> A partir de las estrictas normativas implementadas por Google (Gmail) y Microsoft (Outlook), cualquier correo corporativo enviado desde un dominio que no cuente con autenticación criptográfica **SPF, DKIM y DMARC** es automáticamente rechazado o clasificado como correo no deseado (Spam).

![Configuración de SPF, DKIM y DMARC en cPanel](/images/blog/configurar-registros-dns-dkim-spf-dmarc-cpanel-evitar-spam.svg)

En esta guía práctica para clientes de **PROISO Tech & Software Solutions**, aprenderás a configurar correctamente estos tres registros DNS en tu cPanel para garantizar que tus cotizaciones y correos lleguen directamente a la bandeja de entrada principal.

---

## 1. Comprendiendo los 3 Pilares de la Autenticación de Correo

1. **SPF (Sender Policy Framework):** Un registro TXT en tu DNS que lista las direcciones IP autorizadas para enviar correos en nombre de tu dominio.
2. **DKIM (DomainKeys Identified Mail):** Una firma criptográfica de clave pública/privada que garantiza que el mensaje no fue interceptado ni modificado en tránsito.
3. **DMARC (Domain-based Message Authentication):** La política que le indica a Gmail y Outlook qué hacer si un correo falla las pruebas de SPF o DKIM (cuarentena o rechazo total).

---

## 2. Paso 1: Activar SPF y DKIM en cPanel en 1 Clic

En todos los servidores de PROISO Tech & Software Solutions, cPanel incluye la herramienta **Email Deliverability (Capacidad de Entrega del Correo)**:

```bash
Ruta en cPanel:
cPanel Home > Correo Electrónico (Email) > Capacidad de Entrega del Correo (Email Deliverability)
```

1. Localiza tu nombre de dominio en la lista.
2. Si el estado indica *"Problemas detectados"* (Problems Exist), haz clic en el botón **Administrar** (Manage).
3. cPanel te mostrará las claves públicas generadas automáticamente. Haz clic en **Instalar registros sugeridos** (Install Suggested Records) o copia los valores para tu DNS.

---

## 3. Paso 2: Sintaxis Correcta de los Registros DNS (Zone Editor)

Si gestionas tus DNS externamente (por ejemplo en Cloudflare):

### Registro SPF (Tipo TXT):
```text
Nombre / Host: @ (o tudominio.pe)
Tipo: TXT
Valor: v=spf1 +a +mx +ip4:198.51.100.45 ~all
```
*(Reemplaza la IP por la IP dedicada de tu servidor de hosting indicada en tu correo de bienvenida).*

### Registro DKIM (Tipo TXT):
```text
Nombre / Host: default._domainkey
Tipo: TXT
Valor: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
```

### Registro DMARC (Tipo TXT):
```text
Nombre / Host: _dmarc
Tipo: TXT
Valor: v=DMARC1; p=quarantine; rua=mailto:postmaster@tudominio.pe; pct=100
```

---

## 4. Paso 3: Validación y Test de Entregabilidad

Para verificar que tus registros están activos globalmente:
1. Accede a herramientas gratuitas como **Mail-Tester.com** o **MXToolbox SuperTool**.
2. Envía un correo de prueba desde tu cuenta corporativa hacia la dirección temporal proporcionada.
3. Debes obtener una calificación de **10/10** confirmando que SPF, DKIM y DMARC superan la validación (*Pass*).

---

## 5. Soporte Directo para Clientes de PROISO Tech & Software Solutions

¿Tienes dudas al configurar tus registros DNS o tus correos continúan cayendo en spam debido a malas configuraciones pasadas?

Nuestro equipo técnico realiza la configuración y auditoría de correo de forma gratuita para todos nuestros clientes. **Contáctanos vía WhatsApp al +51 924 081 817** con tu nombre de dominio y te ayudaremos a dejar tu correo con entregabilidad 100% óptima.
