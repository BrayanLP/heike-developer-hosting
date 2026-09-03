---
title: "Cómo Configurar Webhooks de Pasarelas de Pago (Mercado Pago, Niubiz, Culqi) en Hosting NVMe"
slug: "configuracion-webhooks-pasarelas-pago-peru-hosting"
date: "2026-08-28"
excerpt: "Aprende a recibir, validar y procesar notificaciones de pago en tiempo real con Webhooks de Mercado Pago, Culqi y Niubiz en entornos Node.js y PHP de alta velocidad con cPanel y LiteSpeed."
coverImage: "/images/blog/configuracion-webhooks-pasarelas-pago-peru-hosting.svg"
categories:
  - "E-commerce"
  - "Desarrollo"
  - "Hosting"
tags:
  - "Webhooks"
  - "Mercado Pago"
  - "Niubiz"
  - "Culqi"
  - "NodeJS"
  - "PHP"
  - "Hosting Perú"
author: "Heike Developer Hosting"
readingTime: "8 min de lectura"
---

> La integración fluida de pagos electrónicos con **Mercado Pago, Culqi, Niubiz o Izipay** requiere que tu servidor responda a los Webhooks en milisegundos para evitar bloqueos por timeout, duplicación de pedidos o transacciones no acreditadas.

![Portada](/images/blog/configuracion-webhooks-pasarelas-pago-peru-hosting.svg)

## 1. ¿Qué es un Webhook y por qué la infraestructura de Hosting es Crítica?

Un **Webhook** (o notificación HTTP inversa) es el mecanismo mediante el cual las pasarelas de pago informan a tu servidor web que una transacción ha cambiado de estado (`payment.created`, `order.paid`, `charge.refunded`, etc.) en tiempo real.

A diferencia del sondeo continuo (*polling*), el webhook es asíncrono y eficiente, pero impone requerimientos estrictos sobre tu infraestructura de hosting:

- **Tiempos de respuesta ultra bajos (< 500 ms):** Las pasarelas de pago suelen abortar la conexión y reintentar si tu servidor tarda más de 3 a 5 segundos en responder con un código `HTTP 200 OK`.
- **Certificado SSL / HTTPS válido:** Es obligatorio contar con cifrado TLS 1.3 con certificados válidos (como Let's Encrypt o Sectigo).
- **Procesamiento I/O sin cuello de botella:** Las escrituras en base de datos deben ser instantáneas para evitar bloquear el hilo del servidor web cuando ocurren picos de compras simultáneas.

> [!IMPORTANT]
> En **Heike Developer Hosting**, todos los planes cuentan con discos **NVMe SSD** de más de 3500 MB/s de lectura/escritura y servidores **LiteSpeed Web Server**, asegurando tiempos de latencia inferiores a 50 ms en respuestas de Webhooks.

---

## 2. Requisitos Previos y Configuración de Seguridad

Para recibir webhooks de manera confiable y segura en tu hosting:

1. **Dominio con SSL Activo:** Configurado en cPanel mediante el módulo *SSL/TLS Status* (Let's Encrypt gratuito).
2. **Endpoint Público y Seguro:** Por ejemplo, `https://tudominio.pe/api/webhooks/mercadopago`.
3. **Secreto de Webhook (Signature Secret / Webhook Secret):** Clave criptográfica proporcionada en el panel de desarrollador de la pasarela.

---

## 3. Implementación Práctica en PHP

Si tu tienda o API está desarrollada en **PHP moderno (PHP 8.2 / 8.3)** o frameworks como Laravel:

### 3.1 Verificación de Firma y Respuesta Instantánea en PHP

```php
<?php
// webhook_mercadopago.php

// 1. Obtener la firma del encabezado HTTP
$x_signature = $_SERVER['HTTP_X_SIGNATURE'] ?? '';
$x_request_id = $_SERVER['HTTP_X_REQUEST_ID'] ?? '';
$webhook_secret = getenv('MP_WEBHOOK_SECRET') ?: 'tu_secret_de_mercadopago';

// 2. Obtener el cuerpo de la petición (JSON crudo)
$raw_payload = file_get_contents('php://input');
$event = json_decode($raw_payload, true);

if (!$event || empty($x_signature)) {
    http_response_code(400);
    echo json_encode(['error' => 'Petición inválida o firma ausente']);
    exit;
}

// 3. Validar la firma HMAC SHA-256
// Mercado Pago envía ts (timestamp) y v1 (hash) en el header x-signature
parse_str(str_replace(',', '&', $x_signature), $signature_parts);
$ts = $signature_parts['ts'] ?? '';
$v1 = $signature_parts['v1'] ?? '';

$manifest = "id:" . ($event['data']['id'] ?? '') . ";request-id:{$x_request_id};ts:{$ts};";
$calculated_hash = hash_hmac('sha256', $manifest, $webhook_secret);

if (!hash_equals($calculated_hash, $v1)) {
    http_response_code(401);
    echo json_encode(['error' => 'Firma no coincide']);
    exit;
}

// 4. Responder INMEDIATAMENTE 200 OK a la pasarela para evitar reintentos y timeouts
http_response_code(200);
echo json_encode(['status' => 'received']);

// 5. Cerrar conexión HTTP con el cliente y continuar procesamiento en segundo plano
if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request(); // Disponible en LiteSpeed / PHP-FPM
}

// 6. Actualizar la base de datos MySQL en discos NVMe
require_once __DIR__ . '/db.php';
$payment_id = $event['data']['id'];
$status = $event['action'] === 'payment.created' ? 'PAID' : 'PENDING';

$stmt = $pdo->prepare("UPDATE pedidos SET estado_pago = ?, fecha_actualizacion = NOW() WHERE pasarela_id = ?");
$stmt->execute([$status, $payment_id]);
```

> [!TIP]
> La función `fastcgi_finish_request()` de LiteSpeed y PHP-FPM permite entregar la respuesta HTTP 200 inmediatamente a la pasarela mientras tu servidor continúa procesando correos de confirmación, inventario o facturas electrónicas de SUNAT en segundo plano.

---

## 4. Implementación en Node.js y Express

Si estás ejecutando tu aplicación en **Node.js con cPanel Application Manager**:

```javascript
// server.js o routes/webhooks.js
const express = require('express');
const crypto = require('crypto');
const app = express();

// IMPORTANTE: Para validar firmas, necesitamos el body crudo (rawBuffer)
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.post('/api/webhooks/culqi', async (req, res) => {
  const culqiSignature = req.headers['x-culqi-signature'];
  const webhookSecret = process.env.CULQI_WEBHOOK_SECRET;

  if (!culqiSignature || !webhookSecret) {
    return res.status(400).json({ error: 'Firma no presente' });
  }

  // Validar hash SHA-256
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(req.rawBody)
    .digest('hex');

  if (culqiSignature !== expectedSignature) {
    return res.status(401).json({ error: 'Firma inválida' });
  }

  // Responder 200 OK inmediatamente
  res.status(200).json({ received: true });

  // Procesar evento de forma asíncrona
  const event = req.body;
  if (event.type === 'order.status.changed' && event.data.state === 'paid') {
    const orderId = event.data.metadata.order_id;
    console.log(`[PAGO CONFIRMADO] Orden #${orderId} acreditada con éxito.`);
    // Actualizar pedido en MySQL / PostgreSQL
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor de Webhooks escuchando en puerto ${PORT}`));
```

---

## 5. Tabla Comparativa de Reintentos y Timeouts en Pasarelas de Pago de Perú

| Pasarela de Pago | Protocolo | Tiempo Máximo de Espera (Timeout) | Política de Reintentos |
| :--- | :--- | :--- | :--- |
| **Mercado Pago** | HTTPS POST | 5.0 segundos | 8 reintentos con retraso exponencial si no recibe 200 OK |
| **Culqi** | HTTPS POST | 4.0 segundos | Reintentos durante 24 horas hasta confirmación |
| **Niubiz (PagoEfectivo)** | HTTPS POST / SOAP | 6.0 segundos | 3 reintentos inmediatos, luego suspensión de alertas |
| **Izipay Online** | HTTPS POST | 5.0 segundos | 5 reintentos con intervalo de 15 minutos |

---

## 6. Buenas Prácticas de Rendimiento y Prevención de Fallos

1. **Idempotencia Obligatoria:** Un webhook puede recibirse más de una vez por cortes temporales de red. Guarda siempre el `event_id` o `payment_id` en una tabla de MySQL con índice `UNIQUE` para no despachar dos veces la misma orden.
2. **Evitar Bloqueos por ModSecurity:** Asegúrate de que las peticiones POST de la pasarela no sean bloqueadas por reglas genéricas del Firewall WAF. En **Heike Developer Hosting**, nuestras reglas ModSecurity están preoptimizadas para pasarelas de pago peruanas e internacionales.
3. **Rotación de Logs de Transacciones:** Guarda logs detallados en archivos locales en disco NVMe para auditar discrepancias contables sin ralentizar la respuesta web.

---

## 7. Conclusión

La configuración adecuada de webhooks con validación de firmas HMAC y respuesta asíncrona garantiza que ninguna venta se pierda en tu tienda virtual o plataforma SaaS. 

En **Heike Developer Hosting**, dispones de servidores con soporte nativo para **Node.js, Python, PHP 8.x**, bases de datos MySQL en discos NVMe de ultra velocidad y SSL Let's Encrypt automatizado desde solo **S/ 60/año**.

¿Quieres desplegar tu pasarela de pagos con máxima estabilidad? Explora nuestros [planes de hosting NVMe](https://brenda.dev/#planes) o contáctanos por WhatsApp para asistencia técnica inmediata.
